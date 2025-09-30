import { Watch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-16 flex flex-col items-center gap-8 md:gap-0 md:flex-row md:items-start md:justify-between bg-gray-800 p-8 rounded-lg">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href={"/"} className="flex items-center text-white">
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
        <p className="text-sm text-gray-400">© 2025 Alikhanix</p>
        <p className="text-sm text-gray-400">All rights reserved</p>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href={"/"}>Homepage</Link>
        <Link href={"/"}>Contact</Link>
        <Link href={"/"}>Terms of Service</Link>
        <Link href={"/"}>Privacy policy</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href={"/"}>Homepage</Link>
        <Link href={"/"}>Contact</Link>
        <Link href={"/"}>Terms of Service</Link>
        <Link href={"/"}>Privacy policy</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href={"/"}>Homepage</Link>
        <Link href={"/"}>Contact</Link>
        <Link href={"/"}>Terms of Service</Link>
        <Link href={"/"}>Privacy policy</Link>
      </div>
    </div>
  );
};

export default Footer;
