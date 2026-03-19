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
    excerpt: "An independent comparison of OpenPharmacy, Scripty, MedAdvisor, and my health app — covering offline access, ADHA conformance, family management, and data security to help you choose the right eScript wallet.",
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
      "Australian parents and carers can manage eScripts for children, elderly parents, and other family members using OpenPharmacy — scripts automatically grouped by individual, offline QR codes, and ADHA-registered security in one app.",
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
  {
    slug: "pharmacy-app-vs-independent-escript-wallet-australia",
    title: "Pharmacy App vs Independent eScript Wallet: What Every Australian Patient Should Know",
    date: "2026-03-11",
    excerpt:
      "Pharmacy apps like MedAdvisor connect your prescriptions to a pharmacy network. Independent wallets like OpenPharmacy work at any chemist and don't share your data with any pharmacy. Here's what the difference means for your privacy.",
    tags: ["eScripts", "Privacy", "App Comparison", "Australia", "Digital Health"],
  },
  {
    slug: "escript-app-security-privacy-guide-australia",
    title: "How to Keep Your eScripts Secure: A Privacy Guide for Australian Patients",
    date: "2026-03-11",
    excerpt:
      "To verify an eScript app is secure, check three things: ADHA ePrescribing Conformance Register listing, Australian server storage, and an explicit no-third-party-sharing policy. This guide explains each check and why it matters.",
    tags: ["Security", "Privacy", "Encryption", "ADHA", "Digital Health", "Australia"],
  },
  {
    slug: "deleted-escript-sms-what-to-do-australia",
    title: "What Happens If You Delete Your eScript SMS? Here's What to Do",
    date: "2026-03-11",
    excerpt:
      "Deleted your eScript SMS in Australia? Your prescription still exists in the national system — it has not been cancelled. Here is how to recover the token, use the Active Script List as a backup, and prevent it from happening again.",
    tags: ["Troubleshooting", "eScripts", "Recovery", "Active Script List", "Australia"],
  },
  {
    slug: "adhd-escript-management-australia",
    title: "ADHD and eScripts: Why Managing Prescriptions Is Harder With ADHD (And What Actually Helps)",
    date: "2026-03-19",
    excerpt:
      "Managing Australian eScripts with ADHD means navigating SMS tokens, Schedule 8 repeat rules, and repeat tracking with impaired executive function. Here is what the system demands, why it is harder with ADHD, and what actually helps.",
    tags: ["ADHD", "eScripts", "Accessibility", "Executive Function", "Australia", "Digital Health"],
  },
  {
    slug: "adhd-medication-management-parents-australia",
    title: "Managing ADHD Medication in Australia: A Parent's Practical Guide",
    date: "2026-03-19",
    excerpt:
      "How Australian parents navigate Schedule 8 ADHD prescribing rules, track individual eScript tokens for every repeat, manage specialist review deadlines, and keep their child's medication accessible — using OpenPharmacy.",
    tags: ["ADHD", "Parents", "Caregivers", "Schedule 8", "eScripts", "Children", "Australia"],
  },
  {
    slug: "managing-chronic-illness-escripts-australia",
    title: "Managing Chronic Illness Prescriptions in Australia: Practical Strategies and the Right Tools",
    date: "2026-03-19",
    excerpt:
      "Around half of Australians live with a chronic condition. This guide explains why the SMS token system breaks down at scale, when pharmacy apps help, and how a dedicated eScript wallet like OpenPharmacy solves the real problems.",
    tags: ["Chronic Illness", "Repeat Prescriptions", "eScripts", "Privacy", "Australia", "Digital Health"],
  },
];

export default blogPosts;
