import { auth } from "~/auth";
import { Button } from "~/components/ui/button";
import { GetStartedButton } from "~/features/buttons";
import {
  HeaderActionButton,
  HeaderDropdownMenu,
  HeaderHomeButton,
  HeaderSheet,
} from "~/features/header";
import { ThemeToggle } from "~/features/theme-toggle";
import {
  FFK_DOCS_URL,
  SUPPORT_EMAIL_URI,
} from "~/lib/auth/constants/constants";
import { ExternalLink, LogIn } from "lucide-react";
import Link from "next/link";

export async function Header() {
  const session = await auth();

  return (
    <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b bg-background px-6 py-4 lg:px-8">
      <div className="flex w-full items-center gap-4">
        <div className="hidden max-[1019px]:flex">
          <HeaderSheet />
        </div>
        <HeaderHomeButton />
      </div>
      <div className="hidden items-center gap-6 min-[1020px]:flex">
        {session === null && <GetStartedButton />}
        {session && <HeaderActionButton />}
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
    /* )} */
  );
}
