import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="mt-16 flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-0 bg-gray-800 p-8 rounded-lg text-white">
      <div className="flex flex-col items-center md:items-start gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={36}
            height={36}
            className="w-6 h-6 md:w-9 md:h-9"
          />
          <p className="hidden md:block font-medium tracking-wider">PULSE.</p>
        </Link>

        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} PULSE.
        </p>
        <p className="text-sm text-gray-400">All rights reserved.</p>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <Link href="/about" className="hover:underline">
          HomePage
        </Link>
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
        <Link href="/terms" className="hover:underline">
          Terms of Service
        </Link>
        <Link href="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <Link href="/about" className="hover:underline">
          All Products
        </Link>
        <Link href="/contact" className="hover:underline">
          New Arrivals
        </Link>
        <Link href="/terms" className="hover:underline">
          Best Sellers
        </Link>
        <Link href="/privacy" className="hover:underline">
          Sale
        </Link>
      </div>
    </div>
  );
};

export default Footer;
