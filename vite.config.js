import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import prerender from "@prerenderer/rollup-plugin";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    prerender({
      // All routes that should be pre-rendered to static HTML.
      // Add new routes here whenever a new page is created.
      routes: ["/", "/how-it-works", "/faq", "/privacy-policy", "/terms-of-service"],

      // Use the Puppeteer renderer (ESM-compatible string reference)
      renderer: "@prerenderer/renderer-puppeteer",

      rendererOptions: {
        // Wait for the React root to be populated before capturing HTML
        renderAfterElementExists: "#root > *",
        // Headless Chromium — no display needed in CI
        headless: true,
      },
    }),
  ],
});
