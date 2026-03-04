/**
 * prerender.js
 *
 * Vite-native static pre-rendering script.
 * Run via: npm run prerender  (automatically called by npm run build)
 *
 * How it works:
 *  1. Reads the dist/index.html shell produced by `vite build`
 *  2. Loads src/entry-server.jsx via Vite's SSR bundle (dist/server/entry-server.js)
 *  3. For each route, calls render(url) → injects the HTML into the shell
 *  4. Writes dist/<route>/index.html so GitHub Pages serves real HTML to crawlers
 *
 * To add a new route, add it to the `routes` array below.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routes = [
  "/",
  "/how-it-works",
  "/faq",
  "/privacy-policy",
  "/terms-of-service",
];

/**
 * Per-route <head> overrides injected into the prerendered HTML.
 * The homepage values are already in index.html; these patch sub-pages.
 */
const routeMeta = {
  "/how-it-works": {
    title: "How It Works – OpenPharmacy eScript Wallet",
    description:
      "Get started with OpenPharmacy in 3 easy steps. Download the free app, add your eScript tokens, and manage all your Australian prescriptions in one secure place.",
    canonical: "https://openpharmacy.com/how-it-works",
  },
  "/faq": {
    title: "Frequently Asked Questions – OpenPharmacy",
    description:
      "Answers to common questions about OpenPharmacy: security, ADHA compliance, offline access, adding eScripts, family management, and more.",
    canonical: "https://openpharmacy.com/faq",
  },
  "/privacy-policy": {
    title: "Privacy Policy – OpenPharmacy",
    description:
      "OpenPharmacy privacy policy. How Easy As Health Pty Ltd collects, stores and protects your personal and prescription data on Australian servers.",
    canonical: "https://openpharmacy.com/privacy-policy",
  },
  "/terms-of-service": {
    title: "Terms of Service – OpenPharmacy",
    description:
      "Terms of service for the OpenPharmacy eScript wallet app. Read the conditions of use for Australian prescription management.",
    canonical: "https://openpharmacy.com/terms-of-service",
  },
};

async function prerender() {
  const distPath = path.resolve(__dirname, "dist");
  const templatePath = path.resolve(distPath, "index.html");
  const serverEntryPath = path.resolve(distPath, "server", "entry-server.js");

  if (!fs.existsSync(templatePath)) {
    console.error("❌  dist/index.html not found. Run `vite build` first.");
    process.exit(1);
  }
  if (!fs.existsSync(serverEntryPath)) {
    console.error(
      "❌  dist/server/entry-server.js not found. Ensure `vite build --ssr src/entry-server.jsx` ran."
    );
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, "utf-8");
  const { render } = await import(serverEntryPath);

  console.log(`\n🔄  Pre-rendering ${routes.length} routes...\n`);

  for (const route of routes) {
    const appHtml = render(route);
    const meta = routeMeta[route];

    // Inject server-rendered app HTML into the root div
    let html = template.replace(
      `<div id="root"></div>`,
      `<div id="root">${appHtml}</div>`
    );

    // Patch per-route <head> metadata for sub-pages
    if (meta) {
      html = html
        .replace(
          /<title>.*?<\/title>/,
          `<title>${meta.title}</title>`
        )
        .replace(
          /<meta name="description" content=".*?"/,
          `<meta name="description" content="${meta.description}"`
        )
        .replace(
          /<link rel="canonical" href=".*?"/,
          `<link rel="canonical" href="${meta.canonical}"`
        )
        .replace(
          /<meta property="og:url" content=".*?"/,
          `<meta property="og:url" content="${meta.canonical}"`
        )
        .replace(
          /<meta property="og:title" content=".*?"/,
          `<meta property="og:title" content="${meta.title}"`
        )
        .replace(
          /<meta property="og:description" content=".*?"/,
          `<meta property="og:description" content="${meta.description}"`
        )
        .replace(
          /<meta name="twitter:title" content=".*?"/,
          `<meta name="twitter:title" content="${meta.title}"`
        )
        .replace(
          /<meta name="twitter:description" content=".*?"/,
          `<meta name="twitter:description" content="${meta.description}"`
        );
    }

    // Determine output path: "/" → dist/index.html, "/faq" → dist/faq/index.html
    const outputDir =
      route === "/"
        ? distPath
        : path.resolve(distPath, route.replace(/^\//, ""));

    fs.mkdirSync(outputDir, { recursive: true });
    const outputFile = path.resolve(outputDir, "index.html");
    fs.writeFileSync(outputFile, html);

    console.log(`  ✅  ${route} → ${path.relative(__dirname, outputFile)}`);
  }

  console.log(`\n✨  Pre-rendering complete.\n`);
}

prerender().catch((err) => {
  console.error("❌  Pre-rendering failed:", err);
  process.exit(1);
});
