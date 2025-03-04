import { FFKLogo } from "~/features/logos";
import Link from "next/link";

export function AuthCardHomeButton() {
  return (
    <Link href="/" className="flex items-center justify-center gap-2">
      <FFKLogo />
      <span className="text-base font-bold tracking-normal text-logo-foreground sm:text-xl">
        Foundation Formation Kit
      </span>
    </Link>
  );
}
