"use client";

import { cn } from "@/lib/utils";
import NavigationBar from "../navigation-bar";
import { Box, Filter, X } from "lucide-react";
import { Button } from "../ui/button";
import QRCode from "react-qr-code";

interface CardProps {
  date: string,
  name: string,
  location: string,
  category: string,
  description: string,
  price: string
}

export default function Order() {

  const cardData = [
    {
      date: "12/12/2021",
      name: "Tournament 1",
      location: "Dharma Alaya Center",
      category: "Registrasi Lomba",
      description: "Tournament Mobile Legends",
      price: "40000"
    },
    {
      date: "12/12/2021",
      name: "Seminar 1",
      location: "Dharma Alaya Center",
      category: "Tiket Seminar",
      description: "Tournament Mobile Legends",
      price: "40000"
    }
  ]

  const Card = ({ data }: { data: CardProps }) => {
    return (
      <>
        {/* Desktop */}
        <div className="w-full bg-white overflow-hidden rounded-sm shadow-md h-[100px] relative lg:block hidden">
          <svg width="541" height="100" viewBox="0 0 541 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 z-0">
            <g filter="url(#filter0_d_317_1317)">
              <rect x="308.095" y="-387" width="281.659" height="652.634" transform="rotate(43 308.095 -387)" fill="#FF0000" />
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
          <div className="grid grid-cols-3 px-5 h-full z-10 relative">
            <section className="col-span-1 flex flex-col justify-center items-start text-sm font-medium -space-y-1">
              <p>Waktu: {data.date}</p>
              <p className="text-xl uppercase font-semibold">{data.category}</p>
              <p>Lokasi: {data.location}</p>
            </section>
            <section className="lg:col-span-2 flex justify-between items-center">
              <div className="flex flex-col justify-center items-start text-sm font-medium text-black pl-8 font-supertall">
                <p className="text-[#FF0000] text-4xl">{data.name}</p>
                <p className="pl-1">{data.category + ' - ' + data.description}</p>
              </div>
              <div className="font-semibold text-black text-xl flex justify-center items-center gap-2">
                <p>{parseInt("20000").toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                <Button className="bg-[#FF0000] text-white border hover:border-[#FF0000] hover:text-[#FF0000] hover:bg-transparent">
                  <X size={24} />
                </Button>
              </div>
            </section>
          </div>
        </div>

        {/* Mobile */}
        <div className="bg-white w-full grid grid-cols-3 lg:hidden rounded-md overflow-hidden">
          <section className="col-span-2 w-full h-full bg-[#FF0000] flex gap-1">
            <div className="">
              <Button className="text-white h-full bg-transparent">
                <X size={24} />
              </Button>
            </div>
            <div className="py-2 flex flex-col justify-center items-start">
              <p className="font-supertall text-sm">{data.name}</p>
              <p className="font-supertall text-xl">{data.category}</p>
              <p className="text-xs">{data.location}</p>
              <p className="font-semibold">{data.date}</p>
            </div>
          </section>
          <section className="w-full h-full col-span-1 grid justify-center items-center text-black font-semibold">
            <p>{parseInt("20000").toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
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
      <div className="w-full grid lg:mt-7 relative z-10 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-2">
              <Box className="size-6 lg:block hidden" />
              <h1 className="text-2xl font-semibold">Looting Box</h1>
            </div>
          </div>
          <div className="space-y-3 mt-3">
            {cardData.map((data, index) => {
              return (
                <Card key={index} data={data} />
              )
            })}
          </div>
        </section>
        <section className="w-full text-black lg:p-11 lg:py-0 py-3">
            <div className="w-full bg-white px-10 py-16 rounded-sm space-y-3">
              <div className="border-b border-black pb-4">
                <p className="font-semibold text-2xl">Nota Transaksi</p>
                <p>Periksa kembali pesanan anda.</p>
              </div>
              <div >
                {cardData.map((data, index) => {
                  return (
                    <div key={index} className="flex justify-between">
                      <p>{data.category} - {data.name}</p>
                      <p>{parseInt("10000").toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                    </div>
                  )
                })}
              </div>
              <div className="border-t border-black pt-4">
                <div className="w-full flex justify-between">
                  <p>Subtotal</p>
                  <p>{parseInt("20000").toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                </div>
                <p>*Catatan: Harga belum termasuk ppn</p>
                <Button className="w-full bg-[#FF0000] text-white hover:text-[#FF0000] hover:bg-transparent hover:border-[#FF0000] border">Bayar</Button>
              </div>
            </div>
        </section>
      </div>
    </div >
  )
}