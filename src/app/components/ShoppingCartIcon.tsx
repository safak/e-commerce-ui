"use client"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
const ShoppingCartIcon = () => {
    return (
    <Link href="/cart" className="relative">
        <ShoppingCart className="w-4 h-4 text-gray-600 "/>
        <span className="absolute -top-3 -right-3 bg-amber-400 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs font-bold">0</span>
    </Link>
    )
}
export default ShoppingCartIcon