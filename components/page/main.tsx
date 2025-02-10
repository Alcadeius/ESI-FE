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
import { useRouter } from 'next/navigation';

function FetchGames() {
  const fetcher = (url: string) => axiosInstance(url).then((r) => r.data?.data)
  const { data, isLoading } = useSWR(`/games`, fetcher)

  return {
    games: data,
    isLoading
  }
}

function FetchEvents() {
  const fetcher = (url: string) => axiosInstance(url).then((r) => r.data?.data)
  const { data, isLoading } = useSWR(`/events`, fetcher)

  return {
    events: data || [],
    eventLoading: isLoading
  }
}

export default function Main() {
  const { games, isLoading } = FetchGames()
  const { events, eventLoading } = FetchEvents()
  const router = useRouter()

  const itemsPerPage = 6;
  const totalPages = events && events.length > 0 ? Math.ceil(events.length / itemsPerPage) : 1;


  // Ensure the current page never goes out of bounds
  const [currentPage, setCurrentPage] = React.useState(1);
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedEvents = events?.slice(startIndex, startIndex + itemsPerPage) || [];

  // Handle event click, redirect to event activity page
  const handleEventClick = (event: IEvent) => {
    router.push(`/activity/?event=${event.id}`)
  }

  const EventCard = ({ event, index }: { event: IEvent, index: number }) => {
    return (
      <div key={index} onClick={() => handleEventClick(event)} className="bg-gray-900 rounded-sm p-5 w-full aspect-video z-20 relative bg-cover bg-center flex justify-between flex-col select-none cursor-pointer group" style={{ backgroundImage: `url(${event?.event_banner})` }}>
        <div className="flex justify-between items-start z-10">
          <div>
            <div className="text-white font-bold lg:text-2xl">{event?.event_logo}</div>
            <h1 className="text-white font-bold text-2xl">{event?.name.length > 40 ? `${event.name.slice(0, 40)}...` : event.name}</h1>
            <p className="text-white text-sm">{event?.category?.name}</p>
          </div>
          <div>
            <ChevronsRight size={35} className="group-hover:scale-125 transition-all" />
          </div>
        </div>
        <div className="flex items-end gap-2 z-10">
          <User2 className='size-6 lg:size-8' />
          <p className="text-white lg:text-xl text-sm">- Participants</p>
        </div>
        <div className='absolute left-0 top-0 w-full h-full bg-black opacity-50 group-hover:opacity-30 z-0'></div>
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
          <div className="w-full flex-wrap md:w-full items-center justify-center text-white my-5 place-content-center flex">
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

                  {currentPage == 1 && (
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(totalPages);
                        }}
                      >
                        ...
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(currentPage - 1);
                        }}
                      >
                        {currentPage - 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationLink isActive>{currentPage}</PaginationLink>
                  </PaginationItem>

                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(currentPage + 1);
                        }}
                      >
                        {currentPage + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {currentPage == totalPages && (
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(1);
                        }}
                      >
                        ...
                      </PaginationLink>
                    </PaginationItem>
                  )}

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
