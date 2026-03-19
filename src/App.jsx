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
import WhatIsAnEscriptWalletAustralia from "./pages/blog/what-is-an-escript-wallet-australia";
import OfflineEscriptAccessAustralia from "./pages/blog/offline-escript-access-australia";
import ManagingFamilyEscriptsAustraliaCarersParents from "./pages/blog/managing-family-escripts-australia-carers-parents";
import WhatIsAdhaConformanceAustralia from "./pages/blog/what-is-adha-conformance-australia";
import PharmacyAppVsIndependentEscriptWalletAustralia from "./pages/blog/pharmacy-app-vs-independent-escript-wallet-australia";
import EscriptAppSecurityPrivacyGuideAustralia from "./pages/blog/escript-app-security-privacy-guide-australia";
import DeletedEscriptSmsWhatToDoAustralia from "./pages/blog/deleted-escript-sms-what-to-do-australia";
import AdhdEscriptManagementAustralia from "./pages/blog/adhd-escript-management-australia";
import AdhdMedicationManagementParentsAustralia from "./pages/blog/adhd-medication-management-parents-australia";
import ManagingChronicIllnessEscriptsAustralia from "./pages/blog/managing-chronic-illness-escripts-australia";
import HowToTrackEscriptRepeatsAustralia from "./pages/blog/how-to-track-escript-repeats-australia";
import ActiveScriptListVsEscriptWalletAustralia from "./pages/blog/active-script-list-vs-escript-wallet-australia";

// Landing pages — use-case specific pages for targeted audiences.
// Also add the path to scripts/prerender.mjs ROUTES.
import RuralAustralia from "./pages/for/RuralAustralia";

// Compare pages — import each comparison component and add a <Route> below.
// Also add the slug to scripts/prerender.mjs ROUTES.
// NOTE: OpenPharmacy vs Scripty comparison is intentionally not linked or routed
// until we have stronger differentiating features to publish. File is preserved
// at src/pages/compare/openpharmacy-vs-scripty.jsx but not registered.
// import OpenPharmacyVsScripty from "./pages/compare/openpharmacy-vs-scripty";
import OpenPharmacyVsMedAdvisor from "./pages/compare/openpharmacy-vs-medadvisor";

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
        <Route path="/blog/what-is-an-escript-wallet-australia" element={<WhatIsAnEscriptWalletAustralia />} />
        <Route path="/blog/offline-escript-access-australia" element={<OfflineEscriptAccessAustralia />} />
        <Route path="/blog/managing-family-escripts-australia-carers-parents" element={<ManagingFamilyEscriptsAustraliaCarersParents />} />
        <Route path="/blog/what-is-adha-conformance-australia" element={<WhatIsAdhaConformanceAustralia />} />
        <Route path="/blog/pharmacy-app-vs-independent-escript-wallet-australia" element={<PharmacyAppVsIndependentEscriptWalletAustralia />} />
        <Route path="/blog/escript-app-security-privacy-guide-australia" element={<EscriptAppSecurityPrivacyGuideAustralia />} />
        <Route path="/blog/deleted-escript-sms-what-to-do-australia" element={<DeletedEscriptSmsWhatToDoAustralia />} />
        <Route path="/blog/adhd-escript-management-australia" element={<AdhdEscriptManagementAustralia />} />
        <Route path="/blog/adhd-medication-management-parents-australia" element={<AdhdMedicationManagementParentsAustralia />} />
        <Route path="/blog/managing-chronic-illness-escripts-australia" element={<ManagingChronicIllnessEscriptsAustralia />} />
        <Route path="/blog/how-to-track-escript-repeats-australia" element={<HowToTrackEscriptRepeatsAustralia />} />
        <Route path="/blog/active-script-list-vs-escript-wallet-australia" element={<ActiveScriptListVsEscriptWalletAustralia />} />
        {/* Landing page routes — use-case specific pages: */}
        <Route path="/for/rural-australia" element={<RuralAustralia />} />
        {/* Compare page routes — add one per comparison page as created: */}
        {/* OpenPharmacy vs Scripty is intentionally hidden — see import comment above */}
        <Route path="/compare/openpharmacy-vs-medadvisor" element={<OpenPharmacyVsMedAdvisor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
