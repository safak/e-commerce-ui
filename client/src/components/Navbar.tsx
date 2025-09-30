import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { Bell, Home, ShoppingCart, Watch } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center border-b border-gray-200 pb-4">
      {/* Left */}
      <Link href={"/"} className="flex items-center">
        {/* <Image
          src={"/logo.png"}
          alt="Trend Lama"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md:h-9"
        /> */}
        <Watch
          width={36}
          height={36}
          className="
        w-6 h-6 md:w-9 md:h-9"
        />
        <p className="hidden md:block font-medium text-md tracking-wider">
          SilverWatch
        </p>
      </Link>

      {/* Right */}
      <div className="flex items-center gap-6">
        <SearchBar />
        <Link href={"/"}>
          <Home className="w-4 h-4 text-gray-600" />
        </Link>
        <Link href={"/"}>
          <Bell className="w-4 h-4 text-gray-600" />
        </Link>
        <Link href={"/"}>
          <ShoppingCart className="w-4 h-4 text-gray-600" />
        </Link>

        <Link href={"/login"}>Sign In</Link>
      </div>
    </nav>
  );
};

export default Navbar;
