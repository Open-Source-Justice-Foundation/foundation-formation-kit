import { FFKLogo } from "~/features/logos";
import Link from "next/link";

export function HeaderSheetHomeButton() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <FFKLogo />
      <span className="hidden text-base font-bold text-logo-foreground min-[420px]:flex min-[463px]:text-lg sm:text-xl">
        Foundation Formation Kit
      </span>
      <span className="hidden text-base font-bold text-logo-foreground max-[419px]:flex">
        FFK
      </span>
    </Link>
  );
}
