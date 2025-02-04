import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="row-start-2 flex flex-col items-center gap-8">
        <h2 className="text-center text-[1.65rem] font-semibold text-foreground/80">
          Get a tax exempt status for your open source project
        </h2>
        <p className="text-center">
          Foundation formation kit is a guide to help open source projects
          become non-profit foundations and be ready to receive tax-advantaged
          donations!
        </p>
        <Button asChild>
          <Link href="/login">Get started</Link>
        </Button>
      </div>
    </div>
  );
}
