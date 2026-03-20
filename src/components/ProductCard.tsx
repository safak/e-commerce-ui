"use client";

import { ProductType } from "@/types";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import useCartStore from "@/stores/cartStore";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
    });
    toast.success("Product added to cart!");
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {/* 图片 */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[2/3]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>
      {/* 产品信息 */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>
        {/* 产品价格以及加入购物车按钮 */}
        <div className="flex items-center justify-between">
          <span className="font-medium">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="ring ring-gray-200 shadow-lg text-sm px-2 py-1 cursor-pointer rounded-md hover:text-white hover:bg-black transition-all duration-300 flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
