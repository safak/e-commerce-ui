"use client";

import useCartStore from "@/stores/cartStore";
import { useUser } from "@clerk/nextjs";
import { ProductType } from "@repo/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SizeProfile } from "@repo/types";

const ProductCard = ({ product }: { product: ProductType }) => {
  const { user } = useUser();

  const metadata = user?.publicMetadata as {
    sizeProfile?: SizeProfile;
  };

  const userSize = metadata?.sizeProfile?.shoeSize;

  function getRecommendedSize(userSize: number | undefined, sizes: string[]) {
    if (!userSize) return null;

    const numericSizes = sizes.map(Number);

    const closest = numericSizes.reduce((prev, curr) =>
      Math.abs(curr - userSize) < Math.abs(prev - userSize) ? curr : prev,
    );

    if (Math.abs(closest - userSize) > 1) {
      return null;
    }

    return closest;
  }

  const recommendedSize = getRecommendedSize(userSize, product.sizes);
  const defaultSize = recommendedSize?.toString() || product.sizes[0]!;
  const [productTypes, setProductTypes] = useState({
    size: defaultSize,
    color: product.colors[0]!,
  });
  const [isSizeManuallySelected, setIsSizeManuallySelected] = useState(false);

  useEffect(() => {
    setProductTypes((prev) => ({
      ...prev,
      size: isSizeManuallySelected ? prev.size : defaultSize,
    }));
  }, [defaultSize, isSizeManuallySelected]);

  const selectedSize = isSizeManuallySelected ? productTypes.size : defaultSize;

  const { addToCart } = useCartStore();

  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    if (type === "size") {
      setIsSizeManuallySelected(true);
    }

    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: selectedSize,
      selectedColor: productTypes.color,
    });
    toast.success("Product added to cart");
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {/* IMAGE */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[3/4]">
          <Image
            src={
              (product.images as Record<string, string>)?.[
                productTypes.color
              ] || ""
            }
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>
      {/* PRODUCT DETAIL */}
      <div className="flex flex-col gap-2 p-2">
        <h1 className="font-medium">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>
        {/* PRICE AND ADD TO CART BUTTON */}
        <div className="flex items-center justify-between">
          <p className="font-medium text-xs">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="ring-1 ring-gray-200 rounded px-2 py-1 text-[14px] cursor-pointer hover:text-white hover:bg-black transition-all duration-300 flex items-center gap-1"
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
