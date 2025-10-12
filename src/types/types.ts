import z from "zod";

export type ProductType = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
};

export type ProductsType = ProductType[];

export type CartItemType = ProductType & {
  quantity: number;
  selectedSize : string;
  selectedColor: string
}

export type CartsType = CartItemType[];

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  email: z.email().min(1, "Email is Required"),
  phone: z.string().min(1, "Number is Required").max(10, "Maximum number is 10").regex(/^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, "Input the right format of using number"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
})

export type ShoppingFormInput = z.infer<typeof shippingFormSchema>

export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card holder is required"),
  cardNumber: z
    .string()
    .min(16, "Card Number is required")
    .max(16, "Card Number is required"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Expiration date must be in MM/YY format"
    ),
  cvv: z.string().min(3, "CVV is required").max(3, "CVV is required"),
})

export type PaymentFormInput = z.infer<typeof paymentFormSchema>