import { Badge } from "~/components/ui/badge";
import { FFKLogo } from "~/features/logos";
import Link from "next/link";

export function HeaderHomeButton() {
  return (
    <Link href="/" className="flex items-center gap-2 max-[399px]:grow">
      <FFKLogo />
      <span className="hidden text-base font-bold text-logo-foreground min-[400px]:flex sm:text-xl">
        Foundation Formation Kit
      </span>
      <span className="hidden text-base font-bold text-logo-foreground max-[399px]:flex">
        FFK
      </span>
      <span className="flex max-[399px]:grow max-[399px]:justify-end">
        <Badge variant="outline">Alpha</Badge>
      </span>
    </Link>
  );
}
