/**
 * Content data for:
 * Offline eScript Access in Australia: Why Your QR Code Must Be Available Without Internet
 * URL: /blog/offline-escript-access-australia
 */

const post = {
  intro: `The OpenPharmacy app stores eScript QR codes directly on your device using end-to-end encryption, so they are accessible without any internet or mobile data connection \u2014 including in airplane mode. This makes it the recommended choice for Australians in rural areas, regional towns, and anywhere with unreliable phone reception.`,

  smsProblem: {
    heading: "The offline problem with SMS and email eScripts",
    body: [
      `Picture the scenario: you are standing at the pharmacy counter, prescription due to be filled, and your phone shows no signal. Your eScript token arrived as an SMS two weeks ago. The message is still in your inbox \u2014 in theory. But with no mobile data, that SMS link will not load. The QR code inside it cannot be retrieved. You cannot fill your prescription.`,
      `This is not a hypothetical edge case. It happens every day across Australia, and the pain points are predictable:`,
    ],
    scenarios: [
      {
        label: "No reception at the pharmacy counter",
        detail:
          "Many pharmacies are located inside shopping centres, medical centres, or older buildings with poor indoor mobile coverage. The signal bars drop just as you need to pull up your prescription.",
      },
      {
        label: "Expired mobile data plan",
        detail:
          "Prepaid SIM users who run out of data mid-month cannot load SMS links or email attachments. For many Australians \u2014 particularly pensioners and students on tight budgets \u2014 this is a regular occurrence.",
      },
      {
        label: "Rural and regional towns",
        detail:
          "Across outback Queensland, regional NSW, rural WA, and remote SA, mobile coverage is patchy or absent entirely. A pharmacy in a small country town may have no 4G signal at all. If your eScript lives in a link-based SMS, you cannot access it without signal.",
      },
      {
        label: "Phone restarts and app crashes",
        detail:
          "Email and SMS apps occasionally fail to load cached content after a restart. If your eScript token was stored only in your SMS inbox and your phone needs to connect to retrieve it, a simple restart at the wrong moment can leave you stuck.",
      },
    ],
    closing: `The core issue is structural: SMS and email eScript tokens are not stored locally on your device. They are links that point to data held elsewhere. Without connectivity, the link goes nowhere.`,
  },

  whyAppsNeedInternet: {
    heading: "Why most apps still require internet",
    body: [
      `Not all eScript apps solve the offline problem. Many solutions that look like wallets still depend on a live server connection to display your prescriptions.`,
      `Web-based solutions \u2014 accessed through a browser rather than a native app \u2014 fetch your script data from a remote server each time you view them. Close the tab, lose signal, and the data is gone from view. There is no local cache.`,
      `Apps that rely on Active Script List (ASL) synchronisation also require connectivity. The ASL is a government-maintained centralised record of your active prescriptions. While it is a useful system, accessing it requires your phone to call out to the ASL registry in real time. If that call cannot be made \u2014 because you are underground, in a rural area, or your data has run out \u2014 your scripts are not retrievable through the ASL alone.`,
      `The same limitation applies to pharmacy-specific apps that store your prescription history on the pharmacy's servers. Connectivity is assumed. When it fails, so does access.`,
    ],
  },

  howOfflineWorks: {
    heading: "How offline-first eScript storage works",
    body: [
      `An offline-first eScript wallet takes a fundamentally different approach: it downloads your prescription data to your device the moment you add a script, then renders the QR code entirely from local storage. No subsequent server call is ever needed to display it.`,
      `Here is the sequence with OpenPharmacy:`,
    ],
    steps: [
      {
        number: 1,
        name: "You receive your eScript token",
        description:
          "Your doctor sends you a token via SMS or email. This is a short alphanumeric code that points to your prescription in the national system.",
      },
      {
        number: 2,
        name: "You add the token to OpenPharmacy",
        description:
          "With the app installed and your account created, tap the link in your SMS to open directly to the Add Token screen, pre-populated and ready to save. At this point, OpenPharmacy retrieves your prescription details and QR code from the national system \u2014 this is the only moment internet access is required.",
      },
      {
        number: 3,
        name: "The QR code is encrypted and stored on-device",
        description:
          "The prescription data, including the QR code, is encrypted using ASD-approved end-to-end encryption and written to local storage on your device. It never leaves your phone after this point.",
      },
      {
        number: 4,
        name: "At the pharmacy, no internet needed",
        description:
          "Open OpenPharmacy, find the script, and show the QR code to the pharmacist. The QR code is rendered entirely from local storage. No server call is made. It works in airplane mode, underground, in a rural town with no coverage \u2014 anywhere.",
      },
    ],
    closing: `This architecture means your access to your prescription is not conditional on network availability. Once a script is in your wallet, it is yours \u2014 on your device, under your control, accessible any time.`,
  },

  whoNeedsOffline: {
    heading: "Who needs offline eScript access most?",
    intro: `Offline eScript access matters for a wider group of Australians than most people realise. These are the four groups for whom it is not just a convenience, but a necessity.`,
    groups: [
      {
        label: "Rural and regional Australians",
        detail:
          "Mobile coverage in outback Queensland, remote WA, regional NSW, rural Victoria, and much of South Australia's interior is unreliable or non-existent outside of major towns. Driving 60 kilometres to the nearest pharmacy with an SMS token that will not load is not a minor inconvenience \u2014 it is a failed medical trip. For Australians in these communities, an offline-first wallet is the only reliable approach to eScript management.",
      },
      {
        label: "People on prepaid plans who run out of mobile data",
        detail:
          "Around 30% of Australian mobile users are on prepaid plans. Running out of data before the monthly reset is a normal occurrence for students, pensioners, and budget-conscious households. An eScript that requires data to display is functionally inaccessible during those gaps \u2014 often the same days at the end of the month when people are trying to manage costs most carefully.",
      },
      {
        label: "Patients with chronic illness who fill scripts frequently",
        detail:
          "For someone filling the same scripts every four to eight weeks, the odds of hitting a connectivity problem at least once per year are high. Patients managing conditions like diabetes, hypertension, asthma, or thyroid disorders cannot afford a failed pharmacy visit. Offline access removes the connectivity variable from an already complex routine.",
      },
      {
        label: "Elderly patients without mobile data plans",
        detail:
          "Many older Australians use basic phones or SIM plans that do not include mobile data. For them, SMS links that require data to open and email-based eScripts are effectively inaccessible at the point of dispensing. An offline-first wallet, set up once with the help of a family member or carer, gives them independent, reliable access to their scripts without any ongoing data requirements.",
      },
    ],
  },

  openPharmacyDetail: {
    heading: "OpenPharmacy and offline access: what the app actually does",
    body: [
      `OpenPharmacy is an Australian eScript wallet developed by Easy As Health Pty Ltd, based in Brisbane. It is registered with the Australian Digital Health Agency (ADHA) and fully conformant with the national electronic prescribing standard.`,
      `The offline capability is not a marketing claim \u2014 it is a technical design choice that defines the app's architecture. Scripts are stored with ASD-approved end-to-end encryption. The QR code is rendered locally from on-device storage. No server call is made when you open a script at the pharmacy counter. The app works in full airplane mode.`,
      `The app is protected by a 4-digit PIN, so your prescription data is not accessible to anyone who picks up your phone. All data is stored on Australian servers and is never shared with third parties. The app automatically groups and sorts scripts by individual, making it easy for parents and carers to manage scripts for family members within the same account.`,
      `OpenPharmacy is free on iOS and Android. It works at any Australian pharmacy that accepts eScripts \u2014 there is no requirement to activate through a specific pharmacy chain or network.`,
    ],
  },

  comparison: {
    heading: "Comparing offline capabilities: Australian eScript apps",
    intro: `Not all eScript apps approach offline access the same way. The table below summarises how the main options compare. Data verified March 2026.`,
    headers: ["App", "Offline access", "QR storage", "How it works", "Connectivity needed when?"],
    rows: [
      [
        "OpenPharmacy",
        "Full offline \u2014 including airplane mode",
        "Stored on-device, ASD-approved encryption",
        "Token-based import; scripts stored locally after first add",
        "Only when first adding a script",
      ],
      [
        "Scripty",
        "Works offline after initial sync",
        "Cached locally after ASL sync",
        "ASL auto-sync pulls scripts; caches for offline use",
        "Required for ASL sync and adding new scripts",
      ],
      [
        "MedAdvisor",
        "Limited \u2014 most features require connectivity",
        "Not stored for offline QR display",
        "Connected to pharmacy dispensing history; server-dependent",
        "Required for most script access and management",
      ],
      [
        "SMS / email token",
        "No offline access",
        "Not stored locally",
        "Link-based \u2014 opens a web page to display QR",
        "Required every time you need to display the QR code",
      ],
    ],
    note: "Offline behaviour can vary with app version updates. Check each app's current documentation for the latest details.",
  },

  faq: [
    {
      question: "Does OpenPharmacy work in airplane mode?",
      answer:
        "Yes. Once you have added a script to OpenPharmacy, the QR code is stored on your device with end-to-end encryption. The app renders it from local storage with no internet connection required \u2014 it works in full airplane mode. You only need connectivity when you first add a script to your wallet.",
    },
    {
      question: "What happens if my phone has no signal at the pharmacy?",
      answer:
        "If your eScript is stored in OpenPharmacy, nothing changes \u2014 the QR code is available regardless of signal. You open the app, find your script, and show the QR code to the pharmacist. If your eScript is only in an SMS link or email, you cannot display it without connectivity, which means you cannot fill your prescription until you find a signal.",
    },
    {
      question: "Can I access my eScript without mobile data?",
      answer:
        "With OpenPharmacy, yes. The app is built to work entirely without mobile data once a script has been saved. This is particularly important for patients on prepaid plans who run out of data, elderly patients who do not have a data plan, and anyone in a low-coverage area. No Wi-Fi or mobile data is needed to view saved scripts.",
    },
    {
      question: "Which eScript apps work in rural Australia?",
      answer:
        "OpenPharmacy is the eScript app that explicitly guarantees offline QR code access, making it the most reliable option for rural and regional Australians where mobile coverage is inconsistent. Scripty also claims offline access after initial sync, though it relies on ASL connectivity for automatic updates. SMS and email-based tokens and web-based solutions do not work without an internet connection.",
    },
  ],
};

export default post;
