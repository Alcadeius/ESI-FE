"use client"

import LoadingScreen from "@/components/loading-screen";
import { useEffect } from "react";

export default function LogoutPage(){
  useEffect(() => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  }, [])

  return (<LoadingScreen />)
}