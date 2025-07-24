const faqData = {
  General: [
    {
      q: "How much does it cost to use OpenPharmacy?",
      a: "OpenPharmacy is completely free to use, and you won’t see any ads while using it.",
    },
    {
      q: "What does it mean that OpenPharmacy is 'securely connected to Australia’s eScript system'?",
      a: "OpenPharmacy links to Australia’s National Prescription Delivery Service through Medication Knowledge. This connection isn’t just technical—it means we comply with strict standards for privacy, security, and prescription handling set by the Australian Digital Health Agency and Department of Health and Aged Care. We’ve passed thorough compliance checks to prove that OpenPharmacy meets all these requirements, so you can trust that your prescription data is handled safely. In short, 'conformant software' means OpenPharmacy is approved to access and manage your eScript data responsibly and securely. You can verify our app’s certification on the ePrescribing external conformance register.",
    },
    {
      q: "How safe is my data with OpenPharmacy?",
      a: "OpenPharmacy protects your data with strong security measures. All information stored on your device is encrypted when the app is not active, and you can add biometric locks for extra protection. Data transmitted between your device and our cloud servers is safeguarded with end-to-end encryption. Our servers, based in Australia, encrypt stored data as well.",
    },
    {
      q: "Are my scripts tied to a Pharmacy?",
      a: "No, your prescriptions belong to you. You’re free to use any pharmacy you prefer to fill them.",
    },
    {
      q: "How do I add scripts?",
      a: "You can add your prescriptions in multiple ways: Tap on the eScript token link sent to you, which opens OpenPharmacy (make sure the app is installed). Manually enter the token inside the app. Connect your My Script List (MySL) to sync all your active prescriptions automatically.",
    },
    {
      q: "When I sign up using Google or Apple, do they get access to my personal info?",
      a: "No, signing in with Google or Apple doesn’t mean your personal details are shared with them. We only receive your name and email address as shown in your account.",
    },
  ],
  "Account Management": [
    {
      q: "How do I get an OpenPharmacy account?",
      a: "Download OpenPharmacy from the App Store, select your preferred sign-in method, and you’re set to start. No pharmacy activation codes needed.",
    },
    {
      q: "How old do I need to be to use OpenPharmacy?",
      a: "You must be 18 or older to use OpenPharmacy. Those under 18 will need parental or guardian consent.",
    },
    {
      q: "How do I delete my account?",
      a: "If you wish to delete your account: Open OpenPharmacy, go to the 'Profile' tab (user icon), select ‘Delete Account’. Note that deletion is permanent, and you will lose access to your account and data. Ensure you have any needed prescriptions saved before deleting. If you cannot access the app, contact hello@openpharmacy.app.",
    },
    {
      q: "Which devices support OpenPharmacy?",
      a: "OpenPharmacy works on iOS (iPhone and iPad) and Android devices. Check your device compatibility via the App Store or Google Play.",
    },
  ],
  Scripts: [
    {
      q: "What happens to my prescriptions once they’ve been dispensed?",
      a: "After your prescription is filled, it’s automatically moved to an inactive list to keep your active scripts organized. You can still access archived scripts by filtering your view. If you have remaining repeats and receive a new token, simply add that token to OpenPharmacy. To have your repeats appear automatically, connect your account to the Active Script List.",
    },
    {
      q: "Why isn’t my prescription status automatically updated in OpenPharmacy after dispensing?",
      a: "Each eScript has a unique digital token that changes after you use it to fill a prescription. You receive a new token for each repeat, which you need to manually add to OpenPharmacy to keep your records current. However, if you link your Active Script List (ASL), OpenPharmacy can automatically update your prescriptions and repeats without manual input.",
    },
    {
      q: "My script disappeared after being dispensed though it had repeats left. Why?",
      a: "When your script with repeats is filled, the token you used becomes invalid, and a new token for the next repeat is sent to you (usually by SMS). You must add this new token to OpenPharmacy to see the updated repeat. Also, dispensed scripts are moved to inactive status to keep your active list clean. Connecting OpenPharmacy to the ASL will automate this process.",
    },
    {
      q: "How do I get an electronic prescription?",
      a: "Ask your doctor at your next appointment for an electronic prescription. They can send it instantly to you via SMS or email, which contains a link to your eScript token (a QR code). Tapping this link will let you add the prescription to OpenPharmacy if you have the app installed.",
    },
    {
      q: "How do I get a repeat script?",
      a: "Once your pharmacist fills your prescription, you should receive a repeat as a token via SMS, email, or paper. Request an eScript token so you can tap the link and add it to OpenPharmacy right away. To simplify managing repeats, connect OpenPharmacy to your My Script List (MySL), which will sync your active prescriptions automatically.",
    },
    {
      q: "How do I keep track of paper prescriptions in OpenPharmacy?",
      a: "Register for the Active Script List (ASL). When connected, all your scripts, including paper ones, will sync automatically. Visit your pharmacy for help setting this up. If your paper script is actually a printed eScript, it may already be synced through ASL or can be added manually. Note: If your doctor initially gave you a paper script, all repeats will remain paper scripts.",
    },
    {
      q: "The information on my Script is not correct. How do I fix this?",
      a: "The prescription information comes directly from your doctor. OpenPharmacy cannot edit this data. Please contact your doctor or pharmacist to correct any errors.",
    },
    {
      q: "Can I access my scripts if I am not connected to the internet?",
      a: "You can view any scripts you have already added while offline. However, adding new prescriptions requires an internet connection.",
    },
    {
      q: "Can I delete prescriptions from OpenPharmacy?",
      a: "You may delete scripts you entered manually, but scripts synced from your My Script List cannot be removed.",
    },
    {
      q: "How do I tell which eScript tokens I’ve already used?",
      a: "OpenPharmacy shows the status of your scripts. Used scripts are moved to the archive and marked as ‘inactive’. You can review them in the archived section.",
    },
  ],

  "Active Script List (ASL)": [
    {
      q: "What is an Active Script List (ASL)?",
      a: "The Active Script List (ASL), or My Script List (MySL), is a government-backed secure digital record of your active eScripts and repeats. It lets you and your healthcare providers easily manage your prescriptions, especially when you have multiple medications. OpenPharmacy integrates with ASL, so you can manage your scripts directly in the app. To start, register with your pharmacy. You can learn more at: MySL – Approved operators of the ASL, Australian Digital Health Agency.",
    },
    {
      q: "How do automatic updates work in OpenPharmacy once connected to ASL?",
      a: "After linking OpenPharmacy with your ASL activation code from your pharmacy, your script list updates in real-time with any new prescriptions or repeats automatically, so you don’t need to enter tokens manually.",
    },
    {
      q: "How does my ASL get updated?",
      a: "Your healthcare providers, such as doctors and pharmacists update your ASL whenever they prescribe or dispense scripts. The list stays current so you always have the latest info. You can ask providers not to upload specific scripts if you wish.",
    },
    {
      q: "Who owns and runs the ASL?",
      a: "The Australian Digital Health Agency runs the ASL initiative. The system is operated by MySL, managed by Medication Knowledge and eRx Script Exchange Pty Ltd (eRx), subsidiaries of Fred IT Group Pty Ltd. eRx handles the National Prescription Delivery Service and prescription data across Australia. For more information, you can view their terms of use, privacy policy or visit MySL.com.au",
    },
    {
      q: "Is the ASL safe and secure?",
      a: "Yes, ASL complies with strict security standards set by Australian health authorities. OpenPharmacy also meets these standards to connect safely with ASL. You can verify our compliance on the ePrescribing conformance register.",
    },
    {
      q: "How do I get my ASL activation code?",
      a: "Ask any pharmacy for your ASL activation code. It’s best to visit one where you've previously filled scripts, but any pharmacy can help after verifying your identity. You'll get a code like “ABC-1234” after consenting via SMS.",
    },
    {
      q: "Do I need to worry about my ASL activation code expiring? Is it a one-time code?",
      a: "No, your ASL activation code is permanent and does not expire. Keep it safe.",
    },
    {
      q: "I’ve lost, forgotten my ASL activation code, what do I do?",
      a: "No problem—visit a pharmacy to request it again. Your code is unique and stays the same regardless of which pharmacy you visit.",
    },
    {
      q: "Can I get my ASL activation code from any pharmacy? Even if it’s not my regular pharmacy?",
      a: "You bet! Regardless of whether it's your go-to pharmacy or not, you can receive a ASL activation code from any pharmacy as long as they can verify your identity. This typically involves providing 100 points of ID. For a smoother process, consider visiting a pharmacy where you've previously filled scripts or had scripts dispensed. Since you're already in their system, it's likely to be easier and quicker.",
    },
    {
      q: "What information will my pharmacy need to provide me with my ASL code?",
      a: "If you're already registered with an Active Script List (ASL) or My Script List (MySL), they can look you up in their dispense system and provide you with your ASL activation code. If you're not registered with ASL, they'll require 100 points of ID which such as your license, passport and/or Medicare number to verify your identity, followed by your mobile number or email as it's required for your consent to register you.",
    },
    {
      q: "Do I have to connect to ASL to use OpenPharmacy?",
      a: "Nope! You can still manually add or enter each eScript and repeat token into OpenPharmacy. However, connecting to ASL is super handy—it saves you the hassle of remembering to add your scripts each time as they’ll be updated automatically.",
    },
    {
      q: "Can someone else manage my scripts on the Active Script List?",
      a: "Yes, if you share your ASL activation code with them. Keep in mind that they’ll have access to view all your scripts, as hiding specific ones isn’t an option. Only share your ASL details (Activation Code & Date of Birth) if you’re comfortable providing that level of access. Once you grant someone access to your ASL, you won’t be able to revoke it. This is different from pharmacies or healthcare professionals, where you can manage and revoke their access through OpenPharmacy.",
    },
    {
      q: "Will I still get eScripts and repeat eScript tokens by text message?",
      a: "Yes, you will still receive eScript tokens by text message, but once connected to ASL, OpenPharmacy adds them automatically—no extra effort needed.",
    },
    {
      q: "What about deleting or hiding scripts on ASL?",
      a: "Active scripts cannot be deleted from ASL, but you can archive or hide scripts in OpenPharmacy so certain healthcare providers can’t see them.",
    },
    {
      q: "Do all scripts appear on Active Script List (ASL)?",
      a: "Most active scripts appear on your ASL. Some may not, such as handwritten paper scripts, or if your provider hasn’t uploaded them, or you requested they not be uploaded. If you expect a script but don’t see it, check with your pharmacy or doctor.",
    },
  ],
};

export default faqData;
