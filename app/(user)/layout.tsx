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
      const user = await axiosInstance.get("/auth/user").then((res) => { return res.data?.data })
      setUserData(user)
      setPageLoading(false)
    }
    if (Cookies.get("authToken")) {
      checkAuth()
    } else {
      router.replace("/login")
    }
  }, [setUserData, router])

  if(pageLoading) return <LoadingScreen />

  return (
    <>
      {children}
    </>
  )
}