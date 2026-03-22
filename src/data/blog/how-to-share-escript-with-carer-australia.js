/**
 * Content data for:
 * How to Share Your eScript Securely with a Carer or Family Member in Australia
 * URL: /blog/how-to-share-escript-with-carer-australia
 */

const post = {
  intro: `In Australia, you can securely share an eScript with a carer or family member by forwarding the eScript token link directly; the carer presents it at the pharmacy just as you would. For ongoing or repeated scripts, a better approach is using an app like OpenPharmacy, which lets a carer add the patient's eScript token to their own wallet. The app automatically organises scripts by patient name, so each person's medications are clearly separated, with QR codes stored on the device, encrypted, and accessible offline.`,

  twoApproaches: {
    heading: "Two approaches to sharing an eScript with a carer",
    intro: `Whether you are a patient delegating a one-off pharmacy collection or a carer managing ongoing medications, the right approach depends on what you actually need.`,
    approaches: [
      {
        label: "Direct token sharing: for one-off collections",
        detail: `Each Australian eScript arrives as a unique token link, via SMS or email. You can forward that link to your carer exactly as you received it. The carer opens the link on their phone and the QR code appears. They present it at any Australian pharmacy, the pharmacist scans it, and the script is dispensed. That token is then used and archived. This approach requires no app on either end, and it is perfectly legitimate. The carer does not need to be the named patient; they just need to be present with the QR code at the time of dispensing. It works best for a single, straightforward collection: one script, collected once.`,
      },
      {
        label: "App-based family management: for ongoing care",
        detail: `If a carer regularly manages someone's prescriptions (for a child on an ongoing medication, an elderly parent with chronic conditions, or a partner), the token-forwarding approach quickly becomes unwieldy. Every new script or repeat means another forwarded message. OpenPharmacy solves this by letting the carer add the patient's eScript token directly to their own OpenPharmacy wallet. The app automatically organises scripts by patient name, so each person's medications are clearly separated and easy to find. The QR code is stored on the carer's device, encrypted, and accessible offline. At the pharmacy, the carer opens the app, finds the right person's scripts, and presents the QR code directly. No forwarding required for each visit.`,
      },
    ],
  },

  securityRisks: {
    heading: "The security risks of common shortcut methods",
    intro: `When time is short, it is tempting to share a prescription QR code the quickest way available. The three most common shortcuts each carry risks that are easy to overlook.`,
    risks: [
      {
        label: "Screenshots",
        detail: `Taking a screenshot of the QR code feels like a reliable backup. The problem is that the screenshot is a live, valid QR code that can be used by anyone who sees it, not just the intended carer. Screenshots are stored in your camera roll without any health-data access control. On most phones, photo backup services such as iCloud or Google Photos upload the camera roll automatically, storing your prescription QR code on overseas servers outside Australian jurisdiction. Any app with photo permissions on your phone can read the camera roll. And if the screenshot is shared, you have no visibility over where it ends up.`,
      },
      {
        label: "Forwarding via WhatsApp or social messaging",
        detail: `Messaging apps like WhatsApp, Facebook Messenger, and Instagram DMs are convenient but store data on overseas servers operated by US-based companies. Australian privacy law only governs data held within Australia. Sending prescription information through overseas messaging platforms means your health data is subject to the data laws of wherever those servers are located, including the US CLOUD Act, which allows US authorities to compel US cloud providers to produce data stored anywhere in the world. For many medications this may feel like an academic risk. For sensitive prescriptions, it is a real one.`,
      },
      {
        label: "Printing the QR code",
        detail: `A printed prescription is convenient until it is not. Paper can be lost, left behind, or picked up by the wrong person. Unlike a digital token that archives itself after dispensing, a paper copy can be presented multiple times or handed to someone other than the intended carer. There is also no record of where the paper ended up if the prescription is sensitive.`,
      },
    ],
    closing: `None of these shortcuts are catastrophic for every prescription. The risk calculation is different for an antibiotic than it is for an ADHD medication or an opioid analgesic. The key question is: does the sensitivity of this prescription warrant more care about who can access the QR code and where it is stored?`,
  },

  openPharmacyDetail: {
    heading: "How OpenPharmacy handles secure carer sharing",
    body: [
      `OpenPharmacy is an Australian eScript wallet developed by Easy As Health Pty Ltd, registered with the Australian Digital Health Agency (ADHA) and conformant with the national electronic prescribing standards. The app is free on iOS and Android.`,
      `For carer use, the workflow is practical and built into the app's core design. A carer adds the patient's eScript token directly to their own OpenPharmacy wallet. The app automatically organises scripts by patient name, keeping each person's medications clearly separated. The token is stored using end-to-end ASD-approved encryption on the carer's device. All data is held on Australian servers and is never shared with third parties.`,
      `At the pharmacy, the carer opens the app, finds the correct person's scripts by name, and displays the QR code. Because scripts are stored on the device rather than retrieved from a server, the QR code is fully accessible without an internet connection. There is no live server call at the pharmacy counter that could fail, slow down, or be logged.`,
      `The 4-digit PIN that protects the app secures all scripts within the wallet. If the carer's phone is lost or accessed by someone else, the prescription data for every family member in the wallet is protected by that PIN.`,
    ],
  },

  stepByStep: {
    heading: "Step-by-step: how to set up a carer's OpenPharmacy wallet for a family member",
    intro: `This takes about two minutes to set up. After that, each new script takes seconds to add.`,
    steps: [
      {
        number: 1,
        name: "Download OpenPharmacy",
        description:
          "The carer downloads OpenPharmacy free from the App Store (iOS) or Google Play (Android). No pharmacy activation code is required: create an account directly in the app.",
      },
      {
        number: 2,
        name: "Receive the eScript token",
        description:
          "The patient's GP issues the eScript via the national electronic prescribing system. The token arrives by SMS or email — to the patient's phone, or directly to the carer's phone if the carer's contact details are registered with the GP.",
      },
      {
        number: 3,
        name: "Open OpenPharmacy and find the family member's scripts",
        description:
          "In the app, find the correct person's scripts. OpenPharmacy automatically groups and sorts scripts by patient name, so each person's medications are clearly separated and easy to locate.",
      },
      {
        number: 4,
        name: "Add the token",
        description:
          "Tap to add the eScript token. If the carer received the SMS directly, tapping the link opens OpenPharmacy with the token pre-populated and ready to save. If the patient forwarded the token, the carer copies the token link and adds it manually. The script is now stored on the device, encrypted, and accessible offline.",
      },
      {
        number: 5,
        name: "Present the QR code at any pharmacy",
        description:
          "At the pharmacy, the carer opens the app, finds the family member's scripts by name, and displays their QR code. The pharmacist scans it directly from the screen. No internet connection is needed at this step.",
      },
    ],
    closing:
      "Going forward, add each new token as it arrives. After each dispense, the script is automatically archived and any repeat token issued by the pharmacy appears as a new active script.",
  },

  directTokenWhen: {
    heading: "When direct token forwarding is the right choice",
    body: [
      `Not every situation calls for an app. If a family member is collecting a prescription on your behalf once, forwarding the token directly is perfectly reasonable. Here is how to do it cleanly.`,
      `Forward the eScript token link — via SMS to the carer's phone — as soon as you receive it. Confirm the carer has received it before they leave for the pharmacy. Remind them that each token can only be used once per dispense: if the pharmacist scans it and the script is dispensed, the token is consumed. If the carer's phone runs out of battery or the message is accidentally deleted, the backup is the Active Script List (ASL) at the pharmacy — if you or your GP has enrolled in ASL, the pharmacist can retrieve the script from the national registry directly.`,
      `One important practical note: an eScript token can only be presented at one pharmacy per dispense. If the carer has the token on their phone, you should not also try to fill it at a different pharmacy at the same time. The first dispense consumes the token.`,
    ],
  },

  privacyNote: {
    heading: "A note on privacy before you forward a token",
    body: [
      `When you forward an eScript token to someone, you are granting them the practical ability to present that prescription at any Australian pharmacy. The token does not check identity — the person who presents the QR code is the person who receives the medication.`,
      `For most prescriptions, this is straightforward: you trust the carer, the medication is routine, and the risk is minimal. For prescriptions with higher sensitivity, the question is worth a moment's thought. Consider whether the medication is one you would be comfortable having on someone else's phone, backed up to their cloud, or visible to others who use their device.`,
      `Adding scripts to OpenPharmacy avoids this issue entirely: the carer's wallet is PIN-protected, encrypted, and the script is not forwarded to any external messaging platform. The app automatically organises scripts by patient name within the wallet, so each person's medications stay clearly separated. The data stays within a purpose-built, ADHA-conformant app.`,
    ],
  },

  faq: [
    {
      question: "Can a carer use my eScript on my behalf in Australia?",
      answer:
        "Yes. Australian pharmacy dispensing does not require the patient to be present. A carer, family member, or nominated representative can present an eScript token at any Australian pharmacy and collect the medication on the patient's behalf. The token is what authorises the dispense, not the identity of the person presenting it. There is no formal registration or paperwork required for a carer to collect a script for someone else — they simply present the QR code.",
    },
    {
      question: "Is it safe to screenshot an eScript QR code?",
      answer:
        "It works, but it is not the most secure approach. A screenshot of an eScript QR code is a live, valid token: anyone who sees it can present it at a pharmacy. Screenshots are stored in your camera roll without health-data access controls, are often automatically backed up to cloud photo services on overseas servers, and can be accessed by apps with photo permissions on your phone. For routine medications, the practical risk is low. For sensitive prescriptions, using a purpose-built encrypted eScript wallet like OpenPharmacy is a meaningfully more secure approach, because the QR code is stored on-device with ASD-approved encryption and protected by a PIN.",
    },
    {
      question: "What happens to an eScript token after it has been dispensed?",
      answer:
        "Once an eScript is dispensed at a pharmacy, the token is consumed and archived. It cannot be used again at another pharmacy for the same dispense. If the prescription has repeats authorised, the pharmacy's dispensing system generates a new token for the next repeat at the time of dispensing — this new token is sent to the patient via SMS or email (or directly to their carer's contact details, if those are registered with the GP). In OpenPharmacy, dispensed scripts move to the archived section automatically, and the new token can be added to the wallet for the next fill.",
    },
    {
      question: "Can I see in OpenPharmacy whether a script has been used?",
      answer:
        "Yes. OpenPharmacy shows active and archived scripts separately within the wallet, organised by patient name. Once a script is dispensed and the token is consumed, it moves to the archived section and is no longer displayed as active. You can also see the repeats remaining on each active script, so you can tell at a glance whether a medication still has authorised repeats available or whether a new prescription is needed from the GP.",
    },
  ],
};

export default post;
