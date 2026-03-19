import React from "react";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout";
import post from "../../data/blog/active-script-list-vs-escript-wallet-australia";

const SLUG = "active-script-list-vs-escript-wallet-australia";
const DATE = "2026-03-19";

const meta = {
  title:
    "The Active Script List vs an eScript Wallet: What's the Difference for Australian Patients?",
  description:
    "The Active Script List is a centralised government registry; an eScript wallet stores QR codes on your device. Both are legitimate options that differ in setup, privacy, and offline access. Here's how to choose.",
  slug: SLUG,
  date: DATE,
  dateModified: DATE,
  tags: [
    "Active Script List",
    "eScript Wallet",
    "Privacy",
    "Australia",
    "Digital Health",
  ],
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
        "Active Script List Australia, eScript wallet, ASL vs eScript wallet, my health app prescriptions, 1800MEDICARE app, OpenPharmacy, ADHA conformant, electronic prescriptions Australia, prescription privacy",
      about: {
        "@type": "Thing",
        name: "Electronic Prescriptions Australia",
      },
      mentions: [
        {
          "@type": "Organization",
          name: "Australian Digital Health Agency",
          url: "https://www.digitalhealth.gov.au",
          sameAs: "https://www.digitalhealth.gov.au",
        },
        {
          "@type": "SoftwareApplication",
          name: "1800MEDICARE app",
          alternateName: "my health app",
          url: "https://www.digitalhealth.gov.au/1800MEDICAREapp",
          applicationCategory: "HealthApplication",
          operatingSystem: "iOS, Android",
        },
        {
          "@type": "SoftwareApplication",
          name: "OpenPharmacy",
          url: "https://openpharmacy.com",
          applicationCategory: "HealthApplication",
          operatingSystem: "iOS, Android",
        },
      ],
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
      "@type": "Table",
      "@id": `https://openpharmacy.com/blog/${SLUG}#comparison-table`,
      about: {
        "@type": "Thing",
        name: "Active Script List vs eScript Wallet comparison",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://openpharmacy.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://openpharmacy.com/blog",
        },
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
                ri % 2 === 0 ? "bg-white/[0.02]" : ""
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

function ActiveScriptListVsEscriptWalletAustralia() {
  return (
    <BlogLayout meta={meta} schema={schema}>

      {/* Opening answer capsule */}
      <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
        {post.intro}
      </p>

      {/* Section 1: What is the ASL */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whatIsAsl.heading}
      </h2>
      {post.whatIsAsl.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Internal link: what is an eScript wallet */}
      <p className="text-white/70 text-sm leading-relaxed mt-4">
        New to eScripts entirely? Start with:{" "}
        <Link
          to="/blog/what-is-an-escript-wallet-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          What Is an eScript Wallet? A Plain-English Guide for Australians
        </Link>
        .
      </p>

      {/* Section 2: When the ASL works well */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whenAslWorksWell.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mt-2">
        {post.whenAslWorksWell.intro}
      </p>
      <ul className="mt-4 space-y-2">
        {post.whenAslWorksWell.points.map((point, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              className="mt-1 flex-shrink-0 text-sm font-bold text-[var(--color-accent)]"
              aria-hidden="true"
            >
              +
            </span>
            <span className="text-white/75 text-sm leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>

      {/* Section 3: ASL limitations */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.aslLimitations.heading}
      </h2>
      {post.aslLimitations.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 4: What a wallet does differently */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whatWalletDoes.heading}
      </h2>
      {post.whatWalletDoes.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Internal link: ADHA conformance */}
      <p className="text-white/70 text-sm leading-relaxed mt-4">
        Not sure what ADHA conformance means? See:{" "}
        <Link
          to="/blog/what-is-adha-conformance-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          What Is ADHA Conformance and Why Does It Matter?
        </Link>
      </p>

      {/* Section 5: When an independent wallet is the better choice */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whenWalletIsBetter.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mb-6">
        {post.whenWalletIsBetter.intro}
      </p>

      <div className="space-y-5">
        {post.whenWalletIsBetter.scenarios.map((scenario, i) => (
          <div key={i} className="border border-white/10 rounded-xl px-5 py-4">
            <p className="font-semibold text-white mb-2">{scenario.label}</p>
            <p className="text-white/75 text-sm leading-relaxed">{scenario.description}</p>
          </div>
        ))}
      </div>

      <p className="text-white/80 leading-relaxed mt-6">
        {post.whenWalletIsBetter.closing}
      </p>

      {/* Internal link: offline access */}
      <p className="text-white/70 text-sm leading-relaxed mt-4">
        For a deeper look at why offline access matters:{" "}
        <Link
          to="/blog/offline-escript-access-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Offline eScript Access in Australia
        </Link>
        .
      </p>

      {/* Section 6: Privacy consideration */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.privacySection.heading}
      </h2>
      {post.privacySection.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Internal link: security and privacy guide */}
      <p className="text-white/70 text-sm leading-relaxed mt-4">
        Related:{" "}
        <Link
          to="/blog/escript-app-security-privacy-guide-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          How to Keep Your eScripts Secure: A Privacy Guide for Australian Patients
        </Link>
        .
      </p>

      {/* Section 7: Comparison table */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        Side-by-side: ASL vs eScript wallet
      </h2>
      <p className="text-white/75 text-sm mb-2">
        Data verified March 2026. The 1800MEDICARE app was previously called the "my health app" (renamed 1 January 2026).
      </p>
      <ComparisonTable table={post.comparisonTable} />

      {/* External authority reference */}
      <p className="text-white/60 text-sm leading-relaxed mt-4">
        Sources:{" "}
        <a
          href="https://www.digitalhealth.gov.au/initiatives-and-programs/electronic-prescriptions"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Australian Digital Health Agency — Electronic Prescriptions
        </a>
        {" "}&middot;{" "}
        <a
          href="https://www.health.gov.au/resources/publications/electronic-prescribing-active-script-list-privacy-framework"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Dept. of Health: Active Script List Privacy Framework
        </a>
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
          An independent eScript wallet that stores your prescription QR codes on your device.
          ADHA conformant, fully offline, and your data is never shared with third parties.
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

export default ActiveScriptListVsEscriptWalletAustralia;
