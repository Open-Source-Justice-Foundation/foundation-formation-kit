import { saltAndHashPassword } from "~/lib/auth/utils";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: "Email Address",
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
        let user = null;

        // logic to salt and hash password
        // const pwHash = await saltAndHashPassword(credentials.password);

        // logic to verify if the user exists
        // user = await getUserFromDb(credentials.email, pwHash);

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
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
});
