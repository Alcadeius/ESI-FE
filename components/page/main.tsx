"use client"
import Image from 'next/image';
import { useState, useEffect } from "react";
import Logo from '../ui/logo-2';
import Slider from '../slider'
import Games from '../games'
import axios from "axios";
import Pagin from '../ui/pagein'
import Dropdown from '../dropdown'
export default function main(){
    const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Token tidak ditemukan, harap login terlebih dahulu.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://esi.bagoesesport.com/api/v1/auth/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Server Response:", response);
        if (response && response.data) {
          setUserData(response.data);
        } else {
          setError("Data user tidak ditemukan.");
        }
      } catch (err) {
        setError("Gagal mengambil data user.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
    return(
        <div className="bg-[#111827] h-fit">
           {/* Header */}
           <header className='flex w-full lg:px-10 lg:py-10 lg:grid lg:grid-cols-4 lg:shadow-none 2xl:text-4xl shadow-md shadow-gray-500/50 justify-between items-center content-center place-content-center lg:place-items-center px-3 py-5 text-white'>
            <div className='hidden lg:flex  place-content-start items-center col-span-3 w-full'>
            <div className="mx-3">
            <Logo className='h-10 w-10 md:h-20 md:w-20'/>
            </div>
            <div className="mx-3">
            <a className='underline underline-offset-4 lg:no-underline'>Beranda</a>
            </div>
            <div className="mx-3">
            <a className=''>Papan Peringkat</a>
            </div>
            <div className="mx-3">
            <a className=''>Keranjang</a>
            </div>
            <div className="mx-3">
            <a className=''>Bantuan</a>
            </div>
            </div>
            <div className="lg:hidden">
            <Logo className='h-10 w-10 md:h-20 md:w-20 lg:w-14 lg:h-14'/>
            </div>
            <div className='lg:hidden'>
                <a className='underline underline-offset-4 lg:no-underline'>Beranda</a>
            </div>
            <div className="hidden lg:flex justify-end w-full items-center">
            {loading ? (
              <p>Loading user data...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              userData && (
                <div>
                  <h2 className="mx-3">{userData.data.email}</h2>
                </div>
              )
            )}
            <div className="rounded-full text-black">
                <Dropdown/>
            </div>
            </div>
            <div>
            <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6 md:size-8 lg:hidden">
            <path fillRule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
            </svg>
            </button>
            </div>
           </header>
           {/* Slider */}
           <section className='w-full grid justify-center lg:grid-cols-3 lg:place-content-center lg:place-items-center my-10'>
           <div className="lg:col-span-2 w-full">
           <Slider/>
           </div>
           <div>
            <div className="hidden lg:flex flex-col items-center place-items-center h-full text-white">
            <h1 className="font-bold text-4xl">Acara Resmi</h1>
            <p className="uppercase p-2 bg-white text-[#DC2626] rounded-lg font-extrabold text-2xl">Esi Denpsar</p>
            </div>
           </div>
           </section>
           {/* Hero */}
           <div className="hidden lg:flex 2xl:text-4xl text-white px-5 my-3">
            <h1># Ayo Ikuti Keseruan Lainnya</h1>
            </div>
            <section className="bg-none lg:bg-[url('/images/DSCF4041-4.png')] lg:h-fit lg:bg-cover lg:bg-no-repeat">
           <section className="text-white 2xl:text-4xl grid grid-cols-1 lg:grid-cols-3 place-content-center gap-4 lg:gap-7 px-5">
            <div className="lg:hidden">
            <h1># Ayo Ikuti Keseruan Lainnya</h1>
            </div>
            <div className="grid grid-rows-2 grid-flow-col gap-4 text-[#E2E2E2] bg-cover bg-no-repeat bg-[url('/images/Rectangle-10.png')] h-36 xl:h-64 w-auto bg-center md:bg-top">
            <div className="flex flex-col mx-3 my-3">
                <h1 className='text-base'>12-17 Oktober</h1>
                <h1 className='text-lg font-bold'>RIOT E-Sport Event</h1>
                <h1>ITB Stikom Bali</h1>
            </div>
            <div className='grid grid-cols-1 place-items-start mx-3 content-end'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
                <h1 >240</h1>
            </div>
            <div className='grid justify-items-end mx-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
</svg>
            </div>
            </div>
            <div className="grid grid-rows-2 grid-flow-col gap-4 text-[#E2E2E2] bg-cover bg-no-repeat bg-[url('/images/Rectangle-10.png')] h-36 xl:h-64 w-auto bg-center">
            <div className="flex flex-col mx-3 my-3">
                <h1 className='text-base'>12-17 Oktober</h1>
                <h1 className='text-lg font-bold'>RIOT E-Sport Event</h1>
                <h1>ITB Stikom Bali</h1>
            </div>
            <div className='grid grid-cols-1 place-items-start mx-3 content-end'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
                <h1 >240</h1>
            </div>
            <div className='grid justify-items-end mx-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
</svg>
            </div>
            </div>
            <div className="grid grid-rows-2 grid-flow-col gap-4 text-[#E2E2E2] bg-cover bg-no-repeat bg-[url('/images/Rectangle-10.png')] h-36 xl:h-64 w-auto bg-center">
            <div className="flex flex-col mx-3 my-3">
                <h1 className='text-base'>12-17 Oktober</h1>
                <h1 className='text-lg font-bold'>RIOT E-Sport Event</h1>
                <h1>ITB Stikom Bali</h1>
            </div>
            <div className='grid grid-cols-1 place-items-start mx-3 content-end'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
                <h1 >240</h1>
            </div>
            <div className='grid justify-items-end mx-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
</svg>
            </div>
            </div>
            <div className="grid grid-rows-2 grid-flow-col gap-4 text-[#E2E2E2] bg-cover bg-no-repeat bg-[url('/images/Rectangle-10.png')] h-36 xl:h-64 w-auto bg-center">
            <div className="flex flex-col mx-3 my-3">
                <h1 className='text-base'>12-17 Oktober</h1>
                <h1 className='text-lg font-bold'>RIOT E-Sport Event</h1>
                <h1>ITB Stikom Bali</h1>
            </div>
            <div className='grid grid-cols-1 place-items-start mx-3 content-end'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
                <h1 >240</h1>
            </div>
            <div className='grid justify-items-end mx-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
</svg>
            </div>
            </div>
            <div className="hidden lg:grid grid-rows-2 grid-flow-col gap-4 text-[#E2E2E2] bg-cover bg-no-repeat bg-[url('/images/Rectangle-10.png')] xl:h-64 h-36 w-auto bg-center">
            <div className="flex flex-col mx-3 my-3">
                <h1 className='text-base'>12-17 Oktober</h1>
                <h1 className='text-lg font-bold'>RIOT E-Sport Event</h1>
                <h1>ITB Stikom Bali</h1>
            </div>
            <div className='grid grid-cols-1 place-items-start mx-3 content-end'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
                <h1 >240</h1>
            </div>
            <div className='grid justify-items-end mx-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
</svg>
            </div>
            </div>
            <div className="hidden lg:grid grid-rows-2 grid-flow-col gap-4 text-[#E2E2E2] bg-cover bg-no-repeat bg-[url('/images/Rectangle-10.png')] xl:h-64 h-36 w-auto bg-center">
            <div className="flex flex-col mx-3 my-3">
                <h1 className='text-base'>12-17 Oktober</h1>
                <h1 className='text-lg font-bold'>RIOT E-Sport Event</h1>
                <h1>ITB Stikom Bali</h1>
            </div>
            <div className='grid grid-cols-1 place-items-start mx-3 content-end'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
                <h1 >240</h1>
            </div>
            <div className='grid justify-items-end mx-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
</svg>
            </div>
            </div>
           </section>
            <div className="lg:grid hidden w-full items-center text-white my-5 place-content-center">
            <Pagin/>
            </div>
           {/* Games */}
           <section className='grid grid-cols-1 justify-items-center md:my-20 lg:my-12'>
            <div className='bg-[#F9FAFB] text-[#DC2626] rounded-lg lg:my-24 my-10 p-4 text-2xl 2xl:text-4xl font-semibold w-1/2 h-fit text-center'>
                <h1>#Games</h1>
            </div>
            <div className="lg:hidden">
            <Games />
            </div>
            <div className='hidden lg:flex xl:my-20'>
            <div className="max-w-64 xl:max-w-96 relative z-20">
              <Image alt='' src='/images/Component-5.png' width={1000} height={1000} />
              </div>
              <div className="max-w-60 xl:max-w-96 relative z-20">
              <Image alt='' src='/images/Component-2.png' width={1000} height={1000} />
              </div>
              <div className="max-w-60 xl:max-w-96 relative z-20">
              <Image alt='' src='/images/Component-3.png' width={1000} height={1000} />
              </div>
              <div className="max-w-60 xl:max-w-96 relative z-20">
              <Image alt='' src='/images/Component-4.png' width={1000} height={1000} />
              </div>
              <div className="max-w-60 xl:max-w-96 relative z-20">
              <Image alt='' src='/images/Component-6.png' width={1000} height={1000} />
              </div>
              <p className="bg-[#DC2626] absolute h-48 lg:h-60 w-[100%] xl:left-0 z-10 mt-[40vh] md:mt-[20vh]"></p>
            </div>
            </section>
           </section>
        </div>
    )
}
