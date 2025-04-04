import { SidebarProvider } from "~/components/ui/sidebar";
import { FormationSidebar } from "~/features/sidebars/formation";

export default function FoundationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="min-h-full grow px-5">
      <FormationSidebar />
      <div className="flex grow items-center justify-center py-5 md:items-start md:justify-start md:px-6 md:pt-0 min-[800px]:px-10 min-[850px]:px-16">
        {children}
      </div>
    </SidebarProvider>
  );
}
