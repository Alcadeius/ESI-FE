"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Checkbox } from "@/components/ui/checkbox"

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Register Data:', formData);
      };

  return (
      <div className='bg-black h-[122vh] lg:h-[150vh] my-auto text-white'>
    {/* Header */}
          <header className="flex justify-between items-center px-4 py-2 h-32">
            <Image src="/images/logo.png" alt='logo' width={100} height={100} sizes="100vw" className='lg:order-last'
          style={{
              width: '10%',
              height: 'auto',
              maxWidth:'100px',
            }}/>
            <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6 lg:hidden">
      <path fillRule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
    </svg>
    </button>
    </header>
    {/* Hero */}
    <section className="flex px-5 my-1 lg:my-[15vh] lg:px-0 flex-col h-[50vh] min-h-[80vh] lg:grid lg:gap-3 lg:grid-cols-12 2xl:items-start 2xl:content-start sm:text-center bg-[url('/images/DSCF4041-3.png')] sm:bg-cover bg-contain sm:max-h-[90vh] bg-no-repeat bg-center  sm:h-[70vh] lg:bg-none">
      <div className='col-span-4 lg:px-5 2xl:my-[20vh] my-auto'>
        <h1 className='uppercase text-3xl 2xl:text-5xl font-bold my-2'>Halo,<br /> Nak Kodya!</h1>
        <h4 className='uppercase text-xs 2xl:text-xl font-semibold '>selamat datang para aTlet dan komunitas! selesaikan login atau registrasi terlebih dahulu!</h4>
    <form onSubmit={handleSubmit} className="max-w-lg 2xl:max-w-xl w-full sm:mx-auto my-5 col-span-2">
      <div className="relative my-5">
        <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-6">
      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
    </svg>
    </div>
    <input type="text" id="email-address-icon" className="bg-white outline-none text-black text-sm rounded-lg 2xl:text-lg block w-full ps-10 2xl:ps-12 p-2.5 2xl:p-5" placeholder="USERNAME"
    value={formData.username}
    onChange={handleChange}
    />
  </div>
  <div className="relative my-5">
        <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-6">
  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
</svg>

    </div>
    <input type="text" id="email-address-icon" className="bg-white outline-none text-black text-sm rounded-lg 2xl:text-lg block w-full ps-10 2xl:ps-12 p-2.5 2xl:p-5" placeholder="EMAIL"
    value={formData.email}
    onChange={handleChange}
    />
  </div>
  <div className="relative my-5">
    <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-6">
  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
</svg>
    </div>
    <input type="password" id="email-address-icon" className="bg-white outline-none text-black text-sm rounded-lg 2xl:text-lg block w-full ps-10 2xl:ps-12 p-2.5 2xl:p-5 " placeholder="PASSWORD"
    value={formData.password}
    onChange={handleChange} />
  </div>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-6">
  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
</svg>
    </div>
    <input type="password" id="email-address-icon" className="bg-white outline-none text-black text-sm rounded-lg 2xl:text-lg block w-full ps-10 2xl:ps-12 p-2.5 2xl:p-5 " placeholder="RE-PASSWORD"
    value={formData.password}
    onChange={handleChange} />
  </div>
    <div className='flex justify-between py-5'>
      <div className='flex'>
    <Checkbox /> <span className='text-xs 2xl:text-xl mx-2'>Remember Me</span>
      </div>
      <div className='flex'>
    <a href="#" className='underline underline-offset-4 uppercase text-[0.5rem] sm:text-xs 2xl:text-lg'>Forget Your Password?</a>
      </div>
    </div>
    <div className='bg-[#E8462D] text-center font-extrabold 2xl:text-3xl my-5 mx-3 p-2'>
      <input type="submit" value="Register" />
    </div>
    <div className='mx-3'>
      <p className='text-xs 2xl:text-lg font-light uppercase'>Sudah Memiliki akun? <a href='/login' className='uppercase'>Klik Disini</a></p>
    </div>
</form>
</div>  
   <div className='col-span-8 hidden lg:grid'>
   <Image alt='' src="/images/DSCF4041-3.png" width={700} height={700} className='h-[80vh] 2xl:h-[90vh] object-cover w-[100vw]'/>
   </div>
    </section>
    <footer className="text-center py-4 uppercase hidden lg:inline opacity-65 text-xs  lg:absolute lg:left-[40%] lg:translate-x-[10%] lg:-bottom-[50vh] 2xl:text-2xl bg-transparent">
        <p>2024&copy;Copyright GardevTeam</p>
      </footer>
   </div>
  );
}
