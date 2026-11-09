import type { Metadata } from "next";

import { PolicyPage } from "@/components/layout/policy-page";

export const metadata: Metadata = { title: "Privacy Policy · Open Pharmacy" };

export default function PrivacyPage() {
  return (
    <PolicyPage title="Privacy Policy">
      Our privacy policy will be published here.
    </PolicyPage>
  );
}
