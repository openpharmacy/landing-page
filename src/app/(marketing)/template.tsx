import type { ReactNode } from "react";

import { PageTransition } from "@/components/layout/page-transition";

// `template.tsx` remounts on each navigation, replaying the slide transition.
export default function MarketingTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return <PageTransition>{children}</PageTransition>;
}
