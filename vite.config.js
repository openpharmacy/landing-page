import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePrerenderPlugin({
      // All routes that should be pre-rendered to static HTML at build time.
      // Add new routes here as pages are created — each becomes a standalone
      // index.html that AI crawlers and search engines can read directly.
      additionalPrerenderRoutes: [
        "/",
        "/how-it-works",
        "/faq",
        "/privacy-policy",
        "/terms-of-service",
      ],
    }),
  ],
});
