import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { Bell, Flower2, Home, ShoppingCart } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-center pb-4">
      {/* LEFT */}
      <Link href="/" className="flex items-center">
        <Flower2 />
        <p className="md:block text-xl font-extrabold tracking-wider">
          DAR YASSOU.
        </p>
      </Link>
      {/* RIGHT */}
      <div className="flex items-center gap-6">
        {/* <SearchBar /> */}
        {/* <Link href="/">
          <Home className="w-4 h-4 text-[#64113F]"/>
        </Link> */}
        {/* <Bell className="w-4 h-4 text-[#64113F]"/> */}
        {/* <ShoppingCartIcon/> */}
        {/* <Link href="/login" className="text-[#64113F]">Sign in</Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
