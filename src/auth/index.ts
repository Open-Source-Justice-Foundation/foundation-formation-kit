import { type AuthOptions } from "next-auth";

// import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [],
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
};
