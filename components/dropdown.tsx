"use client"

import {
  CreditCard,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Cookies from "js-cookie";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function DropdownMenuDemo() {
  const router = useRouter()

  const handleDelete = async () => {
    const token = Cookies.get("authToken");
    if (!token) {
      return
    }

    try {
      await axiosInstance.delete("/logout")
      localStorage.removeItem("authToken")
      localStorage.removeItem("Data")
      router.push("/login")
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full bg-[#E2E8F0] hover:bg-white text-black h-10 w-10 p-0 m-0">ESI</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-black text-white" align="end">
        <DropdownMenuLabel>Opsi Pengguna</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CreditCard />
            <a href="/order">Keranjangku</a>
            {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          <LogOut />
          Log out
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
