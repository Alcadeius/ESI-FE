/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { IUser } from "./types/user";
import Logo from "./logo"
import Dropdown from './dropdown';
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { LoadingSpinner } from "./loading-spinner";

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
    name: 'Riwayat',
    link: '/history'
  },
  {
    name: 'Formulir Pengajuan',
    link: '/event-submit'
  },
]

const NavigationBar = () => {
  const { user, isLoading } = useUser()
  const router = useRouter()

  return (
    <header className='hidden relative z-10 w-full lg:grid lg:grid-cols-4 lg:shadow-none shadow-md shadow-gray-500/50 justify-between items-center content-center place-content-center lg:place-items-center text-white'>
      <div className='hidden lg:flex h-full place-content-start items-center col-span-3 w-full gap-9 font-medium'>
        <div>
          <a href="/">
            <Logo className='h-10 w-10 md:h-20 md:w-20 lg:w-14 lg:h-14 cursor-pointer' />
          </a>
        </div>
        {pageList.map((page, index) => {
          return (
            <a key={index} className='hover:underline underline-offset-4 cursor-pointer select-none' href={page?.link}>{page.name}</a>
          )
        })}
      </div>
      {((user as IUser) && !isLoading) ? (
        <div className="hidden lg:flex justify-end w-full items-center">
          <div>
            <h2 className="mx-3">{user ? user?.email : ("Loading...")}</h2>
          </div>
          <div className="rounded-full text-black">
            {user ? <Dropdown /> : <LoadingSpinner className="size-4 text-white" />}
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex justify-end w-full h-full text-center items-center">
          <Button onClick={() => router.push('/register')} className="bg-[#DC2626] mr-3 text-white p-3 rounded-md hover:text-[#ff0000] border border-[#ff0000] hover:bg-transparent">
            Register
          </Button>
          <Button onClick={() => router.push('/login')} className="bg-white text-[#DC2626] p-3 rounded-md hover:text-[#ff0000] border border-transparent hover:border-[#ff0000] hover:bg-transparent">
            Login
          </Button>
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