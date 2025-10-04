"use client"

import { Briefcase, Footprints, Glasses, Hand, Shirt, ShoppingBasket, Venus } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const Categories = () => {
  const categories = [
    {
      name: "All",
      icon: <ShoppingBasket className="w-4 h-4" />,
      slug: "all",
    },
    {
      name: "T-shirts",
      icon: <Shirt className="w-4 h-4" />,
      slug: "t-shirts",
    },
    {
      name: "Shoes",
      icon: <Footprints className="w-4 h-4" />,
      slug: "shoes",
    },
    {
      name: "Accessories",
      icon: <Glasses className="w-4 h-4" />,
      slug: "accessories",
    },
    {
      name: "Bags",
      icon: <Briefcase className="w-4 h-4" />,
      slug: "bags",
    },
    {
      name: "Dresses",
      icon: <Venus className="w-4 h-4" />,
      slug: "dresses",
    },
    {
      name: "Jackets",
      icon: <Shirt className="w-4 h-4" />,
      slug: "jackets",
    },
    {
      name: "Gloves",
      icon: <Hand className="w-4 h-4" />,
      slug: "gloves",
    },
  ];

  const searchParams = useSearchParams();
  const valueParam = searchParams.get("category");
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== "all") {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    
    router.push(`${pathname}?${params.toString()}`, {scroll: false});
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 bg-gray-100 p-2 rounded-lg mb-4 text-sm">
      {categories.map((category) => (
        <div 
          key={category.name} 
          className={`flex items-center justify-center gap-2 cursor-pointer p-2 rounded-md transition-colors ${
            (category.slug === valueParam || (category.slug === "all" && !valueParam)) 
              ? "bg-white text-black shadow-sm" 
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => handleClick(category.slug)}
        >
          {category.icon}
          {category.name}
        </div>
      ))}
    </div>
  );
}

export default Categories;