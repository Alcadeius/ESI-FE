/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import NavigationBar from "../navigation-bar";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Payment() {
  const [file, setFile] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [tickets, setTickets] = useState<{ activity_name: string; total_price: string }[]>([]);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
  const handleCopy = () => {
    const input = document.getElementById("input-transfer") as HTMLInputElement;
    const inputValue = input.value;

    navigator.clipboard.writeText(inputValue).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch((err) => {
      console.error("Gagal menyalin: ", err);
    });
  };
  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };


  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("https://esi.bagoesesport.com/api/v1/cart/items", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setTotalPrice(response.data.total_price);
          const fetchedTickets = response.data.details.tickets.map((ticket: any) => ({
            activity_name: ticket.activity_name,
            total_price: ticket.total_price,
          }));
          setTickets(fetchedTickets);
          setTotalPrice(fetchedTickets.length > 0 ? response.data.total_price : 0);
        }
      } catch (error) {
        console.error("Gagal mengambil data cart:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    if (!file) {
      alert("Silakan unggah bukti transfer terlebih dahulu!");
      return;
    }

    const formData = new FormData();
    const token = localStorage.getItem("authToken");
    formData.append("method", paymentMethod);
    formData.append("proof_image", file);

    try {
      const response = await axios.post("https://esi.bagoesesport.com/api/v1/transaction", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Pengajuan Berhasil!",
          text: "Data event Anda telah berhasil diajukan.",
          confirmButtonText: "OK",
        }).then(() => {
          router.push("/main");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Data Gagal Ditambahkan",
          text: "Terjadi Kesalahan Saat Melakukan Pengajuan",
        });
        setErrorMessage(response.data.message);
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.data?.message) {
        setErrorMessage(e.response.data.message);
      } else {
        setErrorMessage("Terjadi kesalahan, coba lagi nanti!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen font-sans lg:px-20 lg:pt-14 bg-[url('/images/DSCF4041-3.png')] bg-cover bg-no-repeat before:absolute before:w-full before:content-['a'] before:h-full before:bg-black/35 before:top-0 before:left-0 before:z-0">
      <NavigationBar />
      <section className="px-5 relative grid grid-cols-1 2xl:place-content-center lg:flex z-10 py-6 lg:w-full lg:py-5">
        <div className="flex flex-col lg:rounded-bl-md lg:rounded-tl-md rounded-t-md lg:w-full xl:max-w-4xl lg:max-w-lg py-3 bg-white px-5 lg:py-10 lg:px-10 xl:px-20 xl:py-14">
          <div className="text-black flex flex-col mb-5">
            <h1 className="text-lg text-blue-500 font-bold lg:text-2xl">Detail Belanja</h1>
            <p className="text-xs lg:text-base">Pastikan kembali pesanan anda sebelum mengirimkan formulir ini</p>
          </div>

          {tickets.length > 0 ? (
            <div className="mb-2 lg:h-full">
              {tickets.map((ticket, index) => (
                <div key={index} className="flex text-xs md:text-base font-medium justify-between mb-2">
                  <h1>{ticket.activity_name}</h1>
                  <h4>Rp. {parseFloat(ticket.total_price).toLocaleString("id-ID")}</h4>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 h-full">
              <h2 className="text-lg font-bold">Tidak ada daftar belanja</h2>
            </div>
          )}

          <hr className="bg-black p-[0.5px] " />

          {totalPrice !== null && (
            <div className="flex text-sm lg:text-lg font-bold justify-between mt-2">
              <h1>Total</h1>
              <h4>Rp. {totalPrice?.toLocaleString("id-ID") || "0"}</h4>
            </div>
          )}

          <div className="text-xs">
            Catatan: setelah formulir ini dikirimkan, harap menunggu konfirmasi pembayaran selambat-lambatnya 96 jam hari kerja (Senin-Sabtu)
          </div>
        </div>

        <div className="flex flex-col lg:max-w-2xl lg:w-3/4 lg:rounded-br-md lg:rounded-tr-md rounded-b-md bg-[#D9D9D9] py-3 px-5 lg:py-10 lg:px-10 xl:px-20 xl:py-14">
          <h1 className="text-lg text-blue-500 lg:text-2xl font-bold">Pembayaran</h1>
          <div>
            <form onSubmit={handleSubmit} className="mx-auto pt-2">
              {errorMessage && (
                <p className="text-red-500 text-xs text-center mt-2">{errorMessage}</p>
              )}
              <label htmlFor="payment" className="block mb-2 text-sm font-medium text-gray-900">Pilih Metode Pembayaran</label>
              <select id="payment" className="bg-gray-50 border mb-3 outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option selected>Pilih Metode Pembayaran</option>
                <option value="Qris">Qris</option>
                <option value="Dana">Dana</option>
              </select>
              <div>
                <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tujuan Transfer</label>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 z-10 end-2 flex items-center pointer-events-none">
                    {copied && <span className="absolute -top-5 right-0 text-sm text-green-600 font-medium">Disalin!</span>}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 relative z-20 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                    </svg>
                  </div>
                  <input type="text" id="input-transfer" className="bg-gray-50 border outline-none font-medium relativez z-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full cursor-pointer p-2" value="102091029104" onClick={handleCopy} readOnly />
                </div>
                <label htmlFor="dropzone-file" className="font-medium">Bukti Transfer</label>
                <div
                  className="flex items-center justify-center w-full"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-transparent">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 2xl:text-2xl">
                        <span className="font-semibold ">Click to upload</span> or drag and drop
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      name='application_file'
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {file && (
                  <div className="mt-2 text-sm text-gray-700">
                    File yang dipilih: {file.name}
                  </div>
                )}
              </div>
              <div className='w-full lg:float-right mt-5 bg-[#ff0000] cursor-pointer p-2 text-white rounded-md text-center'>
                <input type="submit" className="w-full" disabled={loading} value={loading ? "Submitting..." : "Submit"} />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
