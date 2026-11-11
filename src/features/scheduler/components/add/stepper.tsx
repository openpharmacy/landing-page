import { Icon } from "@/components/ui/icon";

export function Stepper({
  label,
  value,
  unit,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-col gap-3">
      <span className="text-[14px] leading-6 font-bold text-secondary-900">
        {label}
      </span>
      <div className="flex items-center gap-3">
        <StepButton
          label={`Decrease ${label.replace(/:$/, "")}`}
          icon="minus"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
        />
        <output
          aria-live="polite"
          className="flex h-14 min-w-0 flex-1 flex-col items-center justify-center rounded-control border border-neutral-300 bg-white"
        >
          <span className="text-body-16-bold text-secondary-900">{value}</span>
          <span className="text-[14px] leading-[21px] text-secondary-500">
            {unit}
          </span>
        </output>
        <StepButton
          label={`Increase ${label.replace(/:$/, "")}`}
          icon="plus"
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
        />
      </div>
    </div>
  );
}

function StepButton({
  label,
  icon,
  disabled,
  onClick,
}: {
  label: string;
  icon: "minus" | "plus";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-14 shrink-0 items-center justify-center rounded-control border border-neutral-300 bg-white transition-opacity disabled:opacity-50"
    >
      <Icon src={`/icons/scheduler/add/${icon}.svg`} size={20} />
    </button>
  );
}
