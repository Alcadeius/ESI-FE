/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState,useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { LoadingSpinner } from "../loading-spinner"
import Swal from 'sweetalert2'
import Cookies from "js-cookie"
import LoadingScreen from "../loading-screen"
// Schema untuk validasi form
const FormSchema = z.object({
    email: z.string().email().min(2, { message: "Email tidak boleh kosong." }),
    password: z.string().min(8, { message: "Kata sandi tidak boleh kurang dari 8 karakter" }),
    confirm_password: z.string().min(8, { message: "Kata sandi tidak boleh kurang dari 8 karakter" }),
  }).refine((data) => data.password === data.confirm_password, {
    message: "Password tidak cocok",
    path: ["confirm_password"],
  });
  
  export function ResetForm({
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
  
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        email: "",
        password: "",
        confirm_password: "",
      },
    });
  
    // Ambil token dan email dari URL
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = urlParams.get("token");
      const emailFromUrl = urlParams.get("email");
  
      if (tokenFromUrl && emailFromUrl) {
        setToken(tokenFromUrl);  // Set token
        setEmail(emailFromUrl);   // Set email
        form.setValue("email", emailFromUrl);  // Set email di form
      } else {
        Swal.fire({
          title: "Error!",
          text: "Link reset password tidak valid.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }, [form]);
  
    // Fungsi untuk mengirimkan request reset password
    function onSubmit(data: z.infer<typeof FormSchema>) {
      setIsLoading(true);
      // Kirim request ke API untuk reset password
      axios
        .post(process.env.NEXT_PUBLIC_API_URL + "/reset-password", {
          token: token, // Token dari URL
          email: data.email, // Email dari form
          password: data.password, // Password baru
          password_confirmation: data.confirm_password, // Konfirmasi password
        })
        .then(() => {
          router.push("/login");
          Swal.fire({
            title: "Berhasil!",
            text: "Password berhasil direset. Silakan login.",
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: "Terjadi kesalahan pada server. Silahkan tunggu beberapa saat dan coba lagi.",
            icon: "error",
            confirmButtonText: "OK",
          });
          setIsLoading(false);
        });
    }
  const [pageLoading, setPageLoading] = React.useState(true)
  React.useEffect(() => {
    if (Cookies.get("authToken")) {
      router.push("/main")
    } else {
      setPageLoading(false)
    }
  }, [router])
  if(pageLoading) return <LoadingScreen />
  return (
    <div className="w-full lg:px-3 lg:col-span-2 xl:col-span-1 dark z-10">
      <Card className="bg-transparent border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-5xl text-white text-left">Reset <br /> Password</CardTitle>
          <CardDescription className="text-left text-white"> Silahkan Ubah Informasi Akun kalian </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid items-center gap-6">
                <div className="grid xl:grid-cols-1 lg:grid-cols-2 gap-2">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input className="bg-white text-black" autoComplete="email webauthn" type="email" placeholder="Ketikan alamat email" {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input className="bg-white text-black" autoComplete="current-password webauthn" type="password" placeholder="Ketikan kata sandi" {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="confirm_password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Konfirmasi Password</FormLabel>
                          <FormControl>
                            <Input className="bg-white text-black" autoComplete="current-password webauthn" type="password" placeholder="Ketikan ulang kata sandi" {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-red-600 text-white font-semibold lg:col-span-2 xl:col-span-1 hover:text-red-600 mt-4">
                    Reset {isLoading ? <LoadingSpinner className="size-4 text-white" /> : ""}
                  </Button>
                </div>
                
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        Developed by <a href="mailto:teamgardevelopment@gmail.com">GARDEV TEAM</a> @ 2025
      </div>
    </div>
  )
}
