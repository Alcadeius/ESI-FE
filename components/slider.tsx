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

interface CarouselProps {
  date: string,
  name: string,
  location: string,
  participants: number,
  banner: string,
  organizer: string
}

export default function CarouselDemo({data}: {data: CarouselProps[]}) {
  return (
    <Carousel
    plugins={[
      Autoplay({
        delay: 5000,
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
                <CardContent className="flex items-center flex-col justify-center w-full p-0 m-0">
                  <div className="font-medium -space-y-1 w-full px-5 pt-2 lg:hidden">
                    <p>
                      {event?.location}
                    </p>
                    <p className="font-semibold">
                      {event?.date}
                    </p>
                  </div>
                  <div className="w-full my-2 lg:hidden">
                    <Image
                      alt=""
                      src={event?.banner}
                      width={1000}
                      height={1000}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="w-full px-5 lg:hidden pb-3 -space-y-1">
                    <h1 className="font-bold text-lg">{event?.name}</h1>
                    <p className="text-sm">{event?.organizer}</p>
                  </div>
                  <div className="hidden lg:flex max-w-full w-full">
                    <Image
                      alt=""
                      src={event?.banner}
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
