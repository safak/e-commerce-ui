import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchBar from "./SearchBar"
import { Bell, Home, Store } from 'lucide-react'
import ShoppingCartIcon from "./ShoppingCartIcon"

const Navbar = () => {
  return (
    <div className={'w-full flex justify-between items-center'}>
    <Link href={'/'} className={'flex flex-row items-end gap-2'}>
        <Store className={'w-7 h-7 text-yellow-500'}/>
        <p className={'text-md font-medium tracking-wider text-yellow-500 m-0'}>Wishful Store</p>
    </Link>
      <div className={'flex flex-row gap-5 items-center'}>
        <SearchBar />
        <Link href={'/'}>
          <Bell className={'w-6 h-6 text-gray-600'} />
        </Link>
       
        <ShoppingCartIcon />
        <Link href={'/'}>
          <Home className={'w-6 h-6 text-gray-600'} />
        </Link>
        <Link href={'/'} className={'rounded-sm p-2 text-sm font-light text-white bg-yellow-500'}>
          LOGOUT
        </Link>

      </div>
    </div>
  )
}

export default Navbar
