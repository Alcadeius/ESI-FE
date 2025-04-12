"use client"

import LoadingScreen from "@/components/loading-screen"
import { useUser } from "@/hooks/use-user"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import React from "react"
import axiosInstance from "@/lib/axios"

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const [pageLoading, setPageLoading] = React.useState(true)
  const {setUserData} = useUser()

  React.useEffect(() => {
    async function checkAuth() {
      const token = Cookies.get("authToken")

      if (!token) {
        router.push("/login")
        return
      }

      try {
        const user = await axiosInstance.get("/auth/user")
        setUserData(user.data?.data)
        setPageLoading(false)
      } catch (error) {
        console.error("Auth error:", error)
        Cookies.remove("authToken") 
        router.push("/login")
      }
    }

    checkAuth()

    const interval = setInterval(() => {
      if (!Cookies.get("authToken")) {
        router.replace("/login")
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [setUserData, router])

  if(pageLoading) return <LoadingScreen />

  return (
    <>
      {children}
    </>
  )
}