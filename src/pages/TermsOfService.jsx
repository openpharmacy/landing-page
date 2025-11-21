import React, { useEffect } from "react";
import Layout from "../components/Layout";

function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const wrapperClasses = "text-white flex flex-col gap-10";
  const sectionClasses = "flex flex-col gap-4";

  return (
    <Layout>
      <h1 className="font-grifter text-4xl md:text-5xl mb-4">
        OpenPharmacy – Terms of Use
      </h1>
      <p className="text-base md:text-lg font-extralight mb-8">
        EASY AS HEALTH PTY LTD ACN 673 356 977
      </p>

      <div className={wrapperClasses}>
        {/* 1. Background */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            1. Background
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            Thank you for visiting our Terms of Use (Agreement), we are EASY AS
            HEALTH PTY LTD ACN 673 356 977 (EASY AS HEALTH, we, our, us and
            other similar terms). We provide software applications that function
            as an electronic prescription manager, integrated with pharmacies
            and doctors, through which users can manage their prescriptions and
            medications known as OpenPharmacy (OpenPharmacy).
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            This Agreement outlines the terms and conditions associated with
            your use of OpenPharmacy. It is your obligation to ensure that you
            have read, understood and agree to the most recent terms available
            on our Website.
          </p>
        </section>

        {/* 2. Agreement */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">2. Agreement</h2>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            2.1 Accepting this Agreement
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            By creating an OpenPharmacy Account or downloading the mobile
            application version of OpenPharmacy, you agree to comply with and be
            legally bound by the terms and conditions of this Agreement. If you
            do not agree to these terms, you have no right to continue using
            OpenPharmacy.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            You must not use OpenPharmacy if you are not able to form legally
            binding contracts or are under the age of 13.
          </p>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            2.2 About this Agreement
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            Throughout the Agreement we use some capitalised words and phrases,
            like the word Agreement. These capitalised words and phrases are
            defined throughout this Agreement and in clause 19. They aid to
            clarify the terms and conditions.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            Please feel free to email us at{" "}
            <a href="mailto:hello@openpharmacy.com" className="underline">
              hello@openpharmacy.com
            </a>{" "}
            if you have any questions.
          </p>
        </section>

        {/* 3. Disclaimer */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            3. Disclaimer
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            OpenPharmacy is a technology platform that facilitates access to
            eScripts and provides related services. We are not a healthcare
            provider and we do not prescribe medication, dispense
            pharmaceuticals or provide medical or diagnostic advice. You should
            always seek advice from a qualified healthcare professional
            regarding your health, prescriptions or medication.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            We do not verify, review, modify or alter your prescription or
            medication details in any way. If you have concerns about your
            prescriptions or medication you must contact a healthcare
            professional or pharmacist directly.
          </p>
        </section>

        {/* 4. Term */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">4. Term</h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            This Agreement will commence when you create an Account for
            OpenPharmacy and will continue for the Subscription Period or until
            the date of termination of this Agreement in accordance with clause
            17.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            If this Agreement is not terminated in accordance with clause 17,
            prior to the expiry of the then current Subscription Period, this
            Agreement will automatically renew for a period equal to the current
            Subscription Period.
          </p>
        </section>

        {/* 5. Licence */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">5. Licence</h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            We grant you a non-transferrable, non-exclusive and revocable
            licence to access OpenPharmacy for the Subscription Period, subject
            to and conditional upon your compliance with the terms and
            conditions of this Agreement.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            The features available to you may be determined by the inclusions
            and usage restrictions set out in the Subscription Package which you
            choose at the time of subscribing to OpenPharmacy. You acknowledge
            and agree that where applicable, if you exceed the usage
            restrictions or wish to make use of alternate or new features of
            OpenPharmacy, you may be required to upgrade your subscription.
          </p>
        </section>

        {/* 6. Payment */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">6. Payment</h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            Unless stated otherwise, any Fees and applicable GST must be paid at
            the beginning of each Subscription Period.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            Unless expressed otherwise, Subscription Fees are quoted in
            Australian Dollars and are inclusive of GST, withholding taxes,
            duties, tariffs and charges imposed or levied in Australia, or
            overseas, in connection with this Agreement.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            You are responsible for all bank fees and charges applied by the
            payment gateway provider, which you choose to use.
          </p>
        </section>

        {/* 7. Requirements for use */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            7. Requirements for use
          </h2>

          <h3 className="text-lg md:text-xl font-medium mb-3">7.1 Access</h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            You acknowledge and agree OpenPharmacy is accessible by users with a
            valid Account. In order to make full use of OpenPharmacy you must
            allow your device access to certain mobile device services including
            data connectivity, email, and storage. If you refuse to grant access
            to those mobile device services, OpenPharmacy may not function as
            anticipated, or at all.
          </p>

          <h3 className="text-lg md:text-xl font-medium mb-3">7.2 Support</h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            Support for OpenPharmacy is provided in accordance with the support
            arrangements as set out on our Website or within the OpenPharmacy
            mobile application and may vary from time to time.
          </p>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            7.3 OpenPharmacy outages and system maintenance
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            If it is necessary to interrupt your use of OpenPharmacy, we will
            endeavour to provide you with reasonable notice (where possible) of
            when, and the anticipated duration for which, OpenPharmacy data
            retreival will be unavailable.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            You acknowledge access to OpenPharmacy may be changed, interrupted
            or discontinued for many reasons, some of which are beyond our
            control and during routine maintenance there may be updates to
            OpenPharmacy which may change the interface and manner in which it
            functions.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            To the maximum extent permitted at law, we are not liable for any
            loss, foreseeable or not, arising from any interruption to access
            OpenPharmacy, whether planned or not, and any such interruptions
            will not constitute a breach by us of this Agreement.
          </p>
        </section>

        {/* 8. Your use of OpenPharmacy */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            8. Your use of OpenPharmacy
          </h2>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            8.1 Registering an Account
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            In order to use OpenPharmacy, you are required to provide us with
            Personal Information and create an Account with us.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            You agree to provide any information reasonably requested by us for
            the purpose of setting up your Account. You warrant that all of the
            information you provide to us is accurate and complete in all
            respects, you will inform us by updating your Account details
            whenever any such information changes and you will not provide false
            or misleading information.
          </p>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            8.2 Account security
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            Maintaining the security of your Account is important to ensuring
            your Personal Information, and that data which we process on your
            behalf, remains safe. We work hard to keep OpenPharmacy secure, and
            we ask you to contribute.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            You agree not to request or allow another person to create an
            Account on your behalf, for your use, or for your benefit, except
            that a legal guardian may create an Account on your behalf. You also
            agree not to disclose your Account security credentials to another
            person or permit them to access your Account. You are responsible
            for the activities undertaken using your Account which occur via
            OpenPharmacy.
          </p>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            8.3 Lawful use of OpenPharmacy
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            You undertake you will not use OpenPharmacy if that use would breach
            any Privacy Law, health data related law or breach any other law or
            applicable code (including any common law, statute, delegated
            legislation, rule or ordinance of the Commonwealth, or a State or
            Territory of Australia or the jurisdiction in which you operate).
          </p>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            8.4 Conduct which is expressly prohibited
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            You may only acquire and make use of OpenPharmacy for the sole
            purpose of meeting your personal, non-commercial needs. You must not
            use or include any part of OpenPharmacy in any service bureau or fee
            generating service offered to third parties.
          </p>
          <ol className="list-[lower-alpha] pl-6 mb-4 text-base md:text-lg font-extralight leading-relaxed text-white/80 space-y-2">
            <li>
              in any way tamper with, hinder or modify OpenPharmacy or any
              systems or databases integrated to it (including third-party or
              government-operated systems or databases);
            </li>
            <li>
              use OpenPharmacy directly or indirectly for any activity or
              transmit any information or material unlawfully, or which is
              obscene, indecent, uses offensive language, defames, abuses,
              harasses, stalks, threatens, menaces or offends any person;
            </li>
            <li>
              knowingly transmit any viruses or other disabling features to or
              via OpenPharmacy;
            </li>
            <li>
              intentionally disable or circumvent any protection or disabling
              mechanism of OpenPharmacy or in any integrated third party system;
            </li>
            <li>
              access, retrieve, modify or use any data or information (including
              personal or health information) made available through
              OpenPharmacy, except as expressly authorised by us or the relevant
              Third Party Services provider;
            </li>
            <li>
              install or store any software applications, code or scripts on or
              through OpenPharmacy;
            </li>
            <li>
              use OpenPharmacy in any way which could be reasonably expected to
              interfere with or damage our systems, any other operator&apos;s
              systems, or another user&apos;s enjoyment of OpenPharmacy; or
            </li>
            <li>
              attempt, facilitate or assist another person to do any of the
              above acts.
            </li>
          </ol>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            8.5 Our right to suspend
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            We reserve the right to limit or suspend your licence to access
            OpenPharmacy if you fail to pay the Subscription Fee where
            applicable, or if in our reasonable opinion, you are in breach of
            any of your obligations or warranties in this Agreement. Suspending
            your account will not constitute a breach of this Agreement by us,
            nor will it alter your obligation to pay the Subscription Fee.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            We may also suspend your account if we suspect a security breach
            associated with your account or otherwise identify unusual activity.
          </p>
        </section>

        {/* 9. App Marketplace Providers */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            9. App Marketplace Providers
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            The OpenPharmacy mobile applications are available from Google Play
            and the Apple App Store (App Marketplace Providers).
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            This Agreement is between us and you only. We, and not the App
            Marketplace Provider, are responsible for OpenPharmacy, and we are
            solely responsible for:
          </p>
          <ul className="list-disc pl-6 mb-4 text-base md:text-lg font-extralight leading-relaxed text-white/80 space-y-2">
            <li>its support and maintenance;</li>
            <li>
              the investigation, defence, settlement and discharge of any claim
              which relates to an infringement of third-party Intellectual
              Property rights arising from the use of OpenPharmacy; and
            </li>
            <li>
              any claim OpenPharmacy fails to conform to any applicable legal or
              regulatory requirement, including product liability claims and
              claims arising under consumer protection laws.
            </li>
          </ul>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            The App Marketplace Provider&apos;s liability to you is limited to
            the refund of the purchase price of OpenPharmacy and any other
            remedies under consumer protection law. Your right to use the mobile
            version of OpenPharmacy is non-transferable and non-sublicensable,
            except to the extent the App Marketplace Provider permits family
            sharing or like sharing arrangements.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            The App Marketplace Provider may monitor your use of OpenPharmacy
            and is entitled to enforce the terms of this Agreement against you.
            You agree to submit to their legitimate enforcement activities.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            If there is any inconsistency between this Agreement and the
            application use rules set out in the App Marketplace Provider&apos;s
            terms of service, their terms of service will prevail to the extent
            of the inconsistency.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            You represent and warrant that you are not located in a country that
            is subject to a U.S. Government embargo, or that has been designated
            by the U.S. Government as a “terrorist supporting” country and you
            are not listed on any U.S. Government list of prohibited or
            restricted parties.
          </p>
        </section>

        {/* 10. Privacy */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">10. Privacy</h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            You agree and consent to us obtaining and handling your Personal
            Information in accordance with our Privacy Policy. We may amend our
            Privacy Policy in our sole discretion. If we amend our Privacy
            Policy, we will post the new version on our Website.
          </p>
        </section>

        {/* 11. Third Party Services */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            11. Third Party Services
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            Certain components or features of OpenPharmacy may be integrated
            with applications, systems, databases or include APIs, links, data,
            information, resources, services and/or content such as eScripts
            obtained from the National Prescription Delivery Service or the
            Active Script List, that are provided or operated by third party
            service providers, including authorised third party healthcare
            providers (Third Party Services).
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            You acknowledge and agree that, subject to any Non-excludable
            Condition, we are not liable for:
          </p>
          <ul className="list-disc pl-6 mb-4 text-base md:text-lg font-extralight leading-relaxed text-white/80 space-y-2">
            <li>the availability of such Third Party Services;</li>
            <li>
              any data, information, content, advertising or materials made
              available through such Third Party Services; or
            </li>
            <li>
              any damages you incur or allege to incur, either directly or
              indirectly as a result of your use and/or reliance upon any such
              Third Party Services.
            </li>
          </ul>
        </section>

        {/* 12. Confidentiality */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            12. Confidentiality
          </h2>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            12.1 Confidentiality
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            A party will not, without the prior written approval of the other
            party, disclose the other party&apos;s Confidential Information.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            Notwithstanding any other provision of this clause 12, a party may
            disclose the terms of this Agreement to its related companies,
            solicitors, auditors, insurers and accountants.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            Each party will take all reasonable steps to ensure that its
            employees, agents, and any sub-contractors engaged for the purposes
            of the Agreement do not make public or disclose the other
            party&apos;s Confidential Information.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            A party will not be in breach of this clause 12 in circumstances
            where it is legally compelled to disclose the other party&apos;s
            Confidential Information.
          </p>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            12.2 Permitted Disclosures
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            We may disclose information, including, but not limited to, your
            Personal Information including any health data or a transmission
            made using OpenPharmacy, in order to comply with a court order,
            subpoena, summons, discovery order, warrant, statute, regulation,
            governmental request, to protect our legal rights, prevent harm to
            persons or where such disclosure is necessary to the proper
            operation of OpenPharmacy (Permitted Disclosures).
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            You acknowledge and agree, we have no obligation to inform you if
            Permitted Disclosures are made.
          </p>
        </section>

        {/* 13. User Content and Intellectual Property */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            13. User Content and Intellectual Property
          </h2>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            13.1 Your User Content
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            If you provide us with content, including, without limitation,
            governmental or security credentials, text, photos, images, your
            prescriptions, medication or related health data and any other
            materials (User Content), your User Content stays yours. This
            Agreement does not transfer ownership of User Content to us.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            When you provide User Content, you grant us a non-exclusive,
            worldwide, perpetual, royalty-free, sublicensable, transferable
            right and license to use, host, store, reproduce, modify, create
            derivative works of (such as those resulting from translations,
            adaptations or other changes we make so that User Content works
            better with OpenPharmacy), communicate, publish and distribute User
            Content for the purposes of allowing us to provide, improve, promote
            and protect OpenPharmacy. You waive any claims against us relating
            to any moral rights or similar rights worldwide that you may have in
            the User Content.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            You represent that you own all rights to your User Content or
            otherwise have (and will continue to have) all rights and
            permissions to legally use, share, display, transfer and license
            your User Content to the extent that it is used within OpenPharmacy.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            While we reserve the right to take down any User Content which is in
            breach of this Agreement, you acknowledge and agree we are not
            required to monitor User Content, nor are we responsible for it.
          </p>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            13.2 Use of our Intellectual Property
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            We warrant we own or have a licence to use the Intellectual Property
            in OpenPharmacy. You must not do any of the following, assist anyone
            to do any of the following or permit any person over whom you have
            effective control to:
          </p>
          <ol className="list-[lower-alpha] pl-6 mb-4 text-base md:text-lg font-extralight leading-relaxed text-white/80 space-y-2">
            <li>
              create an adaptation or translation of, all or part of
              OpenPharmacy in any way;
            </li>
            <li>
              use OpenPharmacy in a manner which may infringe any other person’s
              Intellectual Property;
            </li>
            <li>
              incorporate all or part of OpenPharmacy in any other webpage,
              site, application or other digital or non-digital format;
            </li>
            <li>
              attempt to conduct penetration testing or otherwise access the
              OpenPharmacy servers other than via the unmodified mobile
              application itself; or
            </li>
            <li>
              except to the extent that reproduction occurs automatically
              through its ordinary use, directly or indirectly copy, recreate,
              decompile, reverse engineer or otherwise obtain, modify or use any
              source or object code, content, architecture, or algorithms
              contained in OpenPharmacy.
            </li>
          </ol>
        </section>

        {/* 14. Warranties */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            14. Warranties
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            Subject to the Non-excludable Conditions and to the maximum extent
            permitted at law, we make no warranties or guarantees that
            OpenPharmacy is fault free, regarding OpenPharmacy’s fitness for any
            particular purpose which we have not expressed, or regarding your
            access to, or the results of your access to, OpenPharmacy including
            its correctness, accuracy, timeliness, completeness, reliability or
            otherwise.
          </p>
        </section>

        {/* 15. Limitation of liability */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            15. Limitation of liability
          </h2>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            15.1 Implied conditions
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            We expressly exclude all conditions, warranties and other terms
            which might otherwise be implied by any law, regulation, statute,
            common law or law of equity except any Non-excludable Condition.
          </p>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            15.2 Limitation of liability
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            Subject to any Non-excludable Condition and to the maximum extent
            permitted at law, we exclude all other liability for any costs,
            including consequential losses, suffered or incurred directly or
            indirectly by you in connection with this Agreement, including:
          </p>
          <ul className="list-disc pl-6 mb-4 text-base md:text-lg font-extralight leading-relaxed text-white/80 space-y-2">
            <li>OpenPharmacy being temporarily inaccessible for any reason;</li>
            <li>
              incorrect or corrupt, delayed or lost data, or any inputs or
              outputs of OpenPharmacy;
            </li>
            <li>Third Party Services, as set out in clause 11;</li>
            <li>
              computer virus, trojan and other malware in connection with
              OpenPharmacy;
            </li>
            <li>the occurrence of an Event of Force Majeure; or</li>
            <li>
              any act or omission by you, your personnel, your associates or any
              related body corporate under or in relation to this Agreement.
            </li>
          </ul>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            15.3 Limits to liability associated with goods and services
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            To the maximum extent possible under the law, we limit our liability
            for any breach to: in the case of goods, the re-supply of the goods
            or payment of the cost of the re-supply of the goods, or the
            replacement or repair of the goods or payment of the cost of
            replacement or repair of the goods; and in the case of services, the
            resupply of the services or the payment of the cost of having the
            services resupplied.
          </p>
        </section>

        {/* 16. Dispute Resolution */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            16. Dispute Resolution
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            A party claiming a dispute has arisen under this Agreement (Dispute)
            must give written notice to the other party specifying the nature of
            the Dispute. The parties must submit themselves to the dispute
            resolution procedure set out in this clause 16 before commencing any
            legal proceedings.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            If the parties cannot resolve the Dispute between themselves within
            30 days, then either party may require the Dispute to be referred
            for mediation. The mediation must be undertaken in accordance with
            the Resolution Institute Mediation Rules, within the jurisdiction of
            the Agreement and, unless otherwise agreed between the parties,
            using a mediator nominated by the Resolution Institute. If the
            Dispute is not resolved within 30 days of the mediation commencing
            either party may commence proceedings in respect of the Dispute.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            Each party must pay its own internal and legal costs in relation to
            complying with this clause 16. The mediator’s costs are to be shared
            equally.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            The parties acknowledge and agree this clause 16 does not apply to
            the recovery of any debt or prevent a party from instituting
            proceedings for the purposes of seeking urgent injunctive or similar
            interim relief from a court.
          </p>
        </section>

        {/* 17. Termination */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            17. Termination
          </h2>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            17.1 Termination by either party
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            Either party may terminate this Agreement immediately on notice if
            the other party commits a material breach of this Agreement and the
            breach is incapable of being remedied or if the breach is capable of
            being remedied, the party in breach has failed to remedy the breach
            within 14 days after the receipt of notice to remedy.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            We may end this Agreement if any third party that provides services
            or integrations for OpenPharmacy, ceases to provide its services to
            us, suspends performance or terminates their agreement with us for
            any reason whatsoever, or if your Account remains suspended for a
            period of more than 30 days.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            Either party may terminate this Agreement immediately by notice in
            writing to the other party.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            Notwithstanding anything to the contrary, closing your Account
            constitutes notice in writing to us of your intention to terminate.
            You acknowledge and agree that if we provide notice in writing via
            email, then that constitutes sufficient notice in writing from us
            and is effective from the date the email was sent.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            Termination of this Agreement occurs at the end of the Subscription
            Period during which the notice was given.
          </p>

          <h3 className="text-lg md:text-xl font-medium mt-4">
            17.2 Actions upon termination
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            Upon termination you must immediately stop using OpenPharmacy; we
            reserve the right to permanently erase any data associated with your
            Account; you will no longer have access to your Account; and you
            must not attempt to access OpenPharmacy or register a new Account
            without our prior written consent.
          </p>
        </section>

        {/* 18. General */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">18. General</h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
            <strong>Assignment –</strong> Neither party may assign, encumber,
            declare a trust over or otherwise create an interest in its rights
            in this Agreement without the other party’s consent, which must not
            be unreasonably withheld.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
            <strong>Entire Agreement –</strong> This Agreement contains the
            entire agreement between the parties about its subject matter. Any
            previous understanding, agreement, representation or warranty
            relating to that subject matter is replaced by this Agreement and
            has no further effect.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
            <strong>Governing law –</strong> The laws of Queensland govern this
            Agreement. The parties submit to the exclusive jurisdiction of
            courts exercising jurisdiction there.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
            <strong>Notices –</strong> The parties agree all notices,
            disclosures and other communications that are provided in accordance
            with this clause, satisfy any legal requirement that such
            communications be in writing. Any communication under or in
            connection with this Agreement:
          </p>
          <ul className="list-disc pl-6 mb-2 text-base md:text-lg font-extralight leading-relaxed text-white/80 space-y-2">
            <li>
              which we send to you, will be sent to the email address provided
              to us in your Account and by accepting these terms you give your
              consent to receive communications from us by email; and
            </li>
            <li>
              which you send, must be either delivered or posted by prepaid post
              to our registered office or sent by email to our email address set
              out at clause 2.2.
            </li>
          </ul>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
            <strong>Relationship –</strong> Nothing in this Agreement is
            intended to create or be construed as creating a relationship of
            agency, joint venture or partnership between any of the parties.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
            <strong>Severability –</strong> Any provision of this Agreement
            which is unenforceable or partly unenforceable is, where possible,
            to be severed to the extent necessary to make this Agreement
            enforceable, unless this would materially change its intended
            effect.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            <strong>Variations to this Agreement –</strong> We may vary this
            Agreement by giving one month written notice to you. If you do not
            accept the terms of the variation, you may terminate your
            subscription in accordance with clause 17.1. The variation takes
            effect at the beginning of the next Subscription Period.
          </p>
        </section>

        {/* 19. Definitions */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            19. Definitions
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            Unless the terms and conditions of the Agreement state otherwise,
            the following expressions used in this Agreement have the following
            meanings:
          </p>
          <dl className="space-y-3 text-base md:text-lg font-extralight leading-relaxed text-white/80">
            <div>
              <dt className="font-medium">Account or OpenPharmacy Account</dt>
              <dd>
                means the username and access credentials used when you access
                OpenPharmacy.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Agreement</dt>
              <dd>
                means these terms and conditions and any document incorporated
                into them by reference.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Confidential Information</dt>
              <dd>
                means information that is by its nature confidential, including
                but not limited to information relating to either party’s
                personnel, policies, practices, clientele, business strategies,
                health data, Personal Information, Intellectual Property rights,
                the system operations associated with OpenPharmacy and security
                credentials. But does not include information already rightfully
                known to the receiving party at the time of disclosure by the
                other party or in the public domain other than as a result of a
                disclosure in breach of its obligations of confidentiality under
                this Agreement.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Event of Force Majeure</dt>
              <dd>
                means an act of war (whether declared or not) or terrorism, the
                mobilisation of armed forces, civil commotion or riot, natural
                disaster, health epidemic, industrial action or labour
                disturbance, currency restriction, embargo, action or inaction
                by a government, a failure of a supplier, public utility or
                common carrier or computer disruption due to the effects of a
                computer virus, trojan, malware, a ransomware attack or other
                malicious code.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Intellectual Property</dt>
              <dd>
                means all present and future rights conferred by statute, common
                law or equity (and all moral rights) in or in relation to
                business names, domain names, circuit layouts, computer code,
                confidential information, copyright, designs, formulas,
                inventions, knowhow, patents, plant varieties, recipes,
                trademarks, and other results of intellectual activity in the
                industrial, commercial, scientific, literary or artistic field,
                the benefit of any application to register such a right and the
                benefit of any renewal or extension of such a right.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Non-excludable Condition</dt>
              <dd>
                means any guarantee, condition or warranty (such as the consumer
                guarantees implied by the Competition and Consumer Act 2010
                (Cth)), which cannot by law be excluded.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Personal Information</dt>
              <dd>
                means information or an opinion about an identifiable individual
                (not a company), whether or not that information or opinion is
                true or in a material form.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Privacy Law</dt>
              <dd>
                means both the privacy laws in the jurisdiction in which you
                operate and the Privacy Act 1988 (Cth) incorporating the
                Australian Privacy Principles.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Privacy Policy</dt>
              <dd>
                means the privacy policy available on our Website as amended by
                us from time to time.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Subscription Fee</dt>
              <dd>
                means the periodic price for any OpenPharmacy Subscription
                Package as set out on our Website or within OpenPharmacy itself,
                and if no price is specified then the use of OpenPharmacy is
                free.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Subscription Package</dt>
              <dd>
                means any of the subscription packages advertised on our Website
                from time to time.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Subscription Period</dt>
              <dd>
                means the period of time attached to the Subscription Package
                which you sign up for. If no period is specified, then the
                Subscription Period is 1 month.
              </dd>
            </div>
            <div>
              <dt className="font-medium">You or your</dt>
              <dd>means the person using OpenPharmacy.</dd>
            </div>
            <div>
              <dt className="font-medium">Us, we or our</dt>
              <dd>means EASY AS HEALTH PTY LTD ACN 673 356 977.</dd>
            </div>
            <div>
              <dt className="font-medium">Website</dt>
              <dd>
                means the website located at{" "}
                <a
                  href="https://www.openpharmacy.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  https://www.openpharmacy.com/
                </a>{" "}
                and any of its subdomains.
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </Layout>
  );
}

export default TermsOfService;
