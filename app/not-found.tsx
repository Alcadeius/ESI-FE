import Image from "next/image";

export default function custom404() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-2 bg-gray-900">
      <div className="flex items-center justify-center border-b-2 pb-2 border-white">
        <Image src="/images/bordered_logo-1.png" width={64} height={64} alt="logo"/>
        <h1 className="font-bold text-7xl text-red-600">404</h1>
      </div>
      <p className="font-semibold text-white">404 | page not found</p>
    </div>
  )
}