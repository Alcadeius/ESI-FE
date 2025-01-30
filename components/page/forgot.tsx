"use client";
import { useState } from "react";
import axios from "axios";
import Logo from "../logo";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
      
        try {
          const response = await axios.post(
            "https://esi.bagoesesport.com/api/v1/forgot-password",
            { email },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
      
          console.log("Forgot Password Success:", response.data);
          alert("Silakan cek email Anda untuk instruksi reset password.");
      
        } catch (err) {
          if (err.response) {
            setErrorMessage(err.response.data.message || "Permintaan reset gagal.");
          } else if (err.request) {
            setErrorMessage("Tidak ada respons dari server. Coba lagi.");
          } else {
            setErrorMessage("Terjadi kesalahan.");
          }
          console.error("Forgot Password Error:", err);
        } finally {
          setLoading(false);
        }
      };

  return (
    <div className="h-screen w-screen bg-black text-white px-5 py-5 lg:px-0 lg:py-0 flex flex-col overflow-hidden lg:grid lg:grid-cols-12 lg:gap-3 bg-no-repeat bg-contain bg-center bg-[url('/images/logo(1).png')] lg:bg-none">
      {/* Header */}
      <header className="flex justify-between h-fit lg:order-2 lg:col-span-8 lg:bg-[url('/images/DSCF4041-3.png')] lg:h-screen lg:bg-no-repeat lg:bg-cover">
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
            Forgot Your Password?
          </h1>
          <p className="text-sm 2xl:text-xl 2xl:my-1">
            Silahkan Masukan Alamat Email Anda
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
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
      
            <div className="bg-[#E8462D] text-center xl:my-5 font-extrabold 2xl:text-3xl my-5 mx-3 p-2">
              <input
                type="submit"
                value={loading ? "Requesting..." : "Request"}
                disabled={loading}
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-xs text-center mt-2">{errorMessage}</p>
            )}
          </form>
        </div>
      </section>
      <footer className="hidden lg:inline order-last absolute left-1/2 translate-x-[-50%] 2xl:bottom-5 bottom-1 2xl:text-2xl uppercase">
        <h1>2024@copyright gardevteam</h1>
      </footer>
    </div>
  );
}
