"use client";

import { useState } from "react";

import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export function HeaderDropdownMenuSignOutMenuItem() {
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
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={handleSignOutOnClick}
      disabled={isLoading}
    >
      <div className="flex grow items-center justify-between">
        Logout
        <LogOut aria-hidden="true" />
        <span className="sr-only">{"Logout"}</span>
      </div>
    </DropdownMenuItem>
  );
}
