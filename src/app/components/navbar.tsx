import Link from "next/link"
import Image from "next/image"
import logo from "@/public/logo.png"
import Searchbar from "./searchbar"
import { Bell, ShoppingCart, Home } from "lucide-react"
import ShoppingCartIcon from "./ShoppingCartIcon"
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center border-b pb-4 border-gray-200 w-full ">
        {/* Left Side */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="TrendLama" width={36} height={36}  className="w-6 h-6 md:w-9 md:h-9"/>
        <p className=" hidden md:block text-md font-medium tracking-wider">TrendLama</p>
      </Link>
      {/* Right Side */}
      <div className="flex items-center gap-8">
      <Searchbar />
      <Link href="/">
      <Home className="w-4 h-4 text-gray-600"/>
      </Link>
      
      <Bell className="w-4 h-4 text-gray-600"/>
    
      <ShoppingCartIcon/>
    
      
      <Link href="/login" className=" text-gray-600">Sign In
      
      </Link>
      
      </div>
    </nav>
  )
}

export default Navbar