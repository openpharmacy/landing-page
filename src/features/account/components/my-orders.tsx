"use client";

import { ArrowLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/shop/stores/cart-store";
import { cn } from "@/lib/utils";

type OrderStatus = "In Transit" | "Delivered" | "Processing";

type OrderItem = {
  name: string;
  desc: string;
  price: number;
  qty: number;
  img: string;
};

type Order = {
  id: string;
  status: OrderStatus;
  date: string;
  statusDate: string;
  delivery: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

const STATUS_STYLE: Record<OrderStatus, { badge: string; banner: string }> = {
  "In Transit": {
    badge: "bg-[#F3E8FF] text-[#9333EA]",
    banner: "bg-[#F3E8FF] text-[#7E22CE]",
  },
  Delivered: {
    badge: "bg-[#DCFCE7] text-[#16A34A]",
    banner: "bg-[#DCFCE7] text-[#15803D]",
  },
  Processing: {
    badge: "bg-[#FEF9C3] text-[#CA8A04]",
    banner: "bg-[#FEF9C3] text-[#A16207]",
  },
};

const ORDERS: Order[] = [
  {
    id: "OP-7K3M9X2",
    status: "In Transit",
    date: "Mar 8, 2026",
    statusDate: "Monday, March 9, 2026",
    delivery: "Australia Post",
    subtotal: 36.97,
    shipping: 10,
    total: 46.97,
    items: [
      {
        name: "Dimetapp Nasal Spray",
        desc: "Relief from nasal and sinus congestion",
        price: 8.95,
        qty: 1,
        img: "/images/products/dimetapp.webp",
      },
      {
        name: "Vitamin D3",
        desc: "Supports healthy bones and immunity",
        price: 12.99,
        qty: 1,
        img: "/images/products/product-1.webp",
      },
    ],
  },
  {
    id: "OP-4L8N2P5",
    status: "Delivered",
    date: "Mar 8, 2026",
    statusDate: "Tuesday, March 5, 2026",
    delivery: "DoorDash Delivery",
    subtotal: 12.97,
    shipping: 10,
    total: 22.97,
    items: [
      {
        name: "Panadol Rapid Caplets X 32",
        desc: "Fast relief for headaches and fever",
        price: 16.99,
        qty: 1,
        img: "/images/products/panadol-rapid.webp",
      },
    ],
  },
  {
    id: "OP-2X6P9L4",
    status: "Processing",
    date: "Feb 28, 2026",
    statusDate: "Wednesday, March 4, 2026",
    delivery: "Pharmacy Pickup",
    subtotal: 12.97,
    shipping: 0,
    total: 12.97,
    items: [
      {
        name: "Dimetapp Nasal Spray",
        desc: "Relief from nasal and sinus congestion",
        price: 8.95,
        qty: 1,
        img: "/images/products/dimetapp.webp",
      },
    ],
  },
];

/** My Orders (Figma `304:6161`) + the order-details modal (`304:6266`). */
export function MyOrders() {
  const [open, setOpen] = useState<Order | null>(null);

  return (
    <div className="mx-auto w-full max-w-[870px] px-4 pt-8 pb-20">
      <div className="flex flex-col gap-6">
        <Link
          href="/account"
          className="inline-flex w-fit items-center gap-2 text-body-16 text-text-muted transition-colors hover:text-info-500"
        >
          <ArrowLeft className="size-5" />
          Back
        </Link>
        <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
          My Orders
        </h1>

        <div className="flex flex-col gap-4">
          {ORDERS.map((order) => (
            <button
              key={order.id}
              type="button"
              onClick={() => setOpen(order)}
              className="flex flex-col gap-4 rounded-card-lg border border-[#E5E7EB] bg-white p-6 text-left transition-shadow hover:shadow-card"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-body-16-bold text-[#101828]">
                      {order.id}
                    </span>
                    <StatusBadge status={order.status} />
                  </div>
                  <span className="text-body-14 text-secondary-300">
                    Ordered on {order.date}
                  </span>
                </div>
                <ChevronRight className="size-5 shrink-0 text-secondary-300" />
              </div>

              <div className="flex gap-2">
                {order.items.map((item, index) => (
                  <Image
                    key={index}
                    src={item.img}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="size-16 rounded-control border border-neutral-300 bg-white object-contain p-1"
                  />
                ))}
              </div>

              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-body-14 text-secondary-300">Total</span>
                  <span className="text-body-16-bold text-[#101828]">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
                <div className="h-9 w-px bg-neutral-300" />
                <div className="flex flex-col">
                  <span className="text-body-14 text-secondary-300">
                    Delivery
                  </span>
                  <span className="text-body-16 text-secondary-900">
                    {order.delivery}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && <OrderDetailsModal order={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-caption-12-bold",
        STATUS_STYLE[status].badge,
      )}
    >
      {status}
    </span>
  );
}

function OrderDetailsModal({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  const router = useRouter();
  const add = useCartStore((s) => s.add);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function reorder() {
    order.items.forEach((item) =>
      add({ name: item.name, priceValue: item.price, img: item.img }, item.qty),
    );
    router.push("/cart");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Order Details"
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-default bg-black/40"
        onClick={onClose}
      />

      <div className="relative flex max-h-[90dvh] w-full max-w-[520px] flex-col overflow-y-auto rounded-card bg-white p-6 shadow-card">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-h4-24 text-[#101828]">Order Details</h2>
            <span className="text-body-14 text-secondary-300">
              {order.id} • {order.date}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-secondary-900 transition-colors hover:text-secondary-500"
          >
            <X className="size-5" />
          </button>
        </div>

        <div
          className={cn(
            "mt-4 flex flex-col gap-0.5 rounded-control px-4 py-3",
            STATUS_STYLE[order.status].banner,
          )}
        >
          <span className="text-body-16-bold">{order.status}</span>
          <span className="text-body-14">{order.statusDate}</span>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <Image
                src={item.img}
                alt={item.name}
                width={56}
                height={56}
                className="size-14 shrink-0 rounded-control border border-neutral-300 bg-white object-contain p-1"
              />
              <div className="flex flex-1 flex-col">
                <span className="text-body-16-bold text-[#101828]">
                  {item.name}
                </span>
                <span className="text-body-14 text-secondary-300">
                  {item.desc}
                </span>
                <span className="text-body-14 text-secondary-300">
                  Qty: {item.qty}
                </span>
              </div>
              <span className="text-body-16-bold text-[#101828]">
                ${item.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-1 border-t border-neutral-300 pt-4">
          <span className="text-body-16-bold text-[#101828]">
            Delivery Address
          </span>
          <span className="text-body-14 text-secondary-900">John Smith</span>
          <span className="text-body-14 text-secondary-900">
            12 George Street, Sydney NSW 2000, AU
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-2 border-t border-neutral-300 pt-4">
          <SummaryRow
            label="Subtotal"
            value={`$${order.subtotal.toFixed(2)}`}
          />
          <SummaryRow
            label={order.shipping === 0 ? "Pickup Fee" : "Shipping"}
            value={`$${order.shipping.toFixed(2)}`}
          />
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-neutral-300 pt-3">
          <span className="text-subtitle-18-bold text-[#101828]">Total</span>
          <span className="text-subtitle-18-bold text-info-500">
            ${order.total.toFixed(2)}
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="flex-1"
          >
            Contact Support
          </Button>
          <Button type="button" size="lg" className="flex-1" onClick={reorder}>
            Reorder
          </Button>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-body-16 text-secondary-500">{label}</span>
      <span className="text-body-16 text-[#101828]">{value}</span>
    </div>
  );
}
