/**
 * Content data for:
 * What to Know About Australian Health App Data Privacy Laws
 * URL: /blog/health-app-data-privacy-laws-australia
 */

const post = {
  intro: `Australian health apps are subject to the Privacy Act 1988 and the 13 Australian Privacy Principles (APPs), which set legally binding rules for how sensitive health data must be collected, stored, used, and shared. Health information receives stricter protection than general personal data under Australian law. Apps that connect to national digital health infrastructure — including eScript wallets — must also meet ADHA conformance standards, providing an additional layer of independently verified security.`,

  privacyActSection: {
    heading: "The Privacy Act 1988: the foundation of Australian health data law",
    body: [
      `The Privacy Act 1988 is the primary federal law governing how personal information is handled in Australia. It applies to all private sector health service providers regardless of their annual turnover — an important distinction, because the general $3 million turnover threshold that exempts small businesses does not apply when the business is handling health data.`,
      `Health information is classified as "sensitive information" under the Act. This classification matters because it triggers stricter legal obligations than those that apply to general personal data such as names and contact details. Sensitive information cannot be collected without the individual's consent (unless a specific legal exception applies), must be stored securely, and can only be used or shared for purposes that the individual has agreed to or that the law permits.`,
      `For a patient using a health app, the practical implications are significant. The app developer is legally required to collect only the minimum information necessary for the app to function. They cannot sell your health data, share it with advertisers, or use it to profile you commercially. They must maintain a current, accessible privacy policy. And if a data breach occurs that is likely to cause you serious harm, they must notify you and the Office of the Australian Information Commissioner within a defined timeframe.`,
      `The Privacy and Other Legislation Amendment Act 2024, passed in November 2024, expanded OAIC enforcement powers, introduced a statutory tort for serious invasions of privacy (in force from June 2025), and strengthened breach notification requirements. These reforms represent the most significant update to Australian privacy law in years, and they make the framework meaningfully stronger for health data specifically.`,
    ],
  },

  appsSection: {
    heading: "The 13 Australian Privacy Principles: what they mean for health app users",
    intro: `The 13 Australian Privacy Principles (APPs) sit within the Privacy Act and provide the detailed rules for how organisations must handle personal information. All 13 apply to health apps, but three are especially relevant for any patient thinking about where their prescription or health data goes.`,
    principles: [
      {
        number: "APP 1",
        label: "Open and transparent management of personal information",
        detail:
          "The app must have a clearly written, up-to-date privacy policy that explains what data is collected, why it is collected, how it is stored, who it may be shared with, and how you can access or correct your information. A privacy policy that is vague, out of date, or buried in fine print is a red flag under APP 1. The policy must be freely available — you should not have to create an account or make a purchase to read it.",
      },
      {
        number: "APP 6",
        label: "Use or disclosure of personal information",
        detail:
          "An organisation may only use or disclose your health information for the primary purpose for which it was collected, or for a secondary purpose that you have explicitly consented to. For a prescription management app, this means your script data can be used to display your prescriptions — but it cannot be shared with pharmacy chains for marketing, sold to insurers, or used to target advertising without your specific, informed consent. Any privacy policy that includes broad language like 'we may share data with trusted partners for service improvement' is making room for disclosure that APP 6 is designed to prevent without explicit consent.",
      },
      {
        number: "APP 11",
        label: "Security of personal information",
        detail:
          "Organisations must take reasonable steps to protect personal information from misuse, interference, loss, and unauthorised access, modification, or disclosure. For health data, 'reasonable steps' is a higher bar than for general personal information. This is the APP that requires encryption, access controls, secure storage, and regular security testing. It also requires the organisation to destroy or de-identify data that is no longer needed. What counts as 'reasonable' depends on the sensitivity of the data — and health information sits at the top of that scale.",
      },
    ],
    closing: `The other APPs cover data quality (APP 10), access and correction rights (APP 12 and 13), and cross-border data disclosure rules (APP 8). These rights collectively mean that you can request a copy of the data an app holds about you, ask for corrections if it is wrong, and receive an explanation if the app is proposing to send your data overseas.`,
  },

  oaicSection: {
    heading: "The OAIC: enforcement, complaints, and the notifiable data breach scheme",
    body: [
      `The Office of the Australian Information Commissioner (OAIC) is the independent federal regulator responsible for enforcing the Privacy Act and the APPs. It sits within the Australian government but operates independently of ministerial direction on individual matters.`,
      `If you believe a health app has misused your personal information or failed to meet its obligations under the APPs, you can lodge a complaint directly with the OAIC at oaic.gov.au. The OAIC can investigate the complaint, attempt conciliation, make formal determinations, and — for serious or repeated breaches — seek significant civil penalties through the Federal Court. Following the 2024 amendments, penalties for the most serious privacy breaches can reach AUD 50 million for corporations, or three times the benefit obtained, or 30 percent of adjusted turnover during the breach period, whichever is greatest.`,
      `The Notifiable Data Breaches (NDB) scheme, which operates under Part IIIC of the Privacy Act, is particularly relevant for health apps. Under the NDB scheme, any organisation covered by the Privacy Act must notify both affected individuals and the OAIC when a data breach occurs that is likely to result in serious harm. For health data, the threshold for "serious harm" is not high — your prescription history, medical conditions, and medication details are precisely the kind of information whose exposure can cause financial, psychological, reputational, or physical harm. The notification must include what information was compromised, what the organisation is doing about it, and what steps you can take to protect yourself.`,
      `The NDB scheme has teeth precisely because it removes the choice about disclosure. An organisation cannot quietly patch a breach and move on. If the breach meets the threshold, notification is mandatory.`,
    ],
  },

  adhaSection: {
    heading: "ADHA conformance as a privacy signal for eScript apps",
    body: [
      `For eScript wallet apps specifically, ADHA conformance provides an additional, independently verified layer of privacy assurance beyond what the Privacy Act alone requires. The Australian Digital Health Agency (ADHA) is the government body that oversees Australia's national digital health infrastructure, including the electronic prescribing system.`,
      `Being listed on the ADHA ePrescribing Conformance Register at digitalhealth.gov.au means a developer has demonstrated that their software meets the technical, security, and interoperability requirements set by the ADHA for handling Australian electronic prescriptions. These requirements include using ASD-approved encryption — cryptographic standards assessed by the Australian Signals Directorate, the national cybersecurity authority.`,
      `From a patient's perspective, ADHA conformance is a meaningful privacy signal for one specific reason: it is external verification, not self-certification. Any developer can write "ADHA-compliant" in their app store listing. Appearing on the register means the ADHA has reviewed the product. The distinction between claiming compliance and achieving registered conformance is significant.`,
      `Prescribers and pharmacists are required to use software that meets the Electronic Prescribing Conformance Scheme for their clinical systems. For patient-facing eScript wallet apps, checking the register is the most reliable way to verify a genuine commitment to the national standard.`,
    ],
    howToCheck: {
      heading: "How to verify an app is ADHA-conformant",
      steps: [
        {
          number: 1,
          name: "Visit the ADHA Registers page",
          description:
            "Go to digitalhealth.gov.au/about-us/policies-privacy-and-reporting/registers. The Electronic Prescribing External Conformance Register lists all software products that have completed the formal assessment. Download the current register PDF and search for the app name.",
        },
        {
          number: 2,
          name: "Read the app's privacy policy for APP 6 compliance",
          description:
            "Look specifically for language about secondary use and disclosure. Does the policy state that your prescription data will not be used for any purpose other than managing your prescriptions? Does it explicitly rule out sharing with pharmacy chains, advertisers, or analytics providers? Vague language about 'trusted partners' or 'service improvement' is not the same as a clear prohibition.",
        },
        {
          number: 3,
          name: "Check for an Australian server storage commitment",
          description:
            "Look for an explicit statement that data is stored on servers located in Australia. If the policy says data 'may be transferred overseas' or does not specify a server location, that is not a commitment to Australian storage.",
        },
      ],
    },
  },

  serverStorageSection: {
    heading: "Australian server storage: what the law requires and what it means in practice",
    body: [
      `The Privacy Act does not automatically prohibit storing health data on overseas servers. What it requires under APP 8 is that before disclosing personal information to an overseas recipient, the organisation must take reasonable steps to ensure the recipient will handle the information in a way consistent with the APPs — or obtain explicit consent for the overseas disclosure.`,
      `In practice, this means an Australian health app can legally use overseas cloud infrastructure, provided it has contractual arrangements ensuring equivalent privacy protection. But "equivalent protection" is difficult to verify, and several foreign data regimes create genuine risks. Data stored on US servers, for example, is subject to the US CLOUD Act, which allows US authorities to compel US-based cloud providers to hand over data stored anywhere in the world, including servers physically located outside the US.`,
      `This is why many Australian health apps that handle sensitive data specifically advertise Australian server storage as a commitment above and beyond the minimum legal requirement. Storing data on Australian servers subject to Australian jurisdiction removes the uncertainty created by cross-border legal exposure. For prescription data specifically, which can reveal mental health treatment, chronic conditions, and other highly personal health information, the stronger commitment is the appropriate one.`,
      `OpenPharmacy stores all prescription data on servers physically located in Australia. This means your data is governed solely by Australian privacy law, without any cross-border legal exposure.`,
    ],
  },

  redFlagsSection: {
    heading: "Red flags in health app privacy policies",
    intro: `Not all privacy policies are equal. These patterns in a health app's privacy policy should prompt careful consideration before you trust it with prescription data.`,
    flags: [
      {
        label: "Vague data sharing language",
        detail:
          "Phrases like 'we may share information with trusted partners', 'to improve our services', or 'with affiliated organisations' are placeholders for disclosure the app developer wants to keep available. A genuine commitment to not sharing your health data says exactly that, without qualifications.",
      },
      {
        label: "Third-party advertising or analytics data use",
        detail:
          "Some health apps use third-party analytics or advertising SDKs that have access to app data. If the privacy policy discloses that data is shared with 'analytics providers', 'advertising partners', or 'social media platforms', those third parties may be able to see health-related signals from your app activity.",
      },
      {
        label: "No data deletion policy",
        detail:
          "APP 11 requires organisations to destroy or de-identify data that is no longer needed. A privacy policy that does not describe how and when your data is deleted — or that says data is retained indefinitely — is not meeting this obligation. You should also be able to request deletion of your account and associated data.",
      },
      {
        label: "No specific server location commitment",
        detail:
          "If the privacy policy does not explicitly state that data is stored in Australia, it may not be. 'Secure cloud storage' and 'industry-standard servers' are not location commitments. Look for 'servers located in Australia' or equivalent explicit language.",
      },
      {
        label: "Ownership by a pharmacy chain",
        detail:
          "Apps owned by pharmacy chains have a commercial relationship with where you fill your prescriptions. That relationship creates an incentive to use your prescription history commercially, whether to route you to specific pharmacies, analyse your medication patterns, or personalise offers. An independent app has no such commercial incentive.",
      },
    ],
  },

  openPharmacySection: {
    heading: "OpenPharmacy's specific privacy commitments",
    body: [
      `OpenPharmacy is developed by Easy As Health Pty Ltd, a Brisbane-based digital health company. The app is registered on the ADHA ePrescribing Conformance Register, meaning it has completed the formal assessment process conducted by the Australian Digital Health Agency for handling Australian electronic prescriptions.`,
      `On data storage: all prescription data is stored on servers physically located in Australia. There is no offshore cloud infrastructure involved. Your data is governed solely by Australian privacy law.`,
      `On encryption: OpenPharmacy uses end-to-end ASD-approved encryption. ASD-approved encryption means the specific cryptographic algorithms protecting your data have been assessed by the Australian Signals Directorate — the same benchmark used for sensitive government and defence systems in Australia.`,
      `On data sharing: prescription data is never shared with third parties. This includes pharmacies. OpenPharmacy is independent of any pharmacy chain, which means it has no commercial relationship with any dispenser and no commercial incentive to share your script data before you walk into a chemist.`,
      `On access control: the app uses a 4-digit PIN as an authentication layer independent of your device lock. Your prescriptions are not accessible even if someone else unlocks your phone by another method.`,
      `On offline access: eScript QR codes are stored directly on your device rather than retrieved from a server at the point of dispensing. This means your QR code is always available without an internet connection — at rural pharmacies, underground, or when your data runs out — and it means no live server call is made at the pharmacy counter that could be logged or intercepted.`,
    ],
  },

  faq: [
    {
      question: "Are health apps in Australia required to store data on Australian servers?",
      answer:
        "No, the Privacy Act 1988 does not automatically require Australian server storage. What it requires under APP 8 is that before disclosing health information to an overseas recipient, the app must take reasonable steps to ensure the overseas recipient provides privacy protection equivalent to the APPs, or obtain explicit consent for the overseas transfer. In practice, this means overseas storage is permitted if contractual protections are in place. However, data stored on Australian servers is governed solely by Australian privacy law, without the cross-border legal exposure that overseas storage creates. Many Australian health apps specifically commit to Australian server storage as a stronger position than the legal minimum. OpenPharmacy stores all data on Australian servers.",
    },
    {
      question: "What is the OAIC and what does it do?",
      answer:
        "The Office of the Australian Information Commissioner (OAIC) is the independent federal regulator responsible for enforcing the Privacy Act 1988 and the 13 Australian Privacy Principles (APPs). It operates at oaic.gov.au. If you believe a health app has mishandled your personal information, you can lodge a privacy complaint with the OAIC directly. The OAIC can investigate complaints, attempt conciliation between you and the organisation, make formal determinations, and seek civil penalties through the Federal Court for serious or repeated breaches. Following the 2024 Privacy Act amendments, penalties for the most serious breaches can reach AUD 50 million for corporations.",
    },
    {
      question: "Can I delete my data from a health app?",
      answer:
        "Yes. Under APP 11, organisations covered by the Privacy Act must destroy or de-identify personal information when it is no longer needed for the purpose for which it was collected. You also have rights under APP 12 and APP 13 to access the data an organisation holds about you and to request corrections to information that is inaccurate. In practice, most health apps provide an account deletion function that should trigger deletion of your stored data. If an app's privacy policy does not describe how data is deleted, or states that data is retained indefinitely, that is a red flag. If you have concerns about whether an app has deleted your data after an account closure request, you can lodge a complaint with the OAIC.",
    },
    {
      question: "What should I look for in a health app privacy policy?",
      answer:
        "Four things matter most. First, is there a clear statement that health data is not shared with third parties — including advertisers, analytics providers, and pharmacy chains? Vague language about 'trusted partners' is not a prohibition. Second, is there an explicit commitment to Australian server storage, or does the policy allow overseas data transfer? Third, is the app listed on the ADHA ePrescribing Conformance Register at digitalhealth.gov.au? This is external verification of security standards, not self-certification. Fourth, does the policy describe how and when data is deleted when you close your account or no longer need the app? A policy that does not address deletion is not meeting APP 11 obligations.",
    },
    {
      question: "What is the Notifiable Data Breaches scheme and does it apply to health apps?",
      answer:
        "The Notifiable Data Breaches (NDB) scheme is a mandatory notification requirement under Part IIIC of the Privacy Act 1988. Any organisation covered by the Privacy Act — including private sector health service providers, regardless of size — must notify both affected individuals and the OAIC when a data breach occurs that is likely to result in serious harm. For health data, this threshold is easily met: prescription history, medical conditions, and medication records are exactly the type of information whose exposure can cause financial, psychological, or reputational harm. Notification must include a description of the breach, what information was involved, and what steps individuals should take to protect themselves. The scheme has been in operation since February 2018.",
    },
  ],
};

export default post;
