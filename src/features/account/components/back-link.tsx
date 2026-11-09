import Link from "next/link";

import { Icon } from "@/components/ui/icon";

export function BackLink({ href = "/account" }: { href?: string }) {
  return (
    <Link
      href={href}
      prefetch={href === "/account" ? undefined : true}
      className="inline-flex w-fit items-center gap-2 text-body-16 text-text-muted transition-colors hover:text-info-500"
    >
      <Icon src="/icons/account/arrow-left.svg" size={20} />
      Back
    </Link>
  );
}
