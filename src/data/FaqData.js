const faqData = {
  General: [
    {
      q: "How do I create an OpenPharmacy account?",
      a: "Download OpenPharmacy from the App Store or Google Play, choose your sign-in method, and you’re ready to go. No pharmacy codes are required.",
    },
    {
      q: "Is there a fee to use OpenPharmacy?",
      a: "OpenPharmacy is entirely free, and you won’t encounter any ads while using it.",
    },
    {
      q: "Which devices are compatible with OpenPharmacy?",
      a: "OpenPharmacy is available on iOS (iPhone) and Android devices. Check compatibility on the App Store or Google Play.",
    },
    {
      q: "How secure is my data in OpenPharmacy?",
      a: "OpenPharmacy uses advanced security measures. Data on your device is encrypted when the app is not in use. Data sent to and from our Australian servers is protected with end-to-end encryption, and server-stored data is also encrypted.",
    },
    {
      q: "Am I locked into using a specific pharmacy for my prescriptions?",
      a: "No, your prescriptions are yours to fill at any pharmacy you choose.",
    },
    {
      q: "How does OpenPharmacy connect to Australia’s ePrescription system?",
      a: "OpenPharmacy integrates securely with Australia’s National Prescription Delivery Service through the Medication Knowledge platform. This connection ensures compliance with stringent privacy, security, and prescription management standards established by the Australian Digital Health Agency and the Department of Health and Aged Care. We’ve undergone rigorous audits to confirm that your prescription data is managed safely. You can verify our certification on the ePrescribing conformance register.",
    },
    {
      q: "Does signing in with Google or Apple give them access to my personal information?",
      a: "No, using Google or Apple sign-in only shares your name and email address with OpenPharmacy. No other personal details are sent to them.",
    },
  ],
  Scripts: [
    {
      q: "How do I add prescriptions to OpenPharmacy?",
      a: "You can add prescriptions in several ways: Tap the eScript token link sent to you, which opens OpenPharmacy (ensure the app is installed). Enter the token manually in the app. Connect to My Script List (MySL) to automatically sync all active prescriptions.",
    },
    {
      q: "How do I obtain an electronic prescription?",
      a: "During your next doctor’s visit, request an electronic prescription. They’ll send it to you via SMS or email with a link to your eScript token (a QR code). Tapping the link adds it to OpenPharmacy if the app is installed.",
    },
    {
      q: "How do I get a repeat prescription?",
      a: "After your pharmacist dispenses your prescription, you’ll receive a repeat token via SMS, email, or paper. Request an eScript token and tap the link to add it to OpenPharmacy. Connecting to My Script List (MySL) syncs repeats automatically.",
    },
    {
      q: "What happens to my prescriptions after they’re dispensed?",
      a: "Once dispensed, prescriptions are moved to an archived list in OpenPharmacy to keep your active prescriptions organized. You can view archived prescriptions by going to the Archive tab on the home screen. For repeats, add the new token you receive. Linking to the Active Script List (ASL) automates repeat updates.",
    },
    {
      q: "Why doesn’t OpenPharmacy automatically update my prescription status after dispensing?",
      a: "Each eScript has a unique token that becomes invalid after dispensing. A new token for repeats is sent to you, which you must add manually to OpenPharmacy. Connecting to the Active Script List (ASL) allows automatic updates for prescriptions and repeats.",
    },
    {
      q: "Why did my prescription with repeats disappear after dispensing?",
      a: "After dispensing, the original token becomes invalid, and a new token for the next repeat is sent (typically via SMS). You need to add this new token to OpenPharmacy to see the repeat. Dispensed prescriptions are archived to keep your active list tidy. Linking to ASL automates this process.",
    },
    {
      q: "Can I track paper prescriptions in OpenPharmacy?",
      a: "Yes, by registering for the Active Script List (ASL). Once linked, all prescriptions, including paper ones, sync automatically. Visit your pharmacy to set this up. If your paper prescription is a printed eScript, it may already be synced via ASL or can be added manually. Note: Initial paper prescriptions mean repeats will also be paper.",
    },
    {
      q: "What if my prescription details are incorrect?",
      a: "Prescription data comes directly from your doctor, and OpenPharmacy cannot modify it. Contact your doctor or pharmacist to correct any errors.",
    },
    {
      q: "Can I view my prescriptions offline?",
      a: "You can view previously added prescriptions in OpenPharmacy without an internet connection. Adding new prescriptions requires online access.",
    },
    {
      q: "Can I remove prescriptions from OpenPharmacy?",
      a: "Manually added prescriptions can be deleted, but those synced from My Script List cannot be removed.",
    },
    {
      q: "How do I know which eScript tokens I’ve used?",
      a: "OpenPharmacy displays prescription statuses. Used prescriptions are archived and marked as ‘inactive.’ You can review them in the archived section.",
    },
  ],
  "Account Management": [
    {
      q: "How do I create an OpenPharmacy account?",
      a: "Download OpenPharmacy from the App Store or Google Play, choose your sign-in method, and you’re ready to go. No pharmacy codes are required.",
    },
    {
      q: "What is the minimum age to use OpenPharmacy?",
      a: "You must be 18 or older to use OpenPharmacy. Users under 18 require parental or guardian consent.",
    },
    {
      q: "Which devices are compatible with OpenPharmacy?",
      a: "OpenPharmacy is available on iOS (iPhone) and Android devices. Check compatibility on the App Store or Google Play.",
    },
    {
      q: "How can I delete my OpenPharmacy account?",
      a: "To delete your account: Open OpenPharmacy. Navigate to the ‘Profile’ section (user icon). Select ‘Delete Account.’ This action is permanent, and all data will be lost. Save any necessary prescriptions beforehand. If you can’t access the app, email hello@openpharmacy.com.",
    },
  ],

  "Active Script List (ASL)": [
    {
      q: "What is the Active Script List (ASL)?",
      a: "The Active Script List (ASL), also known as My Script List (MySL), is a secure, government-supported digital record of your active eScripts and repeats. It simplifies prescription management for you and your healthcare providers, especially for multiple medications. OpenPharmacy integrates with ASL for seamless management. Register at your pharmacy to get started. Learn more at MySL.com.au or the Australian Digital Health Agency website.",
    },
    {
      q: "How do I obtain my ASL activation code?",
      a: "Request your ASL activation code from any pharmacy. It’s easiest at a pharmacy where you’ve filled prescriptions, but any pharmacy can provide it after verifying your identity. You’ll receive a code like “XYZ-5678” after consenting via SMS.",
    },
    {
      q: "How do automatic updates work with ASL in OpenPharmacy?",
      a: "Once you link OpenPharmacy with your ASL activation code from your pharmacy, new prescriptions and repeats update automatically in real-time, eliminating the need to add tokens manually.",
    },
    {
      q: "What information does a pharmacy need to give me my ASL code?",
      a: "If you’re registered with ASL/MySL, the pharmacy can retrieve your code from their system. If not, they’ll need 100 points of ID (e.g., license, passport, Medicare card) and your mobile number or email to register you and provide the code.",
    },
    {
      q: "Can I get an ASL activation code from any pharmacy, even if it’s not my usual one?",
      a: "Yes, any pharmacy can provide your ASL activation code after verifying your identity with 100 points of ID (e.g., driver’s license, passport, Medicare card). It’s faster at a pharmacy where you’re already registered.",
    },
    {
      q: "Does my ASL activation code expire?",
      a: "No, your ASL activation code is permanent and does not expire. Store it securely.",
    },
    {
      q: "What if I lose or forget my ASL activation code?",
      a: "Visit any pharmacy to request your code again. It remains the same across pharmacies.",
    },
    {
      q: "Is connecting to ASL required to use OpenPharmacy?",
      a: "No, you can manually add eScript tokens to OpenPharmacy. However, connecting to ASL simplifies management by automatically updating your prescriptions.",
    },
    {
      q: "Is the ASL secure?",
      a: "Yes, ASL meets stringent security standards set by Australian health authorities, and OpenPharmacy complies with these to ensure safe integration. Check our compliance on the ePrescribing conformance register.",
    },
    {
      q: "How is my ASL updated?",
      a: "Your doctors and pharmacists update your ASL when prescribing or dispensing medications, keeping it current. You can request that specific prescriptions not be uploaded if desired.",
    },
    {
      q: "Who operates the ASL?",
      a: "The Australian Digital Health Agency oversees the ASL program. It’s managed by MySL, operated by Medication Knowledge and eRx Script Exchange Pty Ltd, subsidiaries of Fred IT Group Pty Ltd, which handles Australia’s prescription data. Visit MySL.com.au for terms of use and privacy details.",
    },
    {
      q: "Will I still receive eScript tokens via SMS if I’m connected to ASL?",
      a: "Yes, you’ll still get eScript tokens via SMS, but OpenPharmacy automatically adds them when linked to ASL, saving you time.",
    },
    {
      q: "Can someone else manage my prescriptions via ASL?",
      a: "Yes, if you share your ASL activation code with them, they can view all your prescriptions. Specific prescriptions cannot be hidden, so only share with trusted individuals.",
    },
    {
      q: "Can I hide or delete prescriptions on ASL?",
      a: "Active prescriptions cannot be deleted from ASL, but you can hide them in OpenPharmacy to limit visibility to certain healthcare providers.",
    },
    {
      q: "Do all prescriptions appear on ASL?",
      a: "Most active prescriptions are on ASL. Handwritten paper prescriptions, unuploaded scripts, or those you requested not to be uploaded may not appear. Contact your pharmacy or doctor if a prescription is missing.",
    },
  ],
};

export default faqData;
