import { Icon } from "@/components/ui/icon";

import type { PickableScript } from "./existing-scripts";

export function ScriptsStep({
  scripts,
  onPick,
}: {
  scripts: PickableScript[];
  onPick: (script: PickableScript) => void;
}) {
  return (
    <ul className="flex flex-col gap-2 pt-6 pr-[25px] pb-6 pl-[23px] lg:px-6 lg:pb-9">
      {scripts.map((script) => (
        <li key={script.id}>
          <button
            type="button"
            onClick={() => onPick(script)}
            className="flex h-[74px] w-full items-center gap-4 rounded-card border border-neutral-300 bg-white px-[15px] text-left transition-colors hover:bg-bg-section"
          >
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-body-16-bold text-secondary-900">
                {script.name}
              </span>
              <span className="text-caption-12-bold text-secondary-900/60">
                {script.form}
              </span>
            </span>
            <Icon src="/icons/scheduler/add/chevron.svg" size={20} />
          </button>
        </li>
      ))}
    </ul>
  );
}
