import { FFKLogo } from "~/features/logos";
import Link from "next/link";

export function HeaderSheetHomeButton() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <FFKLogo />
      <span className="hidden text-lg font-bold text-logo-foreground min-[463px]:flex sm:text-xl">
        Foundation Formation Kit
      </span>
      <span className="hidden text-lg font-bold text-logo-foreground max-[462px]:flex">
        FFK
      </span>
    </Link>
  );
}
