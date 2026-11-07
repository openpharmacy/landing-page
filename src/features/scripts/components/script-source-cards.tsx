import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

/** Faint top-of-card blue wash behind the ASL card (Figma linear gradient). */
const ASL_GRADIENT =
  "linear-gradient(178deg, rgba(86,181,253,0.22) 0%, rgba(92,180,248,0) 60%)";

/**
 * The two "add a script" source cards — Connect ASL (recommended) and Add
 * manually — shared by the empty My Scripts state and the Add Script modal
 * (Figma `79:6424` / `298:4972`). ASL has no backend yet (docs/api-gaps.md), so
 * "Connect ASL Now" shows an unavailable notice. "Add Manually" either links to
 * the page (`addManuallyHref`) or runs `onAddManually` (the modal's manual step).
 */
export function ScriptSourceCards({
  addManuallyHref,
  onAddManually,
}: {
  addManuallyHref?: string;
  onAddManually?: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Connect ASL (recommended) */}
      <div
        className="relative overflow-hidden rounded-card border border-[#8BBDE5] bg-white"
        style={{ backgroundImage: ASL_GRADIENT }}
      >
        <Circle className="size-[217px]" style={{ top: -113, right: -82 }} />
        <Circle className="size-[114px]" style={{ bottom: -86, right: 131 }} />
        <Circle className="size-[155px]" style={{ bottom: -44, left: -47 }} />

        <div className="relative flex flex-col items-center gap-1 px-6 pt-4 pb-6">
          <div className="flex flex-col items-center gap-[13px]">
            <div className="flex flex-col items-center gap-2">
              <span className="flex size-11 items-center justify-center rounded-control bg-info-500">
                <Icon src="/icons/scripts/asl-magic-star.svg" size={24} />
              </span>
              <span className="rounded-[5px] bg-[#219A55] px-1 py-1 text-caption-12-bold text-white">
                Recommended
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <h2 className="text-title-20 text-[#1C232A]">Connect my ASL</h2>
              <p className="max-w-[427px] text-body-14 text-secondary-300">
                Never add a script manually again. Connect your Active Script
                List and instantly access all your prescriptions in one place.
              </p>
            </div>
          </div>
          <Button asChild>
            <Link href="/scripts/connect-asl">Connect ASL Now</Link>
          </Button>
        </div>
      </div>

      {/* Add manually */}
      <div className="flex flex-col items-center gap-6 rounded-card border border-neutral-300 bg-white p-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <span className="flex size-11 items-center justify-center rounded-control bg-[#D6EAFC]">
            <PlusIcon className="size-6 text-info-500" />
          </span>
          <h2 className="text-title-20 text-[#1C232A]">
            Add a script manually
          </h2>
          <p className="text-body-14 text-secondary-300">
            Enter your prescription manually by providing the token.
          </p>
        </div>
        {onAddManually ? (
          <Button type="button" variant="secondary" onClick={onAddManually}>
            Add Manually
          </Button>
        ) : (
          <Button asChild variant="secondary">
            <Link href={addManuallyHref ?? "/scripts/add"}>Add Manually</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

/** Faint decorative circle that bleeds past the card edges (Figma). */
function Circle({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden
      style={style}
      className={`pointer-events-none absolute rounded-full bg-primary-500/10 ${className ?? ""}`}
    />
  );
}

/** Iconsax "add" glyph (plain plus), recolourable via currentColor. */
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
