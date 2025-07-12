import { UrlObject } from "url";

import { Button } from "~/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

interface FormationNavigationButtonsProps {
  prevHref: Route | UrlObject;
  isLoading: boolean;
}

export function FormationNavigationButtons({
  prevHref,
  isLoading,
}: FormationNavigationButtonsProps) {
  return (
    <div className="flex justify-between">
      <Button
        asChild
        type="button"
        className="w-1/4 min-w-[92px] gap-3 focus-visible:ring-ringPrimary"
        disabled={isLoading}
      >
        <Link href={prevHref} className="text-base">
          <MoveLeft aria-hidden="true" />
          <span className="sr-only">Previous Step</span>
          Prev
        </Link>
      </Button>
      <Button
        type="submit"
        className="w-1/4 min-w-[92px] gap-3 focus-visible:ring-ringPrimary"
        disabled={isLoading}
      >
        Next
        <MoveRight aria-hidden="true" />
        <span className="sr-only">Next Step</span>
      </Button>
    </div>
  );
}
