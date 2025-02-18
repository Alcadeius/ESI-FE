"use client"

import React, { useEffect, useState } from "react";
import LoadingScreen from "@/components/loading-screen";
import { useUser } from "@/hooks/use-user"; 

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isError } = useUser(); 
  const [showLoading, setShowLoading] = useState(true); 

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true); 
    } else {
      setShowLoading(false); 
    }
  }, [isLoading]); 

 
  if (isLoading || isError || (user && showLoading)) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
