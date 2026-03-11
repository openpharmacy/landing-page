// src/components/BlogPost.jsx
// Shared layout wrapper for all blog article pages.
// Renders: breadcrumbs, H1, author byline, article body sections,
// related posts block, and a sticky app download CTA footer.
import React from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import CallToAction from "./CallToAction";
import blogPosts from "../data/BlogPosts";

/**
 * BlogPost layout component.
 *
 * @param {Object}   props
 * @param {string}   props.title        - Article headline rendered as <h1>
 * @param {string}   props.date         - ISO 8601 date string, e.g. "2026-03-11"
 * @param {string}   props.author       - Author display name
 * @param {string[]} props.relatedSlugs - Up to 3 slugs for the related posts block
 * @param {React.ReactNode} props.children - Article body content
 */
const BlogPost = ({ title, date, author, relatedSlugs = [], children }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const relatedPosts = blogPosts.filter((p) => relatedSlugs.includes(p.slug));

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="px-1">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-white/50">
          <li>
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="select-none">
            /
          </li>
          <li>
            <Link to="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
          </li>
          <li aria-hidden="true" className="select-none">
            /
          </li>
          <li className="text-white/80 truncate max-w-[200px] sm:max-w-none" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>

      {/* Article */}
      <article className="max-w-3xl w-full mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="font-grifter text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            {title}
          </h1>
          <p className="text-white/50 text-sm md:text-base">
            By {author} &middot; {formattedDate}
          </p>
        </header>

        {/* Body */}
        <div className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed">
          {children}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <aside className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-white">
              Related Articles
            </h2>
            <ul className="flex flex-col gap-4">
              {relatedPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col gap-1 bg-[var(--color-secondary)] rounded-xl p-4 hover:opacity-90 transition-opacity"
                  >
                    <span className="font-semibold text-white group-hover:underline">
                      {post.title}
                    </span>
                    <span className="text-sm text-white/50">
                      {new Date(post.date).toLocaleDateString("en-AU", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </article>

      {/* Sticky app download CTA */}
      <div className="sticky bottom-0 z-40 bg-[var(--color-primary)] border-t border-white/10 py-3 px-4">
        <div className="max-w-3xl mx-auto">
          <CallToAction />
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
