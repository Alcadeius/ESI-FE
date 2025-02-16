"use client"
import Cookies from "js-cookie";
import LoadingScreen from "@/components/loading-screen";
import { useEffect } from "react";

export default function LogoutPage(){
  useEffect(() => {
    Cookies.remove("authToken");
    window.location.href = "/login";
  }, [])

  return (<LoadingScreen />)
}