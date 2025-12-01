import Link from "next/link"
import Image from "next/image"

const Footer = () => {
  return (
    <div className=" mt-16 flex flex-col items-center md:flex-row  gap-8 md:gap-0 md:justify-between md:items-start bg-gray-600 rounded-lg">
        <div className="flex flex-col items-center gap-2 md:items-start">
             <Link href="/" className="flex items-center gap-4">
                  <Image src="/logo.png" alt="TrendLama" width={36} height={36} />
                  <p className=" hidden md:block text-md font-medium tracking-wider text-white">TrendLama</p>
               </Link>
               <p className="text-sm text-gray-400">2025 Trend Lama</p>
               <p  className="text-sm text-gray-400">All rights are reserved</p>
        </div>
        <div className="flex flex-col items-center gap-4 md:items-start">
            <p className="text-sm text-amber-50 ">Links</p>
            <Link href="/">Home</Link>
            <Link href="/">About</Link>
            <Link href="/">Terms of Service</Link>
            <Link href="/">Privacy Policy</Link>
        </div>
        <div className="flex flex-col items-center gap-4 md:items-start">
            <p className="text-sm text-amber-50 ">Links</p>
            <Link href="/">Products</Link>
            <Link href="/">Categories</Link>
            <Link href="/">Brands</Link>
            <Link href="/">Contact</Link>
        </div>
        <div className="flex flex-col items-center gap-4 md:items-start">
            <p className="text-sm text-amber-50 ">Links</p>
            <Link href="/">Help</Link>
            <Link href="/">Support</Link>
            <Link href="/">FAQ</Link>
            <Link href="/">Contact</Link>
        </div>
    </div>
  )
}

export default Footer