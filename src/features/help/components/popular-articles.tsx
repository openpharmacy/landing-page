import { articleHref, getArticle, getCategory } from "../data/help";
import { POPULAR_ARTICLES } from "../data/help-content";
import { ArticleList, type ArticleRow } from "./article-list";

export function PopularArticles({ count }: { count?: number }) {
  const rows: ArticleRow[] = POPULAR_ARTICLES.slice(0, count).flatMap(
    (slug) => {
      const article = getArticle(slug);
      if (!article) return [];
      return {
        href: articleHref(article),
        title: article.title,
        detail: getCategory(article.category)?.title,
      };
    },
  );

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-h4-24 text-secondary-900">Popular Articles</h2>
      <ArticleList rows={rows} />
    </section>
  );
}
