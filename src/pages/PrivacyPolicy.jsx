import React, { useEffect } from "react";
import Layout from "../components/Layout";

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <h1 className="font-grifter text-4xl md:text-5xl mb-4">
        OpenPharmacy - Privacy Policy
      </h1>
      <p className="text-base md:text-lg font-extralight mb-8">
        Effective Date: 05 May 2025
      </p>
      <div className="prose prose-invert max-w-none">
        <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-8">
          We at OpenPharmacy value your privacy and are committed to protecting
          your personal information. This Privacy Policy outlines how we
          collect, use, store, and disclose your personal information in
          accordance with the Privacy Act 1988 (Cth). By using the OpenPharmacy
          app, you consent to the practices described in this policy.
        </p>
        <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-8">
          In this Privacy Policy, "we," "our," or "us" refers to Easy As Health
          Pty Ltd the developer of OpenPharmacy.
        </p>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            1. What Personal Information We Collect
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            We collect personal information when you use OpenPharmacy, and this
            may include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
              Identification details such as your name, date of birth, address,
              email address, and phone number.
            </li>
            <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
              Prescription details, including your active medications and
              prescriptions retrieved from MySL (Active Script List) and other
              linked health data sources.
            </li>
            <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
              Payment information for subscription services or purchases.
            </li>
            <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
              Device information, such as IP address, device ID, and usage data
              when accessing the app.
            </li>
            <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
              Health information, such as medical history, medications, and
              healthcare provider details (if applicable).
            </li>
          </ul>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            We may also collect sensitive information such as your Medicare
            number, health card details, and any other health-related data
            provided by you or healthcare professionals.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            2. How We Collect Your Personal Information
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            We collect your personal information in various ways, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
              When you sign up to use OpenPharmacy and create an account.
            </li>
            <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
              When you interact with our app (e.g., managing prescriptions,
              receiving medication reminders).
            </li>
            <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
              When you provide personal details through customer support, forms,
              or via third-party services.
            </li>
            <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
              When we integrate data from MySL (Active Script List) and other
              healthcare providers.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            3. Why We Collect Your Personal Information
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            We use your personal information for the following purposes:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
              To provide you with the services and features offered by
              OpenPharmacy, including managing prescriptions and medication.
            </li>
            <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
              To communicate with you regarding your account, service updates,
              and customer support.
            </li>
            <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
              To verify your identity when linking to MySL and other integrated
              services.
            </li>
            <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
              To send you reminders and notifications related to your
              prescriptions and healthcare.
            </li>
            <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
              To conduct research and improve our services, including analytics
              and quality assurance.
            </li>
            <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
              To comply with legal obligations related to healthcare and data
              protection.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            4. How We Use and Disclose Your Personal Information
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            We may use and disclose your personal information:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
              For the purposes of providing our services, including managing
              your prescriptions and health data.
            </li>
            <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
              To third-party healthcare providers who help deliver services via
              the OpenPharmacy app.
            </li>
            <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
              For administrative and operational purposes, including maintaining
              your account.
            </li>
            <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
              To comply with legal requirements, such as sharing your
              information with healthcare regulators or law enforcement if
              required by law.
            </li>
          </ul>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            We will not share your personal information with third parties
            unless it is necessary to provide the services you have requested or
            as required by law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            5. How We Protect Your Personal Information
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            We take your privacy and data security seriously. We use
            industry-standard security measures to protect your personal
            information from unauthorized access, alteration, disclosure, or
            destruction. However, no system can guarantee complete security, so
            while we strive to protect your data, we cannot guarantee the
            security of information transmitted through the app.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            6. Accessing and Correcting Your Personal Information
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            You have the right to access and correct the personal information we
            hold about you. If you would like to view or update your
            information, please contact us via the details provided below. We
            may require verification of your identity before processing your
            request.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            7. How Long We Keep Your Personal Information
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            We will retain your personal information only for as long as
            necessary to fulfill the purposes outlined in this Privacy Policy,
            including to comply with legal obligations, resolve disputes, and
            enforce agreements. When no longer needed, we will take reasonable
            steps to delete or anonymize your personal information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            8. Third-Party Links
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            OpenPharmacy may contain links to third-party websites or services.
            These external sites have their own privacy policies, and we are not
            responsible for their content or practices. We encourage you to
            review the privacy policies of any third-party sites you visit.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            9. Complaints and Disputes
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            If you believe we have violated the Privacy Act 1988 or have
            concerns about how we handle your personal information, please
            contact us. We take complaints seriously and will aim to resolve any
            issues in a timely and transparent manner. If you are unsatisfied
            with our response, you have the right to escalate your complaint to
            the Office of the Australian Information Commissioner (OAIC).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            10. Changes to This Privacy Policy
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. When we make updates, the changes will be
            effective immediately upon publication on our website. Please review
            this policy periodically to stay informed about how we are
            protecting your information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            11. Contact Us
          </h2>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
            If you have any questions about this Privacy Policy or how we handle
            your personal information, please contact us:
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-8">
            Easy As Health Pty Ltd
            <br />
            Email: hello@openpharmacy.com
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 italic">
            By using OpenPharmacy, you acknowledge that you have read and
            understood this Privacy Policy and agree to the collection and use
            of your personal information as outlined above.
          </p>
        </section>
      </div>
    </Layout>
  );
}

export default PrivacyPolicy;
