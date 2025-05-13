"use client";

import { useSearchParams } from "next/navigation";

enum Error {
  OAuthAccountNotLinkedFromProfile = "OAuthAccountNotLinkedFromProfile",
}

const errorMap = {
  [Error.OAuthAccountNotLinkedFromProfile]: (
    <>
      <p>There was a problem when trying to link your account.</p>
      <p className="pt-2 text-destructive-foreground">
        Unique error code:{" "}
        <code className="rounded-sm bg-destructive p-1 text-xs text-destructive-foreground">
          Failed to link account
        </code>
      </p>
    </>
  ),
};

export function AuthProfileErrorPageErrorMessages() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") as Error;

  return <>{errorMap[error] || "Please contact us if this error persists."}</>;
}
