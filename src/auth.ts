import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "@neondatabase/serverless";
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";

// *DO NOT* create a `Pool` here, outside the request handler.
// Neon's Postgres cannot keep a pool alive between requests.

export const { auth, handlers, signIn, signOut } = NextAuth(() => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  return {
    // debug: process.env.NODE_ENV === "development",
    session: {
      strategy: "database",
    },
    pages: {
      signIn: "/login",
      // signOut: "/signout",
      // Error code passed in query string as ?error=
      error: "/error",
      // (used for check email message)
      // verifyRequest: "/auth/verify-request",
      // New users will be directed here on first sign in (leave the property out if not of interest)
      // newUser: "/",
    },
    adapter: PostgresAdapter(pool),
    providers: [
      Resend({
        from: "auth@foundationformationkit.org",
      }),
    ],
  };
});
