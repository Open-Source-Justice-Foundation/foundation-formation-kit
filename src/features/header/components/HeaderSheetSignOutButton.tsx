"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import { HEADER_SHEET_ICON_BASE_SIZE } from "~/features/header/constants/constants";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export function HeaderSheetSignOutButton() {
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
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      className="h-9 px-3 py-1.5 focus-visible:outline-ring/50 focus-visible:ring-0 focus-visible:ring-offset-0"
      onClick={handleSignOutOnClick}
      disabled={isLoading}
    >
      <div className="flex grow items-center gap-2 text-base">
        <LogOut size={HEADER_SHEET_ICON_BASE_SIZE} aria-hidden="true" />
        <span className="sr-only">{"Logout"}</span>
        Logout
      </div>
    </Button>
  );
}
