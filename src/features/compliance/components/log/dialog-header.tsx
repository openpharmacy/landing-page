import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const ICONS = "/icons/compliance/log";

export function CloseButton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className={cn(
        "flex shrink-0 transition-opacity hover:opacity-70",
        className,
      )}
    >
      <Icon src={`${ICONS}/close.svg`} size={24} />
    </button>
  );
}

export function BackButton({
  onClick,
  label = "Back",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-900/8 transition-colors hover:bg-neutral-900/15"
    >
      <Icon src={`${ICONS}/back.svg`} size={24} />
    </button>
  );
}

export function CloseBar({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex justify-end p-6">
      <CloseButton onClick={onClose} />
    </div>
  );
}

export function TitleBar({
  title,
  subtitle,
  onBack,
  onClose,
}: {
  title: string;
  subtitle: string;
  onBack: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-neutral-300 p-6">
      <BackButton onClick={onBack} />
      <div className="flex min-w-0 flex-1 flex-col">
        <h2 className="text-h4-24 text-secondary-900">{title}</h2>
        <p className="text-caption-12 text-secondary-300">{subtitle}</p>
      </div>
      <CloseButton onClick={onClose} />
    </div>
  );
}
