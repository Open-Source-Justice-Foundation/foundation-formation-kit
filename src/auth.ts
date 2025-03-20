import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "@neondatabase/serverless";
import { customSendVerificationRequest } from "~/lib/auth/providers/email/resend/emails/custom-send-verification-request";
import { isRouteProtected } from "~/lib/auth/utils";
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
        sendVerificationRequest({
          identifier,
          url,
          provider: { from, apiKey },
        }) {
          const theme = {
            background: "#ffffff",
            foreground: "#29333d",
            primary: "#5247e6",
            primaryForeground: "#f0f3ff",
            secondaryForeground: "#364c63",
            border: "#e4e4e7",
            linkForeground: "#5247e6",
          };

          const params = {
            identifier,
            url,
            provider: { from, apiKey },
            theme,
          };

          customSendVerificationRequest(params);
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
