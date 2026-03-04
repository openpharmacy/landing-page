import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";

// Client-side entry: hydrate prerendered HTML if present, otherwise mount fresh.
// hydrateRoot is used so React attaches to the server-rendered DOM without
// discarding it — this keeps the prerendered content visible during hydration.
if (document.getElementById("root").hasChildNodes()) {
  hydrateRoot(
    document.getElementById("root"),
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// ---------------------------------------------------------------------------
// Prerender entry point — exported for vite-prerender-plugin at build time.
// This function is called in a Node.js context during `vite build`. It renders
// the app to an HTML string and returns the markup plus the list of routes to
// prerender. The plugin will write a separate index.html into each route dir.
// ---------------------------------------------------------------------------
export async function prerender(data) {
  const { renderToString } = await import("react-dom/server");
  const { StaticRouter } = await import("react-router-dom/server");

  const url = data?.url ?? "/";

  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        {/* Re-declare routes inline so StaticRouter (not BrowserRouter) drives SSR */}
        <AppRoutes />
      </StaticRouter>
    </StrictMode>
  );

  // Page-specific <head> metadata injected by the plugin into the HTML shell.
  const pageMeta = getPageMeta(url);

  return {
    html,
    // Additional routes to prerender beyond what link-crawling finds:
    links: new Set(["/", "/how-it-works", "/faq", "/privacy-policy", "/terms-of-service"]),
    head: pageMeta,
  };
}

// Routes rendered during SSR — mirrors App.jsx but accepts StaticRouter context.
function AppRoutes() {
  const { Routes, Route } = require("react-router-dom");
  const Main = require("./pages/Main").default;
  const PrivacyPolicy = require("./pages/PrivacyPolicy").default;
  const TermsOfService = require("./pages/TermsOfService").default;
  const HowItWorks = require("./pages/HowItWorks").default;
  const FAQ = require("./pages/FAQ").default;

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/faq" element={<FAQ />} />
    </Routes>
  );
}

// Returns per-page <head> elements for the plugin to inject.
function getPageMeta(url) {
  const base = {
    lang: "en",
    elements: new Set([]),
  };

  const pages = {
    "/": {
      title: "OpenPharmacy — Secure Digital Wallet for Australian eScripts",
      description:
        "OpenPharmacy is Australia's secure digital wallet for electronic prescriptions. Store, manage, and share your eScripts offline. ADHA-conformant, end-to-end encrypted, and free on iOS and Android.",
    },
    "/how-it-works": {
      title: "How It Works — OpenPharmacy",
      description:
        "Learn how to add your Australian eScript tokens to OpenPharmacy in 3 easy steps. Connect to My Script List for automatic updates, or add tokens manually from SMS or email.",
    },
    "/faq": {
      title: "Frequently Asked Questions — OpenPharmacy",
      description:
        "Answers to common questions about OpenPharmacy: account setup, prescription security, offline access, ADHA compliance, family management, and the Active Script List (ASL).",
    },
    "/privacy-policy": {
      title: "Privacy Policy — OpenPharmacy",
      description:
        "OpenPharmacy's privacy policy: how your prescription data is collected, stored, and protected on Australian servers with end-to-end ASD-approved encryption.",
    },
    "/terms-of-service": {
      title: "Terms of Service — OpenPharmacy",
      description:
        "Terms of service for the OpenPharmacy app — Australia's ADHA-conformant electronic prescription wallet by Easy As Health Pty Ltd.",
    },
  };

  const meta = pages[url] ?? pages["/"];

  return {
    ...base,
    title: meta.title,
    elements: new Set([
      { type: "meta", props: { name: "description", content: meta.description } },
      { type: "meta", props: { property: "og:title", content: meta.title } },
      { type: "meta", props: { property: "og:description", content: meta.description } },
      { type: "link", props: { rel: "canonical", href: `https://openpharmacy.com${url === "/" ? "" : url}/` } },
    ]),
  };
}
