"use client"

import Image from "next/image";
import NavigationBar from "../navigation-bar";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/loading-screen"
import React from "react"
export default function Landing() {
  const router = useRouter();
  const [pageLoading, setPageLoading] = React.useState(true)


  React.useEffect(() => {
    if (Cookies.get("authToken")) {
      router.push("/main")
    } else {
      setPageLoading(false)
    }
  }, [router])
  if(pageLoading) return <LoadingScreen />
  return (
    <div className="text-white bg-gradient-to-b lg:px-20 lg:pt-14 bg-gray-900 h-screen px-4 flex items-start lg:block">

      <div className={cn("bg-[url('/images/optimized/backdrop_1.png')]", "absolute lg:top-1/2 lg:right-[5rem] lg:transform lg:-translate-y-1/2 w-[707px] h-[471px] bg-contain z-0 bg-gray-900 bg-blend-lighten", "-top-20 right-0")}>
      </div>

      {/* Navbar */}
      <NavigationBar />

      {/* Content */}
      <div className={cn("lg:absolute lg:top-1/2 lg:left-[5rem] lg:transform lg:-translate-y-1/2 z-10", "lg:w-1/2 lg:space-y-4 w-full", "relative pb-10 space-y-1 mt-7")}>
        <div className="lg:hidden w-full flex justify-center">
          <Image src="/images/logo.png" alt="" width={150} height={150}/>
        </div>
        <p className={cn("text-center bg-[#FF0000] lg:text-2xl font-medium lg:mx-0 w-fit px-10 py-[6px] rounded-sm lg:mb-0", "text-base mx-auto mb-6")}>Selamat Datang</p>
        <div className="lg:text-5xl font-extrabold text-2xl -space-y-2">
          <div className="text-[#FF0000]">
            E-SPORT INDONESIA
          </div>
          <div className="text-white">
            KOTA DENPASAR
          </div>
        </div>
        <div className="lg:text-3xl font-semibold text-base">
          TANTANGAN DAN KEMENANGAN
        </div>
        <div className="text-base">
          <p>ESI Kota Denpasar merupakan cabang organisasi resmi PBESI yang menaungi sumber daya manusia berbakat dalam kompetisi ajang e-sport dengan tujuan membantu mereka yang memiliki minat dan bakat untuk melanjutkan hobi yang dimiliki hingga ke tingkat yang lebih tinggi.</p>
        </div>
        <div className="grid grid-cols-2 lg:hidden">
          <div className="bg-[#DC2626] mr-3 text-white p-3 rounded-md text-center">
            <a href="/register">Register</a>
          </div>
          <div className="bg-white text-[#DC2626] p-3 rounded-md text-center">
            <a href="/login">Login</a>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="hidden lg:grid grid-cols-2 place-content-center place-items-center z-10">
        <div className="absolute bottom-0 left-[5rem] z-20">
          <svg width="323" height="150" viewBox="0 0 323 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.96" d="M323 150C296.776 139.382 270.338 127.926 259.715 116.221C258.857 128.487 260.318 133.835 264.913 141.806C218.127 128.595 197.56 118.896 188.971 111.204C187.317 122.907 190.348 130.255 199.594 141.806C180.963 132.219 172.65 124.201 162.753 104.181C63.3047 66.0535 36.04 41.4544 9.51236 0C-15.8017 43.9799 5.44403 98.1605 121.618 145.15H74.1536C29.3736 128.538 22.4744 120.919 12.2246 113.211C10.6624 121.787 12.7354 142.065 23.2995 150H323Z" fill="white" />
          </svg>
        </div>
        <div className="absolute bottom-0 z-20 right-[5rem]">
          <svg width="652" height="393" viewBox="0 0 652 393" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 409C52.9358 380.047 106.303 348.813 127.746 316.895C129.477 350.341 126.529 364.925 117.253 386.658C211.693 350.637 253.211 324.191 270.548 303.216C273.885 335.127 267.769 355.162 249.105 386.658C286.713 360.518 303.493 338.654 323.471 284.066C524.215 180.106 579.251 113.032 632.799 0C683.897 119.919 641.011 267.651 406.506 395.777H502.315C592.707 350.481 606.634 329.705 627.324 308.688C630.477 332.073 626.293 387.364 604.968 409H0Z" fill="#FF0000" />
          </svg>
        </div>
      </div>
    </div>
  );
}
