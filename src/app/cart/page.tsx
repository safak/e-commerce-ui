"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { use } from "react";

const steps = [
  {
    id: 1,
    title: "Shopping Cart",
  },
  {
    id: 2,
    title: "Shipping Address",
  },
  {
    id: 3,
    title: "Payment Method",
  },
];

const CartItems = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    shortDescription: "The latest iPhone with A15 Bionic chip",
    description:
      "The iPhone 13 Pro features a 6.1-inch Super Retina XDR display, A15 Bionic chip, Pro camera system with Night mode, and up to 22 hours of battery life.",
    price: 999,
    sizes: ["128GB", "256GB", "512GB", "1TB"],
    colors: ["gray", "purple", "green"],
    images: {
      gray: "/products/1g.png",
      purple: "/products/1p.png",
      green: "/products/1gr.png",
    },
    quantity: 1,
    selectedSize: "256GB",
    selectedColor: "purple",
  },
];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeStep = parseInt(searchParams.get("step") || "1");
  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      {/* 标题 */}
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>
      {/* 步骤条 */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center gap-2 border-b-2 pb-4 ${activeStep === step.id ? "border-gray-800" : "border-gray-200"}`}
          >
            <div
              className={`w-6 h-6 rounded-full text-white  flex items-center justify-center ${activeStep === step.id ? "bg-gray-800 " : "bg-gray-400 "}`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${activeStep === step.id ? "text-gray-800" : "text-gray-400"}`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
