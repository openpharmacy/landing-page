import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import { articleCount, categoryArticles } from "../data/help";
import { HELP_CATEGORIES, type HelpCategory } from "../data/help-content";
import { CategoryBadge } from "./category-badge";
import { ContactSupport } from "./contact-support";
import { HelpPage } from "./help-page";
import { HomeSearch } from "./home-search";
import { PopularArticles } from "./popular-articles";

const MOBILE_HEIGHTS = [
  "max-lg:min-h-[162px]",
  "max-lg:min-h-[182px]",
  "max-lg:min-h-[182px]",
  "max-lg:min-h-[222px]",
  "max-lg:min-h-[222px]",
  "max-lg:min-h-[182px]",
];

const ROWS = [HELP_CATEGORIES.slice(0, 3), HELP_CATEGORIES.slice(3)];

export function HelpHome() {
  return (
    <HelpPage className="pt-[14px] pb-[50px]">
      <div className="flex flex-col gap-9">
        <div className="flex flex-col items-center gap-9">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-display-32 text-secondary-900">Help Center</h1>
            <p className="max-w-[302px] text-body-14 text-secondary-300 lg:max-w-none lg:text-body-16">
              Find answers to your questions and learn how to get the most out
              of OpenPharmacy
            </p>
          </div>
          <HomeSearch />
        </div>

        <section className="flex flex-col gap-4">
          <h2 className="-my-1 text-h4-24 text-secondary-900">
            Browse by Category
          </h2>
          {ROWS.map((row, r) => (
            <ul key={r} className="flex flex-col gap-3 lg:flex-row">
              {row.map((category, i) => (
                <li key={category.slug} className="lg:flex-1">
                  <CategoryCard
                    category={category}
                    className={MOBILE_HEIGHTS[r * 3 + i]}
                  />
                </li>
              ))}
            </ul>
          ))}
        </section>

        <PopularArticles />

        <ContactSupport />
      </div>
    </HelpPage>
  );
}

function CategoryCard({
  category,
  className,
}: {
  category: HelpCategory;
  className?: string;
}) {
  return (
    <Link
      href={`/help/${category.slug}`}
      className={cn(
        "flex flex-col gap-4 rounded-card border border-neutral-300 bg-white p-[15px] transition-colors hover:bg-bg-app lg:h-[182px]",
        className,
      )}
    >
      <span className="flex items-center justify-between">
        <CategoryBadge category={category.slug} />
        <Icon src="/icons/help/arrow-right.svg" size={16} />
      </span>
      <span className="flex flex-col">
        <span className="text-subtitle-18-bold text-neutral-900">
          {category.title}
        </span>
        <span className="flex flex-col gap-1">
          <span className="text-body-14 text-secondary-300">
            {category.description}
          </span>
          <span className="text-caption-12 text-secondary-300">
            {articleCount(categoryArticles(category.slug).length)}
          </span>
        </span>
      </span>
    </Link>
  );
}
