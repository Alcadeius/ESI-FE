"use client"
import Logo from "../ui/logo-2";
import Dropdown from "../dropdown"
import { useState, useEffect } from "react";
import axios from "axios";
export default function order(){
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
        <div className="bg-[#111827] ">
            <header className='flex w-full lg:px-10 lg:py-10 lg:grid lg:grid-cols-4 lg:shadow-none 2xl:text-4xl shadow-md shadow-gray-500/50 justify-between items-center content-center place-content-center lg:place-items-center px-3 py-5 text-white'>
            <div className='hidden lg:flex h-full place-content-start items-center col-span-3 w-full'>
            <div className="mx-3">
            <Logo className='h-10 w-10 md:h-20 md:w-20'/>
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
            <Logo className='h-10 w-10 md:h-20 md:w-20 lg:w-14 lg:h-14'/>
            </div>
            <div className='lg:hidden'>
                <a className='underline underline-offset-4 lg:no-underline'>Order</a>
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
           <section className="grid grid-cols-1 lg:grid-cols-5 gap-9 md:gap-28 lg:gap-6 h-full items-center w-full text-white my-14 lg:my-[20vh] px-2">
        <div className="flex flex-col justify-center lg:justify-start h-full lg:col-span-3">
        <div className="flex items-center max-w-full w-full 2xl:px-5">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 md:size-8 2xl:size-12"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
            />
        </svg>
        <h1 className="text-xl md:text-2xl font-bold px-2 2xl:text-4xl">Looting Box</h1>
        </div>
        <div className="flex flex-col h-52 md:h-72 lg:h-96 2xl:h-full overflow-auto 2xl:px-5">
        <div className="w-full flex justify-between bg-[#F9FAFB] p-3 my-3 text-black rounded-md">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="black"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 md:size-6 xl:size-8 2xl:size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        <h1 className="text-xs md:text-base mx-2 xl:text-xl 2xl:text-3xl">Tiket Seminar - Glory Of Schooll</h1>
      </div>
      <div className="flex items-center truncate xl:text-xl 2xl:text-3xl w-1/2 min-[325px]:w-fit text-xs md:text-base">
        <h1>Rp. 160.000</h1>
        <span>(x4 pcs)</span>
      </div>
        </div>
        <div className="w-full flex justify-between bg-[#F9FAFB] p-3 my-3 text-black rounded-md">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="black"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 md:size-6 xl:size-8 2xl:size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        <h1 className="text-xs md:text-base mx-2 xl:text-xl 2xl:text-3xl">Tiket Seminar - Glory Of Schooll</h1>
      </div>
      <div className="flex items-center truncate xl:text-xl 2xl:text-3xl w-1/2 min-[325px]:w-fit text-xs md:text-base">
        <h1>Rp. 160.000</h1>
        <span>(x4 pcs)</span>
      </div>
        </div>
        <div className="w-full flex justify-between bg-[#F9FAFB] p-3 my-3 text-black rounded-md">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="black"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 md:size-6 xl:size-8 2xl:size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        <h1 className="text-xs md:text-base mx-2 xl:text-xl 2xl:text-3xl">Tiket Seminar - Glory Of Schooll</h1>
      </div>
      <div className="flex items-center truncate xl:text-xl 2xl:text-3xl w-1/2 min-[325px]:w-fit text-xs md:text-base">
        <h1>Rp. 160.000</h1>
        <span>(x4 pcs)</span>
      </div>
        </div>
        <div className="w-full flex justify-between bg-[#F9FAFB] p-3 my-3 text-black rounded-md">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="black"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 md:size-6 xl:size-8 2xl:size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        <h1 className="text-xs md:text-base mx-2 xl:text-xl 2xl:text-3xl">Tiket Seminar - Glory Of Schooll</h1>
      </div>
      <div className="flex items-center truncate xl:text-xl 2xl:text-3xl w-1/2 min-[325px]:w-fit text-xs md:text-base">
        <h1>Rp. 160.000</h1>
        <span>(x4 pcs)</span>
      </div>
        </div>
        </div>
        </div>
    <section className="bg-[#f9fafba0]/80 p-2 text-black w-full max-w-sm md:max-w-md 2xl:max-w-2xl lg:col-span-2 mx-auto rounded-md">
        <div className="flex justify-around my-6">
        <div className="bg-[#111827] rounded-full h-5 w-5">
            
        </div>
        <div className="bg-[#111827] rounded-full h-5 w-5">
            
        </div>
        <div className="bg-[#111827] rounded-full h-5 w-5">
            
        </div>
        <div className="bg-[#111827] rounded-full h-5 w-5">
            
        </div>
        </div>
        <div className="px-5 flex flex-col xl:text-xl 2xl:text-3xl">
            <div className="flex flex-col">
            <h1 className="font-semibold">Nota Transaksi</h1>
            <h4 className="text-gray-600/65">Periksa Kembali Pesanan Anda</h4>
            <hr className="border-t-[1.5px] border-black my-5 rounded-md"/>
            </div>
            <div className="flex flex-col">
            <div>
                <h1>Tiket Seminar - Glory Of School</h1>
            </div>
            <div className="flex justify-between">
            <div>
                Rp. 40.000 / Tiket
            </div>
            <div className="text-sm 2xl:text-2xl">
                x 4pcs
            </div>
            </div>
            </div>
            <div className="flex flex-col my-3">
            <div>
                <h1>Tiket Seminar - Glory Of School</h1>
            </div>
            <div className="flex justify-between">
            <div>
                Rp. 40.000 / Tiket
            </div>
            <div className="text-sm 2xl:text-2xl">
                x 4pcs
            </div>
            </div>
            </div>
            <div className="flex flex-col">
            <div>
                <h1>Tiket Seminar - Glory Of School</h1>
            </div>
            <div className="flex justify-between">
            <div>
                Rp. 40.000 / Tiket
            </div>
            <div className="text-sm 2xl:text-2xl">
                x 4pcs
            </div>
            </div>
            </div>
            <div className="flex flex-col my-3">
            <div>
                <h1>Tiket Seminar - Glory Of School</h1>
            </div>
            <div className="flex justify-between">
            <div>
                Rp. 40.000 / Tiket
            </div>
            <div className="text-sm 2xl:text-2xl">
                x 4pcs
            </div>
            </div>
            </div>
            <hr className="border-t-[1.5px] border-black my-5 rounded-md"/>
        <div className="flex flex-col">
            <div className="flex justify-between">
            <div>
                <h1>Subtotal</h1>
            </div>
            <div>
                Rp. 200.000
            </div>
            </div>
        <p className="text-sm my-3">* Harga Belum Termasuk Biaya Transfer dan Pajak</p>
        <button className="justify-center w-full bg-[#0F172A] rounded-md text-white p-2">
            Continue
        </button>
        </div>
        </div>
    </section>
    </section>
    </div>
    )
}