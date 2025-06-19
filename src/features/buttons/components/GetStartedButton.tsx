"use client";

import { Button } from "~/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function GetStartedButton() {
  const { data: session } = useSession();

  // TODO
  // Make sure email is verified
  // Make sure session is being handled properly
  return (
    <Button
      asChild
      type="button"
      className="text-base focus-visible:ring-ringPrimary"
    >
      <Link href={session?.user ? "/formation/part-1/step-1" : "/login"}>
        Get started
      </Link>
    </Button>
  );
}
