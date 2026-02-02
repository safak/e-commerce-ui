import { Search } from "lucide-react"

const SearchBar = () => {
  return (
    <div className="hidden sm:flex items-center gap-2 rounded-md ring-1 ring-gray-200 px-2 py-1 shadow-md ">
      {/*
      icons from Lucide
      1- 'Lucide.dev/icons/' 
      2- search for "search icon' 
      3- copy jsx or Guid then Open Link in New Tab
      4- Installation pnpm install lucide-react
      5- new terminal then paste the previous pnpm code
      6- now xopy the jsx code from Lucide and paste ot here it will be "<Search />"
      */}
      <Search className="w-4 h-4 text-gray-600" />
      <input id="search" placeholder="Search..." className=" text-sm outline-0" />
      
    </div>
  )
}
export default SearchBar;