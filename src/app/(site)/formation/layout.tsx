import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { FormationSidebar } from "~/features/sidebars/formation";

export default function FormationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="min-h-full grow px-5">
      <FormationSidebar />
      <SidebarTrigger className="mt-2 p-3 md:ml-2" />
      <div className="flex grow items-center justify-center py-5 md:items-start md:justify-start md:px-6 md:pt-0 min-[800px]:px-10 min-[850px]:px-16">
        {children}
      </div>
    </SidebarProvider>
  );
}
