/**
 * Blog post manifest for OpenPharmacy.
 *
 * Each entry in this array registers a post on the blog index page
 * and tells the prerender script which route to statically render.
 *
 * HOW TO ADD A NEW POST:
 * 1. Create src/pages/blog/<slug>.jsx  — the page component
 * 2. Create src/data/blog/<slug>.js    — the content/data file
 * 3. Add an entry to this array below
 * 4. Add the route "/blog/<slug>" to:
 *    - src/App.jsx (import + <Route>)
 *    - scripts/prerender.mjs (ROUTES array)
 *
 * Entry shape:
 * {
 *   slug: string,      // URL slug — must match the route and file name
 *   title: string,     // Page H1 and OG title
 *   date: string,      // ISO 8601 date string, e.g. "2026-03-11"
 *   excerpt: string,   // 1–2 sentence summary shown on the index card
 *   tags: string[],    // Category labels, e.g. ["eScripts", "Apps"]
 * }
 */

/** @type {Array<{slug: string, title: string, date: string, excerpt: string, tags: string[]}>} */
const blogPosts = [
  // Posts will be added here as they are created.
  // Example shape (do not uncomment — add real entries only):
  // {
  //   slug: "best-escript-apps-australia",
  //   title: "Best eScript Apps in Australia (2026)",
  //   date: "2026-03-11",
  //   excerpt: "A side-by-side look at the top electronic prescription wallet apps available to Australian patients, including offline access, security, and family management features.",
  //   tags: ["eScripts", "App Comparison"],
  // },
  {
    slug: "best-escript-apps-australia-2026",
    title: "Best eScript Apps in Australia (2026): Compared by Offline Access, Security, and Family Features",
    date: "2026-03-11",
    excerpt: "An independent comparison of OpenPharmacy, Scripty, MedAdvisor, and my health app — covering offline access, ADHA conformance, family profiles, and data security to help you choose the right eScript wallet.",
    tags: ["App Comparison", "eScripts", "Australia", "Digital Health"],
  },
];

export default blogPosts;
