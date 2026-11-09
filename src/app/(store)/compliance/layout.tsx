import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { showHiddenScreens } from "@/lib/features";

export default async function ComplianceLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!(await showHiddenScreens())) notFound();
  return children;
}
