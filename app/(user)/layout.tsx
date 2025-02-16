"use client"

import LoadingScreen from "@/components/loading-screen"
import { useUser } from "@/hooks/use-user"
import { useRouter } from "next/navigation"
import React from "react"
import Cookies from "js-cookie"
export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { isLoading, user } = useUser()
  const router = useRouter()

  if (isLoading) return <LoadingScreen/>

  if (!isLoading && !user) {
    Cookies.remove("authToken")
    router.push("/login")
  }

  return (
    <>
      {children}
    </>
  )
}