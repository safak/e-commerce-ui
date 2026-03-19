"use client";

import React, { useState } from "react";

type ShippingFormValues = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
};

type ShippingFormProps = {
  onSubmit?: (values: ShippingFormValues) => void;
};

const ShippingForm = ({ onSubmit }: ShippingFormProps) => {
  const [formValues, setFormValues] = useState<ShippingFormValues>({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(formValues);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formValues.fullName}
          onChange={handleChange}
          className="rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-gray-400"
          placeholder="John Doe"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          className="rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-gray-400"
          placeholder="john@example.com"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="address" className="text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          value={formValues.address}
          onChange={handleChange}
          className="rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-gray-400"
          placeholder="123 Main Street"
          required
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="city" className="text-sm font-medium text-gray-700">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={formValues.city}
            onChange={handleChange}
            className="rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-gray-400"
            placeholder="Shanghai"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="postalCode"
            className="text-sm font-medium text-gray-700"
          >
            Postal Code
          </label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            value={formValues.postalCode}
            onChange={handleChange}
            className="rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-gray-400"
            placeholder="200000"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-2 rounded-lg bg-gray-800 p-3 text-white transition-all duration-300 hover:bg-gray-900"
      >
        Continue to Payment
      </button>
    </form>
  );
};

export default ShippingForm;
