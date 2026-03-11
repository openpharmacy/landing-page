/**
 * Blog post registry for OpenPharmacy.
 *
 * Each entry is rendered by src/pages/BlogPostPage.jsx via the /blog/:slug route.
 * The BlogIndex page (src/pages/BlogIndex.jsx) lists all posts from this array.
 *
 * Entry shape:
 * {
 *   slug:        string  — URL segment, e.g. "how-to-manage-escripts" → /blog/how-to-manage-escripts
 *   title:       string  — Article headline (used as <h1>, page <title>, and schema headline)
 *   description: string  — 150-160 char summary (used as meta description and card excerpt)
 *   date:        string  — ISO 8601 date string, e.g. "2026-03-11"
 *   author:      string  — Author display name, e.g. "OpenPharmacy Team"
 *   sections: Array<{
 *     heading:    string | null  — Section <h2> heading; null to omit heading
 *     paragraphs: string[]       — One string per <p> tag
 *     list:       string[] | undefined  — Optional bulleted list items rendered as <ul><li>
 *   }>
 *   relatedSlugs: string[]  — Up to 3 slugs of related posts for the "Related Articles" block
 * }
 */

/** @type {Array<{slug: string, title: string, description: string, date: string, author: string, sections: Array<{heading: string|null, paragraphs: string[], list?: string[]}>, relatedSlugs: string[]}>} */
const blogPosts = [
  {
    slug: "australian-escripts-explained",
    title: "Australian eScripts Explained: The Complete Guide for Patients (2026)",
    description:
      "Learn how electronic prescriptions work in Australia — from the eScript token to the Active Script List, ADHA conformance, and how to keep all your scripts organised and accessible.",
    date: "2026-03-11",
    author: "OpenPharmacy Team",
    relatedSlugs: ["best-escript-apps-australia-2026"],
    sections: [
      {
        heading: null,
        paragraphs: [
          "Electronic prescriptions — commonly called eScripts — are now the standard way most Australian GPs and nurse practitioners issue prescriptions. Since launching in May 2020, over 219 million eScripts have been issued by more than 85,958 prescribers across Australia, according to the Australian Digital Health Agency (ADHA). If you have recently received a QR code via SMS or email instead of a paper slip, this guide explains exactly what it is, how to use it, and how to make sure your scripts are always organised and accessible.",
        ],
      },
      {
        heading: "What Is an eScript?",
        paragraphs: [
          "An eScript is a fully legal digital version of a paper prescription. Instead of handing you a signed piece of paper at the end of your appointment, your doctor uses conformant clinical software to generate a prescription that is stored securely in an encrypted Prescription Exchange Service (PES). You receive a unique QR code — called a token — by SMS or email. That token is your key to unlocking the prescription at any participating pharmacy.",
          "The two Prescription Exchange Services operating in Australia are eRX and Medisecure. Both are interoperable, meaning a token issued through one service can be scanned at a pharmacy connected to the other. Every participating pharmacy, prescriber, and patient app must be conformant with ADHA technical specifications for the system to work legally.",
          "One important detail: the token itself is not the legal prescription. It is evidence of a prescription stored on the PES. Once a pharmacist scans the token and dispenses the medicine, the token is immediately invalidated — it cannot be reused or scanned again at another pharmacy. This built-in security measure prevents double-dispensing.",
        ],
      },
      {
        heading: "How eScripts Work: Step by Step",
        paragraphs: [
          "The process for getting your medicine with an eScript is straightforward, whether you are at a GP clinic or a telehealth consultation.",
        ],
        list: [
          "Step 1 — Your doctor prescribes electronically: Using ADHA-conformant clinical software, your GP or nurse practitioner creates a prescription. You receive a separate token for each medicine prescribed.",
          "Step 2 — Your token arrives by SMS or email: Check that you have received your token before finishing the consultation. The token contains a QR code and a link showing basic details like your initials, the drug name, and quantity.",
          "Step 3 — Take your token to any pharmacy: Present the QR code at any pharmacy set up for electronic dispensing, which includes most pharmacies across Australia. The pharmacist scans the token to retrieve the full prescription from the secure PES.",
          "Step 4 — Collect your medicine: The pharmacist dispenses your medication. Once dispensed, the original token is cancelled.",
          "Step 5 — Repeats are sent automatically: If your prescription has repeats, the pharmacy will send you a new token by SMS or email once the current supply is dispensed. You will need this new token for your next fill. Alternatively, if you use an Active Script List, repeats are added back to your list automatically.",
        ],
      },
      {
        heading: "What Is the Active Script List (ASL)?",
        paragraphs: [
          "The Active Script List (ASL) is a national digital list of all your active eScripts and barcoded paper prescriptions. It is the alternative to managing individual tokens and is particularly useful if you take two or more regular medications.",
          "Once you register for an ASL, every new eScript your doctor issues is automatically added to your list. When you visit a participating pharmacy, you simply give consent for the pharmacist to access your ASL, and they can dispense your medicines directly — no token required. Repeats are added back to your ASL after each dispensing.",
          "As of March 2025, you can now self-register for the ASL without needing to visit a pharmacy first. This follows a change to the Healthcare Identifiers Regulations 2020 introduced under the Healthcare Identifiers (Active Script List Registration) Regulations 2025. You can also give a carer or trusted person access to your ASL to collect medicines on your behalf.",
          "You do not have to use the ASL. Some patients prefer to keep control of individual tokens, particularly for sensitive medications they do not want automatically visible at every pharmacy they visit. Patients can opt specific medicines out of the ASL at the point of prescribing by asking their doctor.",
        ],
      },
      {
        heading: "eScript Token vs Active Script List: Which Should You Use?",
        paragraphs: [
          "Both approaches are legal and fully supported. The right choice depends on how many medications you manage and how much control you want over each script.",
        ],
        list: [
          "Tokens are best for: occasional prescriptions, one-off medications, or when you want full manual control over which pharmacy sees each script.",
          "The ASL is best for: people on multiple ongoing medications, those who see more than one prescriber, carers managing scripts for family members, and anyone who finds keeping track of individual tokens frustrating.",
          "Hybrid approach: You can use both at the same time. Most regular medications can go to your ASL while you manage sensitive or one-off scripts as individual tokens.",
        ],
      },
      {
        heading: "How Long Does an eScript Last?",
        paragraphs: [
          "Electronic prescriptions are valid for exactly the same period as paper prescriptions. For most standard medicines, this is up to 12 months from the date of issue. There is no difference in validity between paper and electronic formats.",
          "One critical point many patients miss: all repeats on a script must be dispensed within the validity window. If a prescription expires, any remaining repeats cannot be used — you will need a new prescription from your doctor.",
          "The new 60-day dispensing option, available for eligible PBS medications, gives you a larger pack size per fill but does not change the validity period of the prescription itself.",
        ],
      },
      {
        heading: "What Happens If You Lose Your eScript Token?",
        paragraphs: [
          "Losing a paper prescription was a real problem — you would need to contact your doctor for a replacement. With eScripts, the process is much simpler.",
          "If you lose or accidentally delete the SMS or email containing your token, contact your prescribing doctor's clinic. For original prescriptions, the doctor can arrange for the token to be resent. If you have an Active Script List, the script remains on your list regardless — there is no token to lose.",
          "Using a dedicated eScript wallet app is the most reliable way to prevent this problem entirely. Apps like OpenPharmacy let you save tokens as soon as you receive them, keeping them secure and accessible even without an internet connection. That means your QR code is always ready to present at the pharmacy — even in areas with poor reception or when your mobile data is not working.",
        ],
      },
      {
        heading: "What Is ADHA Conformance and Why Does It Matter?",
        paragraphs: [
          "ADHA conformance is the formal certification process run by the Australian Digital Health Agency. It ensures that any software — whether a GP's prescribing system, a pharmacy dispensing system, or a patient app — meets the technical, security, and interoperability standards required to participate in Australia's national digital health infrastructure.",
          "For electronic prescribing specifically, conformance is mandatory under the PBS legislative framework. A prescription is only legally valid if every system involved in creating, transmitting, and dispensing it holds a Conformance ID on the ADHA Electronic Prescribing Conformance Register. Without it, the prescription cannot be legally dispensed.",
          "For patients, ADHA conformance means you can trust that a certified app or service meets government-approved security and privacy standards. It is not a marketing badge — it is a legal requirement. When evaluating any eScript management app, checking whether it is registered on the ADHA conformance register is a straightforward way to confirm it meets the required standards.",
          "OpenPharmacy is registered with the ADHA and fully conformant with their standards. All prescription data is stored on Australian servers, uses end-to-end ASD-approved encryption, and is never shared with third parties.",
        ],
      },
      {
        heading: "How to Manage eScripts for Your Family",
        paragraphs: [
          "Managing eScripts for children, elderly parents, or other dependants adds another layer of complexity. Each person receives their own tokens, and keeping track of multiple people's scripts across different SMS threads or email inboxes quickly becomes unmanageable.",
          "The ASL supports carer access: you can register as an authorised representative and access a family member's ASL at a participating pharmacy. This requires the patient's consent and typically involves providing identification.",
          "A dedicated eScript wallet app that supports family management gives you a cleaner solution. OpenPharmacy is designed with this in mind — you can manage scripts for multiple family members within a single app, with each person's prescriptions clearly separated and accessible.",
        ],
      },
      {
        heading: "eScripts and Telehealth",
        paragraphs: [
          "One of the most practical benefits of eScripts is how well they work with telehealth. Because the prescription is generated digitally and delivered directly to your phone, there is no need for a follow-up visit to collect a paper prescription. Your GP can issue the eScript during the consultation, and your token arrives within minutes.",
          "Electronic prescribing also supports remote and rural Australians, who can consult a doctor online and receive their prescription without a trip to a city clinic. The 2025 ePrescription hospital pilot at Royal Perth Hospital — the first of its kind in an Australian public hospital — demonstrates how digital prescribing is continuing to expand beyond the community pharmacy setting.",
        ],
      },
      {
        heading: "Which Pharmacies Accept eScripts?",
        paragraphs: [
          "The vast majority of Australian community pharmacies are now set up to dispense eScripts. Most independent pharmacies, as well as major chains, can scan tokens and access prescriptions from both eRX and Medisecure. If you are unsure, a quick call to your local pharmacy will confirm.",
          "Your eScript token works at any conformant pharmacy across Australia — you are not locked into the pharmacy where you originally had a script filled. This pharmacy independence is one of the key advantages of the eScript system over pharmacy-specific apps that tie your scripts to a particular chain.",
        ],
      },
      {
        heading: "Key Terms: eScript Glossary",
        paragraphs: [
          "Understanding eScripts is easier with a clear reference for the terms used across apps, pharmacies, and health websites.",
        ],
        list: [
          "eScript (electronic prescription): A fully legal digital prescription that replaces the paper version. Created by your doctor using conformant clinical software.",
          "Token: A unique QR code that acts as your key to retrieve your prescription from the secure prescription delivery system. One token per medicine per prescription.",
          "Prescription Exchange Service (PES): The secure, encrypted infrastructure that stores and transmits electronic prescriptions between prescribers and pharmacies. Australia has two: eRX and Medisecure.",
          "Active Script List (ASL): A national digital list of all your active eScripts and barcoded paper scripts. Once registered, you can have scripts dispensed without presenting individual tokens.",
          "ADHA: The Australian Digital Health Agency, the government body responsible for national digital health standards and the conformance program.",
          "Conformance ID: A unique identifier assigned by the ADHA to software systems that meet national electronic prescribing standards. Required for legal electronic prescribing and dispensing.",
          "eScript wallet app: A mobile app designed to store, organise, and manage eScript tokens on behalf of patients. ADHA-conformant apps are listed on the agency's register.",
          "PBS (Pharmaceutical Benefits Scheme): The Australian government program that subsidises the cost of many prescription medicines for eligible patients.",
        ],
      },
      {
        heading: "Managing Your eScripts with OpenPharmacy",
        paragraphs: [
          "OpenPharmacy is a free Australian eScript wallet app built specifically to solve the disorganisation that comes with managing tokens across SMS and email. It is registered with the ADHA and fully conformant with national standards — all data is stored on Australian servers with end-to-end ASD-approved encryption.",
          "The app works completely offline, which means your prescription QR codes are always available even without a mobile signal. This is particularly valuable in rural and regional areas, or in any situation where your data connection is unreliable at the moment you need to present your script.",
          "You can manage prescriptions for yourself and your family members in one place, add scripts instantly using the eScript token, and see details including dosage information and remaining repeats. For Australians who want a simple, secure, and independent way to manage their eScripts — not tied to any specific pharmacy — OpenPharmacy is available on the App Store and Google Play.",
        ],
      },
      {
        heading: "Frequently Asked Questions About Australian eScripts",
        paragraphs: [
          "Can I use an eScript at any pharmacy? Yes. Your token works at any Australian pharmacy that is conformant with the ADHA electronic prescribing requirements, which includes the vast majority of community pharmacies nationwide.",
          "Do I need a My Health Record to use eScripts? No. eScripts operate independently of My Health Record. You receive tokens by SMS or email and can use them without any other account or registration. My Health Record integration is an optional additional feature offered by some apps.",
          "What if my phone dies or I have no signal? If you have saved your token in an offline-capable wallet app like OpenPharmacy, your QR code remains accessible without internet. If you have only stored it as an SMS link, the link requires connectivity to load the full token page.",
          "Can my doctor still write a paper prescription if I prefer? Yes. Paper prescriptions are still available and legal. You and your doctor can choose the format that suits you — but you cannot receive both a paper and an electronic prescription for the same medicine at the same time.",
          "Are eScripts safe? Yes. eScripts use encrypted Prescription Exchange Services, conformant software with government-approved security requirements, and single-use tokens that are invalidated on dispensing. The ADHA conformance framework sets mandatory security standards for all participating systems.",
          "Can I forward my token to someone else? Yes. You can forward your token by SMS or email to a trusted family member, carer, or friend who can collect your medicine on your behalf. You can also share access to your Active Script List with an authorised representative.",
        ],
      },
    ],
  },
  {
    slug: "best-escript-apps-australia-2026",
    title: "Best eScript Apps for Australians in 2026: An Honest Comparison",
    description:
      "An honest, up-to-date comparison of the best apps for managing electronic prescriptions in Australia in 2026 — covering OpenPharmacy, Scripty, MedAdvisor, and the 1800MEDICARE app.",
    date: "2026-03-11",
    author: "OpenPharmacy Team",
    relatedSlugs: ["australian-escripts-explained"],
    sections: [
      {
        heading: null,
        paragraphs: [
          "Australia's electronic prescription system now handles nearly 300 million prescriptions per year through the National Prescription Delivery Service, according to the Australian Department of Health. With eScripts now the default for most GPs, the question is no longer whether to go digital — it is which app gives you the best experience managing those scripts. This guide compares four of the leading options available to Australian patients in 2026: OpenPharmacy, Scripty, MedAdvisor, and the 1800MEDICARE app. All information was verified in March 2026.",
        ],
      },
      {
        heading: "Quick Comparison: eScript Apps at a Glance",
        paragraphs: [
          "Before diving into the detail, here is a direct summary of how the four main apps compare across the features that matter most to Australian patients.",
        ],
        list: [
          "OpenPharmacy — Best for: offline access, security, and privacy-first storage. Free. ADHA-conformant. Works with no internet connection. Independent of any pharmacy chain. Australian data only. Supports family management.",
          "Scripty — Best for: Active Script List auto-sync and convenience. Free. ADHA-conformant. Offline access available. Supports family management. Medicine shortage alerts. Owned by Oexa, an independent software company.",
          "MedAdvisor — Best for: pharmacy ordering, refill reminders, and telehealth. Free to download, but requires pharmacist approval to activate full features. Over 3.7 million Australian users. Connected to 95%+ of Australian pharmacies. Adds telehealth consultation booking.",
          "1800MEDICARE app (formerly my health app) — Best for: My Health Record access and government-backed health management. Free. Government-issued. Requires My Health Record and an internet connection. Renamed from 'my health app' on 1 January 2026.",
        ],
      },
      {
        heading: "What to Look For in an Australian eScript App",
        paragraphs: [
          "Not all eScript apps serve the same purpose. There are two broad categories: dedicated eScript wallets, which store and organise your prescription tokens, and pharmacy-connected apps, which integrate with specific pharmacy networks to enable ordering and delivery. Understanding which category an app belongs to helps you choose the right tool for your situation.",
          "The most important features to evaluate are: ADHA conformance (a legal requirement for any app that stores or manages eScript tokens on behalf of patients); offline accessibility (whether QR codes are available without an internet connection); family management (whether you can manage scripts for children or elderly parents); data sovereignty (whether your health data is stored in Australia and not shared with third parties); and pharmacy independence (whether the app ties you to a specific pharmacy chain).",
          "For Australians in rural or regional areas, offline access is not optional — it is essential. For caregivers managing scripts for multiple family members, robust family profiles matter more than ordering convenience. For anyone concerned about health data privacy, ADHA conformance and Australian-only data storage are the baseline requirements.",
        ],
      },
      {
        heading: "1. OpenPharmacy: The Offline-First, Privacy-First eScript Wallet",
        paragraphs: [
          "OpenPharmacy is a free Australian eScript wallet app built by Easy As Health Pty Ltd in Brisbane. It is registered with the Australian Digital Health Agency (ADHA) and fully conformant with national electronic prescribing standards. All prescription data is stored on Australian servers using end-to-end ASD-approved encryption, and data is never shared with third parties.",
          "The defining feature of OpenPharmacy is that it works entirely offline. Once you have saved a prescription QR code to the app, it is accessible without any mobile data or Wi-Fi connection. This is a meaningful advantage over web-based solutions and any app that requires a live connection to display your QR code. For patients in areas with poor reception, or for anyone who has experienced the frustration of a signal dropping at the pharmacy counter, this is a practical guarantee that your script is always ready.",
          "The app supports managing prescriptions for family members within a single account — a dedicated feature for caregivers managing scripts for children, elderly parents, or a partner. You can add scripts using the eScript token, view active and archived scripts, check dosage details and remaining repeats, and share scripts securely with pharmacies or carers. A 4-digit PIN protects the app from unauthorised access.",
          "OpenPharmacy does not integrate with a specific pharmacy chain for ordering or delivery. It is pharmacy-independent by design, which means your scripts are not associated with any commercial pharmacy interest. This also means it does not send refill reminders tied to a pharmacy's inventory system — a trade-off that suits patients who prefer to manage that relationship themselves.",
        ],
        list: [
          "Cost: Free",
          "ADHA conformance: Yes",
          "Offline access: Yes — QR codes available with no internet connection",
          "Family management: Yes — manage scripts for multiple family members",
          "Data storage: Australian servers only, not shared with third parties",
          "Pharmacy independence: Yes — works at any conformant pharmacy in Australia",
          "Security: End-to-end ASD-approved encryption, 4-digit PIN",
          "Pharmacy ordering/delivery: No",
          "Available on: iOS and Android",
        ],
      },
      {
        heading: "2. Scripty: The Auto-Syncing eScript Wallet",
        paragraphs: [
          "Scripty is an eScript wallet developed by Oexa, an independent Australian software company that participates in the Australian Digital Health Agency's ePrescribing Technical Working Group. The app is ADHA-conformant and describes itself as 'Smart, Sync'd, Secure.' Its headline feature is automatic synchronisation with the Active Script List (ASL), which means new scripts and repeats from your doctor are added to Scripty automatically without you needing to import a token manually.",
          "Scripty also works offline, provides family and carer management, and includes a medicine shortage alert feature that notifies users when one of their medications is affected by a national shortage, drawing on the TGA Medicines Shortage Report. Scripts can be organised with custom nicknames, used scripts are automatically archived, and the app supports Chinese-language users with more languages planned.",
          "One consideration for privacy-focused users: Scripty's ASL sync feature requires a connection to the national prescription system, which involves a different privacy model than a purely offline token wallet. Scripty is also pharmacy-independent — it is not owned by or affiliated with a pharmacy chain. The company's commitment is to keep the app free and data secure.",
          "Scripty is the most-cited independent eScript wallet in Australian AI model responses as of March 2026, suggesting strong third-party coverage and brand recognition in this category.",
        ],
        list: [
          "Cost: Free",
          "ADHA conformance: Yes",
          "Offline access: Yes",
          "ASL auto-sync: Yes — scripts added automatically when connected",
          "Family management: Yes — auto-organises by person",
          "Medicine shortage alerts: Yes",
          "Pharmacy independence: Yes",
          "Pharmacy ordering/delivery: No",
          "Available on: iOS and Android",
        ],
      },
      {
        heading: "3. MedAdvisor: The Pharmacy-Connected Medication Manager",
        paragraphs: [
          "MedAdvisor is the largest pharmacy-connected medication management app in Australia, used by over 3.7 million patients and connected to more than 95% of Australian pharmacies across 5,500+ locations, according to the company's own data. The app is free to download, but its core ordering features require pharmacist approval to activate — you need to visit a participating pharmacy and link your account before you can pre-order medications or use the delivery service.",
          "Where MedAdvisor excels is in pharmacy workflow integration. You can pre-order refills, skip pharmacy queues, track paper and electronic scripts, set up pill and refill reminders, and use the telehealth feature added in late 2025 to book virtual consultations and receive eScripts directly within the app. The app supports family management, allowing users to manage medications for children, a spouse, or elderly parents.",
          "The trade-off with MedAdvisor is the pharmacy relationship model. The app is designed to keep you connected to a preferred pharmacy, and patients using MedAdvisor remain loyal to their connected pharmacy at a rate of 97%, according to MedAdvisor Solutions data. For patients who actively switch pharmacies or prefer not to be associated with a specific network, this is a relevant consideration. Some users on review platforms have also reported reliability issues with the app's photo-upload and login features.",
          "MedAdvisor does not position itself primarily as a secure offline token wallet. Its strength is managing the complete medication journey from prescription to pick-up or delivery, which makes it a strong choice for patients on ongoing medications who value ordering convenience over maximum privacy independence.",
        ],
        list: [
          "Cost: Free (pharmacist approval required for ordering features)",
          "ADHA conformance: Not a dedicated eScript wallet (pharmacy integration app)",
          "Offline access: Limited — not positioned as an offline-first tool",
          "Family management: Yes",
          "Pharmacy network: 5,500+ locations, 95%+ of Australian pharmacies",
          "Medication reminders: Yes — pill, refill, and doctor visit reminders",
          "Telehealth integration: Yes — added in 2025",
          "Pharmacy ordering/delivery: Yes — core feature",
          "Available on: iOS and Android",
        ],
      },
      {
        heading: "4. 1800MEDICARE App: The Government-Backed Health Record App",
        paragraphs: [
          "The 1800MEDICARE app is the Australian Government's official digital health app, operated by the Australian Digital Health Agency. It was renamed from 'my health app' on 1 January 2026 as part of a broader 1800MEDICARE initiative to centralise health information and after-hours GP telehealth support. If you previously had 'my health app' installed, it updated automatically.",
          "The app provides access to your My Health Record, electronic prescriptions and Active Script List, Medicare information, immunisation history, and the ability to find health services. From October 2025, pathology results are available to view in the app as soon as they are uploaded. From March 2026, X-ray reports for limbs are also immediately accessible. Authorised representatives — such as parents or carers — can manage access for family members within the same app.",
          "The important practical limitation is that the 1800MEDICARE app requires an internet connection to install, set up, and use. It is not an offline-capable eScript wallet. If you are in an area with poor connectivity, or if your data drops at the pharmacy, you cannot access your QR code through this app. Additionally, the app requires a My Health Record — which not all Australians have actively set up — and its primary purpose is broad health record access rather than focused eScript management.",
          "As a government-issued app, it carries the highest level of institutional authority. For patients who already use My Health Record and want a single app that covers prescriptions alongside pathology results, immunisation records, and Medicare information, the 1800MEDICARE app is a comprehensive choice.",
        ],
        list: [
          "Cost: Free",
          "Issued by: Australian Government (ADHA)",
          "Offline access: No — requires internet connection",
          "My Health Record required: Yes",
          "ASL access: Yes",
          "Family/carer access: Yes — authorised representatives",
          "Pathology and imaging reports: Yes (from October 2025 onwards)",
          "Medicare information: Yes",
          "Pharmacy ordering/delivery: No",
          "Available on: iOS (15+) and Android (9+)",
        ],
      },
      {
        heading: "Which App Is Right for You?",
        paragraphs: [
          "The best eScript app depends on what you need most. None of these apps is the right answer for every patient, and several can be used together — for example, OpenPharmacy for secure offline token storage and MedAdvisor for pharmacy ordering reminders.",
        ],
        list: [
          "Choose OpenPharmacy if: you want reliable offline access to your QR codes, you prioritise privacy and independent data storage, you are in a rural or regional area with unreliable connectivity, or you manage scripts for family members and want a dedicated, ADHA-conformant wallet that is not tied to any pharmacy.",
          "Choose Scripty if: you take multiple ongoing medications and want automatic script updates via ASL sync, you want to be alerted to medicine shortages, and you value a feature-rich wallet from an independent developer.",
          "Choose MedAdvisor if: you want to pre-order medications from your pharmacy, skip queues, receive refill reminders, or access telehealth within the same app. Best for patients on regular medications who are happy to work within a specific pharmacy network.",
          "Choose the 1800MEDICARE app if: you already use My Health Record and want a single government app to access prescriptions, pathology results, immunisation records, and Medicare information. Note: requires internet connectivity and My Health Record.",
          "Use more than one: there is no restriction on using multiple apps. A common approach is to use OpenPharmacy or Scripty as your primary eScript wallet for day-to-day prescription access, and the 1800MEDICARE app for broader health record management.",
        ],
      },
      {
        heading: "A Note on ADHA Conformance",
        paragraphs: [
          "ADHA conformance is not a marketing badge — it is a legal requirement for any patient app that interacts with Australia's national electronic prescribing infrastructure. The Australian Digital Health Agency maintains a public conformance register listing every certified patient app, prescriber system, and dispensing system.",
          "OpenPharmacy and Scripty are both listed on the ADHA conformance register as certified patient-facing eScript wallet apps. This means both apps have passed the ADHA's technical, security, and privacy assessment and are legally authorised to store and manage eScript tokens on behalf of patients. When evaluating any app for managing your prescriptions, checking for ADHA conformance is the single most reliable way to confirm it meets national security and interoperability standards.",
          "The 1800MEDICARE app is developed by the ADHA itself and operates to the same standards. MedAdvisor is a pharmacy connectivity platform rather than a dedicated eScript wallet app and operates under a different conformance category.",
        ],
      },
      {
        heading: "Frequently Asked Questions About eScript Apps in Australia",
        paragraphs: [
          "Can I use more than one eScript app at the same time? Yes. There is no restriction on installing and using multiple apps. Your eScript token is yours to save wherever you like. Many patients use a dedicated wallet app like OpenPharmacy alongside the 1800MEDICARE app for health record access.",
          "Which apps work without an internet connection? OpenPharmacy is explicitly designed to work completely offline — QR codes are stored on your device and available without any connectivity. Scripty also offers offline access. The 1800MEDICARE app requires an internet connection and cannot be used offline.",
          "Are these apps free? All four apps covered in this guide are free to download and use. MedAdvisor requires pharmacist approval to activate its ordering and delivery features, but the app itself is free.",
          "What happens to my scripts if I switch phones? Apps that store scripts locally on your device will require you to re-import your tokens on a new device unless they offer cloud backup or ASL sync. OpenPharmacy and Scripty both support token import via the eScript link. If you use an ASL, your scripts remain accessible regardless of device changes.",
          "Is it safe to store prescriptions on my phone? Yes, provided you use an ADHA-conformant app. Conformant apps must meet government-approved security and encryption standards. OpenPharmacy uses end-to-end ASD-approved encryption and a PIN lock. Your prescription data in a conformant app is significantly more secure than leaving tokens in an SMS inbox.",
          "Do these apps work with all pharmacies? All ADHA-conformant eScript wallet apps work at any pharmacy that accepts electronic prescriptions — which includes the vast majority of community pharmacies across Australia. You are not locked into a specific chain. MedAdvisor's pharmacy ordering features work only within its connected pharmacy network.",
        ],
      },
      {
        heading: "Managing Your eScripts with OpenPharmacy",
        paragraphs: [
          "OpenPharmacy is available free on the App Store and Google Play. It is designed specifically for Australians who want a secure, private, and reliable way to manage their eScripts — without being tied to a pharmacy chain, without requiring an internet connection at the moment you need to present your script, and without sharing your health data with third parties.",
          "The app is registered with the ADHA, fully conformant with national standards, and stores all data on Australian servers with end-to-end ASD-approved encryption. You can manage prescriptions for yourself and your family in one place, see dosage details and remaining repeats, and share scripts securely when needed.",
          "For more background on how Australia's electronic prescribing system works — including how eScript tokens work, what the Active Script List is, and how long prescriptions last — read our guide: Australian eScripts Explained.",
        ],
      },
    ],
  },
];

export default blogPosts;
