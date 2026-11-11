"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { articleHref, getCategory, searchArticles } from "../data/help";
import { ArticleList } from "./article-list";
import { BackLink } from "./back-link";
import { HelpPage } from "./help-page";
import { NoResults } from "./no-results";
import { SearchField } from "./search-field";

export function SearchView({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const term = query.trim();
  const results = term ? searchArticles(term) : [];

  function update(value: string) {
    setQuery(value);
    const q = value.trim();
    window.history.replaceState(
      null,
      "",
      q ? `?q=${encodeURIComponent(q)}` : window.location.pathname,
    );
  }

  return (
    <HelpPage className="min-h-[609px] pt-2.5 pb-[15px] lg:min-h-[944px]">
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 lg:gap-0">
            <BackLink href="/help" />
            <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
              Search Help Center
            </h1>
          </div>
          <SearchField
            label="Search help articles"
            placeholder="Search for help articles..."
            value={query}
            onChange={update}
          />
        </div>

        {term && (
          <section
            className={cn(
              "flex flex-col gap-2",
              results.length === 0 && "-mt-3 lg:mt-0",
            )}
            aria-live="polite"
          >
            {results.length > 0 ? (
              <>
                <p className="text-caption-12 text-secondary-300">
                  Found <strong>{results.length}</strong>{" "}
                  {results.length === 1 ? "result" : "results"} for{" "}
                  <strong>&quot;{term}&quot;</strong>
                </p>
                <ArticleList
                  rows={results.map((article) => ({
                    href: articleHref(article),
                    title: article.title,
                    kicker: getCategory(article.category)?.title,
                    detail: article.excerpt,
                  }))}
                />
              </>
            ) : (
              <>
                <p className="text-caption-12 text-secondary-300">
                  No results found for <strong>&quot;{term}&quot;</strong>
                </p>
                <NoResults />
              </>
            )}
          </section>
        )}
      </div>
    </HelpPage>
  );
}
