"use client";

import { Button } from "~/components/ui/button";
import {
  DashboardButton,
  GetStartedButton,
  NewFoundationButton,
} from "~/features/buttons";
import { ThemeToggle } from "~/features/theme-toggle";
import {
  FFK_DOCS_URL,
  SUPPORT_EMAIL_URI,
} from "~/lib/auth/constants/constants";
import { ExternalLink, LogIn } from "lucide-react";
// import { getUser } from "~/services/auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { HeaderDropdownMenu } from "./HeaderDropdownMenu";
import { HeaderHomeButton } from "./HeaderHomeButton";
import { HeaderSheet } from "./HeaderSheet";

export function Header() {
  // const user = await getUser();
  // TODO
  // Make sure email is verified
  // Make sure session is being handled properly
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between border-b px-6 py-4 lg:px-8">
      <div className="flex w-full items-center gap-4">
        <div className="hidden max-[1019px]:flex">
          <HeaderSheet />
        </div>
        <HeaderHomeButton />
      </div>
      <div className="hidden items-center gap-6 min-[1020px]:flex">
        {/* TODO */}
        {/* Try using server session or using a loading skeleton or just hiding the element */}
        {session === null && <GetStartedButton />}
        {session &&
          typeof pathname === "string" &&
          (pathname?.startsWith("/formation") ? (
            <DashboardButton />
          ) : (
            <NewFoundationButton />
          ))}
        <Button
          type="button"
          variant="link"
          className="p-0 text-base text-foreground underline-offset-0 hover:text-primary hover:no-underline"
        >
          <a href={FFK_DOCS_URL} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center gap-2">
              Docs
              <ExternalLink aria-hidden="true" />
              <span className="sr-only">{"External link"}</span>
            </div>
          </a>
        </Button>
        <Button
          type="button"
          variant="link"
          className="p-0 text-base text-foreground underline-offset-0 hover:text-primary hover:no-underline"
        >
          <a href={SUPPORT_EMAIL_URI} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center gap-2">
              Support
              <ExternalLink aria-hidden="true" />
              <span className="sr-only">{"External link"}</span>
            </div>
          </a>
        </Button>
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
