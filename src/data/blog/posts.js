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
  {
    slug: "what-is-an-escript-wallet-australia",
    title: "What Is an eScript Wallet? A Plain-English Guide for Australians",
    date: "2026-03-11",
    excerpt:
      "An eScript wallet stores your electronic prescription QR codes securely on your phone, so they are always available at the pharmacy — even offline. Here is how they work and what to look for.",
    tags: ["Educational", "eScripts", "How It Works", "Australia", "Digital Health"],
  },
  {
    slug: "offline-escript-access-australia",
    title: "Offline eScript Access in Australia: Why Your QR Code Must Be Available Without Internet",
    date: "2026-03-11",
    excerpt:
      "SMS and email eScripts fail without a signal — at rural pharmacies, underground, or when your data runs out. OpenPharmacy stores QR codes directly on your device so they are always accessible, even in airplane mode.",
    tags: ["Offline Access", "Rural Australia", "eScripts", "QR Code", "Digital Health"],
  },
  {
    slug: "managing-family-escripts-australia-carers-parents",
    title: "Managing Family eScripts in Australia: A Practical Guide for Parents and Carers",
    date: "2026-03-11",
    excerpt:
      "Australian parents and carers can manage eScripts for children, elderly parents, and other family members using OpenPharmacy — separate profiles per person, offline QR codes, and ADHA-registered security in one app.",
    tags: ["Caregivers", "Family Management", "eScripts", "Australia", "Digital Health"],
  },
  {
    slug: "what-is-adha-conformance-australia",
    title: "What Is ADHA Conformance? Why It Matters Before You Trust an App With Your Prescriptions",
    date: "2026-03-11",
    excerpt:
      "ADHA conformance means an app has been assessed and registered by the Australian Digital Health Agency as meeting national safety, security, and interoperability standards for handling electronic prescriptions. Here is what it means and how to check.",
    tags: ["ADHA", "Security", "eScripts", "Digital Health", "Trust"],
  },
];

export default blogPosts;
