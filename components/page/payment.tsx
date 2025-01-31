"use client"
import { useState } from "react";

export default function Payment() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  return (
    <div className="bg-[url('/images/DSCF4041-3.png')] before:z-0 before:top-0 before:absolute before:left-0 before:content-[''] md:px-5 md:py-5 lg:px-16 lg:py-20 before:h-screen lg:before:w-screen lg:before:h-[100vh] before:bg-black/50 before:w-full bg-no-repeat bg-cover bg-center h-full lg:h-screen lg:fit flex flex-col lg:flex-row place-items-center place-content-center">
      <div className="relative z-10 flex flex-col sm:max-w-[90%] 2xl:h-[50%] lg:justify-center lg:h-full xl:max-w-xl xl:h-[80%] bg-[#D9D9D9] px-5 py-5 w-full">
        <div className="flex flex-col mb-10">
          <h1 className="text-xl font-semibold xl:text-2xl">Formulir Pembayaran</h1>
          <h4>Pastikan Pesanan telah sesuai</h4>
        </div>
        <div className="flex justify-between mb-3">
          <div className="text-sm xl:text-lg">Tiket Seminar - Glory Of School</div>
          <div className="text-sm xl:text-lg">Rp. 160.000</div>
        </div>
        <div className="flex justify-between h-40 overflow-auto">
          <div className="text-sm xl:text-lg">Tiket Seminar - Glory Of School</div>
          <div className="text-sm xl:text-lg">Rp. 160.000</div>
        </div>
        <hr className="bg-black p-[1px]" />
        <div className="flex justify-between">
          <div>Total</div>
          <div>Rp. 200.000</div>
        </div>
        <div className="text-sm xl:text-lg">
          Cacatan: setelah formulir ini dikirimkan, harap menunggu konfirmasi pembayaran selambat-lambatnya 96 jam hari kerja (Senin-Sabtu)
        </div>
      </div>
      <div className="relative z-10 px-5 py-5 w-full sm:max-w-[90%] bg-[#D9D9D9] xl:h-[80%] xl:max-w-xl 2xl:h-[50%] 2xl:text-3xl h-full lg:justify-center flex flex-col m-1 lg:m-1">
        <form className="max-w-sm lg:max-w-full w-full mx-auto">
          <select id="countries" className="bg-gray-50 border 2xl:text-2xl border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
            <option selected>Pilih Metode Bayar</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
          <input
            type="text"
            className="bg-gray-50 border mt-2 2xl:text-2xl border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Nomor Rekening"
          />
          <label htmlFor="">Lampiran Bukti Transfer (JPG/PNG)</label>
          <div
            className="flex items-center justify-center w-full"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 lg:h-32 xl:h-40 2xl:h-52 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-transparent">
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
                onChange={handleFileChange}
              />
            </label>
          </div>
          {file && (
            <div className="mt-2 text-sm text-gray-700">
              File yang dipilih: {file.name}
            </div>
          )}
          <input type="submit" value="Continue" className="p-2 bg-black text-white rounded-md w-full mt-5" />
        </form>
      </div>
    </div>
  );
}
