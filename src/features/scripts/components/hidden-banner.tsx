import { Icon } from "@/components/ui/icon";

export function HiddenBanner() {
  return (
    <div className="flex items-center gap-4 rounded-card-lg border border-[#ffd6a8] bg-[linear-gradient(100.1deg,#fffbeb_0%,#fff7ed_100%)] py-[7px] pr-[15px] pl-[7px] lg:bg-[linear-gradient(93.6deg,#fffbeb_0%,#fff7ed_100%)]">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white">
        <Icon src="/icons/scripts/warning.svg" size={20} />
      </span>
      <p className="text-body-14 text-text">
        This script is hidden from healthcare providers but still accessible to
        you.
      </p>
    </div>
  );
}
