"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Button
      type="button"
      className="h-9 p-0 text-base text-link-foreground hover:no-underline focus-visible:ring-0 focus-visible:ring-offset-0"
      variant="link"
      disabled={isLoading}
      onClick={async () => {
        setIsLoading(true);
        await signOut({ redirect: true, redirectTo: "/" });
        setIsLoading(false);
      }}
    >
      Sign out
    </Button>
  );
}
