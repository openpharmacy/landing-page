import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import AppStore from "../assets/AppStore.png";
import GooglePlay from "../assets/GooglePlay.png";
import PhoneImage from "../assets/iPhone 14.png";
import Layout from "../components/Layout";
import { usePageMeta } from "../hooks/usePageMeta";

import { content } from "../data/MainContent";
import { motion as Motion } from "framer-motion";

const PAGE_URL = "https://www.openpharmacy.com/";
const TITLE = "OpenPharmacy: Secure Australian eScript Wallet | iOS & Android";
const DESCRIPTION =
  "OpenPharmacy is a free, ADHA-registered app for managing Australian electronic prescriptions. Store, view, and share eScripts offline with end-to-end encryption. Available on iOS and Android.";
const DATE_MODIFIED = "2026-10-07";

const APP_STORE_URL = "https://apps.apple.com/au/app/openpharmacy/id6751562406";
const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.openpharmacy.production&hl=en_AU";
const ADHA_REGISTER_URL =
  "https://www.digitalhealth.gov.au/initiatives-and-programs/electronic-prescriptions";

// ─── Schema ──────────────────────────────────────────────────────────────────
// Only states what the visible page states: the FAQ answers below are the
// same strings rendered in the FAQ section.

function buildSchema(faqItems) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "en-AU",
        dateModified: DATE_MODIFIED,
        isPartOf: {
          "@type": "WebSite",
          url: PAGE_URL,
          name: "OpenPharmacy",
        },
        about: {
          "@type": "MobileApplication",
          name: "OpenPharmacy",
          url: PAGE_URL,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function FactCard({ value, label }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <p className="font-grifter text-2xl md:text-3xl font-bold text-[var(--color-accent)] mb-1">
        {value}
      </p>
      <p className="text-white/75 text-sm leading-relaxed">{label}</p>
    </div>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/75 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function StoreBadges() {
  return (
    <div className="flex justify-center md:justify-start gap-4">
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-90 transition-opacity"
      >
        <img src={AppStore} alt="Download on the App Store" className="h-12 md:h-14" />
      </a>

      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-90 transition-opacity"
      >
        <img src={GooglePlay} alt="Get it on Google Play" className="h-12 md:h-14" />
      </a>
    </div>
  );
}

// ─── Page component ──────────────────────────────────────────────────────────

function Main() {
  const schema = useMemo(() => buildSchema(content.faq.items), []);

  usePageMeta({
    title: TITLE,
    description: DESCRIPTION,
    canonicalPath: "/",
    schema,
  });

  return (
    <div className="relative min-h-screen bg-[var(--color-primary)] text-white">
      <Motion.img
        src={PhoneImage}
        alt="OpenPharmacy App Interface"
        className="hidden md:block absolute top-36 right-0 h-[710px] z-10"
        style={{ pointerEvents: "none" }}
        initial={{ opacity: 0, y: 80, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.2, 0.1, 0.2, 1] }}
      />
      <Layout noRightPadding>
        {/* Hero. The min-height keeps the sections below clear of the
            absolutely positioned phone image on desktop. */}
        <div className="relative w-full md:min-h-[700px]">
          <div className="hidden md:flex md:items-center md:gap-3 mb-6 md:mb-10">
            <span className="bg-[var(--color-accent)] font-extralight px-2 md:px-3.5 py-1 rounded-3xl text-xs md:text-sm">
              v1.01
            </span>
            <span className="font-sans font-extralight text-sm md:text-base">
              Announcing our new product
            </span>
            <span className="text-xs md:text-sm font-extralight">⟩</span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-2">
            <div className="w-full md:flex-1/2 text-center md:text-left">
              <Motion.h1
                className="font-grifter text-4xl md:text-7xl leading-tight font-semibold mb-8 md:mb-14"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0.1, 0.2, 1] }}
              >
                {content.heading.line1}
                <br />
                {content.heading.line2}
              </Motion.h1>
              <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-8 max-w-[600px] mx-auto md:mx-0">
                {content.description.text}
              </p>
              <StoreBadges />
            </div>
          </div>
        </div>

        {/* Key facts band */}
        <section aria-labelledby="facts-heading" className="w-full md:pr-8">
          <p className="text-xs font-semibold text-[var(--color-accent)] mb-2">
            {content.facts.eyebrow}
          </p>
          <h2 id="facts-heading" className="font-grifter text-2xl md:text-3xl font-bold text-white mb-6">
            {content.facts.heading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.facts.items.map((item) => (
              <FactCard key={item.value} value={item.value} label={item.label} />
            ))}
          </div>
        </section>

        {/* Answer capsule */}
        <section aria-label="What is OpenPharmacy" className="w-full md:pr-8">
          <h2 className="font-grifter text-2xl md:text-3xl font-bold text-white mb-4">
            What is OpenPharmacy?
          </h2>
          <p className="max-w-3xl text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
            {content.capsule.text}
          </p>
        </section>

        {/* Feature cards */}
        <section aria-labelledby="features-heading" className="w-full md:pr-8">
          <p className="text-xs font-semibold text-[var(--color-accent)] mb-2">
            {content.features.eyebrow}
          </p>
          <h2 id="features-heading" className="font-grifter text-2xl md:text-3xl font-bold text-white mb-6">
            {content.features.heading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.features.items.map((item) => (
              <FeatureCard key={item.title} title={item.title} text={item.text} />
            ))}
          </div>
          <p className="text-white/60 text-sm leading-relaxed mt-4">
            Verify the listing yourself on the{" "}
            <a
              href={ADHA_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:opacity-80 transition-opacity"
            >
              Australian Digital Health Agency electronic prescriptions page
            </a>
            .
          </p>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="w-full md:pr-8">
          <h2 id="faq-heading" className="font-grifter text-2xl md:text-3xl font-bold text-white mb-6">
            {content.faq.heading}
          </h2>
          <div className="max-w-3xl space-y-6">
            {content.faq.items.map((item) => (
              <div key={item.question}>
                <h3 className="text-base font-semibold text-white mb-2">{item.question}</h3>
                <p className="text-white/80 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section aria-labelledby="links-heading" className="w-full md:pr-8">
          <div className="max-w-3xl rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-2">
            <p id="links-heading" className="text-sm font-semibold text-white/70 mb-3">
              {content.links.heading}
            </p>
            <ul className="space-y-2">
              {content.links.items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing CTA */}
        <section aria-label="Download OpenPharmacy" className="w-full md:pr-8 mb-8">
          <div className="rounded-2xl bg-[var(--color-secondary)] border border-white/10 p-6 md:p-8 text-center md:text-left">
            <h2 className="font-grifter text-xl md:text-2xl font-bold text-white mb-2">
              Download OpenPharmacy. Free on iPhone and Android.
            </h2>
            <p className="text-white/70 text-sm md:text-base mb-6 max-w-lg mx-auto md:mx-0">
              Add your first eScript in under two minutes. No pharmacy activation, no account with
              a chain, no fees.
            </p>
            <StoreBadges />
          </div>
        </section>
      </Layout>
    </div>
  );
}

export default Main;
