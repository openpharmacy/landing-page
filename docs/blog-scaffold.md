# Blog Scaffold — OpenPharmacy

How the blog is wired up and how future content jobs should add posts.

---

## What was set up

| File | Purpose |
|------|---------|
| `src/data/posts/index.js` | Central post registry. Empty array on scaffold. All post objects live here. |
| `src/pages/Blog.jsx` | `/blog` index page. Maps over the registry and renders a card grid. |
| `src/pages/BlogPost.jsx` | `/blog/:slug` dynamic template. Looks up a post by slug and renders the full article. |
| `src/App.jsx` | `/blog` and `/blog/:slug` routes added. |
| `src/components/NavBar.jsx` | "Blog" link added to desktop nav and mobile drawer (after FAQ). |
| `public/sitemap.xml` | `/blog` entry added. Post slugs added manually as posts are published (see below). |
| `scripts/prerender.mjs` | `/blog` added to static ROUTES. Post slug routes auto-generated from the registry. |

---

## How to add a new post

### 1. Create the post content file

Create `src/data/posts/your-post-slug.js` exporting a default object:

```js
const post = {
  slug: "your-post-slug",
  title: "Your Post Title",
  date: "2026-03-11",          // ISO 8601 publish date
  updated: "2026-03-11",       // ISO 8601 last-modified (equal to date on first publish)
  excerpt: "One or two sentences describing the post. Used on the index card and as meta description.",
  tags: ["eScripts", "Security"],
  author: "OpenPharmacy Team",
  content: [
    {
      heading: null,            // null = no H2 for the intro section
      paragraphs: [
        "First introductory paragraph.",
        "Second introductory paragraph.",
      ],
      list: null,
    },
    {
      heading: "First Section Heading",
      paragraphs: [
        "Paragraph under the first heading.",
      ],
      list: [
        "Optional bullet item one",
        "Optional bullet item two",
      ],
    },
  ],
  faqItems: [
    // Optional. Include if the post answers specific questions.
    // Each item generates a FAQPage JSON-LD schema entity.
    { q: "Question text?", a: "Answer text." },
  ],
  relatedSlugs: [],             // Up to 3 slugs of related posts (empty array is fine)
};

export default post;
```

### 2. Register the post in the registry

Open `src/data/posts/index.js` and add the import + array entry at the top of the posts array (most recent first):

```js
import yourPost from "./your-post-slug.js";

const posts = [
  yourPost,
  // ...existing posts below
];
```

### 3. Add the URL to the sitemap

Open `public/sitemap.xml` and add a `<url>` block inside `<urlset>`:

```xml
<url>
  <loc>https://openpharmacy.com/blog/your-post-slug</loc>
  <lastmod>2026-03-11</lastmod>
  <priority>0.7</priority>
</url>
```

**No changes needed to `scripts/prerender.mjs`.** The prerender script imports the registry at build time and derives all `/blog/:slug` routes automatically. Registering the post in step 2 is sufficient.

---

## Schema generated per post

`BlogPost.jsx` fires two JSON-LD schema types on every post via `usePageMeta`:

- **Article** — `headline`, `description`, `datePublished`, `dateModified`, `author`, `publisher`, `mainEntityOfPage`
- **FAQPage** — only emitted if `post.faqItems` is a non-empty array

Both are combined into a single `@graph` block so they coexist under one `<script id="page-schema">` tag.

The blog index page (`Blog.jsx`) emits a **Blog** schema (`@type: Blog`) with publisher information.

---

## Routing

| URL | Component | Notes |
|-----|-----------|-------|
| `/blog` | `Blog.jsx` | Index listing of all posts |
| `/blog/:slug` | `BlogPost.jsx` | Looks up post by `slug` field in registry |
| Unknown slug | `BlogPost.jsx` | Renders "Article Not Found" fallback |

---

## Table of contents

`BlogPost.jsx` renders an "In this article" table of contents automatically when a post has **3 or more sections with a non-null `heading`**. Short posts (fewer than 3 headings) get no ToC.

---

## Pre-rendering

The `scripts/prerender.mjs` script imports the post registry at build time and generates a route string for every post. No manual update to the prerender script is needed when adding new posts — just register the post in `src/data/posts/index.js`.
