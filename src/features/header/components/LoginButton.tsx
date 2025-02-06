"use client";

import { Button } from "~/components/ui/button";
import { signIn } from "next-auth/react";

export function LoginButton() {
  return (
    <Button
      onClick={() => signIn()}
      className="focus-visible:ring-transparent"
      variant="outline"
      type="submit"
    >
      <span className="text-base">Sign in</span>
    </Button>
  );
}
