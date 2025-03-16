"use client";
import { useState } from "react";
import axiosInstance from "@/lib/axios";
import NavigationBar from "../navigation-bar";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";
interface AthleteFormData {
  school_name: string;
  full_name: string;
  domicile: string;
  phone_number: string;
}

export default function AthleteSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<AthleteFormData>({
    school_name: "",
    full_name: "",
    domicile: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
    setIsSubmitting(true);

    try {
      const token = Cookies.get("authToken");
      const response = await axiosInstance.post(
        "/api/v1/athlete",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Pendaftaran Berhasil!",
          text: "Atlet telah berhasil didaftarkan.",
          confirmButtonText: "OK",
        }).then(() => {
          router.push("/main");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mendaftarkan Atlet",
          text: "Terjadi kesalahan saat pendaftaran.",
        });
        setErrorMessage(response.data.message);
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.data?.message) { 
        setErrorMessage(e.response.data.message);
      } else {
        setErrorMessage("Terjadi kesalahan, coba lagi nanti!");
      }
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 h-full w-full p-10">
      <NavigationBar />
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h1 className="text-blue-500 text-xl font-bold mb-4">Form Pendaftaran Atlet</h1>
        <p className="text-gray-600 text-sm mb-6">Silakan isi formulir di bawah untuk mendaftarkan atlet.</p>
        {errorMessage && <p className="text-red-500 text-xs text-center mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="school_name" className="block text-sm font-medium text-gray-700">
              Nama Sekolah / Instansi
            </label>
            <input
              type="text"
              id="school_name"
              name="school_name"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Nama Sekolah"
              required
              value={formData.school_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Nama Lengkap"
              required
              value={formData.full_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="domicile" className="block text-sm font-medium text-gray-700">
              Domisili / Alamat
            </label>
            <input
              type="text"
              id="domicile"
              name="domicile"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Alamat"
              required
              value={formData.domicile}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
              No Handphone
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Nomor Handphone"
              required
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 text-white p-2 rounded-md"
          >
            {loading ? "Mendaftarkan..." : "Daftar Sekarang"}
          </button>
        </form>
      </div>
    </div>
  );
}
