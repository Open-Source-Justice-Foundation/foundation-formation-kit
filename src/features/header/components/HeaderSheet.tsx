import { auth } from "~/auth";
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
  HeaderSheetExternalLinks,
  HeaderSheetHomeButton,
  HeaderSheetSignOutButton,
} from "~/features/header";
import { HEADER_SHEET_ICON_BASE_SIZE } from "~/features/header/constants/constants";
import { ThemeToggle } from "~/features/theme-toggle";
import { Gauge, LogIn, Menu, Pen, UserPen } from "lucide-react";
import Link from "next/link";

export async function HeaderSheet() {
  const session = await auth();

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
          {session === null && (
            <div className="flex flex-col gap-1.5 py-4">
              <SheetClose asChild>
                <Link
                  href="/login"
                  className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-2 text-base">
                    <Pen
                      size={HEADER_SHEET_ICON_BASE_SIZE}
                      aria-hidden="true"
                    />
                    <span className="sr-only">Get started</span>
                    <span className="font-medium">Get started</span>
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
                  <div className="flex items-center gap-2 text-base">
                    <LogIn
                      size={HEADER_SHEET_ICON_BASE_SIZE}
                      aria-hidden="true"
                    />
                    <span className="sr-only">Login</span>
                    <span className="font-medium">Login</span>
                  </div>
                </Link>
              </SheetClose>
            </div>
          )}
          {session && (
            <div className="flex flex-col gap-1.5 py-4">
              {session?.user?.name && (
                <>
                  <span className="px-3 py-1.5 text-base font-medium">
                    {session?.user?.name}
                  </span>
                  <Separator />
                </>
              )}
              <SheetClose asChild>
                <Link
                  href="/formation/part-1/step-1"
                  className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-2 text-base">
                    <Pen
                      size={HEADER_SHEET_ICON_BASE_SIZE}
                      aria-hidden="true"
                    />
                    <span className="sr-only">New foundation</span>
                    <span className="font-medium">New foundation</span>
                  </div>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/dashboard"
                  className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-2 text-base">
                    <Gauge
                      size={HEADER_SHEET_ICON_BASE_SIZE}
                      aria-hidden="true"
                    />
                    <span className="sr-only">Dashboard</span>
                    <span className="font-medium">Dashboard</span>
                  </div>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/profile"
                  className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-2 text-base">
                    <UserPen
                      size={HEADER_SHEET_ICON_BASE_SIZE}
                      aria-hidden="true"
                    />
                    <span className="sr-only">Profile</span>
                    <span className="font-medium">Profile</span>
                  </div>
                </Link>
              </SheetClose>
              <Separator />
              <HeaderSheetExternalLinks />
              <Separator />
              <HeaderSheetSignOutButton />
            </div>
          )}
        </>
      </SheetContent>
    </Sheet>
  );
}
