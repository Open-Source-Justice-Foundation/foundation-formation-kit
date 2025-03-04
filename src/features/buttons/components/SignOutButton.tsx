"use client";

import { Button } from "~/components/ui/button";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <Button
      type="button"
      className="h-9 p-0 text-base text-link-foreground hover:no-underline focus-visible:ring-0 focus-visible:ring-offset-0"
      variant="link"
      onClick={() => signOut({ redirect: true, redirectTo: "/" })}
    >
      Sign out
    </Button>
  );
}
