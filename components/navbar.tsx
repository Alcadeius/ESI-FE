"use client"
import { useEffect, useState } from "react";
import Logo from "./ui/logo-2"
import Dropdown from './dropdown';
import axios from "axios";

const NavigationBar = ({name}: {name: string}) => {
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

  return (
    <header className='flex lg:px-[80px] lg:py-[56px] relative z-10 bg-black w-full lg:grid lg:grid-cols-4 lg:shadow-none shadow-md shadow-gray-500/50 justify-between items-center content-center place-content-center lg:place-items-center px-3 py-5 text-white'>
      <div className='hidden lg:flex h-full place-content-start items-center col-span-3 w-full'>
        <div className="mx-3">
          <Logo className='h-10 w-10 md:h-20 md:w-20 lg:h-14 lg:w-14 ' />
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
        <Logo className='h-10 w-10 md:h-12 md:w-12 lg:w-14 lg:h-14' />
      </div>
      <div className='lg:hidden'>
        <a className='underline underline-offset-4 lg:no-underline'>{name}</a>
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
          <Dropdown />
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
  )
}

export default NavigationBar