"use client";

import { ShippingFormInputs, shippingFormSchema } from "@repo/types";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ShippingForm = ({
  setShippingForm,
}: {
  setShippingForm: (data: ShippingFormInputs) => void;
}) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ShippingFormInputs>();

  const router = useRouter();

  const handleShippingForm: SubmitHandler<ShippingFormInputs> = (data) => {
    clearErrors();

    const result = shippingFormSchema.safeParse(data);

    if (!result.success) {
      for (const issue of result.error.issues) {
        const fieldName = issue.path[0];

        if (typeof fieldName === "string") {
          setError(fieldName as keyof ShippingFormInputs, {
            type: "manual",
            message: issue.message,
          });
        }
      }

      return;
    }

    setShippingForm(result.data);
    router.push("/cart?step=3", { scroll: false });
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleShippingForm)}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-xs font-medium text-gray-500">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="border-b border-gray-200 py-2 text-sm outline-none"
          placeholder="John Doe"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-xs font-medium text-gray-500">
          Phone
        </label>
        <input
          type="text"
          id="phone"
          className="border-b border-gray-200 py-2 text-sm outline-none"
          placeholder="1234567890"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="text-xs font-medium text-gray-500">
          Address
        </label>
        <input
          type="text"
          id="address"
          className="border-b border-gray-200 py-2 text-sm outline-none"
          placeholder="123 Abbey Road"
          {...register("address")}
        />
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="text-xs font-medium text-gray-500">
          City
        </label>
        <input
          type="text"
          id="city"
          className="border-b border-gray-200 py-2 text-sm outline-none"
          placeholder="New York"
          {...register("city")}
        />
        {errors.city && (
          <p className="text-sm text-red-500">{errors.city.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-800 p-2 text-white transition-all duration-300 hover:bg-gray-900"
      >
        Continue
        <ArrowRight className="h-3 w-3" />
      </button>
    </form>
  );
};

export default ShippingForm;
