"use client"

import { useSearchParams,useRouter,usePathname } from "next/navigation"
import {Glasses ,Shirt ,Briefcase ,ShoppingBasket ,Hand ,Venus} from "lucide-react"
const categories = [
    {
        name: "All",
        icon: <ShoppingBasket  className="w-4 h-4"/>,
        slug: "all"
    },
    
    {
        name: "T-shirts",
        icon: <Shirt  className="w-4 h-4"/>,
        slug: "shirts"
    },
    
    {       
        name: "Shoes",
        icon: <Briefcase  className="w-4 h-4"/>,
        slug: "shoes"
    },
    {
        name: "Glasses",
        icon: <Glasses  className="w-4 h-4"/>,
        slug: "glasses"
    },
    
    {
        name: "Handbags",
        icon: <Hand  className="w-4 h-4"/>,
        slug: "handbags"
    },     
    {
        name: "Jewelry",
        icon: <Venus  className="w-4 h-4"/>,
        slug: "jewelry"
    },
    
    
    
    
    
]

const Categories = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const selectedCategory = searchParams.get("category")
    const handleChange = (value: string) => {
        const params = new URLSearchParams(searchParams)
        if (value === "all") {
            params.delete("category")
        } else {
            params.set("category", value)
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-4 bg-gray-100 p-4 rounded-lg mb-4 text-sm">
           {categories.map(category=>(
            <div  
                className={`flex items-center justify-center gap-2 cursor-pointer px-2 py-1 rounded-md transition-colors ${
                    (category.slug === "all" && !selectedCategory) || category.slug === selectedCategory 
                        ? "bg-white text-gray-900" 
                        : "text-gray-600"
                }`} 
                key={category.name}
                onClick={()=>handleChange(category.slug)}
            >
                {category.icon}
                {category.name}
           </div>))}
        </div>
    )
}

export default Categories