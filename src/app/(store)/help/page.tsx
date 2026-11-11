import type { Metadata } from "next";

import { HelpHome } from "@/features/help/components/help-home";

export const metadata: Metadata = { title: "Help Center · Open Pharmacy" };

export default function HelpCenterPage() {
  return <HelpHome />;
}
