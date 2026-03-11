# Blog Scaffold — OpenPharmacy

## What was set up

A blog section with per-post file structure, a blog index page, shared layout/card components, and prerender integration. The Vite + React + Tailwind stack is unchanged.

## How routing works

The site uses React Router DOM v7 with `BrowserRouter`. Each blog post is its own explicit `<Route>` in `src/App.jsx`. There are no dynamic wildcard routes — every URL must be registered individually. This is intentional: the Puppeteer prerender script also needs each slug listed explicitly.

## Prerendering

The prerender pipeline is a custom Puppeteer script at `scripts/prerender.mjs`. It runs after `vite build` (via `npm run build`) and visits every route listed in the `ROUTES` array, capturing the fully-rendered React HTML and writing it to `dist/` as static `index.html` files. This is what AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) read — they cannot execute JavaScript.

## File structure

```
src/
  data/
    blog/
      posts.js              ← Manifest array — register every post here
  pages/
    BlogIndex.jsx           ← /blog listing page
    blog/
      <slug>.jsx            ← One file per post (e.g. best-escript-apps-australia.jsx)
  components/
    BlogCard.jsx            ← Card used on the index page
    BlogLayout.jsx          ← Layout wrapper used by every post page
scripts/
  prerender.mjs             ← ROUTES array controls what gets prerendered
```

## How to add a new blog post

Do all four steps — skipping any one will cause a broken route or invisible page.

### 1. Add to the manifest — `src/data/blog/posts.js`

```js
{
  slug: "your-post-slug",           // must match the filename and route
  title: "Your Post Title",
  date: "2026-03-11",               // ISO 8601
  excerpt: "One or two sentences.", // shown on the index card
  tags: ["eScripts", "Category"],
}
```

### 2. Create the content file — `src/data/blog/your-post-slug.js`

Export your post content as a JS object or individual named exports. Structure is flexible — just match whatever `src/pages/blog/your-post-slug.jsx` imports.

### 3. Create the page component — `src/pages/blog/your-post-slug.jsx`

```jsx
import React from "react";
import BlogLayout from "../../components/BlogLayout";
import postData from "../../data/blog/your-post-slug";

const meta = {
  title: "Your Post Title",
  description: "Meta description (150–160 chars).",
  slug: "your-post-slug",
  date: "2026-03-11",
  tags: ["eScripts", "Category"],
};

function YourPostSlug() {
  return (
    <BlogLayout meta={meta}>
      {/* Post body as JSX */}
      <p>{postData.intro}</p>
    </BlogLayout>
  );
}

export default YourPostSlug;
```

`BlogLayout` automatically:
- Sets the page `<title>` and meta tags via `usePageMeta`
- Injects a `BlogPosting` JSON-LD schema block
- Renders breadcrumbs: Home › Blog › Post Title
- Renders the H1, date, and tag pills
- Provides the "Back to all guides" link

### 4. Register the route in two places

**`src/App.jsx`** — add import and Route:
```jsx
import YourPostSlug from "./pages/blog/your-post-slug";
// inside <Routes>:
<Route path="/blog/your-post-slug" element={<YourPostSlug />} />
```

**`scripts/prerender.mjs`** — add to ROUTES array:
```js
"/blog/your-post-slug",
```

## BlogLayout — schema prop

`BlogLayout` builds a `BlogPosting` JSON-LD schema automatically from the `meta` prop. If you need a custom schema (e.g. to add `FAQPage` or additional fields), pass it as the `schema` prop:

```jsx
<BlogLayout meta={meta} schema={customSchemaObject}>
```

The custom schema completely replaces the default `BlogPosting` schema, so include all required fields if overriding.

## BlogLayout — optional dateModified

If a post is updated, pass `dateModified` in the meta object to keep the schema accurate:

```js
const meta = {
  // ...
  date: "2026-03-11",
  dateModified: "2026-04-01",
};
```
