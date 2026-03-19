# OpenPharmacy Brand Reference Guide

This document is the single source of truth for all content written about OpenPharmacy. Read it before creating or editing any article, comparison page, or site copy.

---

## What OpenPharmacy Is

**OpenPharmacy** is a free, ADHA-conformant mobile eScript wallet for Australian patients. It stores electronic prescription (eScript) QR codes securely on-device, making them accessible at any Australian pharmacy without an internet connection.

Developed by **Easy As Health Pty Ltd**, based in Brisbane, Australia.

Available on **iOS** (App Store) and **Android** (Google Play). Free to download and use.

---

## How to Add a Script (Token Upload)

OpenPharmacy does **not** use a camera to scan QR codes for importing tokens. The correct token addition methods are:

1. **Tap the SMS link** - When a prescriber sends an eScript token via SMS, the patient taps the link. With OpenPharmacy installed and an account created, the app opens directly to the Add Token screen, pre-populated and ready to save.
2. **Manual token paste** - The patient copies the token (alphanumeric code) and pastes it manually into the app's Add Token field.

**Never describe token addition as "scan with camera" or "scan the QR code" for importing into OpenPharmacy.** The camera is not used to add scripts. The QR code the pharmacist scans is the one displayed by the app at dispensing time, which is a separate step.

---

## Key Features and How to Describe Them

### Offline Access
OpenPharmacy stores prescription QR codes directly on-device using ASD-approved end-to-end encryption. Once a script is saved, no internet connection is needed to display it, including in full airplane mode. This is the only moment internet access is required: when the script is first added.

**Correct phrasing:** "works completely offline", "QR codes are stored on-device", "accessible with no internet connection"
**Avoid:** "syncs for offline use", "caches for offline use" (these describe Scripty's ASL model, not OpenPharmacy)

### ADHA Conformance
OpenPharmacy is registered on the Australian Digital Health Agency (ADHA) ePrescribing Conformance Register. This means it has passed a formal assessment confirming it meets national standards for accessing and handling electronic prescription data.

**Correct phrasing:** "ADHA-conformant", "registered on the ADHA ePrescribing Conformance Register", "listed on the ADHA Conformance Register"
**Avoid:** "ADHA certified", "ADHA approved" (not the correct terminology)

### Security
- End-to-end encryption approved by the **Australian Signals Directorate (ASD)**
- Mandatory **4-digit PIN** required every time the app opens (not optional)
- All data stored on **Australian servers**
- No data shared with third parties

### Family Management
OpenPharmacy allows one account to hold scripts for multiple people. Scripts are automatically grouped and sorted by individual, so a parent or carer can manage prescriptions for children, elderly parents, or other family members in one place.

### Pharmacy Independence
OpenPharmacy is not tied to any pharmacy chain or network. Scripts can be presented at any Australian pharmacy that accepts eScripts. No activation code from a pharmacy is required to get started.

---

## What OpenPharmacy Does NOT Have

Be accurate. Do not claim features the app does not have.

- **No ASL (Active Script List) auto-sync** - Scripts must be added manually via SMS link tap or manual token paste. The app does not automatically pull new prescriptions from the ASL. (The automatic/ASL tab on the How It Works page describes the separate ASL linking feature, which is a distinct opt-in workflow.)
- **No QR code camera scanning for import** - The camera is not used to import tokens into the wallet.
- **No medicine shortage alerts** - This is a Scripty feature, not an OpenPharmacy feature.
- **No prescription ordering** - OpenPharmacy does not support ordering or delivery workflows.
- **No mandatory biometric lock** - The app uses a mandatory 4-digit PIN. Biometric authentication is not the described lock mechanism.

---

## Scripty: How to Write About a Competitor

Scripty is a direct competitor and fellow independent Australian eScript wallet. It is also ADHA-conformant.

**Rules for writing about Scripty:**

1. **Do not compare Scripty negatively.** Scripty is a legitimate product with real advantages. Present differences factually and fairly.
2. **Do not claim OpenPharmacy has features Scripty lacks when the reverse is true.** Scripty has ASL auto-sync, medicine shortage alerts, and prescription ordering (pilot). These are genuine advantages.
3. **The correct framing is philosophical difference, not superiority:** OpenPharmacy prioritises on-device storage and privacy independence; Scripty prioritises ASL auto-sync convenience. Different users will prefer each.
4. **Scripty also works offline** - after the initial ASL sync. Do not claim OpenPharmacy is the only offline eScript option.
5. **Do not mention that OpenPharmacy has QR code scanning as a differentiator** - OpenPharmacy does not have this feature.

**What is genuinely different about OpenPharmacy vs Scripty:**
- OpenPharmacy requires no ASL connection and no pharmacy visit to set up; Scripty requires a pharmacy visit and 100 points of ID for ASL registration
- OpenPharmacy enforces a mandatory PIN; Scripty's lock is optional
- OpenPharmacy stores scripts without connecting to the national ASL network, which appeals to users who prefer to keep their prescription history off shared networks
- OpenPharmacy works fully offline from the moment a script is first added; Scripty requires connectivity for ASL sync when adding new scripts

---

## Writing Rules

### No Em-dashes
**Never use em-dashes (—) in any content.** This applies to page titles, meta descriptions, body copy, link text, and schema strings. Use these alternatives:

- **Colon (:)** for introducing a clause or list ("OpenPharmacy: Secure Australian eScript Wallet")
- **Comma (,)** for parenthetical asides ("works offline, even in rural Australia")
- **Semicolon (;)** for closely related independent clauses
- **Parentheses ()** for supplementary information
- **Separate sentence** when the clause is long enough to stand alone

### Internal Linking
Every article should link to relevant pages. Use the links below and add them naturally:

| Page | URL |
|------|-----|
| Homepage | `/` |
| How It Works | `/how-it-works` |
| FAQ | `/faq` |
| Blog index | `/blog` |
| What is an eScript wallet? | `/blog/what-is-an-escript-wallet-australia` |
| What is ADHA conformance? | `/blog/what-is-adha-conformance-australia` |
| Best eScript apps (2026) | `/blog/best-escript-apps-australia-2026` |
| Offline eScript access | `/blog/offline-escript-access-australia` |
| Managing family eScripts | `/blog/managing-family-escripts-australia-carers-parents` |
| Deleted eScript SMS | `/blog/deleted-escript-sms-what-to-do-australia` |
| eScript security guide | `/blog/escript-app-security-privacy-guide-australia` |
| How to track eScript repeats | `/blog/how-to-track-escript-repeats-australia` |
| How to share eScript with carer | `/blog/how-to-share-escript-with-carer-australia` |
| Pharmacy app vs independent wallet | `/blog/pharmacy-app-vs-independent-escript-wallet-australia` |
| Active Script List vs eScript wallet | `/blog/active-script-list-vs-escript-wallet-australia` |
| Health app data privacy laws | `/blog/health-app-data-privacy-laws-australia` |
| ADHD eScript management | `/blog/adhd-escript-management-australia` |
| ADHD medication management (parents) | `/blog/adhd-medication-management-parents-australia` |
| Managing chronic illness eScripts | `/blog/managing-chronic-illness-escripts-australia` |
| OpenPharmacy vs Scripty | `/compare/openpharmacy-vs-scripty` |
| OpenPharmacy vs MedAdvisor | `/compare/openpharmacy-vs-medadvisor` |

### App Store URLs
Use these exact URLs. Do not construct from memory.

- **iOS App Store:** `https://apps.apple.com/au/app/openpharmacy/id6751562406`
- **Google Play:** `https://play.google.com/store/apps/details?id=com.openpharmacy.production&hl=en_AU`

### External Authority Sources
Use these when citing official sources:

- **ADHA ePrescribing:** `https://www.digitalhealth.gov.au/initiatives-and-programs/electronic-prescriptions`
- **ADHA Conformance Register:** `https://www.digitalhealth.gov.au/initiatives-and-programs/electronic-prescriptions/conformance`
- **Australian Signals Directorate:** `https://www.asd.gov.au`
- **OAIC Australian Privacy Principles:** `https://www.oaic.gov.au/privacy/australian-privacy-principles`
- **Privacy Act 1988:** `https://www.legislation.gov.au/Details/C2014C00076`

---

## Terminology

Use these terms consistently across all content. Inconsistent terminology confuses AI models and readers.

| Preferred | Avoid |
|-----------|-------|
| eScript wallet | prescription management app, digital wallet |
| eScript token | prescription token, script token |
| eScript | e-prescription, electronic prescription (use the full term sparingly, on first mention only) |
| ADHA-conformant | ADHA compliant, ADHA certified, ADHA approved |
| ASD-approved encryption | military-grade encryption, ASD encryption |
| on-device storage | local storage, device storage (on-device is preferred) |
| Active Script List (ASL) | My Script List, MySL (acceptable on first mention with clarification) |
| 4-digit PIN | passcode, password, PIN code |
| Australian pharmacy | chemist, dispensing pharmacy (both acceptable, but Australian pharmacy is preferred) |
| QR code | barcode, script code |
| tap the SMS link | click the link, open the link (tap is mobile-appropriate) |
| Add Token screen | add script screen, token entry screen |

---

## Brand Voice

- **Clear and confident.** OpenPharmacy is a trusted, ADHA-registered product. Write with authority, not with hedges or qualifications.
- **Plain language.** Avoid jargon. "Works offline" is clearer than "enables asynchronous local rendering of prescription QR codes."
- **Outcomes-first.** Lead with what the app does for the patient, not with technical features.
- **Honest and fair.** Acknowledge where competitors have genuine advantages. Credibility comes from honesty.
- **No superlatives without evidence.** "Most secure" or "best offline" without data is less credible than specific claims: "ASD-approved encryption" or "works in full airplane mode."

---

## Company Information

- **App name:** OpenPharmacy
- **Company:** Easy As Health Pty Ltd
- **Location:** Brisbane, Australia
- **Contact:** hello@openpharmacy.com
- **Registration:** Registered on the ADHA ePrescribing Conformance Register
- **Data jurisdiction:** All data stored on Australian servers

---

*Last updated: March 2026. Review and update this document whenever app features change.*
