/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useMemo } from "react";
import NavigationBar from "../navigation-bar";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import axiosInstance from "@/lib/axios";
export default function Payment() {
  const [file, setFile] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [tickets, setTickets] = useState<{ activity_name: string; total_price: string }[]>([]);
  const [registrations, setRegistrations] = useState<{ activity_name: string; total_price: string }[]>([]);
  const [bankAccounts, setBankAccounts] = useState<
    { id: number; bank_name: string; account_number: string; account_name: string }[]
  >([]);

  const [transferDestination, setTransferDestination] = useState("");
  const router = useRouter();

  const defaultBankAccounts = useMemo(()=>[
    {
      id: 3,
      bank_name: "BPD BALI",
      account_number: "0110202557402",
      account_name: "esi denpasar",
      created_at: "2025/02/15 14:46:02",
      updated_at: "2025/02/16 19:37:30",
    },
    {
      id: 4,
      bank_name: "DANA",
      account_number: "085191387200",
      account_name: "esi denpasar official",
      created_at: "2025/02/15 14:46:36",
      updated_at: "2025/02/16 19:38:16",
    },
    {
      id: 5,
      bank_name: "GOPAY",
      account_number: "085191387200",
      account_name: "esi denpasar official",
      created_at: "2025/02/15 14:47:17",
      updated_at: "2025/02/16 19:38:39",
    },
    {
      id: 6,
      bank_name: "OVO",
      account_number: "085191387200",
      account_name: "esi denpasar official",
      created_at: "2025/02/16 19:40:00",
      updated_at: "2025/02/16 19:40:00",
    },
  ],[])  
  const param = useSearchParams()
  const event = param.get("event")
  useEffect(() => {
    const fetchBankAccounts = async () => {
      const token = Cookies.get("authToken");
      if (!token) return;
  
      try {
        const response = await axiosInstance.get(`/bank-accounts/${event}`);
  
        if (response.status === 200 && response.data.default_bank_account?.length > 0) {
          setBankAccounts(response.data.default_bank_account);
        } else {
          setBankAccounts(defaultBankAccounts);
        }
      } catch (error) {
        console.error("Gagal mengambil data bank:", error);
        setBankAccounts(defaultBankAccounts);
      }
    };
  
    fetchBankAccounts();
  }, [defaultBankAccounts,event]);
  
  //   useEffect(() => {
  //   if (paymentMethod in paymentOptions) {
  //     setTransferDestination(paymentOptions[paymentMethod as keyof typeof paymentOptions]);
  //   } else {
  //     setTransferDestination("");
  //   }
  // }, [paymentMethod]);

  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBank = bankAccounts.find(bank => bank.bank_name === e.target.value);
    setPaymentMethod(selectedBank?.bank_name || "");
    setTransferDestination(selectedBank?.account_number || "");
  };


  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
  const handleCopy = () => {
    const input = document.getElementById("input-transfer") as HTMLInputElement;
    if (input) {
      navigator.clipboard.writeText(input.value)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Gagal menyalin: ", err);
        });
    }
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
      const token = Cookies.get("authToken");
      if (!token) return;

      try {
        const response = await axiosInstance.get("/cart/items");

        if (response.status === 200) {
          setTotalPrice(response.data.total_price);
          const fetchedTickets = response.data.details.tickets.map((ticket: any) => ({
            activity_name: ticket.activity_name,
            total_price: ticket.total_price,
          }));
          const fetchedRegistrations = response.data.details.registrations.map((registration: any) => ({
            activity_name: registration.activity_name,
            total_price: registration.total_price,
          }));

          setTickets(fetchedTickets);
          setRegistrations(fetchedRegistrations);
          setTotalPrice(fetchedTickets.length || fetchedRegistrations.length > 0 ? response.data.total_price : 0);
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
    if (tickets.length || registrations.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Tidak Ada Belanjaan",
        text: "Silahkan menambahkan pembelian terlebih dahulu",
      }); setLoading(false)
      return;
    }
    if (!file) {
      Swal.fire({
        icon: "error",
        title: "Kekurangan Data",
        text: "Silahkan masukan Bukti Pembayaran",
      }); setLoading(false)
      return;
    }

    const formData = new FormData();
    formData.append("method", paymentMethod);
    formData.append("proof_image", file);
    const selectedBank = bankAccounts.find(bank => bank.bank_name === paymentMethod);
    formData.append("bank_account_id", `${selectedBank?.id}`);

    try {
      const response = await axiosInstance.post("/transaction", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Pengajuan Berhasil!",
          text: "Pembayaran Anda telah berhasil dikirimkan.",
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
    <div className="h-screen font-sans lg:px-20 lg:pt-14 lg:bg-[url('/images/DSCF4041-3.png')] bg-gray-900 bg-cover bg-no-repeat">
      <NavigationBar />
      <section className="px-5 relative grid grid-cols-1 2xl:place-content-center lg:flex z-10 py-6 lg:w-full lg:py-5">
        <div className="flex flex-col lg:rounded-bl-md lg:rounded-tl-md lg:rounded-tr-none lg:rounded-br-none rounded-t-md lg:w-full xl:max-w-4xl lg:max-w-lg py-3 bg-white px-5 lg:py-10 lg:px-10 xl:px-20 xl:py-14">
          <div className="text-black flex flex-col mb-5">
            <h1 className="text-lg text-blue-500 font-bold lg:text-2xl">Detail Belanja</h1>
            <p className="text-xs lg:text-base">Pastikan kembali pesanan anda sebelum mengirimkan formulir ini</p>
          </div>

          {tickets.length || registrations.length > 0 ? (
            <div className="mb-2 lg:h-full">
              {tickets.map((ticket, index) => (
                <div key={index} className="flex text-xs md:text-base font-medium justify-between mb-2">
                  <h1>{ticket.activity_name}</h1>
                  <h4>Rp. {parseFloat(ticket.total_price).toLocaleString("id-ID")}</h4>
                </div>
              ))}
              {registrations.map((reg, index) => (
                <div key={index} className="flex text-xs md:text-base font-medium justify-between mb-2">
                  <h1>{reg.activity_name || "Nama Tidak ada"}</h1>
                  <h4>Rp. {parseFloat(reg.total_price).toLocaleString("id-ID")}</h4>
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

        <div className="flex flex-col lg:max-w-2xl lg:w-3/4 lg:rounded-br-md lg:rounded-bl-none lg:rounded-tr-md rounded-b-md bg-[#D9D9D9] py-3 px-5 lg:py-10 lg:px-10 xl:px-20 xl:py-14">
          <h1 className="text-lg text-blue-500 lg:text-2xl font-bold">Pembayaran</h1>
          <div>
            <form onSubmit={handleSubmit} className="mx-auto pt-2">
              {errorMessage && (
                <p className="text-red-500 text-xs text-center mt-2">{errorMessage}</p>
              )}
              <label htmlFor="payment" className="block mb-2 text-sm font-medium text-gray-900">Pilih Metode Pembayaran</label>
              <select
                id="payment"
                className="bg-gray-50 border mb-3 outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                value={paymentMethod}
                onChange={handlePaymentChange}
              >
                <option disabled value="">Pilih Metode Pembayaran</option>
                {bankAccounts.map((bank) => (
                  <option key={bank.id} value={bank.bank_name}>
                    {bank.bank_name} ({bank.account_name})
                  </option>
                ))}
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
                  <input type="text" id="input-transfer" className="bg-gray-50 border outline-none font-medium relativez z-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full cursor-pointer p-2" value={transferDestination} onClick={handleCopy} readOnly />
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
              <button type="submit"  className='w-full lg:float-right mt-5 bg-[#ff0000] cursor-pointer p-2 text-white rounded-md text-center h-full'>
              <input type="submit" disabled={loading} value={loading ? "Submitting..." : "Submit"} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
