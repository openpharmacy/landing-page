import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const ASL_WASH = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' preserveAspectRatio='none'%3E%3ClinearGradient id='g' gradientUnits='userSpaceOnUse' x2='1' gradientTransform='matrix(-0.13908 -1.27708 0.74887 1.02857 0.37614 -0.10595)'%3E%3Cstop stop-color='%235cb4f8' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%2355b5ff'/%3E%3C/linearGradient%3E%3Crect width='1' height='1' fill='url(%23g)' opacity='0.2'/%3E%3C/svg%3E")`;

export function ScriptSourceCards({
  variant,
  onAddManually,
}: {
  variant: "page" | "modal";
  onAddManually: () => void;
}) {
  const page = variant === "page";

  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          "relative flex flex-col items-center overflow-hidden rounded-card border border-[#8bbde5] bg-white bg-size-[100%_100%] bg-origin-border pt-[15px] shadow-[inset_0_0_12px_0_rgb(92_180_248/0.15)]",
          page ? "pb-[23px]" : "pb-[32.5px] pl-[2px] lg:pl-px",
        )}
        style={{ backgroundImage: ASL_WASH }}
      >
        {page ? (
          <>
            <Circle className="top-[-114px] right-[-132px] h-[205px] w-[217px] lg:right-[-83px]" />
            <Circle className="top-[236px] left-[624px] size-[114px] max-lg:hidden" />
            <Circle className="top-[176px] left-[-78px] size-[155px] lg:top-[153px] lg:left-[-48px]" />
          </>
        ) : (
          <Circle className="top-[208.5px] left-[-71px] size-[155px]" />
        )}

        <div
          className={cn(
            "relative flex flex-col items-center gap-[13px]",
            page && "self-stretch pl-[2px] lg:pl-px",
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="flex size-11 items-center justify-center rounded-control bg-info-500">
              <Icon src="/icons/scripts/asl-magic-star.svg" size={24} />
            </span>
            <span className="rounded-[5px] bg-[#219a55] p-1 text-caption-12-bold text-white">
              Recommended
            </span>
          </div>
          <div
            className={cn(
              "flex flex-col items-center gap-2 text-center",
              page
                ? "self-stretch px-5 lg:w-[427px] lg:self-center lg:px-0"
                : "w-[325px] max-w-none",
            )}
          >
            <h2 className="text-title-20 text-neutral-900">Connect my ASL</h2>
            <p className="text-body-14 text-secondary-300">
              Never add a script manually again. Connect your Active Script List
              and instantly access all your prescriptions in one place.
            </p>
          </div>
        </div>
        <Button
          asChild
          className={cn("relative", page ? "mt-3.5 lg:mt-1" : "mt-[30.5px]")}
        >
          <Link href="/scripts/connect-asl" prefetch>
            Connect ASL Now
          </Link>
        </Button>
      </div>

      <div className="flex flex-col items-center gap-6 rounded-card border border-neutral-300 bg-white p-[23px] text-center">
        <div className="flex flex-col items-center gap-2 self-stretch">
          <span className="flex size-11 items-center justify-center rounded-control bg-[#d6eafc]">
            <PlusIcon className="size-6 text-info-500" />
          </span>
          <h2 className="text-title-20 text-neutral-900">
            Add a script manually
          </h2>
          <p className="text-body-14 text-secondary-300">
            Enter your prescription manually by providing the token.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          className="px-[23px] py-[15px]"
          onClick={onAddManually}
        >
          Add Manually
        </Button>
      </div>
    </div>
  );
}

function Circle({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full bg-primary-500/10",
        className,
      )}
    />
  );
}

export function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M6 12h12M12 6v12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
