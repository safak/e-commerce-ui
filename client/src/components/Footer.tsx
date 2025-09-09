import Image from "next/image";
import Link from "next/link";


const Footer = () => {
  return (
    <div className="mt-16 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-0 bg-gray-800 p-8 rounded-lg">
      <div className=" flex flex-col gap-4 items-center md:items-start">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Trend Next"
            width={36}
            height={36}
            className="w-6 h-6 md:w-9 md:h-9"
          />
          <p className="hidden md:block text-md font-medium tracking-wider text-white">
            Devnuru.
          </p>
        </Link>
        <p className="text-sm text-gray-400">@ 2025 Devnuru</p>
        <p className="text-sm text-gray-400">All rights reserved.</p>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/">Homepage</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/tos">Terms of Service</Link>
        <Link href="/privacy">Privacy Policy</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/products">All Products</Link>
        <Link href="/products">New Arrivals</Link>
        <Link href="/sellers">Best Sellers</Link>
        <Link href="/sale">Sale</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/affiliate">Affiliate Programs</Link>
      </div>
    </div>
  );
};

export default Footer;
