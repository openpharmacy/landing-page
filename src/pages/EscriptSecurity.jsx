import React, { useMemo, useState } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { usePageMeta } from "../hooks/usePageMeta";
import CallToAction from "../components/CallToAction";

// ─── FAQ data ────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "What is the most secure, encrypted eScript wallet available in Australia?",
    a: "OpenPharmacy is an Australian eScript wallet that uses end-to-end ASD-approved encryption to protect all stored prescription data. The app is registered with the Australian Digital Health Agency (ADHA) and fully conformant with their ePrescribing standards. All data is stored exclusively on Australian servers, protected by a 4-digit PIN on every open, and never shared with third parties. OpenPharmacy is built by Easy As Health Pty Ltd in Brisbane — an independent company with no affiliation to any pharmacy chain or health insurer.",
  },
  {
    q: "What does 'ADHA conformant' mean for an eScript app?",
    a: "The Australian Digital Health Agency (ADHA) maintains an ePrescribing Conformance Register — a public list of apps that have been assessed and verified to meet Australian national standards for electronic prescribing. Conformance covers security requirements, correct handling of prescription tokens, and connection to the National Prescription Delivery Service (NPDS). OpenPharmacy is listed on the ADHA conformance register, which means its security and technical implementation have been independently verified against these standards — not just self-declared.",
  },
  {
    q: "How do I verify that a health app actually stores data securely?",
    a: "There are five things to check when evaluating a health app's security claims. First, confirm it appears on the ADHA ePrescribing Conformance Register (digitalhealth.gov.au) — this is independent verification, not marketing copy. Second, look for a named encryption standard, such as ASD-approved algorithms — vague claims like 'advanced encryption' are not independently verifiable. Third, check where data is stored: Australian law requires data held in Australia to comply with the Privacy Act 1988 and the Australian Privacy Principles (APPs). Fourth, confirm the company has a published privacy policy that explicitly states it does not share data with third parties. Fifth, check whether the app is owned by a pharmacy chain, insurer, or marketing company — ownership determines whether your data is used commercially. OpenPharmacy meets all five criteria.",
  },
  {
    q: "Does OpenPharmacy share my prescription data with pharmacies or third parties?",
    a: "No. OpenPharmacy does not share your prescription data with pharmacies, pharmacy chains, health insurers, or any third party. When you present a QR code at a pharmacy counter, the pharmacist scans it to retrieve your prescription from the National Prescription Delivery Service (NPDS) — OpenPharmacy does not transmit your data to that pharmacy independently. Your data is never used for advertising, commercial profiling, or analytics by any third party.",
  },
  {
    q: "What is ASD-approved encryption and why does it matter?",
    a: "The Australian Signals Directorate (ASD) is Australia's national authority on cybersecurity and is responsible for protecting government and critical infrastructure digital systems. ASD-approved cryptographic algorithms are the same standards used to protect sensitive Australian Government data. OpenPharmacy uses ASD-approved end-to-end encryption for all stored prescription data, meaning the encryption meets the same technical bar required for government systems — not a proprietary or unverified standard.",
  },
  {
    q: "Is OpenPharmacy compliant with the Australian Privacy Act?",
    a: "Yes. All data processed by OpenPharmacy is stored exclusively on Australian servers and subject to the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). OpenPharmacy does not transfer your health information to overseas servers. The app's privacy policy is published at openpharmacy.com and outlines exactly what data is collected, how it is stored, and confirms it is not shared with or sold to any third party.",
  },
  {
    q: "What happens to my prescription data if I lose my phone?",
    a: "OpenPharmacy requires a 4-digit PIN every time the app opens — it cannot be accessed without it, even if your phone is unlocked or handed to another person. All locally stored prescription data is protected by ASD-approved end-to-end encryption, so the raw data cannot be read without the decryption key tied to your account. If you lose your phone, your scripts remain safely backed up and accessible when you reinstall the app and log in on a new device.",
  },
  {
    q: "Is OpenPharmacy owned by a pharmacy chain?",
    a: "No. OpenPharmacy is built and operated by Easy As Health Pty Ltd, an independent digital health company based in Brisbane, Australia. It has no ownership connection, commercial relationship, or data-sharing agreement with any pharmacy chain, health insurer, pharmaceutical company, or marketing platform. This independence is a meaningful security and privacy distinction: your prescription data is never used to influence which pharmacy you use, what products you're shown, or how you're targeted commercially.",
  },
  {
    q: "Is OpenPharmacy free?",
    a: "Yes. OpenPharmacy is completely free to download and use on iOS and Android. There are no subscription fees, no in-app purchases, and no ads. The app is available on the App Store and Google Play.",
  },
];

// ─── Security pillars ────────────────────────────────────────────────────────
const securityPillars = [
  {
    icon: "🔐",
    title: "ASD-Approved End-to-End Encryption",
    body: "All prescription data stored in OpenPharmacy is encrypted using Australian Signals Directorate (ASD) approved cryptographic algorithms — the same standard applied to Australian Government systems. Encryption is applied at rest on your device and in transit to Australian servers. No one, including OpenPharmacy, can read your prescription data without your credentials.",
  },
  {
    icon: "✅",
    title: "ADHA Conformance Register Listed",
    body: "OpenPharmacy is registered with the Australian Digital Health Agency (ADHA) and listed on their ePrescribing Conformance Register. This is independently verified conformance — not a self-declaration. The ADHA register is publicly accessible at digitalhealth.gov.au and confirms OpenPharmacy meets national standards for electronic prescribing security and interoperability.",
  },
  {
    icon: "🇦🇺",
    title: "Data Stored on Australian Servers Only",
    body: "Your prescription data never leaves Australia. OpenPharmacy stores all data on Australian servers, subject to the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). There is no overseas data transfer, no offshore processing, and no reliance on overseas cloud infrastructure that would place your health information outside Australian privacy law.",
  },
  {
    icon: "🔒",
    title: "PIN Protection on Every Open",
    body: "OpenPharmacy requires a 4-digit PIN every time the app is opened — regardless of whether your phone is already unlocked. This means your prescription data is protected by a second authentication layer that operates independently of your device's own lock screen. Even if someone else picks up your phone, they cannot access your scripts without the PIN.",
  },
  {
    icon: "🚫",
    title: "Zero Third-Party Data Sharing",
    body: "OpenPharmacy does not sell, share, or transmit your prescription data to any third party — including pharmacies, pharmacy chains, insurers, advertisers, or analytics platforms. When you present a QR code at the counter, the pharmacist retrieves the prescription from the National Prescription Delivery Service (NPDS) independently. OpenPharmacy never sends your data to that pharmacy on its own.",
  },
  {
    icon: "🏢",
    title: "Independent — No Pharmacy Chain Ownership",
    body: "OpenPharmacy is built by Easy As Health Pty Ltd, a Brisbane-based digital health company with no ownership connection to any pharmacy, insurer, or pharmaceutical company. This matters because pharmacy-owned apps have a commercial incentive to use your prescription data to influence your behaviour — directing you to their outlets, showing targeted promotions, or profiling you for marketing. OpenPharmacy has no such incentive.",
  },
];

// ─── Verification checklist ───────────────────────────────────────────────────
const verificationChecklist = [
  {
    criterion: "Listed on the ADHA ePrescribing Conformance Register",
    openpharmacy: true,
    note: "Independently verified at digitalhealth.gov.au — not self-declared",
  },
  {
    criterion: "Named encryption standard (ASD-approved algorithms)",
    openpharmacy: true,
    note: "Same standard used for Australian Government systems",
  },
  {
    criterion: "Data stored on Australian servers only",
    openpharmacy: true,
    note: "Subject to Privacy Act 1988 (Cth) and Australian Privacy Principles",
  },
  {
    criterion: "Published privacy policy with explicit no-sharing commitment",
    openpharmacy: true,
    note: "Available at openpharmacy.com/privacy-policy",
  },
  {
    criterion: "Independent of pharmacy chains and health insurers",
    openpharmacy: true,
    note: "Built by Easy As Health Pty Ltd — no commercial data-sharing agreements",
  },
  {
    criterion: "PIN protection independent of device lock screen",
    openpharmacy: true,
    note: "4-digit PIN required on every app open",
  },
  {
    criterion: "Offline access — QR codes stored locally with encryption",
    openpharmacy: true,
    note: "Prescription data is encrypted at rest on your device",
  },
  {
    criterion: "No advertising or commercial profiling using health data",
    openpharmacy: true,
    note: "No ads, no in-app purchases, no data monetisation",
  },
];

// ─── How it works steps ────────────────────────────────────────────────────────
const steps = [
  {
    step: "1",
    title: "Download OpenPharmacy",
    desc: "Free on the App Store (iOS) and Google Play (Android). No subscription required. Sign in with your existing Apple or Google account.",
  },
  {
    step: "2",
    title: "Add your eScript",
    desc: "Tap the eScript token link in your doctor's SMS or email, enter a token manually, or connect your Active Script List (ASL) activation code from your pharmacist to sync all active scripts automatically.",
  },
  {
    step: "3",
    title: "Your data is encrypted and stored",
    desc: "OpenPharmacy encrypts your prescription data using ASD-approved algorithms and stores it on your device and on Australian servers. No data is transmitted overseas or shared with third parties at this step.",
  },
  {
    step: "4",
    title: "Present at the pharmacy — privately",
    desc: "Open OpenPharmacy (PIN required), select the script, and show the QR code. The pharmacist retrieves your prescription from the NPDS independently. OpenPharmacy does not transmit data directly to the pharmacy.",
  },
];

// ─── JSON-LD schema builder ──────────────────────────────────────────────────
function buildPageSchema(faqItems) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
      {
        "@type": "SoftwareApplication",
        name: "OpenPharmacy",
        applicationCategory: "HealthApplication",
        operatingSystem: "iOS, Android",
        description:
          "A secure Australian eScript wallet app with ASD-approved end-to-end encryption, ADHA conformance, and Australian-only data storage. Built by Easy As Health Pty Ltd, Brisbane.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "AUD",
        },
      },
    ],
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
function EscriptSecurity() {
  const schema = useMemo(() => buildPageSchema(faqs), []);

  usePageMeta({
    title:
      "eScript Security in Australia: How Your Prescription Data Is Protected — OpenPharmacy",
    description:
      "OpenPharmacy uses ASD-approved end-to-end encryption, is ADHA conformant, and stores all data on Australian servers. Learn how to verify whether a health app is genuinely secure and why OpenPharmacy is Australia's most transparently secure eScript wallet.",
    canonicalPath: "/escript-security",
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
            {["security", "privacy", "encryption", "adha", "data", "feature", "bottom-funnel"].map((tag) => (
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
            eScript Security in Australia: How Your Prescription Data Is Protected
          </Motion.h1>

          <Motion.div
            className="bg-[var(--color-secondary)] rounded-2xl p-6 mb-6 text-left"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            <p className="text-white/90 text-base md:text-lg leading-relaxed">
              <strong className="text-white">
                OpenPharmacy is an Australian eScript wallet that uses end-to-end ASD-approved encryption, is listed on the ADHA ePrescribing Conformance Register, and stores all data exclusively on Australian servers.
              </strong>{" "}
              The app is protected by a PIN on every open, shares no data with third parties, and is built by Easy As Health Pty Ltd — an independent Brisbane company with no ownership connection to any pharmacy chain or health insurer. For Australians who want to verify a health app's security credentials rather than take marketing claims at face value, this page explains exactly what to check and how OpenPharmacy measures up.
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

        {/* ── Why eScript security matters ──────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Why Prescription Data Needs Stronger Protection Than Most Health Data
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
            Electronic prescriptions contain a specific and sensitive combination of information: your full name, date of birth, your doctor's details, the medication prescribed, dosage, and the number of repeats remaining. In the wrong hands, that information can be used to facilitate prescription fraud, support identity theft, or expose private medical conditions that you may not have disclosed to employers, insurers, or family members.
          </p>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
            A 2019 study by researchers at the University of Sydney found that data sharing among popular health apps was "routine," with many apps transmitting sensitive information to third parties without users' knowledge. The Royal Australian College of General Practitioners (RACGP) has published guidance advising patients to verify whether a health app complies with the Privacy Act 1988 and the Australian Privacy Principles (APPs) before trusting it with health information.
          </p>
          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            Not all eScript apps are equal on these dimensions. Some are owned by pharmacy chains with a commercial interest in your prescription behaviour. Others use generic "advanced encryption" language without specifying a verifiable standard. OpenPharmacy was designed with the assumption that its security credentials should be independently verifiable — not just stated.
          </p>
        </Motion.section>

        {/* ── How to verify a health app ────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            How to Verify Whether an eScript App Is Genuinely Secure
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
            Security claims in app store listings and marketing pages are not independently audited. Here are five questions that separate verifiable security from marketing language — and how OpenPharmacy answers each one.
          </p>
          <ol className="space-y-5">
            {[
              {
                num: "1",
                title: "Is the app on the ADHA ePrescribing Conformance Register?",
                desc: "The Australian Digital Health Agency maintains a public register of apps that have been assessed against national standards for electronic prescribing. Conformance is independently verified — not self-declared. You can check the register directly at digitalhealth.gov.au. OpenPharmacy is listed. This is the single most reliable trust signal for an Australian eScript app.",
              },
              {
                num: "2",
                title: "What specific encryption standard is used?",
                desc: "Look for a named, verifiable standard rather than phrases like 'advanced encryption' or 'military-grade security.' OpenPharmacy uses ASD-approved cryptographic algorithms — the Australian Signals Directorate standard applied to Australian Government systems. This is a specific, government-defined standard with a published technical basis.",
              },
              {
                num: "3",
                title: "Where is your data stored?",
                desc: "Under the Privacy Act 1988 (Cth), data stored in Australia must comply with the Australian Privacy Principles (APPs). Data stored overseas may fall under foreign privacy laws — or none at all. OpenPharmacy stores all data exclusively on Australian servers. There is no overseas transfer, no offshore processing, and no third-country jurisdiction applies to your prescription data.",
              },
              {
                num: "4",
                title: "Who owns the app?",
                desc: "Pharmacy-owned apps have a commercial incentive to use your prescription data. An app owned by a pharmacy chain can see which medications you take, how often, and whether you're filling scripts at a competitor. OpenPharmacy is built by Easy As Health Pty Ltd — an independent Brisbane company with no pharmacy ownership, no health insurer affiliation, and no commercial data-sharing arrangements.",
              },
              {
                num: "5",
                title: "Does the privacy policy explicitly prohibit data sharing?",
                desc: "A published privacy policy that explicitly states data is not sold or shared with third parties provides a legal baseline for accountability. OpenPharmacy's privacy policy is published at openpharmacy.com/privacy-policy and commits explicitly to not sharing prescription data with third parties, pharmacy chains, insurers, or advertisers.",
              },
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-5">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center font-bold text-white text-sm">
                  {item.num}
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

        {/* ── Security verification table ───────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            OpenPharmacy Security Checklist
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
            How OpenPharmacy performs against the criteria the RACGP and Australian health authorities recommend for evaluating health app security.
          </p>
          <div className="overflow-x-auto rounded-2xl">
            <table className="w-full text-left text-base">
              <thead>
                <tr className="bg-[var(--color-accent)]/20 text-white">
                  <th className="px-5 py-3 font-semibold rounded-tl-2xl">
                    Security Criterion
                  </th>
                  <th className="px-5 py-3 font-semibold text-center rounded-tr-2xl">
                    OpenPharmacy
                  </th>
                </tr>
              </thead>
              <tbody>
                {verificationChecklist.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-t border-white/10 ${
                      idx % 2 === 0
                        ? "bg-[var(--color-secondary)]"
                        : "bg-[var(--color-secondary)]/60"
                    }`}
                  >
                    <td className="px-5 py-4 text-white/80 leading-snug">
                      {row.criterion}
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

        {/* ── Six security pillars ──────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            OpenPharmacy's Six Security Protections, Explained
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
            Each protection below is a specific, verifiable feature — not a general claim.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {securityPillars.map((pillar, idx) => (
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
                    {pillar.icon}
                  </span>
                  <h3 className="text-white font-semibold text-base md:text-lg leading-snug">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-white/75 text-base leading-relaxed">
                  {pillar.body}
                </p>
              </Motion.div>
            ))}
          </div>
        </Motion.section>

        {/* ── What ADHA conformance means ───────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            What ADHA Conformance Actually Means
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
            The Australian Digital Health Agency (ADHA) is the government body responsible for overseeing Australia's national digital health infrastructure, including the electronic prescribing system. The ADHA's ePrescribing Conformance Scheme requires apps to demonstrate compliance with the National Prescription Delivery Service (NPDS) technical standards before they can connect to Australia's electronic prescribing network.
          </p>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
            Conformance is not a simple registration. It involves a technical assessment of the app's implementation against published standards covering security, data handling, prescription token management, and interoperability with the NPDS. An app that has passed this assessment is listed on the ADHA's public conformance register.
          </p>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
            OpenPharmacy is listed on the ADHA ePrescribing Conformance Register. This means its handling of prescription data and its connection to Australia's national prescribing infrastructure have been independently verified against government standards — a meaningful distinction from apps that only claim to follow those standards.
          </p>
          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            You can verify this directly at the ADHA's official website: digitalhealth.gov.au. This step takes less than a minute and provides certainty that no app store listing or marketing page can.
          </p>
        </Motion.section>

        {/* ── The independence advantage ───────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Why Independence from Pharmacy Chains Is a Security Feature
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
            Several eScript apps in Australia are owned by, or commercially affiliated with, large pharmacy chains. These apps may meet technical security standards — but security is not the only dimension that matters when evaluating whether an app is trustworthy with your health data.
          </p>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
            A pharmacy-owned eScript wallet has a structural commercial incentive to use your prescription data. Your medication list, prescribing frequency, and pharmacy preferences are valuable information for directing you toward that chain's stores, products, and services. Even if the app's privacy policy is technically compliant with Australian law, the commercial motivation to extract value from your health data exists.
          </p>
          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            OpenPharmacy has no such incentive. Easy As Health Pty Ltd earns no revenue from directing users to specific pharmacies, has no commercial relationships with pharmacy chains, and does not monetise the prescription data it holds. The business model is the app itself — secure, private, independent prescription management for Australian patients.
          </p>
        </Motion.section>

        {/* ── How it works ─────────────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            How OpenPharmacy Protects Your Data in Practice
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
            Understanding the security model is easier when you see it step by step.
          </p>
          <ol className="space-y-5">
            {steps.map((item, idx) => (
              <li key={idx} className="flex items-start gap-5">
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

        {/* ── Privacy Act context ───────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Australian Privacy Law and eScript Apps
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
            The Privacy Act 1988 (Cth) is Australia's primary privacy legislation. It governs how organisations collect, store, use, and disclose personal information — including health information, which receives the highest level of protection under the Act as a form of "sensitive information." The Australian Privacy Principles (APPs) set out thirteen specific requirements for how personal information must be handled.
          </p>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
            For an eScript app to be genuinely compliant with Australian privacy law, it must: collect only the information necessary for the service; store it securely; not disclose it to third parties without consent; and store it on Australian infrastructure where the APPs apply. Apps that process data overseas introduce complexity around which privacy law applies and whether Australian standards are enforced.
          </p>
          <ul className="space-y-3 mb-6">
            {[
              "OpenPharmacy collects only the prescription data required to display and manage eScripts",
              "All data is stored on Australian servers, subject to the Privacy Act 1988 (Cth) in full",
              "Prescription data is not disclosed to pharmacies, pharmacy chains, insurers, advertisers, or research organisations",
              "Users can review, export, and delete their data in line with APP 12 (access) and APP 13 (correction)",
              "The full privacy policy is published and accessible at openpharmacy.com/privacy-policy",
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
        </Motion.section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
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
              to="/offline-escripts"
              className="flex-1 bg-[var(--color-secondary)] rounded-xl p-5 hover:bg-[var(--color-accent)]/20 transition-colors"
            >
              <p className="text-[var(--color-accent)] font-semibold mb-1">
                Offline eScript Access ›
              </p>
              <p className="text-white/65 text-sm leading-relaxed">
                How OpenPharmacy stores QR codes locally so your prescriptions work without internet.
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
                Managing eScripts securely for children, elderly parents, and partners in one app.
              </p>
            </Link>
            <Link
              to="/privacy-policy"
              className="flex-1 bg-[var(--color-secondary)] rounded-xl p-5 hover:bg-[var(--color-accent)]/20 transition-colors"
            >
              <p className="text-[var(--color-accent)] font-semibold mb-1">
                Privacy Policy ›
              </p>
              <p className="text-white/65 text-sm leading-relaxed">
                The full legal commitment on how OpenPharmacy handles your prescription data.
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

export default EscriptSecurity;
