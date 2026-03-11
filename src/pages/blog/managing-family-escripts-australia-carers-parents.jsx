import React from "react";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout";
import post from "../../data/blog/managing-family-escripts-australia-carers-parents";

const SLUG = "managing-family-escripts-australia-carers-parents";
const DATE = "2026-03-11";

const meta = {
  title: "Managing Family eScripts in Australia: A Practical Guide for Parents and Carers",
  description:
    "How Australian parents and carers can manage eScripts for children, elderly parents, and other family members using OpenPharmacy — separate profiles, offline QR codes, and ADHA-registered security.",
  slug: SLUG,
  date: DATE,
  dateModified: DATE,
  tags: ["Caregivers", "Family Management", "eScripts", "Australia", "Digital Health"],
};

// Combined BlogPosting + FAQPage + BreadcrumbList schema
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": `https://openpharmacy.com/blog/${SLUG}#article`,
      headline: meta.title,
      description: meta.description,
      datePublished: DATE,
      dateModified: DATE,
      url: `https://openpharmacy.com/blog/${SLUG}`,
      inLanguage: "en-AU",
      author: {
        "@type": "Organization",
        name: "OpenPharmacy",
        legalName: "Easy As Health Pty Ltd",
        url: "https://openpharmacy.com",
      },
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
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://openpharmacy.com/blog/${SLUG}`,
      },
      keywords:
        "family eScript management Australia, carer eScript app, manage prescriptions for children, elderly parent eScript, OpenPharmacy family profiles, Australian carer prescription app, ADHA eScript wallet family",
      about: {
        "@type": "Thing",
        name: "Electronic Prescriptions Australia",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `https://openpharmacy.com/blog/${SLUG}#faq`,
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
        { "@type": "ListItem", position: 1, name: "Home", item: "https://openpharmacy.com/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://openpharmacy.com/blog" },
        {
          "@type": "ListItem",
          position: 3,
          name: meta.title,
          item: `https://openpharmacy.com/blog/${SLUG}`,
        },
      ],
    },
  ],
};

// Helper: render the comparison table
function ComparisonTable({ headers, rows, note }) {
  return (
    <div className="my-6">
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              {headers.map((h) => (
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
            {rows.map((row, ri) => (
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
      {note && (
        <p className="text-white/45 text-xs mt-2 pl-1">{note}</p>
      )}
    </div>
  );
}

function ManagingFamilyEscriptsAustraliaCarersParents() {
  return (
    <BlogLayout meta={meta} schema={schema}>

      {/* Opening answer capsule */}
      <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
        {post.intro}
      </p>

      {/* Section 1: The carer prescription problem */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.carerProblem.heading}
      </h2>
      {post.carerProblem.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 2: Who needs multi-person eScript management */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whoNeeds.heading}
      </h2>
      <ul className="space-y-5 mt-4">
        {post.whoNeeds.groups.map((group, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="flex-shrink-0 mt-1 text-[var(--color-accent)] font-bold text-sm"
              aria-hidden="true"
            >
              &#10003;
            </span>
            <div>
              <p className="font-semibold text-white mb-1">{group.label}</p>
              <p className="text-white/75 text-sm leading-relaxed">{group.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Section 3: How OpenPharmacy handles family scripts */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.openPharmacyDetail.heading}
      </h2>
      {post.openPharmacyDetail.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 4: Key features for carers */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.keyFeatures.heading}
      </h2>
      <ul className="space-y-3 mt-4">
        {post.keyFeatures.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              className="flex-shrink-0 mt-1 text-[var(--color-accent)] font-bold text-sm"
              aria-hidden="true"
            >
              +
            </span>
            <span className="text-white/80">{item}</span>
          </li>
        ))}
      </ul>

      {/* Section 5: Comparison table */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.comparison.heading}
      </h2>
      <p className="text-white/75 leading-relaxed mb-4">{post.comparison.intro}</p>
      <ComparisonTable
        headers={post.comparison.headers}
        rows={post.comparison.rows}
        note={post.comparison.note}
      />

      {/* Section 6: Getting started */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.gettingStarted.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mb-6">{post.gettingStarted.intro}</p>

      <ol className="space-y-5">
        {post.gettingStarted.steps.map((step) => (
          <li key={step.number} className="flex gap-4">
            <span
              className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-accent)] text-white text-sm font-bold flex items-center justify-center mt-0.5"
              aria-hidden="true"
            >
              {step.number}
            </span>
            <div>
              <p className="font-semibold text-white mb-1">{step.name}</p>
              <p className="text-white/75 text-sm leading-relaxed">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="text-white/75 text-sm leading-relaxed mt-6">{post.gettingStarted.closing}</p>

      {/* Internal links to related posts */}
      <p className="text-white/75 text-sm leading-relaxed mt-8">
        For a full comparison of all major Australian eScript apps including security and offline
        access ratings, see:{" "}
        <Link
          to="/blog/best-escript-apps-australia-2026"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Best eScript Apps in Australia (2026): Compared by Offline Access, Security, and Family
          Features
        </Link>
        .
      </p>
      <p className="text-white/75 text-sm leading-relaxed mt-3">
        New to eScripts? Start here:{" "}
        <Link
          to="/blog/what-is-an-escript-wallet-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          What Is an eScript Wallet? A Plain-English Guide for Australians
        </Link>
        .
      </p>
      <p className="text-white/75 text-sm leading-relaxed mt-3">
        Comparing OpenPharmacy and Scripty for family management? See:{" "}
        <Link
          to="/compare/openpharmacy-vs-scripty"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          OpenPharmacy vs Scripty: Which eScript Wallet Is Right for You?
        </Link>
        .
      </p>

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

      {/* CTA */}
      <div className="mt-12 rounded-2xl bg-[var(--color-secondary)] border border-white/10 p-6 md:p-8 text-center">
        <h2 className="font-grifter text-xl md:text-2xl font-bold text-white mb-2">
          Download OpenPharmacy. Free on iOS and Android.
        </h2>
        <p className="text-white/70 text-sm md:text-base mb-6 max-w-lg mx-auto">
          Manage eScripts for your whole family in one place. Separate profiles per person,
          offline QR codes, ADHA-registered security. All data stored in Australia.
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

export default ManagingFamilyEscriptsAustraliaCarersParents;
