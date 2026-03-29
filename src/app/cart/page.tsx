"use client";

import ShippingForm from "@/components/ShippingForm";
import StripePaymentForm from "@/components/StripePaymentForm";
import useCartStore from "@/stores/cartStore";
import { ShippingFormInputs } from "@repo/types";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

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

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs | null>(
    null,
  );
  const { cart, hasHydrated, removeFromCart } = useCartStore();

  const activeStep = Number(searchParams.get("step") || "1");
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (!hasHydrated) {
    return (
      <div className="mt-12 flex items-center justify-center text-sm text-gray-500">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>

      <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center gap-2 border-b-2 pb-4 ${activeStep === step.id ? "border-gray-800" : "border-gray-200"}`}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full text-white ${activeStep === step.id ? "bg-gray-800" : "bg-gray-400"}`}
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

      <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-16">
        <div className="flex w-full flex-col gap-8 rounded-lg border-1 border-gray-100 p-8 shadow-lg lg:w-7/12">
          {activeStep === 1 ? (
            cart.length > 0 ? (
              cart.map((item) => {
                const itemImage = Object.values(item.images ?? {})[0] || "";

                return (
                  <div
                    className="flex items-center justify-between"
                    key={item.id}
                  >
                    <div className="flex items-center gap-8">
                      <div className="relative h-32 w-32 overflow-hidden rounded-lg bg-gray-50">
                        {itemImage ? (
                          <Image
                            src={itemImage}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-gray-400">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-400 transition-all duration-300 hover:bg-red-200"
                      onClick={() => removeFromCart(item)}
                    >
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            )
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeStep === 3 && shippingForm ? (
            <StripePaymentForm shippingForm={shippingForm} />
          ) : (
            <p className="text-sm text-gray-500">
              Please fill in the shipping form to continue
            </p>
          )}
        </div>

        <div className="flex h-max w-full flex-col gap-8 rounded-lg border-1 border-gray-100 p-8 shadow-lg lg:w-5/12">
          <h2 className="font-semibold">Cart</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p className="text-semibold text-gray-500">Subtotal</p>
              <p className="font-medium">${cartTotal.toFixed(2)}</p>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between">
              <p className="text-semibold text-gray-800">Total</p>
              <p className="font-medium">${cartTotal.toFixed(2)}</p>
            </div>
          </div>

          {activeStep === 1 && (
            <button
              onClick={() => {
                if (cart.length > 0) {
                  router.push("/cart?step=2", { scroll: false });
                }
              }}
              disabled={cart.length === 0}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-800 p-2 text-white transition-all duration-300 hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Continue
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
