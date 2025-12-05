"use client"
import Link from "next/link"
import { ProductType } from "../types"
import Image from "next/image"
import ProductList from "./ProductList"
const ProductCard = ({product}: {product: ProductType}) => {
    return (
        <div className="">
           <Link href={`/product/${product.id}`}>
           {/* Product Image */}
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover hover:scale-105 transition-all duration-300"/>
            </div>
           </Link>
           {/* Product Details */}
           <div className="flex flex-col gap-4 p-4">
            <h3 className=" font-medium">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.shortDescription}</p>
            </div>
           {/* Product Types */}
           <div className="flex items-center gap-2">
            {/* Sizes */}
            <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Size</span>
            <select name="size" id="size">
                {product.sizes.split(",").map((size:string)=>(
                    <option  value={size}>{size}</option>
                ))}
            </select>
            </div>
            <div>
           {/* Colors */}
           </div>
           
        </div>
    </div>
    )
}

export default ProductCard