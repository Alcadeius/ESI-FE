"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Checkbox } from "@/components/ui/checkbox";
import Logo from "../logo";
import { useRouter } from 'next/navigation'; 
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isClient, setIsClient] = useState(false); 
  const router = useRouter(); 

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    try {
      const response = await axios.post("/api/v1/register", {
        role_id: 2, 
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      
      if (response.status === 201 && isClient) { 
        router.push("/login"); 
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (e) {
      
      if (e.response && e.response.data && e.response.data.message) {
        setErrorMessage(e.response.data.message); 
      } else {
        setErrorMessage('Terjadi kesalahan, coba lagi nanti!'); 
      }
    }
  };
  if (!isClient) return null;

  return (
    <div className='bg-black h-[125vh] lg:h-[100vh] xl:h-[100vh] lg:overflow-hidden text-white'>
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-2 h-32">
        <Logo className="md:h-fit md:w-fit xl:h-20 xl:w-20 lg:w-16 lg:h-16 2xl:w-32 2xl:h-32 lg:order-last"/>
        <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6 lg:hidden">
          <path fillRule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
        </svg></button>
      </header>
      {/* Hero */}
      <section className="flex h-screen px-5 my-1 xl:h-screen lg:px-0 flex-col min-h-[80vh] lg:grid lg:gap-3 lg:grid-cols-12 2xl:items-start 2xl:content-start sm:text-center bg-[url('/images/DSCF4041-3.png')] sm:bg-cover bg-contain sm:max-h-[90vh] xl:max-h-[80vh] 2xl:max-h-[85vh] bg-no-repeat bg-center sm:h-[70vh] lg:bg-none">
        <div className='col-span-4 grid content-center items-center object-center place-items-center lg:h-screen xl:h-full 2xl:h-fit lg:col-span-5 xl:col-span-4 lg:mt-[-14vh] xl:mt-0 xl:my-0 lg:px-5 2xl:my-[20vh] my-auto'>
          <form onSubmit={handleSubmit} className="max-w-lg 2xl:max-w-xl w-full sm:mx-auto my-5 lg:my-auto col-span-2">
            <h1 className='uppercase text-3xl lg:text-2xl 2xl:text-5xl font-bold my-2'>Halo,<br /> Nak Kodya!</h1>
            <h4 className='uppercase text-xs 2xl:text-xl font-semibold '>selamat datang para aTlet dan komunitas! selesaikan login atau registrasi terlebih dahulu!</h4>

            {/* Error message */}
            {errorMessage && <div className="text-red-500 text-sm my-3">{errorMessage}</div>}

            <div className="relative my-5">
              <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-7">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
              </div>
              <input type="text" id="email-address-icon" className="bg-white outline-none text-black text-sm rounded-lg 2xl:text-lg block w-full ps-10 2xl:ps-12 p-2.5 lg:ps-10 lg:p-1.5 xl:p-2.5 xl:ps-10 2xl:p-5" placeholder="USERNAME"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="relative my-5">
              <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-7">
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              </div>
              <input type="text" id="email-address-icon" className="bg-white outline-none text-black text-sm rounded-lg 2xl:text-lg block w-full ps-10 2xl:ps-12 p-2.5 2xl:p-5 lg:ps-10 lg:p-1.5 xl:p-2.5 xl:ps-10" placeholder="EMAIL"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
  <div className="relative my-5">
    <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-7">
  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
</svg>
    </div>
    <input type="password" id="email-address-icon" className="bg-white outline-none text-black text-sm rounded-lg 2xl:text-lg block w-full ps-10 2xl:ps-12 p-2.5 2xl:p-5 lg:ps-10 lg:p-1.5 xl:p-2.5 xl:ps-10" placeholder="PASSWORD"
    name="password"
    value={formData.password}
    onChange={handleChange} 
    />
  </div>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-7">
  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
</svg>
    </div>
    <input type="password" id="email-address-icon" className="bg-white outline-none text-black text-sm rounded-lg 2xl:text-lg block w-full ps-10 2xl:ps-12 p-2.5 2xl:p-5 lg:ps-10 lg:p-1.5 xl:p-2.5 xl:ps-10" placeholder="RE-PASSWORD"
    name="confirmPassword"
    value={formData.confirmPassword}
    onChange={handleChange}
    />
  </div>
    <div className='flex justify-between py-5'>
      <div className='flex'>
    <Checkbox /> <span className='text-xs 2xl:text-xl mx-2'>Remember Me</span>
      </div>
      <div className='flex'>
    <a href="#" className='underline underline-offset-4 uppercase text-[0.5rem] sm:text-xs 2xl:text-lg'>Forget Your Password?</a>
      </div>
    </div>
    <div className='bg-[#E8462D] text-center lg:my-1 xl:my-5 font-extrabold 2xl:text-3xl my-5 mx-3 p-2'>
      <input type="submit" value="Register" />
    </div>
    <div className='mx-3'>
      <p className='text-xs 2xl:text-lg font-light uppercase'>Sudah Memiliki akun? <a href='/login' className='uppercase'>Klik Disini</a></p>
    </div>
</form>
</div>  
   <div className='col-span-8 lg:col-span-7 xl:col-span-8 hidden lg:grid'>
   <Image alt='' src="/images/DSCF4041-3.png" width={700} height={700} className='h-[80vh] lg:h-[75vh] xl:h-[80vh] 2xl:h-[90vh] object-cover w-[100vw]'/>
   </div>
    </section>
    <footer className="text-center py-4 uppercase hidden lg:inline opacity-65 text-xs xl:text-base 2xl:text-2xl bg-transparent">
        <p className='lg:mt-[-8vh] xl:mt-[-5vh] 2xl:-mt-0'>2024&copy;Copyright GardevTeam</p>
      </footer>
   </div>
  );
}
