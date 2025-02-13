"use client";

import { Button } from "~/components/ui/button";
import { signIn } from "next-auth/react";

export function GetStartedButton() {
  return (
    <Button
      onClick={() => signIn()}
      type="submit"
      className="focus-visible:ring-ringPrimary"
    >
      <span className="text-base">Get started</span>
    </Button>
  );
}
