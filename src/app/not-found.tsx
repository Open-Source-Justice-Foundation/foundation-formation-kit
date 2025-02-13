import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen">
      <div className="flex h-full flex-col items-center justify-center p-5 text-center">
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
          404 - Page Not Found
        </h1>
        <p className="mb-8 max-w-md text-base sm:text-lg">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might
          have been moved or deleted.
        </p>
        <Button asChild className="focus-visible:ring-ringPrimary">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
