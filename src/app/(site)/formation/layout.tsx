import { auth } from "~/auth";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { FormationSidebar } from "~/features/sidebars/formation";
import { FullPageLoadingSpinner } from "~/features/spinners";
import { redirect } from "next/navigation";

export default async function FormationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <SidebarProvider>
          <FormationSidebar />
          <SidebarTrigger className="ml-2 mt-2 p-3" />
          <div className="flex grow items-center justify-center py-5 md:items-start md:justify-start md:px-6 md:pt-0 min-[800px]:px-10 min-[850px]:px-16">
            {children}
          </div>
        </SidebarProvider>
      )}
    </>
  );
}
