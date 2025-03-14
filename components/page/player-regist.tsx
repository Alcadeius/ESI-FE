"use client";
import { useState } from 'react';
import axios from 'axios';
import NavigationBar from '../navigation-bar';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import axiosInstance from '@/lib/axios';

interface FormData {
  event_name: string;
  event_date: string;
  organizer_name: string;
  total_prizepool: string;
  application_file: File | null; 
  [key: string]: string | File | null; 
}

export default function EventSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    event_name: '',
    event_date: '',
    organizer_name: '',
    total_prizepool: '',
    application_file: null,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter(); 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(''); 
    setLoading(true);
    setIsSubmitting(true)
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) { 
          formDataToSend.append(key, formData[key] as string | Blob);
        }
      });
      const response = await axiosInstance.post("/application", formDataToSend);

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Pengajuan Berhasil!',
          text: 'Data event Anda telah berhasil diajukan.',
          confirmButtonText: 'OK',
        }).then(() => {
          router.push("/main"); 
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Data Gagal Ditambahkan',
          text: 'Terjadi Kesalahan Saat Melakukan Pengajuan',
        })
        setErrorMessage(response.data.message);
      }
    } catch (e) { 
      if (axios.isAxiosError(e) && e.response?.data?.message) {
        setErrorMessage(e.response.data.message); 
      } else {
        setErrorMessage('Terjadi kesalahan, coba lagi nanti!'); 
      }
    } finally {
        setLoading(false);
        setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[url('/images/DSCF4041-3.png')] bg-blend-lighten bg-gray-900 bg-center bg-cover h-full 2xl:h-screen before:top-0 before:left-0 w-full bg-no-repeat before:absolute before:z-0 before:content-['a'] before:h-full before:w-full lg:px-20 lg:py-16">
      <NavigationBar />
      <div className='px-3  lg:my-0 md:px-14 md:py-10 lg:px-28 lg:mx-auto py-5 relative z-10 w-full'>
        <div className='bg-[#F9FAFB] rounded-md'>
          <div className='flex flex-col px-5 py-5 lg:px-20 lg:py-10 lg:justify-center w-full'>
            <div className='flex-col text-sm mb-5'>
              <h1 className='text-[#3B82F6] uppercase text-base lg:text-xl font-bold'>Form Pendaftaran Atlet</h1>
              <p className='text-xs'>Formulir Untuk melakukan Pendaftaran Atlet Esport</p>
            </div>
            <div className='lg:max-w-full'>
              <form onSubmit={handleSubmit}>
                  {errorMessage && (
                    <p className="text-red-500 text-xs text-center mt-2">{errorMessage}</p>
                  )}
                <div className="grid gap-6 mb-6">
                  <div>
                    <label htmlFor="event_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Instansi / Sekolah</label>
                    <input type="text" id="event_name" name='event_name' className="bg-gray-50 border outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Nama Sekolah" required 
                      value={formData.event_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="organizer_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</label>
                    <input type="text" id="organizer_name" name='organizer_name' className="bg-gray-50 border outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Nama" required 
                      value={formData.organizer_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Domisili / Alamat</label>
                    <input type="text" name='event_date' placeholder='Tempat Tinggal' className="bg-gray-50 border text-gray-900 outline-none text-sm rounded-lg block w-full p-2.5 "  
                      value={formData.event_date}
                      onChange={handleChange}
                    />
                  </div>  
                  <div>
                    <label htmlFor="total_prizepool" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No Handphone</label>
                    <input type="text"  id="total_prizepool" name='total_prizepool' className="bg-gray-50 border outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Nomor Handphone" required 
                      value={formData.total_prizepool}
                      onChange={handleChange}
                    />
                  </div>
              
                </div>
                <button type='submit' disabled={isSubmitting} className='w-full lg:transition-all lg:hover:bg-black lg:float-right bg-[#ff0000] cursor-pointer p-2 text-white rounded-md text-center'>
                  <input type="submit" className="cursor-pointer w-full" value={loading ? "Submitting..." : "Submit"}/>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
