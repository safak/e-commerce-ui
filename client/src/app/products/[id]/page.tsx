import ProductInteraction from "@/components/ProductInteraction";
import { ProductType } from "@/types";
import Image from "next/image";

// TEMPORARY
const product: ProductType = {
  id: 1,
  name: "Veste en Laine Dar Yassou - Édition Jasmin Paris",
  shortDescription:
    "",
  description:
          "La Veste en Laine Dar Yassou – Édition Jasmin Paris incarne l’élégance douce et intemporelle propre à l’univers Dar Yassou. Inspirée par le charme vintage et la féminité naturelle, cette veste allie structure élégante et confort enveloppant. Dotée de larges épaules structurées, d’un col haut raffiné et de manches longues, elle dessine une silhouette affirmée tout en restant délicate. Sa fermeture à boutons renforce son style chic et authentique, parfait pour la saison automnale. Pensée pour un style décontracté chic, cette veste se porte aussi bien au quotidien que pour des occasions plus habillées, apportant une touche de caractère tout en douceur.",
  price: 59.9,
  sizes: ["xs", "s", "m", "l", "xl"],
  colors: ["gray", "yellow"],
  images: {
    gray: "/products/1g.png",
    yellow: "/products/1y.png",
  },
  colorStripe:{
      gray: "https://buy.stripe.com/5kQ9AS9utf4daqteiMaZi02",
      yellow :"https://buy.stripe.com/cNieVc365f4d9mpdeIaZi01"
    }
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  // TODO:get the product from db
  // TEMPORARY
  return {
    title: product.name,
    describe: product.description,
  };
};

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color: string; size: string }>;
}) => {
  const { size, color } = await searchParams;

  const selectedSize = size || (product.sizes[0] as string);
  const selectedColor = color || (product.colors[0] as string);
  return (
    <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">
      {/* IMAGE */}
      <div className="w-full lg:w-5/12 relative aspect-[2/3]">
        <Image
          src={product.images?.[selectedColor] || ""}
          alt={product.name}
          fill
          className="object-contain rounded-md"
        />
      </div>
      {/* DETAILS */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        <h1 className="text-2xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <h2 className="text-2xl font-semibold">${product.price.toFixed(2)}</h2>
        <ProductInteraction
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
        />

        <p className="text-gray-500 text-xs">
         En cliquant sur « Payer maintenant », vous acceptez nos

Conditions générales

et notre Politique de confidentialité.

Vous nous autorisez à débiter votre moyen de paiement sélectionné du
montant total indiqué. Toutes les ventes sont soumises à nos politiques de retour et de remboursement.
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
