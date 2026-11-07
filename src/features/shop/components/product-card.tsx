"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { cardTint } from "@/features/home/components/card-tint";

export type Product = {
  id?: string;
  name: string;
  desc: string;
  price: string;
  img: string;
  promoted?: boolean;
  category?: string;
  brand?: string;
  priceValue?: number;
};

/** Product grid card. Clicking it opens the product detail page. */
export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  function openDetail() {
    // Catalogue products link by id; legacy ones fall back to name params.
    if (product.id) {
      router.push(`/shop/product?id=${encodeURIComponent(product.id)}`);
      return;
    }
    const params = new URLSearchParams({
      name: product.name,
      price: product.price,
      img: product.img,
    });
    if (product.brand) params.set("brand", product.brand);
    router.push(`/shop/product?${params.toString()}`);
  }

  return (
    <button
      type="button"
      onClick={openDetail}
      className="flex flex-col rounded-card bg-white p-2 text-left transition-shadow hover:shadow-card"
      style={{ backgroundImage: cardTint("#5CB4F8") }}
    >
      <div className="overflow-hidden rounded-control bg-white">
        <Image
          src={product.img}
          alt={product.name}
          width={266}
          height={202}
          sizes="266px"
          className="h-[180px] w-full object-contain p-2"
        />
      </div>
      <div className="flex flex-col gap-0.5 px-2 py-2">
        <span className="text-[8px] text-secondary-300 uppercase">
          {product.promoted ? "Promoted" : " "}
        </span>
        <h3 className="text-title-20 text-secondary-900">{product.name}</h3>
        <p className="text-caption-12 text-secondary-300">{product.desc}</p>
        <p className="text-subtitle-18-bold text-info-500">{product.price}</p>
      </div>
    </button>
  );
}
