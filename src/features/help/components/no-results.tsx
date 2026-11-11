import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function NoResults() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-card-lg border border-[#e5e7eb] bg-white p-[23px] text-center lg:px-0 lg:py-12">
      <Icon src="/icons/help/search-large.svg" size={64} />
      <p className="text-title-20 text-[#101828]">No results found</p>
      <p className="text-body-16 text-secondary-300">
        Try different keywords or browse our categories
      </p>
      <Button asChild>
        <Link href="/help">Browse Help Center</Link>
      </Button>
    </div>
  );
}
