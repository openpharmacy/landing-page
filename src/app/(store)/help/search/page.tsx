import type { Metadata } from "next";

import { SearchView } from "@/features/help/components/search-view";

export const metadata: Metadata = {
  title: "Search Help Center · Open Pharmacy",
};

export default async function HelpSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q) ?? "";
  return <SearchView key={query} initialQuery={query} />;
}
