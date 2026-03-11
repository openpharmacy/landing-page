/**
 * Blog post registry for OpenPharmacy.
 *
 * HOW TO ADD A POST (for future content jobs):
 * 1. Create a new file in src/data/posts/ (e.g. src/data/posts/my-post-slug.js)
 *    exporting a default object that matches the PostEntry shape below.
 * 2. Import it here and append it to the `posts` array (most recent first).
 * 3. Add a <url> entry to public/sitemap.xml for the new slug.
 *    (scripts/prerender.mjs auto-derives post routes from this registry — no manual update needed.)
 *
 * PostEntry shape:
 * {
 *   slug:        string   — URL-safe slug, e.g. "how-to-manage-escripts-offline"
 *   title:       string   — Full post title (used in <h1>, <title>, og:title)
 *   date:        string   — ISO 8601 publish date, e.g. "2026-03-11"
 *   updated:     string   — ISO 8601 last-modified date (can equal date on first publish)
 *   excerpt:     string   — 1–2 sentence summary shown on the index card and as meta description
 *   tags:        string[] — Array of topic tags, e.g. ["eScripts", "Security"]
 *   author:      string   — Display name, e.g. "OpenPharmacy Team"
 *   content:     Section[] — Array of content section objects (see Section shape below)
 *   faqItems:    FaqItem[] | null — Optional FAQ items for FAQPage schema (null if none)
 *   relatedSlugs: string[] — Up to 3 slugs of related posts (can be empty [])
 * }
 *
 * Section shape:
 * {
 *   heading:    string | null  — H2 heading text, or null for intro sections with no heading
 *   paragraphs: string[]       — Array of paragraph strings rendered as <p> tags
 *   list:       string[] | null — Optional bullet list items, or null
 * }
 *
 * FaqItem shape:
 * {
 *   q: string — Question text
 *   a: string — Answer text (plain text, no HTML)
 * }
 */

import bestEscriptAppsAustralia2026 from "./best-escript-apps-australia-2026.js";
import whatAreAustralianEscripts from "./what-are-australian-escripts.js";

/** @type {PostEntry[]} */
const posts = [
  // Most recent first.
  bestEscriptAppsAustralia2026,
  whatAreAustralianEscripts,
];

export default posts;
