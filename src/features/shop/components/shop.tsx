"use client";

import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ListFilter,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import {
  CATALOGUE,
  getProduct,
  RX_PRODUCTS,
  type CatalogueProduct,
} from "../data/catalogue";
import { ProductCard, type Product } from "./product-card";
import {
  EMPTY_SHOP_FILTERS,
  matchesShopFilters,
  PRICE_MAX,
  PRICE_MIN,
  ShopFilterModal,
  type ShopFilters,
} from "./shop-filter-modal";

const CATEGORIES = [
  { label: "All", icon: null },
  { label: "Cold & Flu", icon: "/icons/home/cat-cold-flu.svg" },
  { label: "Skin", icon: "/icons/home/cat-skin.svg" },
  { label: "Vitamins", icon: "/icons/home/cat-vitamins.svg" },
  { label: "Allergy", icon: "/icons/home/cat-allergy.svg" },
  { label: "Digestive Health", icon: "/icons/home/cat-digestive.svg" },
  { label: "Pain Relief", icon: "/icons/home/cat-pain.svg" },
];

// Catalogue lookup — fail fast on an unknown id (developer error).
function cat(id: string): CatalogueProduct {
  const product = getProduct(id);
  if (!product) throw new Error(`Unknown catalogue product: ${id}`);
  return product;
}

// 12 per page; the first three are promoted (Figma `7:2652`).
const PAGE_1: Product[] = [
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
const PAGE_2: Product[] = [
  cat("vitamin-d3"),
  cat("panadol-extra"),
  cat("dimetapp"),
  cat("ibuprofen"),
  cat("panadol-tab"),
  cat("clarithromycin"),
  cat("amoxicillin"),
  cat("panadol-rapid"),
  cat("vitamin-d3"),
  cat("metformin-500mg"),
  cat("panadol-extra"),
  cat("ibuprofen"),
];
const PAGES = [PAGE_1, PAGE_2];

// Every catalogue product is searchable (Figma `39:1981`). The prescription
// row "Available for Your Scripts" (RX_PRODUCTS) comes from the catalogue too.
const SEARCH_PRODUCTS: Product[] = CATALOGUE;

export function Shop({
  hasScript,
  loggedIn,
}: {
  hasScript: boolean;
  loggedIn: boolean;
}) {
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const [shopFilters, setShopFilters] =
    useState<ShopFilters>(EMPTY_SHOP_FILTERS);
  const [filterOpen, setFilterOpen] = useState(false);

  const products = PAGES[page - 1] ?? PAGE_1;
  const q = query.trim().toLowerCase();
  const suggestions = q
    ? SEARCH_PRODUCTS.filter((p) => p.name.toLowerCase().includes(q)).slice(
        0,
        6,
      )
    : [];
  const showSuggestions = focused && !submitted && suggestions.length > 0;
  const searched = submitted
    ? SEARCH_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(submitted.toLowerCase()),
      )
    : [];
  const results = searched.filter((p) => matchesShopFilters(p, shopFilters));

  // Active-filter chips (categories → brands → price), each removable.
  const filterChips: { key: string; label: string; remove: () => void }[] = [
    ...shopFilters.categories.map((c) => ({
      key: `cat-${c}`,
      label: c,
      remove: () =>
        setShopFilters((f) => ({
          ...f,
          categories: f.categories.filter((x) => x !== c),
        })),
    })),
    ...shopFilters.brands.map((b) => ({
      key: `brand-${b}`,
      label: b,
      remove: () =>
        setShopFilters((f) => ({
          ...f,
          brands: f.brands.filter((x) => x !== b),
        })),
    })),
    ...(shopFilters.minPrice > PRICE_MIN
      ? [
          {
            key: "price",
            label: `$${shopFilters.minPrice} - $${PRICE_MAX}`,
            remove: () =>
              setShopFilters((f) => ({ ...f, minPrice: PRICE_MIN })),
          },
        ]
      : []),
  ];

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (query.trim()) {
      setSubmitted(query.trim());
      setFocused(false);
    }
  }
  function clearSearch() {
    setQuery("");
    setSubmitted(null);
    setFocused(false);
    setShopFilters(EMPTY_SHOP_FILTERS);
  }
  function selectSuggestion(product: Product) {
    setQuery(product.name);
    setSubmitted(product.name);
    setFocused(false);
  }

  return (
    <div className="mx-auto w-full max-w-[870px] px-4 pt-8 pb-20">
      <div className="flex flex-col gap-9">
        {/* Search */}
        <div className="relative">
          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2.5 rounded-card border border-neutral-300 bg-white px-4 py-3"
          >
            <Icon src="/icons/shop/search.svg" size={24} className="shrink-0" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search medications, vitamins, etc..."
              className="w-full bg-transparent text-body-14 text-secondary-900 outline-none placeholder:text-secondary-300"
            />
            {query ? (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="shrink-0 text-secondary-900 transition-colors hover:text-secondary-500"
              >
                <X className="size-5" />
              </button>
            ) : (
              <span className="shrink-0">
                <Icon src="/icons/shop/mic.svg" size={24} />
              </span>
            )}
          </form>

          {showSuggestions && (
            <div className="absolute top-full right-0 left-0 z-30 mt-2 flex flex-col gap-1 rounded-card border border-[#E5E7EB] bg-white p-2 shadow-card">
              {suggestions.map((product, index) => (
                <SuggestionItem
                  key={index}
                  product={product}
                  query={q}
                  onSelect={() => selectSuggestion(product)}
                />
              ))}
            </div>
          )}
        </div>

        {submitted ? (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-body-16-bold text-secondary-900">
                  Results for: {submitted}
                </h2>
                <p className="text-body-14 text-secondary-300">
                  ({results.length} products)
                </p>
              </div>

              {filterChips.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {filterChips.map((chip) => (
                    <button
                      key={chip.key}
                      type="button"
                      onClick={chip.remove}
                      className="inline-flex items-center gap-1 rounded-full border border-info-500/40 bg-info-500/10 py-1 pr-1.5 pl-2.5 text-caption-12 text-info-500 transition-colors hover:bg-info-500/20"
                    >
                      {chip.label}
                      <X className="size-3.5" />
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setShopFilters(EMPTY_SHOP_FILTERS)}
                    className="ml-1 text-caption-12-bold text-info-500 hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              )}

              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Button
                    variant="secondary"
                    className="w-full gap-1"
                    onClick={() => setFilterOpen(true)}
                  >
                    <ListFilter className="size-6" />
                    Filters
                  </Button>
                  {filterChips.length > 0 && (
                    <span className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-info-500 text-[11px] font-bold text-white">
                      {filterChips.length}
                    </span>
                  )}
                </div>
                <Button variant="secondary" className="flex-1 gap-1">
                  <ArrowUpDown className="size-6" />
                  Sort
                </Button>
              </div>
            </div>

            <section className="flex flex-col gap-4">
              <h2 className="text-h4-24 text-secondary-900">
                Featured Products
              </h2>
              {results.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {results.map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
                </div>
              ) : (
                <p className="py-8 text-center text-body-16 text-secondary-300">
                  No products found.
                </p>
              )}
            </section>
          </>
        ) : (
          <>
            {/* Categories */}
            <section className="flex flex-col gap-4">
              <h2 className="text-h4-24 text-secondary-900">
                Shop By Category
              </h2>
              <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
                {CATEGORIES.map((cat) => {
                  const selected = category === cat.label;
                  return (
                    <button
                      key={cat.label}
                      type="button"
                      onClick={() => setCategory(cat.label)}
                      className={cn(
                        "flex shrink-0 items-center gap-1 rounded-full border px-4 py-3 transition-colors",
                        selected
                          ? "border-[#8BBDE5] bg-primary-500/15"
                          : "border-neutral-300 bg-white hover:bg-bg-app",
                      )}
                    >
                      {cat.icon && <Icon src={cat.icon} size={22} />}
                      <span className="text-body-14 font-bold whitespace-nowrap text-secondary-900">
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Prescription status banner */}
            {hasScript ? (
              <div className="flex items-center gap-4 rounded-card-lg border border-[#B9F8CF] bg-[#F0FDF4] px-4 py-4">
                <span className="size-2.5 shrink-0 rounded-full bg-[#00C853]" />
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="text-body-16-bold text-[#016630]">
                    Script Active
                  </span>
                  <span className="text-body-14 text-text-muted">
                    You can now view prescription medications
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-start gap-4 rounded-card-lg border border-[#FFD6A8] bg-gradient-to-r from-[#FFFBEB] to-[#FFF7ED] p-4 sm:flex-row sm:items-center">
                <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-white">
                  <Icon src="/icons/shop/script-doc.svg" size={34} />
                </span>
                <div className="flex flex-1 flex-col gap-2">
                  <p className="text-body-16-bold text-[#101828]">
                    You&apos;re viewing non-prescription medications only
                  </p>
                  <p className="text-body-14 text-[#364153]">
                    Upload your eScript token to unlock and view prescription
                    medications that match your prescriptions.
                  </p>
                </div>
                <Button asChild size="lg" className="shrink-0">
                  <Link href={loggedIn ? "/scripts/add" : "/scripts"}>
                    Upload Script
                  </Link>
                </Button>
              </div>
            )}

            {/* Products matching uploaded prescriptions */}
            {hasScript && (
              <section className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-h4-24 text-secondary-900">
                      Available for Your Scripts
                    </h2>
                    <p className="text-body-14 text-secondary-300">
                      Products matching your uploaded prescriptions
                    </p>
                  </div>
                  <Link
                    href="#"
                    className="shrink-0 text-body-16 text-info-500 hover:underline"
                  >
                    View all
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {RX_PRODUCTS.map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* Featured products */}
            <section className="flex flex-col gap-4">
              <h2 className="text-h4-24 text-secondary-900">
                Featured Products
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            </section>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <PageButton
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-label="Previous page"
              >
                <ChevronLeft className="size-5" />
              </PageButton>
              {PAGES.map((_, index) => (
                <PageButton
                  key={index}
                  active={page === index + 1}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </PageButton>
              ))}
              <PageButton
                disabled={page === PAGES.length}
                onClick={() => setPage((p) => Math.min(PAGES.length, p + 1))}
                aria-label="Next page"
              >
                <ChevronRight className="size-5" />
              </PageButton>
            </div>
          </>
        )}
      </div>

      {filterOpen && (
        <ShopFilterModal
          initial={shopFilters}
          count={(f) => searched.filter((p) => matchesShopFilters(p, f)).length}
          onApply={(next) => {
            setShopFilters(next);
            setFilterOpen(false);
          }}
          onClose={() => setFilterOpen(false)}
        />
      )}
    </div>
  );
}

/** Highlights the matched query substring of a product name in the brand blue. */
function highlightMatch(name: string, query: string): ReactNode {
  if (!query) return name;
  const index = name.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return name;
  return (
    <>
      {name.slice(0, index)}
      <span className="text-info-500">
        {name.slice(index, index + query.length)}
      </span>
      {name.slice(index + query.length)}
    </>
  );
}

function SuggestionItem({
  product,
  query,
  onSelect,
}: {
  product: Product;
  query: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      // Keep the input focused so the click registers before the dropdown closes.
      onMouseDown={(event) => event.preventDefault()}
      onClick={onSelect}
      className="flex items-center gap-3 rounded-control p-2 text-left transition-colors hover:bg-bg-app"
    >
      <Image
        src={product.img}
        alt={product.name}
        width={76}
        height={60}
        className="h-[60px] w-[76px] shrink-0 rounded-[6px] border border-neutral-300 object-contain"
      />
      <div className="flex flex-col">
        <span className="text-body-14 font-bold text-secondary-900">
          {highlightMatch(product.name, query)}
        </span>
        <span className="text-caption-12 text-secondary-500">
          {product.desc}
        </span>
        <span className="text-caption-12 text-[#183F60]">{product.price}</span>
      </div>
    </button>
  );
}

function PageButton({
  active,
  disabled,
  onClick,
  children,
  ...props
}: {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
} & React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex size-10 items-center justify-center rounded-card border text-body-14 font-bold transition-colors disabled:opacity-40",
        active
          ? "border-info-500 bg-info-500 text-white"
          : "border-neutral-300 bg-white text-secondary-900 hover:bg-bg-app",
      )}
      {...props}
    >
      {children}
    </button>
  );
}
