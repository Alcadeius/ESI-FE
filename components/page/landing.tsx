"use client"
import Logo from "../ui/logo-2";
// import { Button } from "../ui/button";
import Image from "next/image";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import AppSidebar from "../app-sidebar";
export default function Landing() {
 
  return (
   <div className="text-white bg-gradient-to-b lg:px-10 lg:py-10 from-black to to-blue-900/30 lg:h-screen">
     {/* Header */}
     <SidebarProvider className='lg:hidden relative z-20' >
      <SidebarInset className='bg-transparent'>
        <header className="flex h-16 justify-end shrink-0 items-center px-3">
          <SidebarTrigger className="rotate-180 scale-125" />
        </header>
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
    <header className='hidden w-full lg:grid lg:grid-cols-4 lg:shadow-none 2xl:text-4xl shadow-md shadow-gray-500/50 justify-between items-center content-center place-content-center lg:place-items-center text-white'>
            <div className='hidden lg:flex h-full place-content-start items-center col-span-3 w-full'>
            <div className="mx-3">
            <Logo className='h-10 w-10 md:h-20 md:w-20 lg:w-14 lg:h-14 2xl:w-32 2xl:h-32'/>
            </div>
            <div className="mx-3">
            <a href="/main" className='underline underline-offset-4 lg:no-underline'>Beranda</a>
            </div>
            <div className="mx-3">
            <a className=''>Papan Peringkat</a>
            </div>
            <div className="mx-3">
            <a href='/order' className=''>Keranjang</a>
            </div>
            <div className="mx-3">
            <a className=''>Bantuan</a>
            </div>
            </div>
            <div className="lg:hidden">
            <Logo className='h-10 w-10 md:h-20 md:w-20 lg:w-14 lg:h-14 '/>
            </div>
            <div className='lg:hidden'>
                <a className='underline underline-offset-4 lg:no-underline'>Beranda</a>
            </div>
            <div className="hidden lg:flex justify-end w-full h-full text-center items-center">
            <div className="bg-[#DC2626] mr-3 text-white p-3 2xl:w-full rounded-md">
            <a href="/register">Register</a>
            </div>
            <div className="bg-white text-[#DC2626] p-3 2xl:w-full rounded-md">
            <a href="/login">Login</a>
            </div>
            </div>
            <div className="h-fit flex items-center">
            <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6 md:size-8 items-center my-auto align-middle lg:hidden">
            <path fillRule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
            </svg>
            </button>
            </div>
           </header>
    <div className="flex flex-col lg:grid lg:grid-cols-12 2xl:h-3/4 xl:h-96 xl:w-full lg:overflow-hidden lg:mt-10 2xl:mt-0 lg:bg-none bg-[url('/images/DSCF4041-3.png')] md:bg-center lg:before:hidden shadow-xl shadow-black lg:shadow-none  before:content-[''] before:absolute before:w-full before:h-[50vh] before:z-10 before:bg-[#111827] before:opacity-45 before:blur-lg bg-cover bg-no-repeat xl:place-content-stretch  place-items-center place-content-center items-center">
    <div className="my-3 mb-5 w-32 h-32 items-center grid place-items-center relative z-10 lg:hidden">
      <Logo />
    </div>
    <div className="bg-[#DC2626]/90 p-2 mb-12 rounded-md w-[60%] relative z-10 lg:hidden ">
      <p className="text-center">Selamat Datang</p>
    </div>
    <div className="hidden col-span-6 2xl:text-4xl lg:flex z-20 h-full  justify-center relative flex-col mt-10 px-5">
    <p className="text-center bg-[#FF0000] w-1/2 p-2   rounded-md mb-3">Selamat Datang</p>
    <div className="text-[#FF0000] text-4xl 2xl:text-7xl font-bold">
    E-SPORT INDONESIA 
    </div>
    <div className="text-white text-4xl 2xl:text-7xl font-bold">
      KOTA DENPASAR
    </div>
    <div className="font-semibold text-lg 2xl:text-4xl">
    TANTANGAN DAN KEMENANGAN
    </div>
    <div className="text-xs 2xl:text-3xl">
      <p>ESI Kota Denpasar merupakan cabang organisasi resmi PBESI yang menaungi sumber daya manusia berbakat dalam kompetisi ajang e-sport dengan tujuan membantu mereka yang memiliki minat dan bakat untuk melanjutkan hobi yang dimiliki hingga ke tingkat yang lebih tinggi.</p>
    </div>
    </div>
    <div className="bg-[url('/images/DSCF4041-4.png')] relative z-10 float-right col-span-6  bg-cover bg-center bg-no-repeat h-full w-full">
    <p className="w-full h-full bg-gradient-to-b from-black to to-blue-900/30 blur-lg opacity-35"></p>
    </div>
    </div>
    <div className="flex flex-col w-full relative px-5 py-5 z-10 lg:hidden">
    <div className="text-[#DC2626] text-2xl font-bold">
    E-SPORT INDONESIA 
    </div>
    <div className="text-white text-2xl font-bold">
      KOTA DENPASAR
    </div>
    <div>
    TANTANGAN DAN KEMENANGAN
    </div>
    <div className="text-xs">
      <p>ESI Kota Denpasar merupakan cabang organisasi resmi PBESI yang menaungi sumber daya manusia berbakat dalam kompetisi ajang e-sport dengan tujuan membantu mereka yang memiliki minat dan bakat untuk melanjutkan hobi yang dimiliki hingga ke tingkat yang lebih tinggi.</p>
    </div>
    <div className="flex mt-5 max-w-sm lg:hidden">
    <div className="bg-[#DC2626] mr-3 text-white p-3 rounded-md">
    <a href="/register">Register</a>
    </div>
    <div className="bg-white text-[#DC2626] p-3 rounded-md">
    <a href="/login">Login</a>
    </div>
    </div>
    </div>
    <div className="hidden lg:grid grid-cols-2 place-content-center place-items-center">
    <div className="absolute bottom-0 z-20">
      <Image alt="" src="/images/vector-2.png" width={200} height={200}/>
    </div>
    <div className="absolute bottom-0 z-20 right-0">
      <Image alt="" src="/images/vector-1.png" width={500} height={500}/>
    </div>
    </div>
   </div>
  );
}
