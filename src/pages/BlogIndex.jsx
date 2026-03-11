import React from "react";
import Layout from "../components/Layout";
import BlogCard from "../components/BlogCard";
import { usePageMeta } from "../hooks/usePageMeta";
import blogPosts from "../data/blog/posts";

function BlogIndex() {
  usePageMeta({
    title: "eScript Guides and Resources | OpenPharmacy Blog",
    description:
      "Guides, comparisons, and digital health tips for Australian patients managing electronic prescriptions. From the team at OpenPharmacy — Australia's ADHA-registered eScript wallet.",
    canonicalPath: "/blog",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "OpenPharmacy Blog",
      description:
        "eScript guides, app comparisons, and digital health tips for Australian patients managing electronic prescriptions.",
      url: "https://openpharmacy.com/blog",
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
      inLanguage: "en-AU",
    },
  });

  return (
    <Layout>
      {/* Page header */}
      <div className="max-w-3xl">
        <h1 className="font-grifter text-4xl md:text-5xl font-bold mb-6 leading-tight">
          eScript Guides and Resources for Australians
        </h1>
        <p className="text-white/75 text-base md:text-lg leading-relaxed">
          OpenPharmacy is an ADHA-registered eScript wallet that helps
          Australian patients store, manage, and share their electronic
          prescriptions securely. This hub covers everything you need to know
          about e-prescriptions in Australia: app comparisons, how electronic
          scripts work, privacy and security, and practical tips for patients
          and carers managing prescriptions for the whole family.
        </p>
      </div>

      {/* Post grid */}
      {blogPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              tags={post.tags}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-white/50">
          <p className="text-lg">Guides coming soon.</p>
          <p className="text-sm mt-2">
            Check back shortly for articles on eScripts, app comparisons, and
            digital health tips for Australians.
          </p>
        </div>
      )}
    </Layout>
  );
}

export default BlogIndex;
