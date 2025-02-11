"use client";

import Image from "next/image";
import Link from "next/link";

export function HomeButton() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/logos/logo.svg"
        width={25}
        height={25}
        alt="Home Button Logo"
        unoptimized={true}
      />
      <span className="pr-4 text-xl font-bold text-logo-foreground">
        Foundation Formation Kit
      </span>
    </Link>
  );
}
