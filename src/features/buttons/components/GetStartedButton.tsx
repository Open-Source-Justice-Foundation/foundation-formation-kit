import { auth } from "~/auth";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export async function GetStartedButton() {
  const session = await auth();

  return (
    <Button
      asChild
      type="button"
      className="text-base focus-visible:ring-ringPrimary"
    >
      <Link href={session ? "/formation/part-1/step-1" : "/login"}>
        Get started
      </Link>
    </Button>
  );
}
