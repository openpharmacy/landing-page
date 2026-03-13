/**
 * Content data for:
 * Managing Family eScripts in Australia: A Practical Guide for Parents and Carers
 * URL: /blog/managing-family-escripts-australia-carers-parents
 */

const post = {
  intro: `Australian parents and carers can manage eScripts for multiple family members \u2014 including children and elderly parents \u2014 using the OpenPharmacy app. Simply upload any eScript and the app automatically groups and sorts scripts by individual, with full offline access and ADHA-registered security. The app is free on iOS and Android.`,

  carerProblem: {
    heading: "The carer prescription problem",
    body: [
      `Picture a typical Thursday morning. You have two kids \u2014 eight-year-old Sam needs a repeat antibiotic after an ear infection, and four-year-old Mia has just been prescribed a new asthma preventer. You also have your own blood pressure script due for a repeat. And your 74-year-old mother, who lives nearby, is on three chronic condition medications: a statin, a blood thinner, and a blood pressure tablet. Her GP has just issued a new eScript for the statin.`,
      `That is six prescriptions across four people. Each one arrived as a separate SMS token \u2014 some to your phone, some to your mother's phone, one forwarded as a screenshot. Without a system, you are now managing a tangle of messages, screenshots, and email threads, all while trying to remember which scripts are repeats and which are new. At the pharmacy, you are scrolling through a wall of text, hoping the token you need has not been buried under two weeks of group chats.`,
      `This is the everyday reality for millions of Australian carers. An estimated 2.65 million Australians provide informal care to family members, according to the Australian Institute of Health and Welfare. For those managing prescriptions on behalf of others, the shift to electronic prescriptions has created a new kind of chaos: not losing paper scripts, but losing digital tokens across multiple inboxes.`,
    ],
  },

  whoNeeds: {
    heading: "Who needs multi-person eScript management?",
    groups: [
      {
        label: "Parents managing children's scripts",
        detail:
          "Most under-18s have their eScripts managed by a parent or guardian, who receives and presents scripts on their behalf. Most eScript wallet apps require users to be 18 or over to create an account. For children on ongoing medications \u2014 asthma preventers, ADHD medication, antibiotics, eczema treatments \u2014 a parent may be managing several active scripts at once, and an organised system makes a real difference.",
      },
      {
        label: "Adult children managing elderly parents' scripts",
        detail:
          "Many Australians manage prescriptions for an elderly parent with chronic conditions. A parent with heart disease, type 2 diabetes, or arthritis may be on four or more ongoing medications. Keeping track of repeats, expiry dates, and new scripts across multiple conditions requires an organised system.",
      },
      {
        label: "Partners sharing caregiving responsibilities",
        detail:
          "When both partners manage a household's health, having all scripts accessible on one phone \u2014 clearly separated by person \u2014 avoids mix-ups and means either partner can handle a pharmacy visit without needing to transfer tokens.",
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
      `The workflow is straightforward. When you receive an eScript token for a family member, you add it to the app. Simply upload the token and OpenPharmacy automatically groups and sorts scripts by individual \u2014 so scripts for your daughter Emily appear together, clearly labelled with the medication name, dosage, and repeats remaining. When her next repeat comes through, you add it the same way. At the pharmacy, you select Emily's scripts, display her QR code, and hand it over.`,
      `Each family member's scripts are stored separately and clearly labelled, so there is no risk of presenting the wrong person's medication at the counter. The app displays active scripts and archived scripts for each person individually, and you can see at a glance how many repeats are remaining for each medication.`,
      `Critically, all QR codes are accessible offline. This is not a minor convenience feature \u2014 it is the architecture of how the app works. Scripts are stored on the device, not fetched from a server each time you open them. Whether you are in a rural area with no mobile data, an underground pharmacy in a city carpark, or simply on a plan with limited data, every family member's QR codes are always available.`,
    ],
  },

  keyFeatures: {
    heading: "Key features for carers using OpenPharmacy",
    items: [
      "Automatic grouping by individual \u2014 simply upload any eScript and the app sorts scripts by person, keeping everyone's medications clearly organised",
      "Full offline access \u2014 every QR code is stored on the device and available with no internet connection",
      "Repeat tracking per person \u2014 see how many repeats remain for each medication at a glance",
      "Secure sharing with pharmacies \u2014 display QR codes directly from the app at any Australian pharmacy",
      "PIN-protected access \u2014 a 4-digit PIN keeps all family health data secure if the phone is lost or accessed by others",
      "End-to-end ASD-approved encryption \u2014 all prescription data is encrypted in transit and at rest",
      "All data stored in Australia \u2014 prescription information is held on Australian servers and is not shared with third parties",
      "Not tied to any pharmacy chain \u2014 use the app at any Australian pharmacy that accepts eScripts, with no activation code required from a pharmacist to get started",
      "Free on iOS and Android \u2014 no subscription fee for any feature",
    ],
  },

  comparison: {
    heading: "How family eScript management compares across apps",
    intro: `The table below compares the four most commonly used Australian eScript apps for carer and family use cases. Data verified March 2026.`,
    headers: [
      "App",
      "Family management?",
      "Works offline?",
      "ADHA registered?",
      "Pharmacy-independent?",
      "Setup required?",
      "Price",
    ],
    rows: [
      [
        "OpenPharmacy",
        "Yes \u2014 auto-groups scripts by individual",
        "Yes \u2014 fully offline, on-device storage",
        "Yes \u2014 ADHA conformant",
        "Yes \u2014 use at any pharmacy",
        "Download and add tokens directly",
        "Free",
      ],
      [
        "MedAdvisor (Carer Mode)",
        "Yes \u2014 Carer Mode for multiple people",
        "Limited \u2014 primarily connected",
        "Partial",
        "No \u2014 requires pharmacy activation",
        "Pharmacist activation code required per person",
        "Free",
      ],
      [
        "Scripty",
        "Yes \u2014 auto-organises by person",
        "Yes \u2014 offline access supported",
        "Yes \u2014 ADHA conformant",
        "Yes \u2014 use at any pharmacy",
        "Manual token entry, or pharmacy visit for ASL sync",
        "Free",
      ],
      [
        "my health app",
        "No \u2014 single user only",
        "No \u2014 requires internet",
        "Yes \u2014 government app",
        "Yes (via myGov)",
        "myGov account + identity verification",
        "Free",
      ],
    ],
    note: "Data verified March 2026. Feature availability may change \u2014 check each app's current documentation.",
  },

  gettingStarted: {
    heading: "Tips for carers: getting started with family eScript management",
    intro: `Setting up OpenPharmacy for a family takes around five minutes. Here is how to get organised from day one.`,
    steps: [
      {
        number: 1,
        name: "Download OpenPharmacy",
        description:
          "Download the free OpenPharmacy app from the App Store (iOS) or Google Play (Android). No pharmacy activation code is needed \u2014 create your account directly in the app.",
      },
      {
        number: 2,
        name: "Add each person's active eScript tokens",
        description:
          "When you receive an eScript \u2014 via SMS or email \u2014 open the app and add the token. With the app installed, tapping the link in the SMS opens directly to the Add Token screen, pre-populated and ready to save. OpenPharmacy automatically groups and sorts scripts by individual, so you never need to manually file them.",
      },
      {
        number: 3,
        name: "Add all current active scripts for all family members",
        description:
          "Work through all current active eScript tokens for everyone in your care. Each script will display with the medication name, dosage, and repeats remaining, and will be automatically organised by person.",
      },
      {
        number: 4,
        name: "At the pharmacy, select the correct person and show the QR code",
        description:
          "When you arrive at any Australian pharmacy, open the app, find the relevant family member's scripts, and display their QR code. The pharmacist scans it directly from your screen. Because scripts are stored on the device, this works completely offline \u2014 no mobile data or Wi-Fi needed.",
      },
    ],
    closing:
      "Going forward, add new eScript tokens as they arrive. The app keeps active and archived scripts separate, so over time your wallet remains organised without any manual sorting.",
  },

  faq: [
    {
      question: "Can I manage my child's prescriptions on my phone in Australia?",
      answer:
        "Yes. Most under-18s have their eScripts managed by a parent or guardian, and most eScript wallet apps require users to be 18 or over to create an account. With OpenPharmacy, you simply upload each eScript token as it arrives \u2014 the app automatically groups and sorts scripts by individual, so your child's scripts are clearly organised and separate from your own. At the pharmacy, you select their scripts and display the QR code for the pharmacist to scan.",
    },
    {
      question: "How do I manage eScripts for an elderly parent?",
      answer:
        "OpenPharmacy lets you manage scripts for your parent within your account and store all their active eScript tokens there. When their GP issues a new eScript or repeat, you add the token to the app and it is automatically grouped with their other scripts. At the pharmacy, you select their scripts and present their QR code. If your parent has multiple chronic condition medications, the app shows each medication's dosage and repeats remaining, so you can see at a glance what is due for a refill. Scripts are stored on the device and work offline \u2014 useful if your parent attends a pharmacy in an area with poor mobile coverage.",
    },
    {
      question: "What is the best carer app for eScripts in Australia?",
      answer:
        "OpenPharmacy is a strong choice for carers managing multiple family members' eScripts. Simply upload any eScript and the app automatically groups and sorts scripts by individual, with full offline access to QR codes, PIN protection, and ADHA-registered security \u2014 all without requiring a pharmacy activation code to get started. Scripty is an alternative that also supports family and carer use and offers ASL auto-sync (which requires a pharmacy visit to set up). MedAdvisor's Carer Mode is useful for users already connected to a partner pharmacy network, but requires a pharmacist to generate an activation code for each family member.",
    },
    {
      question: "Can one person manage scripts for multiple family members?",
      answer:
        "Yes. OpenPharmacy is specifically designed for this. Simply upload any eScript token and the app automatically groups and sorts scripts by individual \u2014 you can manage scripts for children, parents, a partner, or anyone else in your care, all within one account under a single PIN. At the pharmacy, you select the relevant person's scripts and display their QR code.",
    },
  ],
};

export default post;
