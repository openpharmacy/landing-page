/**
 * Blog post data for OpenPharmacy.
 *
 * Each post object contains:
 *   - slug:        URL-safe identifier used in /blog/:slug routing
 *   - title:       Full post title (used in <h1> and <title> tag)
 *   - description: Meta description (150-160 chars)
 *   - date:        ISO 8601 publish date string
 *   - updatedDate: ISO 8601 last-updated date string (optional)
 *   - readingTime: Estimated reading time string (e.g. "5 min read")
 *   - tags:        Array of topic tags
 *   - sections:    Array of content sections (see shape below)
 *
 * Section shape:
 *   { heading: string | null, paragraphs: string[], list: string[] | null }
 *
 * Keep `heading: null` for the opening "lead" section that appears before
 * the first H2 — this becomes the answer capsule AI models cite most.
 */

export const blogPosts = [
  {
    slug: "what-is-an-escript-australia",
    title: "What Is an eScript? Australia's Electronic Prescription System Explained",
    description:
      "Learn how Australian electronic prescriptions (eScripts) work, how to receive and store them, and how the OpenPharmacy app keeps your scripts secure and always accessible.",
    date: "2026-03-11",
    updatedDate: null,
    readingTime: "6 min read",
    tags: ["infrastructure", "blog", "technical"],
    sections: [
      {
        heading: null,
        paragraphs: [
          "An eScript (electronic prescription) is a digital version of a paper prescription issued by an Australian doctor, dentist, or nurse practitioner. Instead of handing you a paper form, your prescriber sends a secure token — usually via SMS or email — that contains all the information a pharmacist needs to dispense your medication. eScripts are fully supported across Australia under the National Prescription Delivery Service, regulated by the Australian Digital Health Agency (ADHA).",
          "Since 2020, Australian healthcare providers have progressively shifted to electronic prescribing. As of 2025, the majority of new prescriptions in Australia are issued electronically. Managing these tokens — especially when you have repeats or scripts for multiple family members — is exactly the problem OpenPharmacy was built to solve.",
        ],
        list: null,
      },
      {
        heading: "How Does an eScript Token Work?",
        paragraphs: [
          "When your doctor sends you an eScript, you receive a unique alphanumeric token (for example, 3GH7-K2MN-PQRT) along with a QR code. This token is a pointer into Australia's National Prescription Delivery Service — it holds no medication data itself, just a secure reference to your prescription record stored on the system.",
          "At the pharmacy, the dispensing software scans your QR code or enters the token manually. The system retrieves your prescription details, verifies your eligibility, and records the dispense. Once dispensed, the original token is invalidated and — if you have repeats — a new token is generated for the next repeat.",
          "This architecture means your prescription data never sits inside a text message or email. The token is just a key. The actual clinical data stays encrypted on Australian Health infrastructure.",
        ],
        list: null,
      },
      {
        heading: "How Do You Receive an eScript?",
        paragraphs: [
          "Most Australians receive their eScripts in one of three ways:",
        ],
        list: [
          "SMS link — your doctor's system texts you a link. Tapping it opens your eScript wallet app (like OpenPharmacy) directly if installed, or displays the QR code in a browser.",
          "Email — same concept as SMS, with a link that contains the token.",
          "My Script List (MySL) / Active Script List (ASL) — a government-backed service that automatically stores all your active eScripts and repeats. You can connect an eScript wallet app to MySL using an activation code from your pharmacy, and scripts sync automatically.",
        ],
      },
      {
        heading: "The Problem With Managing eScript Tokens",
        paragraphs: [
          "On paper, the system is elegant. In practice, patients run into real friction:",
        ],
        list: [
          "Tokens buried in SMS threads — finding a script from three months ago requires scrolling past hundreds of messages.",
          "Email inbox clutter — repeat tokens are easy to miss or accidentally delete.",
          "No signal at the pharmacy — some rural and regional pharmacies have poor connectivity, making browser-based QR codes unreliable.",
          "Multiple family members — caregivers managing scripts for children, parents, or partners end up juggling multiple phone numbers and email accounts.",
          "Expiry confusion — eScript tokens do not expire, but patients often believe they do, leading to unnecessary doctor appointments.",
        ],
      },
      {
        heading: "What Is an eScript Wallet?",
        paragraphs: [
          "An eScript wallet is a mobile app designed to securely store and organise your electronic prescription tokens in one place — the digital equivalent of the old plastic prescription folder. A good eScript wallet lets you view all your active scripts, see dosage details and remaining repeats, share a QR code directly with the pharmacist, and access your scripts even without an internet connection.",
          "Not all eScript wallets are equal. The most important qualities to look for are ADHA conformance (confirming the app meets government security standards), offline access (so QR codes work in areas with poor signal), data sovereignty (Australian servers, not offshore cloud storage), and family management features for caregivers.",
        ],
        list: null,
      },
      {
        heading: "How OpenPharmacy Stores and Protects Your eScripts",
        paragraphs: [
          "OpenPharmacy is a free eScript wallet app for iOS and Android, built and operated by Easy As Health Pty Ltd in Brisbane, Australia. It is registered with the Australian Digital Health Agency and fully conformant with ADHA's ePrescribing standards — you can verify this on the official ePrescribing conformance register.",
          "Security is built into every layer of the app. Data stored on your device is encrypted when the app is not in use. All data transmitted between the app and OpenPharmacy's servers uses end-to-end ASD-approved encryption. Server-side data is encrypted at rest. Critically, all data is stored on Australian servers — it never leaves Australian jurisdiction.",
          "OpenPharmacy works completely offline. Once your eScripts are loaded, the QR codes are available without any internet connection. This makes it reliable in areas with poor reception — a real advantage for patients in regional and rural Australia.",
        ],
        list: null,
      },
      {
        heading: "Key Features of the OpenPharmacy App",
        paragraphs: [
          "OpenPharmacy is designed to eliminate the friction of managing eScript tokens without introducing any complexity of its own:",
        ],
        list: [
          "Store and organise active and archived eScripts in one place",
          "Add new scripts via token link, manual token entry, or automatic MySL sync",
          "View dosage details, medication name, and remaining repeats at a glance",
          "Display prescription QR codes offline — no internet connection required",
          "Share scripts securely with pharmacies or trusted carers",
          "Manage prescriptions for family members (children, parents, partners) under one account",
          "PIN-protected access with end-to-end ASD-approved encryption",
          "Data stored exclusively on Australian servers — never shared with third parties",
        ],
      },
      {
        heading: "eScripts vs Paper Prescriptions: What Changed?",
        paragraphs: [
          "Paper prescriptions and eScripts represent the same clinical information — a doctor's authorisation for a medication. The key differences are in how they're handled:",
        ],
        list: [
          "Paper prescriptions can be lost, damaged, or forgotten at home. eScript tokens are stored digitally and accessible from your phone.",
          "Paper prescriptions must be physically taken to a pharmacy. eScript QR codes can be shown on-screen or shared remotely.",
          "Paper prescription repeats require you to collect a new form from the pharmacy. eScript repeat tokens are sent digitally (or automatically synced via MySL).",
          "Paper prescriptions have no built-in tracking of dispense history. eScript systems record each dispense in the National Prescription Delivery Service.",
        ],
      },
      {
        heading: "The Active Script List (ASL) and My Script List (MySL)",
        paragraphs: [
          "The Active Script List (ASL), branded to patients as My Script List (MySL), is a government-supported digital record of all your active eScripts and repeats. It's managed by MySL.com.au (operated by Medication Knowledge and eRx Script Exchange Pty Ltd, subsidiaries of Fred IT Group) under oversight of the Australian Digital Health Agency.",
          "Once you register for ASL at your pharmacy, all your active prescriptions — including paper prescriptions — are stored in the list and updated automatically when scripts are dispensed. OpenPharmacy can connect directly to your ASL using an activation code from your pharmacist, syncing all your scripts and repeats automatically. This removes the need to manually add each token.",
          "Registering for ASL at your pharmacy requires identity verification (100 points of ID) and your mobile number. Your pharmacist can complete the process in a few minutes.",
        ],
        list: null,
      },
      {
        heading: "Who Should Use an eScript Wallet App?",
        paragraphs: [
          "Anyone who receives electronic prescriptions in Australia can benefit from an eScript wallet, but the value is highest for:",
        ],
        list: [
          "Patients with chronic conditions — multiple ongoing prescriptions and regular repeats are hard to track across SMS and email threads.",
          "Caregivers and parents — managing scripts for children or elderly parents from one app is far simpler than juggling multiple accounts.",
          "Rural and regional patients — offline QR code access is critical where pharmacy internet connections are unreliable.",
          "Privacy-conscious patients — a dedicated, encrypted app with Australian data storage is more secure than scripts sitting in email inboxes.",
          "Anyone who has ever lost a prescription — the inconvenience of requesting a re-issue is a strong motivator to move to a dedicated wallet.",
        ],
      },
      {
        heading: "Getting Started With OpenPharmacy",
        paragraphs: [
          "OpenPharmacy is free to download and free to use — there are no subscription fees and no ads. Getting started takes under two minutes:",
        ],
        list: [
          "Download OpenPharmacy from the App Store (iOS) or Google Play (Android).",
          "Sign in using your Google or Apple account — no additional registration required.",
          "Add your first eScript by tapping the token link sent by your doctor, entering a token manually, or connecting your My Script List (MySL) activation code for automatic syncing.",
          "Show the QR code at your pharmacy — it works offline, so no internet connection is needed at the counter.",
        ],
      },
    ],
  },
];

export default blogPosts;
