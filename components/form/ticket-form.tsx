"use client"

import axios from "axios";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
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
import { ITicket } from "../types/ticket";
import Cookies from "js-cookie";
interface TicketFormProps {
  ticketID: number | null;
  data: ITicket
}

export function TicketForm({ ticketID, data }: TicketFormProps) {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value);
    if (value > 10) value = 10;
    setTicketQuantity(value);
  };
  const incrementQuantity = () => {
    setTicketQuantity((prev) => (prev < 10 ? prev + 1 : 10));
  };

  const decrementQuantity = () => {
    setTicketQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleBuyTicket = async () => {
    try {
      const token = Cookies.get("authToken");

      if (!token) {
        alert("Anda harus login terlebih dahulu!");
        return;
      }
      if (ticketQuantity > 10) {
        setOpenDialog(false);
        Swal.fire({
          icon: "error",
          title: "Maksimum tiket yang bisa dibeli adalah 10!",
        });
        return;
      }
      const response = await axios.post(
        `https://esi.bagoesesport.com/api/v1/buy-ticket`,
        {
          ticket_sale_id: ticketID,
          quantity: ticketQuantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      )
      if (response.status === 201) {
        setOpenDialog(false);
        Swal.fire({
          title: "Ticket Berhasil Dipesan",
          text: "Apakah kamu mau melakukan pembayaran?",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Tidak,Saya ingin melanjutkan pembelian",
          confirmButtonText: "Ya, Arahkan Saya ke Pembayaran"
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/order");
          }
        })
      } else {
        setOpenDialog(false);
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
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpenDialog(true)} className="w-full min-w-[107px] text-white rounded-sm font-semibold hover:text-[#ff0000] bg-[#ff0000] justify-center items-center text-center p-3 transition-all hover:border-[#ff0000] border-transparent border hover:bg-transparent disabled:bg-red-700" disabled={!data.status?.is_open}>
          {(data.status?.is_open) ? `Beli` : `Segera Hadir`}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Beli Tiket</DialogTitle>
          <DialogDescription>
            Masukan Jumlah Ticket yang ingin anda beli.
          </DialogDescription>
        </DialogHeader>
        <form className="w-full space-y-4">
          <div className="relative flex items-center">
            <button
              type="button"
              id="decrement-button"
              className="bg-[#ff0000] text-white border hover:bg-transparent hover: border-[#ff0000] hover:text-[#ff0000] p-2.5 rounded-s-lg"
              onClick={decrementQuantity}
            >
              <Minus />
            </button>

            <input
              type="text"
              id="quantity-input"
              className="bg-gray-200 border-x-0 h-11 text-center text-gray-900 text-base font-semibold w-full py-2.5"
              min="1"
              max="10"
              value={ticketQuantity}
              onChange={handleQuantityChange}
            />

            <button
              type="button"
              id="increment-button"
              className="bg-[#ff0000] text-white border hover:bg-transparent hover: border-[#ff0000] hover:text-[#ff0000] p-2.5 rounded-e-lg"
              onClick={incrementQuantity}
            >
              <Plus />
            </button>
          </div>
        </form>
        <DialogFooter>
          <button
            type="button"
            onClick={handleBuyTicket}
            className="bg-[#ff0000] text-white font-semibold text-base w-full rounded-sm py-2 hover:bg-white hover:text-[#ff0000] hover:border-[#ff0000] border-[#ff0000] border"
          >
            Beli
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}