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
import {
  BookText,
  Gauge,
  Github,
  HandHelping,
  LogOut,
  UserPen,
} from "lucide-react";
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
              <div className="flex grow items-center justify-between">
                Dashboard
                <Gauge aria-hidden="true" />
                <span className="sr-only">{"Dashboard"}</span>
              </div>
            </DropdownMenuItem>
          </Link>
          <Link href="/profile">
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex grow items-center justify-between">
                Profile
                <UserPen aria-hidden="true" />
                <span className="sr-only">{"Profile"}</span>
              </div>
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
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex grow items-center justify-between">
                Docs
                <BookText aria-hidden="true" />
                <span className="sr-only">{"Docs"}</span>
              </div>
            </DropdownMenuItem>
          </a>
          <a
            href="https://github.com/Open-Source-Justice-Foundation/foundation-formation-kit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex grow items-center justify-between">
                GitHub
                <Github aria-hidden="true" />
                <span className="sr-only">{"GitHub"}</span>
              </div>
            </DropdownMenuItem>
          </a>
          <a
            href="mailto:info@opensourcejustice.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex grow items-center justify-between">
                Support
                <HandHelping aria-hidden="true" />
                <span className="sr-only">{"Support"}</span>
              </div>
            </DropdownMenuItem>
          </a>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleSignOutOnClick}
          disabled={isLoading}
        >
          <div className="flex grow items-center justify-between">
            Sign out
            <LogOut aria-hidden="true" />
            <span className="sr-only">{"Sign out"}</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
