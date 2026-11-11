import Link from "next/link";

import { EmailLink } from "@/components/layout/email-link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import { readTime, updatedLabel } from "../data/help";
import { ARTICLE_POPULAR_COUNT, type HelpArticle } from "../data/help-content";
import { SUPPORT_EMAIL } from "../data/support";
import { BackLink } from "./back-link";
import { HelpPage } from "./help-page";
import { HelpfulVote } from "./helpful-vote";
import { PopularArticles } from "./popular-articles";

function LinkedText({ children }: { children: string }) {
  return children
    .split(SUPPORT_EMAIL)
    .flatMap((part, i) =>
      i === 0 ? [part] : [<EmailLink key={i} email={SUPPORT_EMAIL} />, part],
    );
}

export function ArticleView({ article }: { article: HelpArticle }) {
  return (
    <HelpPage className="pt-2.5 pb-0">
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-2 lg:gap-0">
          <BackLink href={`/help/${article.category}`} />
          <div className="flex flex-col gap-2">
            <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
              {article.title}
            </h1>
            <div className="flex flex-col gap-2 text-body-14 text-[#6a7282] lg:flex-row lg:gap-4">
              <span className="flex items-center gap-1.5">
                <Icon src="/icons/help/clock.svg" size={16} />
                {readTime(article)}
              </span>
              <span>{updatedLabel(article)}</span>
            </div>
          </div>
        </div>

        <article className="flex flex-col gap-9 rounded-card-lg border border-[#e5e7eb] bg-white p-[15px] text-text lg:p-[35px]">
          <p className="text-base leading-[26px] lg:max-w-[736px]">
            <LinkedText>{article.intro}</LinkedText>
          </p>
          {article.sections?.map((section) => (
            <section key={section.title} className="flex flex-col gap-4">
              <h2 className="text-title-20 text-[#101828]">{section.title}</h2>
              {section.lead && (
                <p className="text-base leading-[26px]">
                  <LinkedText>{section.lead}</LinkedText>
                </p>
              )}
              {section.items && (
                <ul
                  className={cn(
                    "flex flex-col gap-2 px-6 text-body-16",
                    section.nowrap && "min-[390px]:whitespace-nowrap",
                  )}
                >
                  {section.items.map((item) => (
                    <li key={item}>
                      <LinkedText>{item}</LinkedText>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        <HelpfulVote key={article.slug} slug={article.slug} />

        <PopularArticles count={ARTICLE_POPULAR_COUNT} />

        <section className="-mx-6 mt-3 flex flex-col items-center gap-6 rounded-control bg-[#e6f3fd] p-6 lg:mx-0 lg:mt-0">
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-h4-24 text-secondary-900">Still need help?</h2>
            <p className="text-body-16 text-secondary-300 min-[390px]:whitespace-nowrap">
              Our support team is available 24/7 to assist you
            </p>
          </div>
          <Button asChild>
            <Link href="/help#contact">Contact Support</Link>
          </Button>
        </section>
      </div>
    </HelpPage>
  );
}
