import { z } from "zod";

export type productType = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;

}

export type ProductsType = productType[]

export type CartItemType = productType & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export type CartItemsType = CartItemType[]

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email().min(1, "email is required"),
  phone: z.string().min(7, "minimum 7 number required").max(10, "maximum 10 number").regex(/^\d+$/, "phone number"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "city is required"),
})

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;


export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card holder is required!"),
  cardNumber: z
    .string()
    .min(16, "Card Number is required!")
    .max(16, "Card Number is required!"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Expiration date must be in MM/YY format!"
    ),
  cvv: z.string().min(3, "CVV is required!").max(3, "CVV is required!"),
});

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;

export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

export type CartStoreActionsType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
};