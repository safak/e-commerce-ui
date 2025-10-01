export type ProductType = {
    id: string | number;
    name: string;
    description: string;
    shortDescription: string;
    price: number;
    sizes: string[];
    colors: string[];
    images: Record<string, string>;
}

export type ProductsType = ProductType;