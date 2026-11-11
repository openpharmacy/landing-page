"use client";

import { useState } from "react";

import {
  articleCount,
  articleHref,
  categoryArticles,
  getCategory,
  matches,
} from "../data/help";
import type { CategorySlug } from "../data/help-content";
import { ArticleList } from "./article-list";
import { BackLink } from "./back-link";
import { CategoryBadge } from "./category-badge";
import { HelpPage } from "./help-page";
import { NoResults } from "./no-results";
import { SearchField } from "./search-field";

export function CategoryView({ slug }: { slug: CategorySlug }) {
  const category = getCategory(slug)!;
  const [query, setQuery] = useState("");

  const all = categoryArticles(slug);
  const articles = query.trim() ? all.filter((a) => matches(a, query)) : all;

  return (
    <HelpPage className="pt-2.5 pb-[58px]">
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 lg:gap-0">
            <BackLink href="/help" />
            <div className="flex items-center gap-4">
              <CategoryBadge category={slug} className="size-16" />
              <div className="flex min-w-0 flex-col">
                <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
                  {category.title}
                </h1>
                <p className="text-body-14 text-secondary-300 lg:text-body-16">
                  {category.description}
                </p>
              </div>
            </div>
          </div>
          <SearchField
            label={`Search in ${category.title}`}
            placeholder={`Search in ${category.title}...`}
            value={query}
            onChange={setQuery}
          />
        </div>

        <section className="flex flex-col gap-2">
          <p className="text-caption-12 text-secondary-300">
            {articleCount(articles.length)}
          </p>
          {articles.length > 0 ? (
            <ArticleList
              rows={articles.map((article) => ({
                href: articleHref(article),
                title: article.title,
                detail: article.excerpt,
              }))}
            />
          ) : (
            <NoResults />
          )}
        </section>
      </div>
    </HelpPage>
  );
}
