import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Signal to @prerenderer/renderer-jsdom that the app has rendered
// This fires after React's synchronous render, giving the prerenderer
// a stable snapshot of the full HTML before it captures the page.
document.dispatchEvent(new Event("render-complete"));
