/**
 * Content data for:
 * What Is an eScript Wallet? A Plain-English Guide for Australians
 * URL: /blog/what-is-an-escript-wallet-australia
 */

const post = {
  intro: `An eScript wallet is a secure mobile app that stores, organises, and displays your Australian electronic prescription (eScript) QR codes in one place, replacing the need to manage tokens through SMS messages or emails. eScript wallets like OpenPharmacy work offline, so your QR codes are always available at the pharmacy even without mobile data.`,

  whatIsEscript: {
    heading: "What is an electronic prescription (eScript) in Australia?",
    body: [
      `Since the Australian Digital Health Agency (ADHA) began rolling out e-prescribing in 2020, Australian doctors can send prescriptions electronically rather than printing them on paper. Instead of a paper script, your doctor generates a unique digital token \u2014 a short alphanumeric code \u2014 and delivers it to you via SMS or email. Each token contains a QR code that a pharmacist scans to retrieve your prescription details from a secure national database and dispense your medication.`,
      `By March 2026, electronic prescriptions are the default for most GP consultations across Australia. The system is governed by the ADHA and operates under the national electronic prescribing standard, which sets strict rules around security, patient privacy, and how tokens can be created, stored, and used.`,
      `Each eScript token is single-use for that dispensing event. If your prescription has repeats, the pharmacist generates a new token at the point of dispensing, which is then sent back to you via SMS for your next fill.`,
    ],
  },

  whatIsWallet: {
    heading: "What is an eScript wallet?",
    body: [
      `An eScript wallet is a dedicated mobile app that imports your eScript tokens and stores the associated QR codes securely on your device. Instead of hunting through your SMS inbox or email at the chemist counter, you open the app, find the script you need, and show the QR code to the pharmacist for scanning.`,
      `The alternative approaches each have real drawbacks that patients run into quickly:`,
    ],
    alternatives: [
      {
        label: "Leaving tokens in your SMS inbox",
        detail:
          "Easy to accidentally delete. Hard to distinguish between multiple scripts for different medications or family members. No way to see dosage details or track remaining repeats at a glance.",
      },
      {
        label: "Managing tokens in your email inbox",
        detail:
          "Buried among other emails and hard to find quickly at a busy pharmacy counter. Searching for a specific prescription under pressure is frustrating and slow.",
      },
      {
        label: "Taking screenshots of QR codes",
        detail:
          "A QR code screenshot is only valid once \u2014 when the pharmacist scans it, the token is used and a new one is issued. Screenshots also pile up in your camera roll with no organisation, dosage info, or repeat tracking.",
      },
    ],
    closing: `An eScript wallet solves all three problems: scripts are centralised, labelled with medication names and dosage details, and updated with remaining repeats after each fill. For patients managing multiple medications or scripts for family members, the difference is significant.`,
  },

  whatIsAsl: {
    heading: "What is the Active Script List (ASL)?",
    body: [
      `The Active Script List (ASL) \u2014 also called My Script List or MySL \u2014 is a government-maintained centralised record of a patient's electronic prescriptions. When a doctor writes you an eScript, it can be automatically added to your ASL, and pharmacists can access it with your consent without you needing to present a token at all.`,
      `To use the ASL, you register at a pharmacy using 100 points of identification. Once set up, some eScript wallet apps can connect to your ASL and automatically sync new prescriptions as your doctor sends them.`,
      `Different apps take different approaches to ASL. Scripty connects to the ASL for auto-sync, which means new prescriptions appear in the app without you needing to save a token manually. OpenPharmacy takes a direct token import approach: you save your token to the app yourself, which means your prescription data stays entirely on your device and is never routed through a third-party cloud sync service. For patients who prioritise privacy and offline-first storage, this distinction matters.`,
    ],
  },

  howItWorks: {
    heading: "How does an eScript wallet work? Step by step",
    intro: `Here is how the process works from a doctor's visit through to picking up your medication, using OpenPharmacy as an example.`,
    steps: [
      {
        number: 1,
        name: "Doctor sends your eScript token",
        description:
          "During or after your appointment, your doctor electronically creates your prescription. You receive a unique token via SMS or email \u2014 this is a short link and QR code that represents your prescription in the national system.",
      },
      {
        number: 2,
        name: "Open the OpenPharmacy app",
        description:
          "Launch OpenPharmacy on your iPhone or Android phone. The app does not require an internet connection to view your saved scripts.",
      },
      {
        number: 3,
        name: "Add the script using the token",
        description:
          "With the app installed and your account created, tap the SMS link to open directly to the Add Token screen, pre-populated and ready to save. The script is immediately saved to your wallet, showing the medication name, dosage, and number of repeats remaining.",
      },
      {
        number: 4,
        name: "Script appears in your wallet",
        description:
          "The prescription is now stored securely in OpenPharmacy with all details visible. The app automatically groups and sorts scripts by individual \u2014 so managing scripts for family members is effortless. You can view archived scripts, and see at a glance which scripts have repeats available.",
      },
      {
        number: 5,
        name: "Show the QR code at any pharmacy",
        description:
          "At the pharmacy, open the script in the app and show the QR code to the pharmacist. The QR code is fully visible without an internet connection \u2014 even in areas with no mobile signal. The pharmacist scans it, your medication is dispensed, and the next repeat token (if applicable) is sent to you automatically.",
      },
    ],
  },

  walletVsReminder: {
    heading: "eScript wallet vs. medication reminder app \u2014 what's the difference?",
    intro: `These are two different tools that solve different problems. Patients with ongoing or complex prescriptions often find they need both.`,
    tableHeaders: ["Feature", "eScript Wallet", "Medication Reminder App"],
    tableRows: [
      ["Primary purpose", "Stores and displays prescription QR codes for pharmacy dispensing", "Tracks when to take medications and sends dose reminders"],
      ["Core use case", "Replacing SMS/email token management at the point of dispensing", "Reducing missed doses and supporting adherence to a medication schedule"],
      ["Works at the pharmacy?", "Yes \u2014 the QR code is scanned directly from the app", "No \u2014 reminder apps don't hold dispensable prescription tokens"],
      ["Tracks repeats remaining?", "Yes \u2014 updated after each pharmacy visit", "Sometimes, but not tied to the live dispensing system"],
      ["Offline access?", "Yes (for wallets like OpenPharmacy)", "Typically yes, for local notification scheduling"],
      ["Examples", "OpenPharmacy, Scripty", "Medisafe, general calendar reminders"],
    ],
    closing: `If you take medications regularly, an eScript wallet handles the prescription storage and pharmacy visit, while a reminder app handles the daily schedule of taking your medication. They complement rather than replace each other.`,
  },

  whatToLookFor: {
    heading: "What to look for in an eScript wallet",
    intro: `Not all eScript wallet apps are equal. These are the six features worth checking before you commit to one.`,
    criteria: [
      {
        label: "Offline access",
        detail:
          "The app should display your QR codes without an internet connection. If the app requires connectivity to show scripts at the pharmacy counter, you are at risk in areas with poor reception \u2014 common in regional and rural Australia, underground car parks, and in buildings with weak signal.",
      },
      {
        label: "ADHA registration",
        detail:
          "Look for apps listed on the Australian Digital Health Agency's ePrescribing Conformance Register. This registration confirms the app has been formally assessed and meets the national standards for accessing and handling prescription data.",
      },
      {
        label: "Australian data storage",
        detail:
          "Your prescription data is sensitive health information. It should be stored on servers located in Australia and subject to Australian privacy law, not on offshore servers where different legal standards apply.",
      },
      {
        label: "Family management",
        detail:
          "Parents managing children's scripts and adult children managing prescriptions for elderly parents need an app that keeps each person's scripts clearly organised within one account, rather than maintaining separate phone accounts or apps.",
      },
      {
        label: "PIN or biometric protection",
        detail:
          "The app should require a PIN or biometric authentication to open. Prescription information is personal health data \u2014 it should not be accessible to anyone who picks up your phone.",
      },
      {
        label: "Pharmacy independence",
        detail:
          "The app should work with any Australian pharmacy that accepts eScripts, without requiring you to activate it through a specific pharmacy chain or network. Pharmacy independence means you can choose where you fill your prescription freely.",
      },
    ],
  },

  openPharmacySection: {
    heading: "How OpenPharmacy works as an eScript wallet",
    body: [
      `OpenPharmacy is an Australian eScript wallet developed by Easy As Health Pty Ltd, based in Brisbane. It is registered with the Australian Digital Health Agency (ADHA) and fully conformant with the national electronic prescribing standard.`,
      `The app is built around a single priority: making sure your prescription QR codes are always available. OpenPharmacy works completely offline \u2014 once a script is saved to your wallet, the QR code is accessible with no internet connection at all, including in areas with no mobile signal. This is the feature most frequently cited by patients in rural and regional areas as the reason they chose it over alternatives.`,
      `Security is handled through end-to-end ASD-approved encryption and a 4-digit PIN. All data is stored on Australian servers and is never shared with third parties. The app automatically groups and sorts scripts by individual, making it effortless for parents and carers to manage scripts for family members within one account.`,
      `OpenPharmacy is free on iOS and Android and does not require activation through a specific pharmacy. You can present your QR codes at any pharmacy in Australia that accepts eScripts.`,
    ],
  },

  faq: [
    {
      question: "Can I use an eScript at any pharmacy in Australia?",
      answer:
        "Yes. Electronic prescriptions can be filled at any pharmacy in Australia that participates in the national e-prescribing system, which includes the vast majority of dispensing pharmacies. Your eScript token or QR code is not tied to a specific pharmacy \u2014 you choose where to fill it each time. The pharmacist scans your QR code, which retrieves your prescription details from the secure national database regardless of which pharmacy you are at.",
    },
    {
      question: "What happens if I delete my eScript SMS by accident?",
      answer:
        "The prescription itself is not lost \u2014 it is stored securely in the national electronic prescribing system. The SMS is simply a token that points to it. For an original prescription, contact your doctor and ask them to resend the token. For a repeat prescription, contact the pharmacy that last dispensed it \u2014 they can resend the repeat token. This is one of the reasons saving tokens to an eScript wallet like OpenPharmacy immediately after receiving them is a good habit: your QR code stays in the app even if the original SMS is deleted.",
    },
    {
      question: "Is it safe to screenshot an eScript QR code?",
      answer:
        "It is not recommended. A QR code screenshot provides no security \u2014 anyone with access to your photo library can see it. More practically, an eScript token is single-use per dispensing event: once the pharmacist scans it, that token is consumed and a new repeat token is issued. Screenshots also accumulate in your camera roll with no labels, no dosage information, and no way to track remaining repeats. An eScript wallet stores the QR code securely behind a PIN, keeps it labelled and organised, and updates after each pharmacy visit.",
    },
    {
      question: "Do eScript wallets work without internet?",
      answer:
        "The best ones do. OpenPharmacy is built to work completely offline \u2014 your prescription QR codes are stored on your device and are accessible with no mobile data or Wi-Fi connection. This matters most in rural and regional areas, underground spaces, and any location with unreliable signal. Not all eScript apps offer the same guarantee: some require an internet connection to retrieve scripts from a cloud server at the point of dispensing, which can leave you stuck in areas without coverage.",
    },
  ],
};

export default post;
