import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "@neondatabase/serverless";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";

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
      // Used for check email message
      // verifyRequest: "/auth/verify-request",
    },
    adapter: PostgresAdapter(pool),
    providers: [
      Resend({
        from: "auth@foundationformationkit.org",
      }),
    ],
  } satisfies NextAuthConfig;
});
