"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export function SignOutButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSignOutOnClick() {
    setIsLoading(true);
    try {
      const signOutResponse = await signOut({
        redirect: true,
        redirectTo: "/",
      });

      if (signOutResponse !== undefined) {
        throw new Error("Failed to redirect to homepage");
      }
    } catch (err) {
      // TODO
      // Don't log the err value, do something else with it to avoid deployment error
      console.error(err);
      toast.error("Logout error");
      setIsLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="link"
      className="h-9 p-0 text-base text-link-foreground hover:no-underline focus-visible:ring-0 focus-visible:ring-offset-0"
      onClick={handleSignOutOnClick}
      disabled={isLoading}
    >
      Sign out
    </Button>
  );
}
