"use client";
import ShippingForm from "@/components/ShippingForm";
import PaymentForm from "@/components/PaymentForm";
import { CartItemsType } from "@/types";
import { ArrowRight, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

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
    }
];
// TEMPORARY
const cartItems: CartItemsType = [
    {
        id: 1,
        name: "Adidas CoreFit T-shirt",
        shortDescription: "CoreFit T-shirt from Adidas",
        description: "High-quality CoreFit T-shirt from Adidas",
        price: 39.9,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["gray", "purple", "green"],
        images: {
        gray: "/products/1g.png",
        purple: "/products/1p.png",
        green: "/products/1gr.png",
        },
        quantity: 1,
        selectedSize: "m",
        selectedColor: "gray"
    },
    {
        id: 2,
        name: "Nike Air Max Hoodie",
        shortDescription: "Air Max Hoodie from Nike",
        description: "High-quality Air Max Hoodie from Nike",
        price: 59.9,
        sizes: ["M", "L", "XL", "XXL"],
        colors: ["gray", "green"],
        images: {
        gray: "/products/2g.png",
        green: "/products/2gr.png",
        },
        quantity: 1,
        selectedSize: "l",
        selectedColor: "gray"
    },
    {
        id: 3,
        name: "Puma Future Rider Hoodie",
        shortDescription: "Future Rider Hoodie from Puma",
        description: "High-quality Future Rider Hoodie from Puma",
        price: 49.9,
        sizes: ["S", "M", "L", "XL"],
        colors: ["blue", "black"],
        images: {
        blue: "/products/3b.png",
        black: "/products/3bl.png",
        },
        quantity: 1,
        selectedSize: "l",
        selectedColor: "black"
    }
]

const CartPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [shippingForm, setShippingForm] = useState(null);

    const activeStep = parseInt(searchParams.get("step") || "1");
    return (
        <div className="flex flex-col gap-8 items-center justify-center mt-12">
            {/* TITLE */}
            <h1 className="text-2xl font-medium">Your Shopping Cart</h1>
            {/* STEPS */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                {steps.map(step => (
                    <div className={`flex items-center gap-2 border-b-2 pb-4 ${step.id === activeStep ? "border-gray-800": "border-gray-200"}`} key={step.id}>
                        <div className={`w-6 h-6 rounded-full text-white p-4 flex items-center justify-center ${step.id === activeStep ? "bg-gray-800" : "bg-gray-200"
                        }`}>{step.id}</div>
                        <p className={`text-sm font-medium ${step.id === activeStep ? "text-gray-800" : "text-gray-400"}`}>{step.title}</p>
                    </div>
                ))}
            </div>
            {/* STEPS & DETAILS  */}
            <div className="w-full flex flex-col lg:flex-row gap-16">
                {/* STEPS */}
                <div className="w-full lg:w-7/12 shadow-lg border-gray-100 p-8 rounded-lg flex flex-col gap-8">
                    {activeStep === 1 ? (
                        cartItems.map(item => (
                        // SINGLE CART ITEM 
                        <div className="flex items-center justify-between" key={item.id}>
                            {/* IMAGE AND DETAILS */}
                            <div className="flex gap-8 ">
                                {/* IMAGE */}
                                <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                                    <Image src={item.images[item.selectedColor]} alt={item.name} fill className="object-contain" />
                                </div>
                                {/* ITEM DETAILS */}
                                <div className="flex flex-col justify-between">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-medium">{item.name}</p>
                                        <p className="text-xs text-gray">Quantity:{" "}{item.quantity}</p>
                                        <p className="text-xs text-gray">Size:{" "}{item.selectedSize}</p>
                                        <p className="text-xs text-gray">Color:{" "}{item.selectedColor}</p>
                                    </div>
                                    <p className="font-medium">${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                            {/* DELETE BUTTON */}
                            <button className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 flex items-center justify-center cursor-pointer">
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                        ))
                    ) : activeStep === 2 ? ( 
                    <ShippingForm setShippingForm={setShippingForm} /> 
                    ) : activeStep === 3 && shippingForm ? (
                    <PaymentForm /> 
                    ) : (
                      <p className="text-sm text-gray-500">Please fill in the shippping form to continue</p>
                    )}
                </div>
                {/* DETAILS */}
                <div className="w-full lg:w-5/12 shadow-lg border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">
                    <h1 className="font-semibold">Cart Detalis</h1>
                    <div className="flex flex-col gap-4 ">
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-500">Subtotal</p>
                            <p className="font-medium">
                                $
                                {cartItems.reduce(
                                    (acc, item) => acc + item.price * item.quantity,
                                    0
                                ).toFixed(2)}
                            </p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-500">Discount(10%)</p>
                            <p className="font-medium text-red-500">
                                -$10
                            </p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-500">Shipping Fee</p>
                            <p className="font-medium">
                                $10
                            </p>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="flex justify-between">
                            <p className="text-gray-800 font-semibold">Total</p>
                            <p className="font-medium">
                                $
                                {cartItems.reduce(
                                    (acc, item) => acc + item.price * item.quantity,
                                    0
                                ).toFixed(2)}
                            </p>
                        </div>
                    </div>
                    {activeStep === 1 && (
                        <button onClick={() => router.push("/cart?step=2", {scroll:false})} className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2">
                        Countinue 
                        <ArrowRight className="w-3 h-3" />
                    </button>
                )}
                </div>
            </div>
        </div>
    );
    
}

export default CartPage;