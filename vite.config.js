import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import vitePrerender from "vite-plugin-prerender";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePrerender({
      // The Vite build output directory
      staticDir: path.join(__dirname, "dist"),

      // All routes defined in src/App.jsx — add new routes here as the site grows
      routes: [
        "/",
        "/how-it-works",
        "/faq",
        "/privacy-policy",
        "/terms-of-service",
      ],

      renderer: new vitePrerender.PuppeteerRenderer({
        // Wait for the React root to be populated before capturing HTML
        renderAfterElementExists: "#root > *",
        headless: true,
      }),
    }),
  ],
});
