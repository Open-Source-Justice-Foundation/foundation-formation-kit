import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "@neondatabase/serverless";
import { AUTH_FROM_EMAIL_ADDRESS } from "~/lib/auth/constants/constants";
import {
  signInRequest,
  verificationRequest,
} from "~/lib/auth/providers/email/resend";
import type {
  SessionWithSessionToken,
  SignInCallbackParams,
  UserWithEmailVerifiedAndPasswordHash,
  UserWithPasswordHash,
} from "~/lib/auth/types";
import { isRouteProtected } from "~/lib/auth/utils";
import {
  oAuthEmailSchema,
  oAuthUsernameSchema,
} from "~/lib/auth/validation/schemas";
import { checkEmailIsVerifiedByEmail } from "~/services/database/queries/auth/email-addresses";
import {
  checkConnectedOnIsNullInAccountsByProviderAndProviderAccountId,
  updateUsernameAndConnectedOnInAccountsByProviderAndProviderAccountId,
  updateUsernameInAccountsByProviderAndProviderAccountId,
} from "~/services/database/queries/auth/oauth-accounts";
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
        const expires = auth?.expires;

        const user = <UserWithEmailVerifiedAndPasswordHash>auth?.user;

        const userEmail = user?.email;
        const userEmailVerified = user?.emailVerified;
        const userPasswordHash = user?.password_hash;

        let isAuthenticated;
        if (typeof expires === "string") {
          if (new Date(expires) < new Date()) {
            isAuthenticated = false;
          } else {
            isAuthenticated = true;
          }
        } else {
          isAuthenticated = false;
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

          if (!userEmail || !userEmailVerified || !userPasswordHash) {
            protectedRoutes.push("/update-email-address");
          }

          if (!userEmail || userEmailVerified || !userPasswordHash) {
            protectedRoutes.push("/add-email-address-and-password-login");
          }

          if (!userEmail || !userEmailVerified || !userPasswordHash) {
            protectedRoutes.push("/added-email-address-and-password-login");
          }

          const routeProtected = isRouteProtected(protectedRoutes, request);

          // Redirect to homepage if route is a protected route and user is authenticated
          if (routeProtected) {
            return NextResponse.redirect(new URL("/", request.url));
          }
        } else {
          protectedRoutes = [
            "/logout",
            "/update-email-address",
            "/under-construction",
            "/dashboard",
            "/formation/part-1/step-1",
            "/formation/part-1/step-2",
            "/formation/part-1/step-3",
            "/formation/part-1/step-4",
            "/formation/part-1/step-5",
            "/formation/part-1/step-6",
            "/formation/part-1/step-7",
            "/formation/part-2/step-1",
            "/formation/part-2/step-2",
            "/formation/part-2/step-3",
            "/formation/part-2/step-4",
            "/formation/part-2/step-5",
            "/profile",
            "/profile-error",
            "/add-email-address-and-password-login",
            "/added-email-address-and-password-login",
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
        const { user, account, profile } = params;

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
            if (account?.type === "email") {
              const userWithPasswordHash = <UserWithPasswordHash>params?.user;
              if (!userWithPasswordHash?.password_hash) {
                return "/error?error=Verification";
              }
            } else if (account?.type === "oauth") {
              let requestFromProfilePage = false;
              try {
                // OAuth email should only need to be checked when registering with OAuth
                if (!session && typeof paramsUserId !== "number") {
                  const userEmail = user?.email;
                  oAuthEmailSchema.parse({ email: userEmail });
                }

                const accountProvider = account?.provider;
                const accountProviderAccountId = account?.providerAccountId;
                const profileLogin = profile?.login;

                oAuthUsernameSchema.parse({
                  provider: accountProvider,
                  providerAccountId: accountProviderAccountId,
                  username: profileLogin,
                });

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
                  throw new Error(
                    "Failed to login user: invalid OAuth credentials",
                  );
                }
                throw new Error("Failed to login user");
              }
              if (requestFromProfilePage) {
                return "/profile-error?error=OAuthAccountNotLinkedFromProfile";
              }
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
    events: {
      signIn: async (message) => {
        const oAuthProfileLogin = message?.profile?.login;
        const accountType = message?.account?.type;
        const accountProvider = message?.account?.provider;
        const accountProviderAccountId =
          message?.account?.providerAccountId.toString();
        const isNewUser = message?.isNewUser;

        if (
          typeof oAuthProfileLogin === "string" &&
          accountType === "oauth" &&
          accountProvider === "github" &&
          typeof accountProviderAccountId === "string"
        ) {
          if (isNewUser) {
            const connectedOn = new Date();

            await updateUsernameAndConnectedOnInAccountsByProviderAndProviderAccountId(
              oAuthProfileLogin,
              connectedOn,
              accountProvider,
              accountProviderAccountId,
            );
          } else {
            const isConnectedOnNull =
              await checkConnectedOnIsNullInAccountsByProviderAndProviderAccountId(
                accountProvider,
                accountProviderAccountId,
              );

            if (isConnectedOnNull) {
              const connectedOn = new Date();

              await updateUsernameAndConnectedOnInAccountsByProviderAndProviderAccountId(
                oAuthProfileLogin,
                connectedOn,
                accountProvider,
                accountProviderAccountId,
              );
            } else {
              await updateUsernameInAccountsByProviderAndProviderAccountId(
                oAuthProfileLogin,
                accountProvider,
                accountProviderAccountId,
              );
            }
          }
        }
      },
    },
  } satisfies NextAuthConfig;
});
