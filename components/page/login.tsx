import { cn } from "@/lib/utils";
import { LoginForm } from "../form/login-form";

export default function Login() {
  return (
    <div className="items-center justify-center grid lg:grid-cols-3 h-screen w-screen lg:overflow-hidden">
      <LoginForm />
      <div className={cn("bg-[url('/images/backdrop_1.png')]",
        "w-full h-full col-span-2 bg-center bg-no-repeat bg-contain z-0 bg-gray-900 bg-blend-lighten",
        "hidden lg:flex justify-end items-start")}>
          <div className="flex items-center lg:justify-start p-10">
            <img alt='logo' src="/images/logo.png" width={75} />
          </div>
      </div>
    </div>
  );
}