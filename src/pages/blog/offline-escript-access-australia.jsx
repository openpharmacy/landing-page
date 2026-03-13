import React from "react";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout";
import post from "../../data/blog/offline-escript-access-australia";

const SLUG = "offline-escript-access-australia";
const DATE = "2026-03-11";

const meta = {
  title: "Offline eScript Access in Australia: Why Your QR Code Must Be Available Without Internet",
  description:
    "Learn why SMS and email eScripts fail without signal, and how OpenPharmacy stores your prescription QR codes on-device so they work offline — even in rural Australia or airplane mode.",
  slug: SLUG,
  date: DATE,
  dateModified: DATE,
  tags: ["Offline Access", "Rural Australia", "eScripts", "QR Code", "Digital Health"],
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
        "offline eScript Australia, eScript no signal, rural Australia prescription app, eScript offline QR code, OpenPharmacy offline, prescription app airplane mode, Australian eScript wallet",
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

// Helper: comparison table
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

function OfflineEscriptAccessAustralia() {
  return (
    <BlogLayout meta={meta} schema={schema}>

      {/* Opening answer capsule */}
      <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
        {post.intro}
      </p>

      {/* Section 1: The offline problem */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.smsProblem.heading}
      </h2>
      {post.smsProblem.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      <ul className="space-y-4 my-5">
        {post.smsProblem.scenarios.map((scenario, i) => (
          <li key={i} className="border-l-2 border-white/15 pl-4">
            <p className="font-semibold text-white mb-1">{scenario.label}</p>
            <p className="text-white/75 text-sm leading-relaxed">{scenario.detail}</p>
          </li>
        ))}
      </ul>

      <p className="text-white/80 leading-relaxed">{post.smsProblem.closing}</p>

      {/* Section 2: Why apps need internet */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whyAppsNeedInternet.heading}
      </h2>
      {post.whyAppsNeedInternet.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 3: How offline-first works */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.howOfflineWorks.heading}
      </h2>
      {post.howOfflineWorks.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      <ol className="space-y-5 mt-6">
        {post.howOfflineWorks.steps.map((step) => (
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

      <p className="text-white/80 leading-relaxed mt-6">{post.howOfflineWorks.closing}</p>

      {/* Section 4: Who needs offline access */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whoNeedsOffline.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mb-5">{post.whoNeedsOffline.intro}</p>

      <ul className="space-y-5">
        {post.whoNeedsOffline.groups.map((group, i) => (
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

      {/* Section 5: OpenPharmacy detail */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.openPharmacyDetail.heading}
      </h2>
      {post.openPharmacyDetail.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 6: Comparison table */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.comparison.heading}
      </h2>
      <p className="text-white/75 leading-relaxed mb-4">{post.comparison.intro}</p>

      <ComparisonTable
        headers={post.comparison.headers}
        rows={post.comparison.rows}
        note={post.comparison.note}
      />

      {/* Internal links to related posts */}
      <p className="text-white/75 text-sm leading-relaxed mt-6">
        For a full side-by-side comparison of all major Australian eScript apps, see:{" "}
        <Link
          to="/blog/best-escript-apps-australia-2026"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Best eScript Apps in Australia (2026): Compared by Offline Access, Security, and Family Features
        </Link>
        .
      </p>
      <p className="text-white/75 text-sm leading-relaxed mt-3">
        New to eScripts? Start with:{" "}
        <Link
          to="/blog/what-is-an-escript-wallet-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          What Is an eScript Wallet? A Plain-English Guide for Australians
        </Link>
        .
      </p>
      <p className="text-white/75 text-sm leading-relaxed mt-3">
        Comparing OpenPharmacy and Scripty on offline access? See:{" "}
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
          Your eScript QR codes, always available. Works completely offline. ADHA conformant.
          All data stored in Australia.
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

export default OfflineEscriptAccessAustralia;
