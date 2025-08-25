import Image from "next/image"

const Homepage = () => {
  return (
    <div className="">
      
      <div className="aspect-[3/1] mb-12 relative">
        <Image src="/featured.png" alt="featured" fill />
      </div>
    </div>
  )
}

export default Homepage