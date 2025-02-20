import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "@neondatabase/serverless";
// import { saltAndHashPassword } from "~/lib/auth/utils";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
      newUser: "/register",
    },
    adapter: PostgresAdapter(pool),
    providers: [
      Credentials({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
          email: {
            label: "Email address",
            type: "email",
            placeholder: "email...",
          },
          password: {
            label: "Password",
            type: "password",
            placeholder: "password...",
          },
        },
        authorize: async (credentials) => {
          console.log("credentials", credentials);
          const user = null;

          if (typeof credentials.password === "string") {
            // logic to salt and hash password
            // const pwHash = await saltAndHashPassword(credentials.password);
            // logic to verify if the user exists
            // user = await getUserFromDb(credentials.email, pwHash);
          }

          if (!user) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error("Invalid credentials");
          }

          // return user object with their profile data
          return user;
        },
      }),
    ],
  };
});
