// src/pages/for/IndependentPharmacies.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { usePageMeta } from "../../hooks/usePageMeta";

const CANONICAL_PATH = "/for/independent-pharmacies";
const PAGE_URL = `https://openpharmacy.com${CANONICAL_PATH}`;
const DATE = "2026-06-29";
const TITLE =
  "Independent Australian Pharmacies: The eScript Wallet That Belongs to No Chain";
const DESCRIPTION =
  "OpenPharmacy is a pharmacy-neutral eScript wallet. No registration, no partner agreement, no IT setup. Recommend it to patients and keep them at your counter.";

// ─── FAQ data ──────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: "Do we need to sign up for anything to receive patient scripts?",
    answer:
      "No. OpenPharmacy requires nothing from your pharmacy. There is no registration form, no partner agreement, no software installation, and no cost. When a patient pre-sends their eScript token to you, it arrives as a standard ADHA-conformant QR code that your existing dispensing software reads exactly the same way it reads any other eScript. Nothing on your end needs to change.",
  },
  {
    question: "How does a pre-sent token arrive at our counter?",
    answer:
      "The patient uses OpenPharmacy to share their eScript token directly with your pharmacy. The token arrives as a standard electronic prescription token, and your dispensing software processes it the same way it processes any eScript. The patient can also simply walk in and show the QR code on their phone screen for you to scan. Either workflow uses exactly the same ADHA-standard token format.",
  },
  {
    question: "What if a patient sends us a token and then goes to a different pharmacy?",
    answer:
      "An eScript token can only be dispensed once. If a patient sends a token to your pharmacy and then presents the same script at a different pharmacy first, your dispensing software will show the token as already dispensed when you attempt to process it. The system works the same way regardless of which wallet the patient uses. The token format is standard; the dispensing rules are governed by the ADHA ePrescribing system, not by the app.",
  },
  {
    question: "Is OpenPharmacy free for patients?",
    answer:
      "Yes. OpenPharmacy is free to download and use on both iOS and Android. There are no subscription fees, no in-app purchases, and no premium tier. Patients do not need to create an account with any pharmacy to use the app. The only requirement is downloading it from the App Store or Google Play and setting a 4-digit PIN.",
  },
];

// ─── Benefit cards ─────────────────────────────────────────────────────────────

const BENEFIT_CARDS = [
  {
    label: "No pharmacy registration required",
    description:
      "Your pharmacy does not need to sign up, pay, or integrate with OpenPharmacy. Patients can present scripts at your counter from day one.",
  },
  {
    label: "Works with your existing dispensing software",
    description:
      "The eScript token a patient forwards from OpenPharmacy is the same ADHA-standard token your dispensing system already reads. No new tools, no configuration.",
  },
  {
    label: "Keeps patients pharmacy-agnostic, not chain-dependent",
    description:
      "A patient using OpenPharmacy is not directed toward any particular pharmacy. They can return to your counter every time, because no app is steering them elsewhere.",
  },
  {
    label: "ADHA-conformant tokens every time",
    description:
      "OpenPharmacy is registered on the ADHA ePrescribing Conformance Register. Every token it handles meets national standards, so your dispensing workflow is identical.",
  },
];

// ─── Dispensing workflow steps ──────────────────────────────────────────────────

const WORKFLOW_STEPS = [
  {
    name: "Patient stores their eScript in OpenPharmacy",
    text: "When a prescriber issues an eScript, the patient receives a token via SMS or email. They tap the link or paste the token into OpenPharmacy. The QR code is stored on their device, accessible offline. No pharmacy account is needed for this step.",
  },
  {
    name: "Patient arrives at your counter (or pre-sends the token)",
    text: "The patient either walks in and opens the app to show the QR code, or uses OpenPharmacy to forward the eScript token to your pharmacy ahead of their visit. Both methods produce the same standard ADHA token your dispensing software already handles.",
  },
  {
    name: "You scan the QR code as normal",
    text: "Your dispensing software reads the QR code and processes the prescription exactly as it would for any eScript. There is no extra step, no different workflow, and no system to log in to. Over 95% of Australian pharmacies already dispense eScripts; OpenPharmacy adds nothing new to that process.",
  },
  {
    name: "Script is dispensed, repeat is tracked",
    text: "The dispensing is recorded against the ADHA ePrescribing system in the usual way. If the patient has repeats remaining, they add the next token to OpenPharmacy when their prescriber issues it. Your counter sees a familiar patient at a familiar interval.",
  },
];

// ─── Who adopts it fastest ──────────────────────────────────────────────────────

const ADOPTION_SEGMENTS = [
  {
    label: "Patients with four or more active scripts",
    description:
      "Managing multiple tokens across SMS threads is the clearest pain point OpenPharmacy solves. These patients will ask about it once they know it exists.",
  },
  {
    label: "Carers managing scripts for a family member",
    description:
      "A parent or carer with scripts for two or three people benefits immediately from separate profiles in one app. One device, every script, any pharmacy.",
  },
  {
    label: "Anyone who has lost an SMS token",
    description:
      "That conversation starts itself. When a patient arrives without their token, mentioning OpenPharmacy is the natural next step before you call the prescriber.",
  },
];

// ─── Schema ──────────────────────────────────────────────────────────────────────

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
          name: "eScript wallet for independent Australian pharmacies",
        },
        isPartOf: {
          "@type": "WebSite",
          url: "https://openpharmacy.com",
          name: "OpenPharmacy",
        },
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
        mentions: [
          {
            "@type": "Organization",
            name: "Australian Digital Health Agency",
            url: "https://www.digitalhealth.gov.au",
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://openpharmacy.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Independent Pharmacies",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "Product",
        "@id": "https://openpharmacy.com/#product",
        name: "OpenPharmacy",
        description:
          "An ADHA-conformant Australian eScript wallet that is pharmacy-neutral. Requires no pharmacy registration, partner agreement, or IT integration. Patients can present scripts at any Australian pharmacy.",
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
        name: "How the dispensing workflow works with an OpenPharmacy eScript token",
        description:
          "Four steps showing how an independent pharmacy receives and dispenses an eScript token from a patient using OpenPharmacy.",
        totalTime: "PT3M",
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

// ─── Sub-components ───────────────────────────────────────────────────────────────

function BenefitCard({ label, description }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-sm font-semibold text-[var(--color-accent)] mb-2">
        {label}
      </p>
      <p className="text-white/75 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function AdoptionCard({ label, description }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-sm font-semibold text-[var(--color-accent)] mb-2">
        {label}
      </p>
      <p className="text-white/75 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function ComparisonCallout() {
  return (
    <div className="my-8 rounded-xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)] mb-3">
        Two models, two outcomes for your pharmacy
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-semibold text-white mb-2">
            Pharmacy-network activation model
          </p>
          <ul className="space-y-1 text-sm text-white/70">
            <li>Patients activate through a specific partner pharmacy</li>
            <li>App interface may suggest or default to that network&apos;s dispensing services</li>
            <li>Pharmacy must be registered in the partner network to benefit</li>
            <li>Independent pharmacies are outside the network</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-2">
            Pharmacy-agnostic model (OpenPharmacy)
          </p>
          <ul className="space-y-1 text-sm text-white/70">
            <li>No pharmacy activation or partner registration required</li>
            <li>Patient presents their QR code at any pharmacy they choose</li>
            <li>No app interface directing patients toward a specific network</li>
            <li>Your counter is on equal footing with every other pharmacy in Australia</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────────

function IndependentPharmacies() {
  const schema = useMemo(() => buildSchema(FAQ_ITEMS, WORKFLOW_STEPS), []);

  usePageMeta({
    title:
      "eScript Wallet for Independent Australian Pharmacies | OpenPharmacy",
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
            <li
              className="text-white/80 truncate max-w-[260px]"
              aria-current="page"
            >
              Independent Pharmacies
            </li>
          </ol>
        </nav>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            "Independent Pharmacy",
            "Community Pharmacy",
            "eScripts",
            "Patient Loyalty",
            "Digital Health",
            "Australia",
          ].map((tag) => (
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

        {/* Last updated */}
        <p className="text-xs text-white/40 mb-8">Updated June 2026</p>

        {/* Body */}
        <div className="prose-blog text-white/85 leading-relaxed space-y-6 text-base md:text-lg">

          {/* Article-level answer capsule */}
          <p className="text-white/90 text-base md:text-lg leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
            OpenPharmacy is a pharmacy-neutral eScript wallet that carries no partnership
            with any pharmacy chain, requires no registration on your side, and never steers
            patients toward a specific dispensing service. Any patient using it can present
            their QR code at your counter without any setup from you, using the same
            ADHA-standard scan your dispensing software already handles.
          </p>

          {/* ─── Section 1 ─── */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Why Apps Tied to a Pharmacy Network Work Against Your Business
          </h2>

          {/* Section 1 answer capsule */}
          <p className="text-white/80 leading-relaxed">
            Apps that require a pharmacy-network activation step direct patients toward a
            specific chain before they ever fill a script at your counter. OpenPharmacy
            requires no such activation: patients download it, add their tokens, and
            present at whichever pharmacy they choose (including yours) with no prior
            registration or agreement from anyone.
          </p>

          <p className="text-white/80 leading-relaxed">
            Some eScript apps require patients to activate through a specific partner pharmacy and
            to agree to that network&apos;s terms before the app is fully functional. That activation
            step is not neutral. It creates a relationship between the patient and a particular
            pharmacy network, and the app interface reinforces that relationship at every use.
          </p>
          <p className="text-white/80 leading-relaxed">
            For a patient registered through a large chain&apos;s app, the path of least resistance is
            dispensing through that chain. The app may surface that chain&apos;s locations, prompt
            delivery through that network, or simply feel like part of that brand&apos;s commercial
            system. As an independent pharmacy, you are not inside that system. Your patients who
            use those apps are not your patients in any meaningful repeat-dispensing sense.
          </p>
          <p className="text-white/80 leading-relaxed">
            Apps that operate on a pharmacy-network activation model, where the patient&apos;s account
            is anchored to a specific partner pharmacy, are structured in a way that is
            commercially useful to that network. Independent pharmacies cannot join those networks
            on equal terms, and they should not need to.
          </p>

          <ComparisonCallout />

          {/* ─── Section 2 ─── */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            How OpenPharmacy Works at Your Counter
          </h2>

          {/* Section 2 answer capsule */}
          <p className="text-white/80 leading-relaxed">
            OpenPharmacy requires nothing from your pharmacy to start receiving patient scripts.
            There is no registration form, no partner agreement, no IT integration, and no cost.
            The app delivers a standard ADHA-conformant eScript token that your existing
            dispensing software reads the same way it reads any other eScript.
          </p>

          <p className="text-white/80 leading-relaxed">
            The eScript token that a patient forwards from OpenPharmacy is a standard{" "}
            <a
              href="https://www.digitalhealth.gov.au/initiatives-and-programs/electronic-prescriptions/conformance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:opacity-80 transition-opacity"
            >
              ADHA-conformant
            </a>{" "}
            QR code. Your dispensing software reads it exactly the same way it reads any eScript
            token delivered by SMS or email. More than 95% of Australian pharmacies already
            dispense eScripts; OpenPharmacy does not introduce a new format, a new system, or a
            new step. Your team does not need training for it.
          </p>
          <p className="text-white/80 leading-relaxed">
            Patients can present scripts in two ways: by opening the app and holding their phone
            up to your scanner (standard QR display), or by pre-sending the token to your pharmacy
            before they arrive. Either way, your workflow is unchanged. The app is invisible to
            your counter; all you see is a valid eScript token.
          </p>

          {/* Benefit cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {BENEFIT_CARDS.map((card, i) => (
              <BenefitCard key={i} label={card.label} description={card.description} />
            ))}
          </div>

          {/* ─── Section 3 ─── */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            Patient Loyalty and Repeat Dispensing
          </h2>

          {/* Section 3 answer capsule */}
          <p className="text-white/80 leading-relaxed">
            Recommending OpenPharmacy to your chronic-condition patients protects repeat dispensing
            revenue because the app has no pharmacy affiliation: nothing in it pulls those patients
            toward a competitor. A patient filling three to six scripts a month who stores them in
            OpenPharmacy will keep returning to whichever pharmacy they prefer, and preference
            favors the pharmacy where staff know their name.
          </p>

          <p className="text-white/80 leading-relaxed">
            Consider a patient who collects monthly scripts for blood pressure, cholesterol, and a
            thyroid condition. That patient currently digs through SMS threads to find three
            separate tokens each visit. You mention OpenPharmacy once. They download it, add all
            three tokens in under two minutes, and from that point bring their phone to your counter
            instead of a clutch of screenshots. That moment, at your dispensing window, is what
            builds the habit.
          </p>
          <p className="text-white/80 leading-relaxed">
            A patient using a chain-affiliated app is, over time, a patient whose dispensing habits
            are shaped by that app&apos;s interface. A patient using OpenPharmacy chooses their pharmacy
            based on proximity and personal service, both of which favor the local independent.
            Your pharmacy wins on those terms; you lose that contest when the app itself becomes
            the deciding factor.
          </p>
          <p className="text-white/80 leading-relaxed">
            OpenPharmacy also supports{" "}
            <Link
              to="/blog/managing-chronic-illness-escripts-australia"
              className="text-[var(--color-accent)] hover:opacity-80 transition-opacity"
            >
              family and carer management
            </Link>
            , so a single patient can manage scripts for children and elderly parents in one app.
            That household relationship, established at your counter, is worth considerably more
            than a single dispensing.
          </p>

          {/* Pull quote */}
          <blockquote className="not-prose my-8 pl-5 border-l-4 border-[var(--color-accent)]/40">
            <p className="text-lg text-white/90 leading-relaxed font-medium">
              &ldquo;A patient using OpenPharmacy chooses their pharmacy based on proximity and
              personal service. Nothing in the app is steering them elsewhere.&rdquo;
            </p>
          </blockquote>

          {/* ─── Section 4 ─── */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            How the Dispensing Workflow Looks
          </h2>

          {/* Section 4 answer capsule */}
          <p className="text-white/80 leading-relaxed">
            For your team at the counter, the dispensing workflow with an OpenPharmacy token is
            identical to any other eScript. A patient who pre-sent their token before arriving and
            a patient who walks in and holds up their phone both produce the same QR code your
            scanner has always read. The four steps below describe the full arc, from the
            patient&apos;s first token save to your dispensing confirmation.
          </p>

          <div className="space-y-4 mt-6">
            {WORKFLOW_STEPS.map((step, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
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
            OpenPharmacy is registered on the{" "}
            <a
              href="https://www.digitalhealth.gov.au/initiatives-and-programs/electronic-prescriptions/conformance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:opacity-80 transition-opacity"
            >
              ADHA ePrescribing Conformance Register
            </a>
            . That listing confirms the app has been assessed against national standards for
            handling electronic prescription data. Your dispensing system can process every
            token it generates with full confidence that it meets ADHA requirements.
          </p>

          {/* ─── Section 5 ─── */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-10 mb-3">
            How to Introduce OpenPharmacy to Your Patients
          </h2>

          {/* Section 5 answer capsule */}
          <p className="text-white/80 leading-relaxed">
            The most effective moment to mention OpenPharmacy is at the dispensing point, when
            a patient hands over a phone showing an SMS token or asks you to call their prescriber
            about a deleted script. That is when the problem OpenPharmacy solves is physically
            in front of them, and a brief mention of a simpler option lands without needing
            to be a sales pitch.
          </p>

          <p className="text-white/80 leading-relaxed">
            A practical introduction at the counter sounds like this: <strong>&ldquo;If you&apos;re managing
            a few ongoing scripts, there&apos;s a free app called OpenPharmacy that stores all of them
            in one place so you don&apos;t need to dig through your SMS each time. It works at any
            pharmacy, including here.&rdquo;</strong> That last phrase, &ldquo;including here,&rdquo; is worth saying
            explicitly. Patients often assume an app is tied to a chain.
          </p>
          <p className="text-white/80 leading-relaxed">
            A counter card near the dispensing window is also effective for chronic-condition
            patients who visit regularly. A simple card reading &ldquo;Store all your eScripts in one
            free app, works at any pharmacy&rdquo; with the OpenPharmacy name removes the explanation
            burden from your team. You can point to the card rather than starting from scratch
            each time a relevant patient comes in.
          </p>

          {/* Adoption segments — visual element for Section 5 */}
          <p className="text-sm font-semibold text-white/60 uppercase tracking-wide mt-2">
            Patients most likely to adopt it quickly
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
            {ADOPTION_SEGMENTS.map((seg, i) => (
              <AdoptionCard key={i} label={seg.label} description={seg.description} />
            ))}
          </div>

          {/* Internal links */}
          <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-2">
            <p className="text-sm font-semibold text-white/70 mb-3">Related reading</p>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/blog/pharmacy-app-vs-independent-escript-wallet-australia"
                  className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
                >
                  Pharmacy App vs Independent eScript Wallet: What the difference means for Australian patients
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
                  to="/blog/managing-chronic-illness-escripts-australia"
                  className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
                >
                  Managing Chronic Illness eScripts in Australia: A guide for patients with multiple ongoing prescriptions
                </Link>
              </li>
              <li>
                <Link
                  to="/compare/openpharmacy-vs-medadvisor"
                  className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
                >
                  OpenPharmacy vs MedAdvisor: A side-by-side comparison
                </Link>
              </li>
              <li>
                <a
                  href="/for/pharmacies"
                  className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm"
                >
                  OpenPharmacy for Pharmacies: The complete guide for dispensing teams
                </a>
              </li>
            </ul>
          </div>

          {/* CTA block */}
          <div className="mt-12 rounded-2xl bg-[var(--color-secondary)] border border-white/10 p-6 md:p-8">
            <h2 className="font-grifter text-xl md:text-2xl font-bold text-white mb-2">
              See how OpenPharmacy works, or share it with your patients today
            </h2>
            <p className="text-white/70 text-sm md:text-base mb-6 max-w-lg">
              No pharmacy registration required. No cost. No change to your dispensing workflow.
              Free for patients on iOS and Android.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
              >
                How OpenPharmacy Works
              </Link>
              <a
                href="/blog/how-to-send-escript-to-pharmacy-australia"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm"
              >
                Patient guide: how to send a script to your pharmacy
              </a>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-white/50 mb-3">Share the app with your patients:</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://apps.apple.com/au/app/openpharmacy/id6751562406"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 font-medium px-5 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-xs"
                  aria-label="Download OpenPharmacy on the App Store"
                >
                  Download on the App Store (iOS)
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.openpharmacy.production&hl=en_AU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 font-medium px-5 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-xs"
                  aria-label="Get OpenPharmacy on Google Play"
                >
                  Get it on Google Play (Android)
                </a>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <h2 className="font-grifter text-2xl font-bold text-white mt-12 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i}>
                <h3 className="text-base font-semibold text-white mb-2">
                  {item.question}
                </h3>
                <p className="text-white/80 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>

        </div>
      </article>
    </Layout>
  );
}

export default IndependentPharmacies;
