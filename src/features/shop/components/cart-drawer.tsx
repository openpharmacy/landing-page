"use client";

import { Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

import { useCartStore } from "../stores/cart-store";

export type Recommendation = {
  name: string;
  desc: string;
  price: string;
  priceValue: number;
  img: string;
};

// "You might also like" (Figma `73:2503`).
export const CART_RECOMMENDATIONS: Recommendation[] = [
  {
    name: "Dimetapp Nasal Spray",
    desc: "Relief from nasal and sinus congestion",
    price: "$8.95",
    priceValue: 8.95,
    img: "/images/products/dimetapp.webp",
  },
  {
    name: "Vitamin D3",
    desc: "Supports healthy bones and immunity",
    price: "$12.99",
    priceValue: 12.99,
    img: "/images/products/product-1.webp",
  },
  {
    name: "Panadol Rapid Caplets X 32",
    desc: "Fast relief for headaches and fever",
    price: "$16.99",
    priceValue: 16.99,
    img: "/images/products/panadol-rapid.webp",
  },
];

/** Slide-in cart drawer shown after "Add to Cart" (Figma `73:2467`). */
export function CartDrawer({ onClose }: { onClose: () => void }) {
  const items = useCartStore((s) => s.items);
  const increment = useCartStore((s) => s.increment);
  const remove = useCartStore((s) => s.remove);
  const add = useCartStore((s) => s.add);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Close automatically once the cart is emptied from within the drawer.
  useEffect(() => {
    if (items.length === 0) onClose();
  }, [items.length, onClose]);

  if (items.length === 0) return null;

  const totalQty = items.reduce((sum, item) => sum + item.qty, 0);
  const total = items.reduce(
    (sum, item) => sum + item.priceValue * item.qty,
    0,
  );

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Added to cart"
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-default bg-black/40"
        onClick={onClose}
      />

      <div className="relative flex h-full w-full max-w-[480px] flex-col bg-bg-app shadow-card">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[#E5E7EB] px-6 py-6">
          <h2 className="text-title-20 text-[#101828]">Added to Cart</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-9 items-center justify-center rounded-full bg-[#F3F4F6] text-[#101828] transition-colors hover:bg-neutral-300"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-4 border-b border-neutral-300 p-6">
            {items.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 rounded-control border border-info-500 bg-white p-3"
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  width={84}
                  height={68}
                  className="h-[68px] w-[84px] shrink-0 rounded-control border border-neutral-300 object-contain p-1"
                />
                <div className="flex flex-1 flex-col gap-1">
                  <span className="text-body-14 font-bold text-[#101828]">
                    {item.name}
                  </span>
                  <span className="text-caption-12 text-text-muted">
                    ${item.priceValue.toFixed(2)} each
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => remove(item.name)}
                        aria-label="Remove from cart"
                        className="flex size-7 items-center justify-center rounded-full bg-[#F3F4F6] text-error-500 transition-colors hover:bg-neutral-300"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                      <span className="text-body-16-bold text-[#101828]">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => increment(item.name)}
                        aria-label="Increase quantity"
                        className="flex size-7 items-center justify-center rounded-full bg-[#F3F4F6] text-[#101828] transition-colors hover:bg-neutral-300"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <span className="text-body-16-bold text-info-500">
                      ${(item.priceValue * item.qty).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 px-6 pt-6 pb-6">
            <h3 className="text-body-16-bold text-[#101828]">
              You might also like
            </h3>
            <div className="flex flex-col gap-2.5">
              {CART_RECOMMENDATIONS.map((rec) => (
                <div
                  key={rec.name}
                  className="flex items-center gap-3 rounded-card bg-white p-3"
                >
                  <Image
                    src={rec.img}
                    alt={rec.name}
                    width={60}
                    height={48}
                    className="h-[48px] w-[60px] shrink-0 rounded-control border border-neutral-300 object-contain p-1"
                  />
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-body-14 font-bold text-[#101828]">
                      {rec.name}
                    </span>
                    <span className="text-caption-12 text-secondary-300">
                      {rec.desc}
                    </span>
                    <span className="text-caption-12 text-info-500">
                      {rec.price}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      add({
                        name: rec.name,
                        priceValue: rec.priceValue,
                        img: rec.img,
                      })
                    }
                    className="shrink-0 rounded-control bg-gradient-primary px-3 py-1.5 text-body-14 font-bold text-white transition-opacity hover:opacity-95"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 flex-col gap-4 border-t border-[#E5E7EB] bg-white p-6">
          <div className="flex items-center justify-between">
            <span className="text-body-16 text-secondary-900">
              {totalQty} {totalQty === 1 ? "item" : "items"}
            </span>
            <span className="text-subtitle-18-bold text-secondary-900">
              ${total.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <Button asChild size="lg">
              <Link href="/cart" onClick={onClose}>
                See Cart
              </Link>
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={onClose}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
