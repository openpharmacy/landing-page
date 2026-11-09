import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleView } from "@/features/help/components/article-view";
import { getArticle } from "@/features/help/data/help";

type Props = { params: Promise<{ category: string; article: string }> };

async function findArticle(params: Props["params"]) {
  const { category, article: slug } = await params;
  const article = getArticle(slug);
  return article?.category === category ? article : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await findArticle(params);
  return { title: `${article?.title ?? "Help Center"} · Open Pharmacy` };
}

export default async function HelpArticlePage({ params }: Props) {
  const article = await findArticle(params);
  if (!article) notFound();
  return <ArticleView article={article} />;
}
