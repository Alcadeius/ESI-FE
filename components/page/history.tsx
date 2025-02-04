"use client";

import { cn } from "@/lib/utils";
import NavigationBar from "../navigation-bar";
import { Filter, StickyNote } from "lucide-react";
import { Button } from "../ui/button";
import QRCode from "react-qr-code";

interface CardProps {
  date: string,
  name: string,
  status: string,
  category: string,
  description: string,
  file: string
}

export default function History() {

  const cardData = [
    {
      date: "12/12/2021",
      name: "Tournament 1",
      status: "Lunas",
      category: "Registrasi Lomba",
      description: "Tournament Mobile Legends",
      file: "file.pdf"
    },
    {
      date: "12/12/2021",
      name: "Seminar 1",
      status: "Menunggu Konfirmasi",
      category: "Tiket Seminar",
      description: "Tournament Mobile Legends",
      file: "file.pdf"
    }
  ]

  const Card = ({ data }: { data: CardProps }) => {
    return (
      <>
        {/* Desktop */}
        <div className="w-full bg-white overflow-hidden rounded-sm shadow-md h-[100px] relative lg:block hidden">
          <svg width="541" height="100" viewBox="0 0 541 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 z-0">
            <g filter="url(#filter0_d_317_1317)">
              <rect x="308.095" y="-387" width="311.659" height="652.634" transform="rotate(43 308.095 -387)" fill="#FF0000" />
            </g>
            <defs>
              <filter id="filter0_d_317_1317" x="-141" y="-387" width="681.028" height="697.857" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_317_1317" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_317_1317" result="shape" />
              </filter>
            </defs>
          </svg>
          <div className="grid grid-cols-4 px-5 h-full z-10 relative">
            <section className="col-span-1 flex flex-col justify-center items-start text-sm font-medium -space-y-1">
              <p>{data.date}</p>
              <p className="text-xl uppercase font-semibold">{data.category}</p>
              <p>Status - {data.status}</p>
            </section>
            <section className="col-span-2 flex flex-col justify-center items-start text-sm font-medium text-black pl-8 font-supertall">
              <p className="text-[#FF0000] text-4xl">{data.name}</p>
              <p className="pl-1">{data.category + ' - ' + data.description}</p>
            </section>
            <section className="w-full grid items-center justify-end col-span-1">
              <Button onClick={() => { }} className="bg-[#FF0000] text-white font-semibold text-sm rounded-md px-14 py-1 hover:bg-white hover:text-[#FF0000] hover:border-[#FF0000] border-[#FF0000] border-2">
                Unduh
              </Button>
            </section>
          </div>
        </div>

        {/* Mobile */}
        <div className="bg-white w-full aspect-video grid grid-cols-3 lg:hidden rounded-md overflow-hidden">
          <section className="w-full h-full bg-[#FF0000] grid justify-start items-center p-2 -space-y-4">
            <p className="text-xs">{data.status}</p>
            <p className="font-semibold underline">{data.date}</p>
            <p className="font-supertall text-xl">{data.category}</p>
            <p className="font-supertall text-sm">{data.name}</p>
          </section>
          <section className="w-full h-full col-span-2 grid justify-center items-center">
            <div className="w-full px-9 grid grid-cols-1">
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%", paddingTop:"8px" }}
                value={"unknown"}
                viewBox={`0 0 256 256`}
              />
              <p className="text-black w-full text-center">klik untuk perbesar</p>
            </div>
          </section>
        </div>
      </>
    )
  }
  return (
    <div className="text-white bg-gradient-to-b lg:px-20 lg:pt-14 bg-gray-900 h-screen px-4 flex items-start lg:block">

      <div className={cn("bg-[url('/images/backdrop_1.png')]", "absolute lg:top-1/2 lg:right-[5rem] lg:transform lg:-translate-y-1/2 w-[707px] h-[471px] bg-contain z-10 bg-gray-900 bg-blend-lighten", "-top-20 right-0")}>
      </div>

      {/* Navbar */}
      <NavigationBar />

      {/* Content */}
      <div className="w-full grid lg:mt-7 relative">
        <section className="flex justify-between w-full z-10">
          <div className="flex items-center gap-2">
            <StickyNote className="size-6 lg:block hidden" />
            <h1 className="text-2xl font-semibold">Riwayat Transaksi</h1>
          </div>
          <div>
            <Button asChild onClick={() => { }} className="text-base font-semibold text-white cursor-pointer select-none bg-transparent" variant={"default"}>
              <div>
                <Filter className="size-6" />
                <p className="hidden lg:block">Urutkan Riwayat</p>
              </div>
            </Button>
          </div>
        </section>
        <section className="z-10 space-y-3 mt-3">
          {cardData.map((data, index) => {
            return (
              <Card key={index} data={data} />
            )
          })}
        </section>
      </div>

    </div>
  )
}