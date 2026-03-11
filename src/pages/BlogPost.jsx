// src/pages/BlogPost.jsx
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion as Motion } from "motion/react";
import Layout from "../components/Layout";
import { usePageMeta } from "../hooks/usePageMeta";
import posts from "../data/posts/index";

const SITE_URL = "https://openpharmacy.com";

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

// Build Article JSON-LD schema for a single post
function buildArticleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    author: {
      "@type": "Organization",
      name: post.author || "OpenPharmacy",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "OpenPharmacy",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/Logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

// Build FAQPage JSON-LD schema from post.faqItems (if present)
function buildFaqSchema(faqItems) {
  if (!faqItems || faqItems.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

// Merge Article and FAQPage schemas into a @graph for the usePageMeta hook.
// usePageMeta injects one schema block via #page-schema; we combine both
// types under a single @graph so both are present without needing two hooks.
function buildCombinedSchema(post) {
  const articleSchema = buildArticleSchema(post);
  const faqSchema = buildFaqSchema(post.faqItems);

  const graph = [articleSchema];
  if (faqSchema) {
    graph.push(faqSchema);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

// Render a single content section (heading + paragraphs + optional list)
function ContentSection({ section, idx }) {
  return (
    <Motion.section
      key={idx}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + idx * 0.06 }}
      className="flex flex-col gap-4"
    >
      {section.heading && (
        <h2 className="font-grifter text-2xl md:text-3xl font-bold">
          {section.heading}
        </h2>
      )}
      {section.paragraphs &&
        section.paragraphs.map((para, pIdx) => (
          <p
            key={pIdx}
            className="text-white/80 text-base md:text-lg leading-relaxed"
          >
            {para}
          </p>
        ))}
      {section.list && section.list.length > 0 && (
        <ul className="list-disc list-inside space-y-2 text-white/80 text-base md:text-lg pl-2">
          {section.list.map((item, lIdx) => (
            <li key={lIdx}>{item}</li>
          ))}
        </ul>
      )}
    </Motion.section>
  );
}

// Build table of contents from sections that have headings
function TableOfContents({ sections }) {
  const headings = sections.filter((s) => s.heading);
  if (headings.length < 3) return null; // Only show ToC for longer posts

  return (
    <aside className="bg-[var(--color-secondary)] rounded-2xl p-6 flex flex-col gap-3 mb-4">
      <p className="text-sm font-semibold text-white/60 uppercase tracking-wider">
        In this article
      </p>
      <nav aria-label="Table of contents">
        <ol className="flex flex-col gap-2">
          {headings.map((section, idx) => (
            <li key={idx}>
              <a
                href={`#section-${idx}`}
                className="text-[var(--color-accent)] text-sm md:text-base hover:underline"
              >
                {section.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}

// Render FAQ section at the end of the post if faqItems are present
function FaqSection({ faqItems }) {
  if (!faqItems || faqItems.length === 0) return null;

  return (
    <section className="flex flex-col gap-6 mt-4">
      <h2 className="font-grifter text-2xl md:text-3xl font-bold">
        Frequently Asked Questions
      </h2>
      <dl className="flex flex-col gap-5">
        {faqItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-[var(--color-secondary)] rounded-xl p-5 flex flex-col gap-2"
          >
            <dt className="font-semibold text-white text-base md:text-lg">
              {item.q}
            </dt>
            <dd className="text-white/75 text-base leading-relaxed">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

// Related posts footer
function RelatedPosts({ relatedSlugs }) {
  if (!relatedSlugs || relatedSlugs.length === 0) return null;

  const relatedPosts = relatedSlugs
    .map((slug) => posts.find((p) => p.slug === slug))
    .filter(Boolean);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="flex flex-col gap-6 mt-4 pt-8 border-t border-white/10">
      <h2 className="font-grifter text-2xl font-bold">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="bg-[var(--color-secondary)] rounded-xl p-5 flex flex-col gap-2 hover:opacity-90 transition-opacity"
          >
            <h3 className="font-semibold text-base leading-snug">
              {post.title}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
            <span className="text-[var(--color-accent)] text-sm mt-auto">
              Read &rsaquo;
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// 404-style "post not found" state
function PostNotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center gap-6 py-20 text-center">
        <h1 className="font-grifter text-4xl font-bold">Article Not Found</h1>
        <p className="text-white/60 text-lg">
          This article doesn&apos;t exist or may have been moved.
        </p>
        <Link
          to="/blog"
          className="bg-[var(--color-accent)] text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity"
        >
          Back to Blog
        </Link>
      </div>
    </Layout>
  );
}

function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  // Derive schema (must be called before any early return due to Rules of Hooks)
  const schema = useMemo(
    () => (post ? buildCombinedSchema(post) : null),
    [post]
  );

  usePageMeta({
    title: post
      ? `${post.title} \u2014 OpenPharmacy Blog`
      : "Article Not Found \u2014 OpenPharmacy",
    description: post
      ? post.excerpt
      : "This article could not be found. Browse all OpenPharmacy eScript guides.",
    canonicalPath: post ? `/blog/${post.slug}` : "/blog",
    schema,
  });

  if (!post) {
    return <PostNotFound />;
  }

  const hasToc = post.content && post.content.filter((s) => s.heading).length >= 3;

  return (
    <Layout>
      <article className="max-w-3xl w-full mx-auto flex flex-col gap-10">
        {/* Article header */}
        <header className="flex flex-col gap-4">
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

          <Motion.h1
            className="font-grifter text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {post.title}
          </Motion.h1>

          {/* Author byline + dates */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/50">
            <span>By {post.author || "OpenPharmacy Team"}</span>
            <span aria-hidden="true">&middot;</span>
            <time dateTime={post.date}>
              Published {formatDate(post.date)}
            </time>
            {post.updated && post.updated !== post.date && (
              <>
                <span aria-hidden="true">&middot;</span>
                <time dateTime={post.updated}>
                  Updated {formatDate(post.updated)}
                </time>
              </>
            )}
          </div>
        </header>

        {/* Table of contents (long posts only) */}
        {hasToc && <TableOfContents sections={post.content} />}

        {/* Article body */}
        <div className="flex flex-col gap-10">
          {post.content &&
            post.content.map((section, idx) => (
              <div
                key={idx}
                id={section.heading ? `section-${idx}` : undefined}
              >
                <ContentSection section={section} idx={idx} />
              </div>
            ))}
        </div>

        {/* FAQ section (renders if post has faqItems) */}
        {post.faqItems && post.faqItems.length > 0 && (
          <FaqSection faqItems={post.faqItems} />
        )}

        {/* Back to blog */}
        <div className="pt-6 border-t border-white/10">
          <Link
            to="/blog"
            className="text-[var(--color-accent)] text-sm hover:underline"
          >
            &larr; Back to all articles
          </Link>
        </div>

        {/* Related posts */}
        <RelatedPosts relatedSlugs={post.relatedSlugs} />
      </article>
    </Layout>
  );
}

export default BlogPost;
