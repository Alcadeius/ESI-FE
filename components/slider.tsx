"use client";
import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { IEvent } from "./types/event";
import FormatToRupiah from "@/lib/format-to-rupiah";

export default function CarouselDemo({data}: {data: IEvent[]}) {
  return (
    <Carousel
    plugins={[
      Autoplay({
        delay: 2000,
      }),
    ]}
      opts={{
        loop: true, 
      }}
      className="w-full max-w-[21rem] md:max-w-80 lg:max-w-[80%] lg:mx-5 lg:bg-black"
    >
      <CarouselContent>
        {data.map((event, index) => (
          <CarouselItem key={index}>
            <div className="p-0">
              <Card className="border-none outline-none p-0 m-0">
                <CardContent className="flex items-center flex-col w-full p-0 m-0 min-h-[328px]">
                  <div className="font-medium -space-y-1 w-full px-5 pt-2 lg:hidden">
                    <div className="font-semibold">
                      Event Tingkat {event?.category?.name}
                    </div>
                  </div>
                  <div className="w-full my-2 lg:hidden min-h-[200px]" style={{backgroundImage: `url(${event?.event_banner})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                  </div>
                  <div className="w-full px-5 lg:hidden pb-3 -space-y-1">
                    <h1 className="font-bold">{event?.name.length > 40 ? `${event.name.slice(0, 40)}...` : event.name}</h1>
                    <p className="text-sm font-medium">PrizePool: {FormatToRupiah(event.prizepool)}</p>
                  </div>
                  <div className="hidden lg:flex max-w-full w-full">
                    <Image
                      alt=""
                      src={event?.event_banner}
                      width={1000}
                      height={1000}
                      className="h-full w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Hide the navigation buttons */}
      <CarouselPrevious className="hidden" />
      <CarouselNext className="hidden" />
    </Carousel>
  );
}
