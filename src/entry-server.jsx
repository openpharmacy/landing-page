// src/entry-server.jsx
// SSR entry point used by scripts/prerender.mjs to render each route to HTML.
// Uses StaticRouter instead of BrowserRouter so React Router works in Node.js.
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import HowItWorks from "./pages/HowItWorks";
import FAQ from "./pages/FAQ";

export function render(url) {
  const html = renderToString(
    <StaticRouter location={url}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </StaticRouter>
  );
  return html;
}
