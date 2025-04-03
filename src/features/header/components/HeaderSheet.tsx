"use client";

import { useState } from "react";

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
import {
  HEADER_SHEET_ICON_BASE_SIZE,
  HEADER_SHEET_ICON_SMALL_SIZE,
} from "~/features/header/constants/constants";
import { ThemeToggle } from "~/features/theme-toggle";
// import { getUser } from "~/services/auth";
import { Gauge, LogIn, LogOut, Menu, Pen, UserPen } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";

import { HeaderSheetExternalLinks } from "./HeaderSheetExternalLinks";
import { HeaderSheetHomeButton } from "./HeaderSheetHomeButton";

export function HeaderSheet() {
  // const user = await getUser();
  // TODO
  // Make sure email is verified
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="h-8 px-3">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="font-normal">
            <div className="flex items-center justify-between pt-4">
              <SheetClose asChild>
                <HeaderSheetHomeButton />
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
            <div className="flex flex-col gap-1 py-4 min-[463px]:gap-1.5">
              <SheetClose asChild>
                <Link
                  href="/login"
                  className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center justify-between text-sm min-[463px]:text-base">
                    <span className="font-medium">Get started</span>
                    <Pen
                      size={HEADER_SHEET_ICON_SMALL_SIZE}
                      className="hidden max-[462px]:block"
                      aria-hidden="true"
                    />
                    <Pen
                      size={HEADER_SHEET_ICON_BASE_SIZE}
                      className="hidden min-[463px]:block"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{"Get started"}</span>
                  </div>
                </Link>
              </SheetClose>
              <Separator />
              <HeaderSheetExternalLinks />
              <Separator />
              <SheetClose asChild>
                <Link
                  href="/login"
                  className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center justify-between text-sm min-[463px]:text-base">
                    <span className="font-medium">Login</span>
                    <LogIn
                      size={HEADER_SHEET_ICON_SMALL_SIZE}
                      className="hidden max-[462px]:block"
                      aria-hidden="true"
                    />
                    <LogIn
                      size={HEADER_SHEET_ICON_BASE_SIZE}
                      className="hidden min-[463px]:block"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{"Login"}</span>
                  </div>
                </Link>
              </SheetClose>
            </div>
          )}
          {session && (
            <div className="flex flex-col gap-1 py-4 min-[463px]:gap-1.5">
              {session?.user?.name && (
                <>
                  <span className="px-3 py-1.5 text-sm font-medium min-[463px]:text-base">
                    {session?.user?.name}
                  </span>
                  <Separator />
                </>
              )}
              <SheetClose asChild>
                <Link
                  href="/formation/step-1"
                  className={`rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground ${isLoading ? "pointer-events-none opacity-50" : ""}`}
                >
                  <div className="flex items-center justify-between text-sm min-[463px]:text-base">
                    <span className="font-medium">New foundation</span>
                    <Pen
                      size={HEADER_SHEET_ICON_SMALL_SIZE}
                      className="hidden max-[462px]:block"
                      aria-hidden="true"
                    />
                    <Pen
                      size={HEADER_SHEET_ICON_BASE_SIZE}
                      className="hidden min-[463px]:block"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{"New foundation"}</span>
                  </div>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/dashboard"
                  className={`rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground ${isLoading ? "pointer-events-none opacity-50" : ""}`}
                >
                  <div className="flex items-center justify-between text-sm min-[463px]:text-base">
                    <span className="font-medium">Dashboard</span>
                    <Gauge
                      size={HEADER_SHEET_ICON_SMALL_SIZE}
                      className="hidden max-[462px]:block"
                      aria-hidden="true"
                    />
                    <Gauge
                      size={HEADER_SHEET_ICON_BASE_SIZE}
                      className="hidden min-[463px]:block"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{"Dashboard"}</span>
                  </div>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/profile"
                  className={`rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground ${isLoading ? "pointer-events-none opacity-50" : ""}`}
                >
                  <div className="flex items-center justify-between text-sm min-[463px]:text-base">
                    <span className="font-medium">Profile</span>
                    <UserPen
                      size={HEADER_SHEET_ICON_SMALL_SIZE}
                      className="hidden max-[462px]:block"
                      aria-hidden="true"
                    />
                    <UserPen
                      size={HEADER_SHEET_ICON_BASE_SIZE}
                      className="hidden min-[463px]:block"
                      aria-hidden="true"
                    />

                    <span className="sr-only">{"Profile"}</span>
                  </div>
                </Link>
              </SheetClose>
              <Separator />
              <HeaderSheetExternalLinks />
              <Separator />
              <SheetClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-9 px-3 py-1.5 focus-visible:outline-ring/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                  onClick={handleSignOutOnClick}
                  disabled={isLoading}
                >
                  <div className="flex grow items-center justify-between text-sm min-[463px]:text-base">
                    Logout
                    <LogOut
                      size={HEADER_SHEET_ICON_SMALL_SIZE}
                      className="hidden max-[462px]:block"
                      aria-hidden="true"
                    />
                    <LogOut
                      size={HEADER_SHEET_ICON_BASE_SIZE}
                      className="hidden min-[463px]:block"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{"Logout"}</span>
                  </div>
                </Button>
              </SheetClose>
            </div>
          )}
        </>
      </SheetContent>
    </Sheet>
  );
}
