"use client"
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"

interface GameProps {
  name: string;
  image: string;
}

export default function Gameslide({ games }: { games: GameProps[] }) {
  return (
    <Carousel className="w-full max-w-full"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {games.map((game, index) => (
          <CarouselItem key={index} className="flex justify-center">
            <div className="relative w-[161px] h-[316px] overflow-hidden border-4 border-white transform skew-x-[-10deg]">
              <div className="w-[14rem] h-full transform -translate-x-[2rem] skew-x-[10deg]">
                <Image
                  src={game.image}
                  alt={game.name}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <h1 className="text-white text-xl font-bold uppercase text-center w-1/2">
                    {game.name}
                  </h1>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden" />
      <CarouselNext className="hidden" />
    </Carousel>
  );
}
