"use client";

import { Badge } from "~/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "~/components/ui/sidebar";
import { COLLAPSIBLE_TRIGGERS } from "~/features/sidebars/formation/constants/constants";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FormationSidebar() {
  const pathname = usePathname();

  const { open, state, isMobile, setOpenMobile } = useSidebar();

  return (
    <>
      <Sidebar className="md:top-[65px] md:pb-[65px] min-[1020px]:top-[73px] min-[1020px]:pb-[73px]">
        <SidebarHeader>Form 1023</SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          {COLLAPSIBLE_TRIGGERS.map((collapsibleTrigger, index) => (
            <Collapsible
              key={collapsibleTrigger.id}
              defaultOpen={pathname.startsWith(collapsibleTrigger.urlBase)}
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel
                  className="justify-between text-left"
                  asChild
                >
                  <CollapsibleTrigger>
                    {collapsibleTrigger.title}
                    <ChevronDown className="ml-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    <span className="sr-only">Toggle</span>
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {collapsibleTrigger.sidebarGroupContent.map((item) => (
                        <SidebarMenuItem className="mx-3" key={item.step}>
                          <SidebarMenuButton
                            asChild
                            isActive={item.url === pathname}
                            className="h-full data-[active=true]:bg-sidebar-primary/80 data-[active=true]:font-normal data-[active=true]:focus-visible:ring-ringPrimary dark:data-[active=true]:bg-sidebar-primary/40 dark:data-[active=true]:focus-visible:ring-ringPrimary/80"
                          >
                            <Link
                              className="my-1"
                              href={{
                                pathname: item.url,
                              }}
                              onClick={() => isMobile && setOpenMobile(!open)}
                            >
                              <Badge
                                className={`mr-1 transition-none ${item.url === pathname ? "bg-transparent text-primary-foreground hover:bg-transparent focus:ring-ringPrimary focus:ring-offset-ringPrimary focus-visible:outline-ringPrimary dark:focus:ring-ringPrimary/80 dark:focus:ring-offset-ringPrimary/80 dark:focus-visible:outline-ringPrimary/80" : "bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent"}`}
                              >
                                {item.step}
                              </Badge>
                              <div
                                className={`text-xs outline-none ${item.url === pathname ? "text-primary-foreground" : "text-sidebar-foreground"}`}
                              >
                                {item.title}
                              </div>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
              <SidebarSeparator
                className={`${COLLAPSIBLE_TRIGGERS.length - 1 === index && "hidden"}`}
              />
            </Collapsible>
          ))}
        </SidebarContent>
      </Sidebar>
      <SidebarTrigger
        className={`fixed top-[65px] ml-2 mt-2 p-3 md:transition-[left] md:duration-200 md:ease-linear min-[1020px]:top-[73px] ${state === "expanded" && !isMobile ? "left-[255px]" : "left-0"}`}
      />
    </>
  );
}
