export type CategorySlug =
  | "prescriptions-scripts"
  | "orders-delivery"
  | "payments-billing"
  | "account-security"
  | "profile-settings"
  | "general-information";

export type HelpCategory = {
  slug: CategorySlug;
  title: string;
  description: string;
};

export type ArticleSection = {
  title: string;
  lead?: string;
  items?: string[];
  nowrap?: boolean;
};

export type HelpArticle = {
  slug: string;
  title: string;
  excerpt?: string;
  category: CategorySlug;
  keywords?: string[];
  updated: string;
  intro: string;
  sections?: ArticleSection[];
};

export const HELP_CATEGORIES: HelpCategory[] = [
  {
    slug: "prescriptions-scripts",
    title: "Prescriptions & Scripts",
    description: "Upload, manage, and refill your prescriptions",
  },
  {
    slug: "orders-delivery",
    title: "Orders & Delivery",
    description: "Track orders and delivery information",
  },
  {
    slug: "payments-billing",
    title: "Payments & Billing",
    description: "Payment methods, refunds, and billing",
  },
  {
    slug: "account-security",
    title: "Account & Security",
    description: "Account settings, privacy, and security",
  },
  {
    slug: "profile-settings",
    title: "Profile & Settings",
    description: "Manage your profile and preferences",
  },
  {
    slug: "general-information",
    title: "General Information",
    description: "About OpenPharmacy and general help",
  },
];

export const HELP_ARTICLES: HelpArticle[] = [
  {
    slug: "how-to-upload-a-prescription",
    title: "How to upload a prescription",
    excerpt: "Learn how to upload your prescription using photo or PDF",
    category: "prescriptions-scripts",
    updated: "2026-11-05",
    intro:
      "OpenPharmacy makes it easy to upload your prescription and get your medications delivered to your door. Follow this step-by-step guide to upload your prescription.",
    sections: [
      {
        title: "Methods to Upload Your Prescription",
        lead: "You can upload your prescription in three convenient ways:",
        items: [
          "Take a photo with your smartphone camera",
          "Upload an existing image from your device",
          "Upload a PDF file of your prescription",
        ],
      },
      {
        title: "Step-by-Step Instructions",
        items: [
          "Open the OpenPharmacy app or website",
          "Navigate to the 'Scripts' section",
          "Tap the '+' button or 'Add Script' option",
          "Choose 'Upload Prescription'",
          "Select your upload method (photo, image, or PDF)",
          "Ensure the prescription is clear and all text is readable",
          "Review the upload and tap 'Submit'",
        ],
      },
      {
        title: "Tips for Best Results",
        items: [
          "Ensure good lighting when taking photos",
          "Make sure all corners of the prescription are visible",
          "Keep the prescription flat to avoid shadows",
          "Verify that the text is clear and not blurry",
          "Check that the doctor's signature is visible",
        ],
      },
      {
        title: "What Happens Next?",
        lead: "After you upload your prescription:",
        items: [
          "Our pharmacy team will review your prescription",
          "You'll receive a notification when it's verified",
          "Your medication will be added to your active scripts",
          "You can then order and refill your medication",
        ],
        nowrap: true,
      },
    ],
  },
  {
    slug: "setting-up-active-script-list",
    title: "Setting up Active Script List (ASL)",
    excerpt: "Connect your Medicare Active Script List to OpenPharmacy",
    category: "prescriptions-scripts",
    keywords: ["activation code", "mysl"],
    updated: "2026-11-06",
    intro:
      "Your Active Script List (ASL) is the national list of your current eScripts and repeats. Once it is connected, OpenPharmacy adds those scripts to My Scripts for you, so you don’t need to type their tokens.",
    sections: [
      {
        title: "What you need",
        items: [
          "To be registered for an Active Script List. Your pharmacist can register you.",
          "Your ASL activation code: 8 characters, including the hyphen.",
        ],
      },
      {
        title: "Getting your activation code",
        lead: "Ask your pharmacist. Once you are registered for an ASL, they can give you your activation code from their dispensing software.",
      },
      {
        title: "Connecting your ASL",
        items: [
          "Go to Scripts and select Connect ASL Now (or the + button, then Connect ASL Now).",
          "Read what the ASL is and select Connect ASL Now.",
          "Enter your first name, last name and date of birth as they are on your ASL.",
          "Enter your activation code and make sure the permission box is ticked.",
          "Select Continue. Your ASL scripts appear in My Scripts.",
        ],
      },
      {
        title: "After connecting",
        items: [
          "Scripts from your ASL are marked as synced with the official ASL registry.",
          "OpenPharmacy checks your ASL again in the background when you open Home or My Scripts.",
          "ASL scripts can’t be deleted. You can hide one from healthcare providers from its menu.",
        ],
      },
    ],
  },
  {
    slug: "managing-your-prescriptions",
    title: "Managing your prescriptions",
    excerpt: "View, organize, and track your prescription medications",
    category: "prescriptions-scripts",
    updated: "2026-11-06",
    intro:
      "My Scripts lists every script on your account, grouped by patient, with its status and how long it has left.",
    sections: [
      {
        title: "On My Scripts",
        items: [
          "Use Filters to narrow the list by medication name, member, status or tags.",
          "Use Sort to list it by expiry date, recently added, name or status.",
          "Select a script to open its details.",
        ],
      },
      {
        title: "On a script’s page",
        items: [
          "See the supplies left, quantity, strength, prescriber, and issue and expiry dates.",
          "Show the QR code at your pharmacy.",
          "Add personal notes of up to 500 characters.",
        ],
      },
      {
        title: "Removing a script",
        items: [
          "A script you added with its token can be deleted from its menu.",
          "Scripts from your Active Script List can’t be deleted. You can hide one from healthcare providers instead; you still see it.",
        ],
      },
    ],
  },
  {
    slug: "how-to-track-my-order",
    title: "How to track my order",
    excerpt: "Monitor your order status and delivery progress",
    category: "orders-delivery",
    updated: "2026-11-06",
    intro:
      "Ordering isn’t available in OpenPharmacy on the web yet, so there are no orders to track.",
    sections: [
      {
        title: "Getting your medicine",
        lead: "Take your eScript to a pharmacy: show its QR code from the script’s page, or give the pharmacist its token.",
      },
    ],
  },
  {
    slug: "order-problems-and-missing-items",
    title: "Order problems and missing items",
    excerpt: "What to do if something goes wrong with your order",
    category: "orders-delivery",
    updated: "2026-11-06",
    intro:
      "OpenPharmacy doesn’t take or deliver orders on the web yet. If something is wrong with a medicine you collected, contact the pharmacy that dispensed it.",
    sections: [
      {
        title: "Problems with OpenPharmacy",
        lead: "If a script is missing from My Scripts or shows the wrong details, email us at hello@openpharmacy.com.",
      },
    ],
  },
  {
    slug: "how-to-refill-a-medication",
    title: "How to refill a medication",
    excerpt: "Request refills for your active prescriptions",
    category: "prescriptions-scripts",
    keywords: ["reorder", "repeat"],
    updated: "2026-11-06",
    intro:
      "You can’t request a refill through OpenPharmacy on the web yet. Your next supply is dispensed at a pharmacy, from the same eScript.",
    sections: [
      {
        title: "Getting your next supply",
        items: [
          "Open the script in My Scripts and check its supplies left.",
          "Show the script’s QR code at the pharmacy, or give the pharmacist its token.",
          "If the script is on your Active Script List, your pharmacist can dispense it from there.",
        ],
      },
      {
        title: "Which scripts can be refilled",
        lead: "Home lists your active scripts under Medications to refill, soonest expiry first. A script with no supplies left, or one that has expired, needs a new prescription from your doctor.",
      },
    ],
  },
  {
    slug: "australia-post-standard-delivery",
    title: "Australia Post standard delivery",
    excerpt: "Reliable delivery in 3-5 business days",
    category: "orders-delivery",
    keywords: ["orders", "shipping"],
    updated: "2026-11-06",
    intro:
      "OpenPharmacy doesn’t deliver medicines yet, by Australia Post or any other way. You collect them from a pharmacy with your eScript.",
  },
  {
    slug: "what-to-do-if-my-script-has-expired",
    title: "What to do if my script has expired",
    excerpt: "Steps to take when your prescription expires",
    category: "prescriptions-scripts",
    updated: "2026-11-06",
    intro:
      "An expired script can’t be dispensed any more. My Scripts shows it with the status Expired.",
    sections: [
      {
        title: "What to do",
        items: [
          "Ask your doctor for a new prescription.",
          "Add the new eScript with its token, or let your Active Script List bring it in.",
          "Delete the expired script if you added it with its token.",
        ],
      },
    ],
  },
  {
    slug: "prescription-privacy-and-security",
    title: "Prescription privacy and security",
    excerpt: "How we protect your prescription information",
    category: "prescriptions-scripts",
    keywords: ["data", "permission"],
    updated: "2026-11-06",
    intro:
      "OpenPharmacy shows your scripts only after you log in to your account.",
    sections: [
      {
        title: "On the web",
        items: [
          "The site talks to OpenPharmacy over an encrypted connection (HTTPS).",
          "Your sign-in is kept in secure cookies that the page’s scripts can’t read.",
          "eScript tokens never appear in page addresses: a script’s page opens by a separate ID.",
        ],
      },
      {
        title: "Your Active Script List",
        items: [
          "OpenPharmacy reads your ASL only after you give permission and enter your activation code.",
          "You can hide an ASL script from healthcare providers from its menu.",
        ],
      },
      {
        title: "Your choices",
        items: [
          "Delete the scripts you added with their tokens.",
          "Deactivate or delete your account in Account > Account > Account Management.",
          "For questions about your data, email hello@openpharmacy.com.",
        ],
      },
    ],
  },
  {
    slug: "ordering-controlled-substances",
    title: "Ordering controlled substances",
    excerpt: "Special requirements for Schedule 8 medications",
    category: "prescriptions-scripts",
    updated: "2026-11-06",
    intro:
      "OpenPharmacy doesn’t take orders on the web yet, for Schedule 8 medicines or any other.",
    sections: [
      {
        title: "Getting a Schedule 8 medicine",
        lead: "Take your eScript to a pharmacy. The pharmacist will tell you what they need before they can dispense it.",
      },
    ],
  },
  {
    slug: "understanding-delivery-options",
    title: "Understanding delivery options",
    category: "orders-delivery",
    updated: "2026-11-06",
    intro:
      "There are no delivery options yet. OpenPharmacy on the web keeps your scripts in one place, and you collect your medicines from a pharmacy.",
  },
  {
    slug: "what-payment-methods-are-accepted",
    title: "What payment methods are accepted?",
    category: "payments-billing",
    keywords: ["card", "refund"],
    updated: "2026-11-06",
    intro:
      "OpenPharmacy on the web doesn’t take payments and doesn’t ask for card or bank details. You pay for your medicines at the pharmacy that dispenses them.",
  },
  {
    slug: "how-to-reset-my-password",
    title: "How to reset my password",
    category: "account-security",
    keywords: ["forgot"],
    updated: "2026-11-06",
    intro:
      "If you’ve forgotten your password, set a new one from the Log In page.",
    sections: [
      {
        title: "Resetting it",
        items: [
          "On the Log In page, select Forgot Password?",
          "Enter your email address. We send a 4-digit code to it.",
          "Enter the code, then your new password twice.",
          "Log in with your new password. You are signed out everywhere else.",
        ],
      },
    ],
  },
  {
    slug: "where-to-find-my-escript-token",
    title: "Where to find my eScript token",
    excerpt: "Find the token in the eScript your doctor sent you",
    category: "prescriptions-scripts",
    keywords: ["scid", "qr code", "sms", "email"],
    updated: "2026-11-06",
    intro:
      "Your doctor sends an eScript by SMS or email. Its link opens the eScript’s QR code and its token: 18 or more letters and numbers that start with 1, 2 or 3.",
    sections: [
      {
        title: "Adding it to OpenPharmacy",
        items: [
          "Go to Scripts and select the + button.",
          "Select Add Manually.",
          "Type the token exactly as shown and select Submit Script.",
        ],
      },
      {
        title: "If you can’t find it",
        items: [
          "Search your messages and email for the one from your doctor’s practice.",
          "Ask the practice to send the eScript again.",
          "For a repeat, ask the pharmacy that last dispensed it.",
          "Connect your Active Script List instead: its scripts are added without tokens.",
        ],
      },
    ],
  },
  {
    slug: "how-to-change-my-password",
    title: "How to change my password",
    excerpt: "Set a new password while you’re logged in",
    category: "account-security",
    updated: "2026-11-06",
    intro: "Go to Account > Account > Change Password.",
    sections: [
      {
        title: "Changing it",
        items: [
          "Enter your current password.",
          "Enter your new password twice. The rules show as you type.",
          "Select Change Password.",
        ],
      },
      {
        title: "Good to know",
        items: [
          "You can’t reuse any of your last four passwords.",
          "If you’ve forgotten your current password, reset it from the Log In page instead.",
        ],
      },
    ],
  },
  {
    slug: "how-to-change-my-email-address",
    title: "How to change my email address",
    excerpt: "Use a new email address for your account",
    category: "account-security",
    updated: "2026-11-06",
    intro: "Go to Account > Edit Profile.",
    sections: [
      {
        title: "Changing it",
        items: [
          "Enter the new email address and select Save Changes.",
          "Confirm with your password.",
          "Enter the 4-digit code we send to the new address.",
        ],
      },
      {
        title: "Good to know",
        lead: "From then on you log in with the new address. An address that is already used by another account can’t be added.",
      },
    ],
  },
  {
    slug: "deactivate-or-delete-my-account",
    title: "Deactivate or delete my account",
    excerpt: "Turn your account off, or remove it for good",
    category: "account-security",
    keywords: ["close", "remove"],
    updated: "2026-11-06",
    intro: "Both are in Account > Account > Account Management.",
    sections: [
      {
        title: "Deactivate Account",
        lead: "Your scripts and history are kept, but you can’t log in while the account is deactivated. To turn it back on, email hello@openpharmacy.com.",
      },
      {
        title: "Delete Account",
        lead: "Type “delete” to confirm. Your profile, scripts and history are removed and can’t be recovered.",
      },
    ],
  },
  {
    slug: "editing-my-profile",
    title: "Editing my profile",
    excerpt: "Change your name and email address",
    category: "profile-settings",
    updated: "2026-11-06",
    intro: "Go to Account > Edit Profile.",
    sections: [
      {
        title: "What you can change",
        items: [
          "Your first and last name: change them and select Save Changes.",
          "Your email address: see How to change my email address.",
        ],
      },
      {
        title: "Not available yet",
        lead: "Your phone number and date of birth can’t be saved yet.",
      },
    ],
  },
  {
    slug: "notification-preferences",
    title: "Notification preferences",
    excerpt: "Choose how OpenPharmacy contacts you",
    category: "profile-settings",
    updated: "2026-11-06",
    intro:
      "Account > Notifications lists the topics and channels (Email, Push and SMS) you can choose.",
    sections: [
      {
        title: "Not available yet",
        lead: "OpenPharmacy on the web doesn’t send notifications yet, so these choices don’t change anything for now. The emails with your verification codes are always sent.",
      },
    ],
  },
  {
    slug: "what-is-openpharmacy",
    title: "What is OpenPharmacy?",
    excerpt: "Your eScripts in one place",
    category: "general-information",
    updated: "2026-11-06",
    intro:
      "OpenPharmacy keeps your Australian eScripts in one place, on the web and in the app for iPhone and Android.",
    sections: [
      {
        title: "On the web you can",
        items: [
          "Add an eScript with its token, or connect your Active Script List to bring in all your scripts.",
          "See each script’s details and show its QR code at the pharmacy.",
          "Add personal notes to your scripts.",
        ],
      },
      {
        title: "Not available yet",
        lead: "OpenPharmacy on the web doesn’t sell or deliver medicines.",
      },
    ],
  },
  {
    slug: "contacting-openpharmacy",
    title: "Contacting OpenPharmacy",
    excerpt: "How to reach our team",
    category: "general-information",
    keywords: ["support", "help"],
    updated: "2026-11-06",
    intro: "Email us at hello@openpharmacy.com.",
    sections: [
      {
        title: "Good to know",
        items: [
          "Write from the address you use to log in, so we can find your account.",
          "Never send your password or activation code.",
        ],
      },
    ],
  },
];

export const POPULAR_ARTICLES: string[] = [
  "how-to-upload-a-prescription",
  "how-to-track-my-order",
  "what-payment-methods-are-accepted",
  "setting-up-active-script-list",
  "understanding-delivery-options",
  "how-to-reset-my-password",
];

export const ARTICLE_POPULAR_COUNT = 3;
