/* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import Image from 'next/image'
import { IGame } from './types/game'

type PropType = {
  slides: IGame[]
  options?: EmblaOptionsType
}

const GameCard: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: true })
  ])

  return (
    <div className="z-20 mx-auto w-full overflow-hidden">
      <div className="w-full" ref={emblaRef}>
        <div className="flex lg:justify-center">
          {slides.map((game, index) => (
            <div key={index} className="flex items-center justify-center z-20 shrink-0 w-[200px]">
              <div className="relative lg:w-36 xl:w-[11rem] h-[470px] overflow-hidden border-4 border-white transform skew-x-[-10deg]">
                <div className="w-[20rem] h-full transform -translate-x-[3rem] skew-x-[10deg] relative">
                  <Image
                    src={game.image}
                    alt={game.name}
                    fill
                    style={{objectFit:"cover"}}
                    className="absolute inset-0"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transform -translate-x-7">
                    <h1 className="text-white text-3xl font-bold uppercase text-center w-1/2 drop-shadow-2xl">
                      {game.name}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameCard