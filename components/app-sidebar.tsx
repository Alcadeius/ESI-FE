import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { ChevronRight, LayoutDashboard, User } from "lucide-react"

const items = [
  {
    title: "Main Page",
    url: "",
    isActive: true,
    icon: <LayoutDashboard/>,
    items: [
      {
        title: "Beranda",
        url: "/main",
      },
      {
        title: "Landing Page",
        url: "/",
      },
      {
        title: "Event Submission",
        url : "/event-submit",
      },
    ],
  },
  {
    title: "Account Page",
    url: "",
    icon: <User/>,
    isActive: true,
    items: [
      {
        title: "Login",
        url: "/login",
      },
      {
        title: "Register",
        url: "/register",
      },
    ],
  },
]

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
      <SidebarGroup>
      <SidebarGroupLabel>ESI KOTA DENPASAR</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                {item.url ? (
                  <a href={item.url}>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </a>
                ) : (
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && item.icon}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                )}
              </CollapsibleTrigger>
              {item.items && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild aria-disabled={!subItem.url}>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
