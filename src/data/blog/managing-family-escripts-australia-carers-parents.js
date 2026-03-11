/**
 * Content data for:
 * Managing Family eScripts in Australia: A Practical Guide for Parents and Carers
 * URL: /blog/managing-family-escripts-australia-carers-parents
 */

const post = {
  intro: `Australian parents and carers can manage eScripts for multiple family members — including children and elderly parents — using the OpenPharmacy app. Each person's scripts are stored separately within a single app, with full offline access and ADHA-registered security. The app is free on iOS and Android.`,

  carerProblem: {
    heading: "The carer prescription problem",
    body: [
      `Picture a typical Thursday morning. You have two kids — eight-year-old Sam needs a repeat antibiotic after an ear infection, and four-year-old Mia has just been prescribed a new asthma preventer. You also have your own blood pressure script due for a repeat. And your 74-year-old mother, who lives nearby, is on three chronic condition medications: a statin, a blood thinner, and a blood pressure tablet. Her GP has just issued a new eScript for the statin.`,
      `That is six prescriptions across four people. Each one arrived as a separate SMS token — some to your phone, some to your mother's phone, one forwarded as a screenshot. Without a system, you are now managing a tangle of messages, screenshots, and email threads, all while trying to remember which scripts are repeats and which are new. At the pharmacy, you are scrolling through a wall of text, hoping the token you need has not been buried under two weeks of group chats.`,
      `This is the everyday reality for millions of Australian carers. An estimated 2.65 million Australians provide informal care to family members, according to the Australian Institute of Health and Welfare. For those managing prescriptions on behalf of others, the shift to electronic prescriptions has created a new kind of chaos: not losing paper scripts, but losing digital tokens across multiple inboxes.`,
    ],
  },

  whoNeeds: {
    heading: "Who needs multi-person eScript management?",
    groups: [
      {
        label: "Parents managing children's scripts",
        detail:
          "Under-18s cannot hold their own eScript wallets — a parent or guardian receives and presents their scripts. For children on ongoing medications (asthma preventers, ADHD medication, antibiotics, eczema treatments), a parent may be managing several active scripts at once.",
      },
      {
        label: "Adult children managing elderly parents' scripts",
        detail:
          "Many Australians manage prescriptions for an elderly parent with chronic conditions. A parent with heart disease, type 2 diabetes, or arthritis may be on four or more ongoing medications. Keeping track of repeats, expiry dates, and new scripts across multiple conditions requires an organised system.",
      },
      {
        label: "Partners sharing caregiving responsibilities",
        detail:
          "When both partners manage a household's health, having all scripts accessible on one phone — clearly separated by person — avoids mix-ups and means either partner can handle a pharmacy visit without needing to transfer tokens.",
      },
      {
        label: "Guardians and professional carers",
        detail:
          "NDIS support workers, foster carers, and guardians may carry scripts for multiple people as part of their daily responsibilities. A dedicated wallet with PIN protection and clear person-level organisation is essential for this use case.",
      },
    ],
  },

  openPharmacyDetail: {
    heading: "How OpenPharmacy handles family scripts",
    body: [
      `OpenPharmacy is an Australian eScript wallet developed by Easy As Health Pty Ltd and registered with the Australian Digital Health Agency (ADHA). The app is designed for exactly this scenario: one person managing scripts for multiple family members, all accessible from a single PIN-protected app.`,
      `The workflow is straightforward. When you receive an eScript token for a family member, you add it to their profile within the app. Say you add a script for your daughter Emily — you enter the eScript token, and it appears under Emily's profile with the medication name, dosage, and repeats remaining clearly displayed. When her next repeat comes through, you add it the same way. At the pharmacy, you select Emily's profile, display her QR code, and hand it over.`,
      `Each family member's scripts are stored separately and clearly labelled, so there is no risk of presenting the wrong person's medication at the counter. The app displays active scripts and archived scripts for each person individually, and you can see at a glance how many repeats are remaining for each medication.`,
      `Critically, all QR codes are accessible offline. This is not a minor convenience feature — it is the architecture of how the app works. Scripts are stored on the device, not fetched from a server each time you open them. Whether you are in a rural area with no mobile data, an underground pharmacy in a city carpark, or simply on a plan with limited data, every family member's QR codes are always available.`,
    ],
  },

  keyFeatures: {
    heading: "Key features for carers using OpenPharmacy",
    items: [
      "Separate profiles for each family member — scripts are clearly organised and labelled by person, not mixed together",
      "Full offline access — every QR code is stored on the device and available with no internet connection",
      "Repeat tracking per person — see how many repeats remain for each medication at a glance",
      "Secure sharing with pharmacies — display QR codes directly from the app at any Australian pharmacy",
      "PIN-protected access — a 4-digit PIN keeps all family health data secure if the phone is lost or accessed by others",
      "End-to-end ASD-approved encryption — all prescription data is encrypted in transit and at rest",
      "All data stored in Australia — prescription information is held on Australian servers and is not shared with third parties",
      "Not tied to any pharmacy chain — use the app at any Australian pharmacy that accepts eScripts, with no activation code required from a pharmacist to get started",
      "Free on iOS and Android — no subscription fee for any feature",
    ],
  },

  comparison: {
    heading: "How family eScript management compares across apps",
    intro: `The table below compares the four most commonly used Australian eScript apps for carer and family use cases. Data verified March 2026.`,
    headers: [
      "App",
      "Family profiles?",
      "Works offline?",
      "ADHA registered?",
      "Pharmacy-independent?",
      "Setup required?",
      "Price",
    ],
    rows: [
      [
        "OpenPharmacy",
        "Yes — separate profiles per person",
        "Yes — fully offline, on-device storage",
        "Yes — ADHA conformant",
        "Yes — use at any pharmacy",
        "Download and add tokens directly",
        "Free",
      ],
      [
        "MedAdvisor (Carer Mode)",
        "Yes — Carer Mode for multiple people",
        "Limited — primarily connected",
        "Partial",
        "No — requires pharmacy activation",
        "Pharmacist activation code required per person",
        "Free",
      ],
      [
        "Scripty",
        "Yes — auto-organises by person",
        "Yes — offline access supported",
        "Yes — ADHA conformant",
        "Yes — use at any pharmacy",
        "Manual token entry, or pharmacy visit for ASL sync",
        "Free",
      ],
      [
        "my health app",
        "No — single user only",
        "No — requires internet",
        "Yes — government app",
        "Yes (via myGov)",
        "myGov account + identity verification",
        "Free",
      ],
    ],
    note: "Data verified March 2026. Feature availability may change — check each app's current documentation.",
  },

  gettingStarted: {
    heading: "Tips for carers: getting started with family eScript management",
    intro: `Setting up OpenPharmacy for a family takes around five minutes. Here is how to get organised from day one.`,
    steps: [
      {
        number: 1,
        name: "Download OpenPharmacy",
        description:
          "Download the free OpenPharmacy app from the App Store (iOS) or Google Play (Android). No pharmacy activation code is needed — create your account directly in the app.",
      },
      {
        number: 2,
        name: "Create a profile for each family member",
        description:
          "Set up a named profile for each person whose scripts you manage — for example, 'Sam (son)', 'Mia (daughter)', 'Mum'. Each profile stores that person's scripts separately so there is never any confusion about whose medication is whose.",
      },
      {
        number: 3,
        name: "Add each person's active eScript tokens",
        description:
          "When you receive an eScript — via SMS, email, or from your doctor — add the token to the correct family member's profile in the app. The script will display with the medication name, dosage, and repeats remaining. Do this for all current active scripts across all family members.",
      },
      {
        number: 4,
        name: "At the pharmacy, select the correct profile and show the QR code",
        description:
          "When you arrive at any Australian pharmacy, open the app, select the family member's profile, and display their QR code. The pharmacist scans it directly from your screen. Because scripts are stored on the device, this works completely offline — no mobile data or Wi-Fi needed.",
      },
    ],
    closing:
      "Going forward, add new eScript tokens as they arrive. The app keeps active and archived scripts separate, so over time your wallet remains organised without any manual sorting.",
  },

  faq: [
    {
      question: "Can I manage my child's prescriptions on my phone in Australia?",
      answer:
        "Yes. Children under 18 cannot hold their own eScript wallets — a parent or guardian receives and manages their scripts. OpenPharmacy allows you to create a separate profile for each child within the app and store their eScript tokens there. At the pharmacy, you select the child's profile and display their QR code for the pharmacist to scan. All scripts remain clearly separated by person so there is no risk of mix-ups.",
    },
    {
      question: "How do I manage eScripts for an elderly parent?",
      answer:
        "OpenPharmacy lets you create a named profile for your parent within your account and store all their active eScript tokens there. When their GP issues a new eScript or repeat, you add the token to their profile. At the pharmacy, you select their profile and present their QR code. If your parent has multiple chronic condition medications, the app shows each medication's dosage and repeats remaining, so you can see at a glance what is due for a refill. Scripts are stored on the device and work offline — useful if your parent attends a pharmacy in an area with poor mobile coverage.",
    },
    {
      question: "What is the best carer app for eScripts in Australia?",
      answer:
        "OpenPharmacy is a strong choice for carers managing multiple family members' eScripts. It provides separate profiles for each person, full offline access to QR codes, PIN protection, and ADHA-registered security — all without requiring a pharmacy activation code to get started. Scripty is an alternative that also supports family and carer use and offers ASL auto-sync (which requires a pharmacy visit to set up). MedAdvisor's Carer Mode is useful for users already connected to a partner pharmacy network, but requires a pharmacist to generate an activation code for each family member.",
    },
    {
      question: "Can one person manage scripts for multiple family members?",
      answer:
        "Yes. OpenPharmacy is specifically designed for this. You can create separate named profiles for as many family members as you need — children, parents, a partner, or anyone else in your care — and store each person's eScript tokens in their own profile. All profiles are accessible within the one app under a single PIN. At the pharmacy, you select the relevant person's profile and display their QR code.",
    },
  ],
};

export default post;
