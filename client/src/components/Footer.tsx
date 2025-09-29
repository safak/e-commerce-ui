import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-16 flex flex-col items-center md:flex-row md:items-start bg-gray-800 p-8 rounded-lg">
      <div className="">
        <Link href={"/"} className="flex items-center">
          <Image src={"/logo.png"} alt="Trend Lama" width={36} height={36} />
          <p className="hidden md:block font-medium text-md tracking-wider">
            TRENDLAMA.
          </p>
        </Link>
        <p>h 2025 Alikhanix</p>
        <p>All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
