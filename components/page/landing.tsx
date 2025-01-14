import Image from 'next/image';

export default function landing() {
  return (
    <div className="bg-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-2 bg-white h-32">
        <Image src="/images/logo.png" alt='logo' width={50} height={50} />
        <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
  <path fillRule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
</svg>
</button>
      </header>
      <div className="flex justify-between items-center px-4 bg-white">
        <a href="#" className="text-black text-xs">BELUM PUNYA AKUN ESI DENPASAR?</a>
        <button className="text-white text-xs px-4 py-2 rounded-full bg-[#FF0000]">Masuk/Daftar</button>
      </div>

      {/* Hero Section */}
      <section className="py-10 px-4 flex flex-col bg-white">
        <h4 className="text-white bg-[#FF0000] w-fit text-sm mb-5">ESPORT DENPASAR</h4>
        <h2 className="text-xl font-bold text-[#FF0000]">ESPORTS DENPASAR TANTANGAN DAN KEMENANGAN</h2>
      </section>
        <section className="flex flex-col text-center items-center bg-contain bg-no-repeat bg-center bg-[url('/images/DSCF4041-1.png')]">
            <Image src="/images/logo.png" alt='logo' width={70} height={70} className='py-5' />
          <h1 className="font-semibold">EVENT ESI DENPASAR</h1>
        <p className=" text-white/80 text-xs px-4 py-4">Sebagai platform bagi siswa/komunitas/atlet untuk mengembangkan hobi, bakat, dan minat mereka di bidang esports melalui kegiatan ekstrakurikuler.</p>
        </section>
      {/* Gallery */}
      <section className="px-16 py-8 grid grid-cols-4  lg:grid-cols-3 gap-4 content-center">
        <div className='col-span-2'>
        <Image src="/images/DSC09344-1.png" alt="Event 1" width={300} height={200} className="rounded w-full h-auto object-cover" />

        </div>
        <div className='col-span-2'>
        <Image src="/images/DSC09242-1.png" alt="Event 2" width={300} height={200} className="rounded w-full h-auto object-cover" />

        </div>
        <div className='col-span-1'>

        <Image src="/images/DSC09241-1.png" alt="Event 3" width={600} height={400} className="rounded w-full h-auto object-cover " />
        </div>
        <div className="content-center col-span-3">
        <Image src="/images/DSC05243-1.png" alt="Event 4" width={300} height={200} className="rounded w-full h-auto object-fill " />
        </div>
      </section>
      <section className='grid grid-cols-3 px-14 content-center'>
      <div>
      <Image src="/images/ml.png" alt='ml' width={50} height={50} className="w-full h-auto object-cover "/>

      </div>
      <div>
      <Image src="/images/pubg.png" alt='pubg' width={100} height={100} className="w-full h-auto object-cover "/>

      </div>
      <div>
      <Image src="/images/ff.png" alt='ff' width={100} height={100} className="w-full h-auto object-cover "/>

      </div>
      </section>
      
      <section className='text-center justify-center text-sm flex my-[20%]'>
        <div className=' bg-[#FF0000] rounded-sm flex p-1'>
        <a href='#' className='uppercase rounded-md '>Lihat Recap Event Lainnya</a>
        <span className='mx-1'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
  <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
</svg>
</span>
        </div>
        
      </section>
      {/* Footer */}
      <footer className="text-center py-4 uppercase opacity-65 text-xs bg-black">
        <p>2024&copy;Copyright GardevTeam</p>
      </footer>
    </div>
  );
}
