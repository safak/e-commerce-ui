import Categories from "@/components/Categories"
import Image from "next/image"

const Homepage = () => {
  return (
    <div>
    <div className=' relative aspect-[3/1] mb-12'>
      <Image src={'/featured.png'} alt="featured image" fill />
      
    </div>
    <Categories />
    </div>
  )
}

export default Homepage