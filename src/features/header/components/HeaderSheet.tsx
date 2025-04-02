"use client";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { SheetSignOutButton } from "~/features/buttons";
import { ThemeToggle } from "~/features/theme-toggle";
// import { getUser } from "~/services/auth";
import {
  BookText,
  Gauge,
  Github,
  HandHelping,
  LogIn,
  Menu,
  Pen,
  UserPen,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { HeaderHomeButton } from "./HeaderHomeButton";

export function HeaderSheet() {
  // const user = await getUser();
  // TODO
  // Make sure email is verified
  const { data: session } = useSession();
  const iconSize = 16;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="h-8 px-3">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-base font-normal">
            <div className="flex items-center justify-between pt-4">
              <SheetClose asChild>
                <HeaderHomeButton />
              </SheetClose>
              <ThemeToggle />
            </div>
          </SheetTitle>
          <SheetDescription className="sr-only">Sheet Menu</SheetDescription>
        </SheetHeader>
        <>
          {/* TODO */}
          {/* Try using server session or using a loading skeleton or just hiding the element */}
          {session === null && (
            <div className="flex flex-col gap-1.5 py-4">
              <SheetClose asChild>
                <Link
                  href="/login"
                  className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Get started</span>
                    <Pen size={iconSize} aria-hidden="true" />
                    <span className="sr-only">{"Get started"}</span>
                  </div>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/login"
                  className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Sign in</span>
                    <LogIn size={iconSize} aria-hidden="true" />
                    <span className="sr-only">{"Sign in"}</span>
                  </div>
                </Link>
              </SheetClose>
            </div>
          )}
          {session && (
            <div className="flex flex-col gap-1.5 py-4">
              {session?.user?.name && (
                <>
                  <span className="px-3 py-1.5 font-medium">
                    {session?.user?.name}
                  </span>
                  <Separator />
                </>
              )}
              <SheetClose asChild>
                <Link
                  href="/formation/step-1"
                  className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Get started</span>
                    <Pen size={iconSize} aria-hidden="true" />
                    <span className="sr-only">{"Get started"}</span>
                  </div>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/dashboard"
                  className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Dashboard</span>
                    <Gauge size={iconSize} aria-hidden="true" />
                    <span className="sr-only">{"Dashboard"}</span>
                  </div>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/profile"
                  className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Profile</span>
                    <UserPen size={iconSize} aria-hidden="true" />
                    <span className="sr-only">{"Profile"}</span>
                  </div>
                </Link>
              </SheetClose>
              <Separator />
              <SheetClose asChild>
                <a
                  href="https://docs.foundationformationkit.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Docs</span>
                    <BookText size={iconSize} aria-hidden="true" />
                    <span className="sr-only">{"Docs"}</span>
                  </div>
                </a>
              </SheetClose>
              <SheetClose asChild>
                <a
                  href="https://github.com/Open-Source-Justice-Foundation/foundation-formation-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">GitHub</span>
                    <Github size={iconSize} aria-hidden="true" />
                    <span className="sr-only">{"GitHub"}</span>
                  </div>
                </a>
              </SheetClose>
              <SheetClose asChild>
                <a
                  href="mailto:info@opensourcejustice.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Support</span>
                    <HandHelping size={iconSize} aria-hidden="true" />
                    <span className="sr-only">{"Support"}</span>
                  </div>
                </a>
              </SheetClose>
              <Separator />
              <SheetClose asChild>
                <SheetSignOutButton />
              </SheetClose>
            </div>
          )}
        </>
      </SheetContent>
    </Sheet>
  );
}
