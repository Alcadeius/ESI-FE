import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger,SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import Logo from "@/components/logo";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ESI Denpasar",
  description: "Developed By Gardev Team",
  icons: {
    icon: ['/images/bordered_logo-1.png'], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=New+Rocker&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.cdnfonts.com/css/supertalls" rel="stylesheet" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <SidebarProvider >
      <SidebarInset>
        <main className="bg-gray-900 w-full">
            <div className="text-white bg-gray lg:hidden w-full flex justify-between items-center p-4 bg-gray-900 relative z-40 shadow-md ">
              <a href="/main"><Logo className="size-10"/></a>
              <div className="font-medium text-base">ESI DENPASAR</div>
              <SidebarTrigger className="w-fit bg-gray-700 size-10" />
            </div>
            {/* <div className="w-full h-[72px] lg:hidden"></div> */}
            {children}
          </main>
      </SidebarInset>
      <AppSidebar side="left" className="lg:hidden absolute z-50 "/>
    </SidebarProvider>
        {/* <SidebarProvider open={false}>
          <SidebarInset>
          <main className="bg-gray-900 w-full">
            <div className="text-white bg-gray lg:hidden w-full flex justify-between items-center p-4 bg-gray-900 z-50 shadow-md fixed">
              <a href="/main"><Logo className="size-10"/></a>
              <div className="font-medium text-base">ESI DENPASAR</div>
              <SidebarTrigger className="w-fit bg-gray-700 size-10" />
            </div>
            <div className="w-full h-[72px] lg:hidden"></div>
            {children}
          </main>
        </SidebarInset>
        <AppSidebar className="lg:hidden" side="right" />
        </SidebarProvider> */}
      </body>
    </html>
  );
}
