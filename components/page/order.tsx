/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import NavigationBar from "../navigation-bar";
import { Box, X } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import useSWR, { mutate }  from "swr";
import Swal from "sweetalert2";

const fetcher = (url: string) =>
  axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  }).then(res => res.data);

  interface CartAPIResponse {
    message: string;
    total_price: number;
    total_item: number;
    details: {
      registrations: registration[]; 
      tickets: Ticket[];
    };
  }
  interface registration{
    order_number: string;
    activity_name: string;
    game_name:string;
    total_price:string;
  }
  interface Ticket {
    order_number: string;
    activity_name: string;
    total_item: number;
    item_price: number;
    total_price: string; 
  }
export default function Order() {
  const { data: cartData, error } = useSWR<CartAPIResponse>(
    "https://esi.bagoesesport.com/api/v1/cart/items",
    fetcher
  );
   const handleDelete = async (orderNumber: string) => {
    try {
      await axios.delete(`https://esi.bagoesesport.com/api/v1/cart/${orderNumber}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      Swal.fire({
        title: "Berhasil!",
        text: "Order berhasil dihapus.",
        icon: "success",
        timer: 1000, 
        showConfirmButton: false,
      });
  
      mutate("https://esi.bagoesesport.com/api/v1/cart/items");
  
    } catch (err) {
      console.error("Gagal menghapus order:", err);
  
      
      Swal.fire({
        title: "Error!",
        text: "Gagal menghapus order.",
        icon: "error",
      });
    }
  };
  if (error) return <div className="text-white">Gagal memuat data...</div>;
  if (!cartData) return <div className="text-white">Memuat data...</div>;
  
  const tickets: Ticket[] = Array.isArray(cartData?.details?.tickets)
  ? cartData.details.tickets
  : [];

  const registrations: registration[] = Array.isArray(cartData?.details?.registrations)
    ? cartData.details.registrations
    : [];
    const subtotal = [...tickets, ...registrations].length > 0
    ? [...tickets, ...registrations].reduce((acc, item) => acc + parseFloat(item.total_price), 0)
    : 0;

const Card = ({ data }: { data: Ticket }) => {
    return (
      <>
        {/* Desktop */}
        <div className="w-full lg:h-[30%] lg:bg-white bg-white overflow-hidden rounded-sm shadow-md h-[100px] relative lg:block hidden">
          <svg width="541" height="200" viewBox="0 0 541 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 lg:-left-32 xl:-left-24 z-0">
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
              <p>Order No: {data.order_number}</p>
              <p className="text-xl uppercase font-semibold lg:text-base">{data.activity_name}</p>
              <p>Jumlah Pesanan: {data.total_item}</p>
            </section>
            <section className="lg:col-span-2 lg:px-4 flex justify-between items-center">
              <div className="flex flex-col justify-center items-start text-sm font-medium text-black pl-8 font-supertall">
                <p className="text-[#FF0000] text-4xl lg:text-2xl">{data.activity_name}</p>
              <p className="pl-1 lg:sm">Harga per item: {data.item_price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
                {/* <p className="pl-1 lg:sm">{data.category + ' - ' + data.description}</p> */}
              </div>
              <div className="font-semibold text-black text-xl flex justify-center items-center gap-2">
                <Button onClick={() => handleDelete(data.order_number)} className="bg-[#FF0000] text-white border hover:border-[#FF0000] hover:text-[#FF0000] hover:bg-transparent">
                  <X size={24} />
                </Button>
              </div>
            </section>
          </div>
        </div>

        {/* Mobile */}
        <div className="bg-white w-full grid grid-cols-5 lg:hidden rounded-md overflow-hidden">
          <section className="col-span-3 w-full h-full bg-[#FF0000] flex gap-1">
            <div className="">
              <Button onClick={() => handleDelete(data.order_number)} className="text-white h-full bg-transparent">
                <X size={24} />
              </Button>
            </div>
            <div className="py-2 flex flex-col justify-center items-start">
              <p className="font-supertall text-sm">{data.activity_name}</p>
              <p className="font-supertall text-lg">{data.order_number}</p>
              <p className="font-semibold">Total Beli:{data.total_item}</p>
            </div>
          </section>
          <section className="w-full h-full col-span-2 grid justify-center items-center text-black font-semibold">
          <p>{parseFloat(data.total_price).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
          </section>
        </div>
      </>
    )
  }
  const RegistrationCard = ({ data }: { data: registration }) => {
    return (
      <>
      <div className="bg-white w-full grid grid-cols-5 lg:hidden rounded-md overflow-hidden">
      <section className="col-span-3 w-full h-full bg-[#FF0000] flex gap-1">
        <div className="">
          <Button onClick={() => handleDelete(data.order_number)} className="text-white h-full bg-transparent">
            <X size={24} />
          </Button>
        </div>
        <div className="py-2 flex flex-col justify-center items-start">
          <p className="font-supertall text-sm">{data.activity_name}</p>
          <p className="font-supertall text-lg">{data.game_name}</p>
          {/* <p className="font-semibold">Total Beli:{data.tot}</p> */}
        </div>
      </section>
      <section className="w-full h-full col-span-2 grid justify-center items-center text-black font-semibold">
      <p>{parseFloat(data.total_price).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
      </section>
    </div>

    <div className="w-full lg:h-[30%] lg:bg-white bg-white overflow-hidden rounded-sm shadow-md h-[100px] relative lg:block hidden">
          <svg width="541" height="200" viewBox="0 0 541 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 lg:-left-32 xl:-left-24 z-0">
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
          <div className="grid grid-cols-3 px-5 h-full z-10 py-6 relative">
            <section className="col-span-1 flex flex-col justify-center items-start text-sm font-medium -space-y-1">
              <p className="lg:text-xs font-semibold">Order: {data.order_number}</p>
              <p className="text-xl uppercase font-semibold lg:text-base">{data.activity_name}</p>
              {/* <p>Jumlah Pesanan: {data.total_item}</p> */}
            </section>
            <section className="lg:col-span-2 flex justify-between items-center">
              <div className="flex flex-col justify-center items-start text-sm font-medium text-black pl-8 font-supertall">
                <p className="text-[#FF0000] text-4xl lg:text-2xl">{data.game_name}</p>
              <p className="lg:sm">{data.activity_name}</p>
                {/* <p className="pl-1 lg:sm">{data.category + ' - ' + data.description}</p> */}
              </div>
              <div className="font-semibold text-black text-xl flex justify-center items-center gap-2">
                <Button onClick={() => handleDelete(data.order_number)} className="bg-[#FF0000] text-white border hover:border-[#FF0000] hover:text-[#FF0000] hover:bg-transparent">
                  <X size={24} />
                </Button>
              </div>
            </section>
          </div>
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
      <div className="w-full grid lg:mt-7 relative z-10 lg:grid-cols-7">
        <section className="lg:col-span-4 h-[20vh]">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-2">
              <Box className="size-6 lg:block hidden" />
              <h1 className="text-2xl font-semibold">Looting Box</h1>
            </div>
          </div>
          <div className="space-y-3 mt-3 h-full lg:h-fit lg:overflow-y-auto [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-black
  [&::-webkit-scrollbar-thumb]:bg-[#ff0000]">
          {tickets.length === 0 && registrations.length === 0 ? (
              <p className="text-white">Tidak ada item dalam keranjang.</p>
            ) : (
              <>
                {tickets.map((data, index) => <Card key={index} data={data} />)}
                {registrations.map((data, index) => <RegistrationCard key={index} data={data} />)}
              </>
            )}
          </div>
        </section>
        <section className="w-full text-black lg:p-11 lg:py-0 py-3 lg:col-span-3">
            <div className="w-full bg-white px-10 py-16 rounded-sm space-y-3">
              <div className="border-b border-black pb-4">
                <p className="font-semibold text-2xl">Detail Transaksi</p>
                <p>Periksa kembali pesanan anda.</p>
              </div>
              <div className="lg:h-32 lg:overflow-auto [&::-webkit-scrollbar]:w-1
            [&::-webkit-scrollbar-track]:bg-red-100
            [&::-webkit-scrollbar-thumb]:bg-[#ff0000] ">
              {[...tickets, ...registrations].map((data, index) => (
              <div key={index} className="flex justify-between">
                <p>{data.order_number || data.total_price}</p>
                <p>
                  {parseFloat(data.total_price).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
              </div>
            ))}
              </div>
              <div className="border-t border-black pt-4">
                <div className="w-full flex justify-between">
                  <p>Subtotal</p>
                  {subtotal.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </div>
                <p>*Catatan: Harga belum termasuk ppn</p>
                <Button  className="w-full bg-[#FF0000] text-white hover:text-[#FF0000] hover:bg-transparent hover:border-[#FF0000] border"><a className="w-full" href="/payment">Bayar</a></Button>
              </div>
            </div>
        </section>
      </div>
    </div >
  )
}