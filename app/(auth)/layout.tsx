"use client"
import Cookies from "js-cookie";
import LoadingScreen from "@/components/loading-screen"
import React from "react"

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (Cookies.get("authToken")) {
      Cookies.remove("authToken")
    }
    setLoading(false)
  }, [])

  if (loading) return <LoadingScreen/>

  return (
    <>
      {children}
    </>
  )
}