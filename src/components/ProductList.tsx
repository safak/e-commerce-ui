import { ProductType } from "@/types";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Categories from "./Categories";
import Filter from "./Filter";

const products: ProductType[] = [
  {
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
  },
];
const ProductList = ({
  category,
  params,
}: {
  category: string;
  params: "homepage" | "products";
}) => {
  return (
    <div className="w-full">
      <Categories />
      {params === "products" && <Filter />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
      <Link
        href={category ? `/products?category=${category}` : "/products"}
        className="flex justify-end mt-4 text-gray-500 text-sm hover:underline"
      >
        View all products
      </Link>
    </div>
  );
};

export default ProductList;
