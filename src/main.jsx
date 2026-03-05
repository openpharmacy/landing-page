import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const container = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (container.children.length > 0) {
  // Pre-rendered HTML exists — hydrate for smooth takeover
  hydrateRoot(container, app);
} else {
  // Dev mode or first load without prerender — render normally
  createRoot(container).render(app);
}
