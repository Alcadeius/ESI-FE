"use client";
// import { useState } from 'react';
import Image from 'next/image';
// import { Checkbox } from "@/components/ui/checkbox"
import Logo from "../logo";
import { Input } from "@/components/ui/input"
import DragAndDropInput from "@/components/dragdrop";
import { useState } from "react";
import axios from "axios";

export default function Event() {
  const [formData, setFormData] = useState({
    event_name: "",
    event_date: "",
    organizer_name: "",
    total_prizepool: "",
    application_file: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "application_file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = new FormData();
    form.append("event_name", formData.event_name);
    form.append("event_date", formData.event_date);
    form.append("organizer_name", formData.organizer_name);
    form.append("total_prizepool", formData.total_prizepool);
    form.append("application_file", formData.application_file);
  
    try {
      const response = await axios.post('/api/v1/application', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
      <div className='bg-black h-[126vh]  lg:h-[100vh] xl:h-[100vh] lg:overflow-hidden text-white'>
    {/* Header */}
          <header className="flex justify-between items-center px-4 py-2 h-32">
          <Logo className="w-10 h-10 sm:w-16 sm:h-16 xl:h-20 xl:w-20 lg:w-16 lg:h-16 2xl:w-32 2xl:h-32  lg:order-last"/>
            <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6 lg:hidden">
      <path fillRule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
    </svg>
    </button>
    </header>
    {/* Hero */}
    <section className="flex h-screen px-5 my-1 xl:h-screen lg:px-0 flex-col min-h-[80vh] lg:grid lg:grid-cols-12 2xl:items-start sm:text-center bg-[url('/images/DSCF4041-3.png')] bg-cover sm:max-h-[90vh] xl:max-h-[80vh] 2xl:max-h-[85vh] bg-no-repeat bg-left sm:h-[70vh] lg:bg-none">
      <div className='col-span-6 2xl:grid 2xl:content-center xl:col-span-5 w-fit xl:w-full mx-auto h-screen lg:px-5 my-auto'>
    <form method='POST' onSubmit={handleSubmit} className="max-w-lg xl:px-3 2xl:px-6 xl:max-w-xl 2xl:max-w-4xl w-screen lg:grid lg:justify-items-start grid-cols-1 sm:mx-auto my-5 lg:my-auto col-span-2">
        <h1 className='uppercase text-2xl lg:text-base 2xl:text-5xl font-bold 2xl:text-center my-2 2xl:my-10'>FORMULIR PENGAJUAN EVENT E-SPORT</h1>
        <h4 className='uppercase text-xs 2xl:text-xl font-semibold lg:hidden '>Formulir Pengajuan Event eSports: Bawa Kompetisi Anda ke Level Berikutnya!</h4>
      <div className='lg:grid lg:grid-cols-2 2xl:gap-5 w-full'>
      <div className="relative my-5 lg:my-0">
        {/* <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-7">
      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
    </svg>
    </div> */}
    <input type="text" id="email-address-icon" className="bg-white outline-none text-black text-sm rounded-md lg:rounded-sm 2xl:text-lg block w-full  p-2.5 xl:p-2.5  2xl:p-5" placeholder="Nama Event"
    onChange={handleChange}
    name='event_name'
    />
  </div>
  <div className="relative my-5 lg:my-0">
        {/* <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-7">
  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
</svg>
    </div> */}
    <input type="text" id="email-address-icon" className="bg-white outline-none text-black text-sm rounded-md 2xl:text-lg block w-full lg:ml-2 p-2.5  xl:p-2.5  2xl:p-5" placeholder="Nama Penyelenggara"
    onChange={handleChange}
    name='organizer_name'
    />
  </div>
  <div className="relative my-5 lg:my-3">
    {/* <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-7">
  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
</svg>
    </div> */}
    <input type="date" id="email-address-icon" className="bg-white outline-none text-black text-sm rounded-md 2xl:text-lg block w-full  p-2.5  xl:p-2.5  2xl:p-5" placeholder="Tanggal Event"
    onChange={handleChange}
    name="event_date"
    />
  </div>
  <div className="relative my-3">
    {/* <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-7">
  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
</svg>
    </div> */}
    <input type="text" id="email-address-icon" className="bg-white outline-none text-black  text-sm rounded-md 2xl:text-lg block w-full lg:ml-2  p-2.5  xl:p-2.5  2xl:p-5 uppercase" placeholder="Total PrizePool"
    onChange={handleChange}
    />
  </div>
  </div>
    <div className="grid w-fit items-center my-3 px-5 mx-auto gap-1.5 lg:hidden">
      <Input id="picture" type="file" name='application_file' onChange={handleChange} />
    </div>
    <div className='hidden lg:flex w-full 2xl:my-4 2xl:max-w-full'>
    <DragAndDropInput />
    </div>
    <div className='bg-[#E8462D] text-center lg:my-2 xl:my-5 font-semibold 2xl:text-3xl my-5 mx-3 lg:mx-0 lg:rounded-sm lg:w-[40vh] p-2'>
      <input type="submit" className='uppercase cursor-pointer' value="Kirim Formulir" />
    </div>
</form>
</div>  
   <div className='col-span-6 xl:col-span-7 hidden lg:grid relative'>
   <Image alt='' src="/images/DSCF4041-3.png" width={700} height={700} className='h-[80vh] lg:h-[75vh] blur-sm xl:h-[80vh] 2xl:h-[90vh] object-cover w-[100vw]'/>
   </div>
    </section>
    <footer className="text-center py-4 uppercase hidden lg:inline relative opacity-65 text-xs xl:text-base 2xl:text-2xl bg-black z-10">
        <p className='lg:mt-[-8vh] xl:mt-[-5vh] 2xl:-mt-0'>2024&copy;Copyright GardevTeam</p>
      </footer>
   </div>
  );
}
