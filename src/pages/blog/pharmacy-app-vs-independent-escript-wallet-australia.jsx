import React from "react";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout";
import post from "../../data/blog/pharmacy-app-vs-independent-escript-wallet-australia";

const SLUG = "pharmacy-app-vs-independent-escript-wallet-australia";
const DATE = "2026-03-11";

const meta = {
  title:
    "Pharmacy App vs Independent eScript Wallet: What Every Australian Patient Should Know",
  description:
    "Pharmacy apps like MedAdvisor connect your prescriptions to a pharmacy network. Independent wallets like OpenPharmacy work at any chemist and don't share your data. Here's the difference.",
  slug: SLUG,
  date: DATE,
  dateModified: DATE,
  tags: ["eScripts", "Privacy", "App Comparison", "Australia", "Digital Health"],
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
        "pharmacy app Australia, independent eScript wallet, MedAdvisor vs OpenPharmacy, Chemist2U MyScripts, eScript privacy Australia, ADHA conformant wallet, prescription app comparison",
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
          name: "MedAdvisor",
          url: "https://www.mymedadvisor.com",
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
        {
          "@type": "SoftwareApplication",
          name: "Scripty",
          url: "https://getscripty.io",
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

function PharmacyAppVsIndependentEscriptWalletAustralia() {
  return (
    <BlogLayout meta={meta} schema={schema}>

      {/* Opening answer capsule */}
      <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
        {post.intro}
      </p>

      {/* Section 1: Two types of eScript apps */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.twoTypes.heading}
      </h2>
      {post.twoTypes.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 2: What pharmacy apps do well */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.pharmacyAppsSection.heading}
      </h2>
      {post.pharmacyAppsSection.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 3: What independent wallets do differently */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.independentWalletsSection.heading}
      </h2>
      {post.independentWalletsSection.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 4: Privacy implications */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.privacySection.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mt-4 font-medium">
        {post.privacySection.intro}
      </p>
      {post.privacySection.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 5: Switching pharmacies */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.switchingSection.heading}
      </h2>
      {post.switchingSection.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 6: Comparison table */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        Side-by-side comparison: Australian eScript apps
      </h2>
      <p className="text-white/75 text-sm mb-2">
        Data verified March 2026.
      </p>
      <ComparisonTable table={post.comparisonTable} />

      {/* Internal link: best eScript apps */}
      <p className="text-white/70 text-sm leading-relaxed mt-2">
        For a deeper comparison including offline access and ADHA conformance ratings, see:{" "}
        <Link
          to="/blog/best-escript-apps-australia-2026"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Best eScript Apps in Australia (2026)
        </Link>
        .
      </p>

      {/* Section 7: Which type is right for you? */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whichIsRightSection.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mb-6">
        {post.whichIsRightSection.intro}
      </p>

      <div className="space-y-5">
        {post.whichIsRightSection.scenarios.map((scenario, i) => (
          <div key={i} className="border border-white/10 rounded-xl px-5 py-4">
            <p className="font-semibold text-white mb-3">{scenario.label}</p>
            <ul className="space-y-2">
              {scenario.points.map((point, j) => (
                <li key={j} className="flex items-start gap-2">
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
          </div>
        ))}
      </div>

      <p className="text-white/80 leading-relaxed mt-6">
        {post.whichIsRightSection.closing}
      </p>

      {/* Internal links: related posts */}
      <p className="text-white/70 text-sm leading-relaxed mt-6">
        Related guides:{" "}
        <Link
          to="/blog/what-is-an-escript-wallet-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          What Is an eScript Wallet?
        </Link>
        {" "}&middot;{" "}
        <Link
          to="/blog/what-is-adha-conformance-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          What Is ADHA Conformance?
        </Link>
        {" "}&middot;{" "}
        <Link
          to="/blog/offline-escript-access-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Offline eScript Access in Australia
        </Link>
        {" "}&middot;{" "}
        <Link
          to="/compare/openpharmacy-vs-scripty"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          OpenPharmacy vs Scripty
        </Link>
      </p>

      {/* External authority reference */}
      <p className="text-white/60 text-sm leading-relaxed mt-4">
        Source:{" "}
        <a
          href="https://www.digitalhealth.gov.au/initiatives-and-programs/electronic-prescriptions"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Australian Digital Health Agency: Electronic Prescriptions (digitalhealth.gov.au)
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
          An independent eScript wallet that works at any Australian pharmacy. ADHA conformant,
          fully offline, and your data is never shared with third parties.
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

export default PharmacyAppVsIndependentEscriptWalletAustralia;
