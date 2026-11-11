import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SettingsMenu } from "@/features/account/components/settings-page";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = { title: "Account · Open Pharmacy" };

export default async function AccountSettingsPage() {
  const user = await getServerSession();
  if (!user) redirect("/sign-in?next=/account/settings");
  return (
    <SettingsMenu
      backHref="/account"
      title="Account"
      rows={[
        { href: "/account/settings/password", title: "Change Password" },
        { href: "/account/settings/management", title: "Account Management" },
      ]}
    />
  );
}
