import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { MyOrders } from "@/features/account/components/my-orders";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = { title: "My Orders · Open Pharmacy" };

export default async function OrdersPage() {
  const user = await getServerSession();
  if (!user) redirect("/sign-in?next=/account/orders");
  return <MyOrders />;
}
