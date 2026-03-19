import React from "react";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout";
import post from "../../data/blog/how-to-share-escript-with-carer-australia";

const SLUG = "how-to-share-escript-with-carer-australia";
const DATE = "2026-03-19";

const meta = {
  title: "How to Share Your eScript Securely with a Carer or Family Member in Australia",
  description:
    "Share an Australian eScript with a carer by forwarding the token for a one-off collection, or use OpenPharmacy family profiles for ongoing care — secure, encrypted, and accessible offline.",
  slug: SLUG,
  date: DATE,
  dateModified: DATE,
  tags: ["Caregivers", "Sharing", "Security", "Family Management", "eScripts", "Australia", "How To"],
};

// Combined BlogPosting + HowTo + FAQPage + BreadcrumbList schema
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
        "share eScript with carer Australia, eScript carer access Australia, carer prescription sharing Australia, family eScript management, OpenPharmacy family profiles, share prescription QR code Australia, carer collect script Australia, ADHA eScript wallet carer",
      about: {
        "@type": "Thing",
        name: "Electronic Prescriptions Australia",
      },
    },
    {
      "@type": "HowTo",
      "@id": `https://openpharmacy.com/blog/${SLUG}#howto`,
      name: "How to set up a carer's OpenPharmacy wallet for a family member",
      description:
        "Step-by-step guide to adding a family member's Australian eScript token to a carer's OpenPharmacy wallet for secure, offline access at any pharmacy.",
      step: post.stepByStep.steps.map((s) => ({
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

function HowToShareEscriptWithCarerAustralia() {
  return (
    <BlogLayout meta={meta} schema={schema}>

      {/* Opening answer capsule */}
      <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
        {post.intro}
      </p>

      {/* Last verified note */}
      <p className="text-white/45 text-xs mt-4">
        Information verified March 2026. Prescribing rules and app features are subject to change.
        Check with your prescriber or pharmacist for advice specific to your situation.
      </p>

      {/* Section 1: Two approaches */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.twoApproaches.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mb-6">{post.twoApproaches.intro}</p>

      <ul className="space-y-5">
        {post.twoApproaches.approaches.map((approach, i) => (
          <li key={i} className="border-l-2 border-[var(--color-accent)]/40 pl-4">
            <p className="font-semibold text-white mb-2">{approach.label}</p>
            <p className="text-white/75 text-sm leading-relaxed">{approach.detail}</p>
          </li>
        ))}
      </ul>

      {/* Section 2: Security risks of shortcuts */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.securityRisks.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mb-6">{post.securityRisks.intro}</p>

      <ul className="space-y-5">
        {post.securityRisks.risks.map((risk, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="flex-shrink-0 mt-1 text-white/40 font-bold text-sm"
              aria-hidden="true"
            >
              &ndash;
            </span>
            <div>
              <p className="font-semibold text-white mb-1">{risk.label}</p>
              <p className="text-white/75 text-sm leading-relaxed">{risk.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="text-white/80 leading-relaxed mt-6">{post.securityRisks.closing}</p>

      {/* Internal link: security guide */}
      <p className="text-white/75 text-sm leading-relaxed mt-4">
        For a full breakdown of what makes an eScript app genuinely secure, see:{" "}
        <Link
          to="/blog/escript-app-security-privacy-guide-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          How to Keep Your eScripts Secure: A Privacy Guide for Australian Patients
        </Link>
        .
      </p>

      {/* Section 3: How OpenPharmacy handles it */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.openPharmacyDetail.heading}
      </h2>
      {post.openPharmacyDetail.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 4: Step-by-step (HowTo) */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.stepByStep.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mb-6">{post.stepByStep.intro}</p>

      <ol className="space-y-5">
        {post.stepByStep.steps.map((step) => (
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

      <p className="text-white/75 text-sm leading-relaxed mt-6">{post.stepByStep.closing}</p>

      {/* Section 5: When direct token forwarding is right */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.directTokenWhen.heading}
      </h2>
      {post.directTokenWhen.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 6: Privacy note */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.privacyNote.heading}
      </h2>
      {post.privacyNote.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Internal links */}
      <p className="text-white/75 text-sm leading-relaxed mt-8">
        Managing prescriptions for multiple family members on an ongoing basis? See:{" "}
        <Link
          to="/blog/managing-family-escripts-australia-carers-parents"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Managing Family eScripts in Australia: A Practical Guide for Parents and Carers
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
          Share scripts securely. Download OpenPharmacy free.
        </h2>
        <p className="text-white/70 text-sm md:text-base mb-6 max-w-lg mx-auto">
          Manage eScripts for your whole family in one place. Separate profiles per person,
          encrypted on-device storage, offline QR codes, and ADHA-registered security.
          All data on Australian servers.
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

export default HowToShareEscriptWithCarerAustralia;
