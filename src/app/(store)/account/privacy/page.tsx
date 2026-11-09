import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SettingsMenu } from "@/features/account/components/settings-page";
import { getServerSession } from "@/lib/auth/get-session";

export const metadata: Metadata = {
  title: "Privacy & Security · Open Pharmacy",
};

export default async function PrivacySecurityPage() {
  const user = await getServerSession();
  if (!user) redirect("/sign-in?next=/account/privacy");
  return (
    <SettingsMenu
      backHref="/account"
      title="Privacy & Security"
      rows={[
        {
          href: "/account/settings/password",
          title: "Change Password",
          desc: "Choose a new password for your account.",
        },
        {
          href: "/account/settings/management",
          title: "Account Management",
          desc: "Deactivate or delete your account.",
        },
        {
          href: "/help/prescriptions-scripts/prescription-privacy-and-security",
          title: "How we protect your prescriptions",
          desc: "How your scripts and health information are kept safe.",
        },
        {
          href: "/privacy",
          title: "Privacy Policy",
          desc: "What we collect and how we use it.",
        },
      ]}
    />
  );
}
