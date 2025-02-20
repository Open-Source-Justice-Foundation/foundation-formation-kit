"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { CardHomeButton } from "~/features/auth";
import Link from "next/link";

export default function UpdatedPasswordCard() {
  return (
    <Card className="flex w-[360px] flex-col sm:w-[425px]">
      <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
        <CardTitle>
          <div className="flex flex-col gap-6">
            <CardHomeButton />
            <span className="text-base font-medium sm:text-xl">
              New password saved
            </span>
          </div>
        </CardTitle>
        <CardDescription>
          🚧 Under construction, accounts may be deleted and not work 🚧
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
        <Button asChild className="w-full focus-visible:ring-ringPrimary">
          <Link href="/">Return to Home</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
