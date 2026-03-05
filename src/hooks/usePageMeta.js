import { useEffect } from "react";

/**
 * Sets per-page metadata (title, description, OG tags, canonical, JSON-LD schema).
 * Works with the Puppeteer prerender script — useEffect fires during prerender,
 * and page.content() captures the updated DOM state.
 *
 * @param {Object} options
 * @param {string} options.title - Page title
 * @param {string} options.description - Meta description
 * @param {string} [options.canonicalPath] - Canonical path (e.g., "/faq")
 * @param {Object} [options.schema] - JSON-LD schema object to inject
 */
export function usePageMeta({ title, description, canonicalPath = "/", schema = null }) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta description
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute("content", description);
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute("content", description);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute("content", `https://openpharmacy.com${canonicalPath}`);
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute("content", title);
    }

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) {
      twitterDesc.setAttribute("content", description);
    }

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", `https://openpharmacy.com${canonicalPath}`);
    }

    // Inject or update page-specific JSON-LD schema
    if (schema) {
      const existingScript = document.getElementById("page-schema");
      if (existingScript) {
        existingScript.textContent = JSON.stringify(schema);
      } else {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = "page-schema";
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      }
    }

    // Cleanup: remove page-specific schema on unmount
    return () => {
      const pageScript = document.getElementById("page-schema");
      if (pageScript) {
        pageScript.remove();
      }
    };
  }, [title, description, canonicalPath, schema]);
}
