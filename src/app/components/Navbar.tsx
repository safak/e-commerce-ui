import React from "react";
import Link from "next/link";
import Image from "next/image";
import SerchBar from "./Serchbar";
import { Bell, Home, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <>
      <nav className="w-full flex items-center justify-between border-b border-gray-200 pd-4 py-2">
        {/* {left} */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={36}
            height={36}
            className="w-6 h-6 md:w-9 md:h-9"
          />
          <div className=" hidden md:block text-md font-medium tracking-wider">
            TrendLama
          </div>
        </Link>
        {/* {right} */}
        <div className="flex items-center gap-4 ml-6">
          <SerchBar />
          <Link href="./" className="flex items-center gap-4 ml-6 ">
            <Home className="w-4 h-4 text-gray-600" />
          </Link>
          <Bell className="w-4 h-4 text-gray-600" />
          <ShoppingCart className="w-4 h-4 text-gray-600 " />
          <Link href="./login" className="text-gray-600">
            Sign in
          </Link>
        </div>
      </nav>
    </>
  );
}
