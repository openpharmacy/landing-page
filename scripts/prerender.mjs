/**
 * Pre-render script for OpenPharmacy landing page.
 *
 * Runs AFTER `vite build` — starts a local server, visits each route
 * with Puppeteer, captures the fully-rendered HTML, and writes it
 * back to dist/ so crawlers see real content instead of an empty shell.
 *
 * Usage: node scripts/prerender.mjs
 */

import { createServer } from "http";
import { readFile, writeFile, mkdir, copyFile } from "fs/promises";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const DIST = join(__dirname, "..", "dist");
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

// All routes to pre-render.
// When adding a new blog post, append its slug here as "/blog/<slug>".
// Also update src/App.jsx (import + Route) and src/data/blog/posts.js.
const ROUTES = [
  "/",
  "/faq",
  "/how-it-works",
  "/privacy-policy",
  "/terms-of-service",
  "/blog",
  // Blog post routes — add one per post as created:
  "/blog/best-escript-apps-australia-2026",
  "/blog/what-is-an-escript-wallet-australia",
  "/blog/offline-escript-access-australia",
  "/blog/managing-family-escripts-australia-carers-parents",
  "/blog/what-is-adha-conformance-australia",
  "/blog/pharmacy-app-vs-independent-escript-wallet-australia",
  "/blog/escript-app-security-privacy-guide-australia",
  "/blog/deleted-escript-sms-what-to-do-australia",
  "/blog/adhd-escript-management-australia",
  "/blog/adhd-medication-management-parents-australia",
  // Compare page routes — add one per comparison page as created:
  // NOTE: "/compare/openpharmacy-vs-scripty" is intentionally excluded until
  // we have stronger differentiating features to publish.
  "/compare/openpharmacy-vs-medadvisor",
];

// MIME types for the local static server
const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".json": "application/json",
  ".otf": "font/otf",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".webp": "image/webp",
};

/**
 * Start a simple static file server with SPA fallback.
 * Serves files from dist/, falling back to index.html for unknown paths.
 */
function startServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const url = new URL(req.url, BASE_URL);
      let filePath = join(DIST, url.pathname);

      // If path has no extension, try serving as directory with index.html
      const ext = extname(filePath);
      if (!ext) {
        filePath = join(filePath, "index.html");
      }

      try {
        const content = await readFile(filePath);
        res.setHeader(
          "Content-Type",
          MIME_TYPES[extname(filePath)] || "application/octet-stream"
        );
        res.end(content);
      } catch {
        // SPA fallback — serve index.html for any unmatched route
        try {
          const index = await readFile(join(DIST, "index.html"));
          res.setHeader("Content-Type", "text/html");
          res.end(index);
        } catch {
          res.statusCode = 500;
          res.end("Server error");
        }
      }
    });

    server.listen(PORT, () => {
      console.log(`Static server running at ${BASE_URL}`);
      resolve(server);
    });
  });
}

async function prerender() {
  console.log("\nPre-rendering OpenPharmacy routes...\n");

  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const route of ROUTES) {
    const page = await browser.newPage();

    // Capture browser console for debugging
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        console.log(`  [browser error] ${msg.text()}`);
      }
    });
    page.on("pageerror", (err) => {
      console.log(`  [page error] ${err.message}`);
    });
    page.on("requestfailed", (req) => {
      console.log(`  [request failed] ${req.url()} - ${req.failure()?.errorText}`);
    });

    // Navigate and wait for React to render + useEffect to fire
    // Use networkidle2 instead of networkidle0 to tolerate long-polling/analytics requests
    await page.goto(`${BASE_URL}${route}`, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Ensure React has rendered content into #root
    await page.waitForSelector("#root > *", { timeout: 10000 });

    // Small extra wait for any useEffect meta tag updates
    await new Promise((r) => setTimeout(r, 500));

    // Capture the fully-rendered HTML
    const html = await page.content();

    // Write to the correct location in dist/
    if (route === "/") {
      await writeFile(join(DIST, "index.html"), html);
    } else {
      const dir = join(DIST, route);
      await mkdir(dir, { recursive: true });
      await writeFile(join(dir, "index.html"), html);
    }

    console.log(`  Pre-rendered: ${route}`);
    await page.close();
  }

  // Create 404.html from the pre-rendered homepage (GitHub Pages fallback)
  await copyFile(join(DIST, "index.html"), join(DIST, "404.html"));
  console.log("  Created: /404.html (GitHub Pages fallback)\n");

  await browser.close();
  server.close();

  console.log("Pre-rendering complete!");
}

prerender().catch((err) => {
  console.error("Pre-rendering failed:", err);
  process.exit(1);
});
