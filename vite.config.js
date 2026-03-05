import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import prerender from "@prerenderer/rollup-plugin";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    prerender({
      // All routes defined in src/App.jsx — add new routes here as the site grows
      routes: [
        "/",
        "/how-it-works",
        "/faq",
        "/privacy-policy",
        "/terms-of-service",
      ],

      renderer: "@prerenderer/renderer-jsdom",
      rendererOptions: {
        // Wait for the React root to dispatch this event before capturing HTML
        renderAfterDocumentEvent: "render-complete",
      },
    }),
  ],
});
