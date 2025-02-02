"use client"
import { useState, useEffect } from "react";
import Logo from '../ui/logo-2';
import Dropdown from '../dropdown';
import axios from "axios";
import Image from "next/image";
export default function history(){
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
        <div className="flex flex-col h-full w-full absolute text-white bg-[url('/images/DSCF4041-3.png')] before:absolute before:0 before:bg-black/60 before:top-0 before:left-0 before:w-full before:h-full bg-cover bg-no-repeat">
        <header className='flex xl:px-16 lg:py-20 lg:px-10 h-20 2xl:h-48 xl:py-10 2xl:px-32 relative z-10 bg-black w-full lg:grid lg:grid-cols-4 lg:shadow-none 2xl:text-4xl shadow-md shadow-gray-500/50 justify-between items-center content-center place-content-center lg:place-items-center px-3 py-5 text-white'>
                <div className='hidden lg:flex h-full place-content-start items-center col-span-3 w-full'>
                    <div className="mx-3">
                        <Logo className='h-10 w-10 md:h-20 md:w-20 lg:h-14 lg:w-14 2xl:w-24 2xl:h-24'/>
                    </div>
                    <div className="mx-3">
                        <a className='underline underline-offset-4 lg:no-underline'>Beranda</a>
                    </div>
                    <div className="mx-3">
                        <a href='/leaderboard' className=''>Papan Peringkat</a>
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
                    <a className='underline underline-offset-4 lg:no-underline'>History</a>
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
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6 md:size-8 items-center my-auto align-middle lg:hidden">
                            <path fillRule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
        </header>
        <div className="px-5 py-5 lg:px-10 h-fit xl:px-20 2xl:px-40 relative z-10">
            <div className="flex justify-between">
            <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 2xl:size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
            <p className="text-white ml-2 xl:text-xl 2xl:text-4xl"> Riwayat transaksi</p>
            </div>
            <div className="lg:flex items-center hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 2xl:size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
            <p className=" text-white ml-2 xl:text-xl 2xl:text-4xl"> Urutkan Terbaru</p>
            </div>
            </div>
            <div className="py-2 lg:py-10">
        <div className="bg-white grid grid-cols-2 h-fit overflow-hidden lg:grid-cols-6 w-full rounded-md relative z-10">
        <div className="flex flex-col xl:px-5 2xl:text-2xl lg:col-span-2 justify-start lg:place-content-center lg:place-items-start  text-white bg-[#ff0000] lg:bg-white before:hidden lg:before:flex before:absolute before:bg-[#ff0000] before:h-[50vh] before:right-[45%] before:content-[''] before:z-20 before:w-[100%] before:shadow-md before:shadow-black/35 before:-rotate-45 px-3 py-3 rounded-l-md rounded-bl-md">
            <p className="lg:order-3 relative z-30">Status - Lunas</p>
            <p className="relative z-30">12/02/2025</p>
            <h1 className="text-xl font-bold my-5 lg:my-0 relative z-30">Registrasi E-sport</h1>
            <p className="uppercase text-sm lg:hidden">Bagoes Esport Competetion</p>
        </div>
        <div className="flex flex-col justify-center lg:place-item-end lg:order-last lg:px-3">
            <Image alt="" src="/images/barcode.png" width={500} height={500} className="max-w-40 w-full mx-auto lg:hidden"/>
            <p className="uppercase text-black w-full text-center text-xs font-semibold lg:hidden">Klik Untuk Perbesar</p>
            <a href="#" className="hidden lg:flex p-2 text-white bg-[#ff0000] w-full 2xl:w-1/2 xl:text-2xl justify-center rounded-md">Unduh</a>
        </div>
        <div className="hidden lg:flex flex-col justify-center lg:order-2 col-span-3">
        <h1 className="text-3xl font-bold xl:text-5xl text-[#ff0000]">Glory Of School</h1>
        <p className="uppercase text-sm font-bold text-black">TICKET SEMINAR - TEKNOLOGI DAN PERKEMBANGAN DI ERA DIGITAL</p>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}