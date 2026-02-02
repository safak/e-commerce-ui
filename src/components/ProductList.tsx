import { ProductsType } from "@/types";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Filter from "./Filter";
// TEMPORARY 

const products: ProductsType = [
  {
    id: 1,
    name: "Adidas CoreFit T-shirt",
    shortDescription: "CoreFit T-shirt from Adidas",
    description: "High-quality CoreFit T-shirt from Adidas",
    price: 39.9,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["gray", "purple", "green"],
    images: {
      gray: "/products/1g.png",
      purple: "/products/1p.png",
      green: "/products/1gr.png",
    },
  },
  {
    id: 2,
    name: "Nike Air Max Hoodie",
    shortDescription: "Air Max Hoodie from Nike",
    description: "High-quality Air Max Hoodie from Nike",
    price: 59.9,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["gray", "green"],
    images: {
      gray: "/products/2g.png",
      green: "/products/2gr.png",
    },
  },
  {
    id: 3,
    name: "Puma Future Rider Hoodie",
    shortDescription: "Future Rider Hoodie from Puma",
    description: "High-quality Future Rider Hoodie from Puma",
    price: 49.9,
    sizes: ["S", "M", "L", "XL"],
    colors: ["blue", "black"],
    images: {
      blue: "/products/3b.png",
      black: "/products/3bl.png",
    },
  },
  {
    id: 4,
    name: "Reebok Classic T-shirt",
    shortDescription: "Classic T-shirt from Reebok",
    description: "High-quality Classic T-shirt from Reebok",
    price: 29.9,
    sizes: ["S", "M", "L", "XL"],
    colors: ["pink",  "white"],
    images: {
      pink: "/products/4p.png",
      white: "/products/4w.png",
    },
  },
  {
    id: 5,
    name: "Adidas UltraBoost Hoodie",
    shortDescription: "UltraBoost Hoodie from Adidas",
    description: "High-quality UltraBoost Hoodie from Adidas",
    price: 69.9,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["black", "orange", "red"],
    images: {
      black: "/products/5bl.png",
      orange: "/products/5o.png",
      red: "/products/5r.png",
    },
  },
  {
    id: 6,
    name: "Nike Dri-FIT T-shirt",
    shortDescription: "Dri-FIT T-shirt from Nike",
    description: "High-quality Dri-FIT T-shirt from Nike",
    price: 39.9,
    sizes: ["S", "M", "L", "XL"],
    colors: ["green", "white"],
    images: { 
      green: "/products/6g.png",
      white: "/products/6w.png",
    },
  },
  {
    id: 7,
    name: "Puma Suede Hoodie",
    shortDescription: "Suede Hoodie from Puma",
    description: "High-quality Suede Hoodie from Puma",
    price: 59.9,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["green", "pink"],
    images: {
      green: "/products/7g.png",
      pink: "/products/7p.png",
    },
  },
  {
    id: 8,
    name: "Reebok Speed T-shirt",
    shortDescription: "Speed T-shirt from Reebok",
    description: "High-quality Speed T-shirt from Reebok",
    price: 29.9,
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "green"],
    images: { 
      black: "/products/8b.png",
      green: "/products/8gr.png",
    },
  },
];

const ProductList = ({category, params}: {category:string, params:"homepage" | "products"}) => {
  return (
    <div className="w-full">
      <Categories />
      {params === "products" && <Filter /> }
      <div className=" grid grid-cols-1 max-md:grid-cols-2 max-md:gap-x-2 max-md:gap-y-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-12">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link href={category ? `/products?category=${category}` : "/products"} className=" flex justify-end mt-4 underline text-sm text-gray-500 ">View all products </Link>
    </div>
  )
}

export default ProductList;