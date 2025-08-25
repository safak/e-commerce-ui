import Image from "next/image";
import Link from "next/link";

const Footer =()=>{
    return(
        <div className="mt-16 flex flex-col items-center gap-8 md:gap-0 md:flex-row md:items-start md:justify-between bg-gray-800 p-8 rounded-lg">
           <div className="flex flex-col gap-4 items-center md:items-start">
            <Link href="/" className="flex items-center">
            <Image
            src="/logo.png" alt="TrendLama"
            width={36} height={36}
             />
            <p className=" hidden md:block text-md font-medium tracking-wider text-white">TRENDLAMA.</p>
            </Link>
            <p className="text-sm text-gray-400">o 2025 Trendlama</p>
            <p className="text-sm text-gray-400">All rights reserved</p>
           </div>


           <div className="flex flex-col gap-4 items-center md:items-start text-sm text-gray-400">
            <p className="text-sm text-amber-50">Links</p>
            <Link href="/">Homepage</Link>
            <Link href="/">Contact</Link>
            <Link href="/">Terms of service</Link>
            <Link href="/">Privacy Policy</Link>
           </div>

           <div className="flex flex-col gap-4 items-center md:items-start text-sm text-gray-400">
            <p className="text-sm text-amber-50">Products</p>
            <Link href="/">All Products</Link>
            <Link href="/">New Arrival</Link>
            <Link href="/">Best Sellers</Link>
            <Link href="/">Sale</Link>
           </div>


            <div className="flex flex-col gap-4 items-center md:items-start text-sm text-gray-400">
                <p className="text-sm text-amber-50">Support</p>
                <Link href="/">FAQs</Link>
                <Link href="/">Shipping</Link>
                <Link href="/">Returns</Link>
                <Link href="/">Order Status</Link>
            </div>
        </div>
    )
}
export default Footer;