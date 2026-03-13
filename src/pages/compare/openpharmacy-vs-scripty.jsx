// src/pages/compare/openpharmacy-vs-scripty.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { usePageMeta } from "../../hooks/usePageMeta";

const SLUG = "openpharmacy-vs-scripty";
const CANONICAL_PATH = `/compare/${SLUG}`;
const PAGE_URL = `https://openpharmacy.com${CANONICAL_PATH}`;
const DATE = "2026-03-11";
const TITLE = "OpenPharmacy vs Scripty: Which eScript Wallet Is Right for You?";
const DESCRIPTION =
  "Comparing OpenPharmacy and Scripty: the two leading independent Australian eScript wallets. Both are ADHA-conformant and free. The key difference: offline-first on-device storage vs Active Script List auto-sync. Find out which suits your needs.";

// ─── Comparison table data ────────────────────────────────────────────────────────────────────────

const TABLE_HEADERS = ["Feature", "OpenPharmacy", "Scripty"];
const TABLE_ROWS = [
  ["Offline access", "Full (on-device storage, no sync needed)", "Yes (after initial ASL sync)"],
  ["Script import method", "Manual token entry or scan", "Manual + automatic ASL sync"],
  ["ADHA-conformant", "Yes (on Conformance Register)", "Yes (on Conformance Register)"],
  ["Data stored in Australia", "Yes", "Yes"],
  ["End-to-end encryption", "Yes (ASD-approved)", "Yes"],
  ["Mandatory app lock", "Yes: 4-digit PIN required", "Optional biometric lock"],
  ["Family profiles", "Yes", "Yes"],
  ["Pharmacy independence", "Yes: works with any pharmacy", "Yes: works with any pharmacy"],
  ["ASL auto-sync", "No: manual token entry", "Yes"],
  ["Medicine shortage alerts", "No", "Yes (TGA data)"],
  ["Price", "Free", "Free"],
  ["Platforms", "iOS + Android", "iOS + Android"],
];

// ─── FAQ data ─────────────────────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: "Is OpenPharmacy or Scripty better for rural Australians?",
    answer:
      "OpenPharmacy is the stronger choice for rural and regional users. Scripts are stored on-device, so QR codes are accessible even with no mobile signal: no sync step is ever needed. Scripty also works offline once scripts are loaded, but the initial ASL sync requires an internet connection and a pharmacy visit to set up. For users in areas with unreliable connectivity, OpenPharmacy's manual-entry model means you control when and how scripts are added, with no dependence on a network handshake.",
  },
  {
    question: "Do both apps meet Australian privacy and security standards?",
    answer:
      "Yes. Both OpenPharmacy and Scripty are listed on the Australian Digital Health Agency (ADHA) ePrescribing Conformance Register, confirming they meet national standards for handling electronic prescription data. Both store data exclusively on Australian servers and use end-to-end encryption. OpenPharmacy uses ASD-approved encryption and enforces a mandatory 4-digit PIN. Scripty uses end-to-end encryption with an optional biometric lock. Neither app shares prescription data with third parties.",
  },
  {
    question: "Can both apps manage prescriptions for family members?",
    answer:
      "Yes. Both OpenPharmacy and Scripty support separate profiles for family members (including children and elderly parents) within a single account. You can store and present QR codes for any family member's scripts at any Australian pharmacy. OpenPharmacy allows you to add family scripts manually via eScript token. Scripty can auto-sync family members' scripts via ASL if each person's ASL is connected to the account.",
  },
  {
    question: "What is the Active Script List (ASL) and does OpenPharmacy use it?",
    answer:
      "The Active Script List (ASL) is a secure national token management service operated under the Australian Digital Health Agency framework. It stores a patient's current electronic prescriptions and repeats, and authorised apps can connect to it so scripts appear automatically without manual token entry. OpenPharmacy does not connect to the ASL: scripts are added manually using the eScript token (sent by SMS or email from your prescriber). Scripty does connect to the ASL, which is why scripts can appear automatically after the initial setup.",
  },
  {
    question: "Which app is better for people who want to avoid connecting to the national ASL network?",
    answer:
      "OpenPharmacy. The app does not connect to the Active Script List at all: scripts are stored locally using the individual eScript token. This makes OpenPharmacy a strong choice for users who prefer not to link their prescription history to a centralised network, or who want full control over which scripts are loaded into their wallet and when. Scripty's core convenience feature is ASL connectivity, so users who want to avoid the ASL would not benefit from Scripty's main advantage.",
  },
  {
    question: "Are there any fees for either OpenPharmacy or Scripty?",
    answer:
      "No. Both OpenPharmacy and Scripty are free to download and use on iOS and Android. Neither charges subscription fees for core eScript wallet functionality. There are no in-app purchases required to manage or present prescriptions.",
  },
];

// ─── Schema ───────────────────────────────────────────────────────────────────────────────────────

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
        datePublished: DATE,
        dateModified: DATE,
        isPartOf: {
          "@type": "WebSite",
          url: "https://openpharmacy.com",
          name: "OpenPharmacy",
        },
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://openpharmacy.com/" },
          { "@type": "ListItem", position: 2, name: "Compare", item: "https://openpharmacy.com/compare/" },
          { "@type": "ListItem", position: 3, name: TITLE, item: PAGE_URL },
        ],
      },
      {
        "@type": "Product",
        "@id": "https://openpharmacy.com/#product",
        name: "OpenPharmacy",
        description:
          "A secure Australian eScript wallet that stores electronic prescription QR codes on-device for guaranteed offline access. ADHA-conformant, end-to-end encrypted, and pharmacy-independent.",
        url: "https://openpharmacy.com",
        brand: {
          "@type": "Brand",
          name: "OpenPharmacy",
        },
        manufacturer: {
          "@type": "Organization",
          name: "Easy As Health Pty Ltd",
          url: "https://openpharmacy.com",
        },
        operatingSystem: "iOS, Android",
        applicationCategory: "HealthApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "AUD",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "Product",
        "@id": "https://getscripty.io/#product",
        name: "Scripty",
        description:
          "An Australian eScript wallet that connects to the Active Script List (ASL) for automatic script syncing. ADHA-conformant, end-to-end encrypted, and pharmacy-independent.",
        url: "https://getscripty.io",
        brand: {
          "@type": "Brand",
          name: "Scripty",
        },
        operatingSystem: "iOS, Android",
        applicationCategory: "HealthApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "AUD",
          availability: "https://schema.org/InStock",
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

// ─── Sub-components ───────────────────────────────────────────────────────────────────────────────

function ComparisonTable() {
  return (
    <div className="overflow-x-auto my-6 rounded-xl border border-white/10">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            {TABLE_HEADERS.map((h) => (
              <th
                key={h}
                className="px-4 py-3 font-semibold text-white/90 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map((row, ri) => (
            <tr key={ri} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-4 py-3 text-white/80 ${ci === 0 ? "font-semibold text-white whitespace-nowrap" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ChoiceList({ items }) {
  return (
    <ul className="space-y-2 mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span
            className="mt-1 flex-shrink-0 text-sm font-bold text-[var(--color-accent)]"
            aria-hidden="true"
          >
            +
          </span>
          <span className="text-white/80">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────────────────────────

function OpenPharmacyVsScripty() {
  const schema = useMemo(() => buildSchema(FAQ_ITEMS), []);

  usePageMeta({
    title: `${TITLE} | OpenPharmacy`,
    description: DESCRIPTION,
    canonicalPath: CANONICAL_PATH,
    schema,
  });

  return (
    <Layout>
      <article className="max-w-3xl mx-auto w-full">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/50">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">&rsaquo;</li>
            <li>
              <Link to="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">&rsaquo;</li>
            <li className="text-white/80 truncate max-w-[220px]" aria-current="page">
              OpenPharmacy vs Scripty
            </li>
          </ol>
        </nav>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {["Comparison", "Scripty", "eScript Wallet", "Offline", "ADHA", "Security"].map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* H1 */}
        <h1 className="font-grifter text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3">
          {TITLE}
        </h1>

        {/* Subtitle */}
        <p className="text-white/60 text-base md:text-lg mb-6">
          Both are independent Australian eScript wallets, not tied to a pharmacy chain. Here&rsquo;s how they differ on the features that matter.
        </p>

        {/* Last verified */}
        <p className="text-xs text-white/40 mb-8">Last verified: March 2026</p>

        {/* Body */}
        <div className="prose-blog text-white/85 leading-relaxed space-y-6 text-base md:text-lg">

          {/* Opening answer capsule */}
          <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
            OpenPharmacy and Scripty are the two most directly comparable dedicated eScript wallets
            available to Australian patients. Both are ADHA-conformant, free, and work across iOS
            and Android. The key difference: OpenPharmacy stores scripts on-device for guaranteed
            offline access without any syncing step, while Scripty connects to your Active Script
            List (ASL) for automatic script updates. The right choice depends on how you want to
            add and access your scripts.
          </p>

          {/* Comparison table */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Feature Comparison at a Glance
          </h2>
          <p className="text-white/75 text-sm">
            All data verified March 2026 against published app documentation and the ADHA
            ePrescribing Conformance Register.
          </p>
          <ComparisonTable />

          {/* Section: Offline access */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Offline Access and Reliability
          </h2>
          <p className="text-white/80 leading-relaxed">
            OpenPharmacy stores prescription QR codes directly on your device using on-device
            storage. No internet connection is needed at any point to view or present a script at
            the pharmacy: not for setup, not for retrieval, not for QR display. The app works in
            full airplane mode and in areas with no mobile reception at all.
          </p>
          <p className="text-white/80 leading-relaxed">
            Scripty also supports offline QR access, but with an important distinction: the initial
            connection to your Active Script List requires an internet connection and a visit to a
            participating pharmacy to complete the identity verification step. Once scripts are
            synced and loaded, Scripty does allow offline display. For users in rural or regional
            areas where connectivity is unreliable from the start, OpenPharmacy&rsquo;s manual token
            entry model removes the dependency entirely: you add scripts as they arrive via SMS
            or email, no sync required.
          </p>

          {/* Section: Script import */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            How Each App Imports Scripts: Manual Entry vs ASL Sync
          </h2>
          <p className="text-white/80 leading-relaxed">
            When your doctor sends an eScript, you typically receive it as a QR code or token link
            via SMS or email. OpenPharmacy uses these tokens directly: scan the QR code or paste
            the token link to add a script to your wallet. Every script you add is a deliberate
            action: you know exactly what is in your wallet and when it was added.
          </p>
          <p className="text-white/80 leading-relaxed">
            Scripty takes a different approach through ASL (Active Script List) integration. After
            completing the one-time setup (which requires visiting a pharmacy and providing
            100 points of identification to register with the ASL), new prescriptions and repeats
            automatically appear in Scripty whenever your prescriber sends them. If you take
            multiple medications and want them to appear in your wallet without manually handling
            each token, ASL sync is a genuine convenience.
          </p>
          <p className="text-white/80 leading-relaxed">
            Both apps also support manual token entry, so Scripty users who receive a script as an
            SMS token can still add it directly without waiting for an ASL sync.
          </p>

          {/* Section: Security */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Security and Encryption
          </h2>
          <p className="text-white/80 leading-relaxed">
            Both apps meet the Australian Digital Health Agency&rsquo;s security requirements for
            handling electronic prescription data, and both are listed on the ADHA ePrescribing
            Conformance Register: the official register of apps assessed as meeting national
            standards.
          </p>
          <p className="text-white/80 leading-relaxed">
            OpenPharmacy uses ASD-approved (Australian Signals Directorate) end-to-end encryption
            and enforces a mandatory 4-digit PIN every time the app is opened. All data is stored
            on Australian servers and is never shared with third parties. The mandatory PIN
            requirement is a deliberate design choice: unlike apps where a lock is optional,
            OpenPharmacy requires it for every session.
          </p>
          <p className="text-white/80 leading-relaxed">
            Scripty uses end-to-end encryption and stores data exclusively on Australian servers.
            Its app lock is optional: users can enable biometric authentication (Face ID or
            fingerprint) but are not required to. Both apps are developed by independent Australian
            companies and are not affiliated with pharmacy chains.
          </p>

          {/* Section: Family */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Family and Carer Features
          </h2>
          <p className="text-white/80 leading-relaxed">
            Both OpenPharmacy and Scripty support managing scripts for family members within a
            single account. You can create separate profiles for children, elderly parents, or
            a partner, and store and present QR codes on their behalf at any Australian pharmacy.
          </p>
          <p className="text-white/80 leading-relaxed">
            In OpenPharmacy, family scripts are added manually using each person&rsquo;s eScript token.
            This keeps the process straightforward: you receive the token, scan it, and it is
            saved under the correct family profile. In Scripty, family management can be extended
            through ASL connections: if a family member&rsquo;s scripts are linked to Scripty&rsquo;s ASL
            integration, their new scripts can also auto-sync. The setup process for each family
            member requires the same initial pharmacy visit and identity verification step.
          </p>

          {/* Section: Privacy */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Privacy and Data Practices
          </h2>
          <p className="text-white/80 leading-relaxed">
            A meaningful difference between the two apps is the degree to which they connect to
            national health infrastructure. OpenPharmacy operates as a self-contained on-device
            wallet: your prescription data is stored locally, encrypted, and on Australian servers.
            The app does not connect to the ASL or any centralised government system. For users who
            prefer to keep their prescription history off shared networks, this is OpenPharmacy&rsquo;s
            strongest privacy argument.
          </p>
          <p className="text-white/80 leading-relaxed">
            Scripty connects to the Active Script List, which means granting the app authorised
            access to your prescribing history through the national ASL infrastructure. This is
            the mechanism that makes auto-sync possible, and it is a legitimate and regulated
            connection, but it does represent a wider data footprint than a standalone wallet.
            Scripty stores its cloud data exclusively in Australia and publishes a privacy policy
            covering its data handling practices.
          </p>
          <p className="text-white/80 leading-relaxed">
            Neither app shares prescription data with third parties or pharmacy chains. Both are
            pharmacy-agnostic: you take your QR code to whichever pharmacy you choose.
          </p>

          {/* Section: Who should choose OpenPharmacy */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Who Should Choose OpenPharmacy
          </h2>
          <p className="text-white/80 leading-relaxed">
            OpenPharmacy is the better fit if any of the following describes you:
          </p>
          <ChoiceList
            items={[
              "You want guaranteed offline access without needing to set up ASL connectivity first: scripts are accessible the moment you add them, with no sync step ever required.",
              "You live or travel in rural or regional Australia, or anywhere with patchy or unreliable mobile reception, and need scripts available even with no signal.",
              "You prefer not to connect your prescription history to the national Active Script List network and want a self-contained on-device wallet.",
              "You want a mandatory app lock: OpenPharmacy requires a 4-digit PIN every time the app is opened, with no option to skip it.",
              "You manage scripts for family members and want a simple, manual process: receive the token, scan it, done.",
              "You want to get started immediately with no pharmacy visit or identity verification required to set up the app.",
            ]}
          />

          {/* Section: Who should choose Scripty */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Who Should Choose Scripty
          </h2>
          <p className="text-white/80 leading-relaxed">
            Scripty is the better fit if the following describes you:
          </p>
          <ChoiceList
            items={[
              "You want scripts to appear in your wallet automatically after each doctor visit, without manually handling each token link: ASL auto-sync delivers this once setup is complete.",
              "You take multiple medications and tracking each individual token is cumbersome. ASL sync means new prescriptions and repeats arrive in your wallet without any action on your part.",
              "You are comfortable completing the one-time ASL registration at a pharmacy (100 points of ID required) in exchange for fully automated script delivery going forward.",
              "You want TGA-sourced medicine shortage alerts to notify you if one of your medications is affected by a national supply issue.",
              "You are happy with optional rather than mandatory app security: biometric lock is available but not enforced.",
            ]}
          />

          {/* Verdict */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Verdict: Two Different Philosophies
          </h2>
          <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
            Neither app is universally better: they serve different preferences. OpenPharmacy
            prioritises privacy-first offline storage: your scripts live on your device, no
            network connection or government system integration is ever required. Scripty
            prioritises automatic sync convenience: connect once to your ASL, and your prescription
            wallet stays current without any manual input. Choose based on how you want to add
            scripts and how important offline independence is to you.
          </p>
          <p className="text-white/80 leading-relaxed mt-4">
            If you take a small number of medications and value simplicity and control,
            OpenPharmacy&rsquo;s manual entry model is fast and straightforward. If you manage many
            repeat prescriptions and want them to appear automatically, Scripty&rsquo;s ASL integration
            saves meaningful time. Both are ADHA-conformant, both store data in Australia, and
            both are free.
          </p>

          {/* Internal links to cluster */}
          <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-2">
            <p className="text-sm font-semibold text-white/70 mb-3">Related guides</p>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/blog/best-escript-apps-australia-2026"
                  className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
                >
                  Best eScript Apps in Australia (2026): Full comparison including MedAdvisor and the my health app
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
              <li>
                <Link
                  to="/blog/what-is-adha-conformance-australia"
                  className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
                >
                  What Is ADHA Conformance? Why it matters before you trust an app with your prescriptions
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/managing-family-escripts-australia-carers-parents"
                  className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
                >
                  Managing Family eScripts in Australia: A practical guide for parents and carers
                </Link>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-12 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {FAQ_ITEMS.map((item, i) => (
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
              Store, manage, and present your eScripts at any Australian pharmacy. Works completely
              offline. ADHA conformant. All data stored in Australia. No pharmacy activation required.
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

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <Link
              to="/blog"
              className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm font-medium"
            >
              &larr; Back to all guides
            </Link>
          </div>

        </div>
      </article>
    </Layout>
  );
}

export default OpenPharmacyVsScripty;
