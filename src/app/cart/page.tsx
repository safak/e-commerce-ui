"use client";
import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import { ArrowRight, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { ShippingFormInputs } from "@/types";
import useCartStore from "@/stores/cartStore";

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

type CartItem = {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  images: Record<number, string>;
  quantity: number;
};

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs | null>(
    null,
  );

  const activeStep = parseInt(searchParams.get("step") || "1");
  // 导入购物车和移除购物车函数
  const { cart, removeFromCart } = useCartStore();
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
      {/* 步骤和细节 */}
      <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* 步骤 */}
        <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          {activeStep === 1 ? (
            cart.map((item) => (
              // 单一商品
              <div className="flex items-center justify-between" key={item.id}>
                {/* 图片以及细节 */}
                <div className="flex items-center gap-8">
                  {/* 商品图片 */}
                  <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={item.images[item.id]}
                      alt={item.name}
                      fill
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  {/* 商品详情 */}
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Quantity:{""}
                        {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                {/* 删除按钮 */}
                <button
                  className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 transition-all duration-300 text-red-400"
                  onClick={() => removeFromCart(item)}
                >
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeStep === 3 && shippingForm ? (
            <PaymentForm />
          ) : (
            <p className="text-sm text-gray-500">
              Please fill in the shipping form to continue
            </p>
          )}
        </div>
        {/* 细节 */}
        <div className="w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">
          <h2 className="font-semibold">Cart</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              {/* 原价 */}
              <p className="text-semibold text-gray-500">Subtotal</p>
              <p className="font-medium">
                $
                {cart
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0,
                  )
                  .toFixed(2)}
              </p>
            </div>
            <hr className="border-gray-200" />
            {/* 实付价格 */}
            <div className="flex justify-between">
              <p className="text-semibold text-gray-800">Total</p>
              <p className="font-medium">
                $
                {cart
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0,
                  )
                  .toFixed(2)}
              </p>
            </div>
          </div>
          {/* 前往第二步 */}
          {activeStep === 1 && (
            <button
              onClick={() => router.push("/cart?step=2", { scroll: false })}
              className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
