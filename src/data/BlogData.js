/**
 * BlogData.js
 *
 * Central registry for all OpenPharmacy blog posts.
 * Each post is a self-contained object — add new posts to the array
 * and they will automatically appear on the /blog index and be
 * routable at /blog/:slug.
 *
 * Section types accepted in `sections[]`:
 *   { type: "paragraph", text: string }
 *   { type: "heading", text: string }
 *   { type: "list", items: string[] }
 *   { type: "ordered_list", items: string[] }
 *   { type: "callout", text: string }
 *   { type: "table", headers: string[], rows: string[][] }
 */

const blogPosts = [
  {
    slug: "what-is-an-escript-australia",
    title: "What Is an eScript? A Plain-English Guide for Australian Patients",
    category: "Guides",
    publishedDate: "2026-03-11",
    updatedDate: "2026-03-11",
    readingTime: "6 min read",
    excerpt:
      "Electronic prescriptions (eScripts) have replaced paper scripts for most Australians. Here is exactly how they work, what the token is, and how to manage them without losing track.",
    metaTitle: "What Is an eScript in Australia? Complete Patient Guide",
    metaDescription:
      "Learn how Australian electronic prescriptions (eScripts) work, what the token link is, how repeats are handled, and the best way to store and manage your eScripts securely.",
    sections: [
      {
        type: "paragraph",
        text: "An electronic prescription \u2014 commonly called an eScript \u2014 is a digital version of a traditional paper prescription issued by an Australian doctor, dentist, or other authorised prescriber. Instead of handing you a printed form, your prescriber sends a unique token link to your mobile or email. That token is all you need to collect your medication from any pharmacy in Australia.",
      },
      {
        type: "heading",
        text: "How Does an eScript Token Work?",
      },
      {
        type: "paragraph",
        text: "The eScript token is a short alphanumeric code embedded in a link and displayed as a QR code. When your pharmacist scans or enters the token, it connects to Australia's National Prescription Delivery Service to verify the prescription and mark it as dispensed. Each token is single-use: once a pharmacist fills your script, that token becomes inactive. If you have repeats, a new token is issued for the next supply.",
      },
      {
        type: "paragraph",
        text: "Because the token points to a centralised, government-connected system, there is no risk of duplicate dispensing. The prescription lives in a secure national database \u2014 your token is simply the key to access it.",
      },
      {
        type: "heading",
        text: "How Are eScripts Sent to Patients?",
      },
      {
        type: "paragraph",
        text: "Your prescriber will ask for your preferred delivery method \u2014 usually SMS or email. You will receive a message containing a link. Tapping that link on a device with an eScript wallet app installed (such as OpenPharmacy) adds the prescription directly to your app. If you tap it without a compatible app installed, you will be directed to download one or view a web-based token.",
      },
      {
        type: "list",
        items: [
          "SMS: A short text with a link arrives seconds after your appointment.",
          "Email: A message with the token link is sent to your registered address.",
          "Paper token: Some prescribers print a QR code \u2014 this is still a valid eScript token, not a paper prescription.",
          "Active Script List (ASL): If you are registered, scripts can sync automatically to your wallet app without any manual action.",
        ],
      },
      {
        type: "heading",
        text: "What Is the Active Script List (ASL)?",
      },
      {
        type: "paragraph",
        text: "The Active Script List (also called My Script List or MySL) is a secure, government-supported digital record of all your active eScripts and repeats. It is overseen by the Australian Digital Health Agency (ADHA) and managed by MySL.com.au. When you register for ASL at a pharmacy, your prescriptions sync automatically to any connected app \u2014 no need to tap individual token links. OpenPharmacy connects to ASL so your scripts appear in the app as soon as your doctor prescribes them.",
      },
      {
        type: "heading",
        text: "Paper Prescriptions vs. eScripts: Key Differences",
      },
      {
        type: "table",
        headers: ["Feature", "Paper Prescription", "eScript"],
        rows: [
          ["Delivery", "Physical form at appointment", "SMS or email link"],
          ["Fill location", "Any pharmacy", "Any pharmacy"],
          ["Duplicate risk", "Can be photocopied", "Technically prevented by token system"],
          ["Repeat handling", "New paper form issued", "New digital token issued"],
          ["Loss risk", "High \u2014 physical item", "Low \u2014 token is resendable"],
          ["Offline access", "Always available", "Requires an offline-capable wallet app"],
          ["Storage", "Filing cabinet or wallet", "eScript wallet app like OpenPharmacy"],
        ],
      },
      {
        type: "heading",
        text: "Can You Lose an eScript Token?",
      },
      {
        type: "paragraph",
        text: "Technically yes \u2014 if you delete the SMS or email before saving the token, it can be inconvenient to recover. Your prescriber or pharmacist can look up the token on the National Prescription Delivery Service, but this adds a step. The easiest way to avoid this is to store all tokens in a dedicated eScript wallet app as soon as you receive them. That way, the prescription is saved independently of your messages app.",
      },
      {
        type: "callout",
        text: "OpenPharmacy stores your eScript tokens in an encrypted wallet on your device \u2014 accessible even without an internet connection. If you lose your phone, your prescriptions can be recovered via your account.",
      },
      {
        type: "heading",
        text: "How Do Repeat Prescriptions Work with eScripts?",
      },
      {
        type: "paragraph",
        text: "Each repeat is a separate token. After your pharmacist dispenses your first supply, a new token for the next repeat is sent to you by SMS or email. You then add that token to your eScript wallet to access the next supply. If you are linked to ASL, this process is automatic \u2014 new repeat tokens appear in your OpenPharmacy app without any manual steps.",
      },
      {
        type: "ordered_list",
        items: [
          "Doctor prescribes medication \u2014 you receive token via SMS or email.",
          "Tap the link to add the token to your OpenPharmacy wallet.",
          "Visit any pharmacy and show the QR code from the app.",
          "Pharmacist dispenses your medication \u2014 the token is marked as used.",
          "A new repeat token is sent to you (or syncs automatically via ASL).",
          "Repeat steps 2 through 5 for each refill until no repeats remain.",
        ],
      },
      {
        type: "heading",
        text: "Are eScripts Accepted at Every Australian Pharmacy?",
      },
      {
        type: "paragraph",
        text: "Yes. All Australian pharmacies are required to accept electronic prescriptions as part of the national eScribing rollout mandated by the Department of Health and Aged Care. You are not locked to a specific pharmacy chain \u2014 you can fill an eScript at any pharmacy you choose, just as you could with a paper prescription.",
      },
      {
        type: "heading",
        text: "Is the eScript System Secure?",
      },
      {
        type: "paragraph",
        text: "The eScript system is governed by the Australian Digital Health Agency, which sets strict security and privacy requirements for all apps and services that connect to it. Approved apps must be listed on the ePrescribing conformance register. OpenPharmacy is registered with the ADHA and uses end-to-end ASD-approved encryption, with all data stored on Australian servers. Your prescription information is never shared with third parties.",
      },
      {
        type: "heading",
        text: "How to Manage eScripts Without Losing Track",
      },
      {
        type: "paragraph",
        text: "Managing a handful of scripts via SMS links is manageable. Managing prescriptions for a whole family \u2014 or dealing with multiple chronic medications \u2014 quickly becomes chaotic. Tokens expire, SMS inboxes get cluttered, and repeat notifications get missed. A dedicated eScript wallet solves this by giving you one organised place for every active and archived prescription.",
      },
      {
        type: "list",
        items: [
          "Add scripts immediately when the token arrives \u2014 do not leave them in your SMS inbox.",
          "Connect to ASL for automatic syncing if you have frequent or multiple prescriptions.",
          "Use a wallet app that works offline so QR codes are available at the pharmacy even without reception.",
          "Manage family members' scripts under separate profiles to avoid confusion.",
          "Check remaining repeats inside the app before visiting the pharmacy.",
        ],
      },
      {
        type: "heading",
        text: "Frequently Asked Questions About eScripts",
      },
      {
        type: "heading",
        text: "Can I use an eScript at a pharmacy without my phone?",
      },
      {
        type: "paragraph",
        text: "If your pharmacist has your Medicare card and can locate the prescription on the National Prescription Delivery Service, they may be able to dispense without the QR code in some circumstances. However, having the token available is the standard and most reliable method. Storing scripts in an offline-capable app like OpenPharmacy means your QR codes are always available, even with no internet signal.",
      },
      {
        type: "heading",
        text: "What happens if my phone breaks and I lose my eScript tokens?",
      },
      {
        type: "paragraph",
        text: "If you use an eScript wallet app with cloud backup (like OpenPharmacy, which syncs to your account), reinstalling the app and signing in will restore all your saved prescriptions. If you stored tokens only in your SMS inbox and lose the phone, contact your prescriber or pharmacist \u2014 they can look up the prescription using your Medicare details.",
      },
      {
        type: "heading",
        text: "Do eScripts expire?",
      },
      {
        type: "paragraph",
        text: "Yes. Prescriptions have the same validity periods as paper scripts \u2014 typically 12 months from the issue date for most medications, and shorter periods for Schedule 8 controlled medications. The token itself does not add or remove expiry; it simply reflects the underlying prescription's validity as set by your prescriber.",
      },
    ],
  },
  {
    slug: "australian-escripts-complete-guide-2026",
    title: "What Are Australian eScripts? The Complete Guide (2026)",
    category: "Guides",
    publishedDate: "2026-03-11",
    updatedDate: "2026-03-11",
    readingTime: "12 min read",
    excerpt:
      "Everything Australian patients need to know about electronic prescriptions: how the token system works, what the Active Script List does, how eScript wallet apps manage your scripts, and how to choose the right app for your needs.",
    metaTitle: "Australian eScripts: The Complete Guide (2026) | OpenPharmacy",
    metaDescription:
      "The definitive guide to Australian electronic prescriptions (eScripts) in 2026. Learn how tokens work, what the Active Script List is, how eScript wallet apps compare, and how to keep your scripts secure and accessible.",
    sections: [
      {
        type: "paragraph",
        text: "Australian electronic prescriptions \u2014 known as eScripts \u2014 have fundamentally changed how patients receive and fill their medications. Since the national rollout began in May 2020, more than 219 million eScripts have been issued across the country, and virtually every Australian community pharmacy now accepts them. Yet many patients still manage their prescriptions by hunting through SMS inboxes or forwarding email links at the pharmacy counter. This guide explains exactly how the eScript system works, what your options are for managing prescriptions digitally, and how to find a solution that fits your life.",
      },
      {
        type: "heading",
        text: "What Is an Australian eScript?",
      },
      {
        type: "paragraph",
        text: "An Australian eScript is a legally valid electronic prescription issued by a registered prescriber \u2014 a GP, specialist, dentist, or nurse practitioner \u2014 in place of a paper form. The prescription data is stored in a secure national system called the National Prescription Delivery Service (NPDS), operated under the oversight of the Australian Digital Health Agency (ADHA). Patients do not receive the prescription itself; instead, they receive a unique access key called a token. That token is the digital equivalent of your paper script.",
      },
      {
        type: "callout",
        text: "Updated March 2026: Over 219 million eScripts have been issued in Australia since May 2020. As of March 2025, patients can now self-register for the Active Script List online, following amendments to the Healthcare Identifiers Regulations 2020.",
      },
      {
        type: "heading",
        text: "How Does the eScript Token System Work?",
      },
      {
        type: "paragraph",
        text: "The eScript token is a short alphanumeric code, delivered as a clickable link and rendered as a QR code. Each token corresponds to one supply of one medicine. When a pharmacist scans or enters your token, their dispensing software connects to the NPDS, retrieves the prescription details, and marks the token as dispensed. Once used, that token is permanently deactivated \u2014 the system prevents the same prescription being filled twice.",
      },
      {
        type: "paragraph",
        text: "If your prescription has repeats, a fresh token for the next supply is issued after each dispensing event. You receive this new token via SMS or email from the pharmacy, or it appears automatically in a connected eScript wallet app. The prescription itself never leaves the secure national database; the token is simply the authorised key to access each supply.",
      },
      {
        type: "heading",
        text: "How Do Patients Receive eScript Tokens?",
      },
      {
        type: "paragraph",
        text: "Your prescriber will send the token to your preferred contact method. The four delivery options currently available in Australia are:",
      },
      {
        type: "list",
        items: [
          "SMS: A text message arrives within seconds of your consultation, containing a link that opens your eScript token.",
          "Email: A message with the token link is sent to your registered email address \u2014 useful as a backup if SMS is unavailable.",
          "Printed QR code: Some prescribers print the token on paper. This is still a valid eScript, not a traditional paper prescription.",
          "Active Script List (ASL): If you are registered, your prescriber can send new scripts directly to your ASL, where they appear automatically in any connected wallet app without you needing to tap a link.",
        ],
      },
      {
        type: "paragraph",
        text: "In 2025, some patients experienced issues receiving eScript tokens via SMS due to carrier-level delivery errors, which the ADHA acknowledged publicly. This is one reason health experts recommend saving tokens to a dedicated eScript wallet app immediately on receipt, rather than relying on your SMS inbox as primary storage.",
      },
      {
        type: "heading",
        text: "What Is the Active Script List (ASL)?",
      },
      {
        type: "paragraph",
        text: "The Active Script List (ASL), also called My Script List (MySL), is a government-supported digital register that holds all of your active eScripts and upcoming repeats in one place. It is managed under the oversight of the ADHA and the Department of Health and Aged Care. As of March 2025, patients can self-register for ASL online following changes to the Healthcare Identifiers Regulations \u2014 previously this required a visit to a participating pharmacy.",
      },
      {
        type: "paragraph",
        text: "The ASL provides two key benefits. First, a pharmacy you nominate can access your ASL directly to dispense your medication without you presenting a token each visit. Second, any ADHA-conformant eScript wallet app can connect to your ASL, pulling in new prescriptions and repeat tokens automatically. OpenPharmacy connects to ASL, so scripts appear in the app as soon as your doctor prescribes them.",
      },
      {
        type: "table",
        headers: ["Feature", "Token-Only Approach", "ASL-Connected App"],
        rows: [
          ["Receiving new scripts", "Manual \u2014 tap each SMS or email link", "Automatic \u2014 scripts sync to the app"],
          ["Repeat tokens", "Sent via SMS or email after each dispense", "Auto-synced to the app"],
          ["Risk of losing a script", "High if SMS is deleted", "Low \u2014 stored in app independently of messages"],
          ["Pharmacy access", "Present QR code at counter", "Pharmacy can access ASL directly"],
          ["Setup required", "None", "One-time online registration or via a pharmacy"],
          ["Offline access", "Depends on phone reception", "Available offline with the right app"],
        ],
      },
      {
        type: "heading",
        text: "How Do eScript Wallet Apps Work for Australian Patients?",
      },
      {
        type: "paragraph",
        text: "An eScript wallet app is a dedicated mobile application that securely stores, organises, and displays your electronic prescription tokens. Think of it as a digital version of the envelope you once kept your paper scripts in \u2014 except it connects to Australia's national prescription infrastructure, works offline, and can hold scripts for your entire family. Here is the complete flow from prescription to pharmacy.",
      },
      {
        type: "ordered_list",
        items: [
          "Your doctor prescribes your medication and sends an eScript token to your phone via SMS or email.",
          "You tap the link in the message. If you have a compatible eScript wallet app installed, the token is added directly to the app.",
          "Alternatively, you open the app and use its built-in QR scanner to capture the code from your message.",
          "The app stores the token securely \u2014 encrypted on your device \u2014 and displays the prescription name, dosage, and remaining repeats.",
          "At the pharmacy, you open the app and present the script's QR code. No internet connection is required if the app supports offline access.",
          "The pharmacist scans the QR code, connects to the NPDS to verify and dispense the medication, and the token is marked as used.",
          "If you have repeats, the next token appears in your app automatically via ASL, or arrives via SMS for manual addition.",
        ],
      },
      {
        type: "heading",
        text: "Why Offline Access Matters for Australian Patients",
      },
      {
        type: "paragraph",
        text: "Many web-based or cloud-dependent eScript apps require an active internet connection to display a prescription's QR code. In a pharmacy with poor Wi-Fi, in a rural or regional area with patchy mobile reception, or simply when your data runs out, this creates a real and immediate problem. A wallet app that stores tokens locally on your device \u2014 and renders the QR code without needing a network connection \u2014 means your scripts are available regardless of signal strength.",
      },
      {
        type: "callout",
        text: "OpenPharmacy is built offline-first: your eScript QR codes are stored and rendered entirely on your device. They are accessible even with no internet connection or mobile signal \u2014 a critical feature for patients in rural and regional Australia.",
      },
      {
        type: "heading",
        text: "eScript Wallet Apps vs. Medication Tracker Apps: What Is the Difference?",
      },
      {
        type: "paragraph",
        text: "These two app categories are frequently confused, but they serve fundamentally different purposes. An eScript wallet app stores and presents the official government-issued tokens needed to collect your medication. A medication tracker app helps you manage your dosing schedule and adherence. Understanding the difference helps you choose the right tool, or know when you need both.",
      },
      {
        type: "table",
        headers: ["Feature", "eScript Wallet App", "Medication Tracker App"],
        rows: [
          ["Primary purpose", "Stores and presents official eScript tokens for dispensing at any pharmacy", "Tracks medication schedules, doses, and daily adherence"],
          ["Pharmacy dispensing", "QR code scanned directly at the pharmacy counter", "Not designed for dispensing \u2014 provides information only"],
          ["Official token storage", "Holds government-issued eScript tokens connected to the NPDS", "Logs medication names manually; does not hold official tokens"],
          ["ASL integration", "Available in ADHA-conformant apps", "Generally not available"],
          ["Repeat count accuracy", "Reflects actual repeat count from the national system", "User-entered; not connected to the national system"],
          ["Offline QR access", "Available in purpose-built apps like OpenPharmacy", "Not applicable"],
          ["Best suited for", "Collecting medication at a pharmacy", "Managing daily medication routines and reminders"],
        ],
      },
      {
        type: "paragraph",
        text: "Some apps combine both functions, offering token storage alongside reminder and adherence features. If you need both, look for an ADHA-conformant eScript wallet that also includes medication reminders, rather than running two separate apps.",
      },
      {
        type: "heading",
        text: "What Is ADHA Conformance and Why Does It Matter?",
      },
      {
        type: "paragraph",
        text: "ADHA conformance is the Australian Digital Health Agency's process for verifying that a digital health product meets the technical, security, and privacy standards required to connect to national health infrastructure \u2014 including the NPDS and ASL. Conformance is mandatory: software cannot legally access these government systems without completing the assessment process and receiving a valid conformance identifier.",
      },
      {
        type: "paragraph",
        text: "For patients, ADHA conformance means three concrete things. First, the app has been assessed against Australian government security standards, including those published by the Australian Signals Directorate (ASD). Second, the app is interoperable: it can reliably exchange data with the national prescription systems. Third, the app appears on the ADHA's public conformance register at digitalhealth.gov.au, so you can independently verify that any app you use is genuinely approved \u2014 not just claiming to be.",
      },
      {
        type: "callout",
        text: "OpenPharmacy is registered with the Australian Digital Health Agency and fully conformant with their standards. All prescription data is protected with end-to-end ASD-approved encryption and stored on Australian servers. No data is shared with third parties.",
      },
      {
        type: "heading",
        text: "How to Add an eScript Token to a Wallet App",
      },
      {
        type: "paragraph",
        text: "There are three methods for getting an eScript token into a wallet app. The right approach depends on how you received the token and which method your app supports.",
      },
      {
        type: "ordered_list",
        items: [
          "Tap the link: Open the SMS or email from your prescriber and tap the token link. If a compatible wallet app is installed, you are prompted to add the token directly to the app. This is the fastest and most common method.",
          "Scan the QR code: Open your wallet app, activate the built-in QR scanner, and scan the code shown in your SMS, email, or printed token. The app displays the script details and asks you to confirm before saving.",
          "Manual entry: Enter the 18-character alphanumeric token code directly into the app. Use this method if the link or QR code is unavailable or cannot be scanned.",
        ],
      },
      {
        type: "paragraph",
        text: "Once added, the token is stored in the app's encrypted wallet. You can view the prescription name, dosage, remaining repeats, and expiry date at any time without needing to re-access your original SMS or email.",
      },
      {
        type: "heading",
        text: "Managing eScripts for Your Family",
      },
      {
        type: "paragraph",
        text: "One of the most common and underserved use cases for eScript wallet apps is managing prescriptions on behalf of family members \u2014 young children, elderly parents, or a partner with ongoing medication needs. Without a dedicated app, this means juggling multiple SMS inboxes and email accounts across different devices. A wallet app that supports multiple profiles allows you to organise every family member's scripts in one place under clearly labelled accounts, while keeping them separate from your own.",
      },
      {
        type: "list",
        items: [
          "Create a separate profile for each family member inside the app.",
          "Add each person's tokens to their respective profile when received.",
          "At the pharmacy, select the correct family member's profile before presenting the QR code.",
          "Track each person's remaining repeats independently to avoid last-minute pharmacy trips.",
          "If a family member holds their own ASL, connect their profile to their ASL for automatic script syncing.",
        ],
      },
      {
        type: "paragraph",
        text: "OpenPharmacy supports family management, allowing caregivers to store and organise scripts for children and dependants from a single app. Scripts can also be shared securely with other carers or family members directly through the app.",
      },
      {
        type: "heading",
        text: "What to Do If You Lose an eScript Token",
      },
      {
        type: "paragraph",
        text: "If you accidentally delete the SMS or email containing an eScript token, the prescription itself is not lost \u2014 it still exists in the national NPDS database. What you have lost is your access key. Here is how to recover it quickly.",
      },
      {
        type: "ordered_list",
        items: [
          "For an original prescription: Contact your prescriber and ask them to cancel the existing token and issue a new one. This is a routine process and can usually be completed the same day.",
          "For a repeat prescription: Contact the pharmacy that last dispensed the medication. The pharmacist can resend the most recent repeat token to your phone.",
          "If you are registered for ASL: Your pharmacy can access your active scripts directly without a token, so a lost SMS may not matter at all.",
        ],
      },
      {
        type: "paragraph",
        text: "The most effective prevention is to save every token to a wallet app immediately on receipt, before there is any chance of losing it. OpenPharmacy stores your tokens on-device in an encrypted wallet that exists independently of your SMS or email inbox.",
      },
      {
        type: "heading",
        text: "How to Verify That a Health App Stores Your Data Securely",
      },
      {
        type: "paragraph",
        text: "Before trusting any app with your prescription data, check for these five signals:",
      },
      {
        type: "list",
        items: [
          "ADHA conformance listing: Search the ADHA's conformance register at digitalhealth.gov.au to confirm the app is officially registered and approved.",
          "Australian data storage: Confirm that all data is stored on servers physically located in Australia, making it subject to Australian privacy law.",
          "ASD-approved encryption: Look for specific references to ASD-approved or equivalent end-to-end encryption, not just generic SSL claims.",
          "Third-party data sharing: Review the app's privacy policy for any clauses about sharing data with pharmacy chains, advertisers, or parent companies.",
          "Pharmacy chain independence: An app owned by a specific pharmacy group may have commercial incentives that affect how your data is used or which pharmacy it directs you to.",
        ],
      },
      {
        type: "paragraph",
        text: "OpenPharmacy is an independent app with no ties to any pharmacy chain. It is developed by Easy As Health Pty Ltd, based in Brisbane. All data is stored on Australian servers, and the privacy policy is publicly available at openpharmacy.com.",
      },
      {
        type: "heading",
        text: "What Features Should You Look for in an eScript App?",
      },
      {
        type: "paragraph",
        text: "Not all eScript wallet apps offer the same capabilities. These are the features that have the most practical impact for Australian patients:",
      },
      {
        type: "table",
        headers: ["Feature", "Why It Matters"],
        rows: [
          ["Offline QR code access", "Ensures your script is available in areas with poor reception or no Wi-Fi"],
          ["ADHA conformance", "Confirms the app meets government security and interoperability standards"],
          ["ASL integration", "Eliminates manual token management by auto-syncing new scripts and repeats"],
          ["Family and multi-profile support", "Allows caregivers to manage scripts for children and elderly relatives"],
          ["Australian data storage", "Keeps your health information subject to Australian privacy law"],
          ["End-to-end encryption", "Protects prescription data in transit and at rest on your device"],
          ["Active and archived scripts view", "Makes it easy to track current and past prescriptions in one place"],
          ["Repeat count display", "Tells you when to book a new appointment before you run out"],
          ["Pharmacy independence", "Lets you fill at any pharmacy rather than being steered to a specific chain"],
        ],
      },
      {
        type: "heading",
        text: "eScripts, Privacy, and Australian Health Law",
      },
      {
        type: "paragraph",
        text: "Electronic prescription data is protected under the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs), which govern how health information can be collected, used, and disclosed. The ADHA also publishes a dedicated Electronic Prescribing Active Script List Privacy Framework that sets out additional obligations for all parties in the eScript ecosystem \u2014 from prescribers to app developers.",
      },
      {
        type: "paragraph",
        text: "As a patient, you have the right to access your own prescription data, request corrections, and opt certain medications out of your ASL. Patients with sensitive prescriptions \u2014 for mental health conditions, contraception, or similar \u2014 can ask their prescriber to exclude specific medications from the ASL system, managing those tokens privately instead.",
      },
      {
        type: "heading",
        text: "Frequently Asked Questions About eScript Wallet Apps",
      },
      {
        type: "heading",
        text: "Do I need to be registered with My Health Record to use an eScript wallet app?",
      },
      {
        type: "paragraph",
        text: "No. eScript wallet apps work independently of My Health Record. You can receive tokens via SMS or email and add them to a wallet app without any My Health Record connection. ASL registration is also a separate process from My Health Record, though some government apps link the two systems.",
      },
      {
        type: "heading",
        text: "Can I use an eScript app at any pharmacy in Australia?",
      },
      {
        type: "paragraph",
        text: "Yes. eScripts are accepted at all Australian community pharmacies. You are not required to use a specific pharmacy or chain. An independent eScript wallet app like OpenPharmacy lets you present your QR code at any pharmacy you choose \u2014 you are never locked in to a particular retailer.",
      },
      {
        type: "heading",
        text: "Can I share a script with someone else to collect on my behalf?",
      },
      {
        type: "paragraph",
        text: "Yes. You can forward a token to another person via SMS, email, or through the wallet app's share function. The recipient presents the QR code at the pharmacy to collect the medication. Only one person can collect each supply \u2014 once the token is dispensed, it cannot be reused.",
      },
      {
        type: "heading",
        text: "What happens to my scripts if I switch eScript apps?",
      },
      {
        type: "paragraph",
        text: "Tokens stored only in your old app may not transfer automatically to a new one. Before switching, note down any active token codes. If you are connected to ASL, your new app can sync your active scripts from the national list. Archived scripts that have already been dispensed generally cannot be migrated between apps.",
      },
      {
        type: "heading",
        text: "Is there a cost to use an eScript wallet app?",
      },
      {
        type: "paragraph",
        text: "Many eScript wallet apps, including OpenPharmacy, are free to download and use. Some apps offered by pharmacy chains are also free but may be tied to loyalty programs or data-sharing arrangements. Always review the privacy policy of any free app to understand how your prescription data may be used commercially.",
      },
      {
        type: "heading",
        text: "Related Guides",
      },
      {
        type: "list",
        items: [
          "What Is an eScript? A Plain-English Guide for Australian Patients \u2014 read the foundational explainer on how eScripts and tokens work.",
        ],
      },
    ],
  },
];

export default blogPosts;
