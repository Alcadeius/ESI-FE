"use client"

import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { LoadingSpinner } from "../loading-spinner"
import Swal from 'sweetalert2'
import { useUser } from "@/hooks/use-user"

const FormSchema = z.object({
  email: z.string().email().min(2, {
    message: "Email tidak boleh kosong.",
  }),
  password: z.string().min(8, {
    message: "Kata sandi tidak boleh kurang dari 8 karakter.",
  }),
  remember_token: z.boolean()
})

export function LoginForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const { setUserData } = useUser()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember_token: true
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    setIsSubmitting(true)
    axios.post(process.env.NEXT_PUBLIC_API_URL + "/login", data)
      .then(function (response) {
        Cookies.set("authToken", response.data.meta.token, { expires: 7, secure: true });
        localStorage.removeItem("alertPopup");
        setUserData(response?.data?.data)
        router.back();
      })
      .catch(function (error) {
        setIsLoading(false)
        setIsSubmitting(false)
        if (error.response.status === 401) {
          Swal.fire({
            title: 'Gagal Masuk!',
            text: 'Email atau password salah',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Terjadi kesalahan. Silahkan tunggu beberapa saat dan coba kembali.',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      })
  }

  return (
    <div className="w-full lg:px-3 dark z-10">
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
                          <FormLabel>
                            <div className="flex items-center">
                              <div>Password</div>
                              <a
                                href="/forgot"
                                className="ml-auto text-sm underline-offset-4 hover:underline"
                              >
                                lupa sandi?
                              </a>
                            </div>
                          </FormLabel>
                          <FormControl>
                            <Input className="bg-white text-black" autoComplete="current-password webauthn" type="password" placeholder="Ketikan kata sandi" {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-red-600 text-white font-semibold hover:text-red-600 mt-4">
                    Login {isLoading ? <LoadingSpinner className="size-4 text-white" /> : ""}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Belum memiliki akun? {" "}
                  <button type="button" onClick={() => router.replace("/register")} className="underline underline-offset-4">
                    Registrasi
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
