import { Store } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div
      className={
        "flex flex-col items-center md:flex-row md:items-start bg-gray-800 p-8 rounded-lg justify-between"
      }
    >
      <div className={"flex flex-col gap-4 items-center md:items-start"}>
        <Link href={"/"} className={'flex gap-2 items-center'}>
          <Store className={"w-7 h-7 text-yellow-500"} />
          <p
            className={"text-md font-medium tracking-wider text-yellow-500 m-0"}
          >
            Wishful Store
          </p>
        </Link>
        <p className={'text-sm text-gray-400'}> Wishful Store</p>
        <p className={'text-sm text-gray-400'}> All right reserved.</p>
      </div>
      <div className={'flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start'}>
        <p className={'text-sm text-amber-50'}>Links</p>
        <Link href={"/"}>Homepage</Link>
        <Link href={"/"}>Contact</Link>
        <Link href={"/"}>Terms of Services</Link>
        <Link href={"/"}>Privacy Policy</Link>
      </div>
      <div className={'flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start'}>
        <p className={'text-sm text-amber-50'}>Links</p>
        <Link href={"/"}>All Product</Link>
        <Link href={"/"}>New Arrival</Link>
        <Link href={"/"}>Best Seller</Link>
        <Link href={"/"}>Sales</Link>
      </div>
      <div className={'flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start'}>
        <p className={'text-sm text-amber-50'}>Links</p>
        <Link href={"/"}>About us</Link>
        <Link href={"/"}>Contact</Link>
        <Link href={"/"}>Twitter</Link>
        <Link href={"/"}>Email</Link>
      </div>
    </div>
  );
}

export default Footer
