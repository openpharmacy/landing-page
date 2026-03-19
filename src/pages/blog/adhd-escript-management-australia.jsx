import React from "react";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout";
import post from "../../data/blog/adhd-escript-management-australia";

const SLUG = "adhd-escript-management-australia";
const DATE = "2026-03-19";

const meta = {
  title: "ADHD and eScripts: Why Managing Prescriptions Is Harder With ADHD (And What Actually Helps)",
  description:
    "Managing Australian eScripts with ADHD means navigating SMS tokens, Schedule 8 repeat rules, and repeat tracking with impaired executive function. Here is what actually helps.",
  slug: SLUG,
  date: DATE,
  dateModified: DATE,
  tags: ["ADHD", "eScripts", "Accessibility", "Executive Function", "Australia", "Digital Health"],
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
        "ADHD prescription management Australia, ADHD eScript token lost, Schedule 8 ADHD medication eScript, ADHD repeat prescription Australia, OpenPharmacy ADHD, ADHD medication adherence Australia, eScript wallet ADHD",
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

function AdhdEscriptManagementAustralia() {
  return (
    <BlogLayout meta={meta} schema={schema}>

      {/* Opening answer capsule */}
      <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
        {post.intro}
      </p>

      {/* Last verified note */}
      <p className="text-white/45 text-xs mt-4">
        Information verified March 2026. Schedule 8 prescribing rules vary by state and territory
        and are subject to change. Check with your prescriber for the current requirements in your
        jurisdiction.
      </p>

      {/* Section 1: Why the eScript system is harder with ADHD */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whyHarder.heading}
      </h2>
      {post.whyHarder.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 2: Specific failure points */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.failurePoints.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mt-4 mb-6">{post.failurePoints.intro}</p>

      <ul className="space-y-5">
        {post.failurePoints.points.map((point, i) => (
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

      {/* Section 3: How the eScript system works for Schedule 8 */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.howEscriptSystemWorks.heading}
      </h2>
      {post.howEscriptSystemWorks.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      <p className="text-white/75 text-sm leading-relaxed mt-5">
        If you have deleted your eScript token for a non-controlled medication, recovery is
        simpler: see{" "}
        <Link
          to="/blog/deleted-escript-sms-what-to-do-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          what to do if you delete your eScript SMS
        </Link>
        {" "}for a step-by-step guide.
      </p>

      {/* Section 4: How OpenPharmacy helps */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.howOpenPharmacyHelps.heading}
      </h2>
      {post.howOpenPharmacyHelps.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      <ul className="space-y-5 mt-6">
        {post.howOpenPharmacyHelps.features.map((feature, i) => (
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
        For a detailed explanation of how offline storage works and why it matters, see{" "}
        <Link
          to="/blog/offline-escript-access-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          offline eScript access in Australia
        </Link>
        .
      </p>

      {/* Section 5: Parents managing children's ADHD medication */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.parentsSection.heading}
      </h2>
      {post.parentsSection.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      <p className="text-white/75 text-sm leading-relaxed mt-5">
        For the full guide to managing scripts for multiple family members, including children and
        elderly parents, see{" "}
        <Link
          to="/blog/managing-family-escripts-australia-carers-parents"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          managing family eScripts in Australia
        </Link>
        .
      </p>

      {/* Section 6: What OpenPharmacy does not do */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.limitations.heading}
      </h2>
      {post.limitations.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

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

      {/* Related guides */}
      <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-2">
        <p className="text-sm font-semibold text-white/70 mb-3">Related guides</p>
        <ul className="space-y-2">
          <li>
            <Link
              to="/blog/adhd-medication-management-parents-australia"
              className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
            >
              Managing ADHD Medication in Australia: A Parent's Practical Guide
            </Link>
          </li>
          <li>
            <Link
              to="/blog/deleted-escript-sms-what-to-do-australia"
              className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
            >
              What Happens If You Delete Your eScript SMS? Step-by-step recovery guide
            </Link>
          </li>
          <li>
            <Link
              to="/blog/how-to-track-escript-repeats-australia"
              className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
            >
              How to Track Your eScript Repeats in Australia (Without Losing Track)
            </Link>
          </li>
          <li>
            <Link
              to="/blog/offline-escript-access-australia"
              className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
            >
              Offline eScript Access in Australia: Why your QR code must be available without internet
            </Link>
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-2xl bg-[var(--color-secondary)] border border-white/10 p-6 md:p-8 text-center">
        <h2 className="font-grifter text-xl md:text-2xl font-bold text-white mb-2">
          Download OpenPharmacy. Free on iOS and Android.
        </h2>
        <p className="text-white/70 text-sm md:text-base mb-6 max-w-lg mx-auto">
          Store your ADHD eScript tokens securely on your device. Always accessible offline, repeat
          count visible at a glance, family scripts kept separate. ADHA-registered, end-to-end
          encrypted, all data on Australian servers.
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

export default AdhdEscriptManagementAustralia;
