import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ShippingAddresses } from "@/features/account/components/shipping-addresses";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = {
  title: "Shipping Addresses · Open Pharmacy",
};

export default async function AddressesPage() {
  const user = await getServerSession();
  if (!user) redirect("/sign-in?next=/account/addresses");
  return <ShippingAddresses />;
}
