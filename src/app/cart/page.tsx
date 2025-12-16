"use client"
import { CreditCard, MapPin, ShoppingCart, Trash } from "lucide-react"
import { CartItemType, CartType } from "../types";
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import ShippingForm from "../components/ShippingForm";
import PaymentForm from "../components/PaymentForm";
import ProductCard from "../components/ProductCard";
import Image from "next/image"
const steps = [
    {
        id: 1,
        title: "Cart",
        icon: <ShoppingCart className="w-4 h-4"/>   
    },
    {
        id: 2,
        title: "Shipping Address",
        icon: <MapPin className="w-4 h-4"/>
    },
    {
        id: 3,
        title: "Payment Method",
        icon: <CreditCard className="w-4 h-4"/>
    }];
// Temporary Data
const CartItems: CartType=[
    {
        id: 1,
        name: "Addidas Core fit T-shirt",
        shortDescription: "A comfortable and stylish t-shirt for everyday wear",
        Description: "This is a comfortable and stylish t-shirt for everyday wear. It is made of 100% cotton and is very soft and comfortable to wear. It is a great t-shirt for everyday wear.",
        price: 100,
        sizes: "S, M, L, XL, XXL",
        color: "gray,orange, Green",
        quantity: 1,
        selectedSize: "S",
        selectedColor: "gray",
        images: [ "/products/1g.png", "/products/1gr.png", "/products/1p.png" ],    
    },
    
    {
        id: 2,
        name: "Nike Air Max 270",
        shortDescription: "A comfortable and stylish t-shirt for everyday wear",
        Description: "This is a comfortable and stylish t-shirt for everyday wear. It is made of 100% cotton and is very soft and comfortable to wear. It is a great t-shirt for everyday wear.",
        price: 200,
        sizes: "S, M, L, XL, XXL",
        color: "Green,Gray",
        quantity: 1,
        selectedSize: "S",
        selectedColor: "gray",
        images: [ "/products/2g.png", "/products/2gr.png" ],
    },
    {
        id: 3,
        name: "Puma RS-X 2.0",
        shortDescription: "A comfortable and stylish t-shirt for everyday wear",
        Description: "This is a comfortable and stylish t-shirt for everyday wear. It is made of 100% cotton and is very soft and comfortable to wear. It is a great t-shirt for everyday wear.",
        price: 300,
        sizes: "S, M, L, XL, XXL",
        color: "Red, Blue, Green, Yellow",
        quantity: 1,
        selectedSize: "S",
        selectedColor: "gray",
        images: [ "/products/3b.png", "/products/3bl.png", "/products/3gr.png" ],
    },
];
const CartPage = () => {
    const SearchParams = useSearchParams()
    const router = useRouter()
    const activeStep = parseInt(SearchParams.get("step") || "1")
    const [shippingForm, setShippingForm] = useState(null)
    
    return (
        <div className="flex flex-col gap-8 mt-12 justify-center items-center">
            <h1 className="text-2xl font-bold">Your Shopping Cart</h1>
            {/* Steps */}
            <div className="flex flex-col lg:flex-row  items-center gap-8 lg:gap-16">
                {steps.map((step)=>(
                    <div key={step.id} className={`flex items-center gap-4 border-b-2  pb-2 ${step.id===activeStep ? "border-black" : "border-gray-500"}`}>
                        <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center ${step.id===activeStep ? "bg-black" : "bg-gray-500"}`}>{step.id}</div>
                        <p className={`text-sm font-medium ${step.id===activeStep ? "text-black" : "text-gray-500"}`}>{step.title}</p>
                    </div>
                ))}
            </div>
            {/* Steps And Detatails */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full">
             {/* Steps*/}
             <div className="w-full lg:w-7/12 shadow-lg p-4 rounded-lg border-1 border-gray-300 flex flex-col gap-8">
                {activeStep === 1 ? (
                    <div className="flex flex-col gap-4">
                        {CartItems.map((item: CartItemType) => {
                            // Calculate image index based on selected color for each item
                            const colors = item.color.split(",").map(c => c.trim());
                            const selectedColorIndex = colors.indexOf(item.selectedColor);
                            const imageIndex = selectedColorIndex >= 0 && selectedColorIndex < item.images.length 
                                ? selectedColorIndex 
                                : 0;
                            
                            return (
                                <div key={item.id} className="flex flex-row items-center justify-between gap-4">
                                    {/* Image and details */}
                                    <div className="flex flex-row items-center gap-4">
                                        <div className="relative w-24 h-32 rounded-lg overflow-hidden">
                                            {/* Image */}
                                            <Image 
                                                src={item.images[imageIndex]} 
                                                alt={item.name} 
                                                fill 
                                                className="object-cover hover:scale-105 transition-all duration-300" 
                                            />
                                        </div>
                                        {/* Details */}
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-md font-bold">{item.name}</h3>
                                            <div className="flex flex-row items-center justify-between">
                                                <p className="text-sm text-gray-500">Quantity:</p>
                                                <p className="text-black text-md">{"  "}{item.quantity}</p>
                                            </div>
                                            <div className="flex flex-row items-center justify-between">
                                                <p className="text-sm text-gray-500">Color:</p>
                                                <p className="text-black text-md">{"  "}{item.selectedColor}</p>
                                                </div>
                                            <div className="flex flex-row items-center justify-between gap-2">
                                                <p className="text-sm text-gray-500">Price:</p>
                                                <p className="text-black text-md         ">{"  "}${"  "}{item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* delete button */}
                                    <button className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center cursor-pointer hover:bg-red-300 transition-all duration-300">
                                        <Trash className="w-4 h-4"/>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                ) : activeStep === 2 ? (
                    <ShippingForm />
                ) : activeStep === 3 ? (
                    <PaymentForm />
                ) : null}
             </div>
             {/* Details*/}
             <div className="w-full lg:w-5/12 shadow-lg p-4 rounded-lg border-1 border-gray-300 flex flex-col gap-8">
                <h2 className="text-lg font-bold">Cart Details</h2>
                <div className="flex flex-row items-center justify-between">
                    <p className="text-sm text-gray-500">Subtotal</p>
                    <p className="">${CartItems.reduce((acc: number, item: { price: number; quantity: number; }) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <p className="text-sm text-gray-500">Discount(Code: 10% OFF)</p>
                    <p className="text-black">-$10.00</p>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <p className="text-sm text-gray-500">Shipping Fee</p>
                    <p className="text-black">$10.00</p>
                </div>
                <hr className="border-gray-300 border-1"/>
                <div className="flex flex-row items-center justify-between">
                    <p className="text-gray-500">Total:</p>
                    <p className="text-black">${CartItems.reduce((acc: number, item: { price: number; quantity: number; }) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
                </div>
                {activeStep === 1 && (
                    <button onClick={()=>router.push("/cart?step=2")} className="bg-black text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2">
                        Continue
                        <ArrowRight className="w-4 h-4"/>
                    </button>
                )}
             </div>
            </div>
        </div>
    );
};
export default CartPage;