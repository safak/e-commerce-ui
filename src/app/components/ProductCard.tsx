"use client"
import Link from "next/link"
import { ProductType } from "../types"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"
const ProductCard = ({ product }: { product: ProductType }) => {
    const [producTypes, setProductTypes] = useState({
        size: product.sizes.split(",")[0].trim(),
        color: product.color.split(",")[0].trim(),
    })
    const handleProductType = ({type,value}: {type: "size" | "color",value: string}) => {
        setProductTypes({...producTypes,[type]: value})
    }
    
    // Find the index of the selected color to get the corresponding image
    const colors = product.color.split(",").map(c => c.trim());
    const selectedColorIndex = colors.indexOf(producTypes.color);
    const imageIndex = selectedColorIndex >= 0 && selectedColorIndex < product.images.length 
        ? selectedColorIndex 
        : 0;
    
    return (
        <div className="">
            <Link href={`/product/${product.id}`}>
                {/* Product Image */}
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                    <Image
                        src={product.images[imageIndex]}
                        alt={product.name}
                        fill
                        className="object-cover hover:scale-105 transition-all duration-300"
                    />
                </div>
            </Link>

            {/* Product Details */}
            <div className="flex flex-col gap-4 p-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.shortDescription}</p>
            </div>

            {/* Product Types */}
            <div className="flex flex-col gap-4 px-4 pb-4">
                {/* Sizes and Colors Row */}
                <div className="flex items-center gap-4">
                    {/* Sizes */}
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-500">Size</span>
                        <select 
                            name="size" 
                            id="size" 
                            className="ring ring-gray-300 rounded-md px-2 py-1"
                            value={producTypes.size}
                            onChange={(e)=>handleProductType({type: "size", value: e.target.value.trim()})}
                        >
                            {product.sizes.split(",").map((size) => (
                                <option key={size.trim()} value={size.trim()}>{size.trim().toUpperCase()}</option>
                            ))}
                        </select>
                    </div>

                    {/* Colors */}
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-500">Color</span>
                        <div className="flex items-center gap-2">
                            {product.color.split(",").slice(0, Math.min(product.images.length, 4)).map((color)=>(
                                <div 
                                    key={color.trim()}
                                    onClick={() => handleProductType({type: "color", value: color.trim()})}
                                    className={`cursor-pointer rounded-full transition-all duration-200 ${
                                        producTypes.color === color.trim() ? "ring-1 ring-gray-800 ring-offset-1" : ""
                                    }`}
                                >
                                    <div className="w-[14px] h-[14px] rounded-full" style={{ backgroundColor: color.trim() }}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Price and Add to Cart Button Row */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 font-medium">${product.price.toFixed(2)}</p>
                    <button className="ring-1 ring-gray-300 shadow-lg rounder-md text-sm px-2 py-1 cursor-pointer rounded-md hover:text-white hover:bg-black transition-all duration-300 flex items-center gap-2">
                        Add to Cart
                        <ShoppingCart />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
