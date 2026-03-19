import ProductList from "@/components/ProductList";
import React from "react";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const params = await searchParams;
  return (
    <div>
      <ProductList category={params.category} params="products" />
    </div>
  );
};

export default ProductsPage;
