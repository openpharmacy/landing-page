import React from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { usePageMeta } from "../hooks/usePageMeta";

/**
 * BlogLayout — shared layout wrapper for all blog post pages.
 *
 * Handles:
 *  - Page-level meta tags (title, description, canonical, OG) via usePageMeta
 *  - BlogPosting JSON-LD schema injection
 *  - Breadcrumb navigation
 *  - Consistent post header (title, date, tags)
 *  - Prose content area
 *
 * @param {Object}   props
 * @param {React.ReactNode} props.children      - Post body content
 * @param {Object}   props.meta                 - Page metadata
 * @param {string}   props.meta.title           - Post title (used as H1 and page title)
 * @param {string}   props.meta.description     - Meta description / excerpt
 * @param {string}   props.meta.slug            - URL slug (e.g. "best-escript-apps-australia")
 * @param {string}   props.meta.date            - ISO 8601 publish date (e.g. "2026-03-11")
 * @param {string}   [props.meta.dateModified]  - ISO 8601 last modified date (defaults to date)
 * @param {string[]} [props.meta.tags]          - Tag labels displayed under the title
 * @param {Object}   [props.schema]             - Additional or override JSON-LD schema object.
 *                                               If omitted, a default BlogPosting schema is built
 *                                               from the meta prop.
 */
const BlogLayout = ({ children, meta, schema }) => {
  const {
    title,
    description,
    slug,
    date,
    dateModified,
    tags = [],
  } = meta;

  const canonicalPath = `/blog/${slug}`;

  // Build BlogPosting JSON-LD schema.
  // A caller can pass a fully custom schema object to override this default.
  const blogPostingSchema = schema || {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    datePublished: date,
    dateModified: dateModified || date,
    url: `https://openpharmacy.com/blog/${slug}`,
    inLanguage: "en-AU",
    author: {
      "@type": "Organization",
      name: "OpenPharmacy",
      legalName: "Easy As Health Pty Ltd",
      url: "https://openpharmacy.com",
    },
    publisher: {
      "@type": "Organization",
      name: "OpenPharmacy",
      legalName: "Easy As Health Pty Ltd",
      url: "https://openpharmacy.com",
      logo: {
        "@type": "ImageObject",
        url: "https://openpharmacy.com/Logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://openpharmacy.com/blog/${slug}`,
    },
    keywords: tags.join(", "),
    about: {
      "@type": "Thing",
      name: "Electronic Prescriptions Australia",
    },
  };

  usePageMeta({
    title: `${title} | OpenPharmacy`,
    description,
    canonicalPath,
    schema: blogPostingSchema,
  });

  const formattedDate = new Date(date).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Australia/Brisbane",
  });

  return (
    <Layout>
      <article className="max-w-3xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/50">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">&rsaquo;</li>
            <li>
              <Link to="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">&rsaquo;</li>
            <li className="text-white/80 truncate max-w-[200px]" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        {/* Post header */}
        <header className="mb-8 md:mb-12">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-grifter text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            {title}
          </h1>

          {/* Date */}
          <time
            dateTime={date}
            className="text-sm text-white/50"
          >
            Published {formattedDate}
          </time>
        </header>

        {/* Post body */}
        <div className="prose-blog text-white/85 leading-relaxed space-y-6 text-base md:text-lg">
          {children}
        </div>

        {/* Back to blog */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <Link
            to="/blog"
            className="text-[var(--color-accent)] hover:opacity-80 transition-opacity text-sm font-medium"
          >
            &larr; Back to all guides
          </Link>
        </div>
      </article>
    </Layout>
  );
};

export default BlogLayout;
