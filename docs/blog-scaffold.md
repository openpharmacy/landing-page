# Blog Section Scaffold

## What was set up

| File | Purpose |
|------|---------|
| `src/data/BlogPosts.js` | Empty post registry — single source of truth for all articles |
| `src/components/BlogPost.jsx` | Layout wrapper: breadcrumbs, H1, author byline, article body, related posts, sticky download CTA |
| `src/pages/BlogIndex.jsx` | `/blog` index page — lists all posts sorted newest first |
| `src/pages/BlogPostPage.jsx` | `/blog/:slug` route handler — resolves slug, injects Article JSON-LD schema, renders body via BlogPost |

## How routing works

Routes are registered in `src/App.jsx`:

```jsx
<Route path="/blog" element={<BlogIndex />} />
<Route path="/blog/:slug" element={<BlogPostPage />} />
```

URL structure: `/blog/[slug]` where `slug` matches the `slug` field in `BlogPosts.js`.

## How to add a new blog post

### 1. Add an entry to `src/data/BlogPosts.js`

```js
{
  slug: "your-post-slug",           // becomes the URL: /blog/your-post-slug
  title: "Your Article Headline",
  description: "150-160 char summary used as meta description and index card excerpt.",
  date: "2026-03-11",               // ISO 8601 — newest posts sort first on the index
  author: "OpenPharmacy Team",
  sections: [
    {
      heading: null,                // null = no <h2>; use for intro paragraphs
      paragraphs: [
        "First paragraph text.",
        "Second paragraph text.",
      ],
    },
    {
      heading: "Section Heading",   // renders as <h2>
      paragraphs: ["Paragraph..."],
      list: ["Bullet one", "Bullet two"],  // optional; renders as <ul>
    },
  ],
  relatedSlugs: ["another-post-slug"],  // up to 3; renders Related Articles block
}
```

### 2. Add the route to the prerender list in `scripts/prerender.mjs`

```js
const ROUTES = [
  // ... existing routes
  "/blog",
  "/blog/your-post-slug",   // add this line
];
```

This step is **critical**. AI crawlers (GPTBot, ClaudeBot, PerplexityBot) do not execute JavaScript. Without a pre-rendered HTML file at `dist/blog/your-post-slug/index.html`, those crawlers see an empty page.

### 3. Add the URL to `public/sitemap.xml`

```xml
<url>
  <loc>https://openpharmacy.com/blog/your-post-slug</loc>
  <lastmod>2026-03-11</lastmod>
  <priority>0.7</priority>
</url>
```

## What each file renders

### BlogIndex (`/blog`)
- Page title: `OpenPharmacy Blog — eScript & Digital Health Guides`
- Blog JSON-LD schema (schema.org/Blog)
- Sorted list of all posts (newest first) with title, date, author, description, and link

### BlogPostPage (`/blog/:slug`)
- Per-post `<title>`, `<meta name="description">`, `<link rel="canonical">`
- Article JSON-LD schema (schema.org/Article) with headline, datePublished, author, publisher
- 404 state if slug not found, with a back-to-blog link

### BlogPost layout component
- Breadcrumb: Home / Blog / Article Title (BreadcrumbList-compatible markup)
- `<h1>` with article title
- Author byline with formatted date
- Article body: sections with optional `<h2>`, paragraphs, and bullet lists
- Related Articles block (only renders if `relatedSlugs` resolves to known posts)
- Sticky bottom CTA with App Store and Google Play download buttons

## AI visibility notes

- Every post gets Article JSON-LD schema — this is what AI models (especially ChatGPT and Perplexity) use to extract and cite article content.
- The `author` field in schema should use a real name where possible — AI models weight bylined content more heavily.
- `datePublished` in schema must match the actual publish date — using future dates or fake freshness signals can reduce trust.
- The prerender step is non-negotiable: without it, all of the above schema is invisible to AI crawlers.
