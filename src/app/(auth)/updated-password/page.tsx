"use client";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function UpdatedPasswordCard() {
  return (
    <Card className="flex w-[360px] flex-col sm:w-[425px]">
      <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
        <CardTitle>
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center justify-center gap-2">
              <Image
                src="/images/logos/logo.svg"
                width={25}
                height={25}
                alt="Password Updated Logo"
                unoptimized={true}
              />
              <span className="text-xl font-bold tracking-normal text-logo-foreground">
                Foundation Formation Kit
              </span>
            </Link>
            <span className="text-xl font-medium">New password saved</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
        <Button asChild className="w-full">
          <Link href="/">Return to Home</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
