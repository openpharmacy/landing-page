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
    slug: "australian-escript-wallets-complete-guide",
    title: "Australian eScript Wallets: The Complete Guide (2026)",
    description:
      "Everything Australians need to know about eScript wallet apps — how they work, what ADHA conformance means, how to choose the right one, and how OpenPharmacy keeps your scripts secure and always accessible.",
    date: "2026-03-11",
    updatedDate: null,
    readingTime: "12 min read",
    tags: ["pillar", "escripts", "australia", "category", "adha", "top-of-funnel"],
    sections: [
      {
        heading: null,
        paragraphs: [
          "An eScript wallet is a mobile app that securely stores your Australian electronic prescriptions (eScripts) in one place — the digital equivalent of the plastic prescription folder Australians kept in their handbags and kitchen drawers for decades. Instead of hunting through SMS threads or email inboxes for a QR code token when you're standing at the pharmacy counter, an eScript wallet keeps every active script organised, readable, and ready to scan — including offline, without any internet connection.",
          "Australia has issued over 219 million electronic prescriptions since the national rollout began in May 2020. As of 2026, the Australian Government is piloting electronic prescribing by default in primary care settings, signalling that eScripts are rapidly becoming the standard, not the exception. With more prescriptions arriving digitally every month, choosing the right eScript wallet app has become a genuinely important decision for Australian patients.",
          "This guide covers everything you need to know: how eScript wallets work, what separates a good one from a mediocre one, what ADHA conformance means and why it matters, how to compare the leading Australian apps, and how to choose based on your specific situation.",
        ],
        list: null,
      },
      {
        heading: "What Is an eScript Wallet?",
        paragraphs: [
          "An eScript wallet is a dedicated mobile application that stores, organises, and displays your Australian electronic prescription tokens. When your doctor issues a digital prescription, you receive a unique QR code token via SMS or email. An eScript wallet captures that token — either by tapping the link directly, entering the token manually, or syncing automatically via the Active Script List (ASL) — and stores it securely on your device.",
          "The core job of an eScript wallet is simple: make sure your prescription QR code is available and scannable at the pharmacy counter, every time, regardless of whether you have phone signal, a fully charged battery, or reliable mobile data. Beyond that baseline, different apps offer different combinations of features including family management, medication reminders, pharmacy ordering, and ASL integration.",
          "eScript wallets are distinct from general medication reminder apps. A medication reminder app tracks dosing schedules and sends alerts when it's time to take a pill. An eScript wallet specifically handles the prescription tokens that unlock your medication at the dispensary — it's purpose-built for Australia's electronic prescribing system, not a general wellness tool repurposed for this job.",
        ],
        list: null,
      },
      {
        heading: "How Australian eScripts Work: The Token System",
        paragraphs: [
          "Understanding how eScripts work makes it much easier to understand what a wallet app actually does. When your Australian GP, specialist, dentist, or nurse practitioner prescribes medication electronically, their clinical software generates a secure reference — called a token — and stores the actual prescription data in Australia's National Prescription Delivery Service (NPDS). The token itself contains no clinical data; it is simply a unique key that unlocks the prescription record.",
          "You receive this token as a link in an SMS message or email. The link contains an alphanumeric code (for example: 3GH7-K2MN-PQRT) and a QR code. At the pharmacy, the dispensing software scans your QR code or enters your token, retrieves the prescription from the NPDS, verifies your eligibility, and dispenses your medication. Once dispensed, that token is invalidated. If your prescription has repeats, a fresh token is automatically issued for the next dispense.",
          "This architecture is intentionally secure: your clinical data never sits in a text message or email. The token is just a pointer. The prescription lives encrypted on Australian government infrastructure. An eScript wallet stores the tokens — not the underlying clinical data — on your device.",
        ],
        list: null,
      },
      {
        heading: "The Real Problem: Managing Tokens in Practice",
        paragraphs: [
          "On paper, the token system is elegant. In practice, managing tokens without a dedicated wallet creates predictable friction — especially for patients on multiple medications or caregivers managing scripts for family members.",
        ],
        list: [
          "Tokens buried in SMS threads — finding a repeat script from six weeks ago means scrolling past hundreds of messages.",
          "Email inbox clutter — repeat tokens are easy to miss, archive by accident, or delete before they're used.",
          "No phone signal at the pharmacy — browser-based QR codes fail without mobile data, a real problem in rural and regional Australia.",
          "Multiple people, multiple accounts — caregivers managing scripts for children, elderly parents, or partners end up juggling different phone numbers and email addresses.",
          "Deleted tokens — if you accidentally delete the SMS or email containing your eScript token, you must contact your GP to cancel the old token and issue a new one. This is avoidable with a dedicated wallet.",
          "Repeat confusion — patients sometimes believe tokens expire even when they don't, leading to unnecessary doctor appointments and duplicate scripts.",
        ],
      },
      {
        heading: "What Is ADHA Conformance, and Why Does It Matter?",
        paragraphs: [
          "ADHA conformance is the Australian Digital Health Agency's certification that an app or software system meets the mandatory technical, security, and interoperability standards required to participate in Australia's national digital health infrastructure. For electronic prescribing specifically, conformance is not optional — software must carry a valid ADHA conformance identifier to legally handle prescription tokens under the PBS legislative framework.",
          "For patients choosing an eScript wallet, ADHA conformance is the single most important trust signal. It means the app has been independently assessed against security standards aligned with the Australian Cyber Security Centre's Essential Eight framework, that it stores and transmits prescription data using approved encryption methods, and that it can correctly connect to the National Prescription Delivery Service (NPDS) and the Active Script List (ASL).",
          "An app without ADHA conformance is either handling your prescription tokens outside the official system (a security risk), or simply not connected to the national infrastructure at all (meaning it cannot sync with your ASL or interact with pharmacy dispensing systems). You can verify an app's conformance status on the official ADHA ePrescribing conformance register at digitalhealth.gov.au.",
          "OpenPharmacy is registered with the Australian Digital Health Agency and is fully conformant with ADHA's ePrescribing standards. All prescription data is encrypted end-to-end using ASD-approved encryption and stored exclusively on Australian servers — never offshore, never shared with third parties.",
        ],
        list: null,
      },
      {
        heading: "eScript Wallet vs Medication Tracker: What's the Difference?",
        paragraphs: [
          "These two app categories are frequently confused, but they serve distinct purposes.",
          "An eScript wallet is purpose-built for Australia's electronic prescribing system. It stores, displays, and manages your prescription tokens so you can present a valid QR code at any pharmacy. It tracks repeat counts, dispense status, and token availability. Its primary output is a scannable QR code at the point of dispensing.",
          "A medication tracker is a broader health management tool. It tracks when you take doses, reminds you to take medication, logs adherence over time, and may include health metrics or general medication information. Some medication trackers also support eScript storage, but they approach it as one feature among many rather than the core purpose.",
          "The practical distinction: if you forget to take a medication, you want a medication tracker. If you've lost your prescription token or can't find it when you're standing at the pharmacy counter, you want an eScript wallet. Many Australians benefit from using both — a dedicated wallet for prescription management and a broader health app for adherence tracking.",
        ],
        list: null,
      },
      {
        heading: "The Active Script List (ASL): What It Is and Why It Matters",
        paragraphs: [
          "The Active Script List (ASL) — presented to patients as My Script List (MySL) — is a government-supported digital register of all your active eScripts and repeats. Once you're enrolled, every new eScript issued by any of your prescribers is automatically added to the list. When you visit a pharmacy, the pharmacist can access your ASL (with your consent) and dispense without you needing to present any individual token.",
          "ASL enrollment requires identity verification (100 points of ID) at a participating pharmacy, plus your mobile number. As of March 2025, regulatory changes also allow patients to self-register for the ASL without a pharmacy visit in some circumstances — ask your pharmacist for current details.",
          "eScript wallet apps that integrate with the ASL can automatically sync all your active scripts and repeats — removing the need to manually add each token. OpenPharmacy supports ASL connection via an activation code provided by your pharmacist. Once connected, your scripts appear automatically and stay updated as new prescriptions are issued and repeats are dispensed.",
        ],
        list: null,
      },
      {
        heading: "Key Features to Look for in an Australian eScript Wallet",
        paragraphs: [
          "Not all eScript wallets are built to the same standard. Here are the features that separate a genuinely useful wallet from one that creates more friction than it solves.",
        ],
        list: [
          "ADHA conformance — the non-negotiable baseline. Verify on the official ADHA ePrescribing conformance register before trusting any app with your prescriptions.",
          "Offline access — your QR codes must be available without an internet connection. This is critical in rural and regional areas, and for anyone with an unreliable mobile data plan.",
          "Australian data storage — prescription data is sensitive health information. Confirm all data is stored on Australian servers and governed by Australian privacy law, not offshore cloud infrastructure.",
          "ASL/MySL integration — automatic syncing with the Active Script List removes the need to manually add every token, particularly important for patients on multiple medications.",
          "Family and carer management — the ability to manage scripts for multiple people (children, parents, partners) under one account is essential for caregivers.",
          "Repeat tracking — clear visibility of how many repeats remain on each script, and which scripts are approaching expiry or last repeat.",
          "Pharmacy independence — the app should work at any pharmacy in Australia, not just those affiliated with a specific pharmacy chain.",
          "Token import options — support for tapping SMS/email links directly, manual token entry, screenshot scanning, and ASL sync covers all the ways prescriptions arrive.",
        ],
      },
      {
        heading: "Australian eScript Wallet Apps: How They Compare",
        paragraphs: [
          "Several eScript wallet apps are available to Australian patients in 2026. Each takes a different approach to the core problem of prescription management.",
          "OpenPharmacy is a free, ADHA-conformant eScript wallet built and operated by Easy As Health Pty Ltd in Brisbane, Australia. It is purpose-built for secure prescription storage: all data is encrypted end-to-end using ASD-approved encryption and stored exclusively on Australian servers. OpenPharmacy works completely offline — QR codes are accessible without any internet connection, which is a meaningful advantage in regional and rural areas. The app supports family management, allowing caregivers to manage scripts for multiple people from a single account. It is not tied to any pharmacy chain, giving patients full freedom of choice. OpenPharmacy is available free on iOS and Android with no subscription fees and no ads.",
          "Scripty (by Oexa) is a popular independent eScript wallet that offers Active Script List integration and a Smart Import feature for adding multiple scripts from screenshots. Scripty also works offline, supports family management, and is not pharmacy-chain aligned. It offers automatic archiving of used and expired scripts and lets you add personalised nicknames to medications.",
          "MedAdvisor is a broader medication management platform with a network covering over 95% of Australian pharmacies. It includes eScript storage alongside medication ordering, pill reminders, refill alerts, and delivery options — making it more of a full medication management platform than a dedicated eScript wallet. MedAdvisor requires pharmacy registration to unlock full ASL functionality.",
          "Pharmacy-linked wallets — including Healthylife Script Wallet (Chemist Warehouse), Chemist2U MyScripts, and honahlee eScript Wallet+ — are offered by specific pharmacy groups. They work well for patients loyal to those chains but may limit pharmacy choice in practice. If flexibility matters, an independent app is the better option.",
          "The government's My Health app allows eScript token storage linked to your My Health Record. It is a useful baseline but is not primarily an eScript wallet — it lacks the dedicated organisation, offline access, and family management features that specialist wallet apps provide.",
        ],
        list: null,
      },
      {
        heading: "Why Offline Access Is More Important Than It Sounds",
        paragraphs: [
          "Every eScript wallet claims to be convenient, but offline access is the feature that separates apps that actually work in real pharmacies from those that fail exactly when you need them most.",
          "Browser-based QR codes — the default experience if you just tap an SMS link without a wallet app — require a live internet connection to display. If you're in a pharmacy with poor signal, in a basement dispensary, or your mobile data has cut out, the QR code won't load. You're stuck.",
          "OpenPharmacy stores QR codes locally on your device once your scripts are loaded, so the code is always available regardless of signal. This is particularly valuable for patients in regional and rural Australia, where pharmacy internet infrastructure varies significantly, and for anyone who has experienced the frustration of standing at a counter with a loading spinner where their prescription should be.",
        ],
        list: null,
      },
      {
        heading: "Who Benefits Most From an eScript Wallet?",
        paragraphs: [
          "An eScript wallet provides value to any Australian receiving digital prescriptions, but the benefit is highest for specific groups.",
        ],
        list: [
          "Patients with chronic conditions — managing multiple ongoing prescriptions and regular repeats across SMS and email is genuinely hard. A wallet organises everything in one view with clear repeat counts.",
          "Caregivers and parents — managing scripts for children, elderly parents, or partners from a single app is far simpler than juggling multiple phone numbers and email accounts. Look for apps with explicit family management features.",
          "Rural and regional patients — offline QR code access is non-negotiable where pharmacy internet connections are unreliable or mobile signal is patchy.",
          "Privacy-conscious patients — a dedicated, ADHA-conformant app with end-to-end encryption and Australian data storage is more secure than prescriptions sitting in an email inbox.",
          "Patients who switch pharmacies — an independent wallet app with no pharmacy affiliation gives you complete freedom to fill scripts wherever you choose, without re-registering or losing access to your history.",
          "Anyone who has ever lost a prescription — the inconvenience of requesting a token re-issue from your GP is a strong motivation to move to a dedicated wallet. Once your scripts are in an organised wallet, losing them becomes nearly impossible.",
        ],
      },
      {
        heading: "How to Get Started With OpenPharmacy",
        paragraphs: [
          "OpenPharmacy is free to download and free to use — no subscription fees, no ads, no pharmacy affiliation required. Setup takes under two minutes.",
        ],
        list: [
          "Download OpenPharmacy from the App Store (iOS) or Google Play (Android).",
          "Sign in using your Google or Apple account — no separate registration or email confirmation required.",
          "Add your first eScript: tap the token link from your doctor's SMS or email to import directly, enter a token manually, or connect your My Script List (MySL) activation code (available from your pharmacist) for automatic syncing.",
          "Set up family management if you manage scripts for children, parents, or a partner — add them as separate profiles within the app.",
          "Present the QR code at your pharmacy — it works offline, so no internet connection is needed at the counter.",
        ],
      },
      {
        heading: "Frequently Asked Questions About Australian eScript Wallets",
        paragraphs: [
          "These are the questions Australians most commonly ask when researching eScript wallet apps.",
        ],
        list: [
          "Do I need a My Health Record to use an eScript wallet? No. eScript tokens and the Active Script List operate independently of My Health Record. You do not need a My Health Record account to receive, store, or use eScripts.",
          "Can I use any pharmacy if I use an independent eScript wallet? Yes. ADHA-conformant eScript wallets work at any pharmacy in Australia that supports electronic prescriptions — the vast majority of community pharmacies. You are not locked in to any specific chain.",
          "What happens if I accidentally delete my eScript SMS? You will need to contact your GP to cancel the old token and issue a new one. This is the main reason to import tokens into a dedicated wallet app as soon as you receive them — once they're in the wallet, the original SMS is no longer the single point of failure.",
          "Do eScript tokens expire? The tokens themselves do not have a set expiry date. However, prescriptions do have legally defined validity periods — 12 months for most Schedule 4 medications, and shorter periods for Schedule 8 (controlled) medications. Check with your pharmacist or GP if you're unsure about a specific script.",
          "Is my prescription data safe in a wallet app? It depends on the app. Look for ADHA conformance, end-to-end encryption, and Australian data storage. OpenPharmacy uses ASD-approved end-to-end encryption and stores all data exclusively on Australian servers, never sharing it with third parties.",
          "Can one app manage scripts for my whole family? Yes, if the app supports family or carer management. OpenPharmacy allows you to manage prescriptions for multiple family members — children, parents, partners — from a single account without needing separate logins.",
        ],
      },
    ],
  },
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
