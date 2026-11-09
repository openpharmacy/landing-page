import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryView } from "@/features/help/components/category-view";
import { getCategory } from "@/features/help/data/help";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).category);
  return { title: `${category?.title ?? "Help Center"} · Open Pharmacy` };
}

export default async function HelpCategoryPage({ params }: Props) {
  const category = getCategory((await params).category);
  if (!category) notFound();
  return <CategoryView slug={category.slug} />;
}
