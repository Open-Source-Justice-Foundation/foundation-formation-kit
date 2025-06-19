"use client";

import { Button } from "~/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function NewFoundationButton() {
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
      {session?.user && (
        <Link href="/formation/part-1/step-1">New foundation</Link>
      )}
    </Button>
  );
}
