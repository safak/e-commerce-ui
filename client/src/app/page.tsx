import ProductList from "@/components/ProductList";
import Image from "next/image";

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <div className="">
      <div className="relative aspect-[5/2] mb-12 overflow-hidden group rounded-[10px]">
        {/* Featured image */}
        <Image
          src="/featured.png"
          alt="Featured Product"
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Soft bottom shadow/gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f3e4e5]/70 via-transparent to-transparent pointer-events-none" />
      </div>

      <ProductList category={category} params="homepage" />
    </div>
  );
};

export default Homepage;
