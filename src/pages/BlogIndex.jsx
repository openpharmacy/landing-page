// src/pages/BlogIndex.jsx
// Blog index page — lists all published articles with title, date,
// description, and a "Read more" link to /blog/:slug.
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { usePageMeta } from "../hooks/usePageMeta";
import blogPosts from "../data/BlogPosts";

const blogIndexSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "OpenPharmacy Blog",
  description:
    "Guides and insights on managing Australian electronic prescriptions, eScript security, and digital health.",
  url: "https://openpharmacy.com/blog",
  publisher: {
    "@type": "Organization",
    name: "OpenPharmacy",
    url: "https://openpharmacy.com",
    logo: "https://openpharmacy.com/Logo.svg",
  },
};

function BlogIndex() {
  usePageMeta({
    title: "OpenPharmacy Blog — eScript & Digital Health Guides",
    description:
      "Guides, tips, and insights on managing Australian electronic prescriptions securely with OpenPharmacy.",
    canonicalPath: "/blog",
    schema: blogIndexSchema,
  });

  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <Layout>
      <h1 className="font-grifter text-4xl md:text-5xl font-bold text-center lg:text-left ml-3">
        Blog
      </h1>

      {sortedPosts.length === 0 ? (
        <div className="text-center py-16 text-white/50 text-lg">
          Articles coming soon.
        </div>
      ) : (
        <ul className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
          {sortedPosts.map((post) => (
            <li key={post.slug}>
              <Link
                to={`/blog/${post.slug}`}
                className="group block bg-[var(--color-secondary)] rounded-2xl p-6 hover:opacity-90 transition-opacity"
              >
                <p className="text-xs text-white/40 mb-2 uppercase tracking-wide">
                  {new Date(post.date).toLocaleDateString("en-AU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  {post.author && (
                    <span className="ml-3 text-white/30">{post.author}</span>
                  )}
                </p>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:underline">
                  {post.title}
                </h2>
                <p className="text-white/60 text-base leading-relaxed">
                  {post.description}
                </p>
                <span className="inline-block mt-4 text-sm text-[var(--color-accent)] font-semibold">
                  Read article &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}

export default BlogIndex;
