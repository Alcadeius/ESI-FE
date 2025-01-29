"use client";
import { useState,useEffect } from 'react';
import Logo from "../logo";
import { useRouter } from 'next/navigation'; 
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    event_name: '',
    event_date: '',
    organizer_name: '',
    total_prizepool: '',
    application_file: null,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter(); 

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      application_file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axios.post("https://esi.bagoesesport.com/api/v1/application", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.status === 201) { 
        router.push("/main"); 
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (e) { 
      if (e.response && e.response.data && e.response.data.message) {
        setErrorMessage(e.response.data.message); 
      } else {
        setErrorMessage('Terjadi kesalahan, coba lagi nanti!'); 
      }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white px-5 py-5 lg:px-0 lg:py-0 flex flex-col overflow-hidden lg:grid lg:grid-cols-12 lg:gap-3 bg-no-repeat bg-cover bg-center bg-[url('/images/DSCF4041-4.png')] lg:bg-none">
      {/* Header */}
      <header className="flex justify-between h-fit lg:order-2 lg:col-span-6 lg:bg-[url('/images/DSCF4041-3.png')] lg:before:absolute lg:before:content-['*'] lg:before:bg-black lg:before:w-full lg:before:blur-3xl lg:before:opacity-55 lg:before:h-full lg:h-screen lg:bg-no-repeat lg:bg-cover">
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
      <section className="h-screen lg:max-w-lg 2xl:max-w-full grid grid-cols-1 lg:grid-flow-col my-[-5vh] lg:mx-3 lg:my-0 place-items-center lg:order-1 lg:col-span-6">
        <div className="sm:text-center">
          <h1 className="uppercase font-extrabold text-lg 2xl:text-4xl">
          FORMULIR PENGAJUAN EVENT E-SPORT
          </h1>
          <p className="text-sm 2xl:text-xl 2xl:my-1">
          Formulir Pengajuan Event eSports: Bawa Kompetisi Anda ke Level Berikutnya!
          </p>
          <form onSubmit={handleSubmit} className="sm:max-w-md 2xl:max-w-full mx-auto">
            <div className="relative my-5">
              <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
              </div>
              <input
                type="text"
                className="bg-white outline-none text-black text-sm rounded-lg 2xl:text-lg block w-full 2xl:ps-12 p-2.5 2xl:p-5"
                placeholder="Nama Event"
                name='event_name'
                value={formData.event_name}
                onChange={handleChange}
              />
            </div>
            <div className="relative my-5">
              <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
              </div>
              <input
                type="text"
                className="bg-white outline-none text-black text-sm rounded-lg 2xl:text-lg block w-full 2xl:ps-12 p-2.5 2xl:p-5"
                placeholder="Nama Penyelenggara"
                name='organizer_name'
                value={formData.organizer_name}
                onChange={handleChange}
              />
            </div>
            <div className="relative my-5">
              <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
              </div>
              <input
                type="date"
                className="bg-white outline-none text-black text-sm rounded-lg 2xl:text-lg block w-full 2xl:ps-12 p-2.5 2xl:p-5 "
                placeholder="Tanggal Event"
                name='event_date'
                value={formData.event_date}
                onChange={handleChange}
              />
            </div>
            <div className="relative my-5">
              <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
              </div>
              <input
                type="text"
                className="bg-white outline-none text-black text-sm rounded-lg 2xl:text-lg block w-full 2xl:ps-12 p-2.5 2xl:p-5 "
                placeholder="Total Prizepool"
                name='total_prizepool'
                value={formData.total_prizepool}
                onChange={handleChange}
              />
            </div>
            <div className="mx-3 md:mx-10">
            <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="file_input" />Upload file
            <input className="block w-full text-sm text-white bg-black rounded-lg cursor-pointer" id="file_input" type="file" 
            onChange={handleFileChange}/>
            </div>
            <div className="bg-[#E8462D] text-center xl:my-5 font-extrabold 2xl:text-3xl my-5 mx-3 p-2">
              <input
                type="submit"
                value={loading ? "Submitting..." : "Submit"}
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
