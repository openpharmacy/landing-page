import step1 from "../assets/3EasyStep_1.svg";
import step2 from "../assets/3EasyStep_2.svg";
import step3 from "../assets/3EasyStep_3.svg";

import manualStep1 from "../assets/manual_1.png";
import manualStep2 from "../assets/manual_2.png";
import manualStep3 from "../assets/manual_3.png";

import automaticStep1 from "../assets/automatic_1.svg";
import automaticStep2 from "../assets/automatic_2.svg";
import automaticStep3 from "../assets/automatic_3.svg";
import automaticStep4 from "../assets/automatic_4.svg";

export const easySteps = [
  {
    title: "Download & Sign Up",
    desc: "Download OpenPharmacy free from Google Play or App Store and sign up in minutes.",
    img: step1,
  },
  {
    title: "Add Your eScripts",
    desc: "Click the eScript link or paste the token sent to your phone or email from your doctor or pharmacy.",
    img: step2,
  },
  {
    title: "Stay in Control",
    desc: "Securely view, manage, and share your eScripts anytime, anywhere - all in one convenient, trusted app.",
    img: step3,
  },
];

export const manualSteps = [
  {
    title: "Go to Add Script tab",
    desc: "Receive an eScript token via SMS or email",
    img: manualStep1,
  },
  {
    title: "Add the token to the App",
    desc: "Enter your eScript token in the app",
    img: manualStep2,
  },
  {
    title: "View the eScript",
    desc: "Access your prescription details",
    img: manualStep3,
  },
];

export const automaticSteps = [
  {
    title: "Visit Doctor or Pharmacy",
    desc: "Ask your pharmacist to help you create your Active Script List (ASL). They will need to verify your identity and get your mobile number to proceed with your approval.",
    img: automaticStep1,
  },
  {
    title: "Get ASL Activation code",
    desc: "After you approve the text message to share your ASL with the pharmacy, you'll receive your ASL code (e.g., XYZ-5678), which you can use to connect it to OpenPharmacy.",
    img: automaticStep2,
  },
  {
    title: "Link to Active Script List",
    desc: "To link your prescriptions, go to the 'Link MySL' tab in the OpenPharmacy app and enter your activation code. Once entered, your full script list will load automatically.",
    img: automaticStep3,
  },
  {
    title: "Enjoy Automatic script updates",
    desc: "Once you enter your activation code in OpenPharmacy, your prescription list will sync automatically, showing both eScripts and paper prescriptions.",
    img: automaticStep4,
  },
];
