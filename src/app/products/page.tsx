
import ProductList from "../components/ProductList"
import { Params } from "next/dist/server/request/params"
const Productspage = async({searchParams,params}: {searchParams:Promise<{category: string }>,params: Params}) => {
    const category=(await searchParams).category 
  return (
    <div>
    <ProductList category={category} params="productsPage" />
    </div>
  )
}

export default Productspage