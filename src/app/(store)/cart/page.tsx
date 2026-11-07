import type { Metadata } from "next";

import { ShoppingCart } from "@/features/shop/components/shopping-cart";
import { getAslConnected, getScriptsAdded } from "@/lib/auth/get-session";

export const metadata: Metadata = { title: "Shopping Cart · Open Pharmacy" };

export default async function CartPage() {
  // Anyone can view the cart and check out, with or without an account.
  // A connected ASL or any uploaded script satisfies the prescription gate.
  const [connected, added] = await Promise.all([
    getAslConnected(),
    getScriptsAdded(),
  ]);

  return <ShoppingCart hasScript={connected || added} />;
}
