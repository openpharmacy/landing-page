import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vitePrerender from "vite-plugin-prerender";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    tailwindcss(),
    vitePrerender({
      // Absolute path to the Vite build output directory.
      staticDir: path.join(__dirname, "dist"),

      // Every route that should be pre-rendered to a static index.html.
      // Add new routes here as pages are created — the build will emit a
      // separate HTML file for each so AI crawlers receive real content.
      routes: [
        "/",
        "/how-it-works",
        "/faq",
        "/privacy-policy",
        "/terms-of-service",
      ],

      renderer: new vitePrerender.PuppeteerRenderer({
        // Wait until the React app has finished painting before capturing HTML.
        // This ensures all component content is present in the emitted markup.
        renderAfterTime: 1000,
      }),
    }),
  ],
});
