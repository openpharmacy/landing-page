// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import HowItWorks from "./pages/HowItWorks";
import FAQ from "./pages/FAQ";
import BlogIndex from "./pages/BlogIndex";

// Blog post pages — import each post component and add a <Route> below.
// Also add the slug to scripts/prerender.mjs ROUTES and src/data/blog/posts.js.
import BestEscriptAppsAustralia2026 from "./pages/blog/best-escript-apps-australia-2026";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<BlogIndex />} />
        {/* Individual blog post routes — add one per post as created: */}
        <Route path="/blog/best-escript-apps-australia-2026" element={<BestEscriptAppsAustralia2026 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
