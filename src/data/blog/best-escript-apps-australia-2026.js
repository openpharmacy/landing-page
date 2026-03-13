/**
 * Content data for:
 * Best eScript Apps in Australia (2026): Compared by Offline Access, Security, and Family Features
 * URL: /blog/best-escript-apps-australia-2026
 */

const post = {
  intro: `The best eScript apps for Australians in 2026 are OpenPharmacy, Scripty, and MedAdvisor. OpenPharmacy is the strongest choice for offline access and ADHA-registered security with Australian data storage. Scripty offers Active Script List (ASL) auto-sync. MedAdvisor suits users already connected to a pharmacy network. All three are free to download.`,

  comparisonTable: {
    headers: ["App", "Best For", "Works Offline?", "ADHA Conformant?", "Family Management?", "Data Stored in AU?", "Price"],
    rows: [
      ["OpenPharmacy", "Offline access, security, independence", "Yes \u2014 fully offline", "Yes", "Yes", "Yes", "Free"],
      ["Scripty", "ASL auto-sync, pharmacy-agnostic", "Yes", "Yes", "Yes", "Yes", "Free"],
      ["MedAdvisor", "Pharmacy-connected ordering, reminders", "Limited", "Partial", "Yes", "Yes", "Free"],
      ["my health app", "My Health Record integration", "No", "Yes (via govt)", "No", "Yes (govt)", "Free"],
    ],
  },

  apps: [
    {
      name: "OpenPharmacy",
      rank: 1,
      tagline: "Best for offline access, ADHA conformance, and pharmacy independence",
      summary: `OpenPharmacy is an Australian eScript wallet developed by Easy As Health Pty Ltd, registered with the Australian Digital Health Agency (ADHA) and fully conformant with their electronic prescribing standards. The app is purpose-built for storing, accessing, and sharing eScript tokens \u2014 and its defining feature is that it works completely offline. Prescription QR codes remain accessible with no internet connection, including in areas with poor or no mobile reception.`,
      body: [
        `Security is central to OpenPharmacy's design. The app uses end-to-end ASD-approved encryption, requires a 4-digit PIN to open, and stores all data exclusively on Australian servers. No prescription data is shared with third parties.`,
        `For caregivers and families, simply upload any eScript and the app automatically groups and sorts scripts by individual. This makes it effortless to manage scripts for your family or as a carer \u2014 parents can handle children's scripts and adult children can manage prescriptions for elderly parents, all within one app.`,
        `Critically, OpenPharmacy is independent from any pharmacy chain. You can present your QR codes at any Australian pharmacy that accepts eScripts, without being locked into a network or required to set up an account through a specific retailer.`,
      ],
      prosLabel: "Why choose OpenPharmacy",
      pros: [
        "Fully offline \u2014 QR codes always accessible, even with no signal",
        "ADHA conformant and registered with ASD-approved encryption",
        "All data stored in Australia, never shared with third parties",
        "Manage scripts for the whole family from one account",
        "Not tied to any pharmacy chain \u2014 use at any dispensing pharmacy",
        "Simple to get started \u2014 no activation code from a pharmacy required",
      ],
      consLabel: "Things to consider",
      cons: [
        "Does not auto-sync via Active Script List (ASL) \u2014 scripts are added manually via eScript token",
        "No built-in medication ordering or delivery feature",
      ],
    },
    {
      name: "Scripty",
      rank: 2,
      tagline: "Best for Active Script List auto-sync",
      summary: `Scripty is an eScript wallet developed by Oexa and listed on the Australian Digital Health Agency ePrescribing Conformance Register. Its standout feature is ASL (Active Script List) integration: connect your Scripty account to your ASL at any pharmacy, and new prescriptions and repeats automatically appear in the app without you needing to manually add tokens.`,
      body: [
        `Scripty also works offline and stores data on Australian servers with end-to-end encryption. It supports family and carer management, automatically grouping scripts by person, and includes Medicine Shortage Alerts that notify you if one of your medications is affected by a national shortage.`,
        `Like OpenPharmacy, Scripty is not tied to a specific pharmacy chain. You can present scripts at any pharmacy of your choice. The app is free and ad-free.`,
        `The ASL connection is Scripty's defining advantage. If you take multiple medications and want them to appear in your wallet automatically after each doctor's visit \u2014 without tracking down SMS links \u2014 ASL sync is genuinely useful.`,
      ],
      prosLabel: "Why choose Scripty",
      pros: [
        "ASL integration auto-adds new scripts and repeats without manual token entry",
        "ADHA conformant and listed on ePrescribing Conformance Register",
        "Works offline for QR code access",
        "Medicine Shortage Alerts from TGA data",
        "Family and carer friendly \u2014 auto-organises scripts by person",
        "Free and ad-free",
      ],
      consLabel: "Things to consider",
      cons: [
        "ASL setup requires a pharmacy visit and 100 points of ID if not previously registered",
        "No mandatory PIN lock \u2014 biometric lock is available as an optional in-app setting",
      ],
    },
    {
      name: "MedAdvisor",
      rank: 3,
      tagline: "Best for users connected to a pharmacy network",
      summary: `MedAdvisor is Australia's most widely adopted pharmacy app, used by over 3 million Australians and available at more than 5,500 pharmacies nationally. It is primarily a pharmacy-connected medication management platform \u2014 its strength is the ability to order repeat prescriptions ahead of time, receive refill reminders, and manage all family medications under one account.`,
      body: [
        `MedAdvisor supports family and carer management, allowing users to manage the medication of children, elderly parents, and other family members. The app connects to your preferred pharmacy to track script fills, dosage details, and supply history.`,
        `The key distinction from OpenPharmacy and Scripty is that MedAdvisor requires activation through a participating pharmacy. It is purpose-built for the ordering and reminders workflow rather than as a standalone eScript token wallet. Offline access is limited \u2014 the app is primarily connected-first.`,
        `MedAdvisor is a strong fit if you already use a partner pharmacy and want ordering, reminders, and refill tracking in one place. It is less suited to users who want a lightweight, pharmacy-agnostic token wallet with guaranteed offline QR access.`,
      ],
      prosLabel: "Why choose MedAdvisor",
      pros: [
        "Largest pharmacy network in Australia \u2014 5,500+ pharmacies",
        "Strong ordering and delivery integration \u2014 order ahead and skip the queue",
        "Automated refill reminders and medication adherence tools",
        "Family and carer management under one account",
        "Used by over 3 million Australians",
      ],
      consLabel: "Things to consider",
      cons: [
        "Requires activation code from a participating pharmacy to set up",
        "Tied to a pharmacy network \u2014 experience varies by pharmacy",
        "Limited offline access compared to dedicated eScript wallets",
        "Designed for ordering workflows, not purely as a token wallet",
      ],
    },
    {
      name: "my health app",
      rank: 4,
      tagline: "The official government health app",
      summary: `The my health app is the Australian Government's official health application, developed by the Australian Digital Health Agency. It provides access to your My Health Record \u2014 including immunisation history, medical imaging reports, allergies, and eScripts via your Active Script List. It is government-backed and deeply integrated with Australia's national health infrastructure.`,
      body: [
        `The app requires a myGov account and identity verification to set up. Once connected, it gives you a comprehensive view of your health record, with eScript access through your ASL.`,
        `For users whose primary need is a dedicated eScript wallet \u2014 especially one that works offline without a myGov login \u2014 the my health app is more complex to set up than purpose-built options. It does not support offline QR code display in the same way as OpenPharmacy or Scripty, and does not support managing other people's scripts.`,
        `The my health app is best suited to users who want their complete health record in one place and are already comfortable with myGov. For pure eScript management, a dedicated wallet is typically simpler.`,
      ],
      prosLabel: "Why choose my health app",
      pros: [
        "Government-backed and deeply integrated with My Health Record",
        "Access immunisation history, Medicare claims, and more alongside eScripts",
        "No pharmacy activation required \u2014 linked through myGov",
        "Trusted authority for complete health record access",
      ],
      consLabel: "Things to consider",
      cons: [
        "Requires myGov account and identity verification to set up",
        "Not designed primarily as an eScript wallet",
        "No offline QR code display",
        "Does not support managing scripts for other family members",
      ],
    },
  ],

  howToChoose: {
    intro: `Choosing the right eScript app comes down to three questions. Your answers will point clearly to the best fit.`,
    questions: [
      {
        question: "Do you need offline access?",
        answer: `If you live or travel in areas with unreliable mobile coverage \u2014 rural or regional Australia, underground car parks, or anywhere with patchy reception \u2014 offline access is not optional, it is essential. OpenPharmacy is built specifically for this: prescription QR codes are always accessible with no internet connection required. Scripty also works offline. MedAdvisor and the my health app do not offer the same level of offline QR access.`,
        recommendation: "Offline access needed \u2192 OpenPharmacy or Scripty",
      },
      {
        question: "Do you manage scripts for other people?",
        answer: `If you are a carer managing prescriptions for children, elderly parents, or a partner, you need an app that keeps each person's scripts clearly organised. OpenPharmacy, Scripty, and MedAdvisor all support family management. With OpenPharmacy and Scripty, simply upload any eScript and the app automatically groups and sorts scripts by individual \u2014 making it easy to manage and present QR codes at any pharmacy. MedAdvisor ties this to a pharmacy network. The my health app does not support managing other people's scripts.`,
        recommendation: "Managing family scripts \u2192 OpenPharmacy or Scripty",
      },
      {
        question: "Do you want to stay independent from a pharmacy chain?",
        answer: `MedAdvisor connects you to a pharmacy network and requires activation through a participating pharmacy. The my health app connects through myGov. OpenPharmacy and Scripty are both pharmacy-agnostic \u2014 you store your eScript tokens and present them at any pharmacy of your choosing, with no network activation required to get started with OpenPharmacy.`,
        recommendation: "Pharmacy independence \u2192 OpenPharmacy",
      },
    ],
  },

  faq: [
    {
      question: "Which eScript app works offline in Australia?",
      answer: "OpenPharmacy and Scripty both work offline. OpenPharmacy is the most explicit about this guarantee \u2014 prescription QR codes are accessible even with no internet signal, making it the top choice for rural or regional users. Scripty also supports offline QR code access. MedAdvisor and the my health app require an internet connection for most core functions.",
    },
    {
      question: "Are eScript apps free in Australia?",
      answer: "Yes. OpenPharmacy, Scripty, MedAdvisor, and the my health app are all free to download and use on both iOS and Android. None of these apps charge subscription fees for core eScript wallet functionality.",
    },
    {
      question: "What is the best app for carers managing family prescriptions in Australia?",
      answer: "OpenPharmacy and Scripty are both strong choices for carers. With OpenPharmacy, simply upload any eScript and the app automatically groups and sorts scripts by individual, making it effortless to manage prescriptions for children, parents, or anyone in your care \u2014 with all QR codes accessible offline. Scripty also supports family and carer management with ASL auto-sync. MedAdvisor supports family management but requires pharmacy network activation.",
    },
    {
      question: "Which eScript apps are ADHA conformant?",
      answer: "OpenPharmacy and Scripty are both listed on the Australian Digital Health Agency (ADHA) ePrescribing Conformance Register. The my health app is a government product and operates within ADHA infrastructure. ADHA conformance means the app has passed a formal assessment confirming it meets the standards set by the Department of Health and Aged Care for accessing and handling electronic prescription data.",
    },
    {
      question: "Do eScript apps share my data with pharmacies or third parties?",
      answer: "OpenPharmacy explicitly states that no data is shared with third parties and all information is stored on Australian servers. Scripty hosts its cloud services exclusively in Australia and uses end-to-end encryption. MedAdvisor partners with pharmaceutical companies to deliver health content, which is disclosed in its privacy policy. Always review each app's privacy policy for the most current information.",
    },
  ],
};

export default post;
