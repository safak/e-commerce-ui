import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { Home, Bell, ShoppingCart, ShoppingBagIcon } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between gap-8 border-b border-gray-200 pb-4">
      {/* LEFT */}
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="TrendLama" width={36} height={36} className="w-6 h-6 md:w-9 md:h-9" />
        <p className="hidden md:block text-md font-medium tracking-wider">TrendLama.
        </p>
      </Link>
      {/* RIGHT */}
      <div className="flex items-center  gap-6">
        <SearchBar />
        <Link href="/">
          <Home className="w-4 h-4 text-gray-600"/>
        </Link>
        <Link href="/"><Bell className="w-4 h-4 text-gray-600"/></Link>
        <ShoppingCartIcon />
        <Link href="/login">Sign in</Link>
      </div>
    </nav>
  )
}

export default Navbar;