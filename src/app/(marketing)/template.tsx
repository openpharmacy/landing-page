import type { ReactNode } from "react";

import { PageTransition } from "@/components/layout/page-transition";

export default function MarketingTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return <PageTransition>{children}</PageTransition>;
}
