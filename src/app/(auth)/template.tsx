import type { ReactNode } from "react";

import { PageTransition } from "@/components/layout/page-transition";

// `template.tsx` remounts on each navigation, replaying the fade transition.
export default function AuthTemplate({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
