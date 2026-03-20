"use client";

import useCartStore from "@/stores/cartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

const ShoppingCartIcon = () => {
  const { cart, hasHydrated } = useCartStore();

  if (!hasHydrated) {
    return null;
  }
  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center"
    >
      <ShoppingCart className="w-4 h-4 text-gray-600" />
      <span className="absolute -top-3 -right-3 bg-amber-400 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium">
        {cart.reduce((total, item) => total + item.quantity, 0)}
      </span>
    </Link>
  );
};

export default ShoppingCartIcon;
