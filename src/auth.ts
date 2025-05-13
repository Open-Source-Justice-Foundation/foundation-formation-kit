import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "@neondatabase/serverless";
import { AUTH_FROM_EMAIL_ADDRESS } from "~/lib/auth/constants/constants";
import {
  signInRequest,
  verificationRequest,
} from "~/lib/auth/providers/email/resend";
import { isRouteProtected } from "~/lib/auth/utils";
import { oAuthEmailSchema } from "~/lib/auth/validation/schemas";
import { checkEmailIsVerifiedByEmail } from "~/services/database/queries/auth";
import {
  type SessionWithSessionToken,
  type SignInCallbackParams,
  type UserWithEmailVerifiedAndPasswordHash,
} from "~/types";
import NextAuth, { type NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

// *DO NOT* create a `Pool` here, outside the request handler.
// Neon's Postgres cannot keep a pool alive between requests.

export const { auth, handlers, signIn, signOut } = NextAuth(() => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  return {
    debug: process.env.NODE_ENV === "development",
    session: {
      strategy: "database",
      maxAge: 2592000, // 30 days
      updateAge: 86400, // 1 day
    },
    pages: {
      signIn: "/login",
      signOut: "/logout",
      // Error code passed in query string as ?error=
      error: "/error",
      // Used for displaying the check email message
      verifyRequest: "/verify-request",
    },
    adapter: PostgresAdapter(pool),
    providers: [
      Resend({
        from: AUTH_FROM_EMAIL_ADDRESS,
        async sendVerificationRequest({
          identifier,
          url,
          provider: { apiKey },
        }) {
          const params = {
            identifier,
            url,
            provider: { apiKey },
          };

          try {
            const emailVerified = await checkEmailIsVerifiedByEmail(identifier);

            if (emailVerified) {
              await signInRequest(params);
            } else {
              await verificationRequest(params);
            }
          } catch (err) {
            // TODO
            // If an error is thrown and not handled then the error page with a configuration query parameter is shown to the user, look into handling the error differently
            // Don't log the err value, do something else with it to avoid deployment error
            console.error(err);
            throw new Error("Send verification request failed");
          }
        },
      }),
      GitHub,
    ],
    callbacks: {
      authorized: async ({ request, auth }) => {
        const user = <UserWithEmailVerifiedAndPasswordHash>auth?.user;

        let isAuthenticated;
        if (user?.password_hash === null) {
          // Set isAuthenticated to true if the password hash is null which can happen if a user is only using oauth
          // If a user is using email and password, the password hash won't be null
          isAuthenticated = true;
        } else {
          // Set isAuthenticated to true if the user's email is verified by checking if the property is a truthy value
          // Otherwise set to false
          isAuthenticated = !!user?.emailVerified;
        }

        let protectedRoutes: string[] = [];

        if (isAuthenticated) {
          protectedRoutes = [
            "/login",
            "/register",
            "/reset-password",
            "/update-password",
            "/updated-email-address",
            "/updated-password",
            "/verify-request",
            "/verify-reset-password",
          ];

          const routeProtected = isRouteProtected(protectedRoutes, request);

          // Redirect to homepage if route is a protected route and user is authenticated
          if (routeProtected) {
            return NextResponse.redirect(new URL("/", request.url));
          }
        } else {
          protectedRoutes = [
            "/logout",
            "/update-email-address",
            "/non-profit-name",
            "/under-construction",
            "/dashboard",
            "/formation/step-1",
            "/formation/step-2",
            "/formation/step-3",
            "/formation/step-4",
            "/formation/step-5",
            "/profile",
          ];

          const routeProtected = isRouteProtected(protectedRoutes, request);

          // Redirect to login if route is a protected route and user is not authenticated
          if (routeProtected) {
            return NextResponse.redirect(new URL("/login", request.url));
          }
        }

        return NextResponse.next();
      },
      signIn: async (params: SignInCallbackParams) => {
        const { user, account } = params;

        const session = await auth();
        const sessionUserId = session?.user?.id;
        const paramsUserId = params?.user?.id;

        if (account) {
          if (
            account?.type === "oidc" ||
            account?.type === "oauth" ||
            account?.type === "email" ||
            account?.type === "credentials" ||
            account?.type === "webauthn"
          ) {
            let requestFromProfilePage = false;

            if (account?.type === "oauth") {
              try {
                oAuthEmailSchema.parse({ email: user?.email });

                if (
                  typeof sessionUserId === "number" &&
                  typeof paramsUserId === "number"
                ) {
                  if (sessionUserId !== paramsUserId) {
                    const headersList = headers();
                    const sessionWithSessionToken = <SessionWithSessionToken>(
                      session
                    );
                    const sessionToken = sessionWithSessionToken?.sessionToken;

                    const authjsSessionTokenHeader = `authjs.session-token=${sessionToken};`;

                    let authjsProfilePageCallbackUrl: string;

                    if (process.env.NODE_ENV === "development") {
                      authjsProfilePageCallbackUrl =
                        "authjs.callback-url=http%3A%2F%2Flocalhost%3A3000%2Fprofile;";
                    } else if (process.env.NODE_ENV === "production") {
                      authjsProfilePageCallbackUrl =
                        "authjs.callback-url=https%3A%2F%2Ffoundationformationkit.org%2Fprofile;";
                    }

                    headersList.forEach((header) => {
                      if (
                        header.includes(authjsSessionTokenHeader) &&
                        header.includes(authjsProfilePageCallbackUrl)
                      ) {
                        requestFromProfilePage = true;
                      }
                    });
                  }
                }
              } catch (err) {
                if (err instanceof ZodError) {
                  throw new Error("Failed to login user: invalid OAuth email");
                }
                throw new Error("Failed to login user");
              }
            }
            if (requestFromProfilePage) {
              return "/profile-error?error=OAuthAccountNotLinkedFromProfile";
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
        return true;
      },
    },
  } satisfies NextAuthConfig;
});
