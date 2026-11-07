import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

/**
 * Figma auth shell. Desktop (lg+) is a fixed split-hero: a left hero panel
 * (carousel for the chooser, a photo for the email/verify steps) and a right
 * 480px column. Mobile drops the hero entirely and uses the site chrome — a
 * minimal logo header on top and the marketing footer below the scrolling
 * content. `align="center"` centres the column (used by the verify step).
 */
export function AuthSplit({
  hero,
  children,
  backHref = "/",
  backLabel = "Back to home",
  showBack = true,
  align = "left",
}: {
  hero: ReactNode;
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
  showBack?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg-app lg:h-dvh lg:overflow-hidden">
      {/* Mobile-only logo header (Figma mobile auth). */}
      <header className="flex h-14 shrink-0 items-center border-b border-neutral-300 bg-white px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-1">
          <Icon src="/icons/logo.svg" size={36} alt="OpenPharmacy" />
          <span className="text-wordmark text-secondary-500">OpenPharmacy</span>
        </Link>
      </header>

      <div className="flex flex-col lg:grid lg:flex-1 lg:grid-cols-[525px_1fr]">
        <aside className="hidden lg:block">{hero}</aside>

        <main className="flex flex-col px-4 py-8 lg:flex-1 lg:overflow-y-auto lg:px-6 lg:py-0">
          <div
            className={cn(
              "mx-auto flex w-full max-w-[480px] flex-col gap-8 lg:flex-1 lg:pt-[64px] lg:pb-8",
              align === "center" && "items-center text-center",
            )}
          >
            {showBack && (
              <Link
                href={backHref}
                className="inline-flex items-center gap-2 text-body-16 text-text-muted transition-colors hover:text-info-500"
              >
                <ArrowLeft className="size-5" />
                {backLabel}
              </Link>
            )}
            {children}
          </div>
        </main>
      </div>

      {/* Mobile-only marketing footer (below the fold). */}
      <div className="lg:hidden">
        <Footer />
      </div>
    </div>
  );
}
