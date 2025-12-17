import Image from "next/image";
import Link from "next/link";

import React from "react";

export default function Footer() {
  return (
    <div className="mt-16 flex flex-col gap-8 md:gap-0 items-center md:flex-row md:items-start md:justify-between bg-gray-800 p-8 rounded-lg">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={36}
            height={36}
            className="w-6 h-6 md:w-9 md:h-9"
          />
          <div className=" hidden md:block text-md font-medium tracking-wider text-white">
            TrendLama
          </div>
        </Link>
        <p className=" text-gray-400 text-sm">All rights reserved.</p>
        <p className=" text-gray-400 text-sm">Developed by Hisham.</p>
      </div>
      <div className="flex flex-col gap-4 text-sm ml-3 text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50 ">Links</p>
        <Link href="./">Home Page </Link>
        <Link href="./">Contact</Link>
        <Link href="./">Terms of Service</Link>
        <Link href="./">Privcay policy</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm ml-3 text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50 ">Product</p>
        <Link href="./">Home Page </Link>
        <Link href="./">Contact</Link>
        <Link href="./">Terms of Service</Link>
        <Link href="./">Privcay policy</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm ml-3 text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50 ">Support</p>
        <Link href="./">Home Page </Link>
        <Link href="./">Contact</Link>
        <Link href="./">Terms of Service</Link>
        <Link href="./">Privcay policy</Link>
      </div>
    </div>
  );
}
