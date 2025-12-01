import {Search} from "lucide-react"
const Searchbar = () => {
  return (

    <div className="flex items-center justify-center rounded-md ring-1 ring-gray-200 p-2  shadow-md">
        <Search className="w-4 h-4 text-gray-500 "  />
    <input  id="search" name="search" type="text" placeholder="Search..." className=" hidden md:block text-sm w-full outline-none bg-transparent ml-2" />
    </div>
    
  )
}

export default Searchbar