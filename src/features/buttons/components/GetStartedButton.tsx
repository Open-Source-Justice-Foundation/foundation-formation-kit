"use client";

import { Button } from "~/components/ui/button";
import Link from "next/link";

// import { signIn } from "next-auth/react";

export function GetStartedButton() {
  return (
    /* <Button */
    /*   onClick={() => signIn()} */
    /*   type="submit" */
    /*   className="focus-visible:ring-ringPrimary" */
    /* > */
    /*   <span className="text-base">Get started</span> */
    /* </Button> */
    <Button asChild className="focus-visible:ring-ringPrimary">
      <Link href="/under-construction" className="text-base">
        Get started
      </Link>
    </Button>
  );
}
