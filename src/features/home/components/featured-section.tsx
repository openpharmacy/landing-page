import { ProductCard } from "@/features/shop/components/product-card";
import {
  getProduct,
  type CatalogueProduct,
} from "@/features/shop/data/catalogue";

import { SectionHeader } from "./section-header";

// Catalogue lookup — fail fast on an unknown id (developer error).
function cat(id: string): CatalogueProduct {
  const product = getProduct(id);
  if (!product) throw new Error(`Unknown catalogue product: ${id}`);
  return product;
}

// Home featured grid — same catalogue products as the shop so cards open the
// real product detail page when clicked.
const FEATURED: CatalogueProduct[] = [
  { ...cat("panadol-extra"), promoted: true },
  { ...cat("vitamin-d3"), promoted: true },
  { ...cat("metformin-500mg"), promoted: true },
  cat("ibuprofen"),
  cat("panadol-rapid"),
  cat("dimetapp"),
  cat("amoxicillin"),
  cat("clarithromycin"),
  cat("panadol-tab"),
  cat("vitamin-d3"),
  cat("panadol-extra"),
  cat("metformin-500mg"),
];

export function FeaturedSection() {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader title="Featured Products" href="/shop" />
      {/* Mobile shows a tidy 2x2 (first 4); tablet/desktop show the full grid. */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 max-sm:[&>*:nth-child(n+5)]:hidden">
        {FEATURED.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
}
