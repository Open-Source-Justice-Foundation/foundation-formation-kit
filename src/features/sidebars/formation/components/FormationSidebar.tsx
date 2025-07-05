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
} from "~/components/ui/sidebar";
import { COLLAPSIBLE_TRIGGERS } from "~/features/sidebars/formation/constants/constants";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FormationSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="h-full md:top-[65px] md:pb-[65px] min-[1020px]:top-[73px] min-[1020px]:pb-[73px]">
      <SidebarHeader>Form 1023</SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        {COLLAPSIBLE_TRIGGERS.map((collapsibleTrigger, index) => (
          <Collapsible
            key={collapsibleTrigger.title}
            defaultOpen={pathname.startsWith(collapsibleTrigger.urlBase)}
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel className="justify-between text-left" asChild>
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
                      <SidebarMenuItem key={item.step}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.url === pathname}
                          className="h-full data-[active=true]:bg-sidebar-primary/80 data-[active=true]:focus-visible:ring-ringPrimary/80 dark:data-[active=true]:bg-sidebar-primary/40 dark:data-[active=true]:focus-visible:ring-ringPrimary/40"
                        >
                          <Link
                            className="my-1"
                            href={{
                              pathname: item.url,
                            }}
                          >
                            <Badge
                              className={`mr-1 focus-visible:outline-none ${item.url === pathname ? "bg-transparent text-primary-foreground hover:bg-transparent focus:ring-transparent focus:ring-offset-transparent" : "bg-sidebar-accent hover:bg-sidebar-accent"}`}
                            >
                              {item.step}
                            </Badge>
                            <div
                              className={`text-xs outline-none ${item.url === pathname ? "text-primary-foreground" : "text-foreground"}`}
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
  );
}
