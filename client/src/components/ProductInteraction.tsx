"use client";

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductInteraction = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: ProductType;
  selectedSize: string;
  selectedColor: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();

  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: "increment" | "decrement") => {
    setQuantity((prev) =>
      type === "increment" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
    toast.success("Product added to cart");
  };

  return (
    <div className="flex flex-col h-full gap-4 mt-4">
      {/* COLOR */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-[#64113F]">Couleur</span>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => (
            <div
              key={color}
              onClick={() => handleTypeChange("color", color)}
              className={`cursor-pointer border-1 p-[2px] ${
                selectedColor === color ? "border-[#F29CA3]" : "border-[#F7CACD]"
              }`}
            >
              <div
                className="w-6 h-6"
                style={{ backgroundColor: color }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* PUSH TO BOTTOM */}
      <div className="mt-auto">
        <Link
          href={product.colorStripe[selectedColor]}
          className="ring-1 ring-[#F7CACD] shadow-lg rounded-md px-2 py-2 text-sm cursor-pointer hover:text-white hover:bg-[#DE4D86] transition-all duration-300 flex items-center justify-center gap-2 text-[#64113F]"
        >
          <ShoppingCart className="w-4 h-4" />
          Acheter maintenant
        </Link>
      </div>
    </div>
  );
};

export default ProductInteraction;
