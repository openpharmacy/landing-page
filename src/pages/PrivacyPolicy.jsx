import React, { useEffect } from "react";
import Layout from "../components/Layout";

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const wrapperClasses = "text-white flex flex-col gap-10";
  const sectionClasses = "flex flex-col gap-4";

  return (
    <Layout>
      <h1 className="font-grifter text-4xl md:text-5xl mb-4">
        OpenPharmacy – Privacy Policy
      </h1>
      <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-8">
        EASY AS HEALTH PTY LTD ACN 673 356 977
      </p>

      <div className={wrapperClasses}>
        {/* 1. Background */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            1. Background
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            Thanks for visiting our Privacy Policy (Policy), we are EASY AS
            HEALTH PTY LTD ACN 673 356 977 (EASY AS HEALTH, we, our, us and
            other similar terms). We are committed to providing quality products
            and services to you and this Policy outlines our ongoing obligations
            in respect of how we manage your Personal Information. It applies to
            the terms of use of our software applications that function as an
            electronic prescription manager, integrated with pharmacies and
            doctors, through which users can manage their prescriptions and
            medications, known as ″OpenPharmacy″ (OpenPharmacy), and other
            agreements we may form with you.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            When we talk about Personal Information, we mean information or an
            opinion about an identifiable individual (not a company), whether or
            not that information or opinion is true or in a material form
            (Personal Information).
          </p>
        </section>
        {/* 2. Disclaimer */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            2. Disclaimer
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            While your privacy is important to us, nothing in this Policy
            constitutes a voluntary opt-in to any privacy laws, anywhere in the
            world, which we are not statutorily bound to comply with.
          </p>
        </section>
        {/* 3. Collection of Personal Information */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            3. Collection of Personal Information
          </h2>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            3.1 How EASY AS HEALTH collects Personal Information
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            We collect Personal Information in the ordinary course of our
            business, which is the provision of OpenPharmacy. Personal
            Information is collected when you:
          </p>
          <ol className="list-[lower-alpha] pl-6 text-white/80">
            <li>create an OpenPharmacy account;</li>
            <li>
              contact or correspond with us via email, telephone, the
              OpenPharmacy mobile application or via our website;
            </li>
            <li>
              subscribe to our newsletters or complete surveys and online forms;
            </li>
            <li>provide feedback regarding OpenPharmacy;</li>
            <li>
              use or interact with OpenPharmacy including to access, retrieve,
              manage or share prescriptions and health data;
            </li>
            <li>opt to receive notifications through OpenPharmacy;</li>
            <li>purchase or enquire about OpenPharmacy; and/or</li>
            <li>seek support in relation to OpenPharmacy.</li>
          </ol>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mt-4">
            We also collect and integrate information from authorised digital
            health services such as the National Prescription Delivery Service,
            the Active Script List as permitted under the frameworks developed
            by the Australian Digital Health Agency and services provided by
            other authorised healthcare providers, to be displayed, retrieved,
            managed or shared through OpenPharmacy. By connecting with these
            services, you authorise us to obtain these data on your behalf.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            Information will otherwise only be collected directly from you
            unless you authorise another person, such as a healthcare
            professionals, to provide the information on your behalf.
          </p>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            3.2 What Personal Information is collected?
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            The types of Personal Information we collect include your name,
            address, telephone number, email, date of birth, IP address, device
            identification and any additional information you provide to us.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            Given the nature of our platform and related services, we also
            collect sensitive information including your prescription and
            medication details such as those retrieved from linked third-party
            digital health data sources, and other health information such as
            your Medicare number, health card details, medical history, current
            medication and healthcare provider details that you choose to
            provide to us or authorise any health care professional to provide
            on your behalf. Except as otherwise permitted by law, we only
            collect such sensitive information where such information is
            reasonably necessary for the purposes of operating and providing
            OpenPharmacy.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            Where you contact us on behalf of your employer or using work email
            addresses, the information you provide often contains information
            about your employment, position and employer’s contact details. In
            those circumstances certain employment information is collected.
          </p>
        </section>
        {/* 4. How EASY AS HEALTH uses Personal Information */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            4. How EASY AS HEALTH uses Personal Information
          </h2>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            4.1 Why we collect Personal Information
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            We collect your Personal Information for the primary purpose of
            providing OpenPharmacy. We may also use your Personal Information
            for secondary purposes closely related to the primary purpose, in
            circumstances where you would reasonably expect such use or
            disclosure.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            Examples of when we may use your Personal Information include:
          </p>
          <ol className="list-[lower-alpha] pl-6  text-white/80">
            <li>informing you about OpenPharmacy;</li>
            <li>
              providing you with access to OpenPharmacy and related services,
              such as retrieving, displaying, sharing and managing prescriptions
              and health data;
            </li>
            <li>
              partnering up with you to facilitate features made available
              through OpenPharmacy;
            </li>
            <li>
              retrieving information through, or verifying your identity when
              linking to Active Script List and other integrated services;
            </li>
            <li>
              sending you notifications related to your prescriptions and health
              data through OpenPharmacy;
            </li>
            <li>improving OpenPharmacy;</li>
            <li>
              administration needs in relation to providing you with
              OpenPharmacy, including the administration of your account;
            </li>
            <li>
              dealing with requests, enquiries or complaints and other customer
              care related activities; and
            </li>
            <li>
              carrying out any activity in connection with a legal, governmental
              or regulatory requirement imposed on us including complying with
              obligations under the healthcare and digital health framework, or
              in connection with legal proceedings, crime or fraud prevention,
              detection or prosecution.
            </li>
          </ol>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            4.2 Direct marketing
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            Where you provide us with consent to do so (e.g. if you have
            subscribed to our email or SMS lists or have indicated that you are
            interested in receiving offers or information from us), we may send
            you marketing communications by email and SMS about products and
            services that we feel may be of interest to you.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            You can opt-out of such communications if you would prefer not to
            receive them in the future by using the “unsubscribe” facility
            provided in the communication itself.
          </p>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            4.3 Surveys or market research
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            We (or an appointed third party) may also conduct surveys or market
            research and may seek other information from you on a periodic
            basis. These surveys will provide us with information that allows
            improvement in the type, quality and the manner in which our goods
            and services are offered to you. You can opt out of participating in
            such surveys or market research using the facilities made available
            to you.
          </p>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            4.4 Use of de-identified data
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            The data we collect may have analytical value to us, our business
            partners and our related entities. We reserve the right to process
            or distribute information we collect through our services. However,
            we will only distribute data which has been de-identified or
            otherwise in accordance with this Policy.
          </p>
        </section>
        {/* 5. Cookies and browser analytics */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            5. Cookies and browser analytics
          </h2>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            5.1 What are cookies
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            Cookies are small text files that are placed on your computer by the
            websites you visit. They are processed and stored by your web
            browser. When you visit a website or engage with a business through
            social media, certain information is collected by cookies. This is
            generally anonymous information and it does not reveal your
            identity. In and of themselves, cookies are harmless and serve
            crucial functions. They are widely used in order to make websites
            work more efficiently and improve the user experience, as well as to
            provide information about the use of a website.
          </p>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            5.2 Why we use cookies
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            By storing and using information about your use of our website,
            including preferences and habits, we are able to make your visit to
            our website more productive. For example, some cookies remember your
            language or preferences so that you do not have to repeatedly make
            these choices.
          </p>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            5.3 We use the following types of cookies:
          </h3>
          <ol className="list-[lower-alpha] pl-6 space-y-2  text-white/80">
            <li>
              <strong>Required cookies.</strong> These are cookies that are
              required for the operation of our website. They include, for
              example, cookies that pass information from one web page to
              another and to use online forms.
            </li>

            <li>
              <strong>Analytical cookies.</strong> These allow us to recognise
              and count the number of visitors and to see how visitors move
              around our website when they are using it. This helps us improve
              how the website works, such as ensuring users can find what they
              need easily. We also use third-party analytical cookies (e.g.
              Google Analytics). Information provided to these services is
              anonymous.
            </li>

            <li>
              <strong>Marketing cookies.</strong> These are used to recognise
              you when you return to our website. This enables us to personalise
              content for you and remember your preferences. These cookies also
              record your visits, the pages viewed and links clicked, so we can
              make our website and communications more relevant to your
              interests.
            </li>
          </ol>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            5.4 How can I remove cookies
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            Your web browser can choose whether or not to accept cookies. Most
            browsers are initially set to accept them. If you do not want your
            browser to use cookies, you can manage and control their use through
            your browser settings, including deleting cookies from your “browser
            history” (cache) when you leave the site. However, if you choose to
            reject cookies, some parts of our website may not function properly.
          </p>
        </section>
        {/* 6. Data retention and security */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            6. Data retention and security
          </h2>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            6.1 Security mechanisms we employ
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            Generally, we store your Personal Information using secure servers
            protected from unauthorised access, modification and disclosure.
            However, like most businesses, we hold some information on our
            staff’s computers (such as emails from you) and where necessary as
            hard copy files (such as printed invoices).
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            Subject to 7.2 (Offshore Transfers), our systems are located in
            Australia and are managed by us and our service providers. Personal
            Information that we store or transmit is protected by security and
            access controls, including username and password authentication,
            multi-factor authentication, and data encryption (such as SSL) where
            appropriate.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            In our dealings with third party service providers, we take care to
            work with subcontractors and service providers who we believe
            maintain an acceptable standard of data security compliance.
          </p>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            6.2 How long we keep your Personal Information
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            We retain your Personal Information for as long as is necessary to
            provide OpenPharmacy, as required for our internal business
            operations, and to comply with our legal obligations.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            If we hold Personal Information about you, and we do not need that
            information for any purpose, we will take reasonable steps to
            destroy or de-identify that information, in accordance with the
            Australian Privacy Principles (APP) and the European Union General
            Data Protection Regulation (GDPR), unless we are prevented from
            doing so by law.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            Under Australian law, financial records, such as those relating to
            financial transactions, must be retained for 7 years after the
            transactions associated with those records are completed.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            If you no longer want us to use your Personal Information, you can
            request that we erase it and, where you have an account with us,
            close your account. Where possible we will do so in accordance with
            the APPs and GDPR. However, where you request the erasure of your
            Personal Information we will retain information from deleted
            accounts as necessary for our legitimate business interests, to
            comply with the law, prevent fraud, collect fees, resolve disputes,
            troubleshoot problems, assist with investigations or requests by
            government, healthcare regulators, a court of law, or law
            enforcement authorities, enforce the terms of service and take other
            actions permitted by law. Any information we retain will be handled
            in accordance with this Policy.
          </p>
        </section>
        {/* 7. Disclosure of your Personal Information */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            7. Disclosure of your Personal Information
          </h2>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            7.1 Who we share your Personal Information with?
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            Your Personal Information may be disclosed to:
          </p>

          <ol className="list-[lower-alpha] pl-6 mb-4 space-y-2 text-white/80">
            <li>
              our employees, a related company and our professional advisers
              (lawyers, accountants, financial advisers, etc.);
            </li>
            <li>
              regulators and government authorities in connection with our
              compliance procedures and obligations, including healthcare
              regulators or law enforcement agencies to assist in the
              investigation and prevention of criminal activities;
            </li>
            <li>
              a third party, in order to enforce or defend our rights, or to
              address financial or reputational risks;
            </li>
            <li>
              third party contractors, partners, suppliers and service providers
              with whom we have a business association, including:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  authorised healthcare providers (including pharmacies, doctors
                  and healthcare providers) in order to deliver our services via
                  OpenPharmacy;
                </li>
                <li>administration service providers;</li>
                <li>marketing service providers;</li>
                <li>
                  information technology service providers, including cloud
                  application providers.
                </li>
              </ul>
            </li>
          </ol>

          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            We will not disclose your Personal Information other than in
            accordance with this Policy without your consent.
          </p>

          <h3 className="text-lg md:text-xl font-medium mb-3">
            7.2 Offshore transfers
          </h3>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            We may store or distribute your Personal Information to third party
            contractors, service providers and suppliers with whom we have a
            business association. Our engagement of service providers, such as
            those who operate cloud services, may have international data
            centres and disaster recovery sites. Consequently, these providers
            may have access to your information offshore. We rely solely on
            reputable organisations for such cloud services.
          </p>
        </section>
        {/* 8. Anonymity and use of pseudonyms */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            8. Anonymity and use of pseudonyms
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            If you contact us with a general enquiry, we may interact with you
            anonymously or through the use of pseudonyms. However, you are
            required to provide true and accurate details when requesting the
            supply of goods or provision of services. You agree you will provide
            accurate information if we require it.
          </p>
        </section>
        {/* 9. Access to Personal Information and corrections */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            9. Access to Personal Information and corrections
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            We endeavour to only hold Personal Information that is accurate,
            complete and up-to-date. You have the right to make a request to
            access Personal Information which we hold about you and to request
            corrections of any errors in that data. To make an access or
            correction request, contact us using the contact details provided at
            the end of this Policy.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            If you have an account with us, you can access some of the Personal
            Information that we collect about you. By logging into your account,
            you can update or correct certain information.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            In order to protect your Personal Information, when you contact us,
            we may require identification from you before releasing the
            requested information or making the correction.
          </p>
        </section>
        {/* 10. Additional rights for EU residents and citizens */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            10. Additional rights for EU residents and citizens
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            For the purposes of the GDPR, we are a ‘data controller’ of Personal
            Information. If you’re a citizen or resident of the European
            Economic Area, the following rights apply to you.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            You are entitled to ask us to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1  text-white/80">
            <li>
              port your Personal Information (transfer in a structured, commonly
              used and machine-readable format);
            </li>
            <li>erase your Personal Information;</li>
            <li>restrict its processing;</li>
          </ul>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            You also have rights to object to some processing that is based on
            our legitimate interests, such as profiling that we perform for the
            purposes of direct marketing, and, where we have asked for your
            consent to process your data, to withdraw this consent.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            These rights are limited in some situations – for example, where we
            can demonstrate that we have a legal requirement to process your
            Personal Information. In some instances, this means that we may
            retain some data even if you withdraw your consent.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            Where we require your Personal Information to comply with legal or
            contractual obligations, then provision of such data is mandatory
            and if you do not provide it then we will not be able to manage our
            contractual relationship with you, or to meet obligations placed on
            us. In those cases, you must provide us with your Personal
            Information, otherwise the provision of requested Personal
            Information is optional.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            If you have unresolved concerns, you also have the right to complain
            to data protection authorities. The relevant data protection
            authority will be the authority in the country:
          </p>
          <ul className="list-disc pl-6 space-y-1  text-white/80">
            <li>of your habitual residence;</li>
            <li>of your place of work; or</li>
            <li>
              in which you consider the alleged infringement has occurred.
            </li>
          </ul>
        </section>
        {/* 11. Communications and privacy concerns */}
        <section className={`${sectionClasses} mb-8`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            11. Communications and privacy concerns
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            Your privacy is important to us. If you have any complaints,
            concerns or questions about our handling of your Personal
            Information, we ask that you first contact our privacy officer whose
            contact details are listed below. We will investigate your complaint
            and reply to you in writing if you provide us with contact details
            and request us to do so.
          </p>

          <p className="mt-4 font-medium">Email:</p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            hello@openpharmacy.com
          </p>

          <p className="mt-4 font-medium">Post:</p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            516/420 Queen Street,
            <br />
            Brisbane City, QLD 4000, Australia
          </p>

          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mt-6">
            If, after we have conducted our investigations, you are still not
            satisfied, then we ask you to consult with the Office of the
            Australian Information Commissioner:
          </p>

          <p className="mt-4 font-medium">Email:</p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            enquiries@oaic.gov.au
          </p>

          <p className="mt-4 font-medium">Telephone:</p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            1300 363 992 (from overseas +61 2 9284 9749)
          </p>

          <p className="mt-4 font-medium">Post:</p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            GPO Box 5218
            <br />
            Sydney NSW 2001
          </p>
        </section>
        {/* 12. Variations to this Policy */}
        <section className={`${sectionClasses} mb-12`}>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            12. Variations to this Policy
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            We will need to change this Policy from time to time in order to
            make sure it stays up to date with the latest legal requirements and
            any changes to our privacy management practices.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            When we do change the Policy, we’ll make sure to notify you about
            such changes, where required. A copy of the latest version of this
            Policy will always be available on this page.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 italic mt-4">
            This Policy was last updated on 19 November 2025.
          </p>
        </section>
      </div>
    </Layout>
  );
}

export default PrivacyPolicy;
