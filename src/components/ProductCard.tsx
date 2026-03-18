"use client";

import { ProductType } from "@/types";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productType, setProductType] = React.useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const handleProductType = (type: "size" | "color", value: string) => {
    setProductType((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {/* 图片 */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[2/3]">
          <Image
            src={product.images[product.colors[0]]}
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
        {/* 产品种类 */}
        <div className="flex items-center gap-4 text-xs">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {product.sizes[0]}
          </span>
        </div>
        {/* 产品尺寸 */}
        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Size</span>
          <select
            name="size"
            id="size"
            className="ring ring-gray-300 rounded-md px-2 py-1"
            onChange={(e) => handleProductType("size", e.target.value)}
          >
            {product.sizes.map((size) => {
              return (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              );
            })}
          </select>
        </div>
        {/* 产品颜色 */}
        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Color</span>
          <span className="flex items-center gap-2">
            {product.colors.map((color) => {
              return (
                <div
                  className={`cursor-pointer border-1 ${productType.color === color ? "border-gray-400" : "border-gray-200"} rounded-full p-[1.2px]`}
                  key={color}
                  onClick={() => handleProductType("color", color)}
                >
                  <div
                    className="w-[14px] h-[14px] rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                </div>
              );
            })}
          </span>
        </div>
        {/* 产品价格以及加入购物车按钮 */}
        <div className="flex items-center justify-between">
          <span className="font-medium">${product.price.toFixed(2)}</span>
          <button className="ring ring-gray-200 shadow-lg  text-sm px-2 py-1 cursor:pointer rounded-md hover:text-white hover:bg-black transition-all duration-300 flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
