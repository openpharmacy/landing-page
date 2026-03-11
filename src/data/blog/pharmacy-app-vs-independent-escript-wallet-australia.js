/**
 * Content data for:
 * Pharmacy App vs Independent eScript Wallet: What Every Australian Patient Should Know
 * URL: /blog/pharmacy-app-vs-independent-escript-wallet-australia
 */

const post = {
  intro: `Pharmacy apps like MedAdvisor and Chemist2U MyScripts are designed to keep you connected to a specific pharmacy or pharmacy chain. Independent eScript wallets like OpenPharmacy and Scripty are not owned by any pharmacy and work with every chemist in Australia. For patients who want full control over where they fill their prescriptions, an independent wallet is the privacy-preserving choice.`,

  twoTypes: {
    heading: "Two types of eScript apps in Australia",
    body: [
      `Every eScript app in Australia falls into one of two categories: pharmacy-owned or independent. The distinction matters more than most people realise, and it goes well beyond which logo appears on the splash screen.`,
      `Pharmacy-owned apps are built and operated by pharmacy businesses. Some connect to a single chain (like Chemist2U or Healthylife, which is Chemist Warehouse's online brand). Others, like MedAdvisor, connect to a broad national network of pharmacies rather than a single chain, but the platform still creates a commercial relationship between you and those pharmacies. The app's purpose is to bring you back to their dispensing network. That is a rational business decision, and it produces genuinely useful features.`,
      `Independent wallets are not owned by any pharmacy. OpenPharmacy is developed by Easy As Health Pty Ltd, a Brisbane digital health company. Scripty is developed by Oexa. Neither company operates a pharmacy, earns a dispensing fee, or has any commercial incentive to direct you to a particular chemist. Your prescription data is yours, and you take it wherever you choose.`,
    ],
  },

  pharmacyAppsSection: {
    heading: "What pharmacy apps do well",
    body: [
      `Pharmacy-connected apps offer real advantages that independent wallets do not replicate. It is important to be honest about this.`,
      `MedAdvisor connects to more than 5,500 Australian pharmacies — covering over 95% of the national network — and is used by more than 3 million Australians. Within that network, it enables medication ordering ahead of your visit, home delivery, automated refill reminders, and real-time contact with your pharmacist. If your goal is to manage a complex medication regimen with a single trusted pharmacy, MedAdvisor delivers a well-developed workflow.`,
      `Chemist2U MyScripts is oriented around on-demand delivery. If you want your prescription medication brought to your door quickly, Chemist2U is purpose-built for that use case. Healthylife's script wallet, backed by Chemist Warehouse infrastructure, gives shoppers in that ecosystem a familiar interface for managing scripts within their preferred retailer.`,
      `For patients with stable, long-term prescriptions at a pharmacy they trust and never plan to change, a pharmacy-connected app may genuinely be the most convenient option. These apps are not doing anything wrong by connecting you to pharmacies. They are doing exactly what they are designed to do.`,
    ],
  },

  independentWalletsSection: {
    heading: "What independent wallets do differently",
    body: [
      `Independent eScript wallets start from a different premise: your prescription is a document that belongs to you. The wallet's job is to store it securely and make it available at whichever pharmacy you choose, today or in five years.`,
      `OpenPharmacy and Scripty are both listed on the Australian Digital Health Agency (ADHA) ePrescribing Conformance Register, meaning they have passed the formal government assessment for handling electronic prescriptions. Neither app requires you to activate an account through a pharmacy — you download the app, add your eScript tokens, and you are ready to present QR codes at any dispensing pharmacy in Australia.`,
      `Neutrality is the core differentiator. No pharmacy can see your prescription history unless you actively choose to share a specific script with them at the time of dispensing. Your medication list is not used to generate recommendations, target you with health promotions, or inform any commercial relationship. Your data stays in the wallet until you decide otherwise.`,
      `OpenPharmacy also works completely offline. Prescription QR codes are stored directly on your device, so they remain accessible in areas with no mobile signal — rural pharmacies, underground car parks, hospital basements, or anywhere reception is unreliable. This is a design choice that independent wallets can make precisely because they are not dependent on a pharmacy server connection to function.`,
    ],
  },

  privacySection: {
    heading: "Privacy implications: what your pharmacy app may know about you",
    intro: `This section is worth reading carefully if you take medications for a sensitive condition. The privacy difference between pharmacy-connected apps and independent wallets is not theoretical — it has concrete implications for how your medication history is used.`,
    body: [
      `When you manage prescriptions through a pharmacy chain's app, that chain builds a record of your medication history as a natural function of the platform. This is necessary for features like refill reminders and ordering ahead — the app needs to know what you take and when. The data is typically used to power the platform and, depending on the privacy policy, may be used for health content targeting or shared within the pharmacy group's related entities.`,
      `MedAdvisor's privacy policy notes that the platform may share de-identified data with pharmaceutical companies for health insights and that it may use your data to send personalised health content. This is disclosed and, for many users, is an acceptable trade-off for the ordering and reminder features they get in return.`,
      `For patients managing prescriptions related to mental health, sexual health, substance use, or other sensitive conditions, this trade-off may feel different. A person filling scripts for an antidepressant, a HIV prevention medication, or opioid dependency treatment has a reasonable interest in keeping that information within a tightly controlled circle.`,
      `Independent wallets take a different approach by design. OpenPharmacy stores all data on Australian servers and explicitly states that no data is shared with third parties. The app is not connected to any pharmacy, so there is no dispensing relationship through which your medication profile accumulates. When you present a QR code at the pharmacy counter, you are sharing that one script — nothing more.`,
      `Scripty similarly stores data on Australian servers with end-to-end encryption and does not share prescription data with pharmacies or third parties beyond what is required for the dispensing transaction itself.`,
    ],
  },

  switchingSection: {
    heading: "What happens when you switch pharmacies?",
    body: [
      `This is where the structural difference between the two app types becomes most visible.`,
      `If you use a pharmacy-connected app and decide to change chemists — because you moved, because your regular pharmacy closed, because a competitor is offering better service, or simply because you want to — you may find your script history and medication profile tied to your previous pharmacy network. Some platforms allow you to transfer; others require you to re-register at a new pharmacy to reconnect. Your ordering history and refill data may not carry over cleanly.`,
      `With an independent wallet, nothing changes. Your eScript tokens are stored on your device and in your account. You walk into any Australian pharmacy that accepts eScripts, open the app, show the QR code, and the pharmacist scans it. There is no re-registration, no network switching, and no data tied to your previous dispensing location. The script is yours, and it works everywhere.`,
      `This portability is also relevant if a pharmacy closes. Australian independent pharmacies do close, merge, or change ownership. Patients who relied on that pharmacy's app may find their digital medication history orphaned. An independent wallet removes that dependency entirely.`,
    ],
  },

  comparisonTable: {
    headers: ["App", "Type", "Works at any pharmacy?", "Data shared with pharmacy?", "Offline?", "Cost"],
    rows: [
      ["OpenPharmacy", "Independent", "Yes", "No", "Yes — fully offline", "Free"],
      ["Scripty", "Independent", "Yes", "No", "Yes (after sync)", "Free"],
      ["MedAdvisor", "Pharmacy network", "Yes (95%+ AU pharmacies)", "Yes (connected pharmacies)", "Limited", "Free"],
      ["Chemist2U MyScripts", "Chemist2U", "Via delivery", "Chemist2U network", "No", "Free"],
      ["Healthylife Script Wallet", "Healthylife / Chemist Warehouse", "Yes", "Healthylife network", "No", "Free"],
    ],
  },

  whichIsRightSection: {
    heading: "Which type of app is right for you?",
    intro: `The honest answer is that both types serve real needs. The choice depends on two factors: how often you change pharmacies, and how sensitive your prescriptions are.`,
    scenarios: [
      {
        label: "A pharmacy-connected app may be the right fit if...",
        points: [
          "You use the same pharmacy consistently and have no plans to change",
          "You want to order repeats ahead of time and skip the queue",
          "Home delivery from a specific pharmacy chain is a priority",
          "Automated refill reminders are important to your medication adherence",
        ],
      },
      {
        label: "An independent wallet is likely the better choice if...",
        points: [
          "You want to fill scripts at any pharmacy — rural, suburban, or wherever you happen to be",
          "You manage prescriptions for a sensitive health condition and want tighter data control",
          "You live or travel in areas with unreliable mobile reception where offline access matters",
          "You are a carer managing scripts for multiple people and want flexibility about where to fill them",
          "You want no commercial relationship between your medication history and any pharmacy chain",
        ],
      },
    ],
    closing: `OpenPharmacy is an independent eScript wallet registered with the ADHA and built specifically around privacy, offline access, and pharmacy neutrality. It is free to download on iOS and Android, and you can add your first eScript token in under two minutes.`,
  },

  faq: [
    {
      question: "Are pharmacy apps free in Australia?",
      answer:
        "Yes. MedAdvisor, Chemist2U MyScripts, Healthylife Script Wallet, OpenPharmacy, and Scripty are all free to download and use. None of the major Australian eScript or pharmacy apps charge a subscription fee for core prescription management functionality. The apps generate revenue through their connected services — delivery fees, pharmacy network relationships, or pharmaceutical partnerships — rather than from patients directly.",
    },
    {
      question: "Do pharmacy apps share my data?",
      answer:
        "It depends on the app. Pharmacy-connected apps like MedAdvisor connect your medication history to a pharmacy network, and their privacy policies may permit sharing de-identified data with pharmaceutical partners or using your data for personalised health content. Independent wallets like OpenPharmacy and Scripty explicitly state that prescription data is not shared with third parties and is stored on Australian servers. Always check the app's privacy policy for the most current and specific information.",
    },
    {
      question: "What is an independent eScript wallet?",
      answer:
        "An independent eScript wallet is a mobile app that stores your Australian electronic prescription (eScript) tokens and makes them available as QR codes at any dispensing pharmacy. Unlike pharmacy-connected apps, an independent wallet is not owned or operated by a pharmacy chain, and it has no commercial relationship with any specific pharmacist or pharmacy network. OpenPharmacy and Scripty are the two independent eScript wallets registered on the Australian Digital Health Agency (ADHA) ePrescribing Conformance Register.",
    },
    {
      question: "Can I use my prescriptions at any pharmacy in Australia?",
      answer:
        "Yes. Electronic prescriptions (eScripts) in Australia are issued through the national electronic prescribing system and can be filled at any pharmacy that is connected to that system — which covers the vast majority of Australian pharmacies. With an independent eScript wallet like OpenPharmacy, you simply open the app at the pharmacy counter and show the QR code, regardless of which pharmacy you are at. Pharmacy-connected apps also support filling at most pharmacies, but their primary design is around keeping you within their connected network.",
    },
  ],
};

export default post;
