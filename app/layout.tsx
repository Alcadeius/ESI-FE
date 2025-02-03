import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar";
import Logo from "@/components/logo";

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
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider open={false}>
          <AppSidebar />
          <main className="bg-gray-900 w-full">
            <div className="text-white bg-gray lg:hidden w-full flex justify-between items-center p-4 fixed bg-gray-900 z-50 shadow-md">
              <Logo className="size-10" />
              <div className="font-medium text-base">ESI DENPASAR</div>
              <SidebarTrigger className="w-fit bg-gray-700 size-10" />
            </div>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
