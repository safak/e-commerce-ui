import  Link  from "next/link";
import Image from "next/image"

const Footer = () => {
  
  <div className="footer mt-16 flex flex-col items-center gap-8 md:flex-row md:items-start md: justify-between md:gap-0 bg-gray-800 rounded-lg">
    <div className="flex flex-col gap-4 items-center md:items-start">    
      <Link href="/" className="">
      <Image src="/logo.png" alt="TrendLama" width={36} height={36} 
      />
      <p className="hidden md:block text-md font-medium tracking-wider">OTAKUARC.
      </p>
      </Link>
      <p>© 2026 Trendlama.</p>
      <p>All rights reserved.</p>
    </div>
    
    <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
      <p className="text-sm text-amber-50">Links</p>
      <Link href="/">Homepage</Link>
      <Link href="/">Contact</Link>
      <Link href="/">Terms of Servic</Link>
      <Link href="/">Privacy Policy</Link>
    </div>
    <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
      <p className="text-sm text-amber-50">Products</p>
      <Link href="/">All products</Link>
      <Link href="/">New Arrivals</Link>
      <Link href="/">Best Sellers</Link>
      <Link href="/">sale</Link>
    </div>
    <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
      <p className="text-sm text-amber-50">Company</p>
      <Link href="/">About</Link>
      <Link href="/">Contact</Link>
      <Link href="/">Blog</Link>
      <Link href="/">Affiliate Program</Link>
    </div>
  </div>
}
export default Footer;