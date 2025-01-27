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
import { useIsMobile } from '../admin-esi-denpasar/src/hooks/use-mobile'; 

const images = [
  '/images/Component-5.png',
  '/images/Component-2.png',
  '/images/Component-3.png',
  '/images/Component-4.png',
  '/images/Component-6.png'
];

export default function Gameslide() {
  const isMobile = useIsMobile();

  return (
    <Carousel className="w-full max-w-full" 
    plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
    opts={{
      loop: true,
    }}
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index} className="flex justify-center">
            <div className="p-0 w-full max-w-xs">
              <Card className="bg-transparent border-none">
                <CardContent className="flex justify-center aspect-auto overflow-visible p-0 m-0">
                  <div className="max-w-60 relative z-20">
                    <Image alt='' src={src} width={1000} height={1000} />
                  </div>
                  <p className="bg-[#DC2626] absolute h-48 w-full z-10 mt-[40vh] md:mt-[20vh]"></p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      { !isMobile && ( 
        <>
          <CarouselPrevious className="hidden" />
          <CarouselNext className="hidden" />
        </>
      )}
    </Carousel>
  );
}
