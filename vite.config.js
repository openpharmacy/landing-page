import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

export default defineConfig({
  plugins: [
    // Tailwind CSS (v4 Vite plugin)
    tailwindcss(),

    // React fast-refresh + JSX transform — required for prerender SSR context
    react(),

    // Prerender plugin: at build time, calls the exported prerender() function
    // from src/main.jsx and writes a fully-populated index.html into each route
    // directory under dist/. AI crawlers and search engines receive real HTML
    // instead of an empty <div id="root"></div> shell.
    //
    // Routes are auto-discovered from the links Set returned by prerender(),
    // so adding a new page only requires adding its path to that Set.
    vitePrerenderPlugin({
      // Explicit fallback routes in case link-crawling misses any.
      additionalPrerenderRoutes: [
        "/privacy-policy",
        "/terms-of-service",
      ],
    }),
  ],
});
