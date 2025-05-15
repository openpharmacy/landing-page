import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#1c2632] text-white px-4 sm:px-8 md:pl-16 py-4">
      <NavBar />
      <main className="mt-16 md:mt-20">
        <h1 className="font-grifter text-4xl md:text-5xl mb-4">
          OpenPharmacy - Terms of Use
        </h1>
        <p className="text-base md:text-lg font-extralight mb-8">
          Effective Date: 05 May 2025
        </p>

        <div className="prose prose-invert max-w-none">
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-8">
            Welcome to OpenPharmacy! We're delighted to have you on board. Our
            goal is to help you manage your medications and prescriptions with
            ease and confidence. Please read these Terms of Use carefully before
            accessing or using the OpenPharmacy app. These terms outline your
            rights and responsibilities when using the app, and we want to
            ensure you're well-informed every step of the way.
          </p>
          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-8">
            By using OpenPharmacy, you are agreeing to these terms. If you do
            not agree to these terms, please refrain from using the app.
          </p>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-medium mb-4">
              1. Your Agreement
            </h2>
            <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
              These Terms of Use ("Terms") constitute a binding agreement
              between you, the user ("You", "Your"), and Saferhealth Australia
              Pty Ltd ("We", "Our", "Us"), the developer of the OpenPharmacy
              app.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                <strong>Agreement to Terms:</strong> By downloading, accessing,
                or using the OpenPharmacy app, you agree to comply with these
                Terms. If you do not agree with any part of these Terms, please
                do not use the app.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                <strong>Updates to Terms:</strong> We may update these Terms
                occasionally. When updates occur, the new terms will take effect
                immediately once posted. By continuing to use the app, you
                accept any changes to the Terms.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                <strong>App Modifications:</strong> We reserve the right to
                modify, suspend, or discontinue the app at any time, with or
                without notice. While we strive to provide a seamless
                experience, we cannot guarantee that the app will always be
                available or error-free.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-medium mb-4">
              2. Your Account
            </h2>
            <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
              To make the most of OpenPharmacy, you need to create an account.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                <strong>Account Creation:</strong> You must provide accurate
                information when creating your account. This helps us ensure
                that we can serve you effectively. You are responsible for
                maintaining the security of your account and for all activity
                that occurs under your account.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                <strong>Eligibility:</strong> To use the app, you must be at
                least 18 years old or have parental consent if you are under 18.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                <strong>Account Deletion:</strong> You may delete your account
                at any time. To fully remove your account, please follow the
                deletion process outlined within the app. Deleting the app from
                your device does not automatically delete your account.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-medium mb-4">
              3. Your Responsibilities
            </h2>
            <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
              As a user of OpenPharmacy, you agree to:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                Keep your account details, including your password, secure and
                confidential.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                Provide accurate information when using the app and notify us if
                any information needs to be updated.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                Ensure you have internet access and a compatible device to use
                the app effectively.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                Only use the app for personal, non-commercial purposes. Do not
                misuse or attempt to reverse-engineer the app.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                Notify us if you suspect any fraudulent activity or unauthorized
                access to your account.
              </li>
            </ul>
            <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
              You must not:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                Use the app for any illegal or harmful activities, including
                impersonating another person.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                Provide false, misleading, or deceptive information.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                Use the app to harass, defame, or harm other users.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                Modify, adapt, or reverse-engineer the app for any reason.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                Use the app in any way that disrupts or damages the service.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-medium mb-4">
              4. Account Termination
            </h2>
            <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
              We may suspend or terminate your account if we believe you have
              violated these Terms, or if we need to do so for legal reasons.
              You can also terminate your account at any time. If we terminate
              your account, we will not be liable for any losses or damages
              incurred.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-medium mb-4">
              5. ePrescriptions and Medication Management
            </h2>
            <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
              OpenPharmacy allows you to store, manage, and access your
              ePrescriptions. When you add an ePrescription to the app:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                <strong>OpenPharmacy API:</strong> We retrieve information about
                your prescriptions from our OpenPharmacy API service, which is
                fully conformant with Australian Digital Health Agency
                standards.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                We are not able to alter the prescription details in any way.
                You should always verify prescription details with your
                healthcare provider or pharmacy.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                If you have concerns about your ePrescriptions, we recommend
                contacting your doctor or pharmacist directly.
              </li>
            </ul>
            <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
              <strong>Important Disclaimer:</strong> OpenPharmacy is not a
              healthcare service provider, and we do not prescribe medication or
              provide medical advice. For any medical or health-related
              inquiries, please consult with a qualified healthcare
              professional.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-medium mb-4">
              6. MySL Integration
            </h2>
            <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
              OpenPharmacy allows you to link and manage your Active Script List
              (MySL), a registry operated by Medication Knowledge (ABN 47 622
              493 967), which tracks your active prescriptions.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                <strong>Initial Registration:</strong> To use MySL, registration
                must be completed outside of OpenPharmacy, typically at a
                pharmacy or healthcare provider. A healthcare professional will
                verify your identity and initiate the registration and consent
                process.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                <strong>Activation Code:</strong> To link your MySL, you will
                need an Activation Code provided by a healthcare professional
                with access to your MySL account. Note that not all healthcare
                providers may be able to supply this code as some systems do not
                support it.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                <strong>Data Retrieval:</strong> Once linked, OpenPharmacy
                retrieves prescription data from MySL via the OpenPharmacy API.
                This may include:
                <ul className="list-disc pl-6 mt-2">
                  <li>Your details</li>
                  <li>Active prescriptions</li>
                  <li>Healthcare providers with access to your MySL</li>
                </ul>
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                <strong>Active Prescriptions:</strong> The MySL includes only
                active prescriptions where consent was given at the time of
                prescribing. It does not provide a complete prescription history
                and will exclude prescriptions that have been withdrawn or
                revoked.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                <strong>Prescription Visibility:</strong> You can hide or unhide
                individual prescriptions from your healthcare providers through
                OpenPharmacy.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                <strong>Unlinking MySL:</strong> You can unlink your MySL
                account from OpenPharmacy. Unlinking does not delete your MySL
                data, and to delete your MySL, you must contact MySL directly.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                <strong>Concerns:</strong> If you have any concerns about your
                MySL data, please contact your healthcare provider or the MySL
                operator.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-medium mb-4">
              7. Privacy and Your Personal Information
            </h2>
            <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
              We take your privacy seriously. By using the app, you agree to our
              Privacy Policy, which explains how we collect, use, and protect
              your personal information.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                <strong>Personal Data:</strong> When using OpenPharmacy, we may
                collect personal information such as your name, contact details,
                and medication records. We use this data to provide you with a
                personalized experience and comply with applicable laws.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                <strong>Data Sharing:</strong> In certain situations, we may
                share your information with trusted third parties, such as
                pharmacies or healthcare providers, to facilitate your
                prescriptions. We will always ensure that your information is
                protected and shared only in accordance with our Privacy Policy.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                <strong>Security:</strong> We employ robust security measures to
                protect your personal information, but no system is 100% secure.
                We cannot guarantee the security of data transmitted through the
                app.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-medium mb-4">
              8. Intellectual Property
            </h2>
            <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
              We retain ownership of all intellectual property associated with
              OpenPharmacy. This includes the design, content, and functionality
              of the app. You may not reproduce, distribute, or otherwise use
              the app's content without our written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-medium mb-4">
              9. Warranties and Disclaimers
            </h2>
            <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-4">
              We strive to provide a high-quality app, but we cannot guarantee
              that the app will always be error-free or available without
              interruption.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                <strong>No Warranty:</strong> The app is provided "as is," and
                we make no warranties about its functionality or availability.
              </li>
              <li className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mb-2">
                <strong>Limitations:</strong> We are not responsible for any
                loss or damage caused by the app, including loss of data,
                revenue, or opportunity, unless such damage is caused by our
                negligence.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-medium mb-4">
              10. Liability
            </h2>
            <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
              To the fullest extent permitted by law, we are not liable for any
              indirect, special, or consequential damages arising from your use
              of the app. This includes damages related to loss of data,
              emotional distress, or business disruptions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-medium mb-4">
              11. Governing Law and Jurisdiction
            </h2>
            <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80">
              These Terms are governed by the laws of Queensland, Australia. Any
              disputes related to these Terms will be resolved under the
              jurisdiction of Australian courts.
            </p>
          </section>

          <p className="text-base md:text-lg font-extralight leading-relaxed text-white/80 mt-8 italic">
            By using OpenPharmacy, you acknowledge that you have read and
            understood these Terms of Use, and agree to comply with them. We're
            excited to be part of your journey toward better health management!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default TermsOfService;
