"use client"
// import { useState, useEffect } from "react";
import Logo from "../logo";
import { Button } from "../ui/button";
// import axios from "axios";

export default function Landing() {
  // const [userData, setUserData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // // Mengambil data user berdasarkan token
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const token = localStorage.getItem("authToken");
  //     if (!token) {
  //       setError("Token tidak ditemukan, harap login terlebih dahulu.");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const response = await axios.get(
  //         "https://esi.bagoesesport.com/api/v1/auth/user",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       console.log("Server Response:", response);
  //       if (response && response.data) {
  //         setUserData(response.data);
  //       } else {
  //         setError("Data user tidak ditemukan.");
  //       }
  //     } catch (err) {
  //       setError("Gagal mengambil data user.");
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // // Fungsi untuk logout
  // const handleLogout = () => {
  //   localStorage.removeItem("authToken"); // Menghapus token dari localStorage
  //   localStorage.removeItem("Data");
  //   window.location.href = "/login"; // Redirect ke halaman login
  // };

  return (
    <div className="bg-[url('/images/backdrop_esi.png')] w-screen h-screen bg-cover bg-center flex items-center">
      <div className="p-4 md:p-10 bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
        <div className="w-full h-full md:flex flex-col md:justify-between relative grid grid-row-2">
          <header className="flex items-end pb-4 md:pb-0 md:items-center md:justify-between justify-center">
            <Logo className="md:h-fit md:w-fit h-32 w-32" />
            <Button variant={"destructive"} className="text-2xl px-16 py-6 hidden md:flex">
              <a href="/login">Login</a>
            </Button>
          </header>
          <div className="space-y-4 pb-14">
            <div className="bg-destructive text-white px-8 py-2 rounded-sm w-fit md:m-0 mx-auto font-bold">
              ESPORT DENPASAR
            </div>
            <h1 id="title" className="text-3xl md:text-5xl font-bold text-white uppercase">
              eSports Denpasar: <br /> Tantangan dan Kemenangan
            </h1>
            <p className="text-white md:text-lg md:w-1/2 ps-1">
              Platform bagi siswa, komunitas, atlet untuk mengembangkan hobi, bakat, dan minat mereka di bidang Esports melalui kegiatan ekstrakurikuler.
            </p>
            <a href="#" className="text-white text-lg flex items-center gap-2 ps-1 underline">
              Informasi lebih lanjut
            </a>
          </div>

          {/* Menampilkan data user jika berhasil diambil
          <div className="text-white text-center mt-10">
            {loading ? (
              <p>Loading user data...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              userData && (
                <div>
                  <h2 className="text-xl font-bold">Welcome, {userData.data.username}!</h2>
                  <p>Email: {userData.data.email}</p>
                </div>
              )
            )}
          </div> */}

          {/* Tombol Logout
          {userData && (
            <div className="text-center mt-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )} */}

          <footer className="absolute bottom-0 right-0 left-0 md:left-1 text-center text-white">
            2025 @ GAR Developers Team
          </footer>
        </div>
      </div>
    </div>
  );
}
