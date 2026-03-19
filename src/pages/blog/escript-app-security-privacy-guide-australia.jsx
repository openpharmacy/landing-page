import React from "react";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout";
import post from "../../data/blog/escript-app-security-privacy-guide-australia";

const SLUG = "escript-app-security-privacy-guide-australia";
const DATE = "2026-03-11";

const meta = {
  title: "How to Keep Your eScripts Secure: A Privacy Guide for Australian Patients",
  description:
    "Learn how to verify an eScript app is secure: check the ADHA ePrescribing Conformance Register, confirm Australian server storage, and verify ASD-approved encryption before trusting an app with your prescription data.",
  slug: SLUG,
  date: DATE,
  dateModified: DATE,
  tags: ["Security", "Privacy", "Encryption", "ADHA", "Digital Health", "Australia"],
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
        "eScript security Australia, ASD-approved encryption, ADHA conformance, Australian health app privacy, Privacy Act 1988, electronic prescription security, health data storage Australia, OAIC health privacy",
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
          "@type": "Organization",
          name: "Australian Signals Directorate",
          url: "https://www.asd.gov.au",
        },
        {
          "@type": "Organization",
          name: "Office of the Australian Information Commissioner",
          url: "https://www.oaic.gov.au",
        },
      ],
      citation: [
        {
          "@type": "WebSite",
          name: "Office of the Australian Information Commissioner",
          url: "https://www.oaic.gov.au/privacy/australian-privacy-principles",
        },
        {
          "@type": "WebSite",
          name: "Australian Digital Health Agency: Electronic Prescriptions",
          url: "https://www.digitalhealth.gov.au/initiatives-and-programs/electronic-prescriptions",
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

function EscriptAppSecurityPrivacyGuideAustralia() {
  return (
    <BlogLayout meta={meta} schema={schema}>

      {/* Opening answer capsule */}
      <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
        {post.intro}
      </p>

      {/* Section 1: Why eScript security matters */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whyItMatters.heading}
      </h2>
      {post.whyItMatters.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 2: The problem with SMS and email */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.smsEmailProblem.heading}
      </h2>
      {post.smsEmailProblem.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4 mb-6">
          {paragraph}
        </p>
      ))}

      <ul className="space-y-5">
        {post.smsEmailProblem.problems.map((problem, i) => (
          <li key={i} className="border-l-2 border-white/15 pl-4">
            <p className="font-semibold text-white mb-1">{problem.label}</p>
            <p className="text-white/75 text-sm leading-relaxed">{problem.detail}</p>
          </li>
        ))}
      </ul>

      <p className="text-white/80 leading-relaxed mt-6">{post.smsEmailProblem.closing}</p>

      {/* Section 3: What to look for checklist */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whatToLookFor.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mb-6">{post.whatToLookFor.intro}</p>

      <ul className="space-y-5">
        {post.whatToLookFor.checklist.map((item, i) => (
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

      {/* Section 4: What Australian data storage means */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.australianDataStorage.heading}
      </h2>
      {post.australianDataStorage.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* External authority link: OAIC */}
      <p className="text-white/60 text-sm leading-relaxed mt-6">
        Reference:{" "}
        <a
          href="https://www.oaic.gov.au/privacy/australian-privacy-principles"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Australian Privacy Principles (oaic.gov.au)
        </a>
        {" "}and the{" "}
        <a
          href="https://www.legislation.gov.au/Details/C2014C00076"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Privacy Act 1988 (legislation.gov.au)
        </a>
      </p>

      {/* Section 5: Understanding encryption */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.encryptionExplained.heading}
      </h2>
      {post.encryptionExplained.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4 mb-6">
          {paragraph}
        </p>
      ))}

      <ul className="space-y-5">
        {post.encryptionExplained.concepts.map((concept, i) => (
          <li key={i} className="border border-white/10 rounded-xl px-5 py-4">
            <p className="font-semibold text-white mb-1">{concept.label}</p>
            <p className="text-white/75 text-sm leading-relaxed">{concept.detail}</p>
          </li>
        ))}
      </ul>

      <p className="text-white/80 leading-relaxed mt-6">{post.encryptionExplained.closing}</p>

      {/* Section 6: How OpenPharmacy approaches security */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.openPharmacySection.heading}
      </h2>
      {post.openPharmacySection.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Internal link to ADHA conformance explainer */}
      <p className="text-white/75 text-sm leading-relaxed mt-6">
        For a detailed explanation of what ADHA conformance assessment involves and how to verify any app, see:{" "}
        <Link
          to="/blog/what-is-adha-conformance-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          What Is ADHA Conformance? Why It Matters Before You Trust an App With Your Prescriptions
        </Link>
        .
      </p>

      {/* Internal link to pharmacy vs independent wallet */}
      <p className="text-white/75 text-sm leading-relaxed mt-3">
        To understand why pharmacy-owned apps have different privacy incentives than independent wallets, see:{" "}
        <Link
          to="/blog/pharmacy-app-vs-independent-escript-wallet-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Pharmacy App vs Independent eScript Wallet: What Every Australian Patient Should Know
        </Link>
        .
      </p>

      {/* Section 7: Pre-download checklist */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.downloadChecklist.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mb-6">{post.downloadChecklist.intro}</p>

      <ul className="space-y-4">
        {post.downloadChecklist.items.map((item, i) => (
          <li key={i} className="border border-white/10 rounded-xl px-5 py-4">
            <p className="font-semibold text-white mb-1">{item.question}</p>
            <p className="text-white/70 text-sm leading-relaxed">{item.action}</p>
          </li>
        ))}
      </ul>

      {/* External authority link: ADHA */}
      <p className="text-white/60 text-sm leading-relaxed mt-6">
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

      {/* Internal link to best apps comparison */}
      <p className="text-white/75 text-sm leading-relaxed mt-8">
        Looking for a side-by-side comparison of how OpenPharmacy's security compares to other Australian eScript apps? See:{" "}
        <Link
          to="/blog/best-escript-apps-australia-2026"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Best eScript Apps in Australia (2026): Compared by Offline Access, Security, and Family Features
        </Link>
        .
      </p>

      {/* CTA */}
      <div className="mt-12 rounded-2xl bg-[var(--color-secondary)] border border-white/10 p-6 md:p-8 text-center">
        <h2 className="font-grifter text-xl md:text-2xl font-bold text-white mb-2">
          Download OpenPharmacy. Free on iOS and Android.
        </h2>
        <p className="text-white/70 text-sm md:text-base mb-6 max-w-lg mx-auto">
          ADHA-conformant. ASD-approved end-to-end encryption. Data stored on Australian servers. Independent of any pharmacy chain. Works completely offline.
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

export default EscriptAppSecurityPrivacyGuideAustralia;
