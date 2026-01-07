"use client";

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const { addToCart } = useCartStore();

  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes((prev) => ({
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
    <div className="shadow-lg rounded-lg overflow-hidden">
      {/* IMAGE */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[3/3]">
          <Image
            src={product.images?.[productTypes.color] || ""}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>
      {/* PRODUCT DETAIL */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium text-[#DE4D86]">{product.name}</h1>
        <p className="text-sm text-[#64113F]">{product.shortDescription}</p>
        {/* PRODUCT TYPES */}
        <div className="flex items-center gap-4 text-xs">
          {/* SIZES */}
          {/* <div className="flex flex-col gap-1">
            <span className="text-[#64113F]">Size</span>
            <select
              name="size"
              id="size"
              className="ring ring-[#DE4D86] rounded-md px-2 py-1"
              onChange={(e) =>
                handleProductType({ type: "size", value: e.target.value })
              }
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div> */}
          {/* COLORS */}
          <div className="flex flex-col gap-1">
            <span className="text-[#64113F]">Couleur</span>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <div
                  className={`cursor-pointer border-1 ${
                    productTypes.color === color
                      ? "border-[#F29CA3]"
                      : "border-[#F7CACD]"
                  } rounded-full p-[1.2px]`}
                  key={color}
                  onClick={() =>
                    handleProductType({ type: "color", value: color })
                  }
                >
                  <div
                    className="w-[14px] h-[14px] rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* PRICE AND ADD TO CART BUTTON */}
        <div className="flex items-center justify-between">
          <p className="font-medium text-[#64113F]">${product.price.toFixed(2)}</p>
          {/* <button
            // onClick={handleAddToCart}
          //   className="ring-1 ring-[#F7CACD] shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white hover:bg-[#DE4D86] transition-all duration-300 flex items-center gap-2 text-[#64113F]"
          // > */}
            {/* <ShoppingCart className="w-4 h-4" /> */}
            {product.colors.map((color) => (
                productTypes.color === color && (
                  <Link href={product.colorStripe[color]} className="ring-1 ring-[#F7CACD] shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white hover:bg-[#DE4D86] transition-all duration-300 flex items-center gap-2 text-[#64113F]">Acheter maintenant</Link>

              )))}
          {/* </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
