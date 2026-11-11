import React from "react";
import { Link } from "react-router-dom";

/**
 * BlogCard — renders a single post summary on the /blog index page.
 *
 * @param {Object} props
 * @param {string} props.slug    - URL slug (e.g. "best-escript-apps-australia")
 * @param {string} props.title   - Post title
 * @param {string} props.date    - ISO 8601 date string (e.g. "2026-03-11")
 * @param {string} props.excerpt - Short summary shown on the card
 * @param {string[]} props.tags  - Array of tag labels
 */
const BlogCard = ({ slug, title, date, excerpt, tags }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Australia/Brisbane",
  });

  return (
    <Link
      to={`/blog/${slug}`}
      className="block bg-[var(--color-secondary)] rounded-2xl p-6 hover:bg-[#2a3f52] transition-colors group"
    >
      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h2 className="text-lg md:text-xl font-semibold text-white group-hover:text-[var(--color-accent)] transition-colors mb-2 leading-snug">
        {title}
      </h2>

      {/* Excerpt */}
      <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4">
        {excerpt}
      </p>

      {/* Footer row */}
      <div className="flex items-center justify-between">
        <time
          dateTime={date}
          className="text-xs text-white/50"
        >
          {formattedDate}
        </time>
        <span className="text-[var(--color-accent)] text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
          Read more &rsaquo;
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;
