// src/pages/for/RuralAustralia.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { usePageMeta } from "../../hooks/usePageMeta";

const CANONICAL_PATH = "/for/rural-australia";
const PAGE_URL = `https://openpharmacy.com${CANONICAL_PATH}`;
const DATE = "2026-03-19";
const TITLE = "eScripts Without Internet: A Guide for Australians in Rural and Remote Areas";
const DESCRIPTION =
  "OpenPharmacy stores prescription QR codes on your device so they work offline, anywhere in Australia — no mobile reception required. The eScript app built for rural, remote, and regional Australians.";

// ─── FAQ data ────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: "Does OpenPharmacy work without any internet at all?",
    answer:
      "Yes. Once you have added an eScript token to OpenPharmacy, the prescription QR code is stored permanently on your device using on-device storage. No internet connection is needed to open the app, view your scripts, or display the QR code at the pharmacy counter. The app works completely in airplane mode. If you have never had signal at your location and you open OpenPharmacy, your scripts are all right there.",
  },
  {
    question: "What if I don't have reception when my doctor sends my eScript?",
    answer:
      "Your eScript token arrives via SMS or email from your doctor. You need a brief connection to receive that message — but that connection does not have to happen at the pharmacy. You can receive the token in town, at the clinic, or wherever you next have signal, then open OpenPharmacy and add the token. From that point, the script is stored on your device and no further internet is ever needed. The gap between receiving the token and adding it to the app can be hours or even days: the token does not expire just from sitting in your inbox.",
  },
  {
    question: "Does OpenPharmacy work at any pharmacy in Australia?",
    answer:
      "Yes. OpenPharmacy is not affiliated with any specific pharmacy chain. Your eScript QR code can be scanned at any Australian pharmacy that participates in the electronic prescribing system, which includes virtually all pharmacies nationwide. You are not locked into a particular chemist, and there is no activation visit or registration required at any pharmacy before you can use the app.",
  },
  {
    question: "What if there is a shortage of my medication at the rural pharmacy?",
    answer:
      "OpenPharmacy lets you share your eScript securely with a different pharmacy — including one in another town — without needing to physically travel there first. From within the app, you can send the script to a family member or carer who can present it on your behalf at a pharmacy that does have stock. The script is not locked to a single dispensing location unless it has already been partially dispensed.",
  },
];

// ─── HowTo steps ─────────────────────────────────────────────────────────────

const SETUP_STEPS = [
  {
    name: "Receive your eScript token",
    text: "When your doctor issues an electronic prescription, they send you a token — a short code or link — via SMS or email. You receive this whenever you next have phone reception or data access. You do not need to be at the pharmacy to receive it.",
  },
  {
    name: "Open OpenPharmacy and add the token",
    text: "Open the OpenPharmacy app and tap 'Add Script'. Paste or scan your eScript token. The app reads the token, downloads the prescription details, and stores the QR code directly on your device. This step requires a brief internet connection — the same one that delivered the SMS or email.",
  },
  {
    name: "Present your QR code at any pharmacy",
    text: "When you arrive at the chemist, open OpenPharmacy and select your script. The QR code appears on screen. Hand your phone to the pharmacist or hold it up to their scanner. No internet connection is needed at this step — the QR code is already on your device.",
  },
];

// ─── Schema ──────────────────────────────────────────────────────────────────

function buildSchema(faqItems, steps) {
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
        about: {
          "@type": "Thing",
          name: "Electronic prescriptions in rural and remote Australia",
        },
        isPartOf: {
          "@type": "WebSite",
          url: "https://openpharmacy.com",
          name: "OpenPharmacy",
        },
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
        mentions: [
          { "@type": "Place", name: "Rural Australia" },
          { "@type": "Place", name: "Remote Australia" },
          { "@type": "Place", name: "Regional Australia" },
          { "@type": "Organization", name: "Australian Digital Health Agency", url: "https://www.digitalhealth.gov.au" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://openpharmacy.com/" },
          { "@type": "ListItem", position: 2, name: "Rural Australia", item: PAGE_URL },
        ],
      },
      {
        "@type": "Product",
        "@id": "https://openpharmacy.com/#product",
        name: "OpenPharmacy",
        description:
          "An ADHA-conformant Australian eScript wallet that stores electronic prescription QR codes on-device for guaranteed offline access. Works in rural, remote, and regional Australia with no internet connection required to view or present scripts.",
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
        "@type": "HowTo",
        "@id": `${PAGE_URL}#howto`,
        name: "How to set up OpenPharmacy for offline eScript access in rural Australia",
        description:
          "Three steps to add an eScript to OpenPharmacy so your QR code is accessible offline at any pharmacy in Australia.",
        totalTime: "PT5M",
        step: steps.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step.name,
          text: step.text,
        })),
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

function CheckList({ items }) {
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

function ScenarioCard({ number, title, description }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-xs font-semibold text-[var(--color-accent)] mb-1">Scenario {number}</p>
      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/75 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

function RuralAustralia() {
  const schema = useMemo(() => buildSchema(FAQ_ITEMS, SETUP_STEPS), []);

  usePageMeta({
    title: "eScripts for Rural Australia: Offline Prescription Access | OpenPharmacy",
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
            <li className="text-white/80 truncate max-w-[260px]" aria-current="page">
              Rural and Remote Australia
            </li>
          </ol>
        </nav>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {["Rural Australia", "Offline Access", "Remote Areas", "eScripts", "Digital Health"].map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* H1 */}
        <h1 className="font-grifter text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
          {TITLE}
        </h1>

        {/* Last verified */}
        <p className="text-xs text-white/40 mb-8">Updated March 2026</p>

        {/* Body */}
        <div className="prose-blog text-white/85 leading-relaxed space-y-6 text-base md:text-lg">

          {/* Answer capsule */}
          <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
            OpenPharmacy is built for Australians in areas with unreliable mobile reception. Every
            prescription QR code is stored directly on your device from the moment you add it —
            no internet connection is ever needed to view or present your script at the pharmacy,
            including in full airplane mode.
          </p>

          {/* Section 1: Why internet-dependent systems fail */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Why Internet-Dependent Prescription Systems Fail in Rural Australia
          </h2>
          <p className="text-white/80 leading-relaxed">
            Most eScript delivery methods assume reliable connectivity. That assumption holds in
            Sydney or Melbourne. It does not hold across much of regional, rural, and remote
            Australia — and the failure modes are predictable.
          </p>
          <p className="text-white/80 leading-relaxed">
            <strong>SMS tokens</strong> arrive when you have reception. If you accidentally delete
            the message before adding it to an app, or if you need to retrieve it while standing in
            a pharmacy with no signal, you are stuck. Getting a token resent requires contacting your
            prescriber or the dispensing pharmacy — neither of which is simple from a remote location.
          </p>
          <p className="text-white/80 leading-relaxed">
            <strong>Email tokens</strong> require your phone to connect to Gmail, Outlook, or
            wherever your inbox lives. Inside a rural pharmacy building, underground, or in a mobile
            black spot, your email app will show a spinning wheel. The script is technically in your
            inbox — but inaccessible when you need it most.
          </p>
          <p className="text-white/80 leading-relaxed">
            <strong>Cloud-syncing apps</strong> download your scripts from a remote server each time
            you open them. If the server cannot be reached, the app cannot show you your
            prescriptions. Even apps that advertise "offline capability" may require an initial sync
            that demands a working connection before any script is accessible.
          </p>
          <p className="text-white/80 leading-relaxed">
            In rural and remote Australia, these failure points are not edge cases. They are the
            everyday reality for millions of Australians who live and work outside reliable coverage
            zones. An eScript system that depends on internet access is a system that will let you
            down at exactly the moment you need it.
          </p>

          {/* Section 2: How OpenPharmacy's offline-first architecture works */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            How OpenPharmacy's Offline-First Architecture Works
          </h2>
          <p className="text-white/80 leading-relaxed">
            OpenPharmacy is built around a single principle: <strong>your prescriptions live on your
            device, not on a remote server.</strong> When you add an eScript token to the app, the
            QR code and prescription details are downloaded once and stored in on-device storage.
            After that, no cloud connection is ever involved.
          </p>
          <p className="text-white/80 leading-relaxed">
            There is no background sync. There is no session expiry. There is no "please wait while
            we load your scripts." The QR code that is on your device today will still be on your
            device in six months, even if you have never had signal in that entire time. Open the
            app, select your script, show the code. That is the entire process at the pharmacy
            counter — and none of it touches the internet.
          </p>
          <p className="text-white/80 leading-relaxed">
            The only moment connectivity is needed is when you first add a new token. Your doctor
            sends you the token via SMS or email (requiring reception to receive). You open
            OpenPharmacy and paste the token (requiring a brief data connection to decode it). From
            that point forward, the script is yours, stored locally, accessible anywhere.
          </p>

          {/* Section 3: Real scenarios */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Real Situations Where This Matters
          </h2>
          <p className="text-white/80 leading-relaxed">
            These are not hypothetical. They are the situations that rural and remote Australians
            deal with regularly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <ScenarioCard
              number="1"
              title="Small rural pharmacy with no reliable WiFi"
              description="Many small-town pharmacies have intermittent internet. Your phone has no signal inside the building. With OpenPharmacy, the QR code is already on your device — the pharmacist scans it, and you are done. No connectivity needed by you or the app."
            />
            <ScenarioCard
              number="2"
              title="Underground or inside a building with no reception"
              description="Thick walls, basements, or reinforced structures kill mobile signal. Accessing an email inbox or a cloud-based app is impossible. OpenPharmacy opens and displays your script the same way it would outdoors with full bars."
            />
            <ScenarioCard
              number="3"
              title="Regional town during a telco or power outage"
              description="When mobile tower infrastructure goes down after a storm or infrastructure failure, cloud-based apps stop working. Your on-device scripts in OpenPharmacy are completely unaffected — they are not hosted anywhere outside your phone."
            />
            <ScenarioCard
              number="4"
              title="On the road between towns"
              description="Remote driving routes in Australia can mean hundreds of kilometres without a mobile signal. If you stop at a roadhouse or small-town pharmacy along the way, your OpenPharmacy scripts are ready to present without needing a connection."
            />
            <ScenarioCard
              number="5"
              title="Remote mine site or station"
              description="Fly-in, fly-out work, remote stations, and mine sites often have unreliable internet. Doctors may attend via telehealth or periodic visits. Scripts added to OpenPharmacy after a telehealth consultation remain fully accessible on site regardless of connectivity."
            />
          </div>

          {/* Section 4: Setup and use */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Setup: Three Steps, Then You're Done
          </h2>
          <p className="text-white/80 leading-relaxed">
            OpenPharmacy does not require a pharmacy visit to set up, no pharmacist activation, and
            no account registration with any third party. Download the app, set a 4-digit PIN, and
            add your first script. The whole process takes under two minutes.
          </p>
          <p className="text-white/80 leading-relaxed">
            Day-to-day, you do not need internet at all. The only time a connection is required is
            when you add each new eScript token — a brief step that can happen wherever you next
            have signal, not necessarily at the pharmacy.
          </p>

          <div className="space-y-4 mt-6">
            {SETUP_STEPS.map((step, i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)] font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">{step.name}</p>
                  <p className="text-white/75 text-sm leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-white/80 leading-relaxed mt-4">
            Once a script is in the app, it stays there until you archive it or the prescription
            itself is fully dispensed. You do not need to re-add it before each visit, and there is
            no expiry timer running in the background. Repeats are tracked separately: when a repeat
            is due, your doctor or pharmacist issues a new token, and you add it the same way.
          </p>

          {/* Section 5: Family scripts */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Managing Scripts for the Whole Household
          </h2>
          <p className="text-white/80 leading-relaxed">
            In rural and remote households, one person often manages the health needs of a whole
            family — children, elderly parents, partners, and sometimes extended family members.
            OpenPharmacy handles this through separate family profiles within the same app.
          </p>
          <p className="text-white/80 leading-relaxed">
            Each family member has their own profile. Scripts are added to the correct profile and
            stay organised separately. When you get to the pharmacy, you select the family member,
            select the script, and show the QR code. Everything is accessible offline, for every
            profile, with no internet required. If you manage five people's prescriptions, all five
            are available on a single device, ready at any time.
          </p>
          <p className="text-white/80 leading-relaxed">
            You can also share a script securely with a carer or family member — useful when someone
            else is making the pharmacy run while you are at work or cannot travel.
          </p>

          {/* Section 6: ADHA conformance */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Registered, Conformant, and Built to Australian Standards
          </h2>
          <p className="text-white/80 leading-relaxed">
            OpenPharmacy is not a workaround or a screenshot-based solution. It is a fully
            registered eScript wallet, listed on the{" "}
            <a
              href="https://www.digitalhealth.gov.au/initiatives-and-programs/electronic-prescriptions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:opacity-80 transition-opacity"
            >
              Australian Digital Health Agency (ADHA) ePrescribing Conformance Register
            </a>
            . This means the app has been independently assessed against national standards for
            handling electronic prescription data.
          </p>
          <p className="text-white/80 leading-relaxed">
            Security details worth knowing:
          </p>
          <CheckList
            items={[
              "End-to-end encryption approved by the Australian Signals Directorate (ASD)",
              "All prescription data stored exclusively on Australian servers (and on your device)",
              "A mandatory 4-digit PIN required every time the app is opened — it cannot be bypassed",
              "No prescription data shared with third parties, including pharmacies",
              "Developed and operated by Easy As Health Pty Ltd, based in Brisbane, Australia",
            ]}
          />
          <p className="text-white/80 leading-relaxed mt-4">
            ADHA conformance is the same standard that all legitimate eScript systems in Australia
            must meet. Using OpenPharmacy is not an unofficial workaround — it is one of the
            formally approved ways to manage electronic prescriptions in Australia.
          </p>
          <p className="text-white/80 leading-relaxed">
            For more detail on what ADHA conformance means and why it matters, see our{" "}
            <Link
              to="/blog/what-is-adha-conformance-australia"
              className="text-[var(--color-accent)] hover:opacity-80 transition-opacity"
            >
              ADHA conformance guide
            </Link>
            .
          </p>

          {/* CTA block */}
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
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm"
                aria-label="Get OpenPharmacy on Google Play"
              >
                Get it on Google Play
              </a>
            </div>
          </div>

          {/* Internal links */}
          <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-2">
            <p className="text-sm font-semibold text-white/70 mb-3">Related guides</p>
            <ul className="space-y-2">
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
                  What Is ADHA Conformance? What it means for your eScript app
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/managing-family-escripts-australia-carers-parents"
                  className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
                >
                  Managing Family eScripts in Australia: A guide for carers and parents
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/deleted-escript-sms-what-to-do-australia"
                  className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
                >
                  Deleted Your eScript SMS? Here's what to do next
                </Link>
              </li>
              <li>
                <Link
                  to="/compare/openpharmacy-vs-medadvisor"
                  className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
                >
                  OpenPharmacy vs MedAdvisor: Which is right for rural Australians?
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

        </div>
      </article>
    </Layout>
  );
}

export default RuralAustralia;
