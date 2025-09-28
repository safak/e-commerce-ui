import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="">
      {/* Left */}
      <Link href={"/"} className="flex items-center">
        <Image
          src={"/logo.png"}
          alt="Trend Lama"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md:h-9"
        />
        <p className="font-medium text-md tracking-wider">TRENDLAMA.</p>
      </Link>

      {/* Right */}
    </nav>
  );
};

export default Navbar;
