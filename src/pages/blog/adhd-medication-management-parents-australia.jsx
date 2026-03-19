import React from "react";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout";
import post from "../../data/blog/adhd-medication-management-parents-australia";

const SLUG = "adhd-medication-management-parents-australia";
const DATE = "2026-03-19";

const meta = {
  title: "Managing ADHD Medication in Australia: A Parent's Practical Guide",
  description:
    "How Australian parents manage their child's Schedule 8 ADHD eScript tokens, navigate specialist prescribing rules, track repeats, and keep medication accessible using OpenPharmacy.",
  slug: SLUG,
  date: DATE,
  dateModified: DATE,
  tags: ["ADHD", "Parents", "Caregivers", "Schedule 8", "eScripts", "Children", "Australia"],
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
        "ADHD medication management Australia parents, child ADHD eScript token, Schedule 8 ADHD prescription child, ADHD repeat prescription Australia, lost ADHD escript token, OpenPharmacy ADHD children, ADHD paediatrician prescription Australia, managing family escripts ADHD",
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

function AdhdMedicationManagementParentsAustralia() {
  return (
    <BlogLayout meta={meta} schema={schema}>

      {/* Opening answer capsule */}
      <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
        {post.intro}
      </p>

      {/* Last verified note */}
      <p className="text-white/45 text-xs mt-4">
        Information verified March 2026. Schedule 8 prescribing rules vary by state and territory
        and are subject to change. Rules are also evolving as states introduce GP continuation
        prescriber pathways. Check with your prescriber for current requirements in your
        jurisdiction.
      </p>

      {/* Section 1: Regulatory reality */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.regulatoryReality.heading}
      </h2>
      {post.regulatoryReality.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      <p className="text-white/75 text-sm leading-relaxed mt-5">
        For the full picture of ADHD prescribing in Australia from the perspective of an adult
        managing their own scripts, see{" "}
        <Link
          to="/blog/adhd-escript-management-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          ADHD and eScripts: Why Managing Prescriptions Is Harder With ADHD
        </Link>
        .
      </p>

      {/* Section 2: How the eScript system works */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.escriptSystemExplained.heading}
      </h2>
      {post.escriptSystemExplained.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Token note callout */}
      <div className="mt-6 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 px-5 py-4">
        <p className="text-white/80 text-sm leading-relaxed">
          <span className="font-semibold text-white">Note: </span>
          {post.escriptSystemExplained.tokenNote}
        </p>
      </div>

      {/* Section 3: The logistical problem */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.logisticalProblem.heading}
      </h2>
      {post.logisticalProblem.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      <p className="text-white/75 text-sm leading-relaxed mt-5">
        For more on how carers and parents manage eScripts for multiple family members, see{" "}
        <Link
          to="/blog/managing-family-escripts-australia-carers-parents"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Managing Family eScripts in Australia: A Practical Guide for Parents and Carers
        </Link>
        .
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

      <p className="text-white/75 text-sm leading-relaxed mt-6">
        OpenPharmacy is registered with the Australian Digital Health Agency and listed on the ADHA
        ePrescribing Conformance Register. For a full explanation of what ADHA conformance means and
        why it matters, see{" "}
        <Link
          to="/blog/what-is-adha-conformance-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          What Is ADHA Conformance?
        </Link>
        .
      </p>

      {/* Section 5: Lost token */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.lostToken.heading}
      </h2>
      {post.lostToken.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      <p className="text-white/75 text-sm leading-relaxed mt-5">
        For a step-by-step guide covering all scenarios (including what to do when the prescriber
        is unavailable and how the Active Script List works as a backup), see{" "}
        <Link
          to="/blog/deleted-escript-sms-what-to-do-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          What Happens If You Delete Your eScript SMS? Here's What to Do
        </Link>
        .
      </p>

      {/* Section 6: Transition to adult services */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.transitionToAdult.heading}
      </h2>
      {post.transitionToAdult.body.map((paragraph, i) => (
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

      {/* CTA */}
      <div className="mt-12 rounded-2xl bg-[var(--color-secondary)] border border-white/10 p-6 md:p-8 text-center">
        <h2 className="font-grifter text-xl md:text-2xl font-bold text-white mb-2">
          Download OpenPharmacy. Free on iOS and Android.
        </h2>
        <p className="text-white/70 text-sm md:text-base mb-6 max-w-lg mx-auto">
          Keep your child's ADHD scripts separate from your own. Repeat counts visible at a glance,
          offline QR codes always ready, family profiles clearly labelled. ADHA-registered,
          end-to-end encrypted, all data on Australian servers.
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

export default AdhdMedicationManagementParentsAustralia;
