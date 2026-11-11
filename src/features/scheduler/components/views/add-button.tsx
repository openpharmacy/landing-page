import Link from "next/link";

import { Icon } from "@/components/ui/icon";

import { addHref } from "./links";

export function AddButton({ date }: { date: string | null }) {
  return (
    <Link
      href={date ? addHref(date) : "/scheduler/add"}
      aria-label="Add a medication"
      className="fixed right-[15px] bottom-[max(28px,env(safe-area-inset-bottom))] z-30 flex size-12 items-center justify-center rounded-card bg-info-500 transition-opacity hover:opacity-90 lg:hidden"
    >
      <Icon src="/icons/scheduler/views/add.svg" size={24} />
    </Link>
  );
}
