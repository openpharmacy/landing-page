// src/App.jsx
//
// App contains only the route definitions — no router wrapper.
// The router is provided by the caller:
//   - main.jsx wraps App in <BrowserRouter> for the browser runtime
//   - entry-prerender.jsx wraps App in <StaticRouter> at build time
//
// This separation is what allows vite-prerender-plugin to render each
// route to static HTML without a nested-router conflict.

import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import HowItWorks from "./pages/HowItWorks";
import FAQ from "./pages/FAQ";

function App() {
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

export default App;
