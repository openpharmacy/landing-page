import React from "react";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout";
import post from "../../data/blog/what-is-adha-conformance-australia";

const SLUG = "what-is-adha-conformance-australia";
const DATE = "2026-03-11";

const meta = {
  title:
    "What Is ADHA Conformance? Why It Matters Before You Trust an App With Your Prescriptions",
  description:
    "ADHA conformance means an app has been assessed and registered by the Australian Digital Health Agency as meeting national security and safety standards for handling eScripts. Learn what it means and how to verify it.",
  slug: SLUG,
  date: DATE,
  dateModified: DATE,
  tags: ["ADHA", "Security", "eScripts", "Digital Health", "Trust"],
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
        "ADHA conformance, Australian Digital Health Agency, ADHA-conformant app, eScript security, ASD-approved encryption, ePrescribing Conformance Register, electronic prescription Australia",
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
      ],
      citation: {
        "@type": "WebSite",
        name: "Australian Digital Health Agency",
        url: "https://www.digitalhealth.gov.au/initiatives-and-programs/electronic-prescriptions",
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

function WhatIsAdhaConformanceAustralia() {
  return (
    <BlogLayout meta={meta} schema={schema}>

      {/* Opening answer capsule */}
      <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
        {post.intro}
      </p>

      {/* Section 1: What is the ADHA? */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whatIsAdha.heading}
      </h2>
      {post.whatIsAdha.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 2: What does conformance actually mean? */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whatConformanceMeans.heading}
      </h2>
      {post.whatConformanceMeans.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Three pillars */}
      <ul className="space-y-5 my-6">
        {post.whatConformanceMeans.pillars.map((pillar, i) => (
          <li key={i} className="border-l-2 border-white/15 pl-4">
            <p className="font-semibold text-white mb-1">{pillar.label}</p>
            <p className="text-white/75 text-sm leading-relaxed">{pillar.detail}</p>
          </li>
        ))}
      </ul>

      <p className="text-white/80 leading-relaxed">{post.whatConformanceMeans.closing}</p>

      {/* Section 3: Why it matters for patients */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whyItMatters.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mb-6">{post.whyItMatters.intro}</p>

      <ul className="space-y-5">
        {post.whyItMatters.reasons.map((reason, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="flex-shrink-0 mt-1 text-[var(--color-accent)] font-bold text-sm"
              aria-hidden="true"
            >
              &#10003;
            </span>
            <div>
              <p className="font-semibold text-white mb-1">{reason.label}</p>
              <p className="text-white/75 text-sm leading-relaxed">{reason.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Section 4: How to verify conformance */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.howToVerify.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mb-6">{post.howToVerify.intro}</p>

      <ol className="space-y-5">
        {post.howToVerify.steps.map((step) => (
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

      {/* Closing note on compliant vs conformant */}
      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
        <p className="text-white/80 text-sm leading-relaxed">
          <span className="font-semibold text-white">Note: </span>
          {post.howToVerify.closingNote}
        </p>
      </div>

      {/* Section 5: OpenPharmacy and ADHA conformance */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.openPharmacySection.heading}
      </h2>
      {post.openPharmacySection.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Internal links to related posts */}
      <p className="text-white/75 text-sm leading-relaxed mt-6">
        For a full comparison of how OpenPharmacy's security compares to other Australian eScript apps, see:{" "}
        <Link
          to="/blog/best-escript-apps-australia-2026"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Best eScript Apps in Australia (2026): Compared by Offline Access, Security, and Family Features
        </Link>
        .
      </p>
      <p className="text-white/75 text-sm leading-relaxed mt-3">
        For a detailed ADHA-conformance comparison between OpenPharmacy and Scripty, see:{" "}
        <Link
          to="/compare/openpharmacy-vs-scripty"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          OpenPharmacy vs Scripty: Which eScript Wallet Is Right for You?
        </Link>
        .
      </p>

      {/* Section 6: Checklist */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.checklistSection.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mb-6">{post.checklistSection.intro}</p>

      <ul className="space-y-5">
        {post.checklistSection.items.map((item, i) => (
          <li key={i} className="border border-white/10 rounded-xl px-5 py-4">
            <p className="font-semibold text-white mb-1">{item.question}</p>
            <p className="text-white/70 text-sm leading-relaxed">{item.why}</p>
          </li>
        ))}
      </ul>

      {/* External authority link */}
      <p className="text-white/60 text-sm leading-relaxed mt-6">
        Source:{" "}
        <a
          href="https://www.digitalhealth.gov.au/initiatives-and-programs/electronic-prescriptions"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Australian Digital Health Agency — Electronic Prescriptions (digitalhealth.gov.au)
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

      {/* Internal link to eScript wallet guide */}
      <p className="text-white/75 text-sm leading-relaxed mt-8">
        New to eScripts? Read our plain-English explainer:{" "}
        <Link
          to="/blog/what-is-an-escript-wallet-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          What Is an eScript Wallet? A Plain-English Guide for Australians
        </Link>
        .
      </p>

      {/* CTA */}
      <div className="mt-12 rounded-2xl bg-[var(--color-secondary)] border border-white/10 p-6 md:p-8 text-center">
        <h2 className="font-grifter text-xl md:text-2xl font-bold text-white mb-2">
          Download OpenPharmacy. Free on iOS and Android.
        </h2>
        <p className="text-white/70 text-sm md:text-base mb-6 max-w-lg mx-auto">
          ADHA-conformant. ASD-approved encryption. All data stored in Australia. Works
          completely offline at any Australian pharmacy.
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

export default WhatIsAdhaConformanceAustralia;
