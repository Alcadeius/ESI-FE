import {
    // Cloud,
    CreditCard,
    // Github,
    // Keyboard,
    // LifeBuoy,
    LogOut,
    // Mail,
    // MessageSquare,
    // Plus,
    // PlusCircle,
    // Settings,
    User,
    // UserPlus,
    // Users,
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    // DropdownMenuPortal,
    DropdownMenuSeparator,
    // DropdownMenuShortcut,
    // DropdownMenuSub,
    // DropdownMenuSubContent,
    // DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import axios from "axios";
  export default function DropdownMenuDemo() {
    const handleDelete = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return;
        }

        try {
            const response = await axios.delete(
                "https://esi.bagoesesport.com/api/v1/logout", 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Delete Response:", response);
          
            localStorage.removeItem("authToken");
            localStorage.removeItem("Data");
            window.location.href = "/login"; 
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
            <DropdownMenuItem disabled>
              <User />
              <a href="#" >Akunku</a>
              {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
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
  