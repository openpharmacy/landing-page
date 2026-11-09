import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function EmptyCard({
  iconSrc,
  title,
  text,
  className,
}: {
  iconSrc: string;
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-card border border-neutral-300 bg-white p-[15px]",
        className,
      )}
    >
      <Icon src={iconSrc} size={24} />
      <div className="flex flex-col">
        <span className="text-body-16-bold text-neutral-900 lg:text-subtitle-18-bold">
          {title}
        </span>
        <span className="w-[213px] text-caption-12-bold text-secondary-300">
          {text}
        </span>
      </div>
    </div>
  );
}
