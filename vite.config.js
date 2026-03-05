import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

/**
 * staticPrerenderPlugin
 *
 * A zero-dependency Vite plugin that writes static HTML files for every
 * route after the Rollup bundle is emitted. Each file gets the same
 * shell as index.html but with inline page content injected into
 * <noscript id="static-content"> so AI crawlers and search engines see
 * real text even without executing JavaScript.
 *
 * No Puppeteer, no headless browser, no Chrome download — just Node fs.
 */
function staticPrerenderPlugin() {
  // Per-route metadata and body content for crawlers.
  const routes = {
    "/": {
      title: "OpenPharmacy — Secure Digital Wallet for Australian eScripts",
      description:
        "OpenPharmacy is Australia's secure eScript wallet app. Store, view, and share your electronic prescriptions — offline, encrypted, and ADHA-conformant. Free on iOS and Android.",
      canonical: "https://openpharmacy.com/",
      body: `
        <h1>Digital Scripts, Done Right</h1>
        <p>Your secure digital wallet for Australian electronic prescriptions, fully compliant with ADHA standards.
        Its robust security simplifies storing, accessing, and sharing your scripts with ease.
        Enjoy seamless prescription management.</p>
        <p>Download on the <a href="https://apps.apple.com/au/app/openpharmacy/id6751562406">App Store</a>
        or <a href="https://play.google.com/store/apps/details?id=com.openpharmacy.production&hl=en_AU">Google Play</a>.</p>
      `,
    },
    "/how-it-works": {
      title: "How It Works — OpenPharmacy",
      description:
        "Learn how to store and manage your Australian eScripts in three easy steps using OpenPharmacy.",
      canonical: "https://openpharmacy.com/how-it-works",
      body: `
        <h1>3 Easy Steps to Get Started</h1>
        <ol>
          <li><strong>Download OpenPharmacy</strong> — Free on iOS and Android.</li>
          <li><strong>Add Your eScript</strong> — Tap the token link from your doctor's SMS or email, or enter it manually.</li>
          <li><strong>Show at the Pharmacy</strong> — Present your QR code at any Australian pharmacy to fill your prescription.</li>
        </ol>
        <h2>2 Ways to See Your Prescription</h2>
        <h3>Manual</h3>
        <p>Add each eScript token you receive via SMS or email directly into OpenPharmacy.</p>
        <h3>Automatic</h3>
        <p>Connect to My Script List (MySL) and all your active prescriptions sync automatically — no manual entry needed.</p>
      `,
    },
    "/faq": {
      title: "FAQ — OpenPharmacy",
      description:
        "Frequently asked questions about OpenPharmacy, Australian eScripts, ADHA compliance, and prescription management.",
      canonical: "https://openpharmacy.com/faq",
      body: `
        <h1>Frequently Asked Questions</h1>

        <h2>General</h2>
        <h3>How do I create an OpenPharmacy account?</h3>
        <p>Download OpenPharmacy from the App Store or Google Play, choose your sign-in method, and you're ready to go. No pharmacy codes are required.</p>

        <h3>Is there a fee to use OpenPharmacy?</h3>
        <p>OpenPharmacy is entirely free, and you won't encounter any ads while using it.</p>

        <h3>Which devices are compatible with OpenPharmacy?</h3>
        <p>OpenPharmacy is available on iOS (iPhone) and Android devices. Check compatibility on the App Store or Google Play.</p>

        <h3>How secure is my data in OpenPharmacy?</h3>
        <p>OpenPharmacy uses advanced security measures. Data on your device is encrypted when the app is not in use.
        Data sent to and from our Australian servers is protected with end-to-end encryption, and server-stored data is also encrypted.</p>

        <h3>Am I locked into using a specific pharmacy for my prescriptions?</h3>
        <p>No, your prescriptions are yours to fill at any pharmacy you choose.</p>

        <h3>How does OpenPharmacy connect to Australia's ePrescription system?</h3>
        <p>OpenPharmacy integrates securely with Australia's National Prescription Delivery Service through the Medication Knowledge platform.
        This connection ensures compliance with stringent privacy, security, and prescription management standards established by the
        Australian Digital Health Agency and the Department of Health and Aged Care.
        We've undergone rigorous audits to confirm that your prescription data is managed safely.
        You can verify our certification on the ePrescribing conformance register.</p>

        <h3>Does signing in with Google or Apple give them access to my personal information?</h3>
        <p>No, using Google or Apple sign-in only shares your name and email address with OpenPharmacy. No other personal details are sent to them.</p>

        <h2>Scripts</h2>
        <h3>How do I add prescriptions to OpenPharmacy?</h3>
        <p>You can add prescriptions in several ways: Tap the eScript token link sent to you, which opens OpenPharmacy (ensure the app is installed).
        Enter the token manually in the app. Connect to My Script List (MySL) to automatically sync all active prescriptions.</p>

        <h3>How do I obtain an electronic prescription?</h3>
        <p>During your next doctor's visit, request an electronic prescription.
        They'll send it to you via SMS or email with a link to your eScript token (a QR code).
        Tapping the link adds it to OpenPharmacy if the app is installed.</p>

        <h3>Can I view my prescriptions offline?</h3>
        <p>You can view previously added prescriptions in OpenPharmacy without an internet connection. Adding new prescriptions requires online access.</p>

        <h2>Account Management</h2>
        <h3>What is the minimum age to use OpenPharmacy?</h3>
        <p>You must be 18 or older to use OpenPharmacy. Users under 18 require parental or guardian consent.</p>

        <h3>How can I delete my OpenPharmacy account?</h3>
        <p>To delete your account: Open OpenPharmacy, navigate to the Profile section (user icon), and select Delete Account.
        This action is permanent and all data will be lost. If you can't access the app, email hello@openpharmacy.com.</p>
      `,
    },
    "/privacy-policy": {
      title: "Privacy Policy — OpenPharmacy",
      description:
        "OpenPharmacy privacy policy — how we collect, store, and protect your personal and prescription data under Australian law.",
      canonical: "https://openpharmacy.com/privacy-policy",
      body: `
        <h1>Privacy Policy</h1>
        <p>OpenPharmacy is committed to protecting your personal information in accordance with Australian privacy law.
        We collect only the information necessary to provide our prescription management service,
        store it on encrypted Australian servers, and never sell your data to third parties.</p>
        <p>For questions about this policy, contact us at hello@openpharmacy.com.</p>
      `,
    },
    "/terms-of-service": {
      title: "Terms of Service — OpenPharmacy",
      description:
        "Terms and conditions for using the OpenPharmacy eScript wallet app.",
      canonical: "https://openpharmacy.com/terms-of-service",
      body: `
        <h1>Terms of Service</h1>
        <p>By using OpenPharmacy you agree to these terms. OpenPharmacy provides a digital wallet for managing
        Australian electronic prescriptions. You must be 18 or older to use this service.
        Prescriptions must only be used in accordance with Australian law and your healthcare provider's instructions.</p>
        <p>For questions, contact us at hello@openpharmacy.com.</p>
      `,
    },
  };

  return {
    name: "static-prerender",
    // Run after the bundle has been written to disk.
    closeBundle() {
      const outDir = path.resolve("dist");
      const indexHtml = fs.readFileSync(path.join(outDir, "index.html"), "utf8");

      for (const [route, meta] of Object.entries(routes)) {
        // Build a full HTML document from the index.html shell,
        // swapping title / description / canonical and injecting static body.
        let html = indexHtml
          // Replace <title>
          .replace(
            /<title>[^<]*<\/title>/,
            `<title>${meta.title}</title>`
          )
          // Replace primary description
          .replace(
            /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
            `<meta name="description" content="${meta.description}" />`
          )
          // Replace canonical
          .replace(
            /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
            `<link rel="canonical" href="${meta.canonical}" />`
          )
          // Inject static content before </body> so crawlers see it.
          .replace(
            "</body>",
            `<noscript id="static-content" aria-hidden="false" style="display:block">${meta.body}</noscript>\n</body>`
          );

        if (route === "/") {
          // Root route — overwrite dist/index.html in place.
          fs.writeFileSync(path.join(outDir, "index.html"), html);
        } else {
          // Sub-routes — write dist/<route>/index.html
          const routeDir = path.join(outDir, route.slice(1));
          fs.mkdirSync(routeDir, { recursive: true });
          fs.writeFileSync(path.join(routeDir, "index.html"), html);
        }
      }

      console.log(
        `[static-prerender] wrote ${Object.keys(routes).length} pre-rendered HTML files.`
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), staticPrerenderPlugin()],
});
