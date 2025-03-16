"use client";
import { useState } from 'react';
import axios from 'axios';
import NavigationBar from '../navigation-bar';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import axiosInstance from '@/lib/axios';

interface FormData {
  school_name: string;
  domicile: string;
  full_name: string;
  phone_number: string;
}

export default function EventSubmit() {
  const [formData, setFormData] = useState<FormData>({
    school_name: '',
    domicile: '',
    full_name: '',
    phone_number: '',
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
    setErrorMessage(""); 
    setLoading(true);
  
    try {
      const response = await axiosInstance.post("/athlete", formData);
  
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Pendaftaran Berhasil!",
          text: "Akun terdaftar menjadi atlet.",
          confirmButtonText: "OK",
        }).then(() => {
          router.push("/main");
        });
      } else {
        throw new Error(response.data.message || "Terjadi Kesalahan Saat Melakukan Pengajuan");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "Terjadi kesalahan, coba lagi nanti!");
      } else {
        setErrorMessage("Terjadi kesalahan, coba lagi nanti!");
      }
    } finally {
      setLoading(false);
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
                    <label htmlFor="school_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Instansi / Sekolah</label>
                    <input type="text" id="school_name" name='school_name' className="bg-gray-50 border outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Nama Sekolah" required 
                      value={formData.school_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Lengkap</label>
                    <input type="text" id="full_name" name='full_name' className="bg-gray-50 border outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Nama" required 
                      value={formData.full_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Domisili / Alamat</label>
                    <input type="text" name='domicile' placeholder='Tempat Tinggal' className="bg-gray-50 border text-gray-900 outline-none text-sm rounded-lg block w-full p-2.5 "  
                      value={formData.domicile}
                      onChange={handleChange}
                    />
                  </div>  
                  <div>
                    <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No Handphone</label>
                    <input type="text"  id="phone_number" name='phone_number' className="bg-gray-50 border outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Nomor Handphone" required 
                      value={formData.phone_number}
                      onChange={handleChange}
                    />
                  </div>
              
                </div>
                <button type='submit' disabled={loading} className='w-full lg:transition-all lg:hover:bg-black lg:float-right bg-[#ff0000] cursor-pointer p-2 text-white rounded-md text-center'>
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