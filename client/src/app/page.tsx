import ProductList from "@/components/ProductList";
import Image from "next/image";

const Homepage = () => {
  return (
    <div className="">
      <div className="relative aspect-[3/1]">
        <Image
          src="/grand_seiko_banner.webp"
          alt="ساعت گرند سیکو"
          fill
          className="object-cover -"
        />
      </div>
      <ProductList />
    </div>
  );
};

export default Homepage;
