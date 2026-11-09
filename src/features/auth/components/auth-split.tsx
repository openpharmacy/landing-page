import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const DESKTOP_TOP = {
  form: "lg:pt-[121px]",
  chooser: "lg:pt-[153px]",
} as const;

export function AuthSplit({
  hero,
  children,
  backHref = "/",
  backLabel = "Back to home",
  mobileBackLabel,
  mobileBackHref,
  showBack = true,
  showMobileBack,
  top = "form",
  mobileMinHeight = "min-h-[548px]",
  mobileBare = false,
}: {
  hero: ReactNode;
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
  mobileBackLabel?: string;
  mobileBackHref?: string;
  showBack?: boolean;
  showMobileBack?: boolean;
  top?: keyof typeof DESKTOP_TOP;
  mobileMinHeight?: string;
  mobileBare?: boolean;
}) {
  const mobileBack = showMobileBack ?? showBack;
  const backClass =
    "w-fit items-center gap-2 text-body-16 text-text-muted transition-colors hover:text-info-500";
  return (
    <div
      className={cn(
        "flex min-h-dvh flex-col bg-bg-app lg:h-dvh lg:overflow-hidden",
        mobileBare && "max-lg:bg-white",
      )}
    >
      {!mobileBare && (
        <header className="flex h-[57px] shrink-0 items-center border-b border-neutral-300 bg-white px-4 lg:hidden">
          <Link href="/" className="flex items-center gap-1">
            <Icon src="/icons/logo.svg" size={36} alt="OpenPharmacy" />
            <span className="text-wordmark text-secondary-500">
              OpenPharmacy
            </span>
          </Link>
        </header>
      )}

      <div className="flex flex-col lg:grid lg:flex-1 lg:grid-cols-[456px_1fr]">
        <aside className="relative hidden lg:block">{hero}</aside>

        <main
          className={cn(
            "relative flex flex-col px-4 pt-[17px] pb-8 lg:flex-1 lg:overflow-y-auto lg:px-6 lg:pb-8",
            mobileMinHeight,
            "lg:min-h-0",
            DESKTOP_TOP[top],
          )}
        >
          <div className="mx-auto flex w-full max-w-[480px] flex-col gap-8">
            {mobileBackHref && mobileBackHref !== backHref ? (
              <>
                {mobileBack && (
                  <Link
                    href={mobileBackHref}
                    className={cn(backClass, "inline-flex lg:hidden")}
                  >
                    <ArrowLeft className="size-5" />
                    {mobileBackLabel ?? backLabel}
                  </Link>
                )}
                {showBack && (
                  <Link
                    href={backHref}
                    className={cn(backClass, "hidden lg:inline-flex")}
                  >
                    <ArrowLeft className="size-5" />
                    {backLabel}
                  </Link>
                )}
              </>
            ) : (
              (showBack || mobileBack) && (
                <Link
                  href={backHref}
                  className={cn(
                    backClass,
                    mobileBack ? "inline-flex" : "hidden",
                    showBack ? "lg:inline-flex" : "lg:hidden",
                  )}
                >
                  <ArrowLeft className="size-5" />
                  {mobileBackLabel ? (
                    <>
                      <span className="lg:hidden">{mobileBackLabel}</span>
                      <span className="hidden lg:inline">{backLabel}</span>
                    </>
                  ) : (
                    backLabel
                  )}
                </Link>
              )
            )}
            {children}
          </div>
        </main>
      </div>

      {!mobileBare && (
        <div className="lg:hidden">
          <Footer />
        </div>
      )}
    </div>
  );
}
