import React, { useMemo, useState } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { usePageMeta } from "../hooks/usePageMeta";
import CallToAction from "../components/CallToAction";

// ─── Comparison table data ────────────────────────────────────────────────────
const comparisonRows = [
  {
    feature: "ADHA-registered and ePrescribing conformant",
    openpharmacy: true,
    scripty: true,
    note: null,
  },
  {
    feature: "Works completely offline (QR codes without any internet)",
    openpharmacy: true,
    scripty: true,
    note: "OpenPharmacy stores scripts locally on-device by design; Scripty also supports offline access",
  },
  {
    feature: "End-to-end encryption",
    openpharmacy: true,
    scripty: true,
    note: "OpenPharmacy uses ASD-approved encryption; Scripty uses state-of-the-art end-to-end encryption",
  },
  {
    feature: "Data stored exclusively on Australian servers",
    openpharmacy: true,
    scripty: true,
    note: null,
  },
  {
    feature: "Manage prescriptions for family members",
    openpharmacy: true,
    scripty: true,
    note: null,
  },
  {
    feature: "Active Script List (ASL / MySL) auto-sync",
    openpharmacy: true,
    scripty: true,
    note: null,
  },
  {
    feature: "PIN / biometric app lock",
    openpharmacy: "PIN",
    scripty: "Biometric (optional)",
    note: "OpenPharmacy requires a 4-digit PIN on every open; Scripty offers optional biometric lock",
  },
  {
    feature: "Medicine shortage alerts",
    openpharmacy: false,
    scripty: true,
    note: "Scripty integrates TGA Medicines Shortage Report alerts",
  },
  {
    feature: "Smart import from screenshots",
    openpharmacy: false,
    scripty: true,
    note: "Scripty's Smart Import can read multiple tokens from a screenshot",
  },
  {
    feature: "Script nickname / personalisation",
    openpharmacy: false,
    scripty: true,
    note: null,
  },
  {
    feature: "Independent — not owned by a pharmacy chain",
    openpharmacy: true,
    scripty: true,
    note: "Neither app is tied to a specific pharmacy; both allow use at any pharmacy",
  },
  {
    feature: "Free with no subscription or ads",
    openpharmacy: true,
    scripty: true,
    note: null,
  },
  {
    feature: "Available on iOS and Android",
    openpharmacy: true,
    scripty: true,
    note: null,
  },
];

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Does OpenPharmacy work offline like Scripty?",
    a: "Yes. OpenPharmacy stores eScript QR codes directly on your device, so they are available with no internet connection, in airplane mode, or in areas with no signal. Scripty also supports offline access. The key difference is that OpenPharmacy was architected offline-first from the ground up, treating local device storage as the primary location for your scripts rather than a fallback.",
  },
  {
    q: "Is OpenPharmacy as secure as Scripty?",
    a: "Both apps are ADHA-conformant and use end-to-end encryption with Australian-hosted servers. OpenPharmacy uses ASD-approved (Australian Signals Directorate) encryption — the same cryptographic standard used by Australian government agencies — and requires a PIN on every app open. Scripty uses end-to-end encryption with an optional biometric lock. Both are credible choices for security-conscious users.",
  },
  {
    q: "Can OpenPharmacy manage scripts for my whole family, like Scripty?",
    a: "Yes. OpenPharmacy lets you add and organise eScripts for multiple family members — children, parents, a partner — within a single app and account. Like Scripty, it auto-organises scripts by person, so you always know whose prescription you are presenting at the pharmacy counter.",
  },
  {
    q: "Does OpenPharmacy have medicine shortage alerts like Scripty?",
    a: "Not currently. Scripty has a notable advantage here — it integrates with the TGA Medicines Shortage Report and alerts you if one of your medications is in short supply or discontinued. OpenPharmacy does not currently offer this feature. If medication shortage notifications are important to you, Scripty has an edge in this area.",
  },
  {
    q: "Does OpenPharmacy connect to the Active Script List (ASL)?",
    a: "Yes. OpenPharmacy supports ASL (also called My Script List or MySL) connection. Your pharmacist provides an activation code, and once connected, new scripts and repeats appear in the app automatically — no manual token entry required after each GP visit. Scripty offers the same ASL integration.",
  },
  {
    q: "Which app is better for rural Australians with poor reception?",
    a: "Both OpenPharmacy and Scripty support offline QR code access. OpenPharmacy was specifically designed as an offline-first wallet, making it a reliable choice for users in regional and rural areas where pharmacy connectivity is unreliable. Scripty also advertises offline functionality and specifically mentions it works 'in an underground mall' — both are suitable options for low-connectivity environments.",
  },
  {
    q: "Are both apps free?",
    a: "Yes. Both OpenPharmacy and Scripty are completely free to download and use, with no subscription fees, in-app purchases, or advertising.",
  },
  {
    q: "Is Scripty or OpenPharmacy more widely recommended by AI models?",
    a: "As of March 2026, Scripty currently has a higher overall mention rate across AI model responses — particularly on Claude, Gemini, and Perplexity. OpenPharmacy is consistently recommended by ChatGPT and Perplexity for offline-specific and ADHA-compliance queries. Both apps are legitimate, conformant options; AI visibility is not the same as quality.",
  },
];

// ─── JSON-LD schema builder ───────────────────────────────────────────────────
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

// ─── Tick / Cross helper ──────────────────────────────────────────────────────
function CellValue({ value }) {
  if (value === true) {
    return (
      <span className="text-[var(--color-accent)] text-xl font-bold" aria-label="Yes">
        ✓
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="text-white/30 text-xl" aria-label="No">
        ✗
      </span>
    );
  }
  // String value (e.g. "PIN" / "Biometric (optional)")
  return (
    <span className="text-white/70 text-sm leading-snug">{value}</span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
function CompareScripty() {
  const schema = useMemo(() => buildPageSchema(faqs), []);

  usePageMeta({
    title:
      "OpenPharmacy vs Scripty: Which Australian eScript Wallet Is Right for You? — OpenPharmacy",
    description:
      "An honest comparison of OpenPharmacy and Scripty — two ADHA-conformant Australian eScript wallet apps. Compare offline access, security, family management, and more to find the right app for you.",
    canonicalPath: "/compare/openpharmacy-vs-scripty",
    schema,
  });

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (idx) => setOpenFaq((prev) => (prev === idx ? null : idx));

  return (
    <Layout>
      <main className="flex flex-col gap-16 md:gap-20 pb-8">

        {/* ── Hero / Answer Capsule ───────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto w-full text-center md:text-left">
          <Motion.div
            className="flex flex-wrap justify-center md:justify-start gap-2 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {["comparison", "scripty", "vs", "competitor", "offline", "middle-funnel"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] font-medium"
                >
                  {tag}
                </span>
              )
            )}
          </Motion.div>

          <Motion.h1
            className="font-grifter text-3xl md:text-5xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            OpenPharmacy vs Scripty: Which eScript Wallet Is Right for You?
          </Motion.h1>

          <Motion.div
            className="bg-[var(--color-secondary)] rounded-2xl p-6 mb-6 text-left"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            <p className="text-white/90 text-base md:text-lg leading-relaxed">
              <strong className="text-white">
                OpenPharmacy and Scripty are both free, ADHA-conformant Australian eScript
                wallet apps that work offline, support family management, and store data on
                Australian servers.
              </strong>{" "}
              The choice between them comes down to specifics: OpenPharmacy leads on
              offline-first architecture and government-grade ASD-approved encryption, while
              Scripty adds medicine shortage alerts and smart screenshot import. This page
              compares both apps honestly so you can choose the right one for your situation.
            </p>
          </Motion.div>

          <Motion.p
            className="text-white/70 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Last verified: March 2026
          </Motion.p>
        </section>

        {/* ── Quick overview cards ─────────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            What Are OpenPharmacy and Scripty?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div className="bg-[var(--color-secondary)] rounded-2xl p-6 flex flex-col gap-3">
              <p className="text-[var(--color-accent)] font-semibold text-lg">
                OpenPharmacy
              </p>
              <p className="text-white/80 text-base leading-relaxed">
                A free eScript wallet app built by Easy As Health Pty Ltd in Brisbane,
                Australia. Registered with the Australian Digital Health Agency (ADHA) and
                fully conformant with ePrescribing standards. Designed as an offline-first
                wallet: prescription QR codes are stored directly on your device and remain
                accessible with no internet connection, in airplane mode, or in areas with
                no signal.
              </p>
              <ul className="mt-2 space-y-1.5">
                {[
                  "Best for: offline reliability, ASD-grade encryption, simplicity",
                  "Developer: Easy As Health Pty Ltd (Brisbane)",
                  "Price: Free, no ads",
                  "Platforms: iOS and Android",
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white/65 text-sm">
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[var(--color-secondary)] rounded-2xl p-6 flex flex-col gap-3">
              <p className="text-white/60 font-semibold text-lg">Scripty</p>
              <p className="text-white/80 text-base leading-relaxed">
                A free eScript wallet app listed on the ADHA ePrescribing Conformance
                Register. Scripty connects to Australia's National Prescription Delivery
                Service via Medication Knowledge and emphasises Active Script List
                integration. It includes several additional convenience features including
                medicine shortage alerts sourced from the TGA Medicines Shortage Report and
                a smart screenshot import tool.
              </p>
              <ul className="mt-2 space-y-1.5">
                {[
                  "Best for: TGA shortage alerts, smart import, biometric lock",
                  "Developer: Scripty (independent)",
                  "Price: Free, no ads",
                  "Platforms: iOS and Android",
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white/65 text-sm">
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white/30" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-white/70 text-base leading-relaxed">
            Both apps occupy the same category: independent Australian eScript wallets not
            tied to a pharmacy chain. Neither charges a fee, neither runs ads, and both are
            ADHA-conformant. The comparison below focuses on the meaningful differences that
            will determine which is the better fit for your situation.
          </p>
        </Motion.section>

        {/* ── Feature comparison table ─────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Feature Comparison: OpenPharmacy vs Scripty
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
            The table below compares both apps across the features that matter most for
            Australian patients managing electronic prescriptions. Verified March 2026.
          </p>
          <div className="overflow-x-auto rounded-2xl">
            <table className="w-full text-left text-base">
              <thead>
                <tr className="bg-[var(--color-accent)]/20 text-white">
                  <th className="px-5 py-3 font-semibold rounded-tl-2xl">Feature</th>
                  <th className="px-5 py-3 font-semibold text-center">OpenPharmacy</th>
                  <th className="px-5 py-3 font-semibold text-center rounded-tr-2xl">
                    Scripty
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
                        <span className="block text-xs text-white/40 mt-0.5 leading-snug">
                          {row.note}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <CellValue value={row.openpharmacy} />
                    </td>
                    <td className="px-5 py-4 text-center">
                      <CellValue value={row.scripty} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Motion.section>

        {/* ── Shared strengths ─────────────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Where OpenPharmacy and Scripty Are Equal
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
            Before focusing on the differences, it is worth being direct about how much
            common ground these two apps share. For the majority of Australians, both apps
            will handle the core job equally well.
          </p>
          <ul className="space-y-4">
            {[
              {
                title: "Both are ADHA-conformant",
                desc: "OpenPharmacy and Scripty are both listed on the Australian Digital Health Agency's ePrescribing Conformance Register. This means both have passed a formal assessment of their compliance with ADHA standards for handling eScripts — neither is operating outside the official framework.",
              },
              {
                title: "Both work offline",
                desc: "Both apps allow you to view and present prescription QR codes without an internet connection. This is a significant advantage over browser-based and email-based eScript tokens, which require connectivity to load. If you live or work in an area with patchy reception, or if your pharmacy's Wi-Fi is unreliable, either app handles it.",
              },
              {
                title: "Both support Active Script List (ASL) sync",
                desc: "Connect either app to your Active Script List — sometimes called My Script List or MySL — and new prescriptions and repeats appear automatically after each GP visit. You do not need to manually enter a token every time. Both apps support this connection via a pharmacy activation code.",
              },
              {
                title: "Both support family management",
                desc: "OpenPharmacy and Scripty both allow you to store and manage eScripts for multiple family members — children, elderly parents, a partner — within a single app account. Scripts are organised by person, so you always know whose prescription you are presenting.",
              },
              {
                title: "Both store data in Australia and are free",
                desc: "Neither app stores your health data overseas. Both use encryption and Australian-hosted servers. Neither charges a subscription fee or shows advertising.",
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
                  <p className="text-white/75 text-base leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </Motion.section>

        {/* ── Where OpenPharmacy wins ──────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Where OpenPharmacy Has the Edge
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
            For certain use cases, OpenPharmacy is the stronger choice. Here is where it
            stands apart from Scripty.
          </p>
          <ul className="space-y-4">
            {[
              {
                icon: "📵",
                title: "Offline-first architecture",
                desc: "OpenPharmacy was built from the ground up to function without any internet connection. Scripts are stored on the device itself — not fetched from a cloud service when you open the app. This matters in practice: if your phone has no signal at all (not just poor signal), the QR code is still there, instantly, every time. For users in regional or rural Australia, or anyone who has ever had a script fail to load at a pharmacy counter, this architectural difference is meaningful.",
              },
              {
                icon: "🔐",
                title: "ASD-approved encryption",
                desc: "OpenPharmacy specifically uses end-to-end ASD-approved encryption — the Australian Signals Directorate's cryptographic standards, the same framework used to protect sensitive Australian government data. Scripty uses state-of-the-art end-to-end encryption, which is also strong. The specific ASD approval is an additional verifiable credential that may matter to users with heightened security requirements, such as those managing prescriptions for dependants with sensitive conditions.",
              },
              {
                icon: "🏛️",
                title: "PIN required on every open",
                desc: "OpenPharmacy requires a 4-digit PIN every time the app is opened. This is a deliberate design choice: your prescription data — and your family members' prescription data — is protected by default on every access, not just optionally. Scripty's biometric lock is optional, meaning a device without biometrics set up, or one where biometrics are bypassed, may leave scripts more accessible.",
              },
              {
                icon: "🏢",
                title: "Built in Brisbane by Easy As Health Pty Ltd",
                desc: "OpenPharmacy is developed and operated by Easy As Health Pty Ltd, a Brisbane-based company. For users who specifically want a locally-built product with a clear, identifiable Australian operator responsible for their health data, this is a concrete point of accountability.",
              },
            ].map((item, idx) => (
              <Motion.li
                key={idx}
                className="flex items-start gap-4 bg-[var(--color-secondary)] rounded-xl p-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                viewport={{ once: true }}
              >
                <span className="text-2xl flex-shrink-0 mt-0.5" role="img" aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <p className="text-white font-semibold text-base md:text-lg mb-1">
                    {item.title}
                  </p>
                  <p className="text-white/75 text-base leading-relaxed">{item.desc}</p>
                </div>
              </Motion.li>
            ))}
          </ul>
        </Motion.section>

        {/* ── Where Scripty wins ───────────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Where Scripty Has the Edge
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
            This comparison would not be honest without acknowledging where Scripty offers
            capabilities that OpenPharmacy does not currently match.
          </p>
          <ul className="space-y-4">
            {[
              {
                icon: "⚠️",
                title: "Medicine shortage alerts",
                desc: "Scripty integrates with the TGA Medicines Shortage Report and notifies you if one of your medications is in short supply or has been discontinued nationally. This is a genuinely useful feature for Australians managing ongoing conditions — it lets you plan ahead rather than discovering a shortage at the pharmacy counter. OpenPharmacy does not currently offer this capability.",
              },
              {
                icon: "📸",
                title: "Smart screenshot import",
                desc: "Scripty's Smart Import feature can read multiple eScript tokens from a single screenshot, making it faster to bulk-add scripts you have received via SMS or email. OpenPharmacy supports adding scripts via token link or manual entry, but does not currently offer screenshot-based import.",
              },
              {
                icon: "🔓",
                title: "Optional biometric lock",
                desc: "Scripty offers an optional biometric lock (fingerprint or Face ID) for users who prefer biometric authentication over a PIN. OpenPharmacy uses a required 4-digit PIN. Neither approach is inherently more secure — they reflect different design philosophies around usability versus default protection.",
              },
              {
                icon: "🌏",
                title: "Multi-language support",
                desc: "Scripty currently supports Chinese-language users and has signalled additional language support is in development. OpenPharmacy does not currently offer multi-language support. For non-English-speaking Australians managing prescriptions, this is a meaningful practical advantage for Scripty.",
              },
            ].map((item, idx) => (
              <Motion.li
                key={idx}
                className="flex items-start gap-4 bg-[var(--color-secondary)]/70 border border-white/10 rounded-xl p-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                viewport={{ once: true }}
              >
                <span className="text-2xl flex-shrink-0 mt-0.5" role="img" aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <p className="text-white/80 font-semibold text-base md:text-lg mb-1">
                    {item.title}
                  </p>
                  <p className="text-white/65 text-base leading-relaxed">{item.desc}</p>
                </div>
              </Motion.li>
            ))}
          </ul>
        </Motion.section>

        {/* ── Security deep-dive ───────────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Security and Privacy: A Closer Look
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
            Both OpenPharmacy and Scripty are ADHA-conformant and use encryption with
            Australian-hosted cloud services. Here is how their security approaches compare
            at a more granular level.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="bg-[var(--color-secondary)] rounded-2xl p-6">
              <p className="text-[var(--color-accent)] font-semibold mb-3">
                OpenPharmacy security
              </p>
              <ul className="space-y-2">
                {[
                  "End-to-end ASD-approved encryption (in transit and at rest)",
                  "Data stored exclusively on Australian servers",
                  "4-digit PIN required on every app open",
                  "No third-party data sharing",
                  "ADHA-registered on the ePrescribing Conformance Register",
                  "Independent — not owned by a pharmacy chain or health insurer",
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white/75 text-sm">
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[var(--color-secondary)] rounded-2xl p-6">
              <p className="text-white/60 font-semibold mb-3">Scripty security</p>
              <ul className="space-y-2">
                {[
                  "State-of-the-art end-to-end encryption (in transit and at rest)",
                  "Device-level encryption when app is not in use",
                  "Cloud services hosted in Australia",
                  "Optional biometric lock (fingerprint / Face ID)",
                  "ADHA-listed on the ePrescribing Conformance Register",
                  "Independent — not owned by a pharmacy chain",
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white/65 text-sm">
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white/30" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-white/70 text-base leading-relaxed">
            Both apps take security seriously and neither is a poor choice from a privacy
            standpoint. The meaningful distinction is that OpenPharmacy specifies ASD-approved
            cryptography — a named, verifiable standard — while Scripty uses strong
            encryption without citing a specific named standard. For most users, both are
            more than adequate. For those managing prescriptions for vulnerable dependants,
            or those who work in regulated industries, the specific ASD approval may carry
            additional weight.
          </p>
        </Motion.section>

        {/* ── Who should choose which ──────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Who Should Choose Which App?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 rounded-2xl p-6">
              <p className="text-[var(--color-accent)] font-bold text-lg mb-3">
                Choose OpenPharmacy if you:
              </p>
              <ul className="space-y-2.5">
                {[
                  "Live or work in a rural or regional area with unreliable mobile coverage",
                  "Want guaranteed offline access with no dependency on cloud connectivity",
                  "Manage prescriptions for family members and want ASD-grade encryption protecting their data",
                  "Prefer a mandatory PIN on every app open rather than optional biometrics",
                  "Want a locally-built Brisbane app with a clear Australian operator",
                  "Are looking for the simplest, most focused eScript wallet experience",
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white/80 text-sm">
                    <span className="mt-1 text-[var(--color-accent)] font-bold flex-shrink-0">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[var(--color-secondary)] border border-white/10 rounded-2xl p-6">
              <p className="text-white/60 font-bold text-lg mb-3">Choose Scripty if you:</p>
              <ul className="space-y-2.5">
                {[
                  "Want proactive alerts when one of your medications is in national shortage",
                  "Prefer biometric (fingerprint or Face ID) authentication over a PIN",
                  "Need to bulk-import scripts quickly from screenshots",
                  "Prefer a non-English interface (Chinese language currently supported)",
                  "Want a more feature-rich app experience with extras like script nicknames",
                  "Are already comfortable with the Scripty ecosystem and ASL integration",
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white/65 text-sm">
                    <span className="mt-1 text-white/40 font-bold flex-shrink-0">→</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Motion.section>

        {/* ── Verdict ──────────────────────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">The Verdict</h2>
          <div className="bg-[var(--color-secondary)] rounded-2xl p-6 mb-5">
            <p className="text-white/90 text-base md:text-lg leading-relaxed">
              <strong className="text-white">
                OpenPharmacy and Scripty are both excellent, legitimate eScript wallet choices
                for Australians.
              </strong>{" "}
              The honest answer to "which is better?" depends entirely on what you need.
              If offline reliability, ASD-approved encryption, and a mandatory PIN for
              protecting family prescription data are your priorities, OpenPharmacy is the
              stronger fit. If you want TGA medication shortage alerts, biometric login, or
              smart screenshot import, Scripty has those capabilities that OpenPharmacy does
              not currently offer.
            </p>
          </div>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            What both apps share matters more than their differences for most users: free,
            ADHA-conformant, offline-capable, Australian-hosted, and independent of any
            pharmacy chain. Either is a significant improvement over managing eScript tokens
            through SMS threads and browser links.
          </p>
          <p className="text-white/70 text-base leading-relaxed">
            Both apps are free to download — there is no cost to trying OpenPharmacy and
            seeing whether its approach suits you before committing to either option.
          </p>
        </Motion.section>

        {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
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
              <div key={idx} className="border-b border-white/10">
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

        {/* ── Related links ─────────────────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-5">Learn More About OpenPharmacy</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/offline-escripts"
              className="flex-1 bg-[var(--color-secondary)] rounded-xl p-5 hover:bg-[var(--color-accent)]/20 transition-colors"
            >
              <p className="text-[var(--color-accent)] font-semibold mb-1">
                Offline eScript Access ›
              </p>
              <p className="text-white/65 text-sm leading-relaxed">
                Why offline-first architecture matters for Australian prescription management.
              </p>
            </Link>
            <Link
              to="/for-carers"
              className="flex-1 bg-[var(--color-secondary)] rounded-xl p-5 hover:bg-[var(--color-accent)]/20 transition-colors"
            >
              <p className="text-[var(--color-accent)] font-semibold mb-1">
                For Carers ›
              </p>
              <p className="text-white/65 text-sm leading-relaxed">
                Managing eScripts for children, elderly parents, and other family members.
              </p>
            </Link>
            <Link
              to="/faq"
              className="flex-1 bg-[var(--color-secondary)] rounded-xl p-5 hover:bg-[var(--color-accent)]/20 transition-colors"
            >
              <p className="text-[var(--color-accent)] font-semibold mb-1">FAQ ›</p>
              <p className="text-white/65 text-sm leading-relaxed">
                More common questions about security, privacy, and how OpenPharmacy works.
              </p>
            </Link>
          </div>
        </Motion.section>

        {/* ── CTA ──────────────────────────────────────────────────────────────── */}
        <CallToAction />
      </main>
    </Layout>
  );
}

export default CompareScripty;
