"use client";
import { useState, useEffect } from "react";
import Logo from '../ui/logo-2';
import axios from "axios";
import Pagin from '../ui/pagein';
import Dropdown from '../dropdown';

export default function Leaderboard() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                setError("Token tidak ditemukan, harap login terlebih dahulu.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    "https://esi.bagoesesport.com/api/v1/auth/user",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("Server Response:", response);
                if (response && response.data) {
                    setUserData(response.data);
                } else {
                    setError("Data user tidak ditemukan.");
                }
            } catch (err) {
                setError("Gagal mengambil data user.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="grid grid-cols-1 h-full bg-black">
            <header className='flex xl:px-16 xl:py-16 2xl:px-32 2xl:py-24 relative z-10 bg-black w-full lg:grid lg:grid-cols-4 lg:shadow-none 2xl:text-4xl shadow-md shadow-gray-500/50 justify-between items-center content-center place-content-center lg:place-items-center px-3 py-5 text-white'>
                <div className='hidden lg:flex h-full place-content-start items-center col-span-3 w-full'>
                    <div className="mx-3">
                        <Logo className='h-10 w-10 md:h-20 md:w-20 lg:h-14 lg:w-14 2xl:w-24 2xl:h-24'/>
                    </div>
                    <div className="mx-3">
                        <a className='underline underline-offset-4 lg:no-underline'>Beranda</a>
                    </div>
                    <div className="mx-3">
                        <a href='/leaderboard' className=''>Papan Peringkat</a>
                    </div>
                    <div className="mx-3">
                        <a href='/order' className=''>Keranjang</a>
                    </div>
                    <div className="mx-3">
                        <a className=''>Bantuan</a>
                    </div>
                </div>
                <div className="lg:hidden">
                    <Logo className='h-10 w-10 md:h-12 md:w-12 lg:w-14 lg:h-14'/>
                </div>
                <div className='lg:hidden'>
                    <a className='underline underline-offset-4 lg:no-underline'>Leaderboard</a>
                </div>
                <div className="hidden lg:flex justify-end w-full items-center">
                    {loading ? (
                        <p>Loading user data...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        userData && (
                            <div>
                                <h2 className="mx-3">{userData.data.email}</h2>
                            </div>
                        )
                    )}
                    <div className="rounded-full text-black">
                        <Dropdown/>
                    </div>
                </div>
                <div className="h-fit flex items-center">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6 md:size-8 items-center my-auto align-middle lg:hidden">
                            <path fillRule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </header>
            <div className="hidden lg:flex h-screen justify-center before:absolute before:w-full before:bg-black/40 before:h-full before:content-['a'] bg-center bg-[url('/images/DSCF4041-2.png')] bg-cover bg-no-repeat">
            <h1 className="[text-shadow:_0px_5px_16px_#838383] relative z-10 uppercase text-white my-auto font-extrabold text-center text-5xl 2xl:text-8xl">Hall Of Fame</h1>
            </div>
            <div className="h-full lg:h-screen bg-[url('/images/DSCF4041-4.png')] bg-center lg:px-5 lg:py-5 before:top-0 before:left-0 bg-cover before:z-0 bg-no-repeat before:content-['a'] before:w-full before:opacity-40 before:h-full before:bg-gradient-to-b before:absolute before:from-black before:to-blue-800/25">
            <div className="grid grid-cols-1 gap-4 mt-5 relative z-10">
            <div className="grid grid-cols-1 w-full place-items-center gap-5 mb-5 2xl:py-10">
                <h1 className="[text-shadow:_0px_5px_16px_#838383] uppercase text-white font-extrabold text-center text-3xl lg:hidden">Hall Of Fame</h1>
                <p className="p-2 bg-white text-[#ff0000] text-xl rounded-md 2xl:rounded-xl font-bold text-center w-fit relative z-10 2xl:text-7xl"># Popular E-sport Games</p>
            </div>
            <div className="grid w-full lg:grid-cols-2 px-5 gap-5">
            <div className="bg-[url('/images/ml1.png')] md:bg-center  w-full  h-full bg-cover grid place-items-center bg-no-repeat px-5 py-5 rounded-md overflow-hidden">
            <p className="text-center text-xl font-semibold text-white  before:w-full before:content-[''] before:left-0 before:h-[20%] before:mt-[-7.5vh] before:rounded-md before:blur-3xl before:opacity-40 before:z-0 before:bg-black before:absolute uppercase my-5 lg:my-10 2xl:my-40"><span className="relative z-10 2xl:text-4xl">Mobile Legends: Bang Bang</span></p>
            </div>
            <div className="bg-[url('/images/ff-1.png')] w-full  h-full bg-cover grid place-items-center bg-no-repeat px-5 py-5 rounded-md overflow-hidden">
            <p className="text-center text-xl font-semibold text-white before:w-full before:content-[''] before:left-0 before:h-[20%] before:mt-[-7.5vh] before:rounded-md before:blur-3xl before:opacity-40 before:z-0 before:bg-black before:absolute uppercase my-5 lg:my-10 2xl:my-40"><span className="relative z-10 2xl:text-4xl">Free Fire</span></p>
            </div>
            <div className="bg-[url('/images/lokapala.png')] w-full  h-full bg-cover grid place-items-center bg-no-repeat px-5 py-5 rounded-md overflow-hidden">
            <p className="text-center text-xl font-semibold text-white before:w-full before:content-[''] before:left-0 before:h-[20%] before:mt-[-7.5vh] before:rounded-md before:blur-3xl before:opacity-40 before:z-0 before:bg-black before:absolute uppercase my-5 lg:my-10 2xl:my-40"><span className="relative z-10 2xl:text-4xl">Lokapala</span></p>
            </div>
            <div className="bg-[url('/images/hok.png')] w-full h-full bg-cover grid place-items-center bg-no-repeat px-5 py-5 rounded-md overflow-hidden">
            <p className="text-center text-xl font-semibold text-white before:w-full before:content-[''] before:left-0 before:h-[20%] before:mt-[-7.5vh] before:rounded-md before:blur-3xl before:opacity-40 before:z-0 before:bg-black before:absolute uppercase my-5 lg:my-10 2xl:my-40"><span className="relative z-10 2xl:text-4xl">Honor Of King</span></p>
            </div>
            </div>
            </div>
            <div>
            </div>
            </div>
        {/* Tampilan Mobile - Tablet */}
        <div className="grid grid-cols-1 lg:hidden relative z-10 px-5 py-5">
        <p className="p-2 rounded-md text-[#ff0000] bg-white lg:w-fit lg:h-fit lg:text-2xl font-bold text-center"># Esi Denpasar Top E-Sport Player</p>
        <p className="text-white text-lg py-5 font-semibold md:text-xl">Games List</p>
        <div className="grid grid-cols-2 gap-1">
        <div className="flex text-white items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
        </svg>
        <p className="text-xs uppercase font-semibold  md:text-base">Mobile Legend</p>
        </div>
        <div className="flex text-white items-center md:justify-end ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
        </svg>
        <p className="text-xs uppercase font-semibold md:text-base">Mobile Legend</p>
        </div>
        <div className="flex text-white items-center ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
        </svg>
        <p className="text-xs uppercase font-semibold md:text-base">Mobile Legend</p>
        </div>
        <div className="flex text-white md:justify-end items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
        </svg>
        <p className="text-xs uppercase font-semibold md:text-base md:text-end">Mobile Legend</p>
        </div>
        </div>
        <div className="grid grid-cols-1 bg-black text-white font-semibold mt-5">
        <p className="uppercase md:text-xl">Mobile Legends: Bang Bang</p>
        <div className="flex flex-col items-center h-40 overflow-hidden">
        <div className="flex justify-between w-full text-sm">
        <p className="md:text-lg">#1</p>
        <p className="md:text-lg">I Gede Reyna Febrian</p>
        <p className="md:text-lg">1000 PTS</p>
        </div>
        </div>
        <div className="px-5">
        <Pagin/>
        </div>
        </div>
        </div>
        
        {/* Tampilan Destkop */}
        <div className="hidden lg:flex flex-col 2xl:my-auto text-white h-screen px-5 py-5 2xl:py-20 bg-[url('/images/DSCF4041-4.png')] bg-cover bg-no-repeat">
        <div className="flex justify-center w-full ">
            <p className="text-xl p-2 uppercase font-bold bg-white rounded-md text-[#ff0000] 2xl:text-7xl 2xl:rounded-xl"># ESI DENPASAR TOP E-SPORT PLAYER</p>
        </div>
        <div className="grid grid-cols-12 py-20 px-10 2xl:text-2xl h-full my-auto">
        <div className="flex flex-col justify-center w-full col-span-4">
        <p className="text-lg font-bold text-white 2xl:text-4xl">Games List</p>
        <div className="flex text-white items-center ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
        </svg>
        <p className="text-xs uppercase font-semibold md:text-base justify-center 2xl:text-xl">Mobile Legend</p>
        </div>
        
        </div>
        <div className="flex flex-col justify-center col-span-8">
        <div className="text-lg font-bold 2xl:text-4xl">
            Mobile Legends: Bang Bang
        </div>
        <table className="uppercase font-bold">
        <th className="text-start">Rank</th>
        <th className="text-start">Nama Player</th>
        <th className="text-start">Points</th>
        <tr>
            <td>#1</td>
            <td>I Gede Reyna Febrian</td>
            <td>1000 PTS</td>
        </tr>
        <tr>
            <td>#2</td>
            <td>I Gede Reyna Febrian</td>
            <td>1000 PTS</td>
        </tr>
        <tr>
            <td>#1</td>
            <td>I Gede Reyna Febrian</td>
            <td>1000 PTS</td>
        </tr>
        <tr>
            <td>#2</td>
            <td>I Gede Reyna Febrian</td>
            <td>1000 PTS</td>
        </tr>
        </table>
        </div>
        </div>
        <Pagin/>
        </div>
        </div>
    );
}
