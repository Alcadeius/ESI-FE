/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import Logo from "../logo";
import {
  Breadcrumb,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import AppSidebar from "../app-sidebar";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberToken, setRememberToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); 

    try {
      const response = await axios.post(
        "https://esi.bagoesesport.com/api/v1/login",
        {
          email,
          password,
          remember_token: rememberToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login successful", response.data);
      const token = response.data.meta.token;
      localStorage.setItem("authToken", token);
      window.location.href = "/main";
      
    } catch (err : any) {
      if (err.response) {
        setErrorMessage(err.response.data.message || "Login failed");
      } else if (err.request) {
        setErrorMessage("No response from server. Please try again.");
      } else {
        setErrorMessage("An error occurred during login");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white px-5 py-5 lg:px-0 lg:py-0 flex flex-col overflow-hidden lg:grid lg:grid-cols-12 lg:gap-3 bg-no-repeat bg-contain bg-center bg-[url('/images/logo(1).png')] lg:bg-none">
      {/* Header */}
      <SidebarProvider className='lg:hidden' >
      <SidebarInset className='bg-transparent'>
        <header className="flex h-16 shrink-0 items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <Logo className='h-14 w-14 md:w-20 md:h-20'/>
            </BreadcrumbList>
          </Breadcrumb>
          <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
        </header>
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
    <header className="hidden lg:flex justify-between h-fit lg:order-2 lg:col-span-8 lg:bg-[url('/images/DSCF4041-3.png')] lg:h-screen lg:bg-no-repeat lg:bg-cover">
        <div className="h-16 w-16 2xl:w-32 2xl:h-32 lg:order-1">
          <Logo />
        </div>
        <div className="h-auto my-auto">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="size-6 lg:hidden"
            >
              <path
                fillRule="evenodd"
                d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </header>
      {/* Main */}
      <section className="h-screen lg:max-w-lg 2xl:max-w-full grid grid-cols-1 my-[-5vh] lg:mx-3 lg:my-0 place-items-center lg:order-1 lg:col-span-4">
        <div className="sm:text-center">
          <h1 className="uppercase font-extrabold text-2xl 2xl:text-4xl">
            Halo, <br />
            Nak Kodya!
          </h1>
          <p className="text-sm 2xl:text-xl 2xl:my-1">
            Selamat datang para atlet dan komunitas! Selesaikan login atau
            registrasi terlebih dahulu!
          </p>
          <form onSubmit={handleSubmit} className="sm:max-w-md 2xl:max-w-full mx-auto">
            <div className="relative my-5">
              <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="gray"
                  className="size-7"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="bg-white outline-none text-black text-sm rounded-lg 2xl:text-lg block w-full ps-10 2xl:ps-12 p-2.5 2xl:p-5"
                placeholder="EMAIL OR USERNAME"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative my-5">
              <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="gray"
                  className="size-7"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              </div>
              <input
                type="password"
                className="bg-white outline-none text-black text-sm rounded-lg 2xl:text-lg block w-full ps-10 2xl:ps-12 p-2.5 2xl:p-5 "
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between py-5">
              <div className="flex">
                <Checkbox
                  checked={rememberToken}
                  onCheckedChange={(checked) =>
                    setRememberToken(checked === true)
                  }
                />
                <span className="text-xs 2xl:text-xl mx-2">Remember Me</span>
              </div>
              <div className="flex">
                <a
                  href="/forgot"
                  className="underline underline-offset-4 uppercase text-[0.6rem] sm:text-xs 2xl:text-lg"
                >
                  Forget Your Password?
                </a>
              </div>
            </div>
            <div className="bg-[#E8462D] text-center xl:my-5 font-extrabold 2xl:text-3xl my-5 mx-3 p-2">
              <input
                type="submit"
                value={loading ? "Logging in..." : "Login"}
                disabled={loading}
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-xs text-center mt-2">{errorMessage}</p>
            )}
            <div className="mx-3">
              <p className="text-xs 2xl:text-lg font-light uppercase">
                Belum Memiliki akun?{" "}
                <a href="/register" className="uppercase">
                  Klik Disini
                </a>
              </p>
            </div>
          </form>
        </div>
      </section>
      <footer className="hidden lg:inline order-last absolute left-1/2 translate-x-[-50%] 2xl:bottom-5 bottom-1 2xl:text-2xl uppercase">
        <h1>2024@copyright gardevteam</h1>
      </footer>
    </div>
  );
}
