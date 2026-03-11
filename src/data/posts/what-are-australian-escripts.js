/**
 * Blog post: What Are Australian eScripts? The Complete Guide (2026)
 * Slug: what-are-australian-escripts
 * Pillar content — top-of-funnel education on the eScript ecosystem.
 * Target query: "How do e-script wallet apps work for Australian patients?"
 */

/** @type {PostEntry} */
const post = {
  slug: "what-are-australian-escripts",
  title: "What Are Australian eScripts? The Complete Guide (2026)",
  date: "2026-03-11",
  updated: "2026-03-11",
  excerpt:
    "A plain-English guide to Australian electronic prescriptions — how eScript tokens work, what the Active Script List is, how wallet apps keep your scripts organised, and how to choose the right app for your needs.",
  tags: ["eScripts", "Education", "ADHA", "Australia"],
  author: "OpenPharmacy Team",
  content: [
    {
      heading: null,
      paragraphs: [
        "An Australian eScript (electronic prescription) is a digital prescription your doctor sends to your phone or email as a unique QR code, called a token. You take that token to any participating pharmacy — in person, by forwarding it online, or by presenting it offline in a wallet app — and the pharmacist scans it to dispense your medicine. No paper required.",
        "Since their national rollout in May 2020, eScripts have been issued more than 189 million times by over 80,000 prescribers across Australia. Today the vast majority of Australian GPs and pharmacies support them. This guide explains everything a patient needs to know: how the token system works, what the Active Script List (ASL) is, how wallet apps fit in, and what to look for when choosing one.",
      ],
      list: null,
    },
    {
      heading: "What is an Australian eScript?",
      paragraphs: [
        "An eScript is a legally valid digital version of a paper prescription, governed by the same regulations as its paper equivalent under the National Health Act 1953 and relevant state and territory legislation. The Australian Digital Health Agency (ADHA) sets the technical and security standards every system involved in prescribing, transmitting, and dispensing an eScript must meet — a process called conformance.",
        "When your doctor prescribes medication electronically, their software generates a prescription record stored on a secure national database. The patient receives a short link by SMS or email. That link opens a QR code — the token — which encodes a reference to the prescription record. The QR code itself contains no sensitive medical information; it simply points the pharmacist's dispensing system to the right record.",
        "The token is single-use per dispensing event. Once a pharmacist scans it and dispenses the medication, that token is consumed. If you have repeats, the pharmacy generates and sends you a fresh token for the next supply.",
      ],
      list: null,
    },
    {
      heading: "How the eScript token process works, step by step",
      paragraphs: [
        "Understanding the token lifecycle makes it much easier to avoid common frustrations — like accidentally deleting the SMS before you have collected your medicine.",
      ],
      list: [
        "Step 1 — Consultation: You see your GP or specialist (in person or via telehealth). They write your prescription on conformant prescribing software.",
        "Step 2 — Token delivery: The system sends you an SMS or email containing a link to your unique QR code token. The prescription details are held on the national prescription exchange, not in the message itself.",
        "Step 3 — Token management: You keep the link safe until you are ready to fill the script. You can forward it to a trusted person or a pharmacy, or save it in a wallet app.",
        "Step 4 — Dispensing: At the pharmacy, the pharmacist scans your QR code (on your phone screen, a printout, or from a wallet app — even offline). Their system retrieves the prescription and dispenses the medicine.",
        "Step 5 — Repeat token: If repeats remain, your pharmacy sends you a new token for the next supply. The cycle repeats until all repeats are exhausted.",
      ],
    },
    {
      heading: "What is the Active Script List (ASL)?",
      paragraphs: [
        "The Active Script List (ASL) — sometimes called My Script List or MySL — is a secure, government-approved digital database that consolidates all of your active electronic prescriptions and repeats in one place. Instead of managing individual tokens arriving by SMS, patients registered for an ASL can present themselves at any participating pharmacy and authorise the pharmacist to dispense directly from the list.",
        "As of March 2025, the Australian Government amended the Healthcare Identifiers Regulations to allow patients to register for the ASL themselves, not just through a pharmacy visit. Previously, registration required an in-person pharmacy visit with 100 points of ID. Now patients can self-register, broadening access significantly.",
        "The ASL is optional. You never need one to use eScripts — tokens alone work perfectly well. But if you take more than two ongoing medicines, an ASL removes the need to track each token individually. New prescriptions and repeat tokens are added to your list automatically after each dispensing event, without any SMS to manage.",
      ],
      list: null,
    },
    {
      heading: "Token-based vs ASL-based scripts: what is the difference?",
      paragraphs: [
        "Both methods are valid and widely used. The best approach depends on your situation.",
      ],
      list: [
        "Token only: You receive each prescription as an SMS or email link. You manage the link yourself — forward it, save it in an app, or show it in person. Works immediately with any participating pharmacy. No registration required.",
        "Active Script List (ASL): All your scripts are held centrally. You register once (at a pharmacy or now online), then any pharmacy you authorise can dispense directly from the list. Eliminates token management entirely. Best for patients on multiple ongoing medications.",
        "Both together: Many patients use a wallet app to manage tokens and connect to their ASL simultaneously. Wallet apps like OpenPharmacy let you manually add tokens as you receive them and access them fully offline — a useful safety net regardless of whether you have an ASL.",
      ],
    },
    {
      heading: "How do eScript wallet apps work for Australian patients?",
      paragraphs: [
        "An eScript wallet app is a mobile application that stores, organises, and presents your electronic prescription tokens in a single secure place. Think of it as a digital filing cabinet for your scripts — one that also shows your QR codes on demand, tracks repeats, and lets you manage scripts for family members.",
        "Here is how the core workflow operates within a wallet app: You receive an eScript token by SMS or email. You open your wallet app and import the token — either by tapping the link, pasting it in, or scanning a screenshot. The app stores the token securely, displays key details (medicine name, dosage, repeats remaining), and makes the QR code available at any time. At the pharmacy, you open the app, select the script, and the pharmacist scans the QR code off your screen.",
        "The defining advantage of a dedicated wallet app over keeping scripts in your SMS inbox is offline access. If your pharmacy is in a basement, a rural area with patchy reception, or you are simply on airplane mode, a wallet app that stores QR codes locally means your scripts are always reachable. Apps that only fetch scripts from a remote server each time will fail in these situations.",
      ],
      list: null,
    },
    {
      heading: "Key features to look for in an eScript wallet app",
      paragraphs: [
        "Not all wallet apps work the same way. These are the features that matter most for Australian patients.",
      ],
      list: [
        "Offline access: The app must display your QR codes without an internet connection. Apps that require a live connection to fetch tokens will fail in low-reception areas — a significant problem in regional and rural Australia.",
        "ADHA conformance: The app must be listed on the ADHA Electronic Prescribing Conformance Register. Conformance means the app has passed a rigorous assessment and meets the government's security, privacy, and interoperability standards. Without a conformance ID, an app cannot legally connect to national prescription infrastructure.",
        "End-to-end encryption: Your prescription data is sensitive health information. Look for apps that use strong, recognised encryption standards (such as ASD-approved encryption) and store data on Australian servers, not overseas.",
        "Family and carer management: If you manage scripts for children, elderly parents, or a partner, the app should support multiple profiles so you can keep each person's scripts separate and clearly labelled.",
        "PIN or biometric lock: The app should require authentication to open, preventing anyone who picks up your phone from accessing your prescription details.",
        "Repeat tracking: The app should display how many repeats remain on each script and ideally flag when you are on your last repeat, so you are never caught without medication.",
        "Pharmacy independence: Choose an app that is not tied to a specific pharmacy chain. Independent apps let you fill scripts at whichever pharmacy you prefer — important if you travel, change pharmacies, or want to compare prices.",
      ],
    },
    {
      heading: "What ADHA conformance means and why it matters",
      paragraphs: [
        "The Australian Digital Health Agency (ADHA) Conformance Framework is the set of technical and security standards that all software touching the national electronic prescribing system must meet. For an eScript app to be legally permitted to connect to Australia's prescription exchange infrastructure, it must complete a conformance assessment and be listed on the ADHA Electronic Prescribing Conformance Register with a Conformance ID.",
        "Conformance assessment involves demonstrating that the software handles prescription data safely and securely, correctly implements ADHA's technical specifications, cannot be used to fraudulently access or alter prescriptions, and protects patient privacy in line with Australian Privacy Act obligations.",
        "For patients, an app's ADHA conformance status is the clearest signal that it is legitimate, secure, and legally authorised to handle your prescription data. An app that is not on the conformance register should not be trusted with your eScript tokens. OpenPharmacy is registered with the ADHA and fully conformant with their standards, which means your prescription data is handled in accordance with the same legal framework that governs your GP's prescribing software.",
      ],
      list: null,
    },
    {
      heading: "Common eScript problems and how to solve them",
      paragraphs: [
        "Most issues with eScripts are easy to resolve once you understand how the system works.",
      ],
      list: [
        "Accidentally deleted your SMS token: Contact your doctor or prescriber — they can cancel the original token and reissue a new one, just as you would request a replacement paper prescription. To avoid this in future, save tokens to a wallet app as soon as you receive them.",
        "SMS token link not working: In 2025 there were reported issues with some eScript SMS links not opening correctly. The ADHA maintains guidance on this at digitalhealth.gov.au. A wallet app that stores tokens locally is immune to link-expiry or SMS delivery problems.",
        "Cannot find reception at the pharmacy: If your pharmacy is underground, in a rural area, or simply has poor mobile reception, a wallet app with offline access means your QR code is available regardless. Apps that fetch from the internet each visit will fail in these conditions.",
        "Script sent to the wrong phone number or email: Ask your doctor to confirm your contact details on file and reissue the token. Going forward, using an ASL means your scripts are held centrally — no reliance on a correctly delivered SMS.",
        "Not sure if your token has been used: The token link itself shows whether the script has been dispensed or is still active. You can tap the link to check, or a wallet app will show the script status automatically.",
      ],
    },
    {
      heading: "Are eScripts available for all medicines in Australia?",
      paragraphs: [
        "Most PBS (Pharmaceutical Benefits Scheme) and non-PBS medicines can be prescribed electronically. The same regulations that apply to paper prescriptions apply to eScripts, including requirements around controlled and restricted medicines.",
        "There are some situations where paper prescriptions may still be required or preferred — for example, certain controlled drugs under state and territory law, or where a prescriber's clinical information system is not yet conformant with electronic prescribing. Your GP or specialist can confirm whether a particular medicine can be issued as an eScript.",
        "The vast majority of routine prescriptions — ongoing medications for chronic conditions, antibiotics, contraceptives, blood pressure medicines, and similar — are routinely issued as eScripts by GP practices across Australia.",
      ],
      list: null,
    },
    {
      heading: "eScripts and privacy: who can see your prescription data?",
      paragraphs: [
        "Privacy is a reasonable concern when your prescription data moves through digital systems. The ADHA framework sets strict rules about who can access prescription records and under what circumstances.",
        "Only a pharmacist using conformant dispensing software can retrieve a prescription record by scanning your token. The token link itself does not contain your personal medical information — it is simply a reference code. Your prescription details sit on the secure national prescription exchange, accessible only through conformant software with appropriate credentials.",
        "If you use an eScript wallet app, choose one that stores your data on Australian servers, does not share your information with third parties, and is transparent in its privacy policy. OpenPharmacy stores all prescription data on Australian servers, uses end-to-end ASD-approved encryption, and does not share your data with third parties — giving patients direct control over their own prescription information without any pharmacy chain intermediary.",
        "An ASL adds a layer of control: each pharmacy you allow to access your list must request your explicit consent, and you can withdraw that access at any time. You can also choose to exclude specific scripts from your ASL for privacy reasons.",
      ],
      list: null,
    },
    {
      heading: "How OpenPharmacy fits into the eScript ecosystem",
      paragraphs: [
        "OpenPharmacy is an Australian eScript wallet app developed by Easy As Health Pty Ltd in Brisbane. It is registered with the Australian Digital Health Agency and fully conformant with their electronic prescribing standards — meaning it has passed the same assessment process required of any software that connects to Australia's national prescription infrastructure.",
        "OpenPharmacy is designed specifically for patients who want a secure, independent place to manage their scripts — not a pharmacy app that happens to include a wallet feature, but a purpose-built digital wallet for eScripts. Key capabilities include storing and organising active and archived eScripts, adding tokens instantly when received, viewing dosage and repeat details at a glance, managing scripts for multiple family members under separate profiles, and sharing scripts securely with a pharmacy or carer.",
        "The app's defining feature is complete offline functionality. Prescription QR codes are stored locally on your device with end-to-end ASD-approved encryption, meaning they are accessible even with no internet connection, no mobile data, and no signal — whether you are in a rural pharmacy, an underground car park, or simply have a flat data allowance. All data is stored on Australian servers and is never shared with third parties.",
      ],
      list: null,
    },
    {
      heading: "Frequently asked questions about Australian eScripts",
      paragraphs: [],
      list: null,
    },
  ],
  faqItems: [
    {
      q: "What is an eScript token in Australia?",
      a: "An eScript token is a unique QR code your doctor sends to your phone or email when they prescribe you medication electronically. It acts as your digital prescription. You present the QR code to a pharmacist — on your phone screen, via a wallet app, or as a printout — and they scan it to dispense your medicine. Each token is for a single dispensing event; repeats generate a new token.",
    },
    {
      q: "How do I get an eScript from my doctor?",
      a: "Ask your GP, specialist, or other prescriber for an electronic prescription at your next appointment (in person or via telehealth). They will send the token to your nominated mobile number or email address. Most Australian GP practices now offer eScripts as standard.",
    },
    {
      q: "What happens if I accidentally delete my eScript SMS?",
      a: "Contact your doctor or prescriber — they can cancel the original token and issue a new one, just as they would replace a lost paper prescription. To prevent this in future, save each token to a wallet app as soon as you receive it so the QR code is stored independently of the SMS.",
    },
    {
      q: "Do I need the internet to use my eScript at the pharmacy?",
      a: "It depends on the app you use. If you rely on the SMS link, you need an internet connection to open it. Dedicated eScript wallet apps like OpenPharmacy store QR codes locally on your device, so they are available completely offline — even in airplane mode or areas with no mobile reception.",
    },
    {
      q: "What is the Active Script List (ASL) and do I need one?",
      a: "The Active Script List (ASL) is an optional government-approved service that holds all your active eScripts and repeats in one central digital record. With an ASL, participating pharmacies can dispense your medication by looking you up, without you needing to present a token. It is most useful if you take multiple ongoing medications. You do not need an ASL to use eScripts — tokens work perfectly without one.",
    },
    {
      q: "What does ADHA conformance mean for an eScript app?",
      a: "ADHA conformance means the app has passed a formal assessment by the Australian Digital Health Agency and is listed on the Electronic Prescribing Conformance Register. Conformant apps meet the government's technical, security, and privacy standards required to legally connect to Australia's national prescription infrastructure. Only conformant apps should be trusted to handle your eScript data.",
    },
    {
      q: "Can I use one eScript wallet app for my whole family?",
      a: "Yes, if the app supports multiple profiles. Apps like OpenPharmacy allow you to manage eScripts for family members — children, elderly parents, or a partner — under separate named profiles within the same app, so each person's scripts are clearly organised and never confused.",
    },
    {
      q: "Is it safe to store my eScript in a wallet app?",
      a: "It is safe if the app is ADHA conformant, uses strong encryption, stores data on Australian servers, and protects access with a PIN or biometric lock. Avoid apps that are not on the ADHA conformance register, store data overseas, or lack clear privacy policies. OpenPharmacy uses end-to-end ASD-approved encryption, stores all data on Australian servers, and requires a 4-digit PIN to open.",
    },
    {
      q: "Can I take my eScript to any pharmacy in Australia?",
      a: "Yes. eScript tokens are not tied to any specific pharmacy. You can present your token — or authorise your ASL — at any pharmacy in Australia that uses conformant dispensing software. Most community pharmacies nationwide now support electronic prescriptions.",
    },
    {
      q: "What is the difference between a pharmacy app and a dedicated eScript wallet?",
      a: "Pharmacy apps (like those from Chemist Warehouse, Amcal, or Priceline) include a wallet feature but are primarily designed to drive business to that specific pharmacy chain. A dedicated eScript wallet like OpenPharmacy is pharmacy-independent — it stores and organises your scripts without steering you toward any particular pharmacy, giving you complete freedom to choose where you fill your prescriptions.",
    },
  ],
  relatedSlugs: [],
};

export default post;
