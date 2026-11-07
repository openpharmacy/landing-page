import { TriangleAlert } from "lucide-react";

/** Banner shown on a script hidden from healthcare providers (Figma `301:5826`). */
export function HiddenBanner() {
  return (
    <div className="flex items-center gap-4 rounded-card-lg border border-[#FFD6A8] bg-gradient-to-r from-[#FFFBEB] to-[#FFF7ED] py-2 pr-4 pl-2">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white">
        <TriangleAlert className="size-5 text-[#F59E0B]" />
      </span>
      <p className="text-body-14 text-text">
        This script is hidden from healthcare providers but still accessible to
        you.
      </p>
    </div>
  );
}
