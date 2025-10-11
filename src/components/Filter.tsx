"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () =>{

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleFilter = (value:string)=>{
    const params = new URLSearchParams(searchParams);
    params.set("sort",value);
    router.push(`${pathname}?${params.toString()}` , {scroll:false} )
    }

    return(
        <div className="flex items-center justify-end gap-2 my-6 text-sm text-gray-500">
            <span>Sort by:</span>
            <select name="sort" id="sort" className="ring-1 ring-gray-200 rounded-sm shadow-md" onChange={(e)=>handleFilter(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="asc">Price (asc)</option>
                <option value="desc">Price (desc)</option>
            </select>
        </div>
    )
    
}
export default Filter