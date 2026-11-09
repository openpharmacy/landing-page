import type { Metadata } from "next";

import { PolicyPage } from "@/components/layout/policy-page";

export const metadata: Metadata = { title: "Shipping Policy · Open Pharmacy" };

export default function ShippingPage() {
  return (
    <PolicyPage title="Shipping Policy">
      OpenPharmacy doesn’t sell or deliver medicines yet. If that changes, our
      shipping policy will be published here.
    </PolicyPage>
  );
}
