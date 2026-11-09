import { describe, expect, it } from "vitest";

import {
  articleCount,
  articleHref,
  categoryArticles,
  getArticle,
  getCategory,
  readTime,
  searchArticles,
  searchHref,
  updatedLabel,
} from "./help";
import {
  HELP_ARTICLES,
  HELP_CATEGORIES,
  POPULAR_ARTICLES,
  type HelpArticle,
} from "./help-content";

const article = (overrides: Partial<HelpArticle>): HelpArticle => ({
  slug: "a",
  title: "A",
  category: "general-information",
  updated: "2026-11-06",
  intro: "",
  ...overrides,
});

describe("help content", () => {
  it("lists each article once", () => {
    const slugs = HELP_ARTICLES.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const titles = HELP_ARTICLES.map((a) => a.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("gives every article a known category, a body and a real date", () => {
    for (const a of HELP_ARTICLES) {
      expect(getCategory(a.category)).toBeDefined();
      expect(a.intro.length).toBeGreaterThan(0);
      expect(a.updated).toMatch(/^2026-\d{2}-\d{2}$/);
    }
  });

  it("has at least one article in every category", () => {
    for (const category of HELP_CATEGORIES) {
      expect(categoryArticles(category.slug).length).toBeGreaterThan(0);
    }
  });

  it("counts every article in exactly one category", () => {
    const counts = HELP_CATEGORIES.map((c) => categoryArticles(c.slug).length);
    expect(counts.reduce((a, b) => a + b, 0)).toBe(HELP_ARTICLES.length);
    expect(counts).toEqual([8, 4, 1, 4, 2, 2]);
  });

  it("keeps the articles other screens link to", () => {
    for (const slug of [
      "where-to-find-my-escript-token",
      "setting-up-active-script-list",
      "prescription-privacy-and-security",
    ]) {
      expect(getArticle(slug)?.category).toBe("prescriptions-scripts");
    }
  });

  it("lists only known popular articles", () => {
    for (const slug of POPULAR_ARTICLES) expect(getArticle(slug)).toBeDefined();
  });
});

describe("searchArticles", () => {
  it("returns each matching article once", () => {
    const titles = searchArticles("order").map((a) => a.title);
    expect(titles.slice(0, 3)).toEqual([
      "How to upload a prescription",
      "How to track my order",
      "Order problems and missing items",
    ]);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("finds nothing for the drawn no-results query", () => {
    expect(searchArticles("how do i askajsaj")).toEqual([]);
  });

  it("needs every word and ignores case", () => {
    expect(searchArticles("TRACK order")[0]?.title).toBe(
      "How to track my order",
    );
    expect(searchArticles("track refund")).toEqual([]);
  });

  it("searches the article text", () => {
    expect(searchArticles("activation code").map((a) => a.slug)).toContain(
      "setting-up-active-script-list",
    );
  });

  it("finds nothing for a blank query", () => {
    expect(searchArticles("   ")).toEqual([]);
  });
});

describe("links and labels", () => {
  it("builds article and search links", () => {
    expect(articleHref(getArticle("how-to-track-my-order")!)).toBe(
      "/help/orders-delivery/how-to-track-my-order",
    );
    expect(searchHref("  how do i  ")).toBe("/help/search?q=how%20do%20i");
  });

  it("counts articles", () => {
    expect(articleCount(1)).toBe("1 article");
    expect(articleCount(12)).toBe("12 articles");
  });

  it("estimates the reading time from the text", () => {
    expect(readTime(article({ intro: "word" }))).toBe("1 min read");
    expect(
      readTime(article({ intro: Array(600).fill("word").join(" ") })),
    ).toBe("3 min read");
  });

  it("formats the update date", () => {
    expect(updatedLabel(article({ updated: "2026-11-06" }))).toBe(
      "Updated November 6, 2026",
    );
    expect(updatedLabel(article({ updated: "2026-03-15" }))).toBe(
      "Updated March 15, 2026",
    );
  });
});
