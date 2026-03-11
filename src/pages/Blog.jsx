import React from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "motion/react";
import Layout from "../components/Layout";
import { usePageMeta } from "../hooks/usePageMeta";
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

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "OpenPharmacy Blog",
  description:
    "Guides, explainers, and updates about electronic prescriptions, eScript management, and digital health in Australia.",
  url: "https://openpharmacy.com/blog",
  publisher: {
    "@type": "Organization",
    name: "OpenPharmacy",
    url: "https://openpharmacy.com",
    logo: "https://openpharmacy.com/Logo.svg",
  },
};

function Blog() {
  usePageMeta({
    title: "OpenPharmacy Blog — eScript Guides & Digital Health Updates",
    description:
      "Practical guides on managing Australian electronic prescriptions, eScript wallets, ADHA compliance, and digital health — from the team at OpenPharmacy.",
    canonicalPath: "/blog",
    schema: blogSchema,
  });

  return (
    <Layout>
      <Motion.h1
        className="font-grifter text-4xl md:text-5xl font-bold text-center lg:text-left ml-3"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Blog
      </Motion.h1>

      <p className="text-white/70 text-base md:text-lg max-w-2xl ml-3 -mt-8">
        Practical guides on electronic prescriptions, eScript management, and
        digital health in Australia.
      </p>

      <div className="flex flex-col gap-6 pb-12">
        {blogPosts.map((post, idx) => (
          <Motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Link
              to={`/blog/${post.slug}`}
              className="block bg-[var(--color-secondary)] rounded-2xl p-6 md:p-8 hover:bg-[#2a3f54] transition-colors group"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-semibold text-white group-hover:text-[var(--color-accent)] transition-colors mb-2">
                {post.title}
              </h2>

              {/* Description */}
              <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4">
                {post.description}
              </p>

              {/* Meta row */}
              <div className="flex items-center gap-4 text-xs md:text-sm text-white/50">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
            </Link>
          </Motion.article>
        ))}
      </div>
    </Layout>
  );
}

export default Blog;
