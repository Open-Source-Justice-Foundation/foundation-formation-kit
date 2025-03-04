"use client";

import { Button } from "~/components/ui/button";
import { signOut } from "next-auth/react";

export function SheetSignOutButton() {
  return (
    <Button
      type="button"
      className="h-9 justify-start px-3 py-1.5 text-base focus-visible:outline-ring/50 focus-visible:ring-0 focus-visible:ring-offset-0"
      variant="ghost"
      onClick={() => signOut({ redirect: true, redirectTo: "/" })}
    >
      Sign out
    </Button>
  );
}
