import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import Logo from "@/components/logo";
import { UserProvider } from "@/context/user-context";

const supertalls = localFont({
  src: "./fonts/Supertalls.woff",
  variable: "--font-supertall",
  weight: "100 900",
});

const newRocker = localFont({
  src: "./fonts/NewRocker-Regular.ttf",
  variable: "--font-new-rocker",
  weight: "400",
});

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
      <body className={`${geistSans.variable} ${geistMono.variable} ${supertalls.variable} ${newRocker.variable} antialiased`}>
        <UserProvider>
          <SidebarProvider >
            <SidebarInset>
              <main className="bg-gray-900 w-full min-h-screen">
                <div className="text-white bg-gray lg:hidden w-full flex justify-between items-center p-4 bg-gray-900 relative z-40 shadow-md ">
                  <a href="/main"><Logo className="size-10" /></a>
                  <div className="font-medium text-base font-supertall">ESI DENPASAR</div>
                  <SidebarTrigger className="w-fit bg-gray-700 size-10" />
                </div>
                {children}
              </main>
            </SidebarInset>
            <AppSidebar side="left" className="lg:hidden absolute z-50 " />
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
