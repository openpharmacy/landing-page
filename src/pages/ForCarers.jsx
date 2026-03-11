import React, { useMemo, useState } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { usePageMeta } from "../hooks/usePageMeta";
import CallToAction from "../components/CallToAction";

// ─── FAQ data ────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Can one OpenPharmacy account manage scripts for my whole family?",
    a: "Yes. OpenPharmacy lets you add and organise eScripts for multiple family members — children, parents, a partner — all within a single app on your phone. Each person's scripts are stored and viewable independently, so you always know whose prescription you're presenting at the counter.",
  },
  {
    q: "Do I need a separate phone or account for each family member?",
    a: "No. One OpenPharmacy account on one device is all you need. You can add scripts for everyone you care for, label them clearly, and switch between them in seconds. No second phone, no second login.",
  },
  {
    q: "Will the QR code work if the pharmacy has no internet?",
    a: "Yes. OpenPharmacy works completely offline. Your prescription QR codes are stored directly on your device and are always accessible — even in areas with no signal, in airplane mode, or in rural locations with poor reception.",
  },
  {
    q: "Is OpenPharmacy safe for my children's prescription details?",
    a: "OpenPharmacy uses end-to-end ASD-approved encryption, and all data is stored exclusively on Australian servers — it is never shared with third parties or stored overseas. The app is registered with the Australian Digital Health Agency (ADHA) and fully conformant with their ePrescribing standards.",
  },
  {
    q: "What if my elderly parent can't use the app themselves?",
    a: "That's exactly the use case OpenPharmacy is built for. You manage the app; your parent simply needs to be at the pharmacy. You can show the QR code on your own phone — no setup required on their end.",
  },
  {
    q: "What is the Active Script List (ASL) and do I need it?",
    a: "The Active Script List (also called My Script List or MySL) is a government-backed service that stores all your active eScripts and repeats in one secure location. OpenPharmacy can connect to your ASL using an activation code from your pharmacist, so new scripts and repeats sync automatically. You can also add scripts manually by entering the token — ASL is optional, not required.",
  },
  {
    q: "Is OpenPharmacy free?",
    a: "Yes. OpenPharmacy is completely free to download and use. There are no subscription fees, no in-app purchases, and no ads.",
  },
  {
    q: "Does OpenPharmacy work on both iPhone and Android?",
    a: "Yes. OpenPharmacy is available on iOS (App Store) and Android (Google Play).",
  },
];

// ─── Comparison table data ────────────────────────────────────────────────────
const comparisonRows = [
  {
    feature: "Manage multiple family members' scripts",
    openpharmacy: true,
    note: null,
  },
  {
    feature: "Works completely offline (no internet needed)",
    openpharmacy: true,
    note: "Key advantage for rural areas and patchy pharmacy Wi-Fi",
  },
  {
    feature: "ADHA-registered & ePrescribing conformant",
    openpharmacy: true,
    note: null,
  },
  {
    feature: "Data stored on Australian servers only",
    openpharmacy: true,
    note: "Never shared with third parties or stored overseas",
  },
  {
    feature: "End-to-end ASD-approved encryption",
    openpharmacy: true,
    note: null,
  },
  {
    feature: "PIN-protected app access",
    openpharmacy: true,
    note: null,
  },
  {
    feature: "Independent — not owned by a pharmacy chain",
    openpharmacy: true,
    note: "Your data is never used for marketing",
  },
  {
    feature: "Free with no subscription or ads",
    openpharmacy: true,
    note: null,
  },
  {
    feature: "ASL / MySL auto-sync support",
    openpharmacy: true,
    note: null,
  },
];

// ─── Scenarios ────────────────────────────────────────────────────────────────
const scenarios = [
  {
    icon: "👶",
    title: "Parents managing a child's prescriptions",
    body: "Children can't manage their own scripts. As a parent you receive the eScript token, add it to OpenPharmacy, and present the QR code at the pharmacy — your child never needs to touch your phone. OpenPharmacy keeps children's scripts clearly organised alongside your own, with dosage details and remaining repeats visible at a glance.",
  },
  {
    icon: "👴",
    title: "Adult children caring for an elderly parent",
    body: "Ageing parents often have multiple ongoing prescriptions but limited confidence with digital tools. OpenPharmacy puts you in control: you store your parent's eScripts on your own phone, present the QR codes when you collect their medications, and never need to rely on their device or account. Everything is offline-accessible — no fumbling for signal at the pharmacy counter.",
  },
  {
    icon: "👫",
    title: "Partners managing household scripts together",
    body: "When one person takes on the admin for the household, having all scripts in one place saves real time. OpenPharmacy lets you store your partner's scripts alongside your own so you can collect from the pharmacy on their behalf without needing their phone.",
  },
  {
    icon: "🏡",
    title: "Carers supporting someone with a chronic condition",
    body: "People with chronic conditions often have several active prescriptions and frequent repeats. OpenPharmacy keeps all of them organised — active scripts, archived scripts, dosage instructions, and repeat counts — so carers can track what's been dispensed and what's due, without digging through SMS threads.",
  },
];

// ─── JSON-LD schema builder ──────────────────────────────────────────────────
function buildPageSchema(faqItems) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
  return faqSchema;
}

// ─── Component ───────────────────────────────────────────────────────────────
function ForCarers() {
  const schema = useMemo(() => buildPageSchema(faqs), []);

  usePageMeta({
    title:
      "Managing Your Family's eScripts: A Guide for Australian Carers — OpenPharmacy",
    description:
      "OpenPharmacy lets Australian carers manage eScripts for children, elderly parents, and partners in one secure, offline-ready app. ADHA-registered. Free on iOS & Android.",
    canonicalPath: "/for-carers",
    schema,
  });

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <Layout>
      <main className="flex flex-col gap-16 md:gap-20 pb-8">

        {/* ── Hero / Answer Capsule ─────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto w-full text-center md:text-left">
          <Motion.div
            className="flex flex-wrap justify-center md:justify-start gap-2 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {["family", "carers", "parents", "feature"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] font-medium"
              >
                {tag}
              </span>
            ))}
          </Motion.div>

          <Motion.h1
            className="font-grifter text-3xl md:text-5xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Managing Your Family's eScripts: A Guide for Australian Carers
          </Motion.h1>

          <Motion.div
            className="bg-[var(--color-secondary)] rounded-2xl p-6 mb-6 text-left"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            <p className="text-white/90 text-base md:text-lg leading-relaxed">
              <strong className="text-white">
                OpenPharmacy is the eScript wallet built for Australian carers managing prescriptions for more than one person.
              </strong>{" "}
              Whether you're a parent collecting scripts for young children, an adult child picking up medications for an elderly parent, or a partner handling the household's prescriptions, OpenPharmacy stores every family member's eScripts in one secure, offline-ready app — registered with the Australian Digital Health Agency (ADHA) and free on iOS and Android.
            </p>
          </Motion.div>

          <Motion.p
            className="text-white/70 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Last updated: March 2026
          </Motion.p>
        </section>

        {/* ── The Carer Problem ─────────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Why Managing Family eScripts Is Harder Than It Sounds
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
            Australian electronic prescriptions are sent as individual tokens — usually via SMS or email — directly to the patient. That works fine when one adult manages their own two or three scripts. It breaks down fast when a carer is responsible for multiple people across multiple conditions.
          </p>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
            Consider a common scenario: a parent with two children under ten and an elderly mother living with them. That's potentially six or eight active prescriptions across four people, arriving as separate tokens in separate message threads. Getting the right QR code to the right pharmacist — reliably, every time — is a genuine logistical problem.
          </p>
          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            The friction is real: tokens get buried in SMS threads, archived scripts are hard to distinguish from active ones, and browser-based QR codes require signal — something you can't guarantee at every pharmacy counter. OpenPharmacy was designed specifically to remove this friction.
          </p>
        </Motion.section>

        {/* ── How OpenPharmacy Helps Carers ─────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            How OpenPharmacy Helps Carers Manage Multiple Prescriptions
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
            OpenPharmacy is a free eScript wallet app for iOS and Android, built and operated by Easy As Health Pty Ltd in Brisbane, Australia. It is registered with the Australian Digital Health Agency and fully conformant with ADHA's ePrescribing standards. For carers, the most important capabilities are:
          </p>

          <ul className="space-y-4">
            {[
              {
                title: "All family members in one app",
                desc: "Add eScripts for your children, parents, partner, or anyone else you care for — all within a single OpenPharmacy account on your phone. No separate accounts or devices required.",
              },
              {
                title: "Offline QR codes, always available",
                desc: "OpenPharmacy works completely offline. Scripts are stored on your device, not in a browser tab. The QR code is ready the moment you open the app — no signal needed, no loading screen, no failure at the counter.",
              },
              {
                title: "Active and archived scripts, clearly organised",
                desc: "Used scripts are automatically archived so you always know which prescriptions are still active. Dosage information and remaining repeats are visible at a glance, so you're never guessing what's left.",
              },
              {
                title: "Secure sharing with pharmacies and other carers",
                desc: "Need to share a script with another carer, a spouse, or a support worker? OpenPharmacy lets you share scripts securely without forwarding raw tokens through unencrypted SMS threads.",
              },
              {
                title: "PIN protection on every access",
                desc: "Your family's prescription data is protected by a 4-digit PIN each time the app opens — a straightforward layer of security that matters when your phone contains health information for multiple people.",
              },
              {
                title: "ASL auto-sync for set-and-forget management",
                desc: "Connect OpenPharmacy to your Active Script List (ASL) via your pharmacist, and new scripts and repeats appear automatically — no manual token entry after every GP visit.",
              },
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-4 bg-[var(--color-secondary)] rounded-xl p-5"
              >
                <span
                  className="mt-1.5 flex-shrink-0 w-2.5 h-2.5 rounded-full bg-[var(--color-accent)]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-white font-semibold text-base md:text-lg mb-1">
                    {item.title}
                  </p>
                  <p className="text-white/75 text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Motion.section>

        {/* ── Scenario Cards ────────────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Who Uses OpenPharmacy as a Carer?
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
            OpenPharmacy fits naturally into several common caregiving situations across Australia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {scenarios.map((scenario, idx) => (
              <Motion.div
                key={idx}
                className="bg-[var(--color-secondary)] rounded-2xl p-6 flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-hidden="true">
                    {scenario.icon}
                  </span>
                  <h3 className="text-white font-semibold text-base md:text-lg leading-snug">
                    {scenario.title}
                  </h3>
                </div>
                <p className="text-white/75 text-base leading-relaxed">
                  {scenario.body}
                </p>
              </Motion.div>
            ))}
          </div>
        </Motion.section>

        {/* ── Security & Privacy ───────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Is OpenPharmacy Safe for My Family's Health Data?
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
            When you're managing prescriptions for children or elderly parents, the security of the app you use matters more than it would for just your own scripts. OpenPharmacy was built with this in mind:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              "End-to-end ASD-approved encryption protects data in transit and at rest",
              "All data is stored on Australian servers — never overseas, never shared with third parties",
              "OpenPharmacy is registered with the Australian Digital Health Agency (ADHA) and fully conformant with ePrescribing standards — independently verifiable on the official ADHA conformance register",
              "The app is independent — not owned by a pharmacy chain, health insurer, or marketing company — so your family's health data is not used for commercial profiling",
              "A 4-digit PIN is required every time the app opens, protecting access even if your phone is lost or unlocked",
            ].map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-white/80 text-base md:text-lg leading-relaxed"
              >
                <span
                  className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-accent)]"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>
          <p className="text-white/70 text-base leading-relaxed">
            Unlike apps tied to pharmacy chains — such as Chemist2U's MyScripts or Healthylife's Script Wallet — OpenPharmacy has no commercial incentive to use your data for targeted medication marketing or cross-selling. Your family's prescription data stays private.
          </p>
        </Motion.section>

        {/* ── Feature Comparison Table ──────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            What to Look for in a Family eScript Wallet
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
            Not every eScript app is designed with carers in mind. Here's what matters if you're managing prescriptions for more than one person, and how OpenPharmacy measures up.
          </p>
          <div className="overflow-x-auto rounded-2xl">
            <table className="w-full text-left text-base">
              <thead>
                <tr className="bg-[var(--color-accent)]/20 text-white">
                  <th className="px-5 py-3 font-semibold rounded-tl-2xl">
                    Feature
                  </th>
                  <th className="px-5 py-3 font-semibold text-center rounded-tr-2xl">
                    OpenPharmacy
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-t border-white/10 ${
                      idx % 2 === 0
                        ? "bg-[var(--color-secondary)]"
                        : "bg-[var(--color-secondary)]/60"
                    }`}
                  >
                    <td className="px-5 py-4 text-white/80 leading-snug">
                      {row.feature}
                      {row.note && (
                        <span className="block text-xs text-white/45 mt-0.5">
                          {row.note}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-center text-[var(--color-accent)] text-xl font-bold">
                      ✓
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Motion.section>

        {/* ── Getting Started ───────────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            How to Set Up OpenPharmacy for Your Family
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
            Getting your family's scripts into OpenPharmacy takes under five minutes. Here's how:
          </p>
          <ol className="space-y-5">
            {[
              {
                step: "1",
                title: "Download the app",
                desc: "OpenPharmacy is free on the App Store (iOS) and Google Play (Android). No paid tier, no subscription.",
              },
              {
                step: "2",
                title: "Sign in",
                desc: "Use your existing Google or Apple account — no separate registration required.",
              },
              {
                step: "3",
                title: "Add your first script",
                desc: "Tap the eScript token link your doctor sent via SMS or email, enter a token manually, or connect your Active Script List (MySL) activation code from your pharmacist to sync all active scripts automatically.",
              },
              {
                step: "4",
                title: "Add family members' scripts",
                desc: "Add eScripts for your children, parents, or partner in exactly the same way — they all live in your single OpenPharmacy account.",
              },
              {
                step: "5",
                title: "Show the QR code at the pharmacy",
                desc: "Open the relevant script and show the QR code on your screen. It works offline, so no signal required at the counter.",
              },
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-5"
              >
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center font-bold text-white text-sm">
                  {item.step}
                </span>
                <div>
                  <p className="text-white font-semibold text-base md:text-lg mb-1">
                    {item.title}
                  </p>
                  <p className="text-white/75 text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Motion.section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border-b border-white/10"
              >
                <button
                  className="w-full text-left px-3 py-4 flex justify-between items-center gap-4 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span className="text-white/90 text-base md:text-lg font-medium leading-snug">
                    {faq.q}
                  </span>
                  <span
                    className={`text-[var(--color-accent)] text-xl flex-shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-90" : ""
                    }`}
                  >
                    ›
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <Motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-white/75 text-base md:text-lg leading-relaxed px-3 pb-5">
                        {faq.a}
                      </p>
                    </Motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Motion.section>

        {/* ── Related links ─────────────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-5">Learn More</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/how-it-works"
              className="flex-1 bg-[var(--color-secondary)] rounded-xl p-5 hover:bg-[var(--color-accent)]/20 transition-colors"
            >
              <p className="text-[var(--color-accent)] font-semibold mb-1">
                How It Works →
              </p>
              <p className="text-white/65 text-sm leading-relaxed">
                Step-by-step guide to adding and managing eScripts in OpenPharmacy.
              </p>
            </Link>
            <Link
              to="/blog/what-is-an-escript-australia"
              className="flex-1 bg-[var(--color-secondary)] rounded-xl p-5 hover:bg-[var(--color-accent)]/20 transition-colors"
            >
              <p className="text-[var(--color-accent)] font-semibold mb-1">
                What Is an eScript? →
              </p>
              <p className="text-white/65 text-sm leading-relaxed">
                A plain-English explanation of how Australian electronic prescriptions work.
              </p>
            </Link>
            <Link
              to="/faq"
              className="flex-1 bg-[var(--color-secondary)] rounded-xl p-5 hover:bg-[var(--color-accent)]/20 transition-colors"
            >
              <p className="text-[var(--color-accent)] font-semibold mb-1">
                FAQ →
              </p>
              <p className="text-white/65 text-sm leading-relaxed">
                More common questions about security, privacy, and how OpenPharmacy works.
              </p>
            </Link>
          </div>
        </Motion.section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <CallToAction />
      </main>
    </Layout>
  );
}

export default ForCarers;
