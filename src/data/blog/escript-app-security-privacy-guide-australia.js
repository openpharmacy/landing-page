/**
 * Content data for:
 * How to Keep Your eScripts Secure: A Privacy Guide for Australian Patients
 * URL: /blog/escript-app-security-privacy-guide-australia
 */

const post = {
  intro: `To verify an eScript app is secure, check three things: (1) Is it listed on the ADHA ePrescribing Conformance Register? (2) Does it store data on Australian servers, not overseas? (3) Does its privacy policy explicitly state it does not share health data with third parties? OpenPharmacy meets all three criteria.`,

  whyItMatters: {
    heading: "Why eScript security matters",
    body: [
      `Your prescriptions are not just administrative records. They are a detailed window into your health. A prescription history can reveal mental health treatment, HIV status, addiction treatment, chronic conditions, hormone therapy, and other health information that you would not share with anyone who did not need to know.`,
      `Unlike financial data, health information cannot be changed if it is compromised. If a credit card number is leaked, the card is cancelled. If your prescription history is exposed, that information exists permanently. It can affect insurance applications, employment decisions, and personal relationships for years.`,
      `The Office of the Australian Information Commissioner (OAIC) classifies health information as sensitive information under the Privacy Act 1988, which means it receives stricter legal protection than general personal data. Australian organisations handling your health information are required by the Australian Privacy Principles (APPs) to protect it from misuse, interference, loss, and unauthorised access. But that legal obligation only matters if the app you are using actually meets those requirements.`,
    ],
  },

  smsEmailProblem: {
    heading: "The problem with storing eScripts in SMS and email",
    body: [
      `Most Australians still receive their eScript tokens via SMS or email. Keeping them there feels convenient, but it is one of the least secure ways to store health data.`,
    ],
    problems: [
      {
        label: "SMS is not end-to-end encrypted",
        detail:
          "Standard SMS messages are not encrypted end-to-end on all Australian carriers. They can be intercepted at the carrier level, stored on carrier servers, and are accessible to anyone with physical access to an unlocked phone. Some messaging apps encrypt SMS, but the eScript token itself still arrives via an unencrypted channel.",
      },
      {
        label: "Email providers scan content",
        detail:
          "Major email services scan message content for spam, advertising targeting, and other purposes. Your eScript token sitting in an inbox is readable by the platform hosting that inbox. That is not the same as the platform actively misusing health data, but it is a meaningful difference from data that is encrypted on your device.",
      },
      {
        label: "Both are accessible if your phone is lost",
        detail:
          "If your phone does not have a PIN or biometric lock, anyone who picks it up can open your messages and emails. SMS and email applications have no additional authentication layer beyond the device lock. A dedicated eScript app with its own PIN adds a second layer of access control.",
      },
      {
        label: "Screenshots have no access control",
        detail:
          "Many patients photograph their QR codes or take screenshots of tokens. Screenshots are stored unprotected in the camera roll, backed up to cloud photo services without health-data encryption, and shareable by any app with photo permissions. There is no way to restrict access to a screenshot once it exists.",
      },
    ],
    closing: `None of this means you are in immediate danger if your eScript is sitting in an SMS inbox. The practical risk for most people is low. But for sensitive medications, for patients managing chronic or stigmatised conditions, and for anyone who cares about their medical privacy, using a purpose-built, encrypted app is the appropriate standard.`,
  },

  whatToLookFor: {
    heading: "What to look for in a secure eScript app",
    intro: `When evaluating any eScript app, these are the criteria that separate a genuinely secure product from one that simply looks like one. Each item has a practical reason behind it.`,
    checklist: [
      {
        label: "ADHA conformance (government-verified security standard)",
        detail:
          "The Australian Digital Health Agency (ADHA) formally assesses apps that handle electronic prescriptions and lists conformant products on the ePrescribing Conformance Register at digitalhealth.gov.au. This is external verification, not self-certification. An app can claim to 'meet Australian standards' without being on this register. The register is the only reliable check.",
      },
      {
        label: "End-to-end encryption",
        detail:
          "End-to-end encryption means your data is encrypted on your device and can only be decrypted by your device. It is not readable by the app's servers, the developer, or any third party during transmission. Look for an explicit statement of this in the app's privacy policy or technical documentation.",
      },
      {
        label: "ASD-approved encryption",
        detail:
          "ASD-approved encryption means the specific cryptographic algorithms used have been assessed and approved by the Australian Signals Directorate (ASD), the national cybersecurity authority. This is a higher bar than simply using 'industry-standard encryption', which can mean almost anything. ASD-approved algorithms are the benchmark for protecting sensitive government and defence data in Australia.",
      },
      {
        label: "Australian data storage",
        detail:
          "Your data must be stored on servers physically located in Australia. Australian servers are subject to Australian privacy law and cannot be accessed by foreign governments under overseas subpoena powers. Offshore data storage, particularly on US servers, means your health data can be subject to laws like the US CLOUD Act.",
      },
      {
        label: "No third-party data sharing (explicitly stated)",
        detail:
          "The privacy policy should explicitly state that prescription data is never shared with third parties. 'We may share data with trusted partners' is not the same as a clear prohibition. Look for an unambiguous statement that health data is not shared for any commercial, advertising, or analytics purpose.",
      },
      {
        label: "PIN or biometric lock",
        detail:
          "The app should have its own authentication layer, independent of your device lock. A 4-digit PIN or biometric requirement means your prescriptions cannot be accessed even if someone unlocks your phone via another method.",
      },
      {
        label: "Independent of any pharmacy chain",
        detail:
          "Apps owned by pharmacy chains have a commercial relationship with where you fill your prescriptions. That creates an incentive to share your prescription data, routing you to specific pharmacies, or using your medication history for targeted promotions. An independent app has no commercial reason to share your prescription information.",
      },
    ],
  },

  australianDataStorage: {
    heading: "What 'Australian data storage' actually means",
    body: [
      `'Australian data storage' means your health data is held on servers physically located within Australia's borders, operated under Australian jurisdiction.`,
      `This matters because data stored in Australia is governed by the Privacy Act 1988 and the Australian Privacy Principles (APPs). Australian Privacy Principle 11 specifically requires organisations to take reasonable steps to protect health information from misuse, interference, loss, and unauthorised access. A foreign government cannot compel an Australian server operator to hand over your data without going through Australian legal process.`,
      `By contrast, data stored on US servers is subject to the US CLOUD Act (Clarifying Lawful Overseas Use of Data Act), which allows US authorities to compel US-based cloud providers to hand over data stored anywhere in the world, including servers physically located outside the US. If your health data is stored by an app using US-based cloud infrastructure, it can be subject to US law regardless of where you live.`,
      `For prescription data specifically, the ADHA's electronic prescribing framework requires conformant apps to handle data in accordance with Australian law. Storing data offshore while claiming conformance is not possible for registered apps.`,
      `If you are unsure whether an app stores data in Australia, check its privacy policy for explicit language like 'data is stored on servers located in Australia'. If the policy says 'data may be transferred to overseas servers' or does not specify a location, the answer to your question is no.`,
    ],
  },

  encryptionExplained: {
    heading: "Understanding encryption in health apps",
    body: [
      `Encryption is not a single standard. 'We use encryption' tells you almost nothing. The meaningful questions are: what kind of encryption, approved by whom, and where is your data decryptable?`,
    ],
    concepts: [
      {
        label: "End-to-end encryption",
        detail:
          "End-to-end encryption (E2EE) means your data is encrypted on your device before it leaves, and it remains encrypted until it arrives on another device you authorised. No one in between, including the app developer and the server, can read it. This is the gold standard for sensitive data. Without E2EE, a server breach could expose your prescription history in readable form.",
      },
      {
        label: "ASD-approved encryption",
        detail:
          "The Australian Signals Directorate (ASD) is Australia's national cybersecurity authority. ASD-approved encryption algorithms are those assessed by the ASD as meeting the requirements for protecting sensitive government and defence data. For health apps, using ASD-approved algorithms means the cryptographic standard protecting your prescriptions is the same one used for classified government systems. It is a public, verifiable benchmark, not a marketing claim.",
      },
      {
        label: "Encryption at rest vs. in transit",
        detail:
          "Some apps encrypt data only while it is moving between your device and a server (in transit), but store it unencrypted on the server (at rest). True security requires both. A reputable eScript app should explicitly state that data is encrypted both in transit and at rest on Australian servers.",
      },
    ],
    closing: `When evaluating an app, look for all three elements: end-to-end encryption, ASD-approved algorithms, and encryption at rest on Australian servers. An app that ticks all three has a meaningfully stronger security position than one that only mentions 'SSL encryption' or 'industry-standard security'.`,
  },

  openPharmacySection: {
    heading: "How OpenPharmacy approaches security",
    body: [
      `OpenPharmacy is developed by Easy As Health Pty Ltd, a Brisbane-based company. The app is registered on the ADHA ePrescribing Conformance Register, meaning it has completed the formal assessment process conducted by the Australian Digital Health Agency for handling Australian electronic prescriptions.`,
      `On encryption, OpenPharmacy uses end-to-end ASD-approved encryption. All prescription data is encrypted on your device using algorithms approved by the Australian Signals Directorate, the same standard applied to sensitive government and defence systems. Data is stored on servers physically located in Australia and is never shared with third parties.`,
      `The app uses a 4-digit PIN as an access layer independent of your device lock. Your prescriptions cannot be accessed even if your phone is unlocked by another method.`,
      `OpenPharmacy is independent of any pharmacy chain. Easy As Health Pty Ltd has no commercial relationship with any pharmacy group. The app works at any pharmacy in Australia that accepts electronic prescriptions, with no routing, no referral incentive, and no commercial reason to share your prescription data with a pharmacy before you walk in.`,
      `One design choice worth noting specifically from a security perspective: eScript QR codes are stored directly on your device rather than retrieved from a server at the point of dispensing. This means your QR code is accessible without an internet connection, and it also means there is no live server call at the pharmacy that could be logged, intercepted, or delayed.`,
    ],
  },

  downloadChecklist: {
    heading: "Questions to ask before downloading any health app",
    intro: `Use this checklist before trusting any Australian health app with your prescription data.`,
    items: [
      {
        question: "Is the app on the ADHA ePrescribing Conformance Register?",
        action: "Check digitalhealth.gov.au directly. Do not rely on the app's own description.",
      },
      {
        question: "Where is your data stored?",
        action:
          "Look for an explicit statement in the privacy policy: 'data is stored on servers located in Australia'. Vague language or 'trusted third parties' is not a satisfactory answer.",
      },
      {
        question: "Does the privacy policy explicitly prohibit third-party data sharing?",
        action:
          "Read the data sharing section. 'We do not share health information with third parties' means something. 'We may share with trusted partners to improve services' means the opposite.",
      },
      {
        question: "Who owns the app?",
        action:
          "Search the developer name in the app store. If the app is owned by a pharmacy chain, ask how your prescription data is used commercially. An independent developer has no incentive to route your prescriptions.",
      },
      {
        question: "Does the app have its own PIN or biometric lock?",
        action:
          "A device lock is not enough. The app should require its own authentication every time it is opened.",
      },
      {
        question: "What encryption standard does the app use?",
        action:
          "Look for 'end-to-end encryption' and 'ASD-approved' in the app's documentation. Generic claims like 'bank-level security' are not verifiable.",
      },
      {
        question: "Does the app work offline?",
        action:
          "Offline access means your QR code is on your device, not retrieved from a server. This is both a usability advantage in areas without reception, and a security advantage: no live server call at the pharmacy counter.",
      },
    ],
  },

  faq: [
    {
      question: "Is it safe to store prescriptions on my phone?",
      answer:
        "Yes, if you use a dedicated eScript app that meets the right security standards. The key requirements are: the app is registered on the ADHA ePrescribing Conformance Register, it uses end-to-end ASD-approved encryption, it stores data on Australian servers, and it has its own PIN or biometric lock. Storing prescriptions in SMS or email is significantly less secure than using a purpose-built, conformant app. SMS is not end-to-end encrypted, email content is often scanned, and neither has a dedicated access control layer for your prescription data specifically.",
    },
    {
      question: "What does ASD-approved encryption mean?",
      answer:
        "ASD-approved encryption refers to cryptographic algorithms assessed and approved by the Australian Signals Directorate (ASD), the national cybersecurity authority within the Australian Cyber Security Centre. The ASD publishes an Information Security Manual that specifies which encryption algorithms meet Australian government security standards. When an app claims ASD-approved encryption, it means the specific cryptographic standard protecting your data has been verified against government benchmarks, not just described as 'industry standard'. This is the same level of encryption used to protect classified government and defence data in Australia.",
    },
    {
      question: "Do Australian health apps have to follow privacy laws?",
      answer:
        "Yes. The Privacy Act 1988 and the 13 Australian Privacy Principles (APPs) apply to all private sector health service providers in Australia, regardless of company size. Health information is classified as 'sensitive information' under the Act, which means it receives stricter protection than general personal data. Australian Privacy Principle 11 specifically requires organisations to take reasonable steps to protect health information from misuse, interference, loss, and unauthorised access. The Office of the Australian Information Commissioner (OAIC) enforces compliance and can investigate complaints about privacy breaches.",
    },
    {
      question: "How do I check where an app stores my data?",
      answer:
        "Start with the app's privacy policy. Look for a section on 'data storage' or 'data location' that explicitly states whether servers are in Australia. If the policy says 'data may be transferred to overseas servers', 'we use third-party cloud providers', or does not specify a location at all, the data may not be stored in Australia. For eScript apps specifically, you can also check the ADHA ePrescribing Conformance Register at digitalhealth.gov.au. Apps on that register have been assessed against Australian requirements, which include data handling obligations. An app that is not on the register has made no externally verified commitment to Australian data storage.",
    },
  ],
};

export default post;
