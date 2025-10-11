import ProductInteraction from "@/components/ProductInteraction";
import { ProductType } from "@/types";
import Image from "next/image";
import { title } from "process";


//Temporary data
const product : ProductType ={
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
}

export const generateMetadata = async ({params}:{params: {id:string}})=>{
    //todo: fetch product data from database
    //temporary
    return{
        title: product.name,
        description:product.description,
    }
}

const ProductPage = async ({param, searchParams}:{param: Promise<{id:string}> ;searchParams:Promise<{color:string ; size:string}>})=>{

    const {size, color} = await searchParams

    const selectedSize = (size || product.sizes[0] as string)
    const selectedColor = (color || product.colors[0] as string)
    return (
        <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">
            {/* Image */}
            <div className="w-full lg:w-5/12 relative aspect-[2/3]">
                <Image src={product.images[selectedColor]} alt={product.name} fill className="object-contain rounded-md"/>
            </div>
            {/* Details */}
            <div className="w-full lg:w-7/12 flex flex-col gap-4">
                <h1 className="text-2xl font-medium">{product.name}</h1>
                <p className="text-gray-500">{product.description}</p>
                <h2 className="text-2xl font-semibold">${product.price.toFixed(2)}</h2>

                <ProductInteraction product={product} selectedSize={selectedSize} selectedColor={selectedColor} />

                {/* Card Info */}
                <div className="flex items-center gap-2 mt-4">
                    <Image src="/klarna.png" alt="klarna" width={50} height={25} className="rounded-md"/>
                          <Image src="/cards.png" alt="cards" width={50} height={25} className="rounded-md"/>
                          <Image src="/stripe.png" alt="stripe" width={50} height={25} className="rounded-md"/>
                </div>

                <p className="text-gray-500 text-xs">
                    by completing your purchase you agree to our Terms of 
                    Service and Privacy Policy 
                    you authorize us to charge your card or other payment method 
                    for this purchase and future purchases according to our terms. 
                    You agree that you are responsible for any additional fees 
                    imposed by your bank or card issuer.
                </p>
            </div>
        </div>
    )
}

export default ProductPage;