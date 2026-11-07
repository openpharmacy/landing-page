import type { Metadata } from "next";

import { Shop } from "@/features/shop/components/shop";
import {
  getAslConnected,
  getScriptsAdded,
  getServerSession,
} from "@/lib/auth/get-session";

export const metadata: Metadata = {
  title: "Shop · Open Pharmacy",
  description: "Browse medications, vitamins and more.",
};

export default async function ShopPage() {
  const user = await getServerSession();
  const [connected, added] = await Promise.all([
    getAslConnected(),
    getScriptsAdded(),
  ]);

  // Has a prescription been uploaded? (ASL connected, or a manual/guest token
  // upload). Drives the green "Script Active" banner + the matching-products row.
  return <Shop hasScript={connected || added} loggedIn={Boolean(user)} />;
}
