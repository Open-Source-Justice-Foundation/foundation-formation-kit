import { Badge } from "~/components/ui/badge";
import { FFKLogo } from "~/features/logos";
import Link from "next/link";

export function HeaderHomeButton() {
  return (
    <Link href="/" className="flex items-center gap-2 max-[397px]:grow">
      <FFKLogo />
      <span className="hidden text-base font-bold text-logo-foreground min-[398px]:flex sm:text-xl">
        Foundation Formation Kit
      </span>
      <span className="hidden text-base font-bold text-logo-foreground max-[397px]:flex">
        FFK
      </span>
      <span className="flex max-[397px]:grow max-[397px]:justify-end">
        <Badge variant="outline">Alpha</Badge>
      </span>
    </Link>
  );
}
