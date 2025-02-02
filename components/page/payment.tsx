/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react";
import NavigationBar from "../navigation-bar";
export default function Payment() {
  const [file, setFile] = useState<any>(null);
  const [copied, setCopied] = useState(false); 
  
   // Fungsi untuk menyalin teks dari input
   const handleCopy = () => {
    const input = document.getElementById("input-transfer") as HTMLInputElement; // Tipekan dengan HTMLInputElement
    const inputValue = input.value; // Ambil nilai dari input
    
    navigator.clipboard.writeText(inputValue).then(() => {
      setCopied(true); // Menampilkan status berhasil disalin
      setTimeout(() => setCopied(false), 2000); // Reset status setelah 2 detik
    }).catch((err) => {
      console.error("Gagal menyalin: ", err);
    });
  };
  const handleFileChange = (e:any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  return (
    <div className="h-screen lg:px-20 lg:pt-14 bg-[url('/images/DSCF4041-3.png')] bg-cover bg-no-repeat before:absolute before:w-full before:content-['a'] before:h-full before:bg-black/35 before:top-0 before:left-0 before:z-0">
      <NavigationBar />
      <section className="px-5 relative z-10 py-5">
        <div className="flex flex-col py-3 rounded-md bg-white">
          <div className="text-black flex flex-col px-3 mb-5">
            <h1 className="text-lg text-blue-500 font-bold">Detail Belanja</h1>
            <p className="text-xs">Pastikan kembali pesanan anda sebelum mengirimkan formulir ini</p>
          </div>
          <div className="flex text-xs px-3 font-bold justify-between mb-2 h-40">
            <h1>Tiket Seminar - Glory Of School</h1>
            <h4>Rp. 160.000</h4>
          </div>
          <hr className="bg-black mx-auto max-w-xl w-full p-[0.5px]" />
          <div className="flex px-3 text-sm font-bold justify-between">
            <h1>Total</h1>
            <h4>Rp. 160.000</h4>
          </div>
          <div className="text-xs px-3">
            Catatan: setelah formulir ini dikirimkan, harap menunggu konfirmasi pembayaran selambat-lambatnya 96 jam hari kerja (Senin-Sabtu)
          </div>
          <div className="flex flex-col bg-[#D9D9D9] py-3 px-3">
            <h1 className="text-lg text-blue-400">Pembayaran</h1>
            <div>
              <form className="max-w-sm mx-auto">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Select an option</label>
                <select id="countries" className="bg-gray-50 border mb-3 outline-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                  <option selected>Pilih Metode Pembayaran</option>
                  <option value="Q">Qris</option>
                  <option value="D">Dana</option>
                </select>
                <div>
                  <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tujuan Transfer</label>
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 z-10 end-2 flex items-center pointer-events-none">
                    {copied && <span className="absolute -top-5 right-0 text-sm text-green-500">Disalin!</span>}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                      </svg>
                    </div>
                    <input type="text" id="input-transfer" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2" value="102091029104" onClick={handleCopy} readOnly />
                  </div>
                  <label htmlFor="dropzone-file">Bukti Transfer</label>
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
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
