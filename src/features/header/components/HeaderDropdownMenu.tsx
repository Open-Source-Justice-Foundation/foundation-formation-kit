"use client";

import { useState } from "react";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";

export function HeaderDropdownMenu() {
  const { data: session } = useSession();
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          {typeof session?.user?.name === "string" &&
          session?.user?.name.length > 0 ? (
            <AvatarFallback>{session?.user?.name[0]}</AvatarFallback>
          ) : (
            <AvatarFallback>NN</AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {session?.user?.name && (
          <>
            <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup>
          <Link href="/dashboard">
            <DropdownMenuItem className="cursor-pointer">
              Dashboard
            </DropdownMenuItem>
          </Link>
          <Link href="/profile">
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <a
            href="https://docs.foundationformationkit.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DropdownMenuItem className="cursor-pointer">Docs</DropdownMenuItem>
          </a>
          <a
            href="https://github.com/Open-Source-Justice-Foundation/foundation-formation-kit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DropdownMenuItem className="cursor-pointer">
              GitHub
            </DropdownMenuItem>
          </a>
          <a
            href="mailto:info@opensourcejustice.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DropdownMenuItem className="cursor-pointer">
              Support
            </DropdownMenuItem>
          </a>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleSignOutOnClick}
          disabled={isLoading}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
