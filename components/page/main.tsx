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
        <div className="bg-[#111827] h-fit lg:px-5 lg:py-5 xl:px-16">
           {/* Header */}
           <header className='flex w-full lg:grid lg:grid-cols-4 lg:shadow-none 2xl:text-4xl shadow-md shadow-gray-500/50 justify-between items-center content-center place-content-center lg:place-items-center px-3 py-5 text-white'>
            <div className='hidden lg:flex h-full place-content-start items-center col-span-3 w-full'>
            <div className="mx-3">
            <Logo className='h-10 w-10 md:h-20 md:w-20 lg:h-14 lg:w-14'/>
            </div>
            <div className="mx-3">
            <a className='underline underline-offset-4 lg:no-underline'>Beranda</a>
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
            <Logo className='h-10 w-10 md:h-12 md:w-12 lg:w-14 lg:h-14'/>
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
            <div className="h-fit flex items-center">
            <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6 md:size-8 items-center my-auto align-middle lg:hidden">
            <path fillRule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
            </svg>
            </button>
            </div>
           </header>
           {/* Slider */}
           <section className='w-full grid lg:mb-10 2xl:mb-24 justify-center lg:grid-cols-3 lg:place-content-center lg:place-items-center my-10 lg:my-0'>
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
            <div className='bg-[#F9FAFB] text-[#DC2626] rounded-lg lg:my-24 my-10 p-4 text-2xl 2xl:text-4xl font-semibold w-3/4 h-fit text-center'>
                <h1>#Trending Games</h1>
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
              <p className="bg-[#DC2626] absolute h-48 lg:h-60 w-[100%] lg:left-0 z-10 mt-[40vh] md:mt-[20vh]"></p>
            </div>
            </section>
           </section>
           <footer className="p-4 bg-white sm:p-6 w-full overflow-hidden lg:p-5 absolute left-0 2xl:text-3xl 2xl:p-10">
        <div className="mx-auto w-full">
            <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0 w-fit justify-center items-center mx-auto">
                    <a href="https://flowbite.com" className="flex items-center">
                        <Image alt='' src="/images/logo.png" width={1000} height={1000} className='max-w-[20%] md:max-w-16 lg:max-w-32'/>
                    </a>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3  xl:w-3/4">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 2xl:text-4xl">Halaman</h2>
                        <ul className="text-gray-600 dark:text-gray-400">
                            <li className="mb-4">
                                <a href="/main" className="hover:underline">Beranda</a>
                            </li>
                            <li className="mb-4">
                                <a href="" className="hover:underline">Papan Peringkat</a>
                            </li>
                            <li className="mb-4">
                                <a href="" className="hover:underline">Riwayat Transaksi</a>
                            </li>
                            <li className="mb-4">
                                <a href="" className="hover:underline">Keranjang</a>
                            </li>
                            <li>
                                <a href="" className="hover:underline">Tentang Kami</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold 2xl:text-4xl">Hubungi Kami</h2>
                        <ul className="text-gray-600 dark:text-gray-400">
                            <li className="mb-4">
                                <a href="#" className="hover:underline ">esi-denpasar@gmail.com</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Instagram @esi-dps</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 2xl:text-4xl">Layanan Lainnya</h2>
                        <ul className="text-gray-600 dark:text-gray-400">
                            <li className="mb-4">
                                <a href="#" className="hover:underline">Pengajuan Organizer</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Panduan Pengajar</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm text-gray-500 sm:text-center 2xl:text-lg">2025©GAR Developers Team
                </span>
                <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                    <a href="#" className="text-gray-500 hover:text-gray-900 ">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900 ">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-gray-900 ">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                    </a>
                   
                </div>
            </div>
        </div>
    </footer>
      </div>
    )
}
