/**
 * Content data for:
 * What Happens If You Delete Your eScript SMS? Here's What to Do
 * URL: /blog/deleted-escript-sms-what-to-do-australia
 */

const post = {
  intro: `If you delete an eScript SMS or email in Australia, your prescription is not gone. The prescription record still exists in the national system: deleting the message only removes your local copy of the token. You can recover access by asking your doctor's surgery to re-send the token, or by asking a pharmacist to check your Active Script List. To prevent this happening again, save tokens to a dedicated eScript wallet app like OpenPharmacy the moment you receive them.`,

  whatIsToken: {
    heading: "What is an eScript token and where does it live?",
    body: [
      `When your doctor sends an electronic prescription, their prescribing software generates a unique alphanumeric code called an eScript token. This token is a pointer: it tells the national prescription system which medication, dose, and repeat count is associated with your script. The actual prescription record lives in the Australian national system, maintained under the oversight of the Australian Digital Health Agency (ADHA).`,
      `The SMS or email you receive is simply a delivery method for that token. It might contain a QR code you scan at the pharmacy, or a short URL that displays the QR code in your browser. Either way, the message is a vehicle: the real prescription is stored centrally, not inside the message itself.`,
      `This distinction matters. Deleting the SMS deletes your copy of the token. It does not delete the prescription. The record in the national system remains valid and intact.`,
    ],
  },

  whatHappens: {
    heading: "What actually happens when you delete the SMS",
    body: [
      `The moment you delete the SMS or email, you lose the local reference you need to display or share your prescription QR code. You cannot load the link. You cannot show the QR code at the pharmacy. From a practical standpoint, you are temporarily stuck.`,
      `But here is the reassuring part: the prescription itself is unaffected. The national system still holds a valid, active record. If your script has repeats remaining, those repeats are still there. If it was an original prescription, it has not been cancelled. Nothing about the prescription has changed: only your ability to access it has been temporarily interrupted.`,
    ],
    aslNote: {
      heading: "If your script is on the Active Script List",
      body: `Not all scripts are managed through individual tokens. Australia's Active Script List (ASL) is a government-backed system that allows your active electronic prescriptions to be accessed directly by a pharmacist, without you needing to present a token at all. If your doctor registered your script on the ASL and you are enrolled, a pharmacist at any compatible pharmacy can pull up your prescription by verifying your identity: no token, no SMS, no QR code required. This is the backup system that makes token loss far less stressful than it first appears.`,
    },
    notOnAsl: `If your script is not on the ASL, which is still the case for many patients depending on your GP's software and your own enrolment, then recovering access means getting the token re-sent.`,
  },

  howToRecover: {
    heading: "How to recover a deleted eScript token",
    intro: `Recovery is straightforward in most cases. Follow these steps:`,
    steps: [
      {
        number: 1,
        name: "Call your doctor's surgery",
        description:
          "Explain that you have deleted or lost the eScript SMS. Most GP practice management systems can re-send the original token to your mobile number or email address in under a minute. The reception staff handle this request routinely.",
      },
      {
        number: 2,
        name: "Confirm your contact details",
        description:
          "Make sure the surgery has your current phone number or email address on file. If you have changed numbers since your last visit, update your record first to ensure the re-sent token reaches you.",
      },
      {
        number: 3,
        name: "Ask about the Active Script List",
        description:
          "If your surgery cannot re-send the token immediately, ask whether your script is accessible via the ASL. If it is, you can go directly to a pharmacist and ask them to dispense your medication using ASL access: no token needed.",
      },
      {
        number: 4,
        name: "Contact the pharmacy for repeat prescriptions",
        description:
          "For repeat prescriptions (scripts where a previous fill has already occurred), the dispensing pharmacy holds a record of the most recent repeat token. Call the pharmacy where you last filled the script and ask them to re-issue the repeat token to your phone or email.",
      },
    ],
    closing: `In most cases, recovery takes a single phone call and a few minutes. The prescription has not expired, been cancelled, or been lost: you are simply getting a new delivery of the same token.`,
  },

  aslSection: {
    heading: "Can a pharmacist fill a prescription without the token?",
    body: [
      `Yes, if your prescription is on the Active Script List. The ASL is a centralised registry of active electronic prescriptions that participating pharmacies can access directly, with your consent. When a pharmacist looks up your ASL, they can see all of your current active scripts and dispense medication without you needing to present a token at all.`,
      `To use the ASL, both you and your doctor need to be enrolled. Your GP's practice software must support ASL integration, and you need to have registered as an ASL patient (typically done through your GP or a participating pharmacy). Once enrolled, your prescriptions are automatically added to the list when they are issued.`,
      `If you are unsure whether you are enrolled, ask your GP or pharmacist. Not all practices have adopted ASL yet, and not all scripts are automatically added, so it is worth confirming before you rely on it as a backup.`,
    ],
  },

  permanentFix: {
    heading: "Why this keeps happening and a permanent fix",
    body: [
      `eScript SMS messages are easy to lose. They arrive in your regular messaging app, mixed in with delivery notifications, bank alerts, and promotional texts. They look like any other automated message. People bulk-delete their SMS threads, apply message filters, or simply swipe away notifications without thinking. A few weeks later, the pharmacy visit arrives and the script is nowhere to be found.`,
      `The fix is to move your eScripts out of your SMS inbox and into a dedicated wallet app the moment you receive them. This is not a workaround: it is the intended workflow for managing electronic prescriptions securely.`,
    ],
    openPharmacySteps: {
      intro: `Here is how to do it with OpenPharmacy:`,
      steps: [
        {
          number: 1,
          name: "Download OpenPharmacy",
          description:
            "Available free on iOS and Android. OpenPharmacy is registered with the Australian Digital Health Agency (ADHA) and uses ASD-approved end-to-end encryption.",
        },
        {
          number: 2,
          name: "Open the app and tap 'Add Script'",
          description:
            "This is the first option on the home screen. You can add a script immediately after receiving your eScript SMS.",
        },
        {
          number: 3,
          name: "Add your eScript token via the SMS link",
          description:
            "With the app installed and your account created, tap the link in your SMS to open directly to the Add Token screen, pre-populated and ready to save. OpenPharmacy retrieves your prescription details from the national system.",
        },
        {
          number: 4,
          name: "Your script is saved permanently",
          description:
            "The prescription QR code is encrypted and stored on your device. From this point, you can access it at any time: even offline, even with no mobile data, even in airplane mode. The original SMS can now be safely deleted.",
        },
      ],
      closing: `Once a script is in your OpenPharmacy wallet, you never need the original SMS again. The QR code is always available, the repeat count is visible, and the script is stored securely under a 4-digit PIN. You can also manage scripts for family members within the same app.`,
    },
  },

  screenshotSection: {
    heading: "Is it safe to screenshot your eScript QR code?",
    body: [
      `Screenshotting is a common workaround, and it does work in a technical sense: most pharmacies can scan a screenshot of a QR code the same way they would scan the original. But it introduces problems that are worth understanding.`,
      `First, screenshots have no security controls. A photo in your camera roll can be seen by anyone who picks up your phone, accessed by backup services, and accidentally shared in chats or emails. For a sensitive health document, this is not ideal.`,
      `Second, a screenshot gives you no information about repeat status. You cannot see how many repeats are remaining, when the script was issued, or what the dosage details are: all of that context is stored in the prescription system, not in the QR code image itself.`,
      `Third, if the original token has already been used or the prescription has expired, a screenshot of the QR code will still scan, but it will return an error at the pharmacy, which can be confusing.`,
      `Screenshots are a reasonable emergency stopgap if you have already deleted your SMS and cannot recover the token quickly. But they are not a substitute for a purpose-built wallet. A dedicated app like OpenPharmacy stores the token with encryption, displays repeat counts, works offline, and keeps your prescription data under proper access controls.`,
    ],
  },

  faq: [
    {
      question: "Can I get a new eScript if I delete the SMS?",
      answer:
        "Yes. Your prescription still exists in the national system: deleting the SMS only removes your local copy of the token. Contact your doctor's surgery and ask them to re-send the eScript token to your phone number or email address. Most GP software can do this in under a minute.",
    },
    {
      question: "What is the Active Script List?",
      answer:
        "The Active Script List (ASL) is a government-backed registry of your active electronic prescriptions. If you and your doctor are both enrolled, a pharmacist at any compatible pharmacy can access your scripts directly without you needing to present a token. It acts as a centralised backup when tokens are lost or deleted. Ask your GP or pharmacist whether you are currently enrolled.",
    },
    {
      question: "How do I stop losing my eScripts?",
      answer:
        "The most reliable solution is to save each eScript token to a dedicated wallet app like OpenPharmacy as soon as you receive the SMS. With the app installed and your account created, tap the link in the SMS to open directly to the Add Token screen. The app stores your prescription QR codes with end-to-end encryption on your device, making them available at any time: even without internet access. Once saved to the app, you no longer need the original SMS.",
    },
    {
      question: "Can a pharmacist look up my prescription without the token?",
      answer:
        "Yes, if your prescription is on the Active Script List and the pharmacy participates in ASL. The pharmacist can verify your identity and dispense your medication without a token. Not all prescriptions are on the ASL: it depends on your GP's software and your own enrolment. Confirm with your GP whether your scripts are added to the ASL automatically.",
    },
  ],
};

export default post;
