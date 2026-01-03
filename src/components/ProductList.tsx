import { ProductsType } from "@/types";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Link from "next/link";
// TEMPORARY 

const products: ProductsType = [
  {
    id: 1,
    name: "Adidas CoreFit T-shirt",
    shortDescription: "CoreFit T-shirt from Adidas",
    description: "High-quality CoreFit T-shirt from Adidas",
    price: 39.9,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Gray", "Purple", "Green"],
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
    colors: ["Black", "White", "Red"],
    images: {
      black: "/products/2b.png",
      white: "/products/2w.png",
      red: "/products/2r.png",
    },
  },
  {
    id: 3,
    name: "Puma Future Rider Hoodie",
    shortDescription: "Future Rider Hoodie from Puma",
    description: "High-quality Future Rider Hoodie from Puma",
    price: 49.9,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Green", "Yellow"],
    images: {
      blue: "/products/3bl.png",
      green: "/products/3g.png",
      yellow: "/products/3y.png",
    },
  },
  {
    id: 4,
    name: "Reebok Classic T-shirt",
    shortDescription: "Classic T-shirt from Reebok",
    description: "High-quality Classic T-shirt from Reebok",
    price: 29.9,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gray", "Black", "White"],
    images: {
      gray: "/products/4g.png",
      black: "/products/4b.png",
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
    colors: ["Black", "White", "Red"],
    images: {
      black: "/products/5b.png",
      white: "/products/5w.png",
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
    colors: ["Blue", "Green", "Yellow"],
    images: {
      blue: "/products/6bl.png",
      green: "/products/6g.png",
      yellow: "/products/6y.png",
    },
  },
  {
    id: 7,
    name: "Puma Suede Hoodie",
    shortDescription: "Suede Hoodie from Puma",
    description: "High-quality Suede Hoodie from Puma",
    price: 59.9,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Red"],
    images: {
      black: "/products/7b.png",
      white: "/products/7w.png",
      red: "/products/7r.png",
    },
  },
  {
    id: 8,
    name: "Reebok Speed T-shirt",
    shortDescription: "Speed T-shirt from Reebok",
    description: "High-quality Speed T-shirt from Reebok",
    price: 29.9,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gray", "Black", "White"],
    images: {
      gray: "/products/8g.png",
      black: "/products/8b.png",
      white: "/products/8w.png",
    },
  },
];

const ProductList = ({category}: {category:string}) => {
  return (
    <div className="w-full">
      <Categories />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link href={category ? `/products?category=${category}` : "/products"} className=" flex justify-end mt-4 underline text-sm text-gray-500 ">View all products </Link>
    </div>
  )
}

export default ProductList;