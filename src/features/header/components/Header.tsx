// import { authOptions } from "~/auth";

import { PenBoxIcon } from "lucide-react";
// import { getServerSession } from "next-auth";
import Link from "next/link";

import { LoginButton } from "./LoginButton";

export async function Header() {
  // const session = await getServerSession(authOptions);
  // const user = session?.user;

  return (
    <header className="relative flex items-center justify-between border-b px-20 py-2 lg:px-[7.5rem]">
      <Link href="/" className="flex items-center gap-2">
        <PenBoxIcon className="h-5 w-5" />
        <span className="text-xl font-bold">Foundation Formation Kit</span>
      </Link>
      <div className="flex items-center gap-4">
        <LoginButton />
      </div>
    </header>
  );
}
