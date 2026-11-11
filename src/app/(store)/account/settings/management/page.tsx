import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SettingsMenu } from "@/features/account/components/settings-page";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = {
  title: "Account Management · Open Pharmacy",
};

export default async function AccountManagementPage() {
  const user = await getServerSession();
  if (!user) redirect("/sign-in?next=/account/settings/management");
  return (
    <SettingsMenu
      backHref="/account/settings"
      title="Account Management"
      rows={[
        {
          href: "/account/settings/deactivate",
          title: "Deactivate Account",
          desc: "Hide your profile temporarily. You can return anytime by logging back in.",
        },
        {
          href: "/account/settings/delete",
          title: "Delete Account",
          desc: "Permanently remove your profile. This action cannot be undone.",
        },
      ]}
    />
  );
}
