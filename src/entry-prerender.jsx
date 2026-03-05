/**
 * Prerender entry point for vite-prerender-plugin.
 *
 * This file is used exclusively at build time. It renders each route to a
 * static HTML string so crawlers (GPTBot, ClaudeBot, Google-Extended,
 * PerplexityBot) receive fully-populated HTML instead of an empty
 * <div id="root"></div> shell.
 *
 * The client-side React app still hydrates normally after load — this is
 * purely additive and does not change any runtime behaviour.
 *
 * To add a new page: add its route path to the `links` Set returned below.
 */

import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import React from "react";
import App from "./App.jsx";

// Per-route <head> metadata injected into each prerendered HTML file.
// Expand this map as new pages are added or when the full meta rollout lands.
const routeMeta = {
  "/": {
    title: "OpenPharmacy — Secure eScript Wallet for Australian Prescriptions",
    description:
      "OpenPharmacy is a free, ADHA-registered app for Australians to store, view, and share electronic prescriptions. Works offline. End-to-end encrypted. Available on iOS and Android.",
  },
  "/how-it-works": {
    title: "How It Works — OpenPharmacy eScript App",
    description:
      "Get started with OpenPharmacy in 3 steps. Add your eScript token, view your prescriptions offline, and share them with any pharmacy in Australia.",
  },
  "/faq": {
    title: "Frequently Asked Questions — OpenPharmacy",
    description:
      "Answers to common questions about OpenPharmacy: security, ADHA compliance, adding scripts, managing repeats, family management, and offline access.",
  },
  "/privacy-policy": {
    title: "Privacy Policy — OpenPharmacy",
    description:
      "OpenPharmacy privacy policy. All data is stored on Australian servers and protected with end-to-end ASD-approved encryption. We never share your data with third parties.",
  },
  "/terms-of-service": {
    title: "Terms of Service — OpenPharmacy",
    description: "Terms of service for the OpenPharmacy eScript wallet app.",
  },
};

export async function prerender(data) {
  const url = data.url ?? "/";
  const meta = routeMeta[url] ?? routeMeta["/"];

  // Render the React tree to an HTML string using StaticRouter so
  // react-router-dom resolves the correct route for each URL.
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

  return {
    html,
    // Tell the plugin which additional routes to prerender.
    // The plugin will crawl internal <a href> links automatically, but we
    // list all routes explicitly so nothing is missed even if a page is
    // not linked in the current render.
    links: new Set([
      "/",
      "/how-it-works",
      "/faq",
      "/privacy-policy",
      "/terms-of-service",
    ]),
    head: {
      lang: "en",
      title: meta.title,
      elements: new Set([
        {
          type: "meta",
          props: { name: "description", content: meta.description },
        },
        // Open Graph
        {
          type: "meta",
          props: { property: "og:title", content: meta.title },
        },
        {
          type: "meta",
          props: { property: "og:description", content: meta.description },
        },
        {
          type: "meta",
          props: { property: "og:type", content: "website" },
        },
        {
          type: "meta",
          props: {
            property: "og:image",
            content: "https://openpharmacy.com/Logo.svg",
          },
        },
        // Twitter / X Card
        {
          type: "meta",
          props: { name: "twitter:card", content: "summary" },
        },
        {
          type: "meta",
          props: { name: "twitter:title", content: meta.title },
        },
        {
          type: "meta",
          props: { name: "twitter:description", content: meta.description },
        },
        // Canonical URL
        {
          type: "link",
          props: {
            rel: "canonical",
            href: `https://openpharmacy.com${url === "/" ? "" : url}`,
          },
        },
      ]),
    },
  };
}
