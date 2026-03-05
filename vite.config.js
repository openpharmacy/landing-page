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
      // Path to the Vite-built output directory
      staticDir: path.join(__dirname, "dist"),
      // All routes defined in src/App.jsx — add new routes here as pages are created
      routes: [
        "/",
        "/how-it-works",
        "/faq",
        "/privacy-policy",
        "/terms-of-service",
      ],
    }),
  ],
});
