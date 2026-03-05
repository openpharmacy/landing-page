import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import vitePrerender from "vite-plugin-prerender";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { PuppeteerRenderer } = vitePrerender;

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePrerender({
      // Path to the compiled Vite output directory
      staticDir: path.join(__dirname, "dist"),

      // All routes that should be pre-rendered to static HTML.
      // Add new routes here whenever a new page is created.
      routes: ["/", "/how-it-works", "/faq", "/privacy-policy", "/terms-of-service"],

      renderer: new PuppeteerRenderer({
        // Wait for the React root to be populated before capturing HTML
        renderAfterElementExists: "#root > *",
        // Headless Chromium — no display needed in CI
        headless: true,
      }),
    }),
  ],
});
