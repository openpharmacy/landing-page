import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

export default defineConfig({
  plugins: [
    // Tailwind CSS v4 Vite plugin
    tailwindcss(),

    // React JSX transform — required for SSR/prerender renderToString
    react(),

    // Prerender each route to static HTML at build time so AI crawlers
    // (GPTBot, ClaudeBot, Google-Extended, PerplexityBot) and search
    // engines receive fully-populated HTML rather than an empty shell.
    //
    // The prerender entry is src/entry-prerender.jsx (discovered via the
    // `prerender` attribute on its <script> tag in index.html).
    //
    // To add a new page: add its route to the `links` Set in
    // src/entry-prerender.jsx — no changes needed here.
    vitePrerenderPlugin(),
  ],
});
