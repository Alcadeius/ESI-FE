"use client"

import LoadingScreen from "@/components/loading-screen"
import { useUser } from "@/hooks/use-user"
import React from "react"

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useUser()

  if (isLoading) return <LoadingScreen/>

  return (
    <>
      {children}
    </>
  )
}