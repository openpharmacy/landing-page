import React, { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import Layout from "../components/Layout";
import { usePageMeta } from "../hooks/usePageMeta";
import CallToAction from "../components/CallToAction";
import blogPosts from "../data/BlogData";

// Build full JSON-LD schema for a blog post
function buildPostSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metaTitle,
    description: post.metaDescription,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate,
    author: {
      "@type": "Organization",
      name: "OpenPharmacy",
      url: "https://openpharmacy.com",
    },
    publisher: {
      "@type": "Organization",
      name: "OpenPharmacy",
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

// Build BreadcrumbList schema
function buildBreadcrumbSchema(post) {
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
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://openpharmacy.com/blog/${post.slug}`,
      },
    ],
  };
}

// Combine multiple schema objects into an @graph
function buildCombinedSchema(post) {
  return {
    "@context": "https://schema.org",
    "@graph": [buildPostSchema(post), buildBreadcrumbSchema(post)],
  };
}

// ---- Section renderers --------------------------------------------------------

function ParagraphSection({ text }) {
  return (
    <p className="text-white/80 text-base md:text-lg leading-relaxed">{text}</p>
  );
}

function HeadingSection({ text }) {
  return (
    <h2 className="text-xl md:text-2xl font-semibold text-white mt-6 mb-1">
      {text}
    </h2>
  );
}

function ListSection({ items }) {
  return (
    <ul className="list-disc list-outside pl-6 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="text-white/80 text-base md:text-lg leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

function OrderedListSection({ items }) {
  return (
    <ol className="list-decimal list-outside pl-6 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="text-white/80 text-base md:text-lg leading-relaxed">
          {item}
        </li>
      ))}
    </ol>
  );
}

function CalloutSection({ text }) {
  return (
    <div className="border-l-4 border-[var(--color-accent)] bg-[var(--color-secondary)] rounded-r-xl pl-5 pr-4 py-4 my-2">
      <p className="text-white/90 text-base md:text-lg leading-relaxed">{text}</p>
    </div>
  );
}

function TableSection({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full text-sm md:text-base border-collapse">
        <thead>
          <tr className="bg-[var(--color-accent)]">
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-white font-semibold text-left px-4 py-3 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={ri % 2 === 0 ? "bg-[var(--color-secondary)]" : "bg-white/5"}
            >
              {row.map((cell, ci) => (
                <td key={ci} className="text-white/80 px-4 py-3 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderSection(section, idx) {
  switch (section.type) {
    case "paragraph":
      return <ParagraphSection key={idx} text={section.text} />;
    case "heading":
      return <HeadingSection key={idx} text={section.text} />;
    case "list":
      return <ListSection key={idx} items={section.items} />;
    case "ordered_list":
      return <OrderedListSection key={idx} items={section.items} />;
    case "callout":
      return <CalloutSection key={idx} text={section.text} />;
    case "table":
      return <TableSection key={idx} headers={section.headers} rows={section.rows} />;
    default:
      return null;
  }
}

// ---- Page component -----------------------------------------------------------

function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  const schema = useMemo(
    () => (post ? buildCombinedSchema(post) : null),
    [post]
  );

  usePageMeta(
    post
      ? {
          title: post.metaTitle,
          description: post.metaDescription,
          canonicalPath: `/blog/${post.slug}`,
          schema,
        }
      : {
          title: "Post Not Found — OpenPharmacy Blog",
          description: "This blog post could not be found.",
          canonicalPath: "/blog",
        }
  );

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-white/50 -mb-6">
        <Link to="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link to="/blog" className="hover:text-white transition-colors">
          Blog
        </Link>
        <span>/</span>
        <span className="text-white/80 truncate max-w-[200px] md:max-w-none">
          {post.title}
        </span>
      </nav>

      {/* Post header */}
      <Motion.header
        className="flex flex-col gap-4 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <span className="bg-[var(--color-accent)] text-white text-xs px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-white/50 text-xs">{post.readingTime}</span>
          <span className="text-white/40 text-xs">
            Updated{" "}
            {new Date(post.updatedDate).toLocaleDateString("en-AU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <h1 className="font-grifter text-3xl md:text-5xl font-bold leading-tight">
          {post.title}
        </h1>
        <p className="text-white/70 text-lg leading-relaxed">{post.excerpt}</p>
      </Motion.header>

      {/* Post body */}
      <Motion.article
        className="max-w-3xl flex flex-col gap-5 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {post.sections.map((section, idx) => renderSection(section, idx))}
      </Motion.article>

      {/* Back to blog link */}
      <div className="max-w-3xl -mt-4">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[var(--color-accent)] text-base hover:opacity-80 transition-opacity"
        >
          &lsaquo; Back to Blog
        </Link>
      </div>

      {/* Download CTA */}
      <CallToAction />
    </Layout>
  );
}

export default BlogPost;
