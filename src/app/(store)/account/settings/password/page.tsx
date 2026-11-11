import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ChangePasswordFlow } from "@/features/account/components/change-password-flow";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = { title: "Change Password · Open Pharmacy" };

export default async function ChangePasswordPage() {
  const user = await getServerSession();
  if (!user) redirect("/sign-in?next=/account/settings/password");
  return <ChangePasswordFlow />;
}
