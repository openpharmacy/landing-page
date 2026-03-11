// src/pages/Blog.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "motion/react";
import Layout from "../components/Layout";
import { usePageMeta } from "../hooks/usePageMeta";
import posts from "../data/posts/index";

// Build WebPage JSON-LD schema for the blog index
function buildBlogIndexSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "OpenPharmacy Blog",
    description:
      "Expert guidance on managing Australian electronic prescriptions, eScript security, ADHA compliance, and digital health for patients and carers.",
    url: "https://openpharmacy.com/blog",
    publisher: {
      "@type": "Organization",
      name: "OpenPharmacy",
      url: "https://openpharmacy.com",
      logo: "https://openpharmacy.com/Logo.svg",
    },
  };
}

// Format a date string (ISO 8601) to a human-readable Australian date
function formatDate(isoDate) {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Blog() {
  const schema = useMemo(() => buildBlogIndexSchema(), []);

  usePageMeta({
    title: "OpenPharmacy Blog \u2014 eScript Guidance for Australian Patients",
    description:
      "Practical guides on managing electronic prescriptions in Australia. Learn about eScript security, offline access, ADHA compliance, and prescription management for families.",
    canonicalPath: "/blog",
    schema,
  });

  const hasPosts = posts.length > 0;

  return (
    <Layout>
      {/* Page header */}
      <section className="flex flex-col gap-4">
        <Motion.h1
          className="font-grifter text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0.1, 0.2, 1] }}
        >
          The eScript Guide
        </Motion.h1>
        <Motion.p
          className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0.1, 0.2, 1] }}
        >
          OpenPharmacy is Australia&apos;s ADHA-registered eScript wallet,
          built to keep your prescriptions secure, organised, and accessible
          offline. This blog covers everything Australian patients and carers
          need to know about managing electronic prescriptions safely and
          simply.
        </Motion.p>
      </section>

      {/* Post grid */}
      {hasPosts ? (
        <section
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-label="Blog posts"
        >
          {posts.map((post, idx) => (
            <Motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.08,
                ease: [0.4, 0.1, 0.2, 1],
              }}
              className="bg-[var(--color-secondary)] rounded-2xl p-6 flex flex-col gap-4 hover:opacity-90 transition-opacity"
            >
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h2 className="text-lg md:text-xl font-semibold leading-snug">
                <Link
                  to={`/blog/${post.slug}`}
                  className="hover:underline focus:outline-none focus-visible:underline"
                >
                  {post.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p className="text-white/70 text-sm md:text-base leading-relaxed flex-1">
                {post.excerpt}
              </p>

              {/* Footer: date + read link */}
              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <time
                  dateTime={post.date}
                  className="text-xs text-white/50"
                >
                  {formatDate(post.date)}
                </time>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-sm text-[var(--color-accent)] hover:underline"
                  aria-label={`Read: ${post.title}`}
                >
                  Read &rsaquo;
                </Link>
              </div>
            </Motion.article>
          ))}
        </section>
      ) : (
        /* Empty state — shown until first post is published */
        <section className="flex flex-col items-center gap-6 py-16 text-center">
          <p className="text-white/50 text-base md:text-lg">
            Articles are being prepared. Check back soon.
          </p>
        </section>
      )}
    </Layout>
  );
}

export default Blog;
