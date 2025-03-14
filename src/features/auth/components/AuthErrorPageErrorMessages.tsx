"use client";

import { useSearchParams } from "next/navigation";

enum Error {
  Configuration = "Configuration",
  AccessDenied = "AccessDenied",
  Verification = "Verification",
}

const errorMap = {
  [Error.Configuration]: (
    <>
      <p>
        There was a problem when trying to authenticate with the server. Please
        contact us if this error persists.
      </p>
      <p className="pt-2 text-destructive-foreground">
        Unique error code:{" "}
        <code className="rounded-sm bg-destructive p-1 text-xs text-destructive-foreground">
          Configuration
        </code>
      </p>
    </>
  ),
  [Error.AccessDenied]: (
    <>
      <p>
        You do not have permission to access that page. Try signing in to gain
        the proper permissions.
      </p>
      <p className="pt-2 text-destructive-foreground">
        Unique error code:{" "}
        <code className="rounded-sm bg-destructive p-1 text-xs text-destructive-foreground">
          AccessDenied
        </code>
      </p>
    </>
  ),
  [Error.Verification]: (
    <>
      <p>
        The sign in link is no longer valid. It may have been used already or it
        may have expired. Try signing in again to get a valid link.
      </p>
      <p className="pt-2 text-destructive-foreground">
        Unique error code:{" "}
        <code className="rounded-sm bg-destructive p-1 text-xs text-destructive-foreground">
          Verification
        </code>
      </p>
    </>
  ),
};

export function AuthErrorPageErrorMessages() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") as Error;

  return <>{errorMap[error] || "Please contact us if this error persists."}</>;
}
