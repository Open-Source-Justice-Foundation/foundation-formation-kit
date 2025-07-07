import { auth } from "~/auth";
import { SidebarProvider } from "~/components/ui/sidebar";
import { FormationSidebar } from "~/features/sidebars/formation";
import { FullPageLoadingSpinner } from "~/features/spinners";
import { redirect } from "next/navigation";

interface CustomCSSProperties extends React.CSSProperties {
  "--sidebar-width"?: string;
  "--sidebar-width-mobile"?: string;
}

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
        <SidebarProvider
          style={
            {
              "--sidebar-width": "16rem",
              "--sidebar-width-mobile": "18rem",
            } as CustomCSSProperties
          }
        >
          <FormationSidebar />
          <div className="flex w-full items-start justify-center pb-6 pl-9 pt-7 md:justify-start md:pt-3 min-[850px]:pl-16">
            {children}
          </div>
        </SidebarProvider>
      )}
    </>
  );
}
