import type { Metadata } from "next";

import { Checkout } from "@/features/shop/components/checkout";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = { title: "Checkout · Open Pharmacy" };

export default async function CheckoutPage() {
  // Guests check out too: signed-in users get a pre-filled address, guests an
  // email + address form.
  const user = await getServerSession();
  const customerName = user
    ? `${user.firstName} ${user.lastName}`.trim() || "John Smith"
    : "";
  return <Checkout loggedIn={Boolean(user)} customerName={customerName} />;
}
