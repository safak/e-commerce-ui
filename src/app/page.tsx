import ProductList from "@/components/ProductList"
import Image from "next/image"

const Homepage = async({searchParams}:{searchParams:Promise<{category:string}>;}) => {
  
  const category = (await searchParams).category;
  return (
    
    <div className="">
      
      <div className="aspect-[3/1] mb-12 relative">
        <Image src="/featured.png" alt="featured" fill />
      </div>
      <ProductList category={category} params="homePage" />
    </div>
  )
}

export default Homepage