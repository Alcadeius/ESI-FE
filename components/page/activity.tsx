/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import { cn } from "@/lib/utils";
import NavigationBar from "../navigation-bar";
import { Wrench, Presentation, Sword, ScreenShare, CirclePlus } from "lucide-react";
import { Event, Activity } from "../types/activty"; 
import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const baseUrl = "https://esi.bagoesesport.com";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function ActivityComponent() {
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const searchParams = useSearchParams();
    const router = useRouter(); 
    const eventIdFromUrl = searchParams.get("event");
    const [selectedEventId, setSelectedEventId] = useState<number | null>(
        eventIdFromUrl ? Number(eventIdFromUrl) : null
    );

    const { data: eventData, error: eventError } = useSWR<{ data: Event }>(`${baseUrl}/api/v1/event/${eventIdFromUrl}`, fetcher);

    const { data: activityData, error: activityError } = useSWR<{ data: Activity[] }>(
        selectedEventId ? `${baseUrl}/api/v1/activities/${selectedEventId}` : null,
        fetcher
    );

    useEffect(() => {
        if (eventIdFromUrl) {
            setSelectedEventId(Number(eventIdFromUrl));
        }
    }, [eventIdFromUrl]);

    if (eventError) return <div>Error loading events</div>;
    if (activityError) return <div>Error loading activities</div>;
    if (!eventData) return <div>Loading events...</div>;
    

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTicketQuantity(Number(event.target.value));
    };
    
    const handleBuyTicket = async () => {
        try {
            const token = localStorage.getItem("authToken"); 
    
            if (!token) {
                alert("Anda harus login terlebih dahulu!");
                return;
            }
    
            const response = await axios.post(
                `${baseUrl}/api/v1/buy-ticket`,
                {
                    ticket_sale_id: selectedEventId, 
                    quantity: ticketQuantity
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            if (response.status === 200) {
                    Swal.fire({
                      icon: 'success',
                      title: 'Berhasil Ditambahkan!',
                      text: 'Ticket anda sudah tersimpan di keranjang',
                      confirmButtonText: 'OK',
                    }).then(() => {
                      router.push("/payment"); 
                    });
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Gagal Menambahkan Ticket',
                      text: 'Terjadi Kesalahan Saat Memasukan ticket',
                    })
                  }
        } catch (error) {
            console.error("Error saat membeli tiket:", error);
            alert("Gagal membeli tiket!");
        }
    };
    

    return (
        <div className="lg:py-[56px] lg:px-[80px] h-full w-full">
            <div
                className={cn(
                    "bg-[url('/images/backdrop_1.png')]",
                    "absolute lg:top-1/2 lg:right-[5rem] lg:transform lg:-translate-y-1/2 w-[400px] bg-no-repeat lg:w-[707px] h-[471px] bg-contain z-0 bg-gray-900 bg-blend-lighten",
                    "top-[30%] lg:top-1/2 right-0"
                )}
            />
            <NavigationBar />
            <div className="text-black px-2 py-5 relative z-20">
                <div className="flex items-center">
                    <Image alt="" src="/images/bordered_logo-1.png" width={30} height={30}/>
                    <p className="uppercase text-sm text-white">Glory Of School - Detail Event</p>
                </div>
                <div className="flex justify-between items-center px-2 py-5 relative z-20">
                <div className="text-sm text-black w-full md:w-fit rounded-sm bg-white text-center font-supertall">
                {eventData.data.name.length > 45 ? `${eventData.data.name.slice(0, 40)}...` : eventData.data.name}
                </div>
                <div className="w-full hidden md:inline">
                    <hr className="p-[1px] text-white bg-white mx-3"/>
                </div>
                </div>
                {selectedEventId && activityData && (
                    <div className="mt-2 space-y-4 w-full h-full relative z-20">
                        {activityData.data.map((activity) => (
                            <div key={activity.id} className="grid grid-cols-2 lg:grid-cols-3 items-center p-3 rounded-lg lg:px-10">
                                <div className="flex lg:flex-row col-span-1 px-1 py-2 items-center justify-center lg:justify-between lg:text-end text-center h-full flex-col gap-2 bg-[#ff0000]">
                                <div className=" lg:px-5">
                                <p className="inset-0 border-white border-4">{getIcon(activity.type.id)}</p>
                                </div>
                                <div>
                                <p className="text-sm text-white">Mulai: {activity.start_at}</p>
                                <p className="text-sm text-white">Lokasi: {activity.location}</p>
                                </div>
                                </div>
                                <div className="bg-white flex px-1 flex-col lg:justify-between lg:flex-row h-full justify-center items-center gap-3 lg:gap-0 lg:col-span-2 lg:p-2 font-supertall text-xl">
                                    <div className="flex flex-col lg:py-3">
                                    <p className="font-medium text-lg lg:text-2xl text-[#ff0000]">{activity.name}</p> 
                                    <div className="flex flex-col lg:flex-row">
                                    <p className="text-sm lg:text-base text-black">{activity.type.name} / {activity.type.flow}</p>
                                    <p className="hidden lg:flex space-x-2 mx-1"> - </p>
                                    <p className="text-sm lg:text-base text-black uppercase">RP. 40.000 Per Ticket</p>
                                    </div>
                                    </div>
                                    <div className="font-sans hidden lg:flex text-sm">
                                    <button className="w-full text-white rounded-sm font-semibold bg-[#ff0000] justify-center items-center text-center p-3 transition-all hover:border-[#ff0000] hover:border hover:bg-transparent hover:text-black"> 
        <Dialog>
      <DialogTrigger asChild>
        <a className="bg-transparent p-2">Tambahkan Ke Keranjang</a>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Beli Tiket</DialogTitle>
          <DialogDescription>
            Masukan Jumlah Ticket yang ingin anda beli.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="quantity" className="text-right">
          Jumlah
        </Label>
        <Input
          id="quantity"
          type="number"
          min="1"
          value={ticketQuantity}
          onChange={handleQuantityChange}
          className="col-span-3"
        />
      </div>
      </div>
        <DialogFooter>
          <Button onClick={handleBuyTicket}>Beli Tiket</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog> </button>    
                                    </div>   
                                    <button className="w-full lg:hidden rounded-sm my-1 bg-[#ff0000] justify-center items-center text-center p-1"> <CirclePlus className="text-white w-full text-center"/> </button>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const getIcon = (typeId: number) => {
    switch (typeId) {
        case 1:
            return <Wrench className="w-10 h-10 text-white" />;
        case 2:
            return <Presentation className="w-10 h-10 text-white" />;
        case 3:
            return <Sword className="w-10 h-10 text-white" />;
        case 4:
            return <ScreenShare className="w-10 h-10 text-white" />;
        default:
            return <Wrench className="w-10 h-10 text-white" />;
    }
};
