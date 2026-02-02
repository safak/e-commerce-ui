'use client';

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types"
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductCard = ({product}: {product:ProductType}) => {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const { addToCart } = useCartStore();
  
  const handleProductType = ({type, value}: {type: "size" | "color", value: string}) => {
    setProductTypes(prev => ({
      ...prev,
        [type]: value,
    }));
  };


  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: productTypes.size,
      selectedColor: productTypes.color,
    });
    toast.success("Product added to cart")
  };
  
  return (
    <div className="shadow-lg rounded-lg overflow-hidden max-md:w-42">
      {/* IMAGE */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[2/3] hover:scale-105 transition-all duration-300">
          <Image src={product.images[productTypes.color]} alt={product.name} fill className="object-cover" />
        </div>
      </Link>
      {/* PRODUCT DETAIL */}
      <div className='flex flex-col gap-4 p-4'>
        <h1 className="font-medium">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>
        {/* PRODUCT TYPES */}
        <div className="flex items-center max-md:items-start gap-4 text-xs">
          {/* SIZES */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Size</span>
            <select  name="size" id="size" className="ring ring-gray-300 rounded-md px-2 py-1 cursor-pointer"
            onChange={e => handleProductType({type:"size", value:e.target.value})
              }
            >
              {product.sizes.map(
                size => (
                  <option key={size} value={size}>{size.toUpperCase()}</option>
                )
              )}
            </select>
          </div>
          {/* COLORS */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-500">Color</span>
            <div className="flex items-center gap-2 flex-wrap">
              {product.colors.map(color => (
                <div className={`flex items-center justify-center cursor-pointer border-1 ${productTypes.color === color ? "border-gray-400" : "border-gray-200"} rounded-full p-[1.2px]`} key={color} onClick={() => handleProductType({type:"color", value:color})}>
                  <div className="w-[14px] h-[14px] rounded-full" style={{ backgroundColor:color }} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* PRICE  AND ADD TO CART BUTTON */}
        <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-2">
          <p className="font-medium">${product.price.toFixed(2)}</p>
          <button className="max-md:w-full max-md:p-2 max-md:flex max-md:justify-center ring-1 ring-gray-200 shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white hover:bg-black active:bg-black active:text-white transition-all duration-300 flex items-center  gap-2"
          onClick={handleAddToCart}
          >
            <ShoppingCart className ="w-4 h-4"/>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;