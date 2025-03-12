import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { AuthCardHomeButton, AuthErrorMessage } from "~/features/auth";
import { OctagonAlert } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AuthErrorPage() {
  return (
    <Card className="flex w-[360px] flex-col sm:w-[425px]">
      <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
        <CardTitle>
          <div className="flex flex-col gap-6">
            <AuthCardHomeButton />
            <span className="flex gap-x-2 text-base font-medium sm:text-xl">
              <OctagonAlert aria-hidden="true" />
              Something went wrong...
            </span>
          </div>
        </CardTitle>
        <CardDescription>
          <AuthErrorMessage />
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
