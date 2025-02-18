"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
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
import { Box, ChevronRight, LayoutDashboard, Receipt, User } from "lucide-react"
import { useUser } from "@/hooks/use-user"

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { userData: user } = useUser()

  const items = [
    {
      title: "Halaman Utama",
      url: "/main",
      icon: <LayoutDashboard />,
    },
    {
      title: "Papan Peringkat",
      url: "/leaderboard",
      icon: <LayoutDashboard />,
    },
    {
      title: "Keranjang",
      url: "/order",
      icon: <Box />,
    },
    {
      title: "Riwayat Transaksi",
      url: "/history",
      icon: <Receipt />,
    },
    {
      title: "Kelola Akun",
      url: "",
      icon: <User />,
      isActive: true,
      items: user ? [
        {
          title: "Keluar",
          url: "/logout",
        }
      ] : [
        {
          title: "Masuk",
          url: "/login",
        },
        {
          title: "Daftar Akun",
          url: "/register",
        }
      ],
    },
  ]

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
                        {item.items.map((subItem, index) => (
                          <SidebarMenuSubItem key={index}>
                            <SidebarMenuSubButton asChild aria-disabled={!subItem?.url}>
                              <a href={subItem?.url}>
                                <span>{subItem?.title}</span>
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
