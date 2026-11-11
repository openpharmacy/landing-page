/**
 * Content data for:
 * ADHD and eScripts: Why Managing Prescriptions Is Harder With ADHD (And What Actually Helps)
 * URL: /blog/adhd-escript-management-australia
 */

const post = {
  intro: `Managing electronic prescriptions in Australia requires exactly the executive function skills that ADHD impairs: remembering a time-sensitive SMS, tracking how many repeats are left, and booking a specialist appointment before the script expires. This is not a personal failing. It is a structural mismatch between how the eScript system works and how ADHD affects the brain.`,

  whyHarder: {
    heading: "Why the eScript system is harder to navigate with ADHD",
    body: [
      `The standard eScript workflow sounds simple on paper: your doctor sends a token via SMS, you save it, and you take it to the pharmacy when you need a fill. But that workflow has four or five invisible steps that all rely on working memory, time awareness, and sustained attention. Each one is a potential failure point for someone with ADHD.`,
      `First, the SMS arrives and immediately competes with every other notification on your phone. If you do not act on it within a few minutes, it slides down the inbox. A week later, you are searching through a month of group chats, bank alerts, and delivery notifications trying to find a text that looks like every other automated message.`,
      `Second, tracking repeats requires you to mentally note "I have three repeats left, I filled one today, so two remain" every time you visit the pharmacy. There is no dashboard, no running total, no automatic record. You are expected to carry that count in your head across weeks or months.`,
      `Third, ADHD medications in Australia are Schedule 8 controlled substances. Each repeat has its own individual token, issued with a minimum time interval between fills. You cannot obtain a repeat early. If you lose the token for your last repeat, you cannot simply get a replacement at the counter: you need to contact your prescriber and go through the reissue process. That is a stressful, time-consuming task for someone whose executive function is already under pressure.`,
      `Fourth, the script itself expires if you do not book the specialist review in time. Miss the appointment window, and you may face a gap in your medication supply while you wait for the next available slot. Given that ADHD itself makes time management and appointment scheduling harder, this creates a loop: the condition impairs the very skills needed to maintain uninterrupted access to the treatment for that condition.`,
    ],
  },

  failurePoints: {
    heading: "The specific failure points: where things break down",
    intro: `The Australian ADHD Clinical Practice Guideline (AADPA, 2022), endorsed by the National Health and Medical Research Council, explicitly notes that ADHD symptoms can reduce medication adherence, including forgetting to collect medication and failing to organise repeat prescription appointments. The guideline identifies time management and forgetfulness as the primary barriers to adherence. These are not character flaws: they are documented clinical features of the condition.`,
    points: [
      {
        label: "Losing the SMS token",
        detail:
          "eScript tokens arrive in your regular SMS inbox, mixed in with everything else. People with ADHD are especially prone to bulk-deleting messages, missing notifications, or simply not registering the SMS as important in the moment. By the time you are standing at the pharmacy counter, the token may be buried under weeks of messages, or gone entirely.",
      },
      {
        label: "Not knowing how many repeats remain",
        detail:
          "ADHD medications often come with two or three repeats. Without a system that shows your current count, it is easy to lose track. You might arrive at the pharmacy assuming you have a repeat left, only to discover you used it last month and now need to contact your prescriber before you can get your next fill.",
      },
      {
        label: "The anxiety spiral at the pharmacy counter",
        detail:
          "There is a specific kind of stress that comes from standing at the pharmacy, phone in hand, scrolling frantically through SMS messages while the queue builds behind you. For someone with ADHD, that moment of pressure and scrutiny can make everything harder: finding the message, explaining the situation, managing the emotional dysregulation that often accompanies frustration.",
      },
      {
        label: "Running out of medication between repeats",
        detail:
          "Schedule 8 prescriptions have mandatory minimum time intervals between fills. If you cannot locate your token in time, or if you forget to fill a repeat before it is too late in the dosing cycle, you may face days without medication. For ADHD medication specifically, this disruption can have immediate, significant effects on daily functioning.",
      },
      {
        label: "Missing the specialist review window",
        detail:
          "ADHD medication in most Australian states and territories requires initial prescription by a psychiatrist, paediatrician, or neurologist, with ongoing review. If you miss the annual review appointment and your script expires, there can be a gap while you wait for the next available specialist slot. Scheduling that appointment ahead of time requires the kind of proactive time management that ADHD makes genuinely difficult.",
      },
    ],
  },

  howEscriptSystemWorks: {
    heading: "How the eScript system works for Schedule 8 medications",
    body: [
      `Australia's electronic prescribing system issues each prescription as a unique token: a QR code delivered via SMS or email. For most medications, if you lose the token, recovery is straightforward: call your GP, ask them to re-send it, done in a few minutes.`,
      `ADHD medications are different. They are Schedule 8 controlled substances in most Australian states and territories, which means they are subject to strict prescribing controls. Requirements vary by state, but generally only authorised specialists (psychiatrists, paediatricians, neurologists) or, since 2025, GPs who have been granted continuation prescriber authority can prescribe them. The prescription must include an authority approval number, and each repeat is issued as a separate, time-controlled token.`,
      `This means you cannot fill a repeat before the minimum interval has elapsed. The pharmacist cannot simply look it up without the token in most cases (unless your script is on the Active Script List and your pharmacist participates in that system). And if the token for your final repeat has been lost or deleted, the path back to your medication runs through your prescriber's schedule, not just a phone call to the pharmacy.`,
      `For someone whose ADHD makes administrative follow-through genuinely hard, this system requires a reliable personal infrastructure that the standard SMS-based delivery does not provide.`,
    ],
  },

  howOpenPharmacyHelps: {
    heading: "How OpenPharmacy addresses each failure point",
    body: [
      `OpenPharmacy is an Australian eScript wallet developed by Easy As Health Pty Ltd, registered with the Australian Digital Health Agency (ADHA) and fully conformant with national electronic prescribing standards. Its core function is to move your prescription QR codes off the SMS inbox and onto your device, under proper security, where they cannot be accidentally deleted.`,
      `Here is how it addresses each of the failure points above directly.`,
    ],
    features: [
      {
        label: "Tokens stored on-device, not in your SMS inbox",
        detail:
          "When you receive an eScript token, you tap the link and it opens directly to the Add Token screen in OpenPharmacy. The app retrieves your prescription details from the national system and stores the QR code on your device with ASD-approved end-to-end encryption. From that moment, the original SMS is irrelevant. The script is in your wallet, not your messages. Deleting the SMS no longer creates a crisis.",
      },
      {
        label: "Offline access means the QR code is always there",
        detail:
          "Once saved to OpenPharmacy, your prescription QR code is available with no internet connection required. At the pharmacy counter, with no signal, underground, in a rural area, in airplane mode: the QR code renders from local storage. There is no moment of 'the link won't load' or 'my data has run out'. You open the app, find the script, show the pharmacist. That is all.",
      },
      {
        label: "Visible repeat count so you always know what is left",
        detail:
          "OpenPharmacy displays each script with its repeat count visible. You can see at a glance how many repeats remain for each medication. This replaces the mental accounting that is so unreliable for people with ADHD. Instead of trying to remember 'I think I have one left', you look at the app and the answer is there.",
      },
      {
        label: "PIN lock protects your scripts without complicating access",
        detail:
          "The app is protected with a 4-digit PIN, which keeps your prescription data secure if your phone is picked up by someone else. This is important for Schedule 8 medications. The PIN is simple enough that opening the app under pharmacy pressure does not add another cognitive load: four digits and you are in.",
      },
    ],
  },

  parentsSection: {
    heading: "For parents managing a child's ADHD medication",
    body: [
      `Managing your own ADHD while also managing a child's ADHD medication prescription is one of the most demanding prescription management scenarios that exists. Both you and your child may have ADHD symptoms affecting organisation. The child's medication is a Schedule 8 substance with all of the complexity described above. And the stakes of running out are immediate and visible.`,
      `Parents managing children's ADHD scripts typically handle: receiving the specialist's eScript token, tracking when the current supply is running low, filling the repeat at the right time within the prescribed interval, and booking the next review appointment before the script expires. Each of these tasks requires the kind of forward planning and task initiation that ADHD directly impairs.`,
      `OpenPharmacy's family management feature keeps children's scripts separate and clearly labelled within your account. You add the token when it arrives, and the app organises it by individual: your child's scripts are clearly separate from your own. At the pharmacy, you select their scripts and display their QR code. There is no mixing of medications between family members, no confusion about whose script you are presenting.`,
      `All of this works offline, which matters particularly for parents who might be at the pharmacy with a child in tow, reception uncertain, and limited bandwidth to troubleshoot.`,
    ],
  },

  limitations: {
    heading: "What OpenPharmacy does not do",
    body: [
      `OpenPharmacy is an eScript wallet, not a medication management or reminder app. It is important to be clear about this distinction.`,
      `The app stores and organises your eScript QR codes. It does not send you reminders to take your medication each day. It does not alert you when a repeat is running low or when it is time to book your next review appointment. It does not integrate with your calendar or send push notifications based on your dosing schedule.`,
      `If you need daily dose reminders for taking your ADHD medication, you will want a separate reminder app alongside OpenPharmacy. Many people use their phone's built-in alarm or calendar, or a dedicated medication reminder app, for this purpose. OpenPharmacy focuses on one thing: making sure your prescription QR codes are always available, secure, and correctly organised when you need them at the pharmacy. It solves the token management problem, not the daily adherence problem.`,
      `For the token management side, which is the part that creates the most acute stress for Australians with ADHD, it is purpose-built and effective.`,
    ],
  },

  faq: [
    {
      question: "What happens if I lose my ADHD eScript token in Australia?",
      answer:
        "If you lose the SMS or email token for an ADHD eScript, your prescription still exists in the national system: deleting the message only removes your local copy of the token. Contact your prescriber's surgery and ask them to re-send the token to your phone number or email. For Schedule 8 medications, this is a routine request that most GP and specialist practice software can fulfil quickly. If your prescription is on the Active Script List and your pharmacist participates in that system, they may be able to dispense without a token after verifying your identity. To prevent this situation, save your eScript token to a dedicated wallet like OpenPharmacy the moment it arrives, so you are never reliant on the original SMS.",
    },
    {
      question: "Can a parent or carer manage ADHD scripts on behalf of a child?",
      answer:
        "Yes. In Australia, most under-18s have their prescriptions managed by a parent or guardian, who receives and presents scripts on their behalf. With OpenPharmacy, a parent can add their child's eScript tokens to their own account and the app automatically organises them separately from the parent's own medications. At the pharmacy, the parent selects the child's scripts and displays the QR code. This includes Schedule 8 medications such as ADHD stimulants. All data is stored on-device with end-to-end encryption and PIN protection.",
    },
    {
      question: "How do I track how many ADHD medication repeats I have left?",
      answer:
        "OpenPharmacy displays the repeat count for each stored eScript, so you can see how many repeats remain at a glance without needing to remember or manually track them. This is particularly useful for Schedule 8 ADHD medications, which have strict rules about when repeats can be filled. Knowing your remaining repeat count lets you plan ahead: if you can see you have one repeat left, you know to book your specialist review appointment before that repeat is used, to avoid a gap in supply.",
    },
    {
      question: "Does OpenPharmacy work for Schedule 8 medications like ADHD stimulants?",
      answer:
        "Yes. OpenPharmacy stores any Australian eScript token, including those for Schedule 8 medications such as dexamfetamine, lisdexamfetamine (Vyvanse), and methylphenidate (Ritalin, Concerta). The app is registered with the Australian Digital Health Agency (ADHA) and is fully conformant with the national electronic prescribing standard. It stores the QR code on your device with ASD-approved end-to-end encryption and PIN protection, which is particularly appropriate for sensitive controlled substance prescriptions. At the pharmacy, the pharmacist scans the QR code directly from the app screen, which is the same process as presenting any other eScript.",
    },
  ],
};

export default post;
