'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  Footprints,
  Glasses,
  Briefcase,
  Shirt,
  ShoppingBasket,
  Hand,
  Venus,
} from "lucide-react";

const categories = [
  {
    name: "All",
    icon: <ShoppingBasket className="w-4 h-4" />,
    slug: "all"
  },
  {
    name: "T-shirts",
    icon: <Shirt className="w-4 h-4" />,
    slug: "t-shirts"
  },
  {
    name: "Shoes",
    icon: <Footprints className="w-4 h-4" />,
    slug: "shoes"
  },
  {
    name: "Accessories",
    icon: <Glasses className="w-4 h-4" />,
    slug: "accessories"
  },
  {
    name: "Bags",
    icon: <Briefcase className="w-4 h-4" />,
    slug: "bags"
  },
  {
    name: "Dresses",
    icon: <Venus className="w-4 h-4" />,
    slug: "dresses"
  },
  {
    name: "Gloves",
    icon: <Hand className="w-4 h-4" />,
    slug: "gloves"
  },
  {
    name: "Jackets",
    icon: <Shirt className="w-4 h-4" />,
    slug: "jackets"
  },
];

const Categories = () => {
  const searchParams = useSearchParams();
  // returns the current params inside URL
  const router = useRouter();
  // to navigate and push path to URL
  const pathname = usePathname();
  // return the current URL path
  
  const selectedCategory = searchParams.get("category");
    // return the value of category {category: value}
    
    
    /* handle the change on categories*/
  const handleChange = (value:string | null) => {
    const params = new URLSearchParams(searchParams);
    // creating a copy of the current params or searchParams  variable to set a new params depending on what category we are selecting
    params.set("category", value || "all");
    // set a new param by writing a key and it's value 
    
    router.push(`${pathname}?${params.toString()}`, { scroll:false });
    // push new URL path and params to the browser 
     /* why to string? */
     
  }
 
  return (
    <div className={`
    grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8 bg-gray-100 p-2 rounded-lg mb-4 text-sm
    
    or
    flex flex-wrap but its not great 
    `}> {/* How did the color become black in selectedCategory? */}
      {categories.map(category => (
        <div className={`flex items-center justify-center gap-2 cursor-pointer px-2 py-1 rounded-md
        ${category.slug === selectedCategory ? "bg-white" : "text-gray-500"}`} 
        key={category.slug}
        onClick={() => handleChange(category.slug)}
        >
          {category.icon}
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;