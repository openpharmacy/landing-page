"use client";

import { ArrowLeft, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { useCartStore } from "../stores/cart-store";

const emptySubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

type ShippingId = "post" | "doordash" | "pickup";
type PaymentId = "card" | "cash";

const SHIPPING_COST: Record<ShippingId, number> = {
  post: 10,
  doordash: 10,
  pickup: 0,
};

// Mock pharmacies for the pick-up option (no backend — see docs/api-gaps.md).
const PHARMACIES = [
  {
    name: "Priceline Pharmacy World Square, Sydney NSW 2000",
    distance: "7.9 km",
  },
  { name: "Martin Place Pharmacy, Sydney NSW 2000", distance: "8 km" },
  { name: "The Rocks Chemist, Sydney NSW", distance: "9 km" },
];

type OrderData = {
  id: string;
  customerName: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  shipping: ShippingId;
  payment: PaymentId;
  cardLast4: string;
  pharmacyName: string;
  deliveryDate: string;
};

// Mock order number (avoids ambiguous chars) + an estimated date a few days out.
const ID_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function makeOrderId() {
  let code = "";
  for (let i = 0; i < 7; i += 1) {
    code += ID_CHARS[Math.floor(Math.random() * ID_CHARS.length)];
  }
  return `OP-${code}`;
}
function deliveryDateLabel() {
  const date = new Date();
  date.setDate(date.getDate() + 4);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}

/** Checkout page (Figma `57:2526` / `254:2834` / guest `422:8375`). */
export function Checkout({
  loggedIn,
  customerName,
}: {
  loggedIn: boolean;
  customerName: string;
}) {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const hydrated = useHydrated();

  const [shipping, setShipping] = useState<ShippingId>("post");
  const [payment, setPayment] = useState<PaymentId>("card");
  const [pharmacy, setPharmacy] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  // Guests enter their own email + name; signed-in users have them on file.
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [phase, setPhase] = useState<"form" | "processing" | "confirmed">(
    "form",
  );

  const subtotal = items.reduce((sum, i) => sum + i.priceValue * i.qty, 0);
  const shippingCost = SHIPPING_COST[shipping];
  const total = subtotal + shippingCost;

  // Card payments show a brief "processing" screen before confirming (mock).
  useEffect(() => {
    if (phase !== "processing") return;
    const timer = setTimeout(() => setPhase("confirmed"), 2200);
    return () => clearTimeout(timer);
  }, [phase]);

  function placeOrder() {
    // No payments backend — capture a mock order and empty the cart.
    const digits = cardNumber.replace(/\D/g, "");
    setOrder({
      id: makeOrderId(),
      customerName: loggedIn ? customerName : fullName.trim() || "Guest",
      subtotal,
      shippingCost,
      total,
      shipping,
      payment,
      cardLast4: digits.length >= 4 ? digits.slice(-4) : "3456",
      pharmacyName: PHARMACIES[pharmacy].name,
      deliveryDate: deliveryDateLabel(),
    });
    clear();
    // Card runs through the processing screen; cash confirms immediately.
    setPhase(payment === "card" ? "processing" : "confirmed");
  }

  if (phase === "processing") return <ProcessingPayment />;
  if (phase === "confirmed" && order) return <OrderConfirmed order={order} />;

  return (
    <div className="mx-auto w-full max-w-[870px] animate-page-fade px-4 pt-8 pb-20">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/cart"
          aria-label="Back to cart"
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#8BBDE5] bg-primary-500/10 text-secondary-900 transition-colors hover:bg-primary-500/20"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
          Checkout
        </h1>
      </div>

      {!hydrated ? (
        <CheckoutSkeleton />
      ) : items.length === 0 ? (
        <EmptyCheckout />
      ) : (
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-4">
          {/* Shipping + payment (extra bottom space clears the fixed summary). */}
          <div className="flex flex-col gap-4 pb-[280px] lg:pb-0">
            {/* Guests give an email up front (Figma `422:8375`). */}
            {!loggedIn && (
              <section className="flex flex-col gap-4">
                <h2 className="text-title-20 text-[#1C232A]">Email</h2>
                <div className="flex flex-col gap-2 rounded-control border border-[#E5E7EB] bg-white p-4">
                  <Field label="Email">
                    <Input
                      type="email"
                      placeholder="Enter email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </Field>
                  <p className="text-body-14 text-secondary-500">
                    Already have an account?{" "}
                    <Link
                      href="/sign-in?next=/checkout"
                      className="font-bold text-info-500 hover:underline"
                    >
                      Login here
                    </Link>
                  </p>
                </div>
              </section>
            )}
            <section className="flex flex-col gap-4">
              <h2 className="text-title-20 text-[#1C232A]">Shipping Method</h2>
              <div className="flex flex-col gap-2">
                <OptionCard
                  selected={shipping === "post"}
                  onSelect={() => setShipping("post")}
                  title="Australia Post"
                  subtitle="Standard postage • 3-5 business days"
                  trailing={
                    <Image
                      src="/icons/shop/australia-post.webp"
                      alt=""
                      width={24}
                      height={23}
                      className="h-6 w-auto object-contain"
                    />
                  }
                >
                  {loggedIn ? (
                    <AddressBlock label="Ship to" name={customerName} />
                  ) : (
                    <AddressForm
                      label="Ship to"
                      name={fullName}
                      onName={setFullName}
                    />
                  )}
                </OptionCard>

                <OptionCard
                  selected={shipping === "doordash"}
                  onSelect={() => setShipping("doordash")}
                  title="DoorDash Delivery"
                  subtitle="Express delivery • Within 8km radius • 1-2 hours"
                  trailing={
                    <Image
                      src="/icons/shop/doordash.webp"
                      alt=""
                      width={30}
                      height={22}
                      className="h-5 w-auto object-contain"
                    />
                  }
                >
                  {loggedIn ? (
                    <AddressBlock label="Deliver to" name={customerName} />
                  ) : (
                    <AddressForm
                      label="Deliver to"
                      name={fullName}
                      onName={setFullName}
                    />
                  )}
                </OptionCard>

                <OptionCard
                  selected={shipping === "pickup"}
                  onSelect={() => setShipping("pickup")}
                  title="Pick up from Pharmacy"
                  trailing={<Icon src="/icons/checkout/shop.svg" size={24} />}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 rounded-control border border-neutral-300 bg-white px-3 py-2.5">
                      <Icon
                        src="/icons/shop/search.svg"
                        size={20}
                        className="shrink-0"
                      />
                      <input
                        placeholder="Search Pharmacy..."
                        className="w-full bg-transparent text-body-14 text-secondary-900 outline-none placeholder:text-[#9EB6C9]"
                      />
                    </div>
                    <div className="flex flex-col">
                      {PHARMACIES.map((p, index) => (
                        <button
                          key={p.name}
                          type="button"
                          onClick={() => setPharmacy(index)}
                          className="flex items-center gap-3 border-b border-neutral-300 py-3 text-left last:border-0"
                        >
                          <Radio checked={pharmacy === index} />
                          <span className="flex-1 text-body-14 text-secondary-900">
                            {p.name}
                          </span>
                          <span className="shrink-0 text-body-14 text-secondary-300">
                            {p.distance}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </OptionCard>
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-subtitle-18-bold text-secondary-900">
                Payment Method
              </h2>
              <div className="flex flex-col gap-2">
                <OptionCard
                  selected={payment === "card"}
                  onSelect={() => setPayment("card")}
                  title="Online Credit/Debit Card"
                  trailing={<Icon src="/icons/checkout/card.svg" size={24} />}
                >
                  <CardForm
                    name={customerName}
                    value={cardNumber}
                    onChange={setCardNumber}
                  />
                </OptionCard>

                <OptionCard
                  selected={payment === "cash"}
                  onSelect={() => setPayment("cash")}
                  title="Cash or card at Pharmacy"
                  trailing={<Icon src="/icons/checkout/shop.svg" size={24} />}
                />
              </div>
            </section>
          </div>

          {/* Order summary — fixed bottom sheet on mobile (Figma `339:4432`),
              right-column card on desktop. */}
          <div className="fixed inset-x-0 bottom-0 z-30 flex flex-col gap-6 rounded-t-[20px] border-t border-[#E5E7EB] bg-white px-4 pt-6 pb-8 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] lg:static lg:rounded-card lg:border lg:p-6 lg:shadow-none">
            <h2 className="text-title-20 text-[#101828]">Order Summary</h2>
            <div className="flex flex-col gap-3">
              <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <SummaryRow
                label="Shipping"
                value={`$${shippingCost.toFixed(2)}`}
                muted
              />
            </div>
            <div className="h-px bg-neutral-300" />
            <div className="flex items-center justify-between">
              <span className="text-subtitle-18-bold text-[#101828]">
                Total
              </span>
              <span className="text-title-20 text-info-500">
                ${total.toFixed(2)}
              </span>
            </div>
            <Button
              type="button"
              size="lg"
              className="w-full"
              onClick={placeOrder}
            >
              Order and Pay
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/** A selectable shipping / payment card; `children` show when selected. */
function OptionCard({
  selected,
  onSelect,
  title,
  subtitle,
  trailing,
  children,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  subtitle?: string;
  trailing: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-control border bg-white p-4 transition-colors",
        selected ? "border-info-500" : "border-[#E5E7EB]",
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        className="flex w-full items-center gap-2 text-left"
      >
        <Radio checked={selected} />
        <div className="flex flex-1 flex-col">
          <span className="text-body-16-bold text-[#1C232A]">{title}</span>
          {subtitle && (
            <span className="text-caption-12 text-text-muted">{subtitle}</span>
          )}
        </div>
        <span className="shrink-0">{trailing}</span>
      </button>
      {selected && children && (
        <div className="mt-4 border-t border-neutral-300 pt-4">{children}</div>
      )}
    </div>
  );
}

function AddressBlock({ label, name }: { label: string; name: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-body-16-bold text-[#1C232A]">{label}</span>
        <button
          type="button"
          className="rounded-control px-4 py-2 text-body-14 font-bold text-info-500 transition-colors hover:bg-info-500/5"
        >
          Edit
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-body-14 text-[#1C232A]">{name}</span>
        <span className="flex items-center gap-1 text-body-14 text-[#1C232A]">
          <Icon
            src="/icons/checkout/map-pin.svg"
            size={18}
            className="shrink-0"
          />
          12 George Street, Sydney NSW 2000, AU
        </span>
        <span className="flex items-center gap-1 text-body-14 text-[#1C232A]">
          <Icon
            src="/icons/checkout/phone.svg"
            size={18}
            className="shrink-0"
          />
          0412 345 678
        </span>
      </div>
    </div>
  );
}

/** Editable shipping address for guest checkout (Figma `422:8375`). */
function AddressForm({
  label,
  name,
  onName,
}: {
  label: string;
  name: string;
  onName: (value: string) => void;
}) {
  const [createAccount, setCreateAccount] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <span className="text-body-16-bold text-[#1C232A]">{label}</span>
      <Field label="Full Name">
        <Input
          placeholder="Enter Name"
          autoComplete="name"
          value={name}
          onChange={(event) => onName(event.target.value)}
        />
      </Field>
      <Field label="Street Address">
        <Input placeholder="Enter Address" autoComplete="address-line1" />
      </Field>
      <Input
        placeholder="Additional info, e.g. Apt 10"
        autoComplete="address-line2"
        aria-label="Additional address info"
      />
      <Field label="City">
        <Input placeholder="Enter City" autoComplete="address-level2" />
      </Field>
      <Field label="Postcode">
        <Input
          placeholder="Enter Postcode"
          autoComplete="postal-code"
          inputMode="numeric"
        />
      </Field>
      <Field label="Phone Number">
        <Input
          type="tel"
          placeholder="Enter Phone Number"
          autoComplete="tel"
          inputMode="tel"
        />
      </Field>
      <label className="flex cursor-pointer items-center gap-2">
        <Checkbox
          checked={createAccount}
          onCheckedChange={(checked) => setCreateAccount(checked === true)}
        />
        <span className="text-body-14 text-[#101828]">Create an account</span>
      </label>
    </div>
  );
}

function CardForm({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [saveCard, setSaveCard] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <Field label="Card Number">
        <Input
          placeholder="1234 5678 9012 3456"
          inputMode="numeric"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </Field>
      <Field label="Cardholder Name">
        <Input placeholder={name} autoComplete="cc-name" />
      </Field>
      <div className="flex gap-[23px]">
        <Field label="Expiry Date">
          <Input placeholder="MM/YY" inputMode="numeric" />
        </Field>
        <Field label="CVV">
          <Input placeholder="123" inputMode="numeric" />
        </Field>
      </div>
      <label className="flex cursor-pointer items-center gap-2">
        <Checkbox
          checked={saveCard}
          onCheckedChange={(c) => setSaveCard(c === true)}
        />
        <span className="text-body-14 text-[#101828]">
          Save card for future purchases
        </span>
      </label>
      <div className="flex items-center gap-2 rounded-control bg-[#F9FAFB] p-3">
        <Icon src="/icons/checkout/lock.svg" size={16} className="shrink-0" />
        <span className="text-caption-12 text-text-muted">
          Your payment information is encrypted and secure
        </span>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Radio({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors",
        checked ? "border-info-500" : "border-neutral-300",
      )}
    >
      {checked && <span className="size-2 rounded-full bg-info-500" />}
    </span>
  );
}

function SummaryRow({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-body-16 text-text-muted">{label}</span>
      <span
        className={cn(
          "text-body-16",
          muted ? "text-text-muted" : "text-[#101828]",
        )}
      >
        {value}
      </span>
    </div>
  );
}

/** Processing-payment interstitial (Figma `254:3037`). */
function ProcessingPayment() {
  return (
    <div className="mx-auto flex w-full max-w-[670px] animate-page-fade flex-col items-center gap-6 px-4 py-24">
      <div className="flex flex-col items-center gap-4 rounded-[20px] bg-white px-12 py-9 shadow-card">
        <Icon
          src="/icons/checkout/processing-card.svg"
          size={64}
          className="animate-pulse"
        />
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-h4-24 text-secondary-900">Processing Payment</h1>
          <p className="text-body-16 text-secondary-500">
            Please wait while we process your payment...
          </p>
        </div>
      </div>
      <p className="text-body-14 text-text-muted">
        🔒 Your payment is secure and encrypted
      </p>
    </div>
  );
}

/** Order confirmation (Figma `254:2958`). */
function OrderConfirmed({ order }: { order: OrderData }) {
  const isPickup = order.shipping === "pickup";
  const isCash = order.payment === "cash";

  return (
    <div className="mx-auto w-full max-w-[670px] animate-page-fade px-4 py-10">
      <div className="flex flex-col items-center gap-6">
        {/* Tick + message */}
        <div className="flex flex-col items-center gap-2 text-center">
          <Icon src="/icons/checkout/confirmed-tick.svg" size={120} />
          <div className="flex flex-col gap-2">
            <h1 className="text-h4-24 text-secondary-900">Order Confirmed!</h1>
            <p className="text-body-16 text-secondary-500">
              Your order was placed successfully.
              <br />
              Order details have been sent to your email.
            </p>
          </div>
        </div>

        {/* Order details */}
        <div className="w-full rounded-card border border-[#E5E7EB] bg-white p-6">
          <div className="flex items-center justify-between gap-4 pb-4">
            <h2 className="text-title-20 text-[#101828]">Order Details</h2>
            <span className="text-body-16-bold text-info-500">{order.id}</span>
          </div>
          <div className="h-px bg-[#E5E7EB]" />

          <div className="flex flex-col gap-6 py-6">
            <DetailRow
              icon="/icons/checkout/confirm-delivery.svg"
              title={isPickup ? "Estimated Pickup" : "Estimated Delivery"}
            >
              <span className="text-body-14 text-secondary-500">
                {order.deliveryDate}
              </span>
            </DetailRow>

            <DetailRow
              icon="/icons/checkout/confirm-address.svg"
              title={isPickup ? "Pickup Location" : "Delivery Address"}
            >
              {isPickup ? (
                <span className="text-body-14 text-secondary-500">
                  {order.pharmacyName}
                </span>
              ) : (
                <div className="flex flex-col">
                  <span className="text-body-14 text-secondary-500">
                    {order.customerName}
                  </span>
                  <span className="text-body-14 text-secondary-500">
                    12 George Street, Sydney NSW 2000, AU
                  </span>
                </div>
              )}
            </DetailRow>

            <DetailRow
              icon="/icons/checkout/confirm-payment.svg"
              title="Payment Method"
            >
              <span className="text-body-14 text-secondary-500">
                {isCash ? "Cash or card at Pharmacy" : "Credit/Debit Card"}
              </span>
              {!isCash && (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-[6px] bg-success-500/15 px-2 py-0.5 text-caption-12-bold text-success-500">
                    <Check className="size-3" />
                    Paid
                  </span>
                  <span className="text-body-14 text-secondary-500">
                    •••• {order.cardLast4}
                  </span>
                </div>
              )}
            </DetailRow>
          </div>

          <div className="flex flex-col gap-2 border-t border-[#E5E7EB] pt-6">
            <SummaryRow
              label="Subtotal"
              value={`$${order.subtotal.toFixed(2)}`}
            />
            <SummaryRow
              label="Shipping"
              value={`$${order.shippingCost.toFixed(2)}`}
            />
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-[#E5E7EB] pt-4">
            <span className="text-subtitle-18-bold text-[#101828]">
              {isCash ? "Total (Pay at Pickup)" : "Total"}
            </span>
            <span className="text-subtitle-18-bold text-info-500">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Actions — side by side (Figma `339:4563`); tighter padding on mobile
            so both fit one row. */}
        <div className="flex w-full gap-3">
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="flex-1 px-3 sm:px-8"
          >
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild size="lg" className="flex-1 px-3 sm:px-8">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <Icon src={icon} size={44} className="shrink-0" />
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-body-16-bold text-[#101828]">{title}</span>
        {children}
      </div>
    </div>
  );
}

function EmptyCheckout() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-card border border-[#E5E7EB] bg-white px-6 py-16 text-center">
      <p className="text-body-16 text-secondary-300">
        Your cart is empty — add items before checking out.
      </p>
      <Button asChild size="lg">
        <Link href="/shop">Browse Shop</Link>
      </Button>
    </div>
  );
}

function CheckoutSkeleton() {
  return (
    <div className="grid animate-pulse gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="flex flex-col gap-4">
        <div className="h-[224px] rounded-control bg-[#E2E8F0]" />
        <div className="h-[72px] rounded-control bg-[#E2E8F0]" />
        <div className="h-[56px] rounded-control bg-[#E2E8F0]" />
      </div>
      <div className="h-[280px] rounded-card bg-[#E2E8F0]" />
    </div>
  );
}
