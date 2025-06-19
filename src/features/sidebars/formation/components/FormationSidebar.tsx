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
    title: "Organization Identification",
    url: "/formation/part-1/step-1",
    step: "1",
  },
  {
    title: "Employer Identification Number",
    url: "/formation/part-1/step-2",
    step: "2",
  },
  {
    title: "Month Tax Year Ends",
    url: "/formation/part-1/step-3",
    step: "3",
  },
  {
    title: "Person to Contact",
    url: "/formation/part-1/step-4",
    step: "4",
  },
  {
    title: "Contact Telephone Number",
    url: "/formation/part-1/step-5",
    step: "5",
  },
  {
    title: "Fax Number",
    url: "/formation/part-1/step-6",
    step: "6",
  },
  {
    title: "User Fee Submitted",
    url: "/formation/part-1/step-7",
    step: "7",
  },
  // TODO
  // This needs to be updated
  {
    title: "Organization Type",
    url: "/formation/part-2/step-1",
    step: "8",
  },
  {
    title: "Date You Formed",
    url: "/formation/part-2/step-2",
    step: "9",
  },
  {
    title: "State of Formation",
    url: "/formation/part-2/step-3",
    step: "10",
  },
  {
    title: "Adopted Bylaws",
    url: "/formation/part-2/step-4",
    step: "11",
  },
  {
    title: "Successor to Another Organization",
    url: "/formation/part-2/step-5",
    step: "12",
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
                        className="data-[active=true]:bg-sidebar-primary/80 dark:data-[active=true]:bg-sidebar-primary/40"
                      >
                        <Link
                          className="my-1"
                          href={{
                            pathname: item.url,
                          }}
                        >
                          <div
                            className={`w-[1.5rem] rounded-full ${item.url === pathname ? "text-primary-foreground" : "bg-sidebar-accent"} text-center sm:text-base`}
                          >
                            {item.step}
                          </div>
                          <span
                            className={`sm:text-lg ${item.url === pathname ? "text-primary-foreground" : "text-foreground"}`}
                          >
                            {item.title}
                          </span>
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
