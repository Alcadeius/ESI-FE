"use client"
import Cookies from "js-cookie";
import LoadingScreen from "@/components/loading-screen"
import React from "react"
import { useRouter } from "next/navigation";
export default function GuestLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = React.useState(true)
  React.useEffect(() => {
    if (Cookies.get("authToken")) {
      router.push("/main")
    } else {
      setPageLoading(false)
    }
  }, [router])
  if(pageLoading) return <LoadingScreen />

  return (
    <>
      {children}
    </>
  )
}