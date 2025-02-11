"use client"

import LoadingScreen from "@/components/loading-screen"
import React, { Suspense } from "react"

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      {children}
    </Suspense>
  )
}