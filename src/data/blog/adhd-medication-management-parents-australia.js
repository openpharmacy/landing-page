/**
 * Content data for:
 * Managing ADHD Medication in Australia: A Parent's Practical Guide
 * URL: /blog/adhd-medication-management-parents-australia
 */

const post = {
  intro: `Managing a child's ADHD medication in Australia means navigating Schedule 8 prescribing rules, tracking individual eScript tokens for every repeat, and staying on top of specialist review appointments, all while managing daily family life. This guide explains the system clearly, where the practical difficulties arise, and how an eScript wallet like OpenPharmacy can make the process more manageable.`,

  regulatoryReality: {
    heading: "The regulatory reality: ADHD medications are Schedule 8 controlled substances",
    body: [
      `ADHD stimulant medications, including methylphenidate (Ritalin, Concerta), lisdexamfetamine (Vyvanse), and dexamfetamine, are classified as Schedule 8 controlled substances in Australia. This classification reflects their potential for misuse and places strict controls on how they are prescribed, dispensed, and tracked.`,
      `For children, diagnosis and the initiation of stimulant treatment is restricted to paediatricians and child and adolescent psychiatrists in most states and territories. Queensland and, from late 2025, certain states including NSW have introduced pathways for trained GPs to continue prescriptions for stable patients under shared-care or continuation-prescriber arrangements; the initial prescription must still come from a specialist.`,
      `Prescribing rules vary by state and territory. In most jurisdictions, the specialist holds an authority to prescribe that must be renewed periodically, and each prescription includes an authority reference number. This is not a minor administrative detail: pharmacists cannot legally dispense Schedule 8 psychostimulant prescriptions without the authority number being present on the script.`,
      `Because ongoing treatment requires regular specialist review (typically at least every six months) and each authority has an expiry date, parents face a recurring deadline: book the review appointment, attend it, collect the new script. Miss that window, and there can be a gap in medication supply while you wait for the next available specialist slot. Specialist appointments often have long lead times, so managing this proactively is not optional.`,
    ],
  },

  escriptSystemExplained: {
    heading: "How the Australian eScript system works for your child's ADHD script",
    body: [
      `Australia's electronic prescribing system issues each prescription as a unique token: a QR code delivered by SMS or email. For an ADHD script with repeats, this does not mean one token for all repeats. Each repeat is its own separate token, issued as a new QR code after the previous fill is dispensed.`,
      `Here is how it works in practice. Your child's paediatrician sends you an eScript token via SMS or email. You take that token to the pharmacy, and the pharmacist scans the QR code and dispenses the first supply. When the medication is dispensed, the pharmacy system generates a new token for the next repeat and sends it to your nominated phone number or email address. You need that new token for the next fill.`,
      `This means that at any point during treatment, you are managing a live token: the current one for the next repeat. Lose it, delete it accidentally, or fail to notice it arrived, and you cannot fill the next repeat without contacting the pharmacy or prescriber to have it reissued.`,
      `For Schedule 8 medications, the rules are stricter than for standard prescriptions. Each repeat can only be filled after a minimum time interval has elapsed; you cannot fill a repeat early. If the token for your child's last repeat is lost, the recovery path runs through the pharmacy that last dispensed the medication (which can often reissue a repeat token) or, for the original script, through the prescriber. This is more involved than it sounds when you are also managing school runs, work commitments, and everything else.`,
    ],
    tokenNote: `Important: the token you receive after a fill is for the next repeat, not the same QR code reused. If you see "no more repeats" at the pharmacy, this often means the token has already been used or the previous repeat token was not saved after the last fill. Call the dispensing pharmacy first: they can usually reissue the repeat token.`,
  },

  logisticalProblem: {
    heading: "The logistical problem that builds up over time",
    body: [
      `Managing one person's eScripts is a manageable task. Managing two or more people's eScripts — your own and your child's, for example — in the same SMS inbox is where the system starts to fall apart.`,
      `Both you and your child's paediatrician may be sending eScript tokens to your phone number. The tokens arrive in the same messages app, mixed in with hundreds of other notifications, alerts, and group chat messages. A week after arrival, a token looks identical to every other automated SMS: a link, a code, a QR code image. There is no visual hierarchy that marks it as "your child's ADHD medication" rather than "your own blood pressure medication."`,
      `Over time, the practical problems compound. Which token belongs to which medication? How many repeats are left on this script versus that one? Is this token for the current repeat or for one that has already been dispensed? When does the specialist authority expire, and when do you need to book the review appointment to avoid running out?`,
      `None of these questions have automatic answers in the standard SMS-based system. Parents carry the answers in working memory, which is unreliable under the load of daily life. The consequence of getting it wrong is not just inconvenience: it can mean a child without medication on a school day, a frantic phone call to the prescriber's surgery, and a stressful wait.`,
    ],
  },

  howOpenPharmacyHelps: {
    heading: "How OpenPharmacy addresses the parent's specific challenges",
    body: [
      `OpenPharmacy is an Australian eScript wallet developed by Easy As Health Pty Ltd, registered with the Australian Digital Health Agency (ADHA) and fully conformant with national electronic prescribing standards. It stores your prescription QR codes on your device with ASD-approved end-to-end encryption, separate from your SMS inbox.`,
      `For parents managing a child's ADHD medication, the app addresses each of the logistical problems above in concrete ways.`,
    ],
    features: [
      {
        label: "Family profiles keep your scripts and your child's scripts completely separate",
        detail:
          "When you add your child's eScript token to OpenPharmacy, the app stores it under a separate profile for that family member. Your own medications appear under your profile. At the pharmacy, you select the correct person and present their QR code. There is no risk of presenting the wrong script, no searching through a combined list, no confusion about whose token belongs to whom.",
      },
      {
        label: "Remaining repeats are visible at a glance",
        detail:
          "Each script in OpenPharmacy shows the remaining repeat count. You do not need to remember whether you are on the second or third repeat, or whether the last pharmacy visit used up the final one. The information is in the app. This also helps you plan ahead: if you can see one repeat remaining, you know it is time to book the specialist review before that repeat is used.",
      },
      {
        label: "Offline access means the QR code is always there",
        detail:
          "Once saved to OpenPharmacy, your child's prescription QR code is available without an internet connection. If you are at school pick-up, realise you need to collect the medication on the way home, and have no signal — the QR code is already in the app, on the device, ready to show the pharmacist. There is no moment of 'the link won't load' or searching through SMS messages in the chemist queue.",
      },
      {
        label: "A 4-digit PIN protects sensitive information",
        detail:
          "Access to your scripts, including your child's Schedule 8 medication scripts, is protected by a 4-digit PIN. This is appropriate security for controlled substance prescriptions without making access so cumbersome that you cannot open the app quickly at the pharmacy counter.",
      },
    ],
  },

  lostToken: {
    heading: "What to do if you lose a child's ADHD eScript token",
    body: [
      `If you have lost or deleted the eScript token for your child's ADHD medication, the prescription still exists in the national system. Deleting the SMS or email only removes your local copy of the token; the prescription record itself is not affected.`,
      `The recovery process depends on which token you have lost. If you have lost the token for a repeat — that is, the medication has already been dispensed at least once — your first call should be to the pharmacy that last dispensed the medication. They can generally reissue the repeat token to your phone number or email address. This is a routine request and most pharmacy software supports it directly.`,
      `If you have lost the original script token before it has been dispensed, you will need to contact the prescriber's surgery and ask them to re-send the token. For Schedule 8 medications, this requires the prescriber or their practice staff to access the prescription in their software and reissue the token. It is a manageable process but it takes time, and some surgeries have limited administrative capacity for same-day requests.`,
      `If your child's specialist cannot or will not reissue a lost token, ask whether your child is on the Active Script List (ASL). The ASL is a digital list of eScripts that allows participating pharmacists to dispense your medication without a token, after verifying your identity. Not all pharmacies participate in the ASL, but it is worth asking. Your pharmacist can advise whether you or your child are registered and whether the script in question is on the list.`,
      `The practical solution to all of these scenarios is to save the token to OpenPharmacy the moment it arrives, so you are never reliant on the original SMS or email. The QR code is on your device, under PIN protection, and accessible offline. The token in your messages app becomes irrelevant.`,
    ],
  },

  transitionToAdult: {
    heading: "When your child reaches adulthood: what changes with the prescription",
    body: [
      `The prescribing model for ADHD medication changes when a child turns 18. Paediatricians are generally authorised to prescribe ADHD stimulants for children up to age 18 (in some states, paediatricians can continue prescribing for young adults up to 24 or 25). Once your child moves into adulthood, the prescribing authority typically needs to transfer to an adult psychiatrist or, where eligible, a GP who holds a continuation prescriber authority.`,
      `This transition can be a difficult period. Adult psychiatry services often have long waiting lists, and the out-of-pocket cost of an adult psychiatrist can be substantially higher than a paediatric review. The prescribing rules also change: the authority that applied for the child now needs to be renewed under an adult framework.`,
      `The practical advice from paediatric services is consistent: begin planning the transition well before the child's 18th birthday. Your child's paediatrician should initiate a referral to an adult psychiatrist while the current prescribing authority is still valid, so there is no gap in medication supply during the handover period.`,
      `From an eScript management perspective, the transition is straightforward in OpenPharmacy. The young adult can download their own account and take ownership of managing their scripts independently. They add their own eScript tokens, see their own repeat counts, and access QR codes at the pharmacy from their own device. The scripts that previously lived under a family profile managed by a parent migrate naturally to self-management, which is exactly the outcome you want as a young person moves toward independence.`,
    ],
  },

  faq: [
    {
      question: "Can a parent manage a child's Schedule 8 eScript in OpenPharmacy?",
      answer:
        "Yes. In Australia, parents or guardians routinely receive and present eScript tokens on behalf of their children, including for Schedule 8 medications such as ADHD stimulants. With OpenPharmacy, a parent can add their child's eScript token to their own account. The app stores the child's scripts under a separate family profile, clearly distinct from the parent's own medications. At the pharmacy, the parent selects the child's profile and presents the QR code. All data is stored on-device with ASD-approved end-to-end encryption and PIN protection.",
    },
    {
      question: "What happens if I delete my child's ADHD script token?",
      answer:
        "Deleting the SMS or email containing your child's eScript token removes your local copy of the link, but the prescription itself remains in the national electronic prescribing system. It has not been cancelled. If the token was for a repeat (that is, the previous supply had already been dispensed), call the pharmacy that last dispensed the medication and ask them to reissue the repeat token; this is a routine request. If the token was for the original script before any fill, contact the prescriber's surgery and ask them to re-send it. To avoid this situation, save every token to OpenPharmacy as soon as it arrives.",
    },
    {
      question: "How many repeats can an ADHD script have in Australia?",
      answer:
        "The number of repeats on an Australian ADHD script depends on the specific medication, the dose, the state or territory, and the prescribing authority. PBS-subsidised short-acting methylphenidate scripts can include up to five repeats for a quantity of up to 200 tablets. Long-acting formulations and other stimulants have their own limits. Your child's specialist will prescribe within the applicable authority conditions. Each repeat is issued as a separate eScript token after the previous fill is dispensed — so a script with three repeats will involve four tokens in total (the original plus one after each of the first three fills). OpenPharmacy displays the remaining repeat count on each stored script.",
    },
    {
      question: "What if my child's specialist won't reissue a lost token?",
      answer:
        "If your child's prescriber is unable to reissue a lost eScript token, ask the pharmacy that last dispensed the medication whether they can reissue the repeat token directly — this is often faster than going back to the prescriber and most pharmacy software supports it. If neither is immediately available, ask whether your child is registered on the Active Script List (ASL). Participating pharmacists can dispense from the ASL without a token by verifying your child's identity. If your child is not on the ASL and the token cannot be reissued, you will need to wait until the prescriber is available to reissue or write a new script. This is the scenario that makes saving tokens to a dedicated wallet like OpenPharmacy so important: it ensures you always have the QR code available, regardless of what happens to the original SMS.",
    },
  ],
};

export default post;
