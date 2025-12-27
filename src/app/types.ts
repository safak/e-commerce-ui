import { ReactNode } from "react"

export type ProductType = {
    id: number;
    name: string;
    shortDescription: string;
    Description: string;
    price: number;
    sizes: string;
    color: string;
    images: string[];
    quantity?: number;
    selectedSize?: string;
    selectedColor?: string;
}
export type ProductsType = ProductType[]
export type CartItemType = ProductType & {
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}
export type CartType = CartItemType[]
export type StepType = {
    id: number;
    title: string;
    icon: ReactNode;
}
export type StepsType = StepType[]