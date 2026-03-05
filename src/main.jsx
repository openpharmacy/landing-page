import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";

// Client-side hydration — runs in the browser only.
if (typeof window !== "undefined") {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// Prerender export — called by vite-prerender-plugin at build time.
// Renders the full React tree to an HTML string for each route listed in
// vite.config.js → additionalPrerenderRoutes. The output replaces the
// empty <div id="root"> with real content that AI crawlers can read.
export async function prerender(data) {
  const { renderToString } = await import("react-dom/server");
  // StaticRouter is the server-side counterpart to BrowserRouter.
  // It accepts a `location` prop so each route renders its own correct
  // page content rather than always falling back to the homepage.
  const { StaticRouter } = await import("react-router-dom/server");

  const { Routes, Route } = await import("react-router-dom");
  const { default: Main } = await import("./pages/Main.jsx");
  const { default: PrivacyPolicy } = await import("./pages/PrivacyPolicy.jsx");
  const { default: TermsOfService } = await import(
    "./pages/TermsOfService.jsx"
  );
  const { default: HowItWorks } = await import("./pages/HowItWorks.jsx");
  const { default: FAQ } = await import("./pages/FAQ.jsx");

  const html = renderToString(
    <StrictMode>
      <StaticRouter location={data.url}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </StaticRouter>
    </StrictMode>
  );

  return { html };
}
