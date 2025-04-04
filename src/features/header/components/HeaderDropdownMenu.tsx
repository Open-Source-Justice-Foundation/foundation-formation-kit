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
import { AVATAR_ICON_LARGE_SIZE } from "~/features/header/constants/constants";
import {
  FFK_DOCS_URL,
  FFK_GITHUB_URL,
  SUPPORT_EMAIL_URI,
} from "~/lib/auth/constants/constants";
import {
  BookText,
  Gauge,
  Github,
  HandHelping,
  LogOut,
  Pen,
  User,
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
            <AvatarFallback className="bg-accent">
              {session?.user?.name[0]}
            </AvatarFallback>
          ) : (
            <AvatarFallback className="bg-accent">
              <User size={AVATAR_ICON_LARGE_SIZE} aria-hidden="true" />
              <span className="sr-only">{"Avatar"}</span>
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {typeof session?.user?.name === "string" &&
          session?.user?.name.length > 0 && (
            <>
              <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
            </>
          )}
        <DropdownMenuGroup>
          <Link href="/formation/step-1">
            <DropdownMenuItem className="cursor-pointer" disabled={isLoading}>
              <div className="flex grow items-center justify-between">
                New foundation
                <Pen aria-hidden="true" />
                <span className="sr-only">{"New foundation"}</span>
              </div>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard">
            <DropdownMenuItem className="cursor-pointer" disabled={isLoading}>
              <div className="flex grow items-center justify-between">
                Dashboard
                <Gauge aria-hidden="true" />
                <span className="sr-only">{"Dashboard"}</span>
              </div>
            </DropdownMenuItem>
          </Link>
          <Link href="/profile">
            <DropdownMenuItem className="cursor-pointer" disabled={isLoading}>
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
          <a href={FFK_DOCS_URL} target="_blank" rel="noopener noreferrer">
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex grow items-center justify-between">
                Docs
                <BookText aria-hidden="true" />
                <span className="sr-only">{"Docs"}</span>
              </div>
            </DropdownMenuItem>
          </a>
          <a href={SUPPORT_EMAIL_URI} target="_blank" rel="noopener noreferrer">
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex grow items-center justify-between">
                Support
                <HandHelping aria-hidden="true" />
                <span className="sr-only">{"Support"}</span>
              </div>
            </DropdownMenuItem>
          </a>
          <a href={FFK_GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex grow items-center justify-between">
                GitHub
                <Github aria-hidden="true" />
                <span className="sr-only">{"GitHub"}</span>
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
            Logout
            <LogOut aria-hidden="true" />
            <span className="sr-only">{"Logout"}</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
