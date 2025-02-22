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
  import { useRouter } from "next/navigation";
  export default function DropdownMenuDemo() {
    const router = useRouter();

  // Fungsi untuk menangani logout
  const handleLogout = async () => {
    // Menghapus cookie authToken
    Cookies.remove("authToken", { path: "/" });

    // Tunggu sebentar agar cookie benar-benar terhapus
    await new Promise(resolve => setTimeout(resolve, 100));

    // Redirect ke halaman login setelah logout
    router.push("/login");
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
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut/>
            Log out
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  