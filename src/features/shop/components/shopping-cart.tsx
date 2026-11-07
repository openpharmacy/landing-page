"use client";

import {
  ArrowLeft,
  Check,
  CircleAlert,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { AddScriptModal } from "@/features/scripts/components/add-script-modal";
import { cn } from "@/lib/utils";

import { useCartStore, type CartLine } from "../stores/cart-store";

// Returns false during SSR / the first client render, true once hydrated — the
// recommended (no setState-in-effect) way to gate client-only persisted state.
const emptySubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

/** Shopping Cart page (Figma `57:1444` script-blocked / `73:2572` ready). */
export function ShoppingCart({ hasScript }: { hasScript: boolean }) {
  const items = useCartStore((s) => s.items);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const remove = useCartStore((s) => s.remove);

  // The cart is persisted client-side; wait for hydration before reading it so
  // the server-rendered (empty) markup and the first client render agree.
  const hydrated = useHydrated();
  const [addOpen, setAddOpen] = useState(false);

  const subtotal = items.reduce((sum, i) => sum + i.priceValue * i.qty, 0);
  // Prescription items block checkout until a script is uploaded/connected.
  const blocked = !hasScript && items.some((i) => i.requiresScript);

  return (
    <div className="mx-auto w-full max-w-[870px] px-4 pt-8 pb-20">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/shop"
          aria-label="Back to shop"
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#8BBDE5] bg-primary-500/10 text-secondary-900 transition-colors hover:bg-primary-500/20"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
          Shopping Cart
        </h1>
      </div>

      {!hydrated ? (
        <CartSkeleton />
      ) : items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-4">
          {/* Items (extra bottom space on mobile clears the fixed summary). */}
          <div className="flex flex-col gap-4 pb-[260px] lg:pb-0">
            {items.map((item) => (
              <CartRow
                key={item.name}
                item={item}
                hasScript={hasScript}
                onIncrement={() => increment(item.name)}
                onDecrement={() => decrement(item.name)}
                onRemove={() => remove(item.name)}
                onAddScript={() => setAddOpen(true)}
              />
            ))}
          </div>

          {/* Order summary — fixed bottom sheet on mobile (Figma `321:4460`),
              right-column card on desktop. */}
          <div className="fixed inset-x-0 bottom-0 z-30 flex flex-col gap-6 rounded-t-[20px] border-t border-[#E5E7EB] bg-white px-4 pt-6 pb-8 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] lg:static lg:rounded-card lg:border lg:p-6 lg:shadow-none">
            <h2 className="text-title-20 text-[#101828]">Order Summary</h2>

            <div className="flex items-center justify-between">
              <span className="text-body-16 text-text-muted">Subtotal</span>
              <span className="text-body-16 text-[#101828]">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="h-px bg-neutral-300" />

            <div className="flex items-center justify-between">
              <span className="text-subtitle-18-bold text-[#101828]">
                Total
              </span>
              <span className="text-title-20 text-info-500">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {blocked && (
              <div className="rounded-control bg-[#FEF2F2] p-3">
                <p className="text-center text-body-14 text-[#9F0712]">
                  You have items that require a script. Update the script to
                  purchase.
                </p>
              </div>
            )}

            {blocked ? (
              <Button type="button" size="lg" className="w-full" disabled>
                Proceed to Checkout
              </Button>
            ) : (
              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            )}
          </div>
        </div>
      )}

      {addOpen && <AddScriptModal onClose={() => setAddOpen(false)} />}
    </div>
  );
}

function CartRow({
  item,
  hasScript,
  onIncrement,
  onDecrement,
  onRemove,
  onAddScript,
}: {
  item: CartLine;
  hasScript: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
  onAddScript: () => void;
}) {
  const lineTotal = item.priceValue * item.qty;

  return (
    <div className="flex flex-col gap-2 rounded-card border border-[#E5E7EB] bg-white p-4">
      <div className="flex gap-4">
        <Image
          src={item.img}
          alt={item.name}
          width={115}
          height={91}
          className="h-[91px] w-[115px] shrink-0 rounded-control border border-neutral-300 bg-white object-contain p-1.5"
        />
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-body-16-bold text-[#101828]">{item.name}</span>
          <span className="text-body-14 text-text-muted">
            ${item.priceValue.toFixed(2)} each
          </span>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              {item.qty <= 1 ? (
                <QtyButton label="Remove from cart" onClick={onRemove}>
                  <Trash2 className="size-4 text-error-500" />
                </QtyButton>
              ) : (
                <QtyButton label="Decrease quantity" onClick={onDecrement}>
                  <Minus className="size-4" />
                </QtyButton>
              )}
              <span className="min-w-[11px] text-center text-subtitle-18-bold text-[#101828]">
                {item.qty}
              </span>
              <QtyButton label="Increase quantity" onClick={onIncrement}>
                <Plus className="size-4" />
              </QtyButton>
            </div>
            <span className="text-subtitle-18-bold text-info-500">
              ${lineTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Prescription items always show their script status. Without a script on
          file it's a red "Script Required" + Add Script (and blocks checkout);
          once a script is connected/uploaded it turns into a green confirmation. */}
      {item.requiresScript && (
        <>
          <div className="h-px bg-neutral-300" />
          <div className="flex items-center justify-between gap-2">
            {hasScript ? (
              <span className="inline-flex items-center gap-1 rounded-[5px] bg-success-500 px-1.5 py-1 text-caption-12-bold text-white">
                <Check className="size-4" />
                Script on file
              </span>
            ) : (
              <>
                <span className="inline-flex items-center gap-1 rounded-[5px] bg-error-500 px-1.5 py-1 text-caption-12-bold text-white">
                  <CircleAlert className="size-4" />
                  Script Required
                </span>
                <button
                  type="button"
                  onClick={onAddScript}
                  className="inline-flex items-center gap-1 rounded-control px-4 py-2 text-body-14 font-bold text-info-500 transition-colors hover:bg-info-500/5"
                >
                  <Plus className="size-5" />
                  Add Script
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function QtyButton({
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
      className={cn(
        "flex size-8 items-center justify-center rounded-full bg-[#F3F4F6] text-[#101828] transition-colors hover:bg-neutral-300",
      )}
    >
      {children}
    </button>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-card border border-[#E5E7EB] bg-white px-6 py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-info-500/10">
        <ShoppingBag className="size-7 text-info-500" />
      </span>
      <div className="flex flex-col gap-1">
        <h2 className="text-title-20 text-secondary-900">Your cart is empty</h2>
        <p className="text-body-14 text-secondary-300">
          Browse the shop and add items to your cart.
        </p>
      </div>
      <Button asChild size="lg">
        <Link href="/shop">Browse Shop</Link>
      </Button>
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="grid animate-pulse gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="flex flex-col gap-4">
        <div className="h-[124px] rounded-card bg-[#E2E8F0]" />
        <div className="h-[124px] rounded-card bg-[#E2E8F0]" />
      </div>
      <div className="h-[280px] rounded-card bg-[#E2E8F0]" />
    </div>
  );
}
