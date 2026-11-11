/**
 * Content data for:
 * The Active Script List vs an eScript Wallet: What's the Difference for Australian Patients?
 * URL: /blog/active-script-list-vs-escript-wallet-australia
 */

const post = {
  intro: `The Active Script List (ASL) and an eScript wallet serve related but different purposes. The ASL is a centralised, government-managed list of your current prescriptions that pharmacists can access with your consent. An eScript wallet like OpenPharmacy is a private app that stores your prescription QR code tokens directly on your device. Both help you manage electronic prescriptions; they differ in setup, where your data lives, and what happens when you don't have internet.`,

  whatIsAsl: {
    heading: "What is the Active Script List?",
    body: [
      `The Active Script List (ASL) is a government initiative managed by the Australian Digital Health Agency (ADHA). When you register for an ASL, all new electronic prescriptions issued by your doctors are automatically added to a centralised registry, so you no longer need to track individual eScript tokens for each medication.`,
      `Once registered, a pharmacist at any ASL-enabled pharmacy can access your prescription list with your consent. That consent is given via an SMS or email each time a new pharmacy requests access. The pharmacist selects the relevant prescription from your ASL and dispenses it, without you needing to produce a QR code at all.`,
      `To register for an ASL, you need to visit a participating pharmacy in person. You will need 100 points of identification (typically a Medicare card plus photo ID such as a driver's licence or passport) so the pharmacy can verify your identity and create your ASL record. Once set up, future eScripts are added automatically.`,
      `The ASL is accessible through the 1800MEDICARE app (formerly called the "my health app", which was renamed on 1 January 2026). This government-built app connects directly to My Health Record and the ASL, allowing you to view your active prescriptions and remaining repeats.`,
    ],
  },

  whenAslWorksWell: {
    heading: "When the ASL works well",
    intro: `For many Australians, the ASL is an excellent solution. It was specifically designed to reduce the friction of managing multiple medications, and it does that job well in the right circumstances.`,
    points: [
      "You regularly use the same pharmacy and your prescribers know it",
      "You take multiple medications and want scripts to appear automatically, with no token tracking required",
      "You are comfortable with centralised government health infrastructure and My Health Record",
      "You have reliable internet at the pharmacy when you visit",
      "You want a solution you don't have to think about: once set up, it largely manages itself",
    ],
  },

  aslLimitations: {
    heading: "Where the ASL has limitations",
    body: [
      `The ASL requires internet connectivity at the time of dispensing. The pharmacist's software must connect to the central ASL registry to retrieve your prescription list, and you need mobile data or WiFi to receive the consent SMS or email that grants access. In areas with unreliable reception, at rural pharmacies, or in hospital basements with poor signal, this process can fail.`,
      `Setting up an ASL requires a pharmacy visit and formal identity verification. If you've just received a new prescription and haven't registered for an ASL, or if you're travelling and don't have time to visit a pharmacy to set one up, you can't get started immediately.`,
      `Because the ASL is centralised, your full active prescription list is visible to any pharmacist who requests access — subject to your consent via SMS or email. For patients managing medications for sensitive conditions, this means their prescription history sits in a government registry rather than on a device they personally control. The ASL does give you the ability to hide individual scripts from view, but the records are held centrally by default.`,
      `As a government system, the ASL is subject to the same availability constraints as any centralised digital infrastructure. Scheduled maintenance, unexpected outages, or connectivity issues on the pharmacy's end can affect access. These events are rare, but they affect all users simultaneously.`,
    ],
  },

  whatWalletDoes: {
    heading: "What an eScript wallet does differently",
    body: [
      `An independent eScript wallet like OpenPharmacy takes a fundamentally different approach: your prescription tokens are stored locally on your device, not in a central registry. When your doctor issues a new eScript, you receive an SMS or email containing a unique token. You add that token to OpenPharmacy manually, and the app stores the corresponding QR code directly on your phone.`,
      `Because everything lives on your device, the QR code is available immediately — even without a mobile signal. There is no consent request, no SMS back-and-forth, and no dependency on a central server being online. You open the app, find your script, and show the QR code at the pharmacy counter.`,
      `OpenPharmacy is registered on the ADHA ePrescribing Conformance Register, meaning it has met the formal government assessment for handling electronic prescriptions. All data is stored on Australian servers with ASD-approved end-to-end encryption and protected by a PIN or biometric lock. No prescription data is shared with third parties, pharmacies, or any government registry.`,
      `Setup takes under two minutes. You download the app, add your eScript token, and the QR code is ready to use. No pharmacy visit, no identity verification, no waiting for a consent SMS. You control exactly which scripts are in your wallet and when they were added.`,
    ],
  },

  whenWalletIsBetter: {
    heading: "When an independent wallet is the better choice",
    intro: `The right tool depends on your circumstances. An independent eScript wallet tends to work better in a specific set of situations:`,
    scenarios: [
      {
        label: "Rural and remote users",
        description:
          "If you live or travel in areas with unreliable mobile reception, an offline-capable wallet removes the dependency on connectivity entirely. OpenPharmacy QR codes are stored on your device and remain accessible in airplane mode, underground, or anywhere signal is inconsistent.",
      },
      {
        label: "Patients who value prescription privacy",
        description:
          "If you prefer your prescription history not to sit in a centralised government registry — regardless of how trustworthy that registry is — a local wallet gives you that control. Your scripts are on your phone, encrypted, and not accessible to anyone without your PIN.",
      },
      {
        label: "People who want to start immediately",
        description:
          "If you've just received a new eScript and need to fill it today, an independent wallet is ready in minutes. No pharmacy visit required, no identity verification process, no waiting.",
      },
      {
        label: "Travellers and frequent pharmacy switchers",
        description:
          "If you use different pharmacies — whether because you travel, move frequently, or simply prefer the nearest chemist on any given day — a wallet works identically at every Australian pharmacy that accepts eScripts. No re-registration, no network switching.",
      },
      {
        label: "Carers managing scripts for multiple people",
        description:
          "OpenPharmacy allows you to manage prescriptions for family members in separate profiles within the same app. For parents managing children's medications or adults caring for elderly parents, this keeps everything organised without multiple ASL registrations.",
      },
    ],
    closing: `None of these scenarios mean the ASL is a worse product. They are situations where the architectural difference — centralised versus local — translates into a meaningful practical advantage for the wallet approach.`,
  },

  privacySection: {
    heading: "A note on the privacy consideration",
    body: [
      `It's worth being explicit: choosing an independent wallet over the ASL is not a statement about trusting or distrusting the government. The ASL is a legitimate, secure service operated under Australian privacy law by the ADHA. It handles sensitive health data responsibly.`,
      `The choice is about data footprint preferences. Some people are entirely comfortable with their prescription history being held in a centralised registry — and for them, the ASL's convenience is a genuine advantage. Others, including people managing medications for mental health conditions, HIV treatment, endocrine conditions, or other sensitive areas, may simply prefer that their prescription history exist only on a device they personally control. Both preferences are reasonable, and the Australian eScript system supports both.`,
      `An independent wallet like OpenPharmacy accommodates that second preference by design. When you show a QR code at the pharmacy counter, you are sharing one specific prescription at one specific moment. Nothing else is visible to the pharmacist, and no record accumulates in a central registry.`,
    ],
  },

  comparisonTable: {
    headers: [
      "Feature",
      "Active Script List (ASL) / 1800MEDICARE app",
      "OpenPharmacy (eScript wallet)",
    ],
    rows: [
      [
        "Setup required",
        "Yes: pharmacy visit + 100 points of ID",
        "No: download and add token in minutes",
      ],
      [
        "Internet needed at pharmacy",
        "Yes: pharmacy system connects to central registry",
        "No: QR codes stored offline on device",
      ],
      [
        "Scripts added automatically",
        "Yes: new eScripts added by prescriber automatically",
        "No: you add each token manually",
      ],
      [
        "Data centralised",
        "Yes: held in government ASL registry",
        "No: stored locally on your device",
      ],
      [
        "Prescription history visible to pharmacist",
        "Full active script list (with your consent each visit)",
        "Only the specific script you show",
      ],
      [
        "Works offline immediately",
        "No: requires connectivity for consent and access",
        "Yes: QR codes accessible without signal",
      ],
      [
        "ADHA conformant",
        "Yes: government-operated system",
        "Yes: listed on ADHA ePrescribing Conformance Register",
      ],
      [
        "Free",
        "Yes",
        "Yes",
      ],
      [
        "Can use both together",
        "Yes: you can run both side by side",
        "Yes: you can run both side by side",
      ],
    ],
  },

  faq: [
    {
      question: "Do I have to use the Active Script List to get my prescriptions filled?",
      answer:
        "No. The ASL is optional. You can fill any electronic prescription in Australia by presenting the individual eScript token as a QR code in your SMS, email, or a wallet app like OpenPharmacy. The ASL is one way to manage your prescriptions; it is not mandatory. Your prescriber issues the token whether or not you have an ASL.",
    },
    {
      question: "Can I use OpenPharmacy and the 1800MEDICARE app at the same time?",
      answer:
        "Yes. Many patients use both. You might use the 1800MEDICARE app (formerly my health app) to view your My Health Record and access your ASL, while also keeping specific scripts in OpenPharmacy for offline access or privacy reasons. The systems are independent of each other, and using one does not affect the other.",
    },
    {
      question: "Is the Active Script List the same as My Health Record?",
      answer:
        "No, they are separate systems that are connected. My Health Record is a broader health record that includes clinical documents, pathology results, immunisation history, and more. The Active Script List (ASL) is specifically a registry of your active electronic prescriptions. The 1800MEDICARE app provides access to both: you can view your My Health Record and, separately, link and view your ASL within the same app.",
    },
    {
      question: "Does OpenPharmacy connect to the Active Script List?",
      answer:
        "No. OpenPharmacy is an independent eScript wallet that operates separately from the ASL. It stores individual prescription tokens that you add manually. It does not connect to or pull data from the centralised ASL registry. This is by design: the app is built around local, device-based storage with no connection to any central prescription network.",
    },
  ],
};

export default post;
