// import { auth } from "~/auth";

import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "~/components/ui/sheet";
import { GetStartedButton } from "~/features/buttons";
import { ThemeToggle } from "~/features/theme-toggle";
import { Menu } from "lucide-react";
import Link from "next/link";

import { NavbarHomeButton } from "./NavbarHomeButton";

export async function Header() {
  // const session = await auth();
  // const user = session?.user;

  return (
    <header className="flex items-center justify-between border-b px-5 py-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.10)] md:px-20 lg:px-[7.5rem] dark:drop-shadow-[0_1px_2px_rgba(73,73,80)]">
      <div className="flex items-center gap-4">
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="h-8 px-[0.6875rem] sm:h-10 sm:px-4"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <div className="flex items-center justify-between pt-4">
                  <NavbarHomeButton />
                  <ThemeToggle />
                </div>
              </SheetHeader>
              <div className="flex flex-col gap-1.5 py-4">
                <Link
                  href="/login"
                  className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <span className="font-medium">Sign in</span>
                </Link>
                <Link
                  href="/login"
                  className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <span className="font-medium">Get started</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <NavbarHomeButton />
      </div>
      <div className="hidden items-center gap-6 md:flex">
        <Link href="/login">
          <span className="font-medium text-link-foreground">Sign in</span>
        </Link>
        <GetStartedButton />
        <ThemeToggle />
      </div>
    </header>
  );
}
