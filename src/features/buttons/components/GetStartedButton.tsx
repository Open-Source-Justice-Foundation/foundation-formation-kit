"use client";

import { Button } from "~/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function GetStartedButton() {
  const { data: session } = useSession();

  // TODO
  // Make sure email is verified
  return (
    <Button asChild type="button" className="focus-visible:ring-ringPrimary">
      {session?.user ? (
        <Link href="/under-construction" className="text-base">
          Get started
        </Link>
      ) : (
        <Link href="/login" className="text-base">
          Get started
        </Link>
      )}
    </Button>
  );
}
