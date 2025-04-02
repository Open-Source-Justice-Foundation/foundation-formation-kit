"use client";

import { GetStartedButton } from "~/features/buttons";
import { ThemeToggle } from "~/features/theme-toggle";
import { LogIn } from "lucide-react";
// import { getUser } from "~/services/auth";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { HeaderDropdownMenu } from "./HeaderDropdownMenu";
import { HeaderHomeButton } from "./HeaderHomeButton";
import { HeaderSheet } from "./HeaderSheet";

export function Header() {
  // const user = await getUser();
  // TODO
  // Make sure email is verified
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between border-b px-6 py-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.10)] lg:px-8 dark:drop-shadow-[0_1px_2px_rgba(73,73,80)]">
      <div className="flex items-center gap-4">
        <div className="flex md:hidden">
          <HeaderSheet />
        </div>
        <HeaderHomeButton />
      </div>
      <div className="hidden items-center gap-6 md:flex">
        {/* TODO */}
        {/* Try using server session or using a loading skeleton or just hiding the element */}
        <GetStartedButton />
        <ThemeToggle />
        {session === null && (
          <Link href="/login">
            <div className="flex gap-2 text-link-foreground">
              <span className="font-medium">Sign in</span>
              <LogIn aria-hidden="true" />
              <span className="sr-only">{"Sign in"}</span>
            </div>
          </Link>
        )}
        {session && <HeaderDropdownMenu />}
      </div>
    </header>
  );
}
