"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { AuthCardHomeButton } from "~/features/auth";
import { OctagonAlert } from "lucide-react";
import Link from "next/link";
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

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") as Error;

  return (
    <Card className="flex w-[360px] flex-col sm:w-[425px]">
      <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
        <CardTitle>
          <div className="flex flex-col gap-6">
            <AuthCardHomeButton />
            <span className="flex gap-x-2 text-base font-medium sm:text-xl">
              <OctagonAlert aria-hidden="true" />
              Something went wrong...
            </span>
          </div>
        </CardTitle>
        <CardDescription>
          {errorMap[error] || "Please contact us if this error persists."}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
        <Button asChild className="w-full focus-visible:ring-ringPrimary">
          <Link href="/">Return to Home</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
