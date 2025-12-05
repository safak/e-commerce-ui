import Image from "next/image"
import ProductList from "./components/ProductList"

const Homepage = () => {
  return (
    <div className="">
      <div className="relative aspect-[3/1] mb-12">
        <Image  src="/featured.png" alt="featured Product" fill className="object-cover"/>
       </div>
       <ProductList />
    </div>
  )
}

export default Homepage