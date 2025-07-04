"use client";

import { Button } from "~/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderActionButton() {
  const pathname = usePathname();

  return (
    <Button
      asChild
      type="button"
      className="text-base focus-visible:ring-ringPrimary"
    >
      {typeof pathname === "string" &&
        (pathname?.startsWith("/formation") ? (
          <Link href="/dashboard">Dashboard</Link>
        ) : (
          <Link href="/formation/part-1/step-1">New foundation</Link>
        ))}
    </Button>
  );
}
