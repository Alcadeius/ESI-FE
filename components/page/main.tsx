/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Image from 'next/image';
import Slider from '../slider'
import Games from '../games'
import NavigationBar from '../navigation-bar';
import { cn } from '@/lib/utils';
import Footer from '../footer';
import { ChevronsRight, User, User2 } from 'lucide-react';
import PaginationDemo from '../ui/pagein';

interface eventDataProps {
  date: string,
  name: string,
  location: string,
  participants: number,
  banner: string
}

export default function Main() {

  const eventData = [
    {
      date: "12-17 Oktober",
      name: "RIOT E-Sport Event",
      location: "GARDEV Team Field",
      participants: 240,
      banner: "/images/Rectangle-10.png"
    },
    {
      date: "12-17 Oktober",
      name: "RIOT E-Sport Event",
      location: "GARDEV Team Field",
      participants: 240,
      banner: "/images/Rectangle-10.png"
    },
    {
      date: "12-17 Oktober",
      name: "RIOT E-Sport Event",
      location: "GARDEV Team Field",
      participants: 240,
      banner: "/images/Rectangle-10.png"
    },
    {
      date: "12-17 Oktober",
      name: "RIOT E-Sport Event",
      location: "GARDEV Team Field",
      participants: 240,
      banner: "/images/Rectangle-10.png"
    },
    {
      date: "12-17 Oktober",
      name: "RIOT E-Sport Event",
      location: "GARDEV Team Field",
      participants: 240,
      banner: "/images/Rectangle-10.png"
    },
    {
      date: "12-17 Oktober",
      name: "RIOT E-Sport Event",
      location: "GARDEV Team Field",
      participants: 240,
      banner: "/images/Rectangle-10.png"
    }
  ]

  const gamesData = [
    {
      name: "League of Legends",
      image: "/images/temp-game-card/lol.webp"
    },
    {
      name: "Valorant",
      image: "/images/temp-game-card/valo.webp"
    },
    {
      name: "Mobile Legends",
      image: "/images/temp-game-card/ml.jpg"
    },
    {
      name: "Free Fire",
      image: "/images/temp-game-card/ff.webp"
    },
    {
      name: "PUBG Mobile",
      image: "/images/temp-game-card/pubg.jpg"
    }
  ]

  const bannerData = [
    {
      date: "12-17 Oktober",
      name: "Free Fire Tournament",
      location: "Dharma Alaya Denpasar",
      participants: 240,
      banner: "/images/temp-banner/nyepnyep.png",
      organizer: "Bagoes E-Sport"
    },
    {
      date: "12-17 Oktober",
      name: "Pubg Tournament",
      location: "Dharma Alaya Denpasar",
      participants: 160,
      banner: "/images/temp-banner/pubeg.jpg",
      organizer: "Bagoes E-Sport"
    },
  ]

  const EventCard = ({ event, index }: { event: eventDataProps, index: number }) => {
    return (
      <div key={index} className="bg-[#DC2626] rounded-sm p-5 w-full aspect-video z-20 relative bg-cover bg-center flex justify-between flex-col" style={{ backgroundImage: `url(${event?.banner})` }}>
        <div className="flex justify-between items-start">
          <div>
            <div className="text-white font-bold text-2xl">{event?.date}</div>
            <h1 className="text-white font-bold text-2xl">{event?.name}</h1>
            <p className="text-white text-sm">{event?.location}</p>
          </div>
          <div>
            <ChevronsRight size={35}/>
          </div>
        </div>
        <div className="flex items-end gap-2">
          <User2 size={35} />
          <p className="text-white text-xl">{event?.participants} Participants</p>
        </div>
      </div>
    )
  }

  const GameCard = ({ name, image }: { name: string, image: string }) => {
    return (
      <div className="flex items-center justify-center z-20">
        <div className="relative lg:w-36 xl:w-[11rem] h-[470px] overflow-hidden border-4 border-white transform skew-x-[-10deg]">
          <div className="w-[20rem] h-full transform -translate-x-[3rem] skew-x-[10deg]">
            <Image
              src={image}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transform -translate-x-7">
              <h1 className="text-white text-3xl font-bold uppercase text-center w-1/2 drop-shadow-2xl">
                {name}
              </h1>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900">
      <section className='lg:px-20 lg:pt-14'>
        {/* Header */}
        <NavigationBar />

        {/* Backdrop */}
        <div className={cn("bg-[url('/images/backdrop_1.png')]",
          "absolute lg:top-[50vh] lg:right-[5rem] lg:transform lg:-translate-y-1/2 w-[707px] h-[471px] bg-contain z-0 bg-gray-900 bg-blend-lighten",
          "hidden lg:block")}>
        </div>
        <div className={cn("bg-[url('/images/backdrop_1.png')]",
          "absolute lg:top-[100vh] -scale-x-100 lg:left-0 lg:transform lg:-translate-y-1/2 w-full h-[471px] bg-contain z-0 bg-gray-900 bg-blend-lighten",
          "hidden lg:block")}>
        </div>
        <div className={cn("bg-[url('/images/backdrop_1.png')]",
          "absolute lg:top-[150vh] lg:right-0 lg:transform lg:-translate-y-1/2 w-full h-[471px] bg-contain z-0 bg-gray-900 bg-blend-lighten",
          "hidden lg:block")}>
        </div>
        <div className={cn("bg-[url('/images/backdrop_1.png')]",
          "absolute lg:top-[200vh] -scale-x-100 lg:left-0 lg:transform lg:-translate-y-1/2 w-full h-[471px] bg-contain -z-10 bg-gray-900 bg-blend-lighten",
          "hidden lg:block")}>
        </div>

        {/* Slider */}
        <div className='w-full grid lg:mb-10 justify-center lg:grid-cols-3 lg:place-content-center lg:place-items-center my-10 lg:my-0 lg:pt-14 pt-0'>
          <div className="lg:col-span-2 w-full z-10">
            <Slider data={bannerData} />
          </div>
          <div className="relative w-full h-full justify-center self-center hidden lg:flex">
            <div className="hidden lg:flex flex-col items-center place-items-center justify-center h-full text-white z-10">
              <h1 className="font-extrabold text-7xl">HIGHLIGHT</h1>
              <p className="uppercase py-2 px-4 bg-white text-[#DC2626] rounded-lg font-extrabold text-2xl">Event yang dinantikan</p>
            </div>
            <div className="hidden absolute lg:block -left-56 top-0 z-0">
              <Image src="/images/ruby+goblin.png" alt="" className="w-[20vw] h-auto" width={1000} height={1000} />
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="flex lg:text-2xl text-base font-medium uppercase text-white px-5 my-10">
          <h1 className='z-10'># Ayo Ikuti Keseruan Lainnya</h1>
        </div>

        <div className="text-white grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 place-content-center gap-7 px-5">
          {eventData.map((event, index) => {
            return (
              <EventCard key={index} event={event} index={index} />
            )
          })}
        </div>
        <div className="lg:grid hidden w-full items-center text-white my-5 place-content-center">
          <PaginationDemo />
        </div>

      </section>

      <section className="relative w-full mb-20 lg:mt-20">
        {/* Games */}
        <div className='grid grid-cols-1 justify-items-center'>
          <div className='text-white bg-red-600 text-xl lg:text-2xl lg:px-6 px-3 py-2 rounded-lg my-10 lg:my-5 font-bold h-fit text-center uppercase'>
            <h1># Trending E-SPORTS GAMES</h1>
          </div>
          <div className="lg:hidden z-20 overflow-hidden w-full">
            <Games games={gamesData} />
          </div>
          <div className='hidden lg:flex gap-10 mt-5 font-rocker'>
            {gamesData.map((game, index) => {
              return (
                <GameCard key={index} name={game.name} image={game.image} />
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
