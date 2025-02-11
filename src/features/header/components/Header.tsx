// import { authOptions } from "~/auth";

import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Menu } from "lucide-react";
// import { getServerSession } from "next-auth";
import Link from "next/link";

import { GetStartedButton } from "./GetStartedButton";
import { HomeButton } from "./HomeButton";

export async function Header() {
  // const session = await getServerSession(authOptions);
  // const user = session?.user;

  return (
    <header className="flex items-center justify-between border-b px-5 py-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.10)] md:px-20 lg:px-[7.5rem]">
      <div className="flex items-center gap-4">
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <HomeButton />
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
        <HomeButton />
      </div>
      <div className="hidden items-center gap-6 md:flex">
        <Link href="/login">
          <span className="font-medium text-link-foreground">Sign in</span>
        </Link>
        <GetStartedButton />
      </div>
    </header>
  );
}
