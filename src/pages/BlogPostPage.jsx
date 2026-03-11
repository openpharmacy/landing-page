// src/pages/BlogPostPage.jsx
// Route handler for /blog/:slug.
// Looks up the post in BlogPosts.js, injects per-post metadata and
// Article JSON-LD schema, then renders the body via the BlogPost layout.
import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import BlogPost from "../components/BlogPost";
import blogPosts from "../data/BlogPosts";

function buildArticleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
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
    url: `https://openpharmacy.com/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://openpharmacy.com/blog/${post.slug}`,
    },
  };
}

function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  const schema = useMemo(
    () => (post ? buildArticleSchema(post) : null),
    [post]
  );

  usePageMeta({
    title: post
      ? `${post.title} — OpenPharmacy Blog`
      : "Article Not Found — OpenPharmacy Blog",
    description: post
      ? post.description
      : "This article could not be found. Browse all OpenPharmacy blog posts.",
    canonicalPath: post ? `/blog/${post.slug}` : "/blog",
    schema,
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-[var(--color-primary)] text-white flex flex-col items-center justify-center gap-4 px-4">
        <h1 className="font-grifter text-3xl font-bold">Article not found</h1>
        <p className="text-white/60">
          This article does not exist or may have been moved.
        </p>
        <Link
          to="/blog"
          className="mt-4 bg-[var(--color-accent)] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <BlogPost
      title={post.title}
      date={post.date}
      author={post.author}
      relatedSlugs={post.relatedSlugs}
    >
      {post.sections.map((section, idx) => (
        <section key={idx} className="mb-8">
          {section.heading && (
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-10 mb-4">
              {section.heading}
            </h2>
          )}
          {section.paragraphs.map((para, pIdx) => (
            <p key={pIdx} className="mb-4 text-white/80 leading-relaxed text-base md:text-lg">
              {para}
            </p>
          ))}
          {section.list && section.list.length > 0 && (
            <ul className="list-disc list-inside space-y-2 mt-2 mb-4 text-white/80 text-base md:text-lg">
              {section.list.map((item, lIdx) => (
                <li key={lIdx}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </BlogPost>
  );
}

export default BlogPostPage;
