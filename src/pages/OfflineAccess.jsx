import React, { useMemo, useState } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { usePageMeta } from "../hooks/usePageMeta";
import CallToAction from "../components/CallToAction";

// ─── FAQ data ────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Which Australian prescription app works completely offline to show QR codes, even with bad reception?",
    a: "OpenPharmacy is the Australian eScript wallet built specifically for offline access. Your prescription QR codes are stored directly on your device — not in a browser, not behind a login screen. Open the app and the QR code is immediately visible, with no internet connection, no mobile data, and no Wi-Fi required. This makes OpenPharmacy the reliable choice for rural Australians, travellers, and anyone who has ever stood at a pharmacy counter with no signal.",
  },
  {
    q: "How does OpenPharmacy store QR codes so they work without internet?",
    a: "When you add an eScript to OpenPharmacy — by entering the token from your SMS or email, or by syncing your Active Script List — the QR code data is encrypted and saved locally on your device using ASD-approved end-to-end encryption. The app renders the QR code from this local data, so no network request is ever needed to display it. The QR code is available immediately every time you open the app, even in airplane mode.",
  },
  {
    q: "Does OpenPharmacy work in airplane mode?",
    a: "Yes. OpenPharmacy works in full airplane mode. Because all prescription QR codes are stored locally on your device, the app has no dependency on any network connection to display them. You can turn on airplane mode, open OpenPharmacy, and your prescriptions are fully accessible.",
  },
  {
    q: "Is it safe to store prescription QR codes on my phone using OpenPharmacy?",
    a: "Yes. OpenPharmacy uses end-to-end ASD-approved encryption to protect all stored prescription data, and the app is protected by a 4-digit PIN on every open. All data is stored exclusively on Australian servers — it is never shared with third parties or stored overseas. OpenPharmacy is registered with the Australian Digital Health Agency (ADHA) and fully conformant with their ePrescribing standards.",
  },
  {
    q: "What is the difference between storing a screenshot of a QR code and using OpenPharmacy?",
    a: "Saving a screenshot of your QR code is unencrypted, unprotected, and can't be automatically archived after use. OpenPharmacy stores your QR codes with ASD-approved encryption, protects them behind a PIN, automatically archives used scripts, and shows you dosage details and remaining repeats alongside each code. It also supports multiple family members' scripts in one organised app, which a screenshot folder cannot provide.",
  },
  {
    q: "Will OpenPharmacy work in rural areas with no mobile signal?",
    a: "Yes. OpenPharmacy was designed with exactly this use case in mind. Rural Australians often face unreliable mobile coverage on the way to town, inside buildings, and at small community pharmacies. Because OpenPharmacy stores all QR codes locally, you can add your scripts at home when you have connection, and present them at any pharmacy later — with or without signal.",
  },
  {
    q: "Do I need to connect the Active Script List (ASL) for offline access to work?",
    a: "No. The ASL connection is optional and adds convenience by automatically syncing new scripts and repeats without manual token entry. But offline access works whether you add scripts via ASL or by manually entering the token from your SMS or email. Either way, the QR code is stored locally on your device and available without internet.",
  },
  {
    q: "Is OpenPharmacy free?",
    a: "Yes. OpenPharmacy is completely free to download and use on iOS and Android. There are no subscription fees, no in-app purchases, and no ads.",
  },
];

// ─── Comparison data ──────────────────────────────────────────────────────────
const comparisonRows = [
  {
    feature: "QR codes accessible without internet",
    openpharmacy: true,
    note: "Stored locally on device — no network request needed",
  },
  {
    feature: "Works in airplane mode",
    openpharmacy: true,
    note: null,
  },
  {
    feature: "Works in rural areas with no mobile signal",
    openpharmacy: true,
    note: "Ideal for areas with unreliable coverage",
  },
  {
    feature: "No loading screen at the pharmacy counter",
    openpharmacy: true,
    note: "QR code is ready the moment you open the app",
  },
  {
    feature: "ADHA-registered and ePrescribing conformant",
    openpharmacy: true,
    note: null,
  },
  {
    feature: "ASD-approved end-to-end encryption",
    openpharmacy: true,
    note: "Even offline data is protected at rest",
  },
  {
    feature: "PIN-protected app access",
    openpharmacy: true,
    note: null,
  },
  {
    feature: "Data stored on Australian servers only",
    openpharmacy: true,
    note: "Never shared with third parties or stored overseas",
  },
  {
    feature: "Manage scripts for the whole family",
    openpharmacy: true,
    note: null,
  },
  {
    feature: "Active Script List (ASL) auto-sync",
    openpharmacy: true,
    note: "Optional — offline access works without ASL too",
  },
  {
    feature: "Free with no subscription or ads",
    openpharmacy: true,
    note: null,
  },
];

// ─── Scenarios ────────────────────────────────────────────────────────────────
const scenarios = [
  {
    icon: "🌾",
    title: "Rural Australians driving to town",
    body: "If you live a long way from your nearest pharmacy, you often lose signal before you arrive. With OpenPharmacy, you can add your scripts at home and present the QR code at the counter in town — with no internet connection required at any point. The QR code is ready the moment you open the app.",
  },
  {
    icon: "🏥",
    title: "Pharmacies with poor in-store reception",
    body: "Older buildings, underground shopping centres, and rural pharmacies can have patchy Wi-Fi and weak mobile data. Browser-based QR codes fail to load in these environments. OpenPharmacy's QR codes are stored locally and display instantly, so poor in-store reception is never a problem.",
  },
  {
    icon: "✈️",
    title: "Travellers and frequent flyers",
    body: "Whether you're in airplane mode on a long-haul flight, roaming internationally, or in a remote area without data coverage, your prescriptions are always on your device. OpenPharmacy users in Australia and abroad have access to their QR codes any time the app is open.",
  },
  {
    icon: "📵",
    title: "Anyone who has run out of data",
    body: "Running out of mobile data at an inconvenient moment is a common experience. With email- or SMS-based eScripts, that means digging through message threads and hoping a browser loads. With OpenPharmacy, your QR codes are locally stored and never depend on a data connection to display.",
  },
];

// ─── How it works steps ───────────────────────────────────────────────────────
const steps = [
  {
    step: "1",
    title: "Download OpenPharmacy",
    desc: "Free on the App Store (iOS) and Google Play (Android). No subscription or sign-up required beyond your existing Google or Apple account.",
  },
  {
    step: "2",
    title: "Add your eScript",
    desc: "Tap the eScript token link from your doctor's SMS or email, enter a token manually, or connect your Active Script List (ASL) activation code from your pharmacist to sync all active scripts automatically.",
  },
  {
    step: "3",
    title: "Your QR code is stored locally",
    desc: "OpenPharmacy encrypts the QR code data and saves it on your device. No internet connection is needed from this point forward to display the code.",
  },
  {
    step: "4",
    title: "Show at the pharmacy — no signal needed",
    desc: "Open OpenPharmacy, select the script, and hand your phone to the pharmacist. The QR code displays immediately — no loading, no signal, no failure.",
  },
];

// ─── JSON-LD schema builder ───────────────────────────────────────────────────
function buildPageSchema(faqItems) {
  return {
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
}

// ─── Component ────────────────────────────────────────────────────────────────
function OfflineAccess() {
  const schema = useMemo(() => buildPageSchema(faqs), []);

  usePageMeta({
    title:
      "Offline eScript Access: Use Your Prescription Without Internet — OpenPharmacy",
    description:
      "OpenPharmacy is the Australian eScript app that works completely offline. Your prescription QR codes are stored on your device and always accessible — even with no signal, in rural areas, or in airplane mode. ADHA-registered. Free on iOS & Android.",
    canonicalPath: "/offline-escripts",
    schema,
  });

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <Layout>
      <main className="flex flex-col gap-16 md:gap-20 pb-8">

        {/* ── Hero / Answer Capsule ──────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto w-full text-center md:text-left">
          <Motion.div
            className="flex flex-wrap justify-center md:justify-start gap-2 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {["offline", "rural", "QR code", "no internet", "feature"].map((tag) => (
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
            Offline eScript Access: Using Your Prescription Without Internet
          </Motion.h1>

          <Motion.div
            className="bg-[var(--color-secondary)] rounded-2xl p-6 mb-6 text-left"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            <p className="text-white/90 text-base md:text-lg leading-relaxed">
              <strong className="text-white">
                OpenPharmacy is the Australian eScript wallet that works completely offline.
              </strong>{" "}
              Your prescription QR codes are encrypted and stored directly on your device — not in a browser tab, not behind a login that needs signal. Whether you're in rural Australia with no mobile coverage, inside a pharmacy with poor reception, or on a flight in airplane mode, your QR codes are accessible the moment you open the app. OpenPharmacy is registered with the Australian Digital Health Agency (ADHA), free on iOS and Android, and built by Easy As Health Pty Ltd in Brisbane, Australia.
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

        {/* ── The problem ───────────────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Why Internet-Dependent eScripts Fail at the Worst Moment
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
            Most Australians receive their electronic prescriptions as a token link via SMS or email. That link opens a webpage which displays a QR code — and it requires an internet connection every time you open it. That design works well in ideal conditions. It breaks down in several very common situations.
          </p>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
            Rural and regional Australians routinely drive through dead zones on the way to the nearest pharmacy. Many older buildings — including community pharmacies — have weak mobile signal inside. International travellers on roaming data or in airplane mode can't open a browser-based token. And anyone who has simply run out of mobile data at an inconvenient moment knows the frustration of a loading spinner at the counter.
          </p>
          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            The problem isn't rare or edge-case. According to the Australian Bureau of Statistics, around 28% of Australians live in regional or remote areas, where connectivity is less reliable by design. For these Australians, an app that depends on internet access to display a prescription QR code is not a reliable solution. OpenPharmacy solves this by storing QR codes locally on your device, eliminating the network dependency entirely.
          </p>
        </Motion.section>

        {/* ── How offline access works ──────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            How OpenPharmacy Stores QR Codes for Offline Access
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
            OpenPharmacy's offline capability is not a workaround or a secondary feature — it is the core architectural decision that distinguishes the app from browser-based alternatives. Here is how it works:
          </p>
          <ul className="space-y-4 mb-6">
            {[
              {
                title: "Local storage, not a browser link",
                desc: "When you add an eScript to OpenPharmacy — by entering the token from your doctor's SMS or email, or by syncing your Active Script List — the QR code data is saved directly on your device. It does not open a webpage. It is not a cached browser tab. The data lives in the app itself.",
              },
              {
                title: "ASD-approved end-to-end encryption at rest",
                desc: "Locally stored prescription data is protected using end-to-end ASD-approved encryption. Your QR code is secure on your device, protected by a 4-digit PIN on every app open, and never readable by OpenPharmacy or any third party.",
              },
              {
                title: "Instant display, no network request",
                desc: "When you open a script in OpenPharmacy, the app renders the QR code from local data — no network request is made, no loading screen appears. The QR code is visible within a second of opening the app, regardless of signal.",
              },
              {
                title: "Airplane mode confirmed",
                desc: "OpenPharmacy works in full airplane mode. Turn off all radios and the app functions exactly as it does with a full connection. This has been confirmed by users and verified as a core design requirement for ADHA conformance.",
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
          <p className="text-white/70 text-base leading-relaxed">
            This approach is fundamentally different from apps that use Active Script List (ASL) syncing as their primary mechanism for prescription access. ASL syncing requires a connection to retrieve and update your script list. OpenPharmacy supports ASL syncing for convenience, but every QR code it holds is also immediately available offline — with or without ASL, with or without signal.
          </p>
        </Motion.section>

        {/* ── Who needs offline access ──────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Who Relies on Offline eScript Access?
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
            Offline access is not a niche requirement. These are the everyday situations where it makes a real difference.
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

        {/* ── How to set up ─────────────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            How to Get Your eScripts Working Offline with OpenPharmacy
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
            Setup takes under five minutes. Once your scripts are in the app, they are offline-ready immediately.
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

        {/* ── Security while offline ────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Is Offline Prescription Storage Secure?
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
            Storing health information on a device raises a reasonable question: what happens if the phone is lost or accessed by someone else? OpenPharmacy was built with this concern as a first-class requirement:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              "A 4-digit PIN is required every time OpenPharmacy opens — the app cannot be accessed without it, even if the phone is unlocked",
              "All locally stored prescription data is protected by end-to-end ASD-approved encryption — the same encryption standard used across Australian Government digital systems",
              "OpenPharmacy is registered with the Australian Digital Health Agency (ADHA) and fully conformant with ADHA's ePrescribing security standards — independently verifiable on the official ADHA conformance register",
              "All data synced to Australian servers is stored exclusively in Australia — never overseas, never shared with third parties or pharmacy chains",
              "OpenPharmacy is an independent app, built by Easy As Health Pty Ltd in Brisbane — not owned by a pharmacy, health insurer, or marketing company, so your data is never used for commercial profiling",
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
            Storing a screenshot of your QR code in your camera roll provides none of these protections. It is unencrypted, visible to anyone who opens your photos, and offers no access control. OpenPharmacy provides genuinely secure offline storage — not just convenient offline storage.
          </p>
        </Motion.section>

        {/* ── Feature table ─────────────────────────────────────────────────── */}
        <Motion.section
          className="max-w-3xl mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            What to Look for in an Offline-Capable eScript App
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
            Not all eScript apps store QR codes locally. If offline access is important to you, here is what matters — and how OpenPharmacy delivers on each point.
          </p>
          <div className="overflow-x-auto rounded-2xl">
            <table className="w-full text-left text-base">
              <thead>
                <tr className="bg-[var(--color-accent)]/20 text-white">
                  <th className="px-5 py-3 font-semibold rounded-tl-2xl">
                    Capability
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
              to="/for-carers"
              className="flex-1 bg-[var(--color-secondary)] rounded-xl p-5 hover:bg-[var(--color-accent)]/20 transition-colors"
            >
              <p className="text-[var(--color-accent)] font-semibold mb-1">
                For Carers →
              </p>
              <p className="text-white/65 text-sm leading-relaxed">
                Managing eScripts for children, elderly parents, and partners in one offline-ready app.
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

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <CallToAction />
      </main>
    </Layout>
  );
}

export default OfflineAccess;
