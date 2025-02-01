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


export default function CarouselDemo() {
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
      className="w-full max-w-72 md:max-w-80 lg:max-w-[80%] xl:max-w-[90%] lg:mx-5"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-0">
              <Card className="border-none outline-none p-0 m-0">
                <CardContent className="flex aspect-square lg:aspect-auto items-center flex-col justify-center w-full p-0 m-0">
                  <div className="font-semibold w-full px-5 lg:hidden">
                    <p>
                      Alaya Dharma Creative Center <br />
                      12 Oktober 2025
                    </p>
                  </div>
                  <div className="w-full my-2 lg:hidden">
                    <Image
                      alt=""
                      src="/images/image-2.png"
                      width={1000}
                      height={1000}
                      className="h-full w-auto"
                    />
                  </div>
                  <div className="uppercase w-full px-5 lg:hidden">
                    <h1 className="font-bold text-lg">Riot Esport Mobile</h1>
                    <p className="text-base">Esi Kota Denpasar</p>
                  </div>
                  <div className="hidden lg:flex max-w-full w-full">
                    <Image
                      alt=""
                      src="/images/image-2.png"
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
