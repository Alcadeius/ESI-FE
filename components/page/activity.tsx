"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import { cn } from "@/lib/utils";
import NavigationBar from "../navigation-bar";
import { Wrench, Presentation, ScreenShare, CirclePlus, Gamepad } from "lucide-react";
import { IActivity } from "../types/activity";
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
import { IEvent } from "../types/event";
import { ITicket } from "../types/ticket";
import axiosInstance from "@/lib/axios";
import FormatToRupiah from "@/lib/format-to-rupiah";

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

function GetTicketSales(id: number) {
  return axiosInstance.get(`/ticket-sales/${id}`).then((res) => res.data.data)
}

interface ActivitiesProps extends IActivity {
  ticketSale: ITicket[] | null;
}

export default function ActivityComponent() {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventIdFromUrl = searchParams.get("event");
  const [selectedEventId, setSelectedEventId] = useState<number | null>(
    eventIdFromUrl ? Number(eventIdFromUrl) : null
  );

  // simpan activities yang digabung
  const [activities, setActivities] = useState<ActivitiesProps[]>([]);

  const { data: eventData, error: eventError } = useSWR<{ data: IEvent }>(`/event/${eventIdFromUrl}`, fetcher);

  const { data: activityData, error: activityError } = useSWR<{ data: IActivity[] }>(
    selectedEventId ? `/activities/${selectedEventId}` : null,
    fetcher
  );


  useEffect(() => {
    if (activityData?.data) {
      const fetchTicketSales = async () => {
        try {
          const updatedActivities = await Promise.all(
            activityData.data.map(async (activity) => {
              try {
                const ticketSale = await GetTicketSales(activity.id);
                return { ...activity, ticketSale };
              } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                  console.warn(`No ticket sales for activity ID ${activity.id}`);
                  return { ...activity, ticketSale: null };
                }
                throw error;
              }
            })
          );

          console.log("Updated activities:", updatedActivities);

          setActivities(updatedActivities);
        } catch (error) {
          console.error("Error fetching ticket sales:", error);
        }
      };

      fetchTicketSales();
    }
  }, [activityData]);



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
        `/buy-ticket`,
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
      <div className="text-black px-5 py-5 relative z-20 lg:pt-14">
        {/* ini seharusnya eventData */}
        {/* <div className="flex items-center">
                    <Image alt="" src="/images/bordered_logo-1.png" width={30} height={30} />
                    <p className="uppercase text-sm text-white">Glory Of School - Detail Event</p>
                </div> */}
        {/* sesuai yang ku jelasin. ini adalah activities */}
        {/* <div className="flex justify-between items-center px-2 py-5 relative z-20">
                    <div className="text-sm text-black w-full md:w-fit rounded-sm bg-white text-center font-supertall">
                        {eventData.data.name.length > 45 ? `${eventData.data.name.slice(0, 40)}...` : eventData.data.name}
                    </div>
                    <div className="w-full hidden md:inline">
                        <hr className="p-[1px] text-white bg-white mx-3" />
                    </div>
                </div> */}
        {/* dan setelahnya yaitu card, (sudah ku comment di figma), seharusnya ticketsale */}

        <div className="flex items-center gap-2 font-supertall">
          <Image alt="" src={eventData.data.event_banner} width={50} height={50} className="p-0.5 bg-white rounded-sm" />
          <p className="uppercase text-white lg:text-2xl">{eventData.data.name.length > 50 ? `${eventData.data.name.slice(0, 50)}...` : eventData.data.name}</p>
        </div>

        {selectedEventId && activities && (
          activities.map((activity, index) => (
            activity.ticketSale && (
              <div key={index} className="pb-5">
                <div className="flex justify-between items-center relative z-20 py-5">
                  <span className="text-base text-black w-full md:w-fit py-1 px-3 rounded-sm bg-white text-center font-supertall">
                    {activity.name}
                  </span>
                  <span className="flex-grow h-0.5 bg-white rounded-lg ml-3 hidden lg:block">
                  </span>
                </div>
                <div className="mt-2 space-y-4 w-full h-full relative z-20">
                  {activity.ticketSale && (
                    activity.ticketSale.map((ticketSale) => (
                      <div key={ticketSale.id} className="w-full lg:pl-14">
                        <div className="grid grid-cols-2 lg:grid-cols-3 items-center rounded-sm overflow-hidden">
                          <div className="flex lg:flex-row col-span-1 px-2 lg:px-5 py-2 lg:items-center justify-center lg:justify-between lg:text-end text-start h-full flex-col gap-2 bg-[#ff0000]">
                            <div>
                              <div className="flex items-center justify-center flex-col p-1 w-full relative border-4 border-white min-w-[4.8rem]">
                                {/* Logo (Fixed Size) */}
                                <div className="flex-shrink-0">
                                  {getIcon(activity.type.id)}
                                </div>

                                {/* Adaptive Text */}
                                <div className="flex-1 text-white text-center uppercase font-supertall text-sm">
                                  {activity.type.name}
                                </div>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-white">Mulai {activity.start_at}</p>
                              <p className="text-sm text-white max-w-64">Lokasi di {activity.location}</p>
                            </div>
                          </div>
                          <div className="bg-white flex px-2 py-2 lg:py-0 flex-col lg:px-5 lg:justify-between lg:flex-row h-full justify-between lg:items-center gap-3 lg:gap-0 lg:col-span-2 lg:p-2 font-supertall text-xl">
                            <div className="flex flex-col lg:py-3">
                              <p className="font-medium text-lg lg:text-2xl text-[#ff0000]">{ticketSale.name}</p>
                              <div className="flex flex-col lg:flex-row">
                                <p className="text-sm lg:text-base font-sans capitalize font-semibold">{activity.type.name} | {activity.type.flow}</p>
                                <p className="hidden lg:flex font-sans text-base px-1 font-semibold">{" - "}</p>
                                <p className="text-sm lg:text-base text-black font-sans font-semibold">{FormatToRupiah(ticketSale.price)}/pcs</p>
                              </div>
                            </div>
                            <div className="font-sans hidden lg:flex text-sm">
                              <button className="w-full text-white rounded-sm font-semibold hover:text-[#ff0000] bg-[#ff0000] justify-center items-center text-center p-3 transition-all hover:border-[#ff0000] border-transparent border hover:bg-transparent">
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
                            <button className="w-full lg:hidden rounded-sm my-1 bg-[#ff0000] justify-center items-center text-center p-1"> <CirclePlus className="text-white w-full text-center" /> </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )
          )
          )
        )}
      </div>
    </div>
  );
}

const getIcon = (typeId: number) => {
  switch (typeId) {
    case 1:
      return <Wrench className="w-9 h-9 text-white" />;
    case 2:
      return <Presentation className="w-9 h-9 text-white" />;
    case 3:
      return <Gamepad className="w-9 h-9 text-white" />;
    case 4:
      return <ScreenShare className="w-9 h-9 text-white" />;
    default:
      return <Wrench className="w-9 h-9 text-white" />;
  }
};
