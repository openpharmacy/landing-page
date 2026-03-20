/**
 * Content data for:
 * How to Track Your eScript Repeats in Australia (Without Losing Track)
 * URL: /blog/how-to-track-escript-repeats-australia
 */

const post = {
  intro: `In Australia, each prescription repeat is a separate eScript token sent to your phone or email after each dispense. There is no single inbox that holds all of them. The best way to track remaining repeats is to save each token into a dedicated eScript wallet like OpenPharmacy as soon as it arrives: every saved script shows its repeat count at a glance, works offline, and stays in one organised place.`,

  howRepeatSystem: {
    heading: "How the Australian eScript repeat system actually works",
    body: [
      `When your doctor prescribes a medication with repeats, they do not hand you a single prescription that covers all of them. Instead, each repeat is an independent electronic prescription token. Your doctor sends you the first token immediately when they write the script. After you fill that at the pharmacy, the system releases the next token to you automatically, usually by SMS or email, directly from the dispensing software.`,
      `This means your stack of repeats is not stored in one place waiting for you. It is released one at a time, on the assumption that you will fill each repeat before the next one is due. If you have a medication with five repeats and you have filled it three times, you have two more tokens out there: one may have already arrived in your SMS inbox, and one will arrive after you fill the next dispense.`,
      `The actual prescription record lives in Australia's national electronic prescribing infrastructure, managed under the oversight of the Australian Digital Health Agency (ADHA). The SMS or email token you receive is simply the key that points to your record in that system. Deleting the message does not cancel the prescription, but it does mean you lose the key and need to recover it before your next pharmacy visit.`,
    ],
    repeatRules: {
      heading: "How many repeats can a prescription have?",
      body: `Under the Pharmaceutical Benefits Scheme (PBS), most standard medications can be prescribed with up to five repeats, giving you a total of six dispensings (original plus five repeats). Some medications, particularly Schedule 8 controlled substances such as ADHD stimulants and opioids, have stricter rules: they may have no repeats at all, or require a new paper or authority script each time. Check with your prescriber if you are unsure what repeat allowance applies to your specific medication.`,
    },
  },

  whySystemFails: {
    heading: "Why the default system makes it so easy to lose track",
    intro: `The token-by-token delivery model creates several predictable failure points. Most people hit at least one of them.`,
    points: [
      {
        label: "Your repeat tokens are buried in your SMS inbox",
        detail:
          "eScript tokens look like any other automated text message: a short line of text and a link. They arrive alongside bank alerts, delivery notifications, and promotional messages. After a few months of repeat prescriptions, your inbox fills with them. When you are standing at the pharmacy counter trying to find the current token for a specific medication, searching through dozens of similar-looking messages is stressful and time-consuming.",
      },
      {
        label: "You have no central view of remaining repeats",
        detail:
          "The basic eScript system has no patient-facing dashboard. There is no screen you can open that shows all your active prescriptions and how many repeats each one has left. The only way to find out is to ask your pharmacist, log into My Health Record via myGov, or count back through your dispensing history manually. Most people do not do any of these things regularly, which means they often discover they have run out of repeats at exactly the wrong moment.",
      },
      {
        label: "Tokens get deleted or lost before you need them",
        detail:
          "People bulk-delete SMS threads, apply filters, or accidentally swipe away the notification before saving the link. A repeat token that was safely in your inbox last week is gone the next time you look for it. Recovering it requires calling your prescriber's surgery or pharmacy for a re-send, which adds friction to what should be a straightforward visit.",
      },
      {
        label: "Scripts arrive across multiple channels",
        detail:
          "Not all prescribers use the same delivery method. Your GP may send tokens by SMS, while a specialist emails them. You end up with an active prescription spread across your messages app and your email inbox, requiring you to know which medication came from which channel before you can begin searching.",
      },
      {
        label: "You only discover the problem at the pharmacy counter",
        detail:
          "The moment people most commonly find out they have no repeats remaining is when they are already standing at the chemist. The pharmacist tells them, they realise they need a new script from their GP, and a straightforward errand becomes a multi-step problem requiring calls and possibly another trip. With any visibility into their repeat status beforehand, they could have contacted their prescriber in advance.",
      },
    ],
  },

  optionASL: {
    heading: "Option 1: Register for the Active Script List",
    body: [
      `The Active Script List (ASL) is the federal government's centralised solution to the token tracking problem. Rather than managing individual tokens, the ASL stores all of your active electronic prescriptions in a central registry. When you visit a participating pharmacy, the pharmacist can access your list with your consent and see all your active scripts and remaining repeats without you presenting a token at all.`,
      `To set up the ASL, you visit a participating pharmacy in person with 100 points of identification. The pharmacist registers you in the system. From that point, most new eScripts from ASL-compatible prescribers are added to your list automatically, unless you or your prescriber opt out.`,
      `The ASL works well for people who use a regular pharmacy, have a stable relationship with an ASL-compatible GP, and are comfortable with the broader data footprint that comes with a centralised registry. It removes token tracking almost entirely for the day-to-day case.`,
    ],
    limitations: {
      heading: "Where the ASL has limitations",
      points: [
        "Requires a pharmacy visit with 100 points of ID to activate. You cannot set it up from home.",
        "Relies on your prescriber's software supporting ASL. Not all GP and specialist software does yet.",
        "Requires an internet connection at the pharmacy to access your list in real time.",
        "Your prescriptions are accessible within the pharmacy network ecosystem, which some patients prefer to avoid for sensitive medications.",
        "Not all pharmacies are ASL-compatible yet, though coverage is expanding.",
      ],
    },
  },

  optionWallet: {
    heading: "Option 2: A dedicated eScript wallet like OpenPharmacy",
    body: [
      `An independent eScript wallet works differently from the ASL. Instead of a centralised registry accessed by pharmacies, it is an app on your phone that you control. Each time you receive an eScript token by SMS or email, you add it to the app. The app connects to the national eScript system, retrieves your prescription details, and stores the QR code securely on your device.`,
      `OpenPharmacy is registered with the Australian Digital Health Agency (ADHA) on the ePrescribing Conformance Register, meaning it meets national standards for handling electronic prescriptions. It uses end-to-end ASD-approved encryption and stores all data on Australian servers. No pharmacy has access to your scripts through the app: when you show a QR code at the counter, you are sharing that specific script in that moment only.`,
    ],
    features: [
      {
        label: "Remaining repeats visible for every script",
        detail:
          "OpenPharmacy displays the repeat count for each stored eScript. You can see at a glance how many repeats remain on every medication without asking your pharmacist. This makes it straightforward to know when to book your GP for a new script before you run out.",
      },
      {
        label: "Works completely offline",
        detail:
          "Once a script is saved, its QR code is stored directly on your device. You do not need mobile data or Wi-Fi to show it at the pharmacy. Rural pharmacies, hospital basements, areas with poor reception: the QR code is always available in the app, even in airplane mode.",
      },
      {
        label: "No pharmacy visit or ID check required to start",
        detail:
          "Download the app, set a 4-digit PIN, and start adding tokens immediately. You are not tied to any particular pharmacy, and switching chemists requires no re-registration.",
      },
      {
        label: "Manages scripts for the whole family",
        detail:
          "OpenPharmacy lets you add scripts for family members and keeps them organised separately. For parents or carers managing prescriptions for children or elderly parents, this removes the need to track separate inboxes across multiple phones.",
      },
    ],
  },

  howToAdd: {
    heading: "How to add scripts to OpenPharmacy and track your repeats",
    intro: `The process takes about 30 seconds per script. Here is how to do it:`,
    steps: [
      {
        number: 1,
        name: "Download OpenPharmacy",
        description:
          "Search 'OpenPharmacy' in the App Store or Google Play and download the free app. During setup, create a 4-digit PIN to protect your scripts if your phone is accessed by someone else.",
      },
      {
        number: 2,
        name: "Open the eScript SMS or email you received from your prescriber",
        description:
          "Find the most recent token for each of your active medications. If you have been receiving repeats for a while, search your SMS inbox for 'escript' or 'prescription' to surface them.",
      },
      {
        number: 3,
        name: "Tap 'Add Script' in OpenPharmacy and enter the token",
        description:
          "Either tap the link in your SMS directly to open it in OpenPharmacy, or copy the token code and paste it into the 'Add Script' field inside the app. The app retrieves your prescription details from the national system.",
      },
      {
        number: 4,
        name: "Review the script details and remaining repeat count",
        description:
          "Once added, OpenPharmacy shows you the medication name, dosage, and how many repeats remain. Confirm the details look correct. The QR code is now saved to your device.",
      },
      {
        number: 5,
        name: "Repeat for each new token as it arrives",
        description:
          "Each time a new repeat token arrives from the pharmacy after a dispense, add it to OpenPharmacy immediately. Do this before closing the SMS or email, and you will never need to search for a token at the pharmacy counter again.",
      },
    ],
    closing: `Once your scripts are saved, you can delete the original SMS safely. The QR code lives in the app, available offline. After each dispense, a new token for the next repeat arrives by SMS or email; add it to OpenPharmacy the same way and the updated count will be there. Your active scripts are visible on the home screen; archived scripts from completed courses stay accessible too.`,
  },

  practicalTips: {
    heading: "Practical tips for staying on top of your repeats",
    tips: [
      {
        label: "Add each new token immediately when it arrives",
        detail:
          "The moment a new repeat token lands in your SMS or email, add it to OpenPharmacy before you do anything else. This takes 30 seconds and eliminates the need to search for it later. Do not leave tokens sitting in your inbox as a 'temporary' measure: inboxes are not designed for safe storage of health documents.",
      },
      {
        label: "Check your repeat count before you head to the pharmacy",
        detail:
          "Open OpenPharmacy before your pharmacy visit. Confirm that the script you need has repeats remaining. If you are on the last repeat, plan to contact your GP for a new script soon so you are not left without medication while waiting for an appointment.",
      },
      {
        label: "Set a calendar reminder for your last repeat",
        detail:
          "For medications you take long-term, set a phone reminder when you fill your second-last repeat to book a GP appointment. Most GPs need at least a week's notice for a regular script review. If your medication requires specialist review or is a Schedule 8 controlled substance, allow more time.",
      },
      {
        label: "Do not rely on your SMS inbox as storage",
        detail:
          "SMS inboxes are not designed to store important health documents. Messages get deleted, phones get replaced, and SIM cards get swapped. An eScript token in your SMS is a temporary holding point, not a secure long-term record. Treat it that way and move each token to your wallet app promptly.",
      },
    ],
  },

  outOfRepeats: {
    heading: "What to do if you run out of repeats unexpectedly",
    body: [
      `If you arrive at the pharmacy and are told there are no repeats remaining on your script, you need a new prescription from your prescriber before you can fill the medication again. Call your GP's surgery as soon as possible and explain that you need a new script. Most practices can issue a new electronic prescription without a face-to-face appointment for stable, ongoing medications, though this depends on your prescriber and the medication type.`,
      `For Schedule 8 medications such as ADHD stimulants or opioid analgesics, a new script will typically require a consultation, and in some states may require a paper prescription or authority approval. Plan ahead for these medications well before your last repeat is due.`,
      `If you have lost the token for a repeat that still exists in the system, that is a different problem with a simpler solution: contact your prescriber's surgery to have the token re-sent, or ask your pharmacist to check the Active Script List if you are enrolled. For a full walkthrough of recovering a lost token, see our guide on what to do if you delete your eScript SMS.`,
    ],
  },

  faq: [
    {
      question: "How many repeats can a prescription have in Australia?",
      answer:
        "Most standard PBS medications can be prescribed with up to five repeats, giving you six total dispensings (original plus five repeats). Some medications have restrictions: Schedule 8 controlled substances, such as ADHD stimulants and strong opioids, may have no repeats or require special approval for each dispense. Your prescriber will tell you how many repeats apply to your specific medication when they issue the script.",
    },
    {
      question: "What happens when I run out of repeats?",
      answer:
        "When your last repeat has been dispensed, you need a new prescription from your prescriber to continue the medication. Contact your GP's surgery and request a new script. For stable, ongoing medications, many practices can issue a new electronic prescription without a consultation, though this varies. For controlled substances or medications requiring specialist review, allow extra time and plan ahead before your final repeat is filled.",
    },
    {
      question: "Can I see my repeats on the my health app?",
      answer:
        "You can view prescription and dispense records in My Health Record, which is accessible via the my health app or through myGov. This shows what has been dispensed and may indicate remaining repeats for electronic prescriptions. However, My Health Record is a broad health records platform rather than a purpose-built repeat tracker, and it requires an internet connection and myGov login every time you check. A dedicated eScript wallet like OpenPharmacy shows your repeat counts offline, immediately, without logging into a government portal.",
    },
    {
      question: "Does OpenPharmacy show remaining repeats for each script?",
      answer:
        "Yes. When you add an eScript token to OpenPharmacy, the app retrieves your prescription details from the national system, including the number of repeats remaining. This count is displayed on the script card inside the app. After each dispense, the pharmacy issues a new token for the next repeat via SMS or email; adding that token to OpenPharmacy shows the updated count. You can check how many repeats you have left on any medication at any time, without an internet connection, from the app's home screen.",
    },
    {
      question: "What is the Active Script List and how is it different from an eScript wallet?",
      answer:
        "The Active Script List (ASL) is a government-run centralised registry that stores your active electronic prescriptions so pharmacists can access them directly with your consent, without you needing to present a token. It requires setup at a pharmacy with 100 points of ID and relies on your prescriber's software supporting ASL. An eScript wallet like OpenPharmacy is an app you control: you add your own tokens, see your repeat counts, and show QR codes offline at any pharmacy. The ASL is convenient for regular pharmacy users; an eScript wallet is better for people who want offline access, privacy control, and visible repeat tracking on their own device.",
    },
  ],
};

export default post;
