"use client"
import Cookies from "js-cookie";
import LoadingScreen from "@/components/loading-screen";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      // Periksa apakah ada authToken
      if (Cookies.get("authToken")) {
        // Hapus cookie authToken
        Cookies.remove("authToken", { path: "/" });
        if(Cookies == null){
          router.push("/login");
        }
      } else {
        // Jika tidak ada authToken, kembali ke halaman sebelumnya
        router.back();
      }
    };

    // Jalankan fungsi logout
    logout();
  }, [router]);

  return <LoadingScreen />;
}
