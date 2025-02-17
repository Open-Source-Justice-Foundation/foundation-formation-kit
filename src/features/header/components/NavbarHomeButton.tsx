"use client";

import { FFKLogo } from "~/features/logos";
import Link from "next/link";

export function NavbarHomeButton() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <FFKLogo />
      <span className="pr-4 text-base font-bold text-logo-foreground sm:text-xl">
        Foundation Formation Kit
      </span>
    </Link>
  );
}
