/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import NavigationBar from '../navigation-bar';
import Footer from '../footer';
import { ChevronsRight, User2 } from 'lucide-react';

import React from 'react';
import axiosInstance from '@/lib/axios';
import GameCard from '../gameCard';
import useSWR from 'swr';
import { IEvent } from '../types/event';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import LoadingScreen from '../loading-screen';

function fetchGames() {
  const fetcher = (url: string) => axiosInstance(url).then((r) => r.data?.data)
  const { data, isLoading } = useSWR(`/games`, fetcher)

  return {
    games: data,
    isLoading
  }
}

function fetchEvents() {
  const fetcher = (url: string) => axiosInstance(url).then((r) => r.data?.data)
  const { data, isLoading } = useSWR(`/events`, fetcher)

  return {
    events: data || [],
    eventLoading: isLoading
  }
}

function fetchSomeEvents() {
  const fetcher = (url: string) => axiosInstance(url).then((r) => r.data?.data)
  const { data, isLoading } = useSWR(`/events?category=National`, fetcher)

  return {
    someEvents: data,
    someEventLoading: isLoading
  }
}

export default function Main() {
  const { games, isLoading } = fetchGames()
  const { events, eventLoading } = fetchEvents()
  const { someEvents, someEventLoading } = fetchSomeEvents()

  const itemsPerPage = 6;
  const totalPages = events && events.length > 0 ? Math.ceil(events.length / itemsPerPage) : 1;


  // Ensure the current page never goes out of bounds
  const [currentPage, setCurrentPage] = React.useState(1);
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedEvents = events?.slice(startIndex, startIndex + itemsPerPage) || [];


  const EventCard = ({ event, index }: { event: IEvent, index: number }) => {
    return (
      <div key={index} className="bg-[#DC2626] rounded-sm p-5 w-full aspect-video z-20 relative bg-cover bg-center flex justify-between flex-col" style={{ backgroundImage: `url(${event?.event_banner})` }}>
        <div className="flex justify-between items-start">
          <div>
            <div className="text-white font-bold lg:text-2xl">{event?.event_logo}</div>
            <h1 className="text-white font-bold text-2xl">{event?.name}</h1>
            <p className="text-white text-sm">{event?.category?.name}</p>
          </div>
          <div>
            <ChevronsRight size={35} />
          </div>
        </div>
        <div className="flex items-end gap-2">
          <User2 className='size-6 lg:size-8' />
          <p className="text-white lg:text-xl text-sm">- Participants</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="bg-gray-900">
      <div className="lg:px-20 lg:pt-14">
        {/* Header */}
        <NavigationBar />

        {/* Slider */}
        {/* <div className='w-full grid lg:mb-10 justify-center lg:grid-cols-3 lg:place-content-center lg:place-items-center my-10 lg:my-0 lg:pt-14 pt-0'>
          <div className="lg:col-span-2 w-full z-10">
            {!someEventLoading && <Slider data={someEvents} />}
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
        </div> */}

        {/* Hero */}
        <div className="flex lg:text-2xl text-base font-supertall uppercase text-white px-5 mt-10 mb-5">
          <h1 className='z-10'># EVENTS FOR THE WORTHY</h1>
        </div>

        <div className="text-white grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 place-content-center gap-7 px-5">
          {!eventLoading && selectedEvents.map((event: IEvent, index: number) => {
            return (
              <EventCard key={index} event={event} index={index} />
            )
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="w-full items-center text-white my-5 place-content-center flex">
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                      }}
                      aria-disabled={currentPage === 1}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === i + 1}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(i + 1);
                        }}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                      }}
                      aria-disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        )}
      </div>

      {!isLoading && (
        <section className="relative w-full mb-20 lg:mt-20">
          {/* Games */}
          <div className='grid grid-cols-1 justify-items-center'>
            <div className='text-white font-supertall bg-red-600 text-xl lg:text-2xl lg:px-6 px-3 py-2 rounded-lg mt-10 lg:mt-0 lg:mb-5 h-fit text-center uppercase'>
              <h1># Trending E-SPORTS GAMES</h1>
            </div>
            <div className='flex gap-10 mt-5 font-rocker w-full'>
              <GameCard slides={games} options={{ loop: true }} />
            </div>
          </div>
          <div className="bg-[#DC2626] shadow-[inset_0_-33px_113px_rgba(0,0,0,0.25)] absolute h-[196px] lg:h-80 w-[100%] -bottom-10"></div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}
