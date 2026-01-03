import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { Home, Bell, ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="navbar">Navbae
      {/* LEFT */}
      <Link href="/" className="">
        <Image src="/logo.png" alt="TrendLama" width={36} height={36} className="logo-img" />
        <p className="hidden md:block text-md font-medium tracking-wider">OTAKUARC.
        </p>
      </Link>
      {/* RIGHT */}
      <div className=" gap-6">
        <SearchBar />
        <Link href="/">
          <Home className="w-4 h-4 text-gray-600"/>
        </Link>
        <Bell className=""/>
        <ShoppingCart className=""/>
        <Link href="/login">Sign in</Link>
      </div>
    </nav>
  )
}

export default Navbar;