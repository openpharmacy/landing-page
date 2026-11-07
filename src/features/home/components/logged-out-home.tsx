import Link from "next/link";

import { Button } from "@/components/ui/button";

import { CategorySection } from "./category-section";
import { FeaturedSection } from "./featured-section";

/**
 * Logged-out Home (Figma `419:7344`) — a greeting, a log-in prompt and the
 * browse sections. The marketing Landing lives at `/`; this is `/home`.
 */
export function LoggedOutHome() {
  return (
    <div className="mx-auto w-full max-w-[870px] px-4 pt-8 pb-20">
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-4">
          <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
            Hello
          </h1>
          <div className="flex items-center gap-4 rounded-card-lg border border-[#E5E7EB] bg-white px-6 py-6">
            <div className="flex flex-1 flex-col gap-2">
              <h2 className="text-title-20 text-[#101828]">
                Log in for more features
              </h2>
              <p className="text-body-14 text-secondary-300">
                Track your scripts, schedule medications and track compliance.
              </p>
            </div>
            <Button asChild size="sm" className="shrink-0">
              <Link href="/sign-in">Log in</Link>
            </Button>
          </div>
        </div>

        <CategorySection />
        <FeaturedSection />
      </div>
    </div>
  );
}
