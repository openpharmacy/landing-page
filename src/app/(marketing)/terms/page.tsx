import type { Metadata } from "next";

import { PolicyPage } from "@/components/layout/policy-page";

export const metadata: Metadata = { title: "Terms of Use · Open Pharmacy" };

export default function TermsPage() {
  return (
    <PolicyPage title="Terms of Use">
      Our terms of use will be published here.
    </PolicyPage>
  );
}
