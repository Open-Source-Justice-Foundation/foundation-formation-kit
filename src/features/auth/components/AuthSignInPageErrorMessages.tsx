"use client";

import { useEffect, useRef } from "react";

import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

// TODO:
// These NextAuth error codes may not be used/correct, see
// https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/types.ts#L204
// The error codes get put into a NextAuth callback URL as a searchParam on the configured sign in page, e.g.,
// http://localhost:3000/login?error=OAuthAccountNotLinked
// If a specific error code isn't used then it will not be displayed unless a user explicilty searches for it

// Note: Signin and OAuthCallbackError are present in the next-auth repo, see
// https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/types.ts#L204
// But they're not in the NextAuth.js docs, see
// https://next-auth.js.org/configuration/pages#error-codes
enum AuthSignInPageErrors {
  Signin = "Signin",
  OAuthCallbackError = "OAuthCallbackError",
  OAuthSignin = "OAuthSignin",
  OAuthCallback = "OAuthCallback",
  OAuthCreateAccount = "OAuthCreateAccount",
  EmailCreateAccount = "EmailCreateAccount",
  Callback = "Callback",
  OAuthAccountNotLinked = "OAuthAccountNotLinked",
  EmailSignin = "EmailSignin",
  CredentialsSignin = "CredentialsSignin",
  SessionRequired = "SessionRequired",
}

const AuthSignInPageErrorMessageMap = {
  [AuthSignInPageErrors.Signin]: "Login error",
  [AuthSignInPageErrors.OAuthCallbackError]: "Login error",
  [AuthSignInPageErrors.OAuthSignin]: "Login error",
  [AuthSignInPageErrors.OAuthCallback]: "Login error",
  [AuthSignInPageErrors.OAuthCreateAccount]: "Login error",
  [AuthSignInPageErrors.EmailCreateAccount]: "Login error",
  [AuthSignInPageErrors.Callback]: "Login error",
  [AuthSignInPageErrors.OAuthAccountNotLinked]: "Login error",
  [AuthSignInPageErrors.EmailSignin]: "Failed to send email",
  [AuthSignInPageErrors.CredentialsSignin]: "Invalid credentials",
  [AuthSignInPageErrors.SessionRequired]: "Access denied",
};

export function AuthSignInPageErrorMessages() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") as AuthSignInPageErrors;
  const mountedRef = useRef<boolean | undefined>();

  useEffect(() => {
    if (error !== null && !mountedRef.current) {
      setTimeout(() => {
        toast.error(AuthSignInPageErrorMessageMap[error] || "Login error");
      }, 0);
    }

    mountedRef.current = true;
  }, []);

  return <></>;
}
