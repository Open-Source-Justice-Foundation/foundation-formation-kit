// import { authOptions } from "~/auth";

import Image from "next/image";
// import { getServerSession } from "next-auth";
import Link from "next/link";

import { GetStartedButton } from "./GetStartedButton";

export async function Header() {
  // const session = await getServerSession(authOptions);
  // const user = session?.user;

  return (
    <header className="flex items-center justify-between border-b px-5 py-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.10)] md:px-20 lg:px-[7.5rem]">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/images/logos/logo.svg"
          width={25}
          height={25}
          alt="Navbar Logo"
          unoptimized={true}
        />
        <span className="pr-4 text-xl font-bold text-logo-foreground">
          Foundation Formation Kit
        </span>
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/login">
          <span className="font-medium text-link-foreground">Sign in</span>
        </Link>
        <GetStartedButton />
      </div>
    </header>
  );
}
