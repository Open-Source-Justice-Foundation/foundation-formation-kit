"use client";

import { Button } from "~/components/ui/button";
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
    <header className="flex items-center justify-between border-b px-6 py-4 lg:px-8">
      <div className="flex w-full items-center gap-4">
        <div className="flex md:hidden">
          <HeaderSheet />
        </div>
        <HeaderHomeButton />
      </div>
      <div className="hidden items-center gap-4 md:flex">
        {/* TODO */}
        {/* Try using server session or using a loading skeleton or just hiding the element */}
        <ThemeToggle />
        {session === null && (
          <Button
            asChild
            type="button"
            variant="outline"
            className="text-base [&_svg]:size-5"
          >
            <Link href="/login">
              <div className="flex items-center gap-2">
                Login
                <LogIn aria-hidden="true" />
                <span className="sr-only">{"Login"}</span>
              </div>
            </Link>
          </Button>
        )}
        {session && <HeaderDropdownMenu />}
      </div>
    </header>
  );
}
