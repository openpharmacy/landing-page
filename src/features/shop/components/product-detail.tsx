"use client";

import { ArrowLeft, ChevronDown, Info, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { relatedProducts, type CatalogueProduct } from "../data/catalogue";
import { useCartStore } from "../stores/cart-store";
import { CartDrawer } from "./cart-drawer";
import { ProductCard } from "./product-card";

const TABS = ["Overview", "Dosage Info", "Warnings", "PBS Info"] as const;

export function ProductDetail({ product }: { product: CatalogueProduct }) {
  const [tab, setTab] = useState<string>("Overview");
  const [qty, setQty] = useState(1);
  const [openFaq, setOpenFaq] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const addLine = useCartStore((s) => s.add);

  const { name, brand, price, img } = product;
  const related = relatedProducts(product.id, 4);
  const tabContent: Record<string, string> = {
    "Dosage Info": product.dosage,
    Warnings: product.warnings,
    "PBS Info": product.pbsInfo,
  };

  function addToCart() {
    // Guests can add to cart and check out without an account.
    addLine({ name, priceValue: product.priceValue, img, brand }, qty);
    setCartOpen(true);
  }

  return (
    <div className="mx-auto w-full max-w-[870px] px-4 pt-4 pb-8 sm:py-8">
      <div className="flex flex-col gap-9">
        {/* Header */}
        <div className="flex flex-col gap-3">
          {/* Back is hidden on mobile (header + tab bar handle navigation). */}
          <Link
            href="/shop"
            aria-label="Back to shop"
            className="hidden size-10 shrink-0 items-center justify-center rounded-full border border-[#8BBDE5] bg-primary-500/10 text-secondary-900 transition-colors hover:bg-primary-500/20 sm:flex"
          >
            <ArrowLeft className="size-5" />
          </Link>

          <div className="grid gap-9 sm:grid-cols-2">
            {/* Full-bleed banner on mobile (Figma `319:7779`); card on desktop. */}
            <div className="-mx-4 flex items-center justify-center rounded-b-[22px] bg-white p-6 sm:mx-0 sm:rounded-control">
              <Image
                src={img}
                alt={name}
                width={419}
                height={370}
                className="h-[280px] w-full object-contain"
              />
            </div>

            <div className="flex flex-col justify-between gap-9">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  {product.popular && (
                    <span className="text-[12px] leading-[14px] font-bold tracking-[0.15em] text-success-500 uppercase">
                      Popular
                    </span>
                  )}
                  <div className="flex flex-col gap-1">
                    <h1 className="text-h3-30 text-[#1C232A] lg:text-display-32">
                      {name}
                    </h1>
                    <p className="text-body-14 text-secondary-900">
                      By{" "}
                      <Link href="#" className="text-info-500 hover:underline">
                        {brand}
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-end gap-2">
                  <span className="text-display-32 text-[#1C232A]">
                    {price}
                  </span>
                  {product.pbsSave && (
                    <span className="pb-1 text-body-14 text-success-500">
                      (Save {product.pbsSave} with PBS)
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-[5px] bg-success-500 px-1.5 py-1 text-caption-12-bold text-white">
                    In stock
                  </span>
                  {product.requiresScript && (
                    <span className="flex items-center gap-1 rounded-[5px] bg-error-500 px-1.5 py-1 text-caption-12-bold text-white">
                      <Info className="size-4" />
                      Prescription required
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-row items-end gap-9 sm:flex-col sm:items-stretch sm:gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-body-16 text-secondary-900">
                    Quantity
                  </span>
                  <div className="flex items-center gap-6">
                    <StepButton
                      label="Decrease quantity"
                      onClick={() => setQty((n) => Math.max(1, n - 1))}
                    >
                      <Minus className="size-5" />
                    </StepButton>
                    <span className="text-h4-24 text-secondary-900">{qty}</span>
                    <StepButton
                      label="Increase quantity"
                      onClick={() => setQty((n) => n + 1)}
                    >
                      <Plus className="size-5" />
                    </StepButton>
                  </div>
                </div>

                <Button
                  type="button"
                  size="lg"
                  className="flex-1 sm:w-full sm:flex-none"
                  onClick={addToCart}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col gap-4 rounded-control bg-white p-4">
          <div className="flex border-b border-neutral-300">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "-mb-px flex-1 border-b-2 px-1 pb-3 text-center text-body-14 whitespace-nowrap transition-colors sm:px-2 sm:text-body-16",
                  tab === t
                    ? "border-info-500 text-info-500"
                    : "border-transparent text-secondary-900 hover:text-info-500",
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "Overview" ? (
            <div className="flex flex-col gap-4">
              <h2 className="text-h4-24 text-[#1C232A]">Product Details</h2>
              <div className="flex flex-col gap-4">
                {product.overview.map((paragraph, index) => (
                  <p key={index} className="text-body-16 text-secondary-900">
                    {paragraph}
                  </p>
                ))}
              </div>

              {product.faqs.length > 0 && (
                <div className="flex flex-col gap-2 rounded-[10px] bg-bg-app p-4">
                  <h3 className="text-body-16-bold text-secondary-900">
                    Frequently Asked Questions
                  </h3>
                  {product.faqs.map((faq, index) => {
                    const open = openFaq === index;
                    return (
                      <div key={faq.q} className="rounded-[10px] bg-white">
                        <button
                          type="button"
                          onClick={() => setOpenFaq(open ? -1 : index)}
                          aria-expanded={open}
                          className="flex w-full items-center justify-between gap-2 px-4 py-2 text-left"
                        >
                          <span className="text-body-14 font-bold text-secondary-900">
                            {faq.q}
                          </span>
                          <ChevronDown
                            className={cn(
                              "size-6 shrink-0 text-secondary-900 transition-transform",
                              open && "rotate-180",
                            )}
                          />
                        </button>
                        {open && (
                          <p className="px-4 pb-3 text-caption-12 whitespace-pre-line text-secondary-500">
                            {faq.a}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <p className="text-body-16 text-secondary-900">{tabContent[tab]}</p>
          )}
        </div>

        {/* Related products */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-h4-24 text-secondary-900">Related Products</h2>
            <Link
              href="/shop"
              className="shrink-0 text-body-16 text-info-500 hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:[&>*:nth-child(4)]:hidden">
            {related.map((item) => (
              <ProductCard
                key={item.id}
                product={{ ...item, promoted: true }}
              />
            ))}
          </div>
        </section>
      </div>

      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
    </div>
  );
}

function StepButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full border border-secondary-500 text-secondary-900 transition-colors hover:bg-secondary-500/5"
    >
      {children}
    </button>
  );
}
