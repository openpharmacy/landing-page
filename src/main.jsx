import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import React from "react";

// GitHub Pages SPA redirect handler.
// When 404.html stores a path in sessionStorage (for routes GitHub Pages
// doesn't have a file for), restore it using the History API before React
// boots so the BrowserRouter sees the correct initial URL.
(function handleSpaRedirect() {
  const redirect = sessionStorage.getItem("spa_redirect");
  if (redirect) {
    sessionStorage.removeItem("spa_redirect");
    window.history.replaceState(null, "", redirect);
  }
})();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
