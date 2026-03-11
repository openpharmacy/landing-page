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
    relatedSlugs: [],
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
];

export default blogPosts;
