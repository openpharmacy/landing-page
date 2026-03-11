import React, { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import Layout from "../components/Layout";
import { usePageMeta } from "../hooks/usePageMeta";
import CallToAction from "../components/CallToAction";
import { blogPosts } from "../data/BlogData";

/**
 * Format an ISO date string (e.g. "2026-03-11") into a human-readable
 * date like "11 March 2026".
 */
function formatDate(isoString) {
  const [year, month, day] = isoString.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Build Article JSON-LD schema for a blog post.
 */
function buildArticleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    ...(post.updatedDate ? { dateModified: post.updatedDate } : {}),
    author: {
      "@type": "Organization",
      name: "OpenPharmacy",
      url: "https://openpharmacy.com",
    },
    publisher: {
      "@type": "Organization",
      name: "OpenPharmacy",
      url: "https://openpharmacy.com",
      logo: {
        "@type": "ImageObject",
        url: "https://openpharmacy.com/Logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://openpharmacy.com/blog/${post.slug}`,
    },
  };
}

function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  const schema = useMemo(
    () => (post ? buildArticleSchema(post) : null),
    [post]
  );

  // Always call hooks before any conditional returns
  usePageMeta({
    title: post
      ? `${post.title} — OpenPharmacy`
      : "Post Not Found — OpenPharmacy",
    description: post
      ? post.description
      : "This blog post could not be found.",
    canonicalPath: post ? `/blog/${post.slug}` : "/blog",
    schema,
  });

  // Redirect to blog index if slug doesn't match any post
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <Layout>
      <article className="max-w-3xl mx-auto w-full pb-8">
        {/* Back link */}
        <Motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="text-sm text-white/50 hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-1.5"
          >
            <span>←</span>
            <span>All posts</span>
          </Link>
        </Motion.div>

        {/* Tags */}
        <Motion.div
          className="flex flex-wrap gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] font-medium"
            >
              {tag}
            </span>
          ))}
        </Motion.div>

        {/* Title */}
        <Motion.h1
          className="font-grifter text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {post.title}
        </Motion.h1>

        {/* Meta row */}
        <Motion.div
          className="flex items-center gap-4 text-sm text-white/50 mb-10 border-b border-white/10 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
          {post.updatedDate && (
            <>
              <span>·</span>
              <span>Updated {formatDate(post.updatedDate)}</span>
            </>
          )}
        </Motion.div>

        {/* Body content */}
        <div className="flex flex-col gap-8">
          {post.sections.map((section, idx) => (
            <Motion.section
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + idx * 0.06 }}
            >
              {/* Section heading — null for the opening lead paragraph */}
              {section.heading && (
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
                  {section.heading}
                </h2>
              )}

              {/* Paragraphs */}
              {section.paragraphs.map((para, pIdx) => (
                <p
                  key={pIdx}
                  className={`text-white/80 leading-relaxed text-base md:text-lg ${
                    pIdx < section.paragraphs.length - 1 ? "mb-4" : section.list ? "mb-3" : ""
                  }`}
                >
                  {para}
                </p>
              ))}

              {/* Optional bullet list */}
              {section.list && section.list.length > 0 && (
                <ul className="space-y-2 mt-1">
                  {section.list.map((item, lIdx) => (
                    <li
                      key={lIdx}
                      className="flex items-start gap-3 text-white/80 text-base md:text-lg leading-relaxed"
                    >
                      <span
                        className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-accent)]"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </Motion.section>
          ))}
        </div>
      </article>

      {/* CTA */}
      <CallToAction />
    </Layout>
  );
}

export default BlogPost;
