/** @type {import("prettier").Config} */
const config = {
  semi: true,
  trailingComma: "all",
  printWidth: 80,
  plugins: ["prettier-plugin-tailwindcss"],
  // Tailwind v4 has no JS config; point the plugin at the CSS entry instead.
  tailwindStylesheet: "./src/app/globals.css",
};

export default config;
