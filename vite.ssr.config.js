// vite.ssr.config.js
// Used by `vite build --ssr` during the prerender step.
// Keeps the SSR bundle separate from the client build output.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist/ssr",
    ssr: "src/entry-server.jsx",
    rollupOptions: {
      output: {
        // Output as ESM so the prerender script can import it directly
        format: "es",
      },
    },
  },
});
