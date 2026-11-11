import {
  HELP_ARTICLES,
  HELP_CATEGORIES,
  type CategorySlug,
  type HelpArticle,
  type HelpCategory,
} from "./help-content";

const ARTICLES = new Map(HELP_ARTICLES.map((a) => [a.slug, a]));
const CATEGORIES = new Map(HELP_CATEGORIES.map((c) => [c.slug, c]));

export function getCategory(slug: string): HelpCategory | undefined {
  return CATEGORIES.get(slug as CategorySlug);
}

export function getArticle(slug: string): HelpArticle | undefined {
  return ARTICLES.get(slug);
}

export function articleHref(article: HelpArticle) {
  return `/help/${article.category}/${article.slug}`;
}

export function categoryArticles(category: CategorySlug): HelpArticle[] {
  return HELP_ARTICLES.filter((a) => a.category === category);
}

function bodyText(article: HelpArticle) {
  return [
    article.intro,
    ...(article.sections ?? []).flatMap((s) => [
      s.title,
      s.lead,
      ...(s.items ?? []),
    ]),
  ]
    .filter(Boolean)
    .join(" ");
}

function searchText(article: HelpArticle) {
  return [
    article.title,
    article.excerpt,
    ...(article.keywords ?? []),
    bodyText(article),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function matches(article: HelpArticle, query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return false;
  const text = searchText(article);
  return words.every((word) => text.includes(word));
}

export function searchArticles(query: string): HelpArticle[] {
  return HELP_ARTICLES.filter((a) => matches(a, query));
}

export function articleCount(n: number) {
  return `${n} ${n === 1 ? "article" : "articles"}`;
}

export function readTime(article: HelpArticle) {
  const words = bodyText(article).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function updatedLabel(article: HelpArticle) {
  const [year, month, day] = article.updated.split("-").map(Number);
  return `Updated ${MONTHS[month - 1]} ${day}, ${year}`;
}

export function searchHref(query: string) {
  return `/help/search?q=${encodeURIComponent(query.trim())}`;
}
