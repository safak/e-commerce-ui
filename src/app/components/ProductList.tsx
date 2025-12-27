import { ProductsType } from "../types"
import Categories from "./Categories"
import ProductCard from "./ProductCard"
import Link from "next/link"
import Filter from "./filter"
//Temporary Data    
 const products: ProductsType = [              
    {
        id: 1,
        name: "Addidas Core fit T-shirt",
        shortDescription: "A comfortable and stylish t-shirt for everyday wear",
        Description: "This is a comfortable and stylish t-shirt for everyday wear. It is made of 100% cotton and is very soft and comfortable to wear. It is a great t-shirt for everyday wear.",
        price: 100,
        sizes: "S, M, L, XL, XXL",
        color: "gray,orange, Green",
        quantity: 1,
        selectedSize: "S",
        selectedColor: "gray",
        images: [ "/products/1g.png", "/products/1gr.png", "/products/1p.png" ],    
    },
    
    {
        id: 2,
        name: "Nike Air Max 270",
        shortDescription: "A comfortable and stylish t-shirt for everyday wear",
        Description: "This is a comfortable and stylish t-shirt for everyday wear. It is made of 100% cotton and is very soft and comfortable to wear. It is a great t-shirt for everyday wear.",
        price: 200,
        sizes: "S, M, L, XL, XXL",
        color: "Green,Gray",
        quantity: 1,
        selectedSize: "S",
        selectedColor: "gray",
        images: [ "/products/2g.png", "/products/2gr.png" ],
    },
    {
        id: 3,
        name: "Puma RS-X 2.0",
        shortDescription: "A comfortable and stylish t-shirt for everyday wear",
        Description: "This is a comfortable and stylish t-shirt for everyday wear. It is made of 100% cotton and is very soft and comfortable to wear. It is a great t-shirt for everyday wear.",
        price: 300,
        sizes: "S, M, L, XL, XXL",
        color: "Red, Blue, Green, Yellow",
        quantity: 1,
        selectedSize: "S",
        selectedColor: "gray",
        images: [ "/products/3b.png", "/products/3bl.png", "/products/3gr.png" ],
    },
    
    {
        id: 4,
        name: "Product 4",
        price: 400, shortDescription: "A comfortable and stylish t-shirt for everyday wear",
        Description: "This is a comfortable and stylish t-shirt for everyday wear. It is made of 100% cotton and is very soft and comfortable to wear. It is a great t-shirt for everyday wear.",
        sizes: "S, M, L, XL, XXL",
        color: "Red, Blue, Green, Yellow",
        quantity: 1,
        selectedSize: "S",
        selectedColor: "gray",
        images: [ "/products/4p.png", "/products/4w.png" ],
        
    },
    
    {
        id: 5,
        name: "Product 5",
        price: 500, shortDescription: "A comfortable and stylish t-shirt for everyday wear",
        Description: "This is a comfortable and stylish t-shirt for everyday wear. It is made of 100% cotton and is very soft and comfortable to wear. It is a great t-shirt for everyday wear.",
        sizes: "S, M, L, XL, XXL",
        color: "Red, Blue, Green, Yellow",
        quantity: 1,
        selectedSize: "S",
        selectedColor: "gray",
        images: [ "/products/5bl.png", "/products/5o.png", "/products/5r.png" ],
    },
    
    {   
        id: 6,
        name: "Product 6",
        price: 600, shortDescription: "A comfortable and stylish t-shirt for everyday wear",
        Description: "This is a comfortable and stylish t-shirt for everyday wear. It is made of 100% cotton and is very soft and comfortable to wear. It is a great t-shirt for everyday wear.",
        sizes: "S, M, L, XL, XXL",
        color: "Red, Blue, Green, Yellow",
        quantity: 1,
        selectedSize: "S",
        selectedColor: "gray",
        images: [ "/products/6g.png", "/products/6w.png" ],
        
    },
    
    
    {                   
        id: 7,
        name: "Product 7",
        price: 700,
        shortDescription: "A comfortable and stylish t-shirt for everyday wear",
        Description: "This is a comfortable and stylish t-shirt for everyday wear. It is made of 100% cotton and is very soft and comfortable to wear. It is a great t-shirt for everyday wear.",
        sizes: "S, M, L, XL, XXL",
        color: "Red, Blue, Green, Yellow",
        quantity: 1,
        selectedSize: "S",
        selectedColor: "gray",
            images: [ "/products/7g.png", "/products/7p.png" ],
        
               
    },
    
    
]

const ProductList = ({category,params}: {category?: string | null , params?: string}) => {
    return (
        <div className="w-full">
            <Categories />
            {params === "productsPage"&& <Filter />}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <Link href={ category ? `/products?category=${category}` : "/products"} className="flex justify-end mt-4 text-sm text-gray-500 underline">View All Products</Link>
        </div>  
    )
}

export default ProductList