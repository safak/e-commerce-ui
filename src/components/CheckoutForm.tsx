"use client";

import { ShippingFormInputs } from "@repo/types";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js";
import React from "react";
import { FormEvent, useState } from "react";

const CheckoutForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const checkout = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await checkout.updateEmail(shippingForm.email);
      await checkout.updateShippingAddress({
        name: shippingForm.name,
        address: {
          line1: shippingForm.address,
          city: shippingForm.city,
          country: "US",
        },
      });

      const res = await checkout.confirm();
      if (res.type === "error") {
        setError(res.error.message);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Payment confirmation failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleClick}>
      <PaymentElement options={{ layout: "accordion" }} />
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Pay"}
      </button>
      {error && <div className="">{error}</div>}
    </form>
  );
};

export default CheckoutForm;
