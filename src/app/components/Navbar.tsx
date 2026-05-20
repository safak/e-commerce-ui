import Image from "next/image";
import Link from "next/link";

const Navbar = ()=>{
    return (
        <nav className="w-full flex item-center justify-between border-b border-gray-200 pb-4">
            {/*Left*/}
            <Link href ="/" className="flex items-center">
            <Image 
            src="/logo.png"
            alt = "LuxeFit Clothing"
            width={36}
            height={36}
            className="w-6 h-6 md:w-9 md:h-9"
            />
            <p className="text-md font-medium">LUXEFIT CLOTHING</p>
                </Link>

            {/*Right*/}
            <div>Right</div>
        </nav>

    )
}

export default Navbar;