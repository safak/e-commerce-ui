import { ProductsType } from "@/types";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Filter from "./Filter";

// TEMPORARY
const products: ProductsType = [
  {
    id: 1,
    name: "Veste en Laine Dar Yassou - Édition Jasmin Paris",
    shortDescription:
      "",
    description:
      "La Veste en Laine Dar Yassou – Édition Jasmin Paris incarne l’élégance douce et intemporelle propre à l’univers Dar Yassou. Inspirée par le charme vintage et la féminité naturelle, cette veste allie structure élégante et confort enveloppant. Dotée de larges épaules structurées, d’un col haut raffiné et de manches longues, elle dessine une silhouette affirmée tout en restant délicate. Sa fermeture à boutons renforce son style chic et authentique, parfait pour la saison automnale. Pensée pour un style décontracté chic, cette veste se porte aussi bien au quotidien que pour des occasions plus habillées, apportant une touche de caractère tout en douceur.",
    price: 39.9,
    sizes: ["s", "m", "l", "xl", "xxl"],
    colors: ["gray", "yellow"],
    images: {
      gray: "/products/1g.png",
      yellow: "/products/1y.png",
    },
    colorStripe:{
      gray: "https://buy.stripe.com/5kQ9AS9utf4daqteiMaZi02",
      yellow :"https://buy.stripe.com/cNieVc365f4d9mpdeIaZi01"
    }

  },
  // {
  //   id: 2,
  //   name: "Puma Ultra Warm Zip",
  //   shortDescription:
  //     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  //   description:
  //     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  //   price: 59.9,
  //   sizes: ["s", "m", "l", "xl"],
  //   colors: ["gray", "green"],
  //   images: { gray: "/products/2g.png", green: "/products/2gr.png" },
  // },
  // {
  //   id: 3,
  //   name: "Nike Air Essentials Pullover",
  //   shortDescription:
  //     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  //   description:
  //     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  //   price: 69.9,
  //   sizes: ["s", "m", "l"],
  //   colors: ["green", "blue", "black"],
  //   images: {
  //     green: "/products/3gr.png",
  //     blue: "/products/3b.png",
  //     black: "/products/3bl.png",
  //   },
  // },
  // {
  //   id: 4,
  //   name: "Nike Dri Flex T-Shirt",
  //   shortDescription:
  //     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  //   description:
  //     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  //   price: 29.9,
  //   sizes: ["s", "m", "l"],
  //   colors: ["white", "pink"],
  //   images: { white: "/products/4w.png", pink: "/products/4p.png" },
  // },
  // {
  //   id: 5,
  //   name: "Under Armour StormFleece",
  //   shortDescription:
  //     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  //   description:
  //     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  //   price: 49.9,
  //   sizes: ["s", "m", "l"],
  //   colors: ["red", "orange", "black"],
  //   images: {
  //     red: "/products/5r.png",
  //     orange: "/products/5o.png",
  //     black: "/products/5bl.png",
  //   },
  // },
  // {
  //   id: 6,
  //   name: "Nike Air Max 270",
  //   shortDescription:
  //     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  //   description:
  //     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  //   price: 59.9,
  //   sizes: ["40", "42", "43", "44"],
  //   colors: ["gray", "white"],
  //   images: { gray: "/products/6g.png", white: "/products/6w.png" },
  // },
  // {
  //   id: 7,
  //   name: "Nike Ultraboost Pulse ",
  //   shortDescription:
  //     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  //   description:
  //     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  //   price: 69.9,
  //   sizes: ["40", "42", "43"],
  //   colors: ["gray", "pink"],
  //   images: { gray: "/products/7g.png", pink: "/products/7p.png" },
  // },
  // {
  //   id: 8,
  //   name: "Levi’s Classic Denim",
  //   shortDescription:
  //     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  //   description:
  //     "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
  //   price: 59.9,
  //   sizes: ["s", "m", "l"],
  //   colors: ["blue", "green"],
  //   images: { blue: "/products/8b.png", green: "/products/8gr.png" },
  // },
];

const ProductList = ({ category,params }: { category: string, params:"homepage" | "products" }) => {
  return (
    <div className="w-full">
      {/* <Categories /> */}
      {params === "products" && <Filter/>}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* <Link
        href={category ? `/products/?category=${category}` : "/products"}
        className="flex justify-end mt-4 underline text-sm text-[#64113F]"
      >
        View all products
      </Link> */}
    </div>
  );
};

export default ProductList;
