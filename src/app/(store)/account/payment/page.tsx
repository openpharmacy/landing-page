import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { PaymentMethods } from "@/features/account/components/payment-methods";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = { title: "Payment Methods · Open Pharmacy" };

export default async function PaymentPage() {
  const user = await getServerSession();
  if (!user) redirect("/sign-in?next=/account/payment");
  return <PaymentMethods />;
}
