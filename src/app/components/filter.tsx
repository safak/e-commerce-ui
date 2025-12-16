"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
const Filter = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    {/* we have to create a new search params , and set a new key and push the url to the nextjs router */}
    const handleFilter = (value: string) => {
        const params =new URLSearchParams(searchParams)
        params.set("category", value );
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }
    return (
        <div className="flex items-center justify-end gap-2 text-sm text-gray-500 my-6">
            <span>Sorted by:</span>
             <select name="sort" id="sort" className="ring ring-gray-300 shadow-lg rounded-md px-2 py-1" onChange={(e)=>handleFilter(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
             </select>
        </div>
    )
}
export default Filter