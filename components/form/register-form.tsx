"use client"

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

const FormSchema = z.object({
  username: z.string().min(2, { message: "Username tidak boleh kosong." }),
  email: z.string().email().min(2, { message: "Email tidak boleh kosong." }),
  password: z.string().min(8, { message: "Kata sandi tidak boleh kurang dari 8 karakter" }),
  confirm_password: z.string().min(8, { message: "Kata sandi tidak boleh kurang dari 8 karakter" }),
  remember_token: z.boolean(),
  role_id: z.number()
}).refine((data) => data.password === data.confirm_password, {
  message: "Password tidak cocok",
  path: ["confirm_password"],
});

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      role_id: 2,
      remember_token: true
    },
  })
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    axios.post("https://esi.bagoesesport.com/api/v1/register", data, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(() => {
        router.push('/login')
        Swal.fire({
          title: 'Berhasil!',
          text: 'Registrasi berhasil. Silahkan login untuk melanjutkan.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      })
      .catch(function (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Terjadi kesalahan pada server. Silahkan tunggu beberapa saat dan coba kembali.',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        console.error(error)
        setIsLoading(false)
      })
  }
  return (
    <div className="w-full lg:px-16 dark z-10">
      <Card className="bg-transparent border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-5xl text-white text-left">HALO <br /> NAK KODYA!</CardTitle>
          <CardDescription className="text-left text-white"> Selamat datang para atlet dan komunitas!
            selesaikan login atau registrasi terlebih dahulu! </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input className="bg-white text-black" autoComplete="username webauthn" type="text" placeholder="Ketikan username" {...field} />
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
                  <Button type="submit" className="w-full bg-red-600 text-white font-semibold hover:text-red-600 mt-4">
                    Login {isLoading ? <LoadingSpinner className="size-4" /> : ""}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Sudah memiliki akun? {" "}
                  <button type="button" onClick={() => router.replace('/login')} className="underline underline-offset-4">
                    Register
                  </button>
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
