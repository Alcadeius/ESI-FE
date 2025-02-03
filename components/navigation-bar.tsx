"use client"

import { useEffect, useState } from "react";
import Logo from "./logo"
import Dropdown from './dropdown';
import axios from "axios";
import { Button } from "./ui/button";

interface UserProps{
  email: string
}

interface NavigationBarProps{
  data: UserProps
}

const pageList = [
  {
    name: 'Beranda',
    link: '/main'
  },
  {
    name: 'Papan Peringkat',
    link: '/leaderboard'
  },
  {
    name: 'Keranjang',
    link: '/order'
  },
  {
    name: 'Bantuan',
    disabled: true
  }
]

const NavigationBar = () => {
  const [userData, setUserData] = useState<NavigationBarProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
      const fetchUserData = async () => {
          if (!token) {
              setError("Token tidak ditemukan, harap login terlebih dahulu.");
              setLoading(false);
              return;
          } else {
            try {
                const response = await axios.get(
                    "https://esi.bagoesesport.com/api/v1/auth/user",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
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
          }
      };

      fetchUserData();
  }, []);

  return (
    <header className='hidden relative z-10 w-full lg:grid lg:grid-cols-4 lg:shadow-none shadow-md shadow-gray-500/50 justify-between items-center content-center place-content-center lg:place-items-center text-white'>
    <div className='hidden lg:flex h-full place-content-start items-center col-span-3 w-full gap-9 font-medium'>
      <div>
        <Logo className='h-10 w-10 md:h-20 md:w-20 lg:w-14 lg:h-14 ' />
      </div>
      {pageList.map((page, index) => {
        return (
          <a key={index} className='hover:underline underline-offset-4 cursor-pointer select-none' href={page?.link}>{page.name}</a>
        )
      })}
    </div>
    {true ? (
      <div className="hidden lg:flex justify-end w-full h-full text-center items-center">
        <Button asChild className="bg-[#DC2626] mr-3 text-white p-3 rounded-md">
          <a href="/register">Register</a>
        </Button>
        <Button asChild className="bg-white text-[#DC2626] p-3 rounded-md">
          <a href="/login">Login</a>
        </Button>
      </div>
    ) : (
      <div className="hidden lg:flex justify-end w-full items-center">
        {token ? (
          <p>Loading user data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          userData && (
            <div>
              <h2 className="mx-3">{userData?.data.email}</h2>
            </div>
          )
        )}
        <div className="rounded-full text-black">
          <Dropdown />
        </div>
      </div>
    )}
    <div className="h-fit flex items-center">
      <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6 md:size-8 items-center my-auto align-middle lg:hidden">
        <path fillRule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
      </svg>
      </button>
    </div>
  </header>
  )
}

export default NavigationBar