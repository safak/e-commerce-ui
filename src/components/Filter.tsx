"use client"
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const Filter = () => {
    const searchParams = useSearchParams();
    // returns the current params inside URL
    const router = useRouter();
    // to navigate and push path to URL
    const pathname = usePathname();
    // return the current URL path

    const handleFilter = (value:string) => {
        const params = new URLSearchParams(searchParams);
        params.set("sort", value);
        router.push(`${pathname}?${params.toString()}`, { scroll:false });
    }
 
    return (
        <div className="flex items-center justify-end gap-2 text-sm tetx-gray-500 my-6">
            <span>Sort by:</span>
            <select name="sort" id="sort" className="ring-1 ring-gray-200 shdow-md p-1 rounded-sm" onChange={(e) => handleFilter(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
            </select>
        </div>
    )
}
export default Filter;