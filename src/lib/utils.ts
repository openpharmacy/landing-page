import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Register our Figma typography presets (text-display-32, text-body-16-bold, …)
// as their own group so tailwind-merge does NOT treat them as text colors and
// drop a sibling color like `text-white` (e.g. on buttons).
const twMerge = extendTailwindMerge<"font-preset">({
  extend: {
    classGroups: {
      "font-preset": [
        {
          text: [
            "display-32",
            "subtitle-18",
            "subtitle-18-bold",
            "body-16",
            "body-16-bold",
            "body-14",
            "body-18",
            "label-14",
            "caption-12",
            "caption-12-bold",
            "wordmark",
            "legal-14",
            "hero-60",
            "h2-48",
            "h2-36",
            "h3-30",
            "h4-24",
            "title-20",
          ],
        },
      ],
    },
  },
});

/** Merge class names, resolving Tailwind conflicts (shadcn convention). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
