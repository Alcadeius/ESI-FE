"use client"

import LoadingScreen from "@/components/loading-screen"
import React from "react"
import Cookies from "js-cookie"
import axiosInstance from "@/lib/axios"
import { useUser } from "@/hooks/use-user"

export default function GuestLayout({ children }: { children: React.ReactNode }) {
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
      setPageLoading(false)
    }
  }, [setUserData])

  if(pageLoading) return <LoadingScreen />

  return (
    <>
      {children}
    </>
  )
}
