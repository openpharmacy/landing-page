"use client";

import { ArrowLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const PRICE_MIN = 12;
export const PRICE_MAX = 99;

export type ShopFilters = {
  categories: string[];
  brands: string[];
  minPrice: number;
};

export const EMPTY_SHOP_FILTERS: ShopFilters = {
  categories: [],
  brands: [],
  minPrice: PRICE_MIN,
};

// Filter options (Figma `39:2375`). Counts are illustrative (mock).
const SHOP_CATEGORIES = [
  { label: "Fever & Pain Relief", count: 8 },
  { label: "Pharmacist Advice Medicine", count: 4 },
  { label: "Mum & Baby", count: 4 },
  { label: "Vitamins & Supplements", count: 2 },
  { label: "Bone & Joint Health", count: 6 },
];
const SHOP_BRANDS = [
  { label: "Panadol", count: 3 },
  { label: "Nurofen", count: 2 },
  { label: "MyVitamins", count: 4 },
  { label: "Blackmores", count: 3 },
  { label: "Centrum", count: 2 },
];

export function shopFiltersActive(f: ShopFilters): boolean {
  return (
    f.categories.length > 0 || f.brands.length > 0 || f.minPrice > PRICE_MIN
  );
}

/** Active-filter chips, in display order (categories → brands → price). */
export function shopFilterChips(f: ShopFilters): string[] {
  return [
    ...f.categories,
    ...f.brands,
    ...(f.minPrice > PRICE_MIN ? [`$${f.minPrice} - $${PRICE_MAX}`] : []),
  ];
}

export function matchesShopFilters(
  product: { category?: string; brand?: string; priceValue?: number },
  f: ShopFilters,
): boolean {
  if (
    f.categories.length > 0 &&
    (!product.category || !f.categories.includes(product.category))
  ) {
    return false;
  }
  if (
    f.brands.length > 0 &&
    (!product.brand || !f.brands.includes(product.brand))
  ) {
    return false;
  }
  if ((product.priceValue ?? 0) < f.minPrice) return false;
  return true;
}

/**
 * Shop "Filters" modal (Figma `39:2346` → `39:2375`). Two levels: the overview
 * (Category / Brand / Price) and a per-group checkbox list. "Show N Products"
 * (or a group's "Apply Filters") commits the draft.
 */
export function ShopFilterModal({
  initial,
  count,
  onApply,
  onClose,
}: {
  initial: ShopFilters;
  count: (f: ShopFilters) => number;
  onApply: (f: ShopFilters) => void;
  onClose: () => void;
}) {
  const [level, setLevel] = useState<"main" | "category" | "brand">("main");
  const [draft, setDraft] = useState<ShopFilters>(initial);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function toggle(key: "categories" | "brands", value: string) {
    setDraft((d) => ({
      ...d,
      [key]: d[key].includes(value)
        ? d[key].filter((v) => v !== value)
        : [...d[key], value],
    }));
  }

  const pct = ((draft.minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Filters"
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-default bg-black/40"
        onClick={onClose}
      />

      {/* Full-screen sheet on mobile (Figma `319:7935`); centred card on desktop. */}
      <div className="relative flex h-dvh w-full flex-col overflow-hidden rounded-none bg-white shadow-card sm:h-auto sm:max-h-[90dvh] sm:max-w-[448px] sm:rounded-card">
        {level === "main" ? (
          <>
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-neutral-300 p-6">
              <h2 className="text-h4-24 text-[#101828]">Filters</h2>
              <CloseButton onClose={onClose} />
            </div>

            <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-6">
              <FilterRow
                label="Category"
                onClick={() => setLevel("category")}
              />
              <FilterRow label="Brand" onClick={() => setLevel("brand")} />

              <div className="flex flex-col gap-1 pt-6">
                <span className="text-body-16-bold text-[#101828]">Price</span>
                <div className="flex items-center justify-between">
                  <span className="text-body-14 text-[#101828]">
                    ${draft.minPrice}
                  </span>
                  <span className="text-body-14 text-[#101828]">
                    ${PRICE_MAX}
                  </span>
                </div>
                <div className="relative flex h-5 items-center">
                  <div className="absolute h-2.5 w-full rounded-full bg-neutral-300" />
                  <div
                    className="absolute h-2.5 rounded-full bg-gradient-primary"
                    style={{ width: `${pct}%` }}
                  />
                  <div
                    className="pointer-events-none absolute size-5 -translate-x-1/2 rounded-full bg-gradient-primary shadow-float"
                    style={{ left: `${pct}%` }}
                  />
                  <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    value={draft.minPrice}
                    onChange={(event) =>
                      setDraft((d) => ({
                        ...d,
                        minPrice: Number(event.target.value),
                      }))
                    }
                    aria-label="Minimum price"
                    className="absolute inset-0 w-full cursor-pointer opacity-0"
                  />
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-neutral-300 p-6">
              <Button
                type="button"
                size="lg"
                className="w-full"
                onClick={() => onApply(draft)}
              >
                Show {count(draft)} Products
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex shrink-0 items-center gap-4 border-b border-neutral-300 p-6">
              <button
                type="button"
                onClick={() => setLevel("main")}
                aria-label="Back"
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#8BBDE5] bg-primary-500/10 text-secondary-900 transition-colors hover:bg-primary-500/20"
              >
                <ArrowLeft className="size-5" />
              </button>
              <h2 className="flex-1 text-h4-24 text-[#101828]">
                {level === "category" ? "Category" : "Brand"}
              </h2>
              <CloseButton onClose={onClose} />
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto p-6">
              {(level === "category" ? SHOP_CATEGORIES : SHOP_BRANDS).map(
                (option) => {
                  const key = level === "category" ? "categories" : "brands";
                  const checked = draft[key].includes(option.label);
                  return (
                    <label
                      key={option.label}
                      className="flex cursor-pointer items-center justify-between gap-4 border-b border-neutral-300 py-3 last:border-0"
                    >
                      <span className="flex items-center gap-2">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() => toggle(key, option.label)}
                        />
                        <span className="text-body-16-bold text-secondary-900">
                          {option.label}
                        </span>
                      </span>
                      <span className="text-body-16 text-secondary-900">
                        ({option.count})
                      </span>
                    </label>
                  );
                },
              )}
            </div>

            <div className="flex shrink-0 gap-3 border-t border-neutral-300 p-6">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="flex-1"
                onClick={() =>
                  setDraft((d) => ({
                    ...d,
                    [level === "category" ? "categories" : "brands"]: [],
                  }))
                }
              >
                Remove All
              </Button>
              <Button
                type="button"
                size="lg"
                className="flex-1"
                onClick={() => onApply(draft)}
              >
                Apply Filters
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function FilterRow({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between border-b border-neutral-300 py-6 text-left"
    >
      <span className="text-body-16-bold text-[#101828]">{label}</span>
      <ChevronRight className="size-6 text-secondary-900" />
    </button>
  );
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className="shrink-0 text-secondary-900 transition-colors hover:text-secondary-500"
    >
      <X className="size-5" />
    </button>
  );
}
