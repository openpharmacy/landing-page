import React from "react";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout";
import post from "../../data/blog/best-escript-apps-australia-2026";

const SLUG = "best-escript-apps-australia-2026";
const DATE = "2026-03-11";

const meta = {
  title: "Best eScript Apps in Australia (2026): Compared by Offline Access, Security, and Family Features",
  description:
    "Independent comparison of the best Australian eScript apps in 2026 — OpenPharmacy, Scripty, MedAdvisor, and my health app — ranked by offline access, ADHA conformance, family features, and data security.",
  slug: SLUG,
  date: DATE,
  dateModified: DATE,
  tags: ["App Comparison", "eScripts", "Australia", "Digital Health"],
};

// Combined BlogPosting + FAQPage schema passed as custom schema prop to BlogLayout.
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": `https://www.openpharmacy.com/blog/${SLUG}/#article`,
      headline: meta.title,
      description: meta.description,
      datePublished: DATE,
      dateModified: DATE,
      url: `https://www.openpharmacy.com/blog/${SLUG}/`,
      inLanguage: "en-AU",
      author: {
        "@type": "Organization",
        name: "OpenPharmacy",
        legalName: "Easy As Health Pty Ltd",
        url: "https://www.openpharmacy.com",
      },
      publisher: {
        "@type": "Organization",
        name: "OpenPharmacy",
        legalName: "Easy As Health Pty Ltd",
        url: "https://www.openpharmacy.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.openpharmacy.com/Logo.svg",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://www.openpharmacy.com/blog/${SLUG}/`,
      },
      keywords: "eScript app Australia, best prescription app Australia, ADHA conformant app, offline eScript, OpenPharmacy, Scripty, MedAdvisor",
      about: {
        "@type": "Thing",
        name: "Electronic Prescriptions Australia",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `https://www.openpharmacy.com/blog/${SLUG}/#faq`,
      mainEntity: post.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.openpharmacy.com/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.openpharmacy.com/blog/" },
        { "@type": "ListItem", position: 3, name: meta.title, item: `https://www.openpharmacy.com/blog/${SLUG}/` },
      ],
    },
  ],
};

// Helper: render a pro/con list
function FeatureList({ items, type }) {
  const isPositive = type === "pro";
  return (
    <ul className="space-y-2 my-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span
            className={`mt-1 flex-shrink-0 text-sm font-bold ${
              isPositive ? "text-[var(--color-accent)]" : "text-white/40"
            }`}
            aria-hidden="true"
          >
            {isPositive ? "+" : "−"}
          </span>
          <span className="text-white/80">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// Helper: render the comparison table
function ComparisonTable({ table }) {
  return (
    <div className="overflow-x-auto my-6 rounded-xl border border-white/10">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            {table.headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 font-semibold text-white/90 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr
              key={ri}
              className={`border-b border-white/5 ${
                ri === 0 ? "bg-[var(--color-accent)]/5" : ""
              }`}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-4 py-3 text-white/80 ${
                    ci === 0 ? "font-semibold text-white" : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BestEscriptAppsAustralia2026() {
  return (
    <BlogLayout meta={meta} schema={schema}>

      {/* Opening answer capsule */}
      <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
        {post.intro}
      </p>

      {/* Quick comparison table */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        Quick Comparison: eScript Apps at a Glance
      </h2>
      <p className="text-white/75">
        The table below covers the four apps most commonly recommended for managing electronic
        prescriptions in Australia. Data verified March 2026.
      </p>
      <ComparisonTable table={post.comparisonTable} />

      {/* App entries */}
      {post.apps.map((app) => (
        <section key={app.name} className="mt-10">
          <h2 className="font-grifter text-2xl font-bold text-white mb-1">
            {app.rank}. {app.name}
          </h2>
          <p className="text-[var(--color-accent)] text-sm font-medium mb-4">
            {app.tagline}
          </p>

          <p className="text-white/80 leading-relaxed">{app.summary}</p>

          {app.body.map((paragraph, i) => (
            <p key={i} className="text-white/80 leading-relaxed mt-4">
              {paragraph}
            </p>
          ))}

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-white/90 mb-1">{app.prosLabel}</p>
              <FeatureList items={app.pros} type="pro" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white/90 mb-1">{app.consLabel}</p>
              <FeatureList items={app.cons} type="con" />
            </div>
          </div>
        </section>
      ))}

      {/* How to choose */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-12 mb-3">
        How to Choose the Right eScript App
      </h2>
      <p className="text-white/80 leading-relaxed">{post.howToChoose.intro}</p>

      {post.howToChoose.questions.map((item, i) => (
        <div key={i} className="mt-7 border-l-2 border-white/15 pl-5">
          <h3 className="text-lg font-semibold text-white mb-2">{item.question}</h3>
          <p className="text-white/80 leading-relaxed">{item.answer}</p>
          <p className="mt-3 text-sm font-medium text-[var(--color-accent)]">
            {item.recommendation}
          </p>
        </div>
      ))}

      {/* FAQ */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-12 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {post.faq.map((item, i) => (
          <div key={i}>
            <h3 className="text-base font-semibold text-white mb-2">{item.question}</h3>
            <p className="text-white/80 leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>

      {/* Cross-link to detailed comparison */}
      <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-sm font-semibold text-white/70 mb-3">Detailed comparison</p>
        <ul className="space-y-2">
          <li>
            <Link
              to="/compare/openpharmacy-vs-scripty"
              className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
            >
              OpenPharmacy vs Scripty: in-depth breakdown of offline storage, ASL sync, security, and family features
            </Link>
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-2xl bg-[var(--color-secondary)] border border-white/10 p-6 md:p-8 text-center">
        <h2 className="font-grifter text-xl md:text-2xl font-bold text-white mb-2">
          Download OpenPharmacy. Free on iOS and Android.
        </h2>
        <p className="text-white/70 text-sm md:text-base mb-6 max-w-lg mx-auto">
          Store, manage, and present your eScripts at any Australian pharmacy. Works completely
          offline. ADHA conformant. All data stored in Australia.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://apps.apple.com/au/app/openpharmacy/id6751562406"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
            aria-label="Download OpenPharmacy on the App Store"
          >
            Download on the App Store
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.openpharmacy.production&hl=en_AU"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors text-sm"
            aria-label="Download OpenPharmacy on Google Play"
          >
            Get it on Google Play
          </a>
        </div>
      </div>

    </BlogLayout>
  );
}

export default BestEscriptAppsAustralia2026;
