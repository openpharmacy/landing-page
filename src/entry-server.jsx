// src/entry-server.jsx
// SSR entry point used by prerender.js to generate static HTML at build time.
// This file is NOT bundled into the client build — it is only used during
// the `npm run prerender` step via Vite's SSR mode.
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import Main from "./pages/Main";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import HowItWorks from "./pages/HowItWorks";
import FAQ from "./pages/FAQ";

const routes = {
  "/": Main,
  "/how-it-works": HowItWorks,
  "/faq": FAQ,
  "/privacy-policy": PrivacyPolicy,
  "/terms-of-service": TermsOfService,
};

export function render(url) {
  const Page = routes[url] ?? Main;
  const html = renderToString(
    <StaticRouter location={url}>
      <Page />
    </StaticRouter>
  );
  return html;
}
