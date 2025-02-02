"use client";
import { useState,useEffect } from 'react';
import axios from 'axios';
import NavigationBar from '../navbar';
import { useRouter } from 'next/navigation';

export default function eventsubmit() {
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
      if (file) {
        formDataToSend.append('application_file', file);
      }

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
    <div className="bg-[url('/images/DSCF4041-3.png')] bg-center bg-cover h-full 2xl:h-screen before:top-0 before:left-0 w-full bg-no-repeat before:absolute before:z-0 before:content-['a'] before:h-full before:w-full before:bg-black/40">
    <NavigationBar name='Event Submit'/>
    <div className='px-3 md:px-14 md:py-10 lg:px-28 lg:max-w-4xl lg:mx-auto py-5 relative z-10'>
    <div className='bg-[#F9FAFB] rounded-md'>
    <div className='flex flex-col px-5 py-5 lg:justify-center'>
    <div className='flex-col text-sm mb-5'>
    <h1 className='text-[#3B82F6] uppercase lg:text-xl font-bold'>Form Pengajuan Event Organizer</h1>
    <p className='text-xs'>Formulir Untuk melakukan pengajuan event</p>
    </div>
    <div className='lg:max-w-full'>
    <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
        {errorMessage && (
              <p className="text-red-500 text-xs text-center mt-2">{errorMessage}</p>
            )}
            <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Event</label>
                <input type="text" id="first_name" name='event_name' className="bg-gray-50 border outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Nama Event" required 
                value={formData.event_name}
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Penyelenggara</label>
                <input type="text" id="first_name" name='organizer_name' className="bg-gray-50 border outline-none  text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Nama Penyelenggara" required 
                value={formData.organizer_name}
                onChange={handleChange}
                />
            </div>
            <div>
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Event</label>
                <input type="date" name='event_date' className="bg-gray-50 border text-gray-900 outline-none text-sm rounded-lg block w-full p-2.5 "  
                value={formData.event_date}
                onChange={handleChange}
                />
            </div>  
            <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Prizepool / Hadiah</label>
                <input type="text" id="first_name" name='total_prizepool' className="bg-gray-50 border outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Total Prizepool" required 
                value={formData.total_prizepool}
                onChange={handleChange}
                />
            </div>
            <div className='lg:col-span-2'>
            <label htmlFor="dropzone-file">Softcopy Dokumen Pengajauan</label>
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
                value={formData.application_file}
                onChange={handleFileChange}
              />
            </label>
          </div>
          <p className='text-gray-400 text-sm'>Salinan softcopy surat pengajuan dalam bentuk dokumen PDF</p>
          </div>
          {file && (
            <div className="mt-2 text-sm text-gray-700">
              File yang dipilih: {file.name}
            </div>
          )}
          </div>
          <div className='w-[25%] lg:float-right bg-[#ff0000] cursor-pointer p-2 text-white rounded-md text-center'>
          <input type="submit" value="Submit"/>
          </div>
    </form>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}