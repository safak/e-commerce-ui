export type ProductType = {
    id: number;
    name: string;
    shortDescription: string;
    Description: string;
    price: number;
    sizes: string;
    color: string;
    images: string[];
}
export type ProductsType = ProductType[]