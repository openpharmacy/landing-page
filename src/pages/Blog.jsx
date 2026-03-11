import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "motion/react";
import Layout from "../components/Layout";
import { usePageMeta } from "../hooks/usePageMeta";
import blogPosts from "../data/BlogData";

// Build BreadcrumbList schema for the blog index
function buildBlogIndexSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://openpharmacy.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://openpharmacy.com/blog",
      },
    ],
  };
}

function Blog() {
  const schema = useMemo(() => buildBlogIndexSchema(), []);

  usePageMeta({
    title: "OpenPharmacy Blog — eScript Tips & Digital Health Guides",
    description:
      "Guides, tips, and explainers about Australian electronic prescriptions, eScript management, and digital health — written for patients by the OpenPharmacy team.",
    canonicalPath: "/blog",
    schema,
  });

  return (
    <Layout>
      <section className="w-full flex flex-col gap-4">
        <Motion.h1
          className="font-grifter text-4xl md:text-5xl font-bold text-center lg:text-left ml-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Blog
        </Motion.h1>
        <Motion.p
          className="text-white/70 text-base md:text-lg ml-3 max-w-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Guides and explainers about Australian electronic prescriptions —
          written for patients.
        </Motion.p>
      </section>

      <section className="w-full">
        {blogPosts.length === 0 ? (
          <p className="text-white/60 text-center py-20 text-lg">
            No posts yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post, idx) => (
              <Motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[var(--color-secondary)] rounded-2xl p-6 flex flex-col gap-4 hover:opacity-90 transition-opacity"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-[var(--color-accent)] text-white text-xs px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-white/50 text-xs">{post.readingTime}</span>
                </div>
                <h2 className="text-xl font-semibold leading-snug">
                  {post.title}
                </h2>
                <p className="text-white/70 text-sm leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-white/40 text-xs">
                    {new Date(post.publishedDate).toLocaleDateString("en-AU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-[var(--color-accent)] text-sm font-medium hover:opacity-80 transition-opacity"
                  >
                    Read more &rsaquo;
                  </Link>
                </div>
              </Motion.article>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Blog;
