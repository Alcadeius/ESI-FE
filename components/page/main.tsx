"use client"
import Image from 'next/image';
import { useState, useEffect } from "react";
import Logo from '../ui/logo-2';
import Slider from '../slider'
import Games from '../games'
import axios from "axios";
import Pagin from '../ui/pagein'
import Dropdown from '../dropdown'
import NavigationBar from '../navigation-bar';
import { cn } from '@/lib/utils';
import Footer from '../footer';

interface eventDataProps {
  date: string,
  name: string,
  location: string,
  participants: number
}

export default function main() {
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

  const eventData = [
    {
      date: "12-17 Oktober",
      name: "RIOT E-Sport Event",
      location: "GARDEV Team Field",
      participants: 240,
    },
    {
      date: "12-17 Oktober",
      name: "RIOT E-Sport Event",
      location: "GARDEV Team Field",
      participants: 240,
    },
    {
      date: "12-17 Oktober",
      name: "RIOT E-Sport Event",
      location: "GARDEV Team Field",
      participants: 240,
    },
    {
      date: "12-17 Oktober",
      name: "RIOT E-Sport Event",
      location: "GARDEV Team Field",
      participants: 240,
    },
    {
      date: "12-17 Oktober",
      name: "RIOT E-Sport Event",
      location: "GARDEV Team Field",
      participants: 240,
    },
    {
      date: "12-17 Oktober",
      name: "RIOT E-Sport Event",
      location: "GARDEV Team Field",
      participants: 240,
    }
  ]

  const gamesData = [
    {
      name: "League of Legends",
      image: "/images/example.jpg"
    },
    {
      name: "Valorant",
      image: "/images/example.jpg"
    },
    {
      name: "Mobile Legends",
      image: "/images/example.jpg"
    },
    {
      name: "Free Fire",
      image: "/images/example.jpg"
    },
    {
      name: "PUBG Mobile",
      image: "/images/example.jpg"
    }
  ]

  const EventCard = ({ event }: { event: eventDataProps }) => {
    return (
      <div className="z-10 rounded-sm grid grid-rows-2 grid-flow-col gap-4 text-[#E2E2E2] bg-cover bg-no-repeat bg-[url('/images/Rectangle-10.png')] h-36 xl:h-64 w-auto bg-center lg:bg-top">
        <div className="flex flex-col mx-3 my-3">
          <h1 className='text-base'>{event.date}</h1>
          <h1 className='text-lg font-bold'>{event.name}</h1>
          <h1>{event.location}</h1>
        </div>
        <div className='grid grid-cols-1 place-items-start mx-3 content-end'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <h1>{event.participants}</h1>
        </div>
        <div className='grid justify-items-end mx-3'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
          </svg>
        </div>
      </div>
    )
  }

  const GameCard = ({ name, image }: { name: string, image: string }) => {
    return (
      <div className="flex items-center justify-center z-20">
        <div className="relative w-56 h-[470px] overflow-hidden border-4 border-white transform skew-x-[-10deg]">
          <div className="w-[20rem] h-full transform -translate-x-[3rem] skew-x-[10deg]">
            <Image
              src={image}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <h1 className="text-white text-3xl font-bold uppercase text-center w-1/2">
                {name}
              </h1>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 pt-14 lg:pt-0">
      <section className='lg:px-20 lg:pt-14'>
        {/* Header */}
        <NavigationBar />

        {/* Backdrop */}
        <div className={cn("bg-[url('/images/backdrop_1.png')]",
          "absolute lg:top-1/2 lg:right-[5rem] lg:transform lg:-translate-y-1/2 w-[707px] h-[471px] bg-contain z-0 bg-gray-900 bg-blend-lighten",
          "hidden lg:block")}>
        </div>
        <div className={cn("bg-[url('/images/backdrop_1.png')]",
          "absolute lg:top-[100%] -scale-x-100 lg:left-0 lg:transform lg:-translate-y-1/2 w-full h-[471px] bg-contain z-0 bg-gray-900 bg-blend-lighten",
          "hidden lg:block")}>
        </div>
        <div className={cn("bg-[url('/images/backdrop_1.png')]",
          "absolute lg:top-[150%] lg:right-0 lg:transform lg:-translate-y-1/2 w-full h-[471px] bg-contain z-0 bg-gray-900 bg-blend-lighten",
          "hidden lg:block")}>
        </div>
        <div className={cn("bg-[url('/images/backdrop_1.png')]",
          "absolute lg:top-[200%] -scale-x-100 lg:left-0 lg:transform lg:-translate-y-1/2 w-full h-[471px] bg-contain -z-10 bg-gray-900 bg-blend-lighten",
          "hidden lg:block")}>
        </div>

        {/* Slider */}
        <div className='w-full grid lg:mb-10 justify-center lg:grid-cols-3 lg:place-content-center lg:place-items-center my-10 lg:my-0 lg:pt-14 pt-0'>
          <div className="lg:col-span-2 w-full z-10">
            <Slider />
          </div>
          <div className="relative w-full h-full justify-center self-center hidden lg:flex">
            <div className="hidden lg:flex flex-col items-center place-items-center justify-center h-full text-white z-10">
              <h1 className="font-extrabold text-7xl">HIGHLIGHT</h1>
              <p className="uppercase py-2 px-4 bg-white text-[#DC2626] rounded-lg font-extrabold text-2xl">Event yang dinantikan</p>
            </div>
            <div className="hidden absolute lg:block -left-48 top-0 z-0">
              <img src="/images/ruby+goblin.png" alt="" className="w-[20vw]" />
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="flex lg:text-2xl text-base font-medium uppercase text-white px-5 my-10">
          <h1 className='z-10'># Ayo Ikuti Keseruan Lainnya</h1>
        </div>

        <div className="text-white lg:text-4xl grid grid-cols-1 lg:grid-cols-3 place-content-center gap-7 px-5">
          {eventData.map((event, index) => {
            return (
              <EventCard event={event} />
            )
          })}
        </div>
        <div className="lg:grid hidden w-full items-center text-white my-5 place-content-center">
          <Pagin />
        </div>

      </section>

      <section className="relative w-full mb-20">
        {/* Games */}
        <div className='grid grid-cols-1 justify-items-center'>
          <div className='text-white text-xl lg:text-4xl px-6 py-2 rounded-lg my-10 lg:my-5 font-bold h-fit text-center uppercase underline'>
            <h1># Trending E-SPORTS GAMES</h1>
          </div>
          <div className="lg:hidden z-20 overflow-hidden w-full">
            <Games games={gamesData} />
          </div>
          <div className='hidden lg:flex gap-10 mt-16'>
            {gamesData.map((game, index) => {
              return (
                <GameCard name={game.name} image={game.image} />
              )
            })}
          </div>
        </div>
        <div className="bg-[#DC2626] shadow-[inset_0_-33px_113px_rgba(0,0,0,0.25)] absolute h-[196px] lg:h-80 w-[100%] -bottom-10"></div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
