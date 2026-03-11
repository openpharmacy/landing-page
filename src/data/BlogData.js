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
        text: "An electronic prescription — commonly called an eScript — is a digital version of a traditional paper prescription issued by an Australian doctor, dentist, or other authorised prescriber. Instead of handing you a printed form, your prescriber sends a unique token link to your mobile or email. That token is all you need to collect your medication from any pharmacy in Australia.",
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
        text: "Because the token points to a centralised, government-connected system, there is no risk of duplicate dispensing. The prescription lives in a secure national database — your token is simply the key to access it.",
      },
      {
        type: "heading",
        text: "How Are eScripts Sent to Patients?",
      },
      {
        type: "paragraph",
        text: "Your prescriber will ask for your preferred delivery method — usually SMS or email. You will receive a message containing a link. Tapping that link on a device with an eScript wallet app installed (such as OpenPharmacy) adds the prescription directly to your app. If you tap it without a compatible app installed, you will be directed to download one or view a web-based token.",
      },
      {
        type: "list",
        items: [
          "SMS: A short text with a link arrives seconds after your appointment.",
          "Email: A message with the token link is sent to your registered address.",
          "Paper token: Some prescribers print a QR code — this is still a valid eScript token, not a paper prescription.",
          "Active Script List (ASL): If you are registered, scripts can sync automatically to your wallet app without any manual action.",
        ],
      },
      {
        type: "heading",
        text: "What Is the Active Script List (ASL)?",
      },
      {
        type: "paragraph",
        text: "The Active Script List (also called My Script List or MySL) is a secure, government-supported digital record of all your active eScripts and repeats. It is overseen by the Australian Digital Health Agency (ADHA) and managed by MySL.com.au. When you register for ASL at a pharmacy, your prescriptions sync automatically to any connected app — no need to tap individual token links. OpenPharmacy connects to ASL so your scripts appear in the app as soon as your doctor prescribes them.",
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
          ["Loss risk", "High — physical item", "Low — token is resendable"],
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
        text: "Technically yes — if you delete the SMS or email before saving the token, it can be inconvenient to recover. Your prescriber or pharmacist can look up the token on the National Prescription Delivery Service, but this adds a step. The easiest way to avoid this is to store all tokens in a dedicated eScript wallet app as soon as you receive them. That way, the prescription is saved independently of your messages app.",
      },
      {
        type: "callout",
        text: "OpenPharmacy stores your eScript tokens in an encrypted wallet on your device — accessible even without an internet connection. If you lose your phone, your prescriptions can be recovered via your account.",
      },
      {
        type: "heading",
        text: "How Do Repeat Prescriptions Work with eScripts?",
      },
      {
        type: "paragraph",
        text: "Each repeat is a separate token. After your pharmacist dispenses your first supply, a new token for the next repeat is sent to you by SMS or email. You then add that token to your eScript wallet to access the next supply. If you are linked to ASL, this process is automatic — new repeat tokens appear in your OpenPharmacy app without any manual steps.",
      },
      {
        type: "ordered_list",
        items: [
          "Doctor prescribes medication — you receive token via SMS or email.",
          "Tap the link to add the token to your OpenPharmacy wallet.",
          "Visit any pharmacy and show the QR code from the app.",
          "Pharmacist dispenses your medication — the token is marked as used.",
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
        text: "Yes. All Australian pharmacies are required to accept electronic prescriptions as part of the national eScribing rollout mandated by the Department of Health and Aged Care. You are not locked to a specific pharmacy chain — you can fill an eScript at any pharmacy you choose, just as you could with a paper prescription.",
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
        text: "Managing a handful of scripts via SMS links is manageable. Managing prescriptions for a whole family — or dealing with multiple chronic medications — quickly becomes chaotic. Tokens expire, SMS inboxes get cluttered, and repeat notifications get missed. A dedicated eScript wallet solves this by giving you one organised place for every active and archived prescription.",
      },
      {
        type: "list",
        items: [
          "Add scripts immediately when the token arrives — do not leave them in your SMS inbox.",
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
        text: "If you use an eScript wallet app with cloud backup (like OpenPharmacy, which syncs to your account), reinstalling the app and signing in will restore all your saved prescriptions. If you stored tokens only in your SMS inbox and lose the phone, contact your prescriber or pharmacist — they can look up the prescription using your Medicare details.",
      },
      {
        type: "heading",
        text: "Do eScripts expire?",
      },
      {
        type: "paragraph",
        text: "Yes. Prescriptions have the same validity periods as paper scripts — typically 12 months from the issue date for most medications, and shorter periods for Schedule 8 controlled medications. The token itself does not add or remove expiry; it simply reflects the underlying prescription's validity as set by your prescriber.",
      },
    ],
  },
];

export default blogPosts;
