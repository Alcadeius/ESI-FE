/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import NavigationBar from "../navigation-bar";
import useSWR from 'swr';
import axios from 'axios';
import { useState } from 'react';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Leaderboard() {
    const { data, error } = useSWR('https://esi.bagoesesport.com/api/v1/leaderboard', fetcher);
    const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

    if (error) return <div>Gagal memuat data</div>;
    if (!data) return <div>Memuat...</div>;
  
    const leaderboardData = data.data;
    const games = Object.values(leaderboardData).map((game: any) => ({
      id: game.game_id,
      name: game.game_name,
    }));
  
     // Game yang dipilih (default ke game pertama jika belum ada pilihan)
    const selectedGame = leaderboardData[selectedGameId!] || leaderboardData[Object.keys(leaderboardData)[0]];
    const players = selectedGame ? Object.values(selectedGame.leaderboard) : [];

    
    return (
        <div className="grid grid-cols-1 h-full bg-black">
            <div className='lg:px-20 lg:pt-14'>
            <NavigationBar />
            </div>
            <div className="hidden font-supertall lg:flex h-screen justify-center before:absolute before:w-full before:bg-black/40 before:h-full before:content-['a'] bg-center bg-[url('/images/DSCF4041-2.png')] bg-cover bg-no-repeat">
                <h1 className="[text-shadow:_0px_5px_16px_#838383] relative z-10 uppercase text-white my-auto font-extrabold text-center text-8xl">Hall Of Fame</h1>
            </div>
            <div className="h-full lg:h-screen bg-[url('/images/DSCF4041-4.png')] font-supertall bg-center lg:px-5 lg:py-5 before:top-0 before:left-0 bg-cover before:z-0 bg-no-repeat before:content-['a'] before:w-full before:opacity-40 before:h-full before:bg-gradient-to-b before:absolute before:from-black before:to-blue-800/25">
                <div className="grid grid-cols-1 gap-4 mt-5 relative z-10">
                    <div className="grid grid-cols-1 w-full place-items-center gap-5 mb-5">
                        <h1 className="[text-shadow:_0px_5px_16px_#838383] uppercase text-white font-extrabold text-center text-3xl lg:hidden">Hall Of Fame</h1>
                        <p className="p-2 bg-white text-[#ff0000] text-xl rounded-md  font-bold text-center w-fit relative z-10 lg:text-2xl"># Popular E-sport Games</p>
                    </div>
                    <div className="grid w-full lg:grid-cols-2 lg:px-16 px-5 gap-5">
                        <div className="bg-[url('/images/ml1.png')] md:bg-center  w-full h-full lg:h-[400px] lg:max-h-[200px]  bg-cover grid place-items-center bg-no-repeat px-5 py-5 rounded-md overflow-hidden">
                            <p className="text-center text-xl font-semibold text-white  before:w-full before:content-['']  before:left-0 before:h-[20%] before:mt-[-7.5vh] before:rounded-md before:blur-3xl before:opacity-40 before:z-0 before:bg-black before:absolute uppercase my-5 lg:my-10"><span className="relative z-10">Mobile Legends: Bang Bang</span></p>
                        </div>
                        <div className="bg-[url('/images/ff-1.png')] w-full  h-full bg-cover grid place-items-center bg-no-repeat px-5 py-5 rounded-md overflow-hidden">
                            <p className="text-center text-xl font-semibold text-white before:w-full before:content-['']  before:left-0 before:h-[20%] before:mt-[-7.5vh] before:rounded-md before:blur-3xl before:opacity-40 before:z-0 before:bg-black before:absolute uppercase my-5 lg:my-10 "><span className="relative z-10">Free Fire</span></p>
                        </div>
                        <div className="bg-[url('/images/lokapala.png')] w-full  h-full bg-cover lg:h-[400px] lg:max-h-[180px] grid place-items-center bg-no-repeat px-5 py-5 rounded-md overflow-hidden">
                            <p className="text-center text-xl font-semibold text-white before:w-full before:content-['']  before:left-0 before:h-[20%] before:mt-[-7.5vh] before:rounded-md before:blur-3xl before:opacity-40 before:z-0 before:bg-black before:absolute uppercase my-5 lg:my-10"><span className="relative z-10">Lokapala</span></p>
                        </div>
                        <div className="bg-[url('/images/hok.png')] w-full h-full bg-cover grid place-items-center bg-no-repeat px-5 py-5 rounded-md overflow-hidden">
                            <p className="text-center text-xl font-semibold text-white before:w-full before:content-['']  before:left-0 before:h-[20%] before:mt-[-7.5vh] before:rounded-md before:blur-3xl before:opacity-40 before:z-0 before:bg-black before:absolute uppercase my-5 lg:my-10"><span className="relative z-10">Honor Of King</span></p>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
            {/* Tampilan Mobile - Tablet */}
            <div className="grid grid-cols-1 font-supertall lg:hidden relative z-10 px-5 py-5">
                <p className="p-2 rounded-md text-[#ff0000] bg-white lg:w-fit lg:h-fit lg:text-2xl font-bold text-center"># Esi Denpasar Top E-Sport Player</p>
                <p className="text-white text-lg py-5 font-semibold">Games List</p>
                <div className="grid grid-cols-2 gap-1">
                {games.map((game) => (
          <div
            key={game.id}
            className={`flex text-white items-center cursor-pointer ${
              selectedGameId === game.id ? ' text-red-600' : ''
            }`}
            onClick={() => setSelectedGameId(game.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
            </svg>
            <p className="text-xs uppercase md:text-base justify-center">{game.name}</p>
          </div>
        ))}
                </div>
                <div className="grid grid-cols-1 bg-black text-white font-semibold mt-5">
                <div className="text-lg">{selectedGame?.game_name || 'Pilih Game'}</div>
        <table className="uppercase font-extralight ">
          <thead>
            <tr>
              <th className="text-start text-sm md:text-base font-light">Rank</th>
              <th className="text-start text-sm md:text-base font-light">Nama Player</th>
              <th className="text-start text-sm md:text-base font-light">Points</th>
            </tr>
          </thead>
          <tbody className="text-sm md:text-base">
            {players
              .sort((a: any, b: any) => b.point - a.point)
              .map((player: any, index: number) => (
                <tr key={player.id_game}>
                  <td>#{index + 1}</td>
                  <td>{player.name}</td>
                  <td>{player.point} PTS</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
            </div>

            {/* Tampilan Destkop */}
            <div className="hidden lg:flex flex-col text-white h-screen px-5 py-5 text-2xl bg-[url('/images/DSCF4041-4.png')] bg-cover bg-no-repeat font-supertall">
                <div className="flex justify-center w-full ">
                    <p className="text-3xl p-2 uppercase bg-white rounded-md text-[#ff0000]"># ESI DENPASAR TOP E-SPORT PLAYER</p>
                </div>
                <div className="grid grid-cols-12 py-20 px-10 h-full my-auto">
      {/* Game List Section */}
      <div className="flex flex-col gap-2 justify-center w-full col-span-4">
        <p className="text-xl text-white">Games List</p>
        {games.map((game) => (
          <div
            key={game.id}
            className={`flex text-white items-center cursor-pointer ${
              selectedGameId === game.id ? ' text-red-600' : ''
            }`}
            onClick={() => setSelectedGameId(game.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
            </svg>
            <p className="text-xs uppercase md:text-base justify-center">{game.name}</p>
          </div>
        ))}
      </div>

      {/* Leaderboard Section */}
      <div className="flex flex-col justify-center col-span-8">
      <div className="text-xl">{selectedGame?.game_name || 'Pilih Game'}</div>
        <table className="uppercase font-extralight text-lg">
          <thead>
            <tr>
              <th className="text-start">Rank</th>
              <th className="text-start">Nama Player</th>
              <th className="text-start">Points</th>
            </tr>
          </thead>
          <tbody>
            {players
              .sort((a: any, b: any) => b.point - a.point)
              .map((player: any, index: number) => (
                <tr key={player.id_game}>
                  <td>#{index + 1}</td>
                  <td>{player.name}</td>
                  <td>{player.point} PTS</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
            </div>
            <footer className="p-4 bg-white sm:p-6 w-full overflow-hidden lg:p-5 relative bottom-0 left-0 ">
                <div className="mx-auto w-full">
                    <div className="md:flex md:justify-between">
                        <div className="mb-6 md:mb-0 w-fit justify-center items-center mx-auto">
                            <a href="https://flowbite.com" className="flex items-center">
                                <Image alt='' src="/images/logo.png" width={1000} height={1000} className='max-w-[20%] md:max-w-16 lg:max-w-32' />
                            </a>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3  xl:w-3/4">
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 ">Halaman</h2>
                                <ul className="text-gray-600 dark:text-gray-400">
                                    <li className="mb-4">
                                        <a href="/main" className="hover:underline">Beranda</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="/leaderboard" className="hover:underline">Papan Peringkat</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="" className="hover:underline">Riwayat Transaksi</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="" className="hover:underline">Keranjang</a>
                                    </li>
                                    <li>
                                        <a href="" className="hover:underline">Tentang Kami</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold ">Hubungi Kami</h2>
                                <ul className="text-gray-600 dark:text-gray-400">
                                    <li className="mb-4">
                                        <a href="#" className="hover:underline ">esi-denpasar@gmail.com</a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:underline">Instagram @esi-dps</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 ">Layanan Lainnya</h2>
                                <ul className="text-gray-600 dark:text-gray-400">
                                    <li className="mb-4">
                                        <a href="#" className="hover:underline">Pengajuan Organizer</a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:underline">Panduan Pengajar</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="text-sm text-gray-500 sm:text-center">2025©GAR Developers Team
                        </span>
                        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                            <a href="#" className="text-gray-500 hover:text-gray-900 ">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                            </a>
                            <a href="#" className="text-gray-500 hover:text-gray-900 ">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                            </a>
                            <a href="#" className="text-gray-500 hover:text-gray-900 ">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                            </a>

                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
