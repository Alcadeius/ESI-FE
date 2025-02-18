import { cn } from "@/lib/utils";
import { RegisterForm } from "../form/register-form";
import Image from "next/image";

export default function Register() {
  return (
    <div className="items-center justify-center grid lg:grid-cols-4 xl:grid-cols-3 h-screen w-screen lg:overflow-hidden">
      <RegisterForm />
      <div className={cn("bg-[url('/images/optimized/backdrop_1.png')]",
        "w-full h-full lg:col-span-2 bg-center xl:col-span-2 bg-no-repeat bg-contain z-0 bg-gray-900 bg-blend-lighten",
        "hidden lg:flex justify-end items-start")}>
          <div className="flex items-center lg:justify-start p-10">
            <Image alt='logo' src="/images/logo.png" width={75} height={75}/>
          </div>
      </div>
    </div>
  );
}