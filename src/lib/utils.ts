import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
