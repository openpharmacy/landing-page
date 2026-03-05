// scripts/prerender.mjs
// Runs after `vite build` + `vite build --ssr` to produce per-route index.html
// files in dist/ so crawlers and search engines receive full page content.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const ssrDir = path.resolve(__dirname, "../dist/ssr");

// Routes to prerender — must match src/App.jsx and src/entry-server.jsx
const routes = [
  "/",
  "/how-it-works",
  "/faq",
  "/privacy-policy",
  "/terms-of-service",
];

// Read the client-built HTML shell produced by `vite build`
const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

// Dynamically import the SSR bundle produced by `vite build --ssr`
// Vite outputs the SSR bundle as an ES module with a named export `render`.
const ssrEntryPath = path.join(ssrDir, "entry-server.js");
const { render } = await import(ssrEntryPath);

for (const route of routes) {
  console.log(`Prerendering: ${route}`);

  // Render the route to an HTML string
  const appHtml = render(route);

  // Inject rendered HTML into the app shell at the #root div
  const html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  // Determine output path: "/" → dist/index.html, "/faq" → dist/faq/index.html
  const routePath = route === "/" ? "/index.html" : `${route}/index.html`;
  const outputPath = path.join(distDir, routePath);

  // Ensure the directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html);

  console.log(`  → wrote ${outputPath}`);
}

// Clean up the temporary SSR bundle
fs.rmSync(ssrDir, { recursive: true, force: true });

console.log("Prerendering complete.");
