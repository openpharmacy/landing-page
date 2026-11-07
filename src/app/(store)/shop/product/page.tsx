import type { Metadata } from "next";

import { ProductDetail } from "@/features/shop/components/product-detail";
import { resolveProduct } from "@/features/shop/data/catalogue";

export const metadata: Metadata = { title: "Product · Open Pharmacy" };

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{
    id?: string;
    name?: string;
    price?: string;
    brand?: string;
    img?: string;
  }>;
}) {
  // Look the product up in the catalogue (by id, then name) so the detail page
  // shows the right copy / Rx status; unknown links fall back gracefully.
  const product = resolveProduct(await searchParams);
  return <ProductDetail product={product} />;
}
