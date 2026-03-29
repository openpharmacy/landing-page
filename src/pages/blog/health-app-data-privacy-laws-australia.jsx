import React from "react";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout";
import post from "../../data/blog/health-app-data-privacy-laws-australia";

const SLUG = "health-app-data-privacy-laws-australia";
const DATE = "2026-03-19";

const meta = {
  title: "Australian Health App Data Privacy Laws: What Every Patient Should Know",
  description:
    "Australian health apps must comply with the Privacy Act 1988 and 13 Australian Privacy Principles. Learn what OAIC, ADHA conformance, and APP 11 mean for your prescription data — and what to look for in a privacy policy.",
  slug: SLUG,
  date: DATE,
  dateModified: DATE,
  tags: ["Privacy", "Privacy Act", "OAIC", "Security", "Australia", "Digital Health", "ADHA"],
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
        "Australian health app privacy law, Privacy Act 1988 health apps, Australian Privacy Principles health data, OAIC health information, ADHA conformance privacy, notifiable data breaches health apps, health app data security Australia, APP 11 health information",
      about: {
        "@type": "Thing",
        name: "Health App Data Privacy Australia",
      },
      mentions: [
        {
          "@type": "Organization",
          name: "Office of the Australian Information Commissioner",
          url: "https://www.oaic.gov.au",
          sameAs: "https://www.oaic.gov.au",
        },
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
          sameAs: "https://www.asd.gov.au",
        },
      ],
      citation: [
        {
          "@type": "WebSite",
          name: "Privacy Act 1988 — legislation.gov.au",
          url: "https://www.legislation.gov.au/C2004A03712",
          sameAs: "https://www.legislation.gov.au/C2004A03712",
        },
        {
          "@type": "WebSite",
          name: "Australian Privacy Principles — OAIC",
          url: "https://www.oaic.gov.au/privacy/australian-privacy-principles",
          sameAs: "https://www.oaic.gov.au/privacy/australian-privacy-principles",
        },
        {
          "@type": "WebSite",
          name: "Notifiable Data Breaches scheme — OAIC",
          url: "https://www.oaic.gov.au/privacy/notifiable-data-breaches/about-the-notifiable-data-breaches-scheme",
          sameAs: "https://www.oaic.gov.au/privacy/notifiable-data-breaches/about-the-notifiable-data-breaches-scheme",
        },
        {
          "@type": "WebSite",
          name: "ADHA Electronic Prescribing Conformance Register",
          url: "https://www.digitalhealth.gov.au/about-us/policies-privacy-and-reporting/registers",
          sameAs: "https://www.digitalhealth.gov.au/about-us/policies-privacy-and-reporting/registers",
        },
        {
          "@type": "WebSite",
          name: "Electronic Prescribing — health.gov.au",
          url: "https://www.health.gov.au/our-work/electronic-prescribing",
          sameAs: "https://www.health.gov.au/our-work/electronic-prescribing",
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

function HealthAppDataPrivacyLawsAustralia() {
  return (
    <BlogLayout meta={meta} schema={schema}>

      {/* Opening answer capsule */}
      <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
        {post.intro}
      </p>

      {/* Updated note */}
      <p className="text-white/50 text-xs mt-4">Updated March 2026 — reflects the Privacy and Other Legislation Amendment Act 2024.</p>

      {/* Section 1: Privacy Act 1988 */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.privacyActSection.heading}
      </h2>
      {post.privacyActSection.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Authority link: Privacy Act */}
      <p className="text-white/60 text-sm leading-relaxed mt-6">
        Reference:{" "}
        <a
          href="https://www.legislation.gov.au/C2004A03712"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Privacy Act 1988 (legislation.gov.au)
        </a>
      </p>

      {/* Section 2: The 13 APPs */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.appsSection.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mb-6">{post.appsSection.intro}</p>

      <ul className="space-y-6">
        {post.appsSection.principles.map((principle, i) => (
          <li key={i} className="border border-white/10 rounded-xl px-5 py-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[var(--color-accent)] font-bold text-sm bg-[var(--color-accent)]/10 px-2 py-0.5 rounded">
                {principle.number}
              </span>
              <p className="font-semibold text-white">{principle.label}</p>
            </div>
            <p className="text-white/75 text-sm leading-relaxed">{principle.detail}</p>
          </li>
        ))}
      </ul>

      <p className="text-white/80 leading-relaxed mt-6">{post.appsSection.closing}</p>

      {/* Authority link: OAIC APPs */}
      <p className="text-white/60 text-sm leading-relaxed mt-4">
        Reference:{" "}
        <a
          href="https://www.oaic.gov.au/privacy/australian-privacy-principles"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Australian Privacy Principles (oaic.gov.au)
        </a>
      </p>

      {/* Section 3: OAIC */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.oaicSection.heading}
      </h2>
      {post.oaicSection.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Authority link: OAIC NDB */}
      <p className="text-white/60 text-sm leading-relaxed mt-6">
        Reference:{" "}
        <a
          href="https://www.oaic.gov.au/privacy/notifiable-data-breaches/about-the-notifiable-data-breaches-scheme"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Notifiable Data Breaches scheme (oaic.gov.au)
        </a>
      </p>

      {/* Section 4: ADHA Conformance */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.adhaSection.heading}
      </h2>
      {post.adhaSection.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* How to check — numbered steps */}
      <h3 className="text-lg font-semibold text-white mt-8 mb-4">
        {post.adhaSection.howToCheck.heading}
      </h3>
      <ol className="space-y-5">
        {post.adhaSection.howToCheck.steps.map((step) => (
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

      {/* Authority link: ADHA registers */}
      <p className="text-white/60 text-sm leading-relaxed mt-6">
        Reference:{" "}
        <a
          href="https://www.digitalhealth.gov.au/about-us/policies-privacy-and-reporting/registers"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          ADHA Conformance Registers (digitalhealth.gov.au)
        </a>
        {" "}and{" "}
        <a
          href="https://www.health.gov.au/our-work/electronic-prescribing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Electronic Prescribing (health.gov.au)
        </a>
      </p>

      {/* Internal link to ADHA conformance explainer */}
      <p className="text-white/75 text-sm leading-relaxed mt-4">
        For a plain-English explanation of what the ADHA conformance assessment involves and exactly how to verify any app, see:{" "}
        <Link
          to="/blog/what-is-adha-conformance-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          What Is ADHA Conformance? Why It Matters Before You Trust an App With Your Prescriptions
        </Link>
        .
      </p>

      {/* Section 5: Australian Server Storage */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.serverStorageSection.heading}
      </h2>
      {post.serverStorageSection.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 6: Red Flags */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.redFlagsSection.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mb-6">{post.redFlagsSection.intro}</p>

      <ul className="space-y-5">
        {post.redFlagsSection.flags.map((flag, i) => (
          <li key={i} className="border-l-2 border-white/15 pl-4">
            <p className="font-semibold text-white mb-1">{flag.label}</p>
            <p className="text-white/75 text-sm leading-relaxed">{flag.detail}</p>
          </li>
        ))}
      </ul>

      {/* Section 7: OpenPharmacy's commitments */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.openPharmacySection.heading}
      </h2>
      {post.openPharmacySection.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Internal link to security guide */}
      <p className="text-white/75 text-sm leading-relaxed mt-6">
        For a practical guide to evaluating whether any eScript app is genuinely secure — including what encryption standards to look for and how to read a privacy policy critically — see:{" "}
        <Link
          to="/blog/escript-app-security-privacy-guide-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          How to Keep Your eScripts Secure: A Privacy Guide for Australian Patients
        </Link>
        .
      </p>

      {/* Internal link to pharmacy vs independent wallet */}
      <p className="text-white/75 text-sm leading-relaxed mt-3">
        To understand why pharmacy-owned apps have different privacy incentives from independent eScript wallets, see:{" "}
        <Link
          to="/blog/pharmacy-app-vs-independent-escript-wallet-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Pharmacy App vs Independent eScript Wallet: What Every Australian Patient Should Know
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
          ADHA-conformant. ASD-approved end-to-end encryption. All data stored on Australian servers. No third-party sharing. Independent of any pharmacy chain. Works completely offline.
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

export default HealthAppDataPrivacyLawsAustralia;
