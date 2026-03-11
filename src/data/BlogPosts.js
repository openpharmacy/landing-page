/**
 * Blog post registry for OpenPharmacy.
 *
 * Each entry is rendered by src/pages/BlogPostPage.jsx via the /blog/:slug route.
 * The BlogIndex page (src/pages/BlogIndex.jsx) lists all posts from this array.
 *
 * Entry shape:
 * {
 *   slug:        string  — URL segment, e.g. "how-to-manage-escripts" → /blog/how-to-manage-escripts
 *   title:       string  — Article headline (used as <h1>, page <title>, and schema headline)
 *   description: string  — 150-160 char summary (used as meta description and card excerpt)
 *   date:        string  — ISO 8601 date string, e.g. "2026-03-11"
 *   author:      string  — Author display name, e.g. "OpenPharmacy Team"
 *   sections: Array<{
 *     heading:    string | null  — Section <h2> heading; null to omit heading
 *     paragraphs: string[]       — One string per <p> tag
 *     list:       string[] | undefined  — Optional bulleted list items rendered as <ul><li>
 *   }>
 *   relatedSlugs: string[]  — Up to 3 slugs of related posts for the "Related Articles" block
 * }
 */

/** @type {Array<{slug: string, title: string, description: string, date: string, author: string, sections: Array<{heading: string|null, paragraphs: string[], list?: string[]}>, relatedSlugs: string[]}>} */
const blogPosts = [];

export default blogPosts;
