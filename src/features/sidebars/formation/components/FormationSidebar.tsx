"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Legal Name",
    url: "/formation/step-1",
    step: "1",
  },
  {
    title: "Step 2",
    url: "/formation/step-2",
    step: "2",
  },
  {
    title: "Step 3",
    url: "/formation/step-3",
    step: "3",
  },
  {
    title: "Step 4",
    url: "/formation/step-4",
    step: "4",
  },
  {
    title: "Step 5",
    url: "/formation/step-5",
    step: "5",
  },
];

export function FormationSidebar() {
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  return (
    <>
      {!isMobile && (
        <Sidebar className="static h-full">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.url === pathname}
                      >
                        <Link
                          className="my-1"
                          href={{
                            pathname: item.url,
                          }}
                        >
                          <div className="w-[1.5rem] rounded-full bg-primary text-center text-primary-foreground sm:text-base">
                            {item.step}
                          </div>
                          <span className="sm:text-lg">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}
    </>
  );
}
