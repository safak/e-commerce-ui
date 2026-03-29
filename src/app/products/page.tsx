import ProductList from "@/components/ProductList";
import React from "react";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string; sort: string; search: string }>;
}) => {
  const params = await searchParams;
  const category = params.category;
  const sort = params.sort;
  const search = params.search;

  return (
    <div>
      <ProductList
        category={category}
        sort={sort}
        search={search}
        params="products"
      />
    </div>
  );
};

export default ProductsPage;
