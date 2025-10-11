import { Car, Phone } from "lucide-react";
import { z } from "zod";

export type ProductType = {
    id: number;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    sizes: string[];
    colors: string[];
    images: Record<string, string>;
};

export type ProductsType = ProductType[]

export type CartItemType = ProductType & {
    quantity: number;
    selectedSize: string;
    selectedColor: string;
};
export type CartItemsType = CartItemType[]


export const shippingFormSchema = z.object({
    name: z.string().min(2,"Name must be at least 2 characters long"),
    email: z.string().min(1,"Email is required"),
    phone: z.string().min(7, "Phone number must be at least 10 digits").max(10,"Phone number must be between 7 and 10 digits").regex(/^\d+$/,"Phone number must contain only digits"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(1,"City is required"), 

});
export type shippingFormInputs=z.infer<typeof shippingFormSchema>;

export const paymentFormSchema = z.object({
    cardHolder: z.string().min(2,"Card holder is required"),
    cardNumber: z.string().length(16, "Card number must be 16 digits"),
    expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiration date must be in MM/YY format"),
    cvv: z.string().length(3, "CVV must be 3 digits"),
});

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;


export type CartStoreStateType = {
    cart:CartItemsType;
    hasHydrated: boolean;
};

export type CartStoreActionsType = {
    addToCart:(product:CartItemType) =>void;
    removeFromCart:(product:CartItemType) =>void;
    clearCart:() =>void;

};