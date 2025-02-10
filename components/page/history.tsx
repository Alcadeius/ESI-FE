/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import NavigationBar from "../navigation-bar";
import { CircleCheck, CircleX, Clock, Filter, StickyNote } from "lucide-react";
import { Button } from "../ui/button";
import useSWR from "swr";
import axios from "axios";
import { getAuthorization } from "@/lib/axios";
const fetcher = (url: string) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.data);
};

interface Transaction {
  transaction_id: string;
  total_price: number;
  method: string;
  status: string;
  created_at: string;
  archive_pdf: string;
  detail_items: TransactionDetail[];
}

interface TransactionDetail {
  order_number: string;
  order_type: string;
  activity_type: string;
  event_name: string;
  activity_name: string;
  archive_pdf: string;
}

const DownloadReceipt = (data: TransactionDetail, token: string) => {
  axios.get(data.archive_pdf, {
    responseType: "blob", headers: {
      Authorization: token,
    }
  }).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    const date = new Date();
    const refinedDate = `${data.order_number}-${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    link.setAttribute("download", `${refinedDate}.pdf`);
    document.body.appendChild(link);
    link.click();
  });
}

export default function History() {
  const [sortOrder, setSortOrder] = useState<"terbaru" | "terlama">("terbaru");
  const [token, setToken] = useState("")

  useEffect(() => {
    async function getToken() {
      const token = await getAuthorization();
      if (token) {
        setToken(token);
      }
    }
    getToken();
  }, [])

  const { data, error } = useSWR("https://esi.bagoesesport.com/api/v1/transaction/history", fetcher);
  if (error) return <p className="text-red-500">Gagal memuat data</p>;
  if (!data) return <p className="text-white">Memuat...</p>;

  const transactions: Transaction[] = data?.data ?? [];
  transactions.sort((a: any, b: any) => {
    return sortOrder === "terbaru"
      ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      : new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  const Card = ({ data, transaksi }: { data: TransactionDetail, transaksi: Transaction }) => {
    return (
      <>
        {/* Desktop */}
        <div className="w-full bg-white overflow-hidden rounded-sm shadow-md h-[100px] relative lg:block hidden">
          <svg width="541" height="100" viewBox="0 0 541 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 lg:-left-24 xl:-left-10 z-0">
            <g filter="url(#filter0_d_317_1317)">
              <rect x="308.095" y="-387" width="311.659" height="652.634" transform="rotate(43 308.095 -387)" fill="#FF0000" />
            </g>
            <defs>
              <filter id="filter0_d_317_1317" x="-141" y="-387" width="681.028" height="697.857" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
              <p>{transaksi.created_at}</p>
              <p className="text-xl uppercase font-semibold">{transaksi.method}</p>
              <p>Status - {transaksi.status}</p>
            </section>
            <section className="col-span-2 flex flex-col justify-center items-start text-sm font-medium text-black pl-8 font-supertall">
              <p className="text-[#FF0000] text-2xl">{data.event_name.length > 40 ? `${data.event_name.slice(0, 40)}...` : data.event_name}</p>
              <p>{data.activity_name + ' - ' + data.activity_type}</p>
            </section>
            <section className="w-full grid items-center justify-end col-span-1">
              {data.archive_pdf ? (
                <Button onClick={() => DownloadReceipt(data, token)} className="bg-[#FF0000] text-white font-semibold text-sm rounded-md px-14 py-1 hover:bg-white hover:text-[#FF0000] hover:border-[#FF0000] border-[#FF0000] border-2">
                  <p className="p-2"> Unduh </p>
                </Button>
              ) : (
                <p className="text-gray-500">File tidak tersedia</p>
              )}
            </section>
          </div>
        </div>

        {/* Mobile */}
        <div className="bg-white w-full aspect-auto h-fit grid grid-cols-3 lg:hidden rounded-md overflow-hidden">
          <section className="w-full h-full bg-[#FF0000] gap-2 flex flex-col justify-center md:items-center items-start p-2">
            <div className="flex items-center border-white border-4 w-full h-full justify-center flex-col gap-1">
              <p>{getIcon(transaksi.status)}</p>
              <p className="text-base uppercase font-supertall">{transaksi.status}</p>
            </div>
            {/* <p className="font-supertall text-xs">{data.event_name}</p> */}
          </section>
          <section className="w-full h-full col-span-2 font-supertall grid px-4 py-2 items-center">
            <div className="w-full h-full grid items-center grid-cols-1">
              <p className="text-lg text-[#ff0000]">{data.activity_name}</p>
              <p className="font-semibold text-black font-sans">{transaksi.created_at}</p>
              <p className="font-semibold text-black font-sans pb-2">Metode : {transaksi.method}</p>
              {data.archive_pdf ? (
                <Button onClick={() => DownloadReceipt(data, token)} className="bg-[#FF0000] text-white font-semibold text-sm rounded-md px-14 py-1 hover:bg-white hover:text-[#FF0000] hover:border-[#FF0000] border-[#FF0000] border-2">
                  <p className="p-2 font-sans font-bold"> Unduh Detail </p>
                </Button>
              ) : (
                <p className="text-gray-500">File tidak tersedia</p>
              )}
            </div>
          </section>
        </div>
      </>
    )
  }
  return (
    <div className="text-white bg-gradient-to-b lg:px-20 lg:py-14 lg:overflow-hidden bg-gray-900 h-screen px-4 flex items-start lg:flex lg:flex-col relative">

      <div className={cn("bg-[url('/images/optimized/backdrop_1.png')]", "absolute lg:top-1/2 lg:right-[5rem] lg:transform lg:-translate-y-1/2 w-[707px] h-[471px] bg-contain z-10 bg-gray-900 bg-blend-lighten", "-top-20 right-0")}>
      </div>

      <NavigationBar />

      <div className="w-full flex flex-col lg:mt-7 relative h-full lg:overflow-y-hidden">
        <section className="flex justify-between w-full z-10 h-fit">
          <div className="flex items-center gap-2 h-fit">
            <StickyNote className="size-6 lg:block hidden" />
            <h1 className="text-2xl font-semibold">Riwayat Transaksi</h1>
          </div>
          <div>
            <Button
              className="text-base font-semibold text-white cursor-pointer bg-transparent"
              onClick={() => setSortOrder(sortOrder === "terbaru" ? "terlama" : "terbaru")}
            >
              <Filter className="size-6" />
              <p className="hidden lg:block">
                {sortOrder === "terbaru" ? "Urutkan: Terlama" : "Urutkan: Terbaru"}
              </p>
            </Button>
          </div>
        </section>
        <section className="z-10 relative lg:overflow-y-auto lg:pr-4">
          {transactions.map((transaction, index) => (
            <div key={index} className="w-full space-y-4">
              <div className="bg-gray-900 flex justify-between items-center relative z-20 lg:py-4 lg:sticky lg:top-0">
                <span className="text-base lg:text-sm text-black w-full md:w-fit py-1 px-3 rounded-sm bg-white text-center font-supertall">
                  {transaction.transaction_id}
                </span>
                <span className="flex-grow h-0.5 bg-white rounded-lg ml-3 hidden lg:block">
                </span>
              </div>
              <div className="space-y-4 pb-4">
                {transaction.detail_items.map((detail, index) => (
                  <Card key={index} data={detail} transaksi={transaction} />
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
const getIcon = (typeId: string) => {
  switch (typeId) {
    case "pending":
      return <Clock className="w-9 h-9 text-white" />;
    case "success":
      return <CircleCheck className="w-9 h-9 text-white" />;
    case "denied":
      return <CircleX className="w-9 h-9 text-white" />;
    default:
      return null;
  }
};