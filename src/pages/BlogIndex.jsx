import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import BlogCard from "../components/BlogCard";
import { usePageMeta } from "../hooks/usePageMeta";
import blogPosts from "../data/blog/posts";

// ─── Compare pages registry ──────────────────────────────────────────────────
// Add one entry here whenever a new /compare page is created.
const comparePages = [];

// ─── Post category groupings ─────────────────────────────────────────────────
// Slugs are matched against blogPosts to build each section.
const SECTION_SLUGS = {
  guides: [
    "what-is-an-escript-wallet-australia",
    "what-is-adha-conformance-australia",
    "offline-escript-access-australia",
    "managing-family-escripts-australia-carers-parents",
  ],
  comparisons: [
    "best-escript-apps-australia-2026",
    "pharmacy-app-vs-independent-escript-wallet-australia",
  ],
  howto: [
    "escript-app-security-privacy-guide-australia",
    "deleted-escript-sms-what-to-do-australia",
  ],
};

function getPostsBySlug(slugs) {
  return slugs
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter(Boolean);
}

// ─── Hero compare card ───────────────────────────────────────────────────────
function HeroCompareCard({ page }) {
  const formattedDate = new Date(page.date).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Australia/Brisbane",
  });

  return (
    <Link
      to={`/compare/${page.slug}`}
      className="block bg-[var(--color-secondary)] rounded-2xl p-6 md:p-8 hover:bg-[#2a3f52] transition-colors group border border-[var(--color-accent)]/30"
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {page.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Label */}
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-2">
        App Comparison
      </p>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-[var(--color-accent)] transition-colors mb-3 leading-snug">
        {page.title}
      </h3>

      {/* Excerpt */}
      <p className="text-white/70 text-sm md:text-base leading-relaxed mb-5">
        {page.excerpt}
      </p>

      {/* Footer row */}
      <div className="flex items-center justify-between">
        <time dateTime={page.date} className="text-xs text-white/50">
          {formattedDate}
        </time>
        <span className="text-[var(--color-accent)] text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
          Read comparison &rsaquo;
        </span>
      </div>
    </Link>
  );
}

// ─── Section heading ─────────────────────────────────────────────────────────
function SectionHeading({ children }) {
  return (
    <h2 className="text-lg font-semibold text-white/60 uppercase tracking-widest mb-4">
      {children}
    </h2>
  );
}

// ─── Page component ──────────────────────────────────────────────────────────
function BlogIndex() {
  usePageMeta({
    title: "eScript Guides and Resources | OpenPharmacy Blog",
    description:
      "Guides, comparisons, and digital health tips for Australian patients managing electronic prescriptions. From the team at OpenPharmacy — Australia's ADHA-registered eScript wallet.",
    canonicalPath: "/blog",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "OpenPharmacy Blog",
      description:
        "eScript guides, app comparisons, and digital health tips for Australian patients managing electronic prescriptions.",
      url: "https://openpharmacy.com/blog",
      publisher: {
        "@type": "Organization",
        name: "OpenPharmacy",
        legalName: "Easy As Health Pty Ltd",
        url: "https://openpharmacy.com",
        logo: {
          "@type": "ImageObject",
          url: "https://openpharmacy.com/Logo.svg",
        },
      },
      inLanguage: "en-AU",
    },
  });

  const guidesPosts = getPostsBySlug(SECTION_SLUGS.guides);
  const comparisonPosts = getPostsBySlug(SECTION_SLUGS.comparisons);
  const howtoPosts = getPostsBySlug(SECTION_SLUGS.howto);

  return (
    <Layout>
      {/* Page header */}
      <div className="max-w-2xl">
        <h1 className="font-grifter text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Everything you need to know about eScripts in Australia
        </h1>
        <p className="text-white/70 text-base md:text-lg leading-relaxed">
          Plain-English guides on managing electronic prescriptions, staying secure, and choosing
          the right app for your situation.
        </p>
      </div>

      {/* Guides section */}
      <section>
        <SectionHeading>Guides</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guidesPosts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              tags={post.tags}
            />
          ))}
        </div>
      </section>

      {/* How-to and Troubleshooting section */}
      <section>
        <SectionHeading>How-To and Troubleshooting</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {howtoPosts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              tags={post.tags}
            />
          ))}
        </div>
      </section>

      {/* App Comparisons section */}
      <section>
        <SectionHeading>App Comparisons</SectionHeading>

        {/* Compare pages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {comparePages.map((page) => (
            <HeroCompareCard key={page.slug} page={page} />
          ))}
        </div>

        {/* Blog comparison posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comparisonPosts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              tags={post.tags}
            />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-white/10 pt-10 pb-4 text-center">
        <p className="text-white/70 text-base mb-1">
          Have a question about eScripts or the OpenPharmacy app?
        </p>
        <a
          href="mailto:hello@openpharmacy.com"
          className="text-[var(--color-accent)] font-medium hover:opacity-80 transition-opacity"
        >
          Contact us at hello@openpharmacy.com &rsaquo;
        </a>
      </section>
    </Layout>
  );
}

export default BlogIndex;
