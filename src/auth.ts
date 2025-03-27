import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "@neondatabase/serverless";
import {
  signInRequest,
  verificationRequest,
} from "~/lib/auth/providers/email/resend";
import { isRouteProtected } from "~/lib/auth/utils";
import { checkEmailIsVerifiedByEmail } from "~/services/database/queries/auth";
import { UserWithEmailVerified } from "~/types";
import NextAuth, { type NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import { NextResponse } from "next/server";

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
        from: "auth@foundationformationkit.org",
        async sendVerificationRequest({
          identifier,
          url,
          provider: { from, apiKey },
        }) {
          const params = {
            identifier,
            url,
            provider: { from, apiKey },
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
        const user = <UserWithEmailVerified>auth?.user;

        // Set isAuthenticated to true if the user's email is verified by checking if the property is a truthy value
        // Otherwise set to false
        const isAuthenticated = !!user?.emailVerified;

        let protectedRoutes: string[] = [];

        if (isAuthenticated) {
          protectedRoutes = [
            "/login",
            "/register",
            "/reset-password",
            "/update-password",
            "/updated-password",
            "/verify-request",
          ];

          const routeProtected = isRouteProtected(protectedRoutes, request);

          // Redirect to homepage if route is a protected route and user is authenticated
          if (routeProtected) {
            return NextResponse.redirect(new URL("/", request.url));
          }
        } else {
          protectedRoutes = [
            "/non-profit-name",
            "/under-construction",
            "/logout",
          ];

          const routeProtected = isRouteProtected(protectedRoutes, request);

          // Redirect to login if route is a protected route and user is not authenticated
          if (routeProtected) {
            return NextResponse.redirect(new URL("/login", request.url));
          }
        }

        return NextResponse.next();
      },
    },
  } satisfies NextAuthConfig;
});
