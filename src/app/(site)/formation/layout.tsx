import { SidebarProvider } from "~/components/ui/sidebar";
import { FormationSidebar } from "~/features/sidebars/formation";

export default function FoundationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="h-full min-h-full px-5 pb-10">
      <FormationSidebar />
      <div className="flex h-full w-full items-center justify-center px-8 md:items-start md:justify-start md:px-6 min-[800px]:px-10 min-[850px]:px-16">
        {children}
      </div>
    </SidebarProvider>
  );
}
