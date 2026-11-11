/**
 * Content data for:
 * What Is ADHA Conformance? Why It Matters Before You Trust an App With Your Prescriptions
 * URL: /blog/what-is-adha-conformance-australia
 */

const post = {
  intro: `ADHA conformance means an app has been assessed and registered by the Australian Digital Health Agency (ADHA) as meeting the safety, security, and interoperability standards required to handle electronic prescriptions. For Australian patients, choosing an ADHA-conformant eScript app ensures your prescription data is handled securely and in compliance with national digital health standards. OpenPharmacy is listed on the ADHA ePrescribing Conformance Register.`,

  whatIsAdha: {
    heading: "What is the Australian Digital Health Agency?",
    body: [
      `The Australian Digital Health Agency (ADHA) is the government body responsible for Australia's national digital health infrastructure. Established in 2016 and headquartered in Sydney, the ADHA oversees the programs that make electronic health services work consistently and securely across the country.`,
      `The ADHA's mandate covers three core systems that affect almost every Australian who interacts with the healthcare system. First, My Health Record: the national digital health repository where clinical documents, pathology results, and medication records are stored. Second, electronic prescribing: the national infrastructure that allows doctors to issue prescriptions electronically instead of on paper, and pharmacies to dispense them without a physical script. Third, the Active Script List (ASL): a centralised, real-time record of a patient's current electronic prescriptions that participating pharmacies can access with the patient's consent.`,
      `For any software product to connect to these national systems, it must pass through the ADHA's conformance assessment process. This is not a self-certification or a checkbox process. It involves formal technical testing, security review, and registration on the ADHA's public conformance registers.`,
    ],
  },

  whatConformanceMeans: {
    heading: "What does ADHA conformance actually mean?",
    body: [
      `ADHA conformance is a formal assessment process with three distinct pillars: functional requirements, security requirements, and interoperability requirements. An app must satisfy all three to receive registration.`,
    ],
    pillars: [
      {
        label: "Functional requirements",
        detail:
          "The app must correctly handle eScript tokens according to the national electronic prescribing standard. This includes how tokens are imported, displayed, updated after dispensing, and archived. Incorrect handling of tokens could result in patients being unable to fill prescriptions or in tokens being misused.",
      },
      {
        label: "Security requirements",
        detail:
          "Apps must use encryption standards approved by the Australian Signals Directorate (ASD), the national cybersecurity authority within the Australian Cyber Security Centre. ASD-approved encryption is the benchmark for securing sensitive government and health data in Australia. All data must be stored and transmitted to a standard that protects against unauthorised access.",
      },
      {
        label: "Interoperability requirements",
        detail:
          "The app must communicate correctly with national systems including the National Prescription Delivery Service (NPDS) and the Active Script List. This ensures that when a pharmacist scans a QR code from a conformant app, the national system responds correctly and the dispensing record is accurate.",
      },
    ],
    closing: `Once an app meets all three requirements, it is listed on the ADHA ePrescribing Conformance Register, a publicly accessible register on digitalhealth.gov.au. This listing is the definitive proof that an app has been formally assessed, not just self-described as compliant.`,
  },

  whyItMatters: {
    heading: "Why ADHA conformance matters for patients",
    intro: `When you use an eScript app to store and present your prescriptions, you are trusting it with sensitive health information. Conformance gives you three concrete protections that unregistered apps cannot offer.`,
    reasons: [
      {
        label: "Your health data is protected to a government-verified standard",
        detail:
          "Conformant apps have had their security architecture independently assessed. The ASD-approved encryption requirement means your prescription data is protected using the same standards applied to government and defence systems. An app that claims to be 'secure' without ADHA registration has made no externally verified commitment to that standard.",
      },
      {
        label: "The app has been tested to correctly handle your prescriptions",
        detail:
          "Functional testing during the conformance process verifies that the app correctly reads, stores, and presents eScript tokens. A faulty or non-conformant implementation could result in tokens being corrupted, QR codes being unreadable at the pharmacy, or repeat counts being displayed incorrectly \u2014 meaning you might arrive at the pharmacy without a working script.",
      },
      {
        label: "Your prescription data cannot be legally shared with third parties",
        detail:
          "Conformant apps operate under the Australian Privacy Principles (APPs) and the specific privacy obligations of the national electronic prescribing framework. These rules prohibit sharing your prescription data with third parties for advertising, analytics, or commercial purposes. Apps that are not registered have made no formal commitment to this framework.",
      },
    ],
  },

  howToVerify: {
    heading: "How to verify an app is ADHA-conformant",
    intro: `The word 'compliant' appears frequently in app store listings. It means almost nothing on its own \u2014 any developer can write it. Conformance means registered. Here is how to check.`,
    steps: [
      {
        number: 1,
        name: "Check the ADHA ePrescribing Conformance Register",
        description:
          "Visit digitalhealth.gov.au and navigate to the registers section. The ePrescribing Conformance Register lists every app and software product that has completed the formal assessment. If an app is not on this list, it is not ADHA-conformant, regardless of what its marketing says.",
      },
      {
        number: 2,
        name: "Look for an explicit registration claim in the app listing",
        description:
          "A genuinely conformant app will name the specific register it appears on, not just say it 'meets Australian standards' or is 'ADHA-compliant'. The phrase to look for is 'registered on the ADHA ePrescribing Conformance Register'.",
      },
      {
        number: 3,
        name: "Check the app's privacy policy for Australian Privacy Principles",
        description:
          "Conformant apps must operate under the Australian Privacy Principles. The privacy policy should reference the APPs and clearly state that prescription data is stored in Australia and is not shared with third parties. A policy that does not mention the APPs or that allows data sharing for commercial purposes is a red flag.",
      },
    ],
    closingNote: `Important distinction: many apps claim to be 'ADHA-compliant' or to 'meet Australian digital health standards'. These phrases are not the same as ADHA conformance. Conformance requires completing the formal assessment and being listed on the register. Compliance is a self-assessment with no external verification.`,
  },

  openPharmacySection: {
    heading: "OpenPharmacy and ADHA conformance",
    body: [
      `OpenPharmacy is developed by Easy As Health Pty Ltd, a Brisbane-based digital health company. The app is registered on the ADHA ePrescribing Conformance Register, confirming it has completed the formal assessment for handling Australian electronic prescriptions.`,
      `On the security side, OpenPharmacy uses end-to-end ASD-approved encryption for all prescription data. ASD-approved encryption is the benchmark standard set by the Australian Signals Directorate for protecting sensitive government and health data. All data is stored on Australian servers and is never shared with third parties.`,
      `The app is built around a specific design principle: your prescription QR codes must always be available, including without an internet connection. Scripts are stored directly on your device so they are accessible in areas with no mobile signal \u2014 rural pharmacies, underground car parks, hospital basements \u2014 without any dependency on a server connection at the point of dispensing.`,
      `OpenPharmacy also makes it effortless to manage scripts for family members. Simply upload any eScript and the app automatically groups and sorts scripts by individual, so parents and carers can manage prescriptions for children and elderly parents within one account, all behind a 4-digit PIN.`,
    ],
  },

  checklistSection: {
    heading: "Questions to ask before downloading any health app",
    intro: `Use this checklist when evaluating any Australian eScript app. Every item on this list has a direct connection to whether your prescription data is genuinely protected.`,
    items: [
      {
        question: "Is it on the ADHA ePrescribing Conformance Register?",
        why: "Registration is the only externally verified proof that the app meets national standards. Check digitalhealth.gov.au directly rather than trusting the app's own description.",
      },
      {
        question: "Where is your data stored?",
        why: "Your prescription data should be stored on Australian servers subject to Australian privacy law. Offshore storage means different legal protections and may not comply with the Australian Privacy Principles.",
      },
      {
        question: "Is there a clear privacy policy?",
        why: "A conformant app's privacy policy should explicitly reference the Australian Privacy Principles and confirm that prescription data is not shared with third parties for any commercial purpose.",
      },
      {
        question: "Is the app independent of a pharmacy chain?",
        why: "Apps owned by pharmacy chains have a commercial relationship with where you fill your prescriptions. An independent app has no incentive to direct you to a specific pharmacy, and your script data is not used to influence where you shop.",
      },
      {
        question: "Does the app work offline?",
        why: "An app that requires a server connection to display your QR code can leave you unable to fill a prescription in areas with poor reception. Offline-first storage means the QR code is on your device, not retrieved from a remote server.",
      },
    ],
  },

  faq: [
    {
      question: "What is the ADHA ePrescribing Conformance Register?",
      answer:
        "The ADHA ePrescribing Conformance Register is a publicly accessible list maintained by the Australian Digital Health Agency at digitalhealth.gov.au. It records every software product that has completed the formal conformance assessment for handling Australian electronic prescriptions. This includes patient-facing eScript wallet apps, clinical prescribing software used by doctors, and dispensing software used by pharmacies. Appearing on the register confirms that the product has been independently assessed against the national electronic prescribing standard \u2014 it is not a self-certification.",
    },
    {
      question: "Is OpenPharmacy ADHA-conformant?",
      answer:
        "Yes. OpenPharmacy, developed by Easy As Health Pty Ltd in Brisbane, is registered on the ADHA ePrescribing Conformance Register. This means the app has been formally assessed by the Australian Digital Health Agency and meets the safety, security, and interoperability requirements for handling Australian electronic prescriptions.",
    },
    {
      question: "What encryption does OpenPharmacy use?",
      answer:
        "OpenPharmacy uses end-to-end ASD-approved encryption. ASD-approved encryption refers to cryptographic standards approved by the Australian Signals Directorate, the national cybersecurity authority within the Australian Cyber Security Centre. This is the same encryption benchmark used to protect sensitive government and defence data in Australia. All data is stored on Australian servers and is not shared with third parties.",
    },
    {
      question: "How do I know if my prescription app is government-approved?",
      answer:
        "Check the ADHA ePrescribing Conformance Register on digitalhealth.gov.au. This is the official, publicly accessible register of apps that have completed the formal ADHA conformance assessment. An app that describes itself as 'ADHA-compliant' or 'meeting Australian digital health standards' without appearing on the register has not been formally assessed. Conformance means registered; compliance is a self-description with no external verification.",
    },
  ],
};

export default post;
