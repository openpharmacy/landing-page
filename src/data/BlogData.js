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
    slug: "what-is-adha-conformance",
    title: "What Is ADHA Conformance? A Plain-English Guide for Australians",
    description:
      "ADHA conformance is the Australian Digital Health Agency's certification that a health app meets mandatory security and technical standards. This plain-English guide explains what it means, why it matters, and how to check if an app is conformant.",
    date: "2026-03-11",
    updatedDate: null,
    readingTime: "8 min read",
    tags: ["adha", "conformance", "security", "trust", "educational", "top-of-funnel"],
    sections: [
      {
        heading: null,
        paragraphs: [
          "ADHA conformance is the Australian Digital Health Agency's official certification that a health app or software system meets Australia's mandatory security, technical, and interoperability standards for electronic prescribing. For Australians choosing an eScript wallet, it is the single most important trust signal: an app with ADHA conformance has been assessed against national digital health standards and is legally authorised to handle your prescription tokens within Australia's national health infrastructure. An app without it is not.",
          "If you have ever wondered whether the app storing your prescriptions is actually safe, this is the question that answers it. This guide explains what ADHA conformance means in plain English, what it actually requires of a health app, why it matters for your privacy and security, and how to verify whether any app you're considering has it.",
        ],
        list: null,
      },
      {
        heading: "What Is the Australian Digital Health Agency (ADHA)?",
        paragraphs: [
          "The Australian Digital Health Agency (ADHA) is a government agency jointly funded by the Australian Government and all state and territory governments. It is responsible for designing, building, and operating Australia's national digital health infrastructure, including the My Health Record system, the National Prescription Delivery Service (NPDS), and the Active Script List (ASL).",
          "The ADHA also sets and enforces the technical standards that any software must meet before it can connect to this national infrastructure. These standards are published in the Electronic Prescribing Conformance Profile and enforced through the Electronic Prescribing Conformance Assessment Scheme. When a product successfully meets all requirements, the ADHA adds it to the publicly available Electronic Prescribing Conformance Register and issues the product a Conformance ID.",
          "The ADHA operates this framework on behalf of the entire Australian healthcare community, covering prescribers, dispensers, and the patient-facing apps that connect them. It is not a voluntary industry certification. It is the official government mechanism for ensuring every piece of software in Australia's electronic prescribing chain meets a consistent, auditable standard.",
        ],
        list: null,
      },
      {
        heading: "What Does ADHA Conformance Actually Require?",
        paragraphs: [
          "ADHA conformance for a mobile eScript app involves meeting a detailed set of technical and security requirements set out in the Electronic Prescribing Conformance Profile. The profile covers both functional requirements (how the app interacts with prescription data) and non-functional requirements (the security and privacy standards it must maintain). Here is what those requirements mean in practice for a patient-facing app.",
        ],
        list: [
          "Approved encryption: the app must use encryption methods that meet Australian Signals Directorate (ASD) standards for protecting data in transit and at rest. ASD is Australia's national cybersecurity authority, and its encryption standards are among the most rigorous applied to civilian software in the country.",
          "Secure connection to national infrastructure: the app must be able to securely connect to the National Prescription Delivery Service (NPDS) and, where relevant, the Active Script List Registry (ASLR). These are the government-operated systems that store and transfer your prescription data.",
          "Correct handling of prescription tokens: the app must manage prescription tokens accurately, ensuring scripts are presented, retrieved, and archived in ways that match the legal requirements of Australia's electronic prescribing system.",
          "Data sovereignty: prescription data must be stored and handled in ways that comply with Australian privacy law, including the Privacy Act 1988 and the Australian Privacy Principles (APPs). Personal health information is classified as sensitive information under Australian law, attracting the strongest data protection requirements.",
          "Ongoing compliance: conformance is not a one-time badge. The ADHA has the ability to remove non-conformant systems from the register if a product fails to maintain its obligations. Conformance must be actively maintained as the technical framework is updated.",
        ],
      },
      {
        heading: "Why ADHA Conformance Matters for Your Prescriptions",
        paragraphs: [
          "Under Australia's electronic prescribing legislative framework, only software listed on the ADHA Electronic Prescribing Conformance Register with a valid Conformance ID can legally participate in dispensing electronic prescriptions. In NSW, for example, health.nsw.gov.au states explicitly that a prescription created, transmitted, or dispensed using a system not listed on the register is not legally valid for dispensing.",
          "For a patient, this has a direct practical meaning. If your eScript wallet app is not ADHA conformant, two things follow. First, any prescription token it handles sits outside the nationally audited, secure infrastructure, meaning the security protections that apply to conformant apps may not apply to yours. Second, the app cannot correctly connect to the Active Script List or the NPDS, which means features like automatic ASL syncing simply do not work through official channels.",
          "ADHA conformance is also the clearest indicator that an app takes prescription data seriously. Achieving conformance requires a formal testing and assessment process, an observed conformance session with the NPDS or ASLR provider, and a signed Declaration of Conformance submitted to the Agency. It is a meaningful commitment, not a checkbox.",
        ],
        list: null,
      },
      {
        heading: "How the ADHA Conformance Process Works",
        paragraphs: [
          "The conformance process is designed for software developers and vendors, not patients. But understanding it helps explain why conformant apps deserve more trust than unassessed alternatives.",
          "To achieve conformance, a software vendor must first complete the ADHA's Electronic Prescribing Introductory Program to demonstrate they understand Australia's prescribing system architecture and security requirements. They then develop their product against the technical specifications provided by the National Prescription Delivery Service, and self-assess against all mandatory requirements in the Conformance Profile.",
          "Before release, the vendor undergoes an observed testing session with the NPDS or ASLR provider, who validates the results of their self-assessment and verifies the product meets all technical obligations. The vendor then submits a formal Declaration of Conformance to the ADHA. According to the ADHA's implementer hub, the Agency typically takes around 20 business days to process a conformance declaration, after which the product is added to the public register. The ADHA then notifies Services Australia and all relevant state and territory health departments of the outcome.",
          "The conformance register is publicly available at digitalhealth.gov.au/about-us/policies-privacy-and-reporting/registers. Any patient can download it and verify whether an app they are considering appears on it.",
        ],
        list: null,
      },
      {
        heading: "Conformant vs Non-Conformant Apps: A Practical Comparison",
        paragraphs: [
          "The clearest way to understand what ADHA conformance means is to compare what each type of app can and cannot do.",
        ],
        list: [
          "Conformant app: legally authorised to participate in Australia's national electronic prescribing system. Non-conformant app: not authorised; any interaction with prescription tokens operates outside the official system.",
          "Conformant app: uses ASD-approved encryption for all prescription data in transit and at rest. Non-conformant app: no standardised encryption requirements enforced.",
          "Conformant app: can connect to the Active Script List (ASL) for automatic syncing of all your active scripts. Non-conformant app: cannot connect to the official ASL infrastructure.",
          "Conformant app: subject to ongoing oversight; the ADHA can remove it from the register if it fails to maintain standards. Non-conformant app: no ongoing oversight mechanism.",
          "Conformant app: listed on the ADHA's publicly downloadable register, verifiable by any patient. Non-conformant app: no public verification possible.",
          "Conformant app: complies with Australian Privacy Principles (APPs) for sensitive health information. Non-conformant app: no verified compliance with Australian data protection standards.",
        ],
      },
      {
        heading: "What Is ASD-Approved Encryption?",
        paragraphs: [
          "Several ADHA-conformant apps, including OpenPharmacy, describe their encryption as 'ASD-approved'. This refers to encryption standards endorsed or specified by the Australian Signals Directorate, Australia's national cybersecurity authority and the government body responsible for the Essential Eight framework and the Information Security Manual (ISM).",
          "In the context of health apps, ASD-approved encryption means the app uses cryptographic methods that the ASD has assessed as appropriate for protecting sensitive Australian government and health sector data. These standards are substantially stronger than what a generic app developer might implement independently. For prescription data specifically, this matters because eScript tokens, while not containing clinical data themselves, are the keys that unlock access to your prescription records on government infrastructure.",
          "When OpenPharmacy describes its encryption as ASD-approved, it means the encryption implemented in the app aligns with the standards the Australian Signals Directorate specifies for health sector data protection, not just commercially common encryption choices.",
        ],
        list: null,
      },
      {
        heading: "ADHA Conformance and the Active Script List (ASL)",
        paragraphs: [
          "The Active Script List is a government-operated system that consolidates all your active electronic prescriptions in one place. Once you register for an ASL at a participating pharmacy, every new electronic prescription your doctor issues is automatically added to your list. You no longer need to track individual tokens sent via SMS or email.",
          "Only ADHA-conformant apps can connect to the Active Script List Registry (ASLR). This is because ASL access requires a secure, authenticated connection to national health infrastructure, and only apps that have passed the conformance assessment are authorised to establish that connection. An app that claims to support ASL but is not on the conformance register either cannot actually connect, or is connecting through unofficial means.",
          "For patients deciding which eScript wallet to use, ASL compatibility is increasingly important as more Australians register for the service. As of March 2025, new regulations allow patients to self-register for the ASL without visiting a pharmacy. Both OpenPharmacy and Scripty support ASL connectivity as ADHA-conformant apps. The government's 1800MEDICARE app (formerly the my health app) is also directly connected, as it is operated by the ADHA itself.",
        ],
        list: null,
      },
      {
        heading: "How to Check If an eScript App Is ADHA Conformant",
        paragraphs: [
          "Verifying an app's ADHA conformance takes less than two minutes and requires no technical knowledge. Here is how to do it.",
        ],
        list: [
          "Go to digitalhealth.gov.au/about-us/policies-privacy-and-reporting/registers.",
          "Download the 'Electronic Prescribing - External Conformance Register' PDF.",
          "Search the document for the app name or the developer's company name.",
          "Check the 'Product Type' column to confirm the entry is a Mobile Application (MA) or Mobile Intermediary System (MIS), and that the Conformance Profile version is current (v3.0.1 entries have no end date and remain active).",
          "If the app is not listed, it is not ADHA conformant. Look for an alternative.",
        ],
      },
      {
        heading: "OpenPharmacy and ADHA Conformance",
        paragraphs: [
          "OpenPharmacy is a free eScript wallet app built by Easy As Health Pty Ltd in Brisbane, Australia. It is registered with the Australian Digital Health Agency and is fully conformant with ADHA's ePrescribing standards for mobile applications.",
          "OpenPharmacy uses end-to-end ASD-approved encryption for all prescription data, with all data stored exclusively on Australian servers and never shared with third parties. The app is protected by a 4-digit PIN, works completely offline so QR codes are accessible without any internet connection, and supports Active Script List connectivity. It can manage prescriptions for multiple family members, making it suitable for caregivers as well as individual patients.",
          "For Australians who want an eScript wallet that combines ADHA conformance, ASD-grade encryption, verified Australian data storage, and guaranteed offline access in one free app, OpenPharmacy was built with exactly those requirements in mind.",
        ],
        list: null,
      },
      {
        heading: "Common Questions About ADHA Conformance",
        paragraphs: [
          "These are the questions Australians most commonly ask about ADHA conformance and health app security.",
        ],
        list: [
          "Is ADHA conformance the same as being approved by the government? Not exactly. ADHA conformance means an app has been assessed and meets the technical and security standards required to participate in Australia's national electronic prescribing system. The ADHA is a government agency, so conformance does reflect government-set standards, but it is not the same as a general government 'approval' or recommendation.",
          "Does my eScript app need to be ADHA conformant? Yes, if you want to use the Active Script List or have any confidence that your prescription data is handled to national security standards. An app that is not on the conformance register has not been assessed against those standards.",
          "Can a conformant app lose its status? Yes. The ADHA can remove a product from the conformance register if it fails to maintain its obligations. This ongoing oversight is one of the reasons conformance is a meaningful standard rather than a one-time certification.",
          "Does ADHA conformance cover data privacy? Conformance requires compliance with the Australian Privacy Principles (APPs) under the Privacy Act 1988, which is Australia's core data privacy framework. However, conformance is primarily a technical and security standard. For detailed privacy practices, also review the app's published privacy policy.",
          "What is the difference between ADHA conformance and being listed on the My Health Record conformance register? The ADHA maintains separate conformance registers for different parts of Australia's digital health system. The Electronic Prescribing conformance register covers apps that handle prescription tokens and connect to the NPDS or ASL. The My Health Record conformance register covers systems that connect to the My Health Record platform. An app can appear on one, both, or neither register.",
          "Which eScript apps are ADHA conformant? You can verify the current list by downloading the Electronic Prescribing External Conformance Register from digitalhealth.gov.au. OpenPharmacy is listed on the register as a conformant mobile application.",
        ],
      },
    ],
  },
  {
    slug: "best-escript-apps-australia-2026",
    title: "Best eScript Apps in Australia for 2026: An Honest Comparison",
    description:
      "An honest, detailed comparison of the best eScript apps in Australia for 2026 — OpenPharmacy, Scripty, MedAdvisor, 1800MEDICARE and more, ranked by security, offline access, family management, and pharmacy independence.",
    date: "2026-03-11",
    updatedDate: null,
    readingTime: "10 min read",
    tags: ["comparison", "best apps", "ranking", "competitors", "scripty", "medadvisor", "middle-funnel"],
    sections: [
      {
        heading: null,
        paragraphs: [
          "The best eScript apps in Australia for 2026 are OpenPharmacy, Scripty, MedAdvisor, and the government's 1800MEDICARE app — each suited to a different type of user. OpenPharmacy and Scripty are purpose-built independent eScript wallets: both are free, ADHA-conformant, work completely offline, and store data on Australian servers. MedAdvisor is the better choice if you want pharmacy ordering, pill reminders, and delivery built into one place. The 1800MEDICARE app is the official government option, tied to your My Health Record, but it requires an internet connection and isn't primarily designed as a script wallet.",
          "Australia has issued over 219 million electronic prescriptions since national rollout began in May 2020. As of 2026, the Australian Government is trialling electronic prescribing by default in primary care — meaning eScripts are rapidly becoming the norm, not the exception. With more prescriptions arriving digitally every month, choosing the right app matters more than ever.",
          "This comparison covers the five most relevant options: what each app does well, where it falls short, who it's best suited to, and how to choose between them. App information was verified in March 2026.",
        ],
        list: null,
      },
      {
        heading: "How We Evaluated These Apps",
        paragraphs: [
          "A useful eScript app needs to do one thing reliably: make sure your prescription QR code is available and scannable at the pharmacy counter, every time. Everything else is secondary. With that core requirement in mind, we evaluated each app across five dimensions that matter most to Australian patients.",
        ],
        list: [
          "ADHA conformance — is the app officially registered with the Australian Digital Health Agency's ePrescribing conformance register? This is the non-negotiable baseline for any app handling real prescription tokens.",
          "Offline access — does the app display prescription QR codes without an internet connection? This is critical in rural and regional areas, and for pharmacies with poor in-store connectivity.",
          "Security and data storage — what encryption standard is used, and where is your data stored? Prescription data is sensitive health information and should never be stored offshore.",
          "Family and carer management — can you manage prescriptions for children, parents, or a partner from a single account?",
          "Pharmacy independence — does the app work at any pharmacy in Australia, or does it push you toward a specific chain?",
        ],
      },
      {
        heading: "1. OpenPharmacy — Best for Security and Offline Access",
        paragraphs: [
          "OpenPharmacy is a free, ADHA-conformant eScript wallet built by Easy As Health Pty Ltd in Brisbane, Australia. It is purpose-built for one job: securely storing and displaying your prescription QR codes, with a particular focus on security and guaranteed offline access. OpenPharmacy uses end-to-end ASD-approved encryption — the encryption standard defined by the Australian Signals Directorate — and stores all data exclusively on Australian servers, never shared with third parties.",
          "The offline-first design is a genuine differentiator. Once your eScripts are loaded, the QR codes are stored locally on your device and available without any internet connection. This makes it uniquely reliable in rural and regional settings, pharmacies with poor signal, or any situation where mobile data is unreliable. The app is protected by a 4-digit PIN and requires no pharmacy registration to get started.",
          "OpenPharmacy supports Active Script List (ASL) connection via an activation code from your pharmacist, enabling automatic syncing of all your active scripts and repeats. Family management allows caregivers to manage prescriptions for multiple people — children, parents, partners — from a single account without separate logins.",
        ],
        list: [
          "Best for: patients in rural and regional areas, security-conscious users, caregivers managing multiple family members' scripts",
          "Cost: free, no ads, no subscription fees",
          "Pharmacy independence: complete — works at any Australian pharmacy",
          "ADHA conformance: yes, registered on the official ePrescribing conformance register",
          "Offline access: yes — QR codes available without any internet connection",
          "Security: end-to-end ASD-approved encryption, PIN-protected, data stored exclusively on Australian servers",
          "ASL/MySL integration: yes, via pharmacy activation code",
          "Family management: yes — manage scripts for multiple family members from one account",
          "Available on: iOS and Android",
        ],
      },
      {
        heading: "2. Scripty — Best for Active Script List Integration",
        paragraphs: [
          "Scripty is a free, ADHA-conformant eScript wallet developed by Oexa, also based in Brisbane, Australia. It is one of the most feature-complete independent eScript wallets available to Australian patients, and was among the first consumer apps to integrate with the My Script List (MySL) national Active Script List system. Once connected to the ASL, scripts and repeats are added automatically — no manual token entry needed.",
          "Scripty's standout feature for busy users is Smart Import: you can add multiple scripts at once by taking screenshots of your eScript messages and letting the app extract the tokens automatically. It also offers automatic archiving of used and expired scripts, the ability to add personalised nicknames to medications, and a Scan and Swipe feature for presenting multiple QR codes in sequence at the pharmacy counter. Like OpenPharmacy, it works offline and is not tied to any pharmacy chain.",
          "On security, Scripty stores data on Australian servers, uses end-to-end encryption in transit, and encrypts data at rest. Device-stored data is encrypted when the app is not in use, with optional biometric lock (fingerprint or Face ID). No pharmacy activation code is needed to sign up — you simply use a Google or Apple login.",
        ],
        list: [
          "Best for: users who want frictionless ASL syncing, those importing many scripts at once, users who want biometric lock",
          "Cost: free, ad-free",
          "Pharmacy independence: complete — works at any Australian pharmacy",
          "ADHA conformance: yes, listed on the ADHA ePrescribing conformance register",
          "Offline access: yes — QR codes available without an internet connection",
          "Security: end-to-end encryption, Australian-hosted data, optional biometric lock",
          "ASL/MySL integration: yes, direct integration — no pharmacy activation code required to set up your account",
          "Family management: yes — auto-organises scripts by family member",
          "Available on: iOS and Android",
        ],
      },
      {
        heading: "3. MedAdvisor — Best for Pharmacy Ordering and Medication Reminders",
        paragraphs: [
          "MedAdvisor is a broader medication management platform used by nearly 4 million Australians, connected to over 95% of Australian pharmacies (5,500+ locations). It is not primarily an eScript wallet — it is a full medication management platform that includes eScript storage alongside pharmacy ordering, medication delivery, pill reminders, refill alerts, telehealth consultations, and integration with pharmacist health services.",
          "For patients who want to pre-order medications for pickup or home delivery, skip the queue at their regular pharmacy, and receive reminders when it's time to refill, MedAdvisor offers significantly more than a dedicated eScript wallet. The app added Active Script List integration in December 2025, enabling automatic syncing for patients registered on ASL. MedAdvisor is also ISO 27001 certified, demonstrating adherence to international information security standards.",
          "The tradeoffs are worth understanding. MedAdvisor's eScript functionality is part of a larger platform focused on the pharmacy-ordering workflow — it is not primarily designed as a portable wallet for presenting QR codes at any counter. The app requires pharmacy registration and approval to access ordering features, and the ASL setup requires a pharmacy-issued activation code. MedAdvisor does not publish explicit offline access details for its QR code display, which is worth confirming before relying on it in low-connectivity settings.",
        ],
        list: [
          "Best for: patients on regular medications at a consistent pharmacy who want ordering, reminders, and delivery in one app",
          "Cost: free to download and use",
          "Pharmacy independence: works across 95%+ of Australian pharmacies, but optimised for ordering at a registered pharmacy",
          "ADHA conformance: yes",
          "Offline access: not explicitly confirmed for QR code display — verify before use in low-signal settings",
          "Security: ISO 27001 certified, ADHA-compliant encryption, pharmacy data protection standards",
          "ASL/MySL integration: yes, launched December 2025, requires pharmacy activation code",
          "Family management: yes — manage medications for family members and carers",
          "Available on: iOS and Android",
        ],
      },
      {
        heading: "4. 1800MEDICARE App — Best for My Health Record Integration",
        paragraphs: [
          "The 1800MEDICARE app is the Australian Government's official health app, operated by the Australian Digital Health Agency. It was renamed from 'my health app' on 1 January 2026 as part of a broader government initiative to expand access to primary care. The app provides access to your My Health Record, electronic prescriptions, and the Active Script List, alongside features like healthcare service finder, immunisation history, and Medicare information.",
          "For patients who already use My Health Record and want a single government-backed app for all their health information, the 1800MEDICARE app provides a useful baseline. It supports authorised representatives, meaning carers and parents can view and help manage a family member's health information using their own login. The app requires a myGov account linked to My Health Record to set up.",
          "The 1800MEDICARE app is not a dedicated eScript wallet and has a meaningful limitation for pharmacy visits: it requires an internet connection to function. There is no offline access to prescription QR codes. This makes it unsuitable as a standalone eScript management solution for patients in areas with unreliable connectivity, and less convenient at pharmacy counters where signal can be inconsistent. It is best understood as a health records portal that includes eScript access, rather than a wallet optimised for daily prescription management.",
        ],
        list: [
          "Best for: patients who primarily want access to My Health Record alongside their eScripts, and who have reliable internet access",
          "Cost: free",
          "Pharmacy independence: works at any pharmacy accepting electronic prescriptions",
          "ADHA conformance: yes — operated directly by the Australian Digital Health Agency",
          "Offline access: no — requires an internet connection",
          "Security: government-grade security, myGov authentication, 6-digit PIN",
          "ASL/MySL integration: yes — directly connected",
          "Family management: yes — authorised representatives can manage family members' records",
          "Available on: iOS and Android (requires myGov account and linked My Health Record)",
        ],
      },
      {
        heading: "5. Pharmacy-Linked Wallets — Best for Chain Loyalty Users",
        paragraphs: [
          "Several major pharmacy groups offer their own eScript wallet apps: Healthylife Script Wallet (Chemist Warehouse group), Chemist2U MyScripts, and honahlee eScript Wallet+. These apps are designed to make it easy to fill scripts at their affiliated pharmacies, with features like online ordering, delivery, and automatic ASL syncing for the platforms that support it.",
          "The core limitation of pharmacy-linked wallets is in the name: they work best when you fill scripts at their pharmacy. If you switch pharmacies, travel, or simply want to compare prices and services, a pharmacy-linked wallet creates friction that an independent app avoids entirely. They are a reasonable choice for patients who fill all their scripts at one chain and value the integrated ordering experience — but for anyone who wants genuine pharmacy choice, an independent app like OpenPharmacy or Scripty is the more flexible option.",
          "honahlee eScript Wallet+ is notable for its ASL integration, which automatically carries all your prescriptions in real time without manual token uploads. It is primarily designed for medicinal cannabis patients and users of the honahlee online pharmacy platform.",
        ],
        list: [
          "Best for: patients who consistently use one pharmacy chain and want an integrated ordering experience",
          "Cost: free",
          "Pharmacy independence: limited — optimised for the affiliated pharmacy chain",
          "ADHA conformance: varies by app — verify individually",
          "Offline access: varies — verify before relying on in low-signal settings",
        ],
      },
      {
        heading: "Side-by-Side Comparison",
        paragraphs: [
          "Here is a summary of how the five main options compare across the criteria that matter most to Australian patients choosing an eScript app in 2026.",
        ],
        list: [
          "OpenPharmacy: ADHA conformant | offline access YES | Australian data storage YES | family management YES | pharmacy independent YES | cost FREE",
          "Scripty: ADHA conformant | offline access YES | Australian data storage YES | family management YES | pharmacy independent YES | cost FREE",
          "MedAdvisor: ADHA conformant | offline access UNCONFIRMED | data storage protected | family management YES | pharmacy network 95%+ | cost FREE",
          "1800MEDICARE app: ADHA conformant (government-operated) | offline access NO | data storage Australian government | family management YES (authorised reps) | pharmacy independent YES | cost FREE",
          "Pharmacy-linked wallets (Healthylife, Chemist2U, honahlee): conformance varies | offline access varies | family management varies | pharmacy independent LIMITED | cost FREE",
        ],
      },
      {
        heading: "How to Choose the Right App for Your Situation",
        paragraphs: [
          "The right app depends on what frustrates you most about managing prescriptions today. Here is a straightforward guide.",
        ],
        list: [
          "You want the most secure, private option with guaranteed offline access: OpenPharmacy. ASD-approved encryption, Australian servers, no pharmacy affiliation, complete offline QR code access.",
          "You want frictionless ASL syncing with no pharmacy visit to set up: Scripty. ASL connects without a pharmacy activation code, and Smart Import lets you add multiple scripts from screenshots at once.",
          "You want to pre-order medications, get reminders, and have scripts delivered: MedAdvisor. It is the most feature-complete platform for the pharmacy-ordering workflow.",
          "You want the official government app connected to your My Health Record: 1800MEDICARE app. Requires myGov setup and a reliable internet connection.",
          "You always use the same pharmacy chain and want ordering integration: try their own wallet app (Healthylife, Chemist2U, or honahlee). Just be aware it limits your flexibility.",
          "You are a caregiver managing scripts for children, parents, or a partner: both OpenPharmacy and Scripty support family management. OpenPharmacy requires no pharmacy registration and has the most explicit offline guarantee.",
          "You live in a rural or regional area with unreliable mobile signal: OpenPharmacy is the most explicit about offline QR code availability without any internet connection.",
        ],
      },
      {
        heading: "What All Good eScript Apps Have in Common",
        paragraphs: [
          "Regardless of which app you choose, look for these baseline features before trusting any app with your prescription data.",
          "ADHA conformance is the non-negotiable starting point. Only apps listed on the Australian Digital Health Agency's official ePrescribing conformance register have been independently assessed to meet the security and interoperability standards required to handle prescription tokens within Australia's national system. You can verify any app's conformance status at digitalhealth.gov.au.",
          "Australian data storage matters because prescription information is sensitive health data governed by the Privacy Act 1988 and the Australian Privacy Principles. An app that stores your data offshore removes your data from Australian legal protections. Both OpenPharmacy and Scripty explicitly confirm all data is hosted on Australian servers.",
        ],
        list: null,
      },
      {
        heading: "Frequently Asked Questions",
        paragraphs: [
          "These are the questions Australians most commonly ask when comparing eScript apps.",
        ],
        list: [
          "Is there a best eScript app for Australia in 2026? OpenPharmacy and Scripty are the strongest dedicated eScript wallets: both are free, ADHA-conformant, offline-capable, and pharmacy-independent. MedAdvisor is better if you want a full medication management platform with ordering. The 1800MEDICARE app suits users who want government-integrated My Health Record access.",
          "Do I need a My Health Record to use an eScript wallet? No. eScript tokens and the Active Script List operate independently of My Health Record. You do not need a My Health Record account to receive, store, or present eScripts.",
          "What is ADHA conformance? It is the Australian Digital Health Agency's certification that an app meets the mandatory security, technical, and interoperability standards required to participate in Australia's national digital health infrastructure. Only conformant apps can legally connect to the National Prescription Delivery Service.",
          "Can I use any pharmacy with an independent eScript wallet? Yes. ADHA-conformant eScript wallets like OpenPharmacy and Scripty work at any Australian pharmacy that accepts electronic prescriptions — the vast majority of community pharmacies. You are not locked into any specific chain.",
          "Which eScript app works offline? OpenPharmacy and Scripty both work offline — QR codes are stored locally on your device and accessible without internet. The 1800MEDICARE app requires an internet connection.",
          "Which eScript app is the most secure? OpenPharmacy uses end-to-end ASD-approved encryption with all data stored exclusively on Australian servers. Scripty also uses end-to-end encryption with Australian-hosted data. MedAdvisor is ISO 27001 certified. All three are ADHA conformant.",
          "Are eScript apps free? Yes — OpenPharmacy, Scripty, MedAdvisor, and the 1800MEDICARE app are all free to download and use with no subscription fees.",
        ],
      },
    ],
  },
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
