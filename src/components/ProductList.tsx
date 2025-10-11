import { ProductsType } from "@/types"
import Categories from "./Categories"
import ProductCard from "./ProductCard"
import Link from "next/link"
import Filter from "./Filter"

const products:ProductsType = [
    {
        id:1,
        name:"Product 1",
        shortDescription:"This is product 1",
        description:"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price:9.99,
        sizes:["S","M","L","XL"],
        colors:["gray","purple","green"],
        images:{
            gray:"/products/1g.png",
            purple:"/products/1p.png",
            green:"/products/1gr.png"
        },
    },

    {
        id:2,
        name:"Product 2",
        shortDescription:"This is product 2",
        description:"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price:19.99,
        sizes:["S","M","L","XL"],
        colors:["gray","green"],
        images:{
            gray:"/products/2g.png",
            green:"/products/2gr.png"
        },
    },

    {
        id:3,
        name:"Product 3",
        shortDescription:"This is product 3",
        description:"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price:29.99,
        sizes:["S","M","L","XL"],
        colors:["green","black","blue"],
        images:{
            green:"/products/3gr.png",
            black:"/products/3bl.png",
            blue:"/products/3b.png"
        },
    },

    {
        id:4,
        name:"Product 4",
        shortDescription:"This is product 4",
        description:"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price:39.99,
        sizes:["S","M","L","XL"],
        colors:["white","purple"],
        images:{
            purple:"/products/4p.png",
            white:"/products/4w.png",
            
        },
    },


    {
        id:5,
        name:"Product 5",
        shortDescription:"This is product 5",
        description:"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price:49.99,
        sizes:["S","M","L","XL"],
        colors:["orange","red","balck"],
        images:{
            orange:"/products/5o.png",
            red:"/products/5r.png",
            black:"/products/5bl.png",
            
        },
    },

    {
        id:6,
        name:"Product 6",
        shortDescription:"This is product 6",
        description:"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price:59.99,
        sizes:["S","M","L","XL"],
        colors:["gray","white"],
        images:{
            gray:"/products/6g.png",
            white:"/products/6w.png",
        },
    },


    {
        id:7,
        name:"Product 7",
        shortDescription:"This is product 7",
        description:"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price:69.99,
        sizes:["S","M","L","XL"],
        colors:["gray","purple"],
        images:{
            gray:"/products/7g.png",
            purple:"/products/7p.png",
        },
    },

    {
        id:8,
        name:"Product 8",
        shortDescription:"This is product 8",
        description:"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price:79.99,
        sizes:["S","M","L","XL"],
        colors:["black","green"],
        images:{
            black:"/products/8b.png",
            green:"/products/8gr.png",
        },
    }
]


const ProductList = ({category, params}:{category:string ,params:"homePage" | "products"}) => {
  return (
    <div className="w-full">
        <Categories />
        {params === "products" && <Filter />}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
            {products.map(product=>(
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
        <Link href={category? `/products/?category=${category}` : "/products"}
        className="flex justify-end mt-4 underline text-sm text-gray-500">View all products</Link>
    </div>
  )
}
export default ProductList