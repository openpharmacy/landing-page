import React from "react";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout";
import post from "../../data/blog/managing-chronic-illness-escripts-australia";

const SLUG = "managing-chronic-illness-escripts-australia";
const DATE = "2026-03-19";

const meta = {
  title: "Managing Chronic Illness Prescriptions in Australia: Practical Strategies and the Right Tools",
  description:
    "Around half of Australians live with a chronic condition. This guide explains why the SMS token system breaks down at scale, when pharmacy apps help, and how a dedicated eScript wallet like OpenPharmacy solves the real problems.",
  slug: SLUG,
  date: DATE,
  dateModified: DATE,
  tags: ["Chronic Illness", "Repeat Prescriptions", "eScripts", "Privacy", "Australia", "Digital Health"],
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
        "chronic illness prescriptions Australia, managing repeat prescriptions Australia, eScript wallet chronic condition, OpenPharmacy repeat scripts, chronic disease medication management Australia, electronic prescriptions chronic illness, pharmacy app vs eScript wallet",
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

function ManagingChronicIllnessEscriptsAustralia() {
  return (
    <BlogLayout meta={meta} schema={schema}>

      {/* Opening answer capsule */}
      <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
        {post.intro}
      </p>

      {/* Last verified note */}
      <p className="text-white/45 text-xs mt-4">
        Information verified March 2026. Electronic prescribing rules and app features are subject to
        change. Check with your prescriber or pharmacist for the most current information relevant
        to your medications.
      </p>

      {/* Section 1: The everyday reality */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.everydayReality.heading}
      </h2>
      {post.everydayReality.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 2: SMS token failure points */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.smsProblems.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mt-4 mb-6">{post.smsProblems.intro}</p>

      <ul className="space-y-5">
        {post.smsProblems.points.map((point, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="flex-shrink-0 mt-1 text-[var(--color-accent)] font-bold text-sm"
              aria-hidden="true"
            >
              &#10003;
            </span>
            <div>
              <p className="font-semibold text-white mb-1">{point.label}</p>
              <p className="text-white/75 text-sm leading-relaxed">{point.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Section 3: When a pharmacy app is right — and when it isn't */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.medAdvisorSection.heading}
      </h2>
      {post.medAdvisorSection.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      <p className="text-white/75 text-sm leading-relaxed mt-5">
        For a detailed comparison of pharmacy apps and independent eScript wallets, including privacy
        policy breakdowns, see{" "}
        <Link
          to="/blog/pharmacy-app-vs-independent-escript-wallet-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          pharmacy app vs independent eScript wallet
        </Link>
        .
      </p>

      {/* Section 4: What a dedicated eScript wallet does differently */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.escriptWalletSection.heading}
      </h2>
      {post.escriptWalletSection.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      <ul className="space-y-5 mt-6">
        {post.escriptWalletSection.features.map((feature, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="flex-shrink-0 mt-1 text-[var(--color-accent)] font-bold text-sm"
              aria-hidden="true"
            >
              +
            </span>
            <div>
              <p className="font-semibold text-white mb-1">{feature.label}</p>
              <p className="text-white/75 text-sm leading-relaxed">{feature.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="text-white/75 text-sm leading-relaxed mt-5">
        For a plain-English explanation of how eScript wallets work and what to look for, see{" "}
        <Link
          to="/blog/what-is-an-escript-wallet-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          what is an eScript wallet
        </Link>
        .
      </p>

      {/* Section 5: Practical setup */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.practicalSetup.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mt-4 mb-6">{post.practicalSetup.intro}</p>

      <ol className="space-y-5">
        {post.practicalSetup.steps.map((step, i) => (
          <li key={i} className="flex gap-4">
            <span
              className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-bold flex items-center justify-center mt-0.5"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <div>
              <p className="font-semibold text-white mb-1">{step.label}</p>
              <p className="text-white/75 text-sm leading-relaxed">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="text-white/80 leading-relaxed mt-6">{post.practicalSetup.afterSetup}</p>

      {/* Section 6: Privacy */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.privacySection.heading}
      </h2>
      {post.privacySection.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      <p className="text-white/75 text-sm leading-relaxed mt-5">
        For a full walkthrough of the security and privacy standards that matter when choosing an
        eScript app, see{" "}
        <Link
          to="/blog/escript-app-security-privacy-guide-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          how to keep your eScripts secure
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
          Keep all your ongoing prescriptions in one secure, organised place. Repeat counts visible
          at a glance, QR codes accessible offline at any pharmacy, family scripts kept separately.
          ADHA-registered, end-to-end encrypted, all data on Australian servers.
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

export default ManagingChronicIllnessEscriptsAustralia;
