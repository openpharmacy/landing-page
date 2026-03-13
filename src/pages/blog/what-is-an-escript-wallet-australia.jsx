import React from "react";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout";
import post from "../../data/blog/what-is-an-escript-wallet-australia";

const SLUG = "what-is-an-escript-wallet-australia";
const DATE = "2026-03-11";

const meta = {
  title: "What Is an eScript Wallet? A Plain-English Guide for Australians",
  description:
    "An eScript wallet is a secure mobile app that stores your Australian electronic prescription QR codes in one place. Learn how eScript wallets work, what the ASL is, and what to look for in an app.",
  slug: SLUG,
  date: DATE,
  dateModified: DATE,
  tags: ["Educational", "eScripts", "How It Works", "Australia", "Digital Health"],
};

// Combined BlogPosting + HowTo + FAQPage schema
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
        "eScript wallet Australia, what is an eScript wallet, electronic prescription app Australia, how eScripts work, ADHA eScript app, offline prescription app",
      about: {
        "@type": "Thing",
        name: "Electronic Prescriptions Australia",
      },
    },
    {
      "@type": "HowTo",
      "@id": `https://openpharmacy.com/blog/${SLUG}#howto`,
      name: "How to use an eScript wallet app in Australia",
      description:
        "Step-by-step guide to storing and using electronic prescription QR codes with an eScript wallet app like OpenPharmacy.",
      inLanguage: "en-AU",
      step: post.howItWorks.steps.map((s) => ({
        "@type": "HowToStep",
        position: s.number,
        name: s.name,
        text: s.description,
      })),
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
function ComparisonTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto my-6 rounded-xl border border-white/10">
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
            <tr key={ri} className="border-b border-white/5">
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

function WhatIsAnEscriptWalletAustralia() {
  return (
    <BlogLayout meta={meta} schema={schema}>

      {/* Opening answer capsule */}
      <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
        {post.intro}
      </p>

      {/* Section 1: What is an eScript? */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whatIsEscript.heading}
      </h2>
      {post.whatIsEscript.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 2: What is an eScript wallet? */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whatIsWallet.heading}
      </h2>
      {post.whatIsWallet.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Alternatives list */}
      <ul className="space-y-4 my-5">
        {post.whatIsWallet.alternatives.map((alt, i) => (
          <li key={i} className="border-l-2 border-white/15 pl-4">
            <p className="font-semibold text-white mb-1">{alt.label}</p>
            <p className="text-white/75 text-sm leading-relaxed">{alt.detail}</p>
          </li>
        ))}
      </ul>

      <p className="text-white/80 leading-relaxed">{post.whatIsWallet.closing}</p>

      {/* Section 3: What is the ASL? */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whatIsAsl.heading}
      </h2>
      {post.whatIsAsl.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 4: How it works — step by step */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.howItWorks.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mb-6">{post.howItWorks.intro}</p>

      <ol className="space-y-5">
        {post.howItWorks.steps.map((step) => (
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

      {/* Section 5: Wallet vs reminder app */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.walletVsReminder.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mb-4">{post.walletVsReminder.intro}</p>

      <ComparisonTable
        headers={post.walletVsReminder.tableHeaders}
        rows={post.walletVsReminder.tableRows}
      />

      <p className="text-white/80 leading-relaxed">{post.walletVsReminder.closing}</p>

      {/* Section 6: What to look for */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whatToLookFor.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mb-5">{post.whatToLookFor.intro}</p>

      <ul className="space-y-5">
        {post.whatToLookFor.criteria.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="flex-shrink-0 mt-1 text-[var(--color-accent)] font-bold text-sm"
              aria-hidden="true"
            >
              &#10003;
            </span>
            <div>
              <p className="font-semibold text-white mb-1">{item.label}</p>
              <p className="text-white/75 text-sm leading-relaxed">{item.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Section 7: How OpenPharmacy works */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.openPharmacySection.heading}
      </h2>
      {post.openPharmacySection.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Internal links to related content */}
      <p className="text-white/75 text-sm leading-relaxed mt-4">
        For a side-by-side comparison of all major Australian eScript apps, see our guide:{" "}
        <Link
          to="/blog/best-escript-apps-australia-2026"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Best eScript Apps in Australia (2026): Compared by Offline Access, Security, and Family Features
        </Link>
        .
      </p>
      <p className="text-white/75 text-sm leading-relaxed mt-3">
        For a detailed head-to-head between the two leading independent wallets, see:{" "}
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

export default WhatIsAnEscriptWalletAustralia;
