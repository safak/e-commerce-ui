"use client";

import { loadStripe } from "@stripe/stripe-js";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { CartItemsType, ShippingFormInputs } from "@repo/types";

import useCartStore from "@/stores/cartStore";
import React from "react";
import CheckoutForm from "./CheckoutForm";

const stripe = loadStripe(
  "pk_test_51TEmr8QVis6G45GjpuAnwX62PkjYPRFtcKJ6lpeu9XpRY0sN1PvtYEVggu4Ll9BUHDvm6iR1HVZl1ro3QmspMhfG00ygTiSPEF",
);

// 调用后端接口创建 Stripe Checkout Session，并获取 client_secret，用于前端初始化支付流程
const fetchClientSecret = async (cart: CartItemsType, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
    {
      method: "POST",
      body: JSON.stringify({
        cart,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      typeof json?.message === "string"
        ? json.message
        : "Failed to initialize payment.",
    );
  }

  if (!json?.checkoutSessionClientSecret) {
    throw new Error("Stripe client secret was not returned.");
  }

  return json.checkoutSessionClientSecret;
};

const StripePaymentForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const { cart } = useCartStore();
  const [token, setToken] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => setToken(token));
  }, []);

  useEffect(() => {
    if (!token || cart.length === 0) return;

    let cancelled = false;

    const initializeCheckout = async () => {
      try {
        setError(null);
        const secret = await fetchClientSecret(cart, token);

        if (!cancelled) {
          setClientSecret(secret);
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to initialize payment.",
          );
        }
      }
    };

    initializeCheckout();

    return () => {
      cancelled = true;
    };
  }, [cart, token]);

  if (!token) {
    return <div className="">Loading...</div>;
  }

  if (error) {
    return <div className="text-sm text-red-500">{error}</div>;
  }

  if (!clientSecret) {
    return <div className="">Loading payment form...</div>;
  }

  return (
    <CheckoutProvider
      stripe={stripe}
      options={{ fetchClientSecret: async () => clientSecret }}
    >
      <CheckoutForm shippingForm={shippingForm} />
    </CheckoutProvider>
  );
};

export default StripePaymentForm;
