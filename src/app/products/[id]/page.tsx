import React from "react";
import Image from "next/image";
import ProductInteraction from "@/components/ProductInteraction";

// mock data
const product = {
  id: 1,
  name: "iPhone 13 Pro",
  shortDescription: "The latest iPhone with A15 Bionic chip",
  description:
    "The iPhone 13 Pro features a 6.1-inch Super Retina XDR display, A15 Bionic chip, Pro camera system with Night mode, and up to 22 hours of battery life.",
  price: 999,
  images: {
    0: "/products/1g.png",
    1: "/products/1p.png",
    2: "/products/1gr.png",
  },
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // TODO: get the product from db
  // TEMPORARY (这里使用的是你之前定义的 product mock 数据)
  return {
    title: product.name,
    description: product.description,
  };
};

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">
      {/* 图片 */}
      <div className="w-full lg:w-5/12 relative aspect-[2/3]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain rounded-md"
        />
      </div>
      {/* 细节 */}
      <div className="w-full lg:w-7/12">
        <h1 className="text-2xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <h2 className="text-2xl font-semibold">${product.price.toFixed(2)}</h2>
        <ProductInteraction product={product} />
        {/* 银行卡信息 */}
        <div className="flex items-center gap-2 mt-4">
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
        {/* 隐私条款 */}
        <p className="text-gray-500 text-xs">
          By clicking Pay Now, you agree to our{" "}
          <span className="underline hover:text-black cursor-pointer">
            Terms & Conditions
          </span>{" "}
          and{" "}
          <span className="underline hover:text-black cursor-pointer">
            Privacy Policy
          </span>
          . You authorize us to charge your selected payment method for the
          total amount shown. All sales are subject to our return and{" "}
          <span className="underline hover:text-black cursor-pointer">
            Refund Policies
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
