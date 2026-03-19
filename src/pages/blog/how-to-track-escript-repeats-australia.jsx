import React from "react";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout";
import post from "../../data/blog/how-to-track-escript-repeats-australia";

const SLUG = "how-to-track-escript-repeats-australia";
const DATE = "2026-03-19";

const meta = {
  title: "How to Track Your eScript Repeats in Australia (Without Losing Track)",
  description:
    "Each Australian eScript repeat is a separate token sent after each dispense — there is no central view by default. Learn how the system works, how the Active Script List helps, and how OpenPharmacy shows remaining repeats offline.",
  slug: SLUG,
  date: DATE,
  dateModified: DATE,
  tags: ["Repeats", "eScripts", "How To", "Active Script List", "Australia", "Digital Health"],
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
        "eScript repeats Australia, track prescription repeats Australia, Active Script List, OpenPharmacy repeat tracking, how many repeats on prescription Australia, electronic prescription repeats, eScript wallet Australia",
      about: {
        "@type": "Thing",
        name: "Electronic Prescriptions Australia",
      },
    },
    {
      "@type": "HowTo",
      "@id": `https://openpharmacy.com/blog/${SLUG}#howto`,
      name: "How to add scripts to OpenPharmacy and track remaining repeats",
      description:
        "Step-by-step guide to saving Australian eScript tokens in the OpenPharmacy app so repeat counts are always visible, even offline.",
      step: post.howToAdd.steps.map((s) => ({
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

function HowToTrackEscriptRepeatsAustralia() {
  return (
    <BlogLayout meta={meta} schema={schema}>

      {/* Opening answer capsule */}
      <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
        {post.intro}
      </p>

      {/* Last verified note */}
      <p className="text-white/45 text-xs mt-4">
        Information verified March 2026. Prescribing rules and app features are subject to change.
        Check with your prescriber or pharmacist for advice specific to your medications.
      </p>

      {/* Section 1: How the repeat system works */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.howRepeatSystem.heading}
      </h2>
      {post.howRepeatSystem.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Repeat rules callout */}
      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
        <h3 className="text-base font-semibold text-white mb-2">
          {post.howRepeatSystem.repeatRules.heading}
        </h3>
        <p className="text-white/75 text-sm leading-relaxed">
          {post.howRepeatSystem.repeatRules.body}
        </p>
      </div>

      {/* Section 2: Why the system fails */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.whySystemFails.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mt-4 mb-6">{post.whySystemFails.intro}</p>

      <ul className="space-y-5">
        {post.whySystemFails.points.map((point, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="flex-shrink-0 mt-1 text-[var(--color-accent)] font-bold text-sm"
              aria-hidden="true"
            >
              &#10005;
            </span>
            <div>
              <p className="font-semibold text-white mb-1">{point.label}</p>
              <p className="text-white/75 text-sm leading-relaxed">{point.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Section 3: Option 1 — Active Script List */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.optionASL.heading}
      </h2>
      {post.optionASL.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
        <h3 className="text-base font-semibold text-white mb-3">
          {post.optionASL.limitations.heading}
        </h3>
        <ul className="space-y-2">
          {post.optionASL.limitations.points.map((point, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="flex-shrink-0 mt-1 text-white/40 font-bold text-sm"
                aria-hidden="true"
              >
                &ndash;
              </span>
              <p className="text-white/70 text-sm leading-relaxed">{point}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Section 4: Option 2 — OpenPharmacy */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.optionWallet.heading}
      </h2>
      {post.optionWallet.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      <ul className="space-y-5 mt-6">
        {post.optionWallet.features.map((feature, i) => (
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
        For a full comparison of the ASL, pharmacy apps, and independent eScript wallets, see{" "}
        <Link
          to="/blog/pharmacy-app-vs-independent-escript-wallet-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          pharmacy app vs independent eScript wallet
        </Link>
        .
      </p>

      {/* Section 5: How to add scripts to OpenPharmacy (HowTo) */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.howToAdd.heading}
      </h2>
      <p className="text-white/80 leading-relaxed mb-6">{post.howToAdd.intro}</p>

      <ol className="space-y-5">
        {post.howToAdd.steps.map((step) => (
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

      <p className="text-white/80 leading-relaxed mt-6">{post.howToAdd.closing}</p>

      <p className="text-white/75 text-sm leading-relaxed mt-5">
        New to eScript wallets? See{" "}
        <Link
          to="/blog/what-is-an-escript-wallet-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          what is an eScript wallet
        </Link>{" "}
        for a plain-English overview of how they work and what to look for.
      </p>

      {/* Section 6: Practical tips */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.practicalTips.heading}
      </h2>

      <ul className="space-y-5 mt-4">
        {post.practicalTips.tips.map((tip, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="flex-shrink-0 mt-1 text-[var(--color-accent)] font-bold text-sm"
              aria-hidden="true"
            >
              &#10003;
            </span>
            <div>
              <p className="font-semibold text-white mb-1">{tip.label}</p>
              <p className="text-white/75 text-sm leading-relaxed">{tip.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Section 7: What to do if you run out of repeats */}
      <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
        {post.outOfRepeats.heading}
      </h2>
      {post.outOfRepeats.body.map((paragraph, i) => (
        <p key={i} className="text-white/80 leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}

      {/* Internal links */}
      <p className="text-white/75 text-sm leading-relaxed mt-8">
        If you have lost the token for an existing repeat, see:{" "}
        <Link
          to="/blog/deleted-escript-sms-what-to-do-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          What Happens If You Delete Your eScript SMS? Here's What to Do
        </Link>
        .
      </p>
      <p className="text-white/75 text-sm leading-relaxed mt-3">
        Want to understand how OpenPharmacy's security is verified? See:{" "}
        <Link
          to="/blog/what-is-adha-conformance-australia"
          className="text-[var(--color-accent)] underline hover:opacity-80 transition-opacity"
        >
          What Is ADHA Conformance? Why It Matters Before You Trust an App With Your Prescriptions
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
          See your repeat counts at a glance. Download OpenPharmacy free.
        </h2>
        <p className="text-white/70 text-sm md:text-base mb-6 max-w-lg mx-auto">
          Add your eScript tokens once. Every script shows remaining repeats, QR codes work offline,
          and your prescriptions stay organised in one secure place. ADHA conformant. All data on
          Australian servers.
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

export default HowToTrackEscriptRepeatsAustralia;
