// Homepage copy for src/pages/Main.jsx.
// Every claim here is rendered as visible text AND mirrored into the
// homepage JSON-LD (FAQPage / WebPage) by Main.jsx, so keep the strings
// factual and keep the FAQ answers self-contained.

export const content = {
  heading: {
    line1: "Digital Scripts,",
    line2: "Done Right",
  },
  description: {
    text: "A free, ADHA-conformant eScript wallet for Australia. Your prescription QR code is on your device, no signal needed at the chemist. Manage scripts for your whole family on iPhone or Android.",
  },

  // ─── Key facts band (value + label pairs) ───────────────────────────────
  facts: {
    eyebrow: "At a glance",
    heading: "What OpenPharmacy gives you",
    items: [
      {
        value: "Free",
        label: "No fees and no ads, on iPhone and Android",
      },
      {
        value: "ADHA listed",
        label: "App and API on the ePrescribing Conformance Register since 17 June 2025",
      },
      {
        value: "Offline",
        label: "QR codes stored on your device, working in full airplane mode",
      },
      {
        value: "Family",
        label: "Separate profiles for children, parents and anyone you care for",
      },
      {
        value: "Australia",
        label: "Data stored on Australian servers, never shared with third parties",
      },
      {
        value: "Any pharmacy",
        label: "No activation code, no chain account, no lock-in",
      },
    ],
  },

  // ─── Answer capsule ─────────────────────────────────────────────────────
  capsule: {
    text: "OpenPharmacy is a free eScript wallet app for Australian patients and carers, built by Easy As Health Pty Ltd in Brisbane. It stores electronic prescription tokens on your iPhone or Android phone, works offline at the pharmacy counter, manages scripts for your whole family, and is listed on the Australian Digital Health Agency ePrescribing Conformance Register.",
  },

  // ─── Feature cards ("[Feature]: [Benefit]") ─────────────────────────────
  features: {
    eyebrow: "Features",
    heading: "Built for the moments that matter",
    items: [
      {
        title: "Offline access",
        text: "Your prescription QR code lives on your phone, so it shows at the chemist with no reception at all.",
      },
      {
        title: "Family management",
        text: "Keep separate profiles for your kids, parents or partner, and share a script securely with a carer.",
      },
      {
        title: "ADHA conformant",
        text: "Independently assessed against national electronic prescribing standards and listed on the ADHA conformance register.",
      },
      {
        title: "Any pharmacy, no lock-in",
        text: "Fill at any Australian pharmacy in the eScript system. No activation visit and no pharmacy chain account.",
      },
      {
        title: "Active Script List sync",
        text: "Optional: link your MySL activation code and new scripts, repeats and paper scripts load automatically.",
      },
      {
        title: "Security by default",
        text: "ASD-approved end-to-end encryption, a mandatory 4-digit PIN, and data encrypted on your device while the app is closed.",
      },
    ],
  },

  // ─── FAQ (also emitted as FAQPage JSON-LD, verbatim) ────────────────────
  faq: {
    heading: "Common questions about OpenPharmacy",
    items: [
      {
        question: "Is OpenPharmacy available on Android as well as iPhone?",
        answer:
          "Yes. OpenPharmacy is a free app on both the Apple App Store and Google Play, so it runs on iPhone and on Android phones. There are no fees and no ads on either platform, and the same account, family profiles and offline QR codes work the same way on both.",
      },
      {
        question: "Does OpenPharmacy sync with the Active Script List?",
        answer:
          "Yes, as an option. Enter your Active Script List (MySL) activation code from your pharmacy in the Link MySL tab, and OpenPharmacy loads your full script list automatically, including repeats and paper prescriptions. If you prefer not to use the Active Script List, you can still add eScript tokens manually from SMS or email.",
      },
      {
        question: "Is OpenPharmacy registered with the Australian Digital Health Agency?",
        answer:
          "Yes. Both the OpenPharmacy Application (Mobile Application) and the OpenPharmacy API (Mobile Intermediary System) are listed on the Australian Digital Health Agency Electronic Prescribing Conformance Register under Easy As Health Pty Ltd, against conformance profile 3.0.1, since 17 June 2025. You can check the register on the ADHA website.",
      },
      {
        question: "Where is my prescription data stored?",
        answer:
          "OpenPharmacy stores your prescription QR codes on your own device, encrypted while the app is closed, and backs them with Australian-hosted servers protected by ASD-approved end-to-end encryption. No prescription data is shared with third parties, including pharmacies, and a mandatory 4-digit PIN is required every time you open the app.",
      },
      {
        question: "Do I have to use a specific pharmacy with OpenPharmacy?",
        answer:
          "No. OpenPharmacy is not owned by or tied to any pharmacy chain. Your eScript QR code can be scanned at any Australian pharmacy that dispenses electronic prescriptions, and you do not need an activation visit, a pharmacy code or a chain account before you can use the app.",
      },
    ],
  },

  // ─── Internal links ─────────────────────────────────────────────────────
  links: {
    heading: "Learn more",
    items: [
      { to: "/how-it-works", label: "How OpenPharmacy works: add scripts manually or link your Active Script List" },
      { to: "/faq", label: "Full FAQ: accounts, scripts, repeats and security" },
      { to: "/for/rural-australia", label: "eScripts without internet: a guide for rural and remote Australians" },
      { to: "/blog/what-is-adha-conformance-australia", label: "What ADHA conformance means for your eScript app" },
      { to: "/blog/managing-family-escripts-australia-carers-parents", label: "Managing family eScripts: a guide for carers and parents" },
      { to: "/blog/active-script-list-vs-escript-wallet-australia", label: "Active Script List vs eScript wallet: what each one does" },
    ],
  },
};
