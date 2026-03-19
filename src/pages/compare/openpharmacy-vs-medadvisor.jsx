// src/pages/compare/openpharmacy-vs-medadvisor.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { usePageMeta } from "../../hooks/usePageMeta";

const SLUG = "openpharmacy-vs-medadvisor";
const CANONICAL_PATH = `/compare/${SLUG}`;
const PAGE_URL = `https://openpharmacy.com${CANONICAL_PATH}`;
const DATE = "2026-03-19";
const TITLE = "OpenPharmacy vs MedAdvisor: Which Is Right for You?";
const DESCRIPTION =
  "Comparing OpenPharmacy and MedAdvisor for Australian patients. OpenPharmacy is a privacy-first eScript wallet with offline access and no pharmacy affiliation. MedAdvisor is a pharmacy engagement platform with ordering, delivery, and pill reminders. Find out which suits you.";

// ─── Comparison table data ────────────────────────────────────────────────────

const TABLE_HEADERS = ["Feature", "OpenPharmacy", "MedAdvisor"];
const TABLE_ROWS = [
  ["Offline access", "Full: works in airplane mode, no internet ever required", "No: requires internet for all functions"],
  ["Script import method", "Manual eScript token entry or QR scan", "Pharmacy-connected: requires pharmacist activation to sync medications"],
  ["ADHA conformance (eScript wallet)", "Yes: listed on ADHA ePrescribing Conformance Register", "Not independently conformant as an eScript wallet in the same way"],
  ["Pharmacist activation required", "No: download and use immediately", "Yes: must be activated by a pharmacist before core features work"],
  ["Pharmacy affiliation", "None: works with any Australian pharmacy", "Connected to your chosen pharmacy network (5,500+ pharmacies)"],
  ["Prescription ordering / delivery", "No", "Yes: pre-ordering, refill ordering, home delivery option"],
  ["Pill reminders", "No", "Yes"],
  ["Family profiles", "Yes", "Yes (carer mode)"],
  ["App lock type", "Mandatory 4-digit PIN every session", "Optional biometric login"],
  ["Data storage location", "Australian servers, never shared with third parties", "Linked to your connected pharmacy"],
  ["Price", "Free", "Free"],
  ["Platforms", "iOS + Android", "iOS + Android"],
];

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: "Does OpenPharmacy work without a pharmacist activating it?",
    answer:
      "Yes. OpenPharmacy requires no pharmacist activation and no registration process beyond downloading the app. You can add your first eScript token the moment the app is installed. MedAdvisor works differently: it must be activated by a pharmacist at your chosen pharmacy before you can connect your medications or place orders. This is not a flaw in MedAdvisor's design (the activation step is how it links your account to your pharmacy's dispensing system), but it does mean there is a setup dependency that OpenPharmacy does not have.",
  },
  {
    question: "Can I use both apps at the same time?",
    answer:
      "Yes. Nothing prevents you from using both OpenPharmacy and MedAdvisor simultaneously. Some people use OpenPharmacy as their offline-accessible eScript wallet for presenting QR codes at any pharmacy, and MedAdvisor to pre-order refills and set pill reminders at their regular pharmacy. Because the two apps serve different primary purposes, they complement rather than duplicate each other. Your eScript token can be added to OpenPharmacy and also processed at a MedAdvisor-connected pharmacy.",
  },
  {
    question: "Does MedAdvisor work offline?",
    answer:
      "No. MedAdvisor requires an active internet connection for all functions. You cannot view prescription details, display a QR code, or access your medication list without connectivity. For most urban users with reliable mobile data this is not a practical problem, but it is a significant constraint for anyone in rural or regional Australia with patchy reception, or for any situation where you need to show a script at a pharmacy and your signal has dropped. OpenPharmacy stores QR codes on-device and works completely offline, including in full airplane mode.",
  },
  {
    question: "Is MedAdvisor ADHA conformant for eScript storage?",
    answer:
      "MedAdvisor is not independently listed on the Australian Digital Health Agency ePrescribing Conformance Register as an eScript wallet in the same way OpenPharmacy is. MedAdvisor is a pharmacy engagement and ordering platform: its core function is connecting patients to a specific pharmacy's dispensing system rather than acting as a standalone, pharmacy-independent eScript wallet. OpenPharmacy is specifically designed and assessed as an eScript wallet, which is the category evaluated for ADHA Conformance Register listing.",
  },
  {
    question: "Which app is better for rural Australians?",
    answer:
      "OpenPharmacy is the stronger choice for rural and regional users. Scripts are stored on-device and QR codes are accessible with zero internet connection. There is no activation visit required, no sync step, and no dependency on mobile data at the moment of dispensing. MedAdvisor requires internet for all functions, which makes it unreliable in areas with poor reception. If you have a regular pharmacy in town and reliable internet when you visit, MedAdvisor's ordering features may still be useful to you. But for off-grid access to your own scripts, OpenPharmacy is the better fit.",
  },
  {
    question: "Do either apps charge fees?",
    answer:
      "No. Both OpenPharmacy and MedAdvisor are free to download and use on iOS and Android. Neither charges subscription fees. OpenPharmacy has no in-app purchases at all. MedAdvisor's revenue model is based on pharmacy engagement rather than patient fees: pharmacies pay to be connected to the platform, which is why the app requires pharmacist activation to use its core ordering features. For patients, both apps cost nothing.",
  },
];

// ─── Schema ───────────────────────────────────────────────────────────────────

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
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://openpharmacy.com/blog/" },
          { "@type": "ListItem", position: 3, name: TITLE, item: PAGE_URL },
        ],
      },
      {
        "@type": "Product",
        "@id": "https://openpharmacy.com/#product",
        name: "OpenPharmacy",
        description:
          "A privacy-first Australian eScript wallet that stores electronic prescription QR codes on-device for guaranteed offline access. ADHA-conformant, end-to-end ASD-approved encrypted, mandatory PIN lock, and completely pharmacy-independent.",
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
        "@id": "https://mymedadvisor.com/#product",
        name: "MedAdvisor",
        description:
          "An Australian pharmacy engagement platform connecting patients to their chosen pharmacy. Features prescription ordering, home delivery, pill reminders, refill alerts, carer mode, and a 5,500+ pharmacy network. Requires pharmacist activation and internet connection.",
        url: "https://mymedadvisor.com",
        brand: {
          "@type": "Brand",
          name: "MedAdvisor",
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

// ─── Sub-components ───────────────────────────────────────────────────────────

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

// ─── Page component ───────────────────────────────────────────────────────────

function OpenPharmacyVsMedAdvisor() {
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
              OpenPharmacy vs MedAdvisor
            </li>
          </ol>
        </nav>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {["Comparison", "MedAdvisor", "eScript Wallet", "Offline", "Privacy", "Australia"].map((tag) => (
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
          MedAdvisor connects to over 95% of Australian pharmacies and is used by more than 3 million Australians. OpenPharmacy is an ADHA-conformant eScript wallet that works completely offline with no pharmacy affiliation. Here&rsquo;s how to decide which is right for you.
        </p>

        {/* Last verified */}
        <p className="text-xs text-white/40 mb-8">Last verified: March 2026</p>

        {/* Body */}
        <div className="prose-blog text-white/85 leading-relaxed space-y-6 text-base md:text-lg">

          {/* Opening answer capsule */}
          <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
            OpenPharmacy is a privacy-first eScript wallet: your prescriptions are stored on your
            device, accessible at any pharmacy without internet. MedAdvisor is a pharmacy engagement
            platform: it excels at ordering ahead, home delivery, and pill reminders, but requires
            pharmacist activation, an internet connection, and stays linked to a specific pharmacy.
            The right choice depends on whether you want offline independence or ordering convenience.
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

          {/* Section: The core difference */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            The Core Difference: eScript Wallet vs Pharmacy Platform
          </h2>
          <p className="text-white/80 leading-relaxed">
            These two apps solve different problems, and understanding that distinction makes the
            choice straightforward. <strong>OpenPharmacy is an eScript wallet.</strong> Its job is
            to hold your prescription QR codes securely on your device so you can present them at
            any pharmacy, any time, regardless of internet connectivity or pharmacy affiliation.
            You add a script by pasting the eScript token you receive from your doctor via SMS or
            email. That&rsquo;s the whole transaction.
          </p>
          <p className="text-white/80 leading-relaxed">
            <strong>MedAdvisor is a pharmacy engagement platform.</strong> It connects your account
            to a specific pharmacy (or pharmacy network), enabling you to order refills online, track
            deliveries, set medication reminders, and receive refill alerts. MedAdvisor reports that
            patients who use the app remain loyal to their connected pharmacy 97% of the time. That
            number is a feature, not a criticism: for people who have a regular pharmacy they trust
            and visit consistently, that loyalty makes the whole experience smoother. But for people
            who use different pharmacies, travel frequently, or live rurally, it signals a constraint
            worth understanding before you commit.
          </p>

          {/* Section: Offline access */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Offline Access: Where the Apps Diverge Most Sharply
          </h2>
          <p className="text-white/80 leading-relaxed">
            OpenPharmacy stores prescription QR codes directly on your device using on-device
            storage. No internet connection is required at any point: not to add a script, not to
            view it, not to display the QR code at the pharmacy counter. The app works completely
            in airplane mode. In areas with no mobile reception at all, your prescriptions are still
            right there.
          </p>
          <p className="text-white/80 leading-relaxed">
            MedAdvisor requires an active internet connection for everything. You cannot display
            your medication list, view a prescription, or interact with the app at all without
            connectivity. For most Australians in metropolitan areas with reliable data, this is
            rarely a practical problem. But if you live in rural or regional Australia, travel
            outside coverage zones, or have simply experienced the frustration of a pharmacy
            counter visit when your signal drops, it is a real limitation. Offline access is not
            a secondary feature: it is the difference between being able to fill your prescription
            or not.
          </p>

          {/* Section: Setup and activation */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Setup: Download and Go vs Pharmacist Activation
          </h2>
          <p className="text-white/80 leading-relaxed">
            OpenPharmacy has no setup barrier. Download the app, create a PIN, and add your first
            eScript token. The whole process takes under two minutes and requires no visit, no
            registration with a third party, and no approval from anyone. Your doctor sends you a
            token via SMS; you paste it into the app; it is stored and ready to present.
          </p>
          <p className="text-white/80 leading-relaxed">
            MedAdvisor requires pharmacist activation before its core features become available.
            You download the app, but to connect your medications and enable ordering, a pharmacist
            at your chosen pharmacy must activate your account. This links your MedAdvisor profile
            to that pharmacy&rsquo;s dispensing system, which is how ordering, delivery, and refill
            tracking become possible. It is a meaningful setup step that requires a physical pharmacy
            visit (or at minimum, coordinating with your pharmacy). If your regular pharmacist is
            familiar with MedAdvisor and can activate you quickly, the setup is minor. If not, it
            can be a delay.
          </p>

          {/* Section: Security and privacy */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Security, Privacy, and Data Practices
          </h2>
          <p className="text-white/80 leading-relaxed">
            OpenPharmacy is listed on the Australian Digital Health Agency (ADHA) ePrescribing
            Conformance Register, the official list of apps assessed as meeting national standards
            for handling electronic prescription data. The app uses end-to-end encryption approved
            by the Australian Signals Directorate (ASD), stores all data exclusively on Australian
            servers, and never shares prescription data with third parties, including pharmacies.
            Every session requires a mandatory 4-digit PIN. There is no option to skip the lock:
            it is enforced every time you open the app.
          </p>
          <p className="text-white/80 leading-relaxed">
            MedAdvisor operates a different data model by design. Because it is a pharmacy
            engagement platform, your prescription and medication data is connected to your chosen
            pharmacy. MedAdvisor offers biometric login as an optional convenience (not mandatory),
            and connects to 5,500+ pharmacies across Australia, representing more than 95% of the
            national network. The app is not independently listed on the ADHA ePrescribing
            Conformance Register as an eScript wallet in the same category as OpenPharmacy, because
            its primary function is pharmacy connectivity and ordering rather than standalone
            eScript storage.
          </p>
          <p className="text-white/80 leading-relaxed">
            For patients who are privacy-conscious about their prescription history being held by
            a pharmacy network, OpenPharmacy&rsquo;s model is the more contained option: your data
            stays on your device and on Australian servers, with no pharmacy visibility. For patients
            who want their pharmacy to have full visibility of their medication history in order to
            enable ordering and reminders, MedAdvisor&rsquo;s connected model is exactly what makes
            those features work.
          </p>

          {/* Section: MedAdvisor strengths */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Where MedAdvisor Is Genuinely Stronger
          </h2>
          <p className="text-white/80 leading-relaxed">
            MedAdvisor has more than 3 million users for good reasons. Its feature set goes well beyond
            what a pure eScript wallet provides:
          </p>
          <ChoiceList
            items={[
              "Prescription ordering and pre-ordering: send your script to the pharmacy before you leave home so it is ready when you arrive, with no queue wait.",
              "Home delivery: order medications for delivery directly to your door through participating pharmacies.",
              "Pill reminders: set alerts for when to take each medication, with customisable schedules.",
              "Refill alerts: get notified when a repeat is due, reducing the risk of running out.",
              "Carer mode: manage medications for family members, including visibility into their medication schedules.",
              "A pharmacy network of 5,500+ locations, covering more than 95% of Australian pharmacies, meaning almost any pharmacy you visit is likely already connected.",
            ]}
          />
          <p className="text-white/80 leading-relaxed mt-4">
            None of these features are available in OpenPharmacy. If ordering ahead, delivery, and
            medication reminders are priorities for you, MedAdvisor delivers them at a scale and
            polish that OpenPharmacy does not attempt to match.
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
              "You want your prescription QR codes available in full airplane mode, with no internet ever required: OpenPharmacy is the only option here.",
              "You live in rural or regional Australia where mobile reception is unreliable, and you need scripts accessible regardless of signal.",
              "You use different pharmacies depending on location, price, or availability, and do not want your prescription data tied to one pharmacy network.",
              "You want immediate setup with no pharmacist activation: download the app, add your token, done.",
              "You prioritise privacy and want prescription data held on your own device, not linked to a pharmacy's dispensing system.",
              "You want a mandatory PIN lock that cannot be bypassed: OpenPharmacy enforces a 4-digit PIN every session, with no option to skip it.",
              "You manage scripts for family members and want a straightforward manual process: receive the token from the doctor, add it to the family profile, present it at any pharmacy.",
            ]}
          />

          {/* Section: Who should choose MedAdvisor */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Who Should Choose MedAdvisor
          </h2>
          <p className="text-white/80 leading-relaxed">
            MedAdvisor is the better fit if the following describes you:
          </p>
          <ChoiceList
            items={[
              "You want to pre-order your prescriptions and skip queues at the pharmacy: MedAdvisor's ordering feature is one of its most useful for people with regular repeat medications.",
              "You want home delivery of your medications and your pharmacy participates in MedAdvisor's delivery network.",
              "You benefit from pill reminders to stay on schedule with multiple daily medications.",
              "You have a regular pharmacy you always use and are happy to link your account to their system.",
              "You want refill alerts so you never accidentally run out of a repeat prescription.",
              "You have reliable internet access and do not need offline functionality.",
            ]}
          />

          {/* Verdict */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Verdict: Different Tools for Different Needs
          </h2>
          <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
            OpenPharmacy and MedAdvisor are not really competing for the same user. OpenPharmacy is
            for patients who want a secure, offline-capable eScript wallet with no pharmacy
            affiliation and no activation required. MedAdvisor is for patients who want a full
            pharmacy service layer: ordering, delivery, reminders, and deep integration with a
            specific pharmacy. Knowing which type of tool you need makes the choice obvious.
          </p>
          <p className="text-white/80 leading-relaxed mt-4">
            It is also worth noting that using both is entirely reasonable. OpenPharmacy handles
            offline eScript storage and presentation at any pharmacy; MedAdvisor handles ordering,
            reminders, and delivery at your regular pharmacy. They serve different moments in the
            prescription journey and do not conflict with each other.
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
                  Best eScript Apps in Australia (2026): Full comparison including Scripty and the my health app
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/pharmacy-app-vs-independent-escript-wallet-australia"
                  className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
                >
                  Pharmacy App vs Independent eScript Wallet: What&rsquo;s the difference and which do you need?
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/escript-app-security-privacy-guide-australia"
                  className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
                >
                  eScript App Security and Privacy Guide: What to check before trusting an app with your prescriptions
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
                  to="/compare/openpharmacy-vs-scripty"
                  className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
                >
                  OpenPharmacy vs Scripty: comparing the two independent ADHA-conformant eScript wallets
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/managing-chronic-illness-escripts-australia"
                  className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
                >
                  Managing Chronic Illness Prescriptions in Australia: when a pharmacy app helps and when it doesn&rsquo;t
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
              offline. ADHA conformant. All data stored in Australia. No pharmacist activation required.
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

export default OpenPharmacyVsMedAdvisor;
