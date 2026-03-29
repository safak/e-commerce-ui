import ProductInteraction from "@/components/ProductInteraction";
import { ProductType } from "@repo/types";
import Image from "next/image";
import React from "react";

const fetchProduct = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/${id}`,
  );
  const data: ProductType = await res.json();
  return data;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const product = await fetchProduct(id);

  return {
    title: product.name,
    description: product.description,
  };
};

const ProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const product = await fetchProduct(id);
  const productImages = (product.images ?? {}) as Record<string, string>;
  const productImage = productImages[id] || Object.values(productImages)[0] || "";

  return (
    <div className="mt-12 flex flex-col gap-4 md:gap-12 lg:flex-row">
      <div className="relative aspect-[2/3] w-full lg:w-5/12">
        {productImage ? (
          <Image
            src={productImage}
            alt={product.name}
            fill
            className="rounded-md object-contain"
          />
        ) : (
          <div className="flex h-full items-center justify-center rounded-md bg-gray-50 text-sm text-gray-400">
            No image
          </div>
        )}
      </div>

      <div className="w-full lg:w-7/12">
        <h1 className="text-2xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <h2 className="text-2xl font-semibold">${product.price.toFixed(2)}</h2>
        <ProductInteraction product={product} />

        <div className="mt-4 flex items-center gap-2">
          <Image
            src="/klarna.png"
            alt="klarna"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src="/cards.png"
            alt="cards"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src="/stripe.png"
            alt="stripe"
            width={50}
            height={25}
            className="rounded-md"
          />
        </div>

        <p className="text-xs text-gray-500">
          By clicking Pay Now, you agree to our{" "}
          <span className="cursor-pointer underline hover:text-black">
            Terms & Conditions
          </span>{" "}
          and{" "}
          <span className="cursor-pointer underline hover:text-black">
            Privacy Policy
          </span>
          . You authorize us to charge your selected payment method for the
          total amount shown. All sales are subject to our return and{" "}
          <span className="cursor-pointer underline hover:text-black">
            Refund Policies
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
