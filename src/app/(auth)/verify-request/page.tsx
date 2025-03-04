import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { AuthCardHomeButton } from "~/features/auth";
import Link from "next/link";

export default function VerifyRequestPage() {
  return (
    <Card className="flex w-[360px] flex-col sm:w-[425px]">
      <CardHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
        <CardTitle>
          <div className="flex flex-col gap-6">
            <AuthCardHomeButton />
            <span className="text-base font-medium sm:text-xl">
              Check your email
            </span>
          </div>
        </CardTitle>
        <CardDescription>
          A sign in link has been sent to your email address.
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
