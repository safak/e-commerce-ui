"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

// 种类数据
const categories = [{ name: "Electronics", icon: "📱", slug: "phone" }];

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const selectedCategory = searchParams.get("category");

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value || "all");
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 bg-gray-100 p-2 rounded-lg mb-4 text-sm">
      {categories.map((category) => (
        <div
          key={category.name}
          className={`flex items-center justify-center gap-2 cursor-pointer px-2 py-1 rounded-md ${
            selectedCategory === category.slug ? "bg-white" : "text-gray-500"
          }`}
        >
          {category.icon}
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
