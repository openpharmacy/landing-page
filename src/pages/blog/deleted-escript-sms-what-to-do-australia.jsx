import React from "react";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout";
import post from "../../data/blog/deleted-escript-sms-what-to-do-australia";

const SLUG = "deleted-escript-sms-what-to-do-australia";
const DATE = "2026-03-11";

const meta = {
  title: "What Happens If You Delete Your eScript SMS? Here's What to Do",
  description:
    "Deleted your eScript SMS in Australia? Your prescription still exists — it has not been cancelled. Learn how to recover the token, use the Active Script List, and prevent it happening again.",
  slug: SLUG,
  date: DATE,
  dateModified: DATE,
  tags: ["Troubleshooting", "eScripts", "Recovery", "Active Script List", "Australia"],
};

// Combined BlogPosting + HowTo + FAQPage + BreadcrumbList schema
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": `https://www.openpharmacy.com/blog/${SLUG}/#article`,
      headline: meta.title,
      description: meta.description,
      datePublished: DATE,
      dateModified: DATE,
      url: `https://www.openpharmacy.com/blog/${SLUG}/`,
      inLanguage: "en-AU",
      author: {
        "@type": "Organization",
        name: "OpenPharmacy",
        legalName: "Easy As Health Pty Ltd",
        url: "https://www.openpharmacy.com",
      },
      publisher: {
        "@type": "Organization",
        name: "OpenPharmacy",
        legalName: "Easy As Health Pty Ltd",
        url: "https://www.openpharmacy.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.openpharmacy.com/Logo.svg",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://www.openpharmacy.com/blog/${SLUG}/`,
      },
      keywords:
        "deleted eScript SMS Australia, lost eScript token, recover eScript Australia, Active Script List, eScript wallet, OpenPharmacy, electronic prescription Australia",
      about: {
        "@type": "Thing",
        name: "Electronic Prescriptions Australia",
      },
    },
    {
      "@type": "HowTo",
      "@id": `https://www.openpharmacy.com/blog/${SLUG}/#howto`,
      name: "How to recover a deleted eScript token in Australia",
      description:
        "Step-by-step guide to recovering access to your electronic prescription after deleting the SMS token.",
      step: post.howToRecover.steps.map((s) => ({
        "@type": "HowToStep",
        position: s.number,
        name: s.name,
        text: s.description,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `https://www.openpharmacy.com/blog/${SLUG}/#faq`,
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
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.openpharmacy.com/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.openpharmacy.com/blog/" },
        {
          "@type": "ListItem",
          position: 3,
          name: meta.title,
          item: `https://www.openpharmacy.com/blog/${SLUG}/`,
        },
      ],
    },
  ],
};

function DeletedEscriptSmsWhatToDoAustralia() {
  return (
    <BlogLayout meta={meta} schema={schema}>

      {/* Opening answer capsule */}
      <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
        {post.intro}
      </p>

      {/* Section 1: What is a token */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whatIsToken.heading}
      </h2>
      {post.whatIsToken.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 2: What actually happens */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whatHappens.heading}
      </h2>
      {post.whatHappens.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
        <h3 className="text-base font-semibold text-white mb-2">
          {post.whatHappens.aslNote.heading}
        </h3>
        <p className="text-white/75 text-sm leading-relaxed">
          {post.whatHappens.aslNote.body}
        </p>
      </div>

      <p className="text-white/80 leading-relaxed mt-4">{post.whatHappens.notOnAsl}</p>

      {/* Section 3: How to recover */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.howToRecover.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mb-6">{post.howToRecover.intro}</p>

      <ol className="space-y-5">
        {post.howToRecover.steps.map((step) => (
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

      <p className="text-white/80 leading-relaxed mt-6">{post.howToRecover.closing}</p>

      {/* Section 4: Can a pharmacist fill without the token */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.aslSection.heading}
      </h2>
      {post.aslSection.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Section 5: Permanent fix */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.permanentFix.heading}
      </h2>
      {post.permanentFix.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      <p className="text-white/80 leading-relaxed mt-6">
        {post.permanentFix.openPharmacySteps.intro}
      </p>

      <ol className="space-y-5 mt-4">
        {post.permanentFix.openPharmacySteps.steps.map((step) => (
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

      <p className="text-white/80 leading-relaxed mt-6">
        {post.permanentFix.openPharmacySteps.closing}
      </p>

      {/* Section 6: Is screenshotting safe */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.screenshotSection.heading}
      </h2>
      {post.screenshotSection.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Internal links to related posts */}
      <p className="text-white/75 text-sm leading-relaxed mt-8">
        Want to understand eScript wallets in more detail? See:{" "}
        <Link
          to="/blog/what-is-an-escript-wallet-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          What Is an eScript Wallet? A Plain-English Guide for Australians
        </Link>
        .
      </p>
      <p className="text-white/75 text-sm leading-relaxed mt-3">
        Need to access your script without internet? Read:{" "}
        <Link
          to="/blog/offline-escript-access-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          Offline eScript Access in Australia: Why Your QR Code Must Be Available Without Internet
        </Link>
        .
      </p>
      <p className="text-white/75 text-sm leading-relaxed mt-3">
        Concerned about the security of your prescriptions? Read:{" "}
        <Link
          to="/blog/escript-app-security-privacy-guide-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          How to Keep Your eScripts Secure: A Privacy Guide for Australian Patients
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
          Never lose an eScript again. Download OpenPharmacy free.
        </h2>
        <p className="text-white/70 text-sm md:text-base mb-6 max-w-lg mx-auto">
          Save scripts from your SMS into a secure, encrypted wallet in seconds. Works offline.
          ADHA conformant. All data stored in Australia.
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

export default DeletedEscriptSmsWhatToDoAustralia;
