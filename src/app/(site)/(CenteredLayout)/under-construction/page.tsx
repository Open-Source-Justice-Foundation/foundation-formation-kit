import { auth } from "~/auth";
import { Button } from "~/components/ui/button";
import { FullPageLoadingSpinner } from "~/features/spinners";
import {
  FFK_DOCS_URL,
  FFK_GITHUB_URL,
} from "~/lib/external-links/constants/constants";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function UnderConstructionPage() {
  const session = await auth();

  if (session === null) {
    redirect("/login");
  }

  return (
    <>
      {session === null && (
        <FullPageLoadingSpinner loadingText={"Redirecting to login..."} />
      )}
      {session && (
        <div className="flex items-center px-5 sm:max-w-[68%] sm:px-0 md:max-w-[56%]">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-xl font-medium sm:text-2xl">
              🚧 The Foundation Formation Kit is currently under construction.
              🚧
            </h2>
            <h3 className="text-lg font-medium sm:text-xl">In the meantime:</h3>
            <p className="sm:text-lg">
              Check out the{" "}
              <a
                href={FFK_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link-foreground"
              >
                Foundation Formation Kit Docs 📃
              </a>
            </p>
            <p className="sm:text-lg">
              Look for updates and open issues on{" "}
              <a
                href={FFK_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link-foreground"
              >
                GitHub 💻
              </a>
            </p>

            <Button asChild className="focus-visible:ring-ringPrimary">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
