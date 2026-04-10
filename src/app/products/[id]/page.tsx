import ProductInteraction from "@/components/ProductInteraction";
import { ProductType } from "@repo/types";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";

// TEMPORARY
// const product: ProductType = {
//   id: 1,
//   name: "Adidas CoreFit T-Shirt",
//   shortDescription:
//     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//   description:
//     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//   price: 59.9,
//   sizes: ["xs", "s", "m", "l", "xl"],
//   colors: ["gray", "purple", "green"],
//   images: {
//     gray: "/products/1g.png",
//     purple: "/products/1p.png",
//     green: "/products/1gr.png",
//   },
//   categorySlug: "test",
//   createdAt: new Date(),
//   updatedAt: new Date(),
// };

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
    describe: product.description,
  };
};

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color: string; size: string }>;
}) => {
  const { size, color } = await searchParams;
  const { id } = await params;

  const [product, user] = await Promise.all([fetchProduct(id), currentUser()]);

  if (!product) {
    return (
      <div className="mt-12 text-center text-gray-500">Product not found.</div>
    );
  }

  const userSize = (
    user?.publicMetadata as { sizeProfile?: { shoeSize?: number } }
  )?.sizeProfile?.shoeSize;

  function getRecommendedSize(userSize: number | undefined, sizes: string[]) {
    if (!userSize) return null;
    const numericSizes = sizes.map(Number);
    const closest = numericSizes.reduce((prev, curr) =>
      Math.abs(curr - userSize) < Math.abs(prev - userSize) ? curr : prev,
    );
    return Math.abs(closest - userSize) > 1 ? null : closest;
  }

  const recommendedSize = getRecommendedSize(userSize, product.sizes);
  const selectedSize = size || recommendedSize?.toString() || product.sizes[0]!;
  const selectedColor = color || product.colors[0]!;
  return (
    <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">
      {/* IMAGE */}
      <div className="w-full lg:w-5/12 relative aspect-[2/3]">
        <Image
          src={
            (product.images as Record<string, string>)?.[selectedColor] || ""
          }
          alt={product.name}
          fill
          className="object-contain rounded-md"
        />
      </div>
      {/* DETAILS */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        <h1 className="text-2xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <h2 className="text-2xl font-semibold">${product.price.toFixed(2)}</h2>
        <ProductInteraction
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          recommendedSize={recommendedSize}
        />
        {/* CARD INFO */}
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
        <p className="text-gray-500 text-xs">
          By clicking Pay Now, you agree to our{" "}
          <span className="underline hover:text-black">Terms & Conditions</span>{" "}
          and <span className="underline hover:text-black">Privacy Policy</span>
          . You authorize us to charge your selected payment method for the
          total amount shown. All sales are subject to our return and{" "}
          <span className="underline hover:text-black">Refund Policies</span>.
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
