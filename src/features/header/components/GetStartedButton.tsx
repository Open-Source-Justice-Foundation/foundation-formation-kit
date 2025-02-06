"use client";

import { Button } from "~/components/ui/button";
import { signIn } from "next-auth/react";

export function GetStartedButton() {
  return (
    <Button
      onClick={() => signIn()}
      className="focus-visible:ring-transparent"
      type="submit"
    >
      <span className="text-base">Get started</span>
    </Button>
  );
}
