"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import {
  deleteScript,
  errorText,
  setScriptArchived,
  setScriptHidden,
} from "../api/scripts-api";
import {
  DEFAULT_SORT,
  isTokenOnly,
  sortScripts,
  statusLabel,
  type Script,
  type ScriptGroup,
  type SortKey,
} from "../model/script";
import { AddScriptModal } from "./add-script-modal";
import {
  EMPTY_FILTERS,
  FilterModal,
  hasActiveFilters,
  type ScriptFilters,
} from "./filter-modal";
import { ScriptCard } from "./script-card";
import { PlusIcon, ScriptSourceCards } from "./script-source-cards";
import { MY_SCRIPTS_COLUMN } from "./scripts-layout";
import { SecurityShield } from "./security-shield";
import { SortMenu } from "./sort-menu";

type Shown = { hidden: boolean; archived: boolean };

function unconfirmed(
  changes: Record<string, boolean>,
  server: (id: string) => boolean | undefined,
): Record<string, boolean> {
  return Object.fromEntries(
    Object.entries(changes).filter(([id, value]) => {
      const now = server(id);
      return now !== undefined && now !== value;
    }),
  );
}

function matches(script: Script, shown: Shown, f: ScriptFilters): boolean {
  if (shown.archived && !f.statuses.includes("Archived")) return false;
  const medication = f.medication.trim().toLowerCase();
  if (
    medication &&
    (isTokenOnly(script) || !script.name.toLowerCase().includes(medication))
  ) {
    return false;
  }
  if (
    f.statuses.length > 0 &&
    !f.statuses.includes(statusLabel(script)) &&
    !(shown.hidden && f.statuses.includes("Hidden")) &&
    !(shown.archived && f.statuses.includes("Archived"))
  ) {
    return false;
  }
  const tag = f.tags.trim().toLowerCase();
  if (
    tag &&
    (isTokenOnly(script) ||
      !script.tags.some((t) => t.toLowerCase().includes(tag)))
  ) {
    return false;
  }
  return true;
}

export function MyScripts({
  groups: allGroups,
  archived = [],
  synced,
  error,
}: {
  groups: ScriptGroup[];
  archived?: string[];
  synced: boolean;
  error?: string | null;
}) {
  const router = useRouter();
  const [addStep, setAddStep] = useState<"choose" | "manual" | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<ScriptFilters>(EMPTY_FILTERS);
  const [hiddenNow, setHiddenNow] = useState<Record<string, boolean>>({});
  const [archivedNow, setArchivedNow] = useState<Record<string, boolean>>({});
  const [failures, setFailures] = useState<Record<string, string>>({});
  const [sort, setSort] = useState<SortKey>(DEFAULT_SORT);

  const [seenGroups, setSeenGroups] = useState(allGroups);
  if (seenGroups !== allGroups) {
    setSeenGroups(allGroups);
    const loaded = new Map(
      allGroups.flatMap((g) => g.scripts).map((s) => [s.id, s]),
    );
    setHiddenNow((all) => unconfirmed(all, (id) => loaded.get(id)?.hidden));
    setArchivedNow((all) =>
      unconfirmed(all, (id) =>
        loaded.has(id) ? archived.includes(id) : undefined,
      ),
    );
  }

  useEffect(() => {
    const first = allGroups[0]?.scripts[0];
    if (first) router.prefetch(`/scripts/detail?id=${first.id}`);
  }, [allGroups, router]);

  const active = hasActiveFilters(filters);
  const showList = allGroups.length > 0;
  const shown = (script: Script): Shown => ({
    hidden: hiddenNow[script.id] ?? script.hidden,
    archived: archivedNow[script.id] ?? archived.includes(script.id),
  });
  const flat = !synced && allGroups.length === 1;
  const hasTags = allGroups.some((g) =>
    g.scripts.some((s) => !isTokenOnly(s) && s.tags.length > 0),
  );

  const groups = allGroups
    .filter(
      (g) => filters.members.length === 0 || filters.members.includes(g.name),
    )
    .map((g) => ({
      ...g,
      scripts: sortScripts(
        g.scripts.filter((s) => matches(s, shown(s), filters)),
        sort,
      ),
    }))
    .filter((g) => g.scripts.length > 0);

  const fail = (id: string, reason: string | null) =>
    setFailures((all) => {
      const next = { ...all };
      if (reason) next[id] = reason;
      else delete next[id];
      return next;
    });

  const setOverride = (
    set: typeof setHiddenNow,
    id: string,
    value: boolean | null,
  ) =>
    set((all) => {
      const next = { ...all };
      if (value === null) delete next[id];
      else next[id] = value;
      return next;
    });

  async function changeHidden(script: Script, hidden: boolean) {
    fail(script.id, null);
    setOverride(setHiddenNow, script.id, hidden);
    try {
      await setScriptHidden(script.id, hidden);
      router.refresh();
    } catch (e) {
      setOverride(setHiddenNow, script.id, null);
      fail(
        script.id,
        errorText(e, hidden ? "Could not hide it" : "Could not show it"),
      );
    }
  }

  async function changeArchived(script: Script, value: boolean) {
    fail(script.id, null);
    setOverride(setArchivedNow, script.id, value);
    try {
      await setScriptArchived(script.id, value);
      router.refresh();
    } catch (e) {
      setOverride(setArchivedNow, script.id, null);
      fail(script.id, errorText(e, "Could not archive it"));
    }
  }

  async function remove(script: Script) {
    await deleteScript(script.id);
    fail(script.id, null);
  }

  const unset = (key: "statuses" | "members", value: string) =>
    setFilters((f) => ({ ...f, [key]: f[key].filter((v) => v !== value) }));

  const chips: { key: string; label: string; remove: () => void }[] = [
    ...filters.statuses.map((s) => ({
      key: `status-${s}`,
      label: s,
      remove: () => unset("statuses", s),
    })),
    ...filters.members.map((m) => ({
      key: `member-${m}`,
      label: m,
      remove: () => unset("members", m),
    })),
    ...(filters.medication.trim()
      ? [
          {
            key: "medication",
            label: filters.medication.trim(),
            remove: () => setFilters((f) => ({ ...f, medication: "" })),
          },
        ]
      : []),
    ...(filters.tags.trim()
      ? [
          {
            key: "tags",
            label: filters.tags.trim(),
            remove: () => setFilters((f) => ({ ...f, tags: "" })),
          },
        ]
      : []),
  ];

  return (
    <div
      className={cn(
        MY_SCRIPTS_COLUMN,
        showList ? "pt-4 pb-8" : "pt-[17px] pb-[74px]",
      )}
    >
      <div className="flex flex-col gap-9">
        <div className={cn("flex flex-col", active ? "gap-4" : "gap-9")}>
          <div
            className={cn(
              "flex justify-between gap-4",
              showList ? "items-center" : "items-start lg:items-center",
            )}
          >
            <div className="flex flex-col">
              <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
                My Scripts
              </h1>
              {synced ? (
                <p className="flex items-center gap-2 text-body-16 text-secondary-300">
                  <SecurityShield className="size-4 text-success-500" />
                  Synced with official ASL registry
                </p>
              ) : (
                !showList &&
                !error && (
                  <p className="text-body-16 text-secondary-300">
                    Choose how you&apos;d like to add your prescription
                  </p>
                )
              )}
            </div>
            <button
              type="button"
              onClick={() => setAddStep("choose")}
              aria-label="Add a script"
              className="flex size-14 shrink-0 items-center justify-center rounded-card bg-gradient-primary text-white transition-opacity hover:opacity-95"
            >
              <PlusIcon className="size-6" />
            </button>
          </div>

          {active && (
            <div className="flex flex-wrap items-center gap-4">
              {chips.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  onClick={chip.remove}
                  aria-label={`Remove ${chip.label} filter`}
                  className="inline-flex items-center gap-1 rounded-[15px] border border-info-500 bg-primary-500/20 px-[5px] py-[7px] text-caption-12 text-info-500 transition-colors hover:bg-primary-500/30"
                >
                  {chip.label}
                  <Icon src="/icons/scripts/chip-close.svg" size={12} />
                </button>
              ))}
              <button
                type="button"
                onClick={() => setFilters(EMPTY_FILTERS)}
                className="text-caption-12-bold text-info-500 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          {showList && (
            <div className="flex gap-4">
              <div className="relative flex-1 lg:flex-none">
                <Button
                  variant="secondary"
                  className="w-full gap-1 px-[23px] py-[15px] lg:w-auto"
                  onClick={() => setFilterOpen(true)}
                >
                  <Icon src="/icons/scripts/filter.svg" size={24} />
                  <span className="relative">
                    Filters
                    {active && (
                      <span className="absolute top-1 -right-3 size-2 rounded-full bg-primary-500 lg:hidden" />
                    )}
                  </span>
                </Button>
                {active && (
                  <span className="absolute -top-0.5 -right-px hidden size-[11px] rounded-full bg-info-500 lg:block" />
                )}
              </div>
              <SortMenu value={sort} onChange={setSort} />
            </div>
          )}
        </div>

        {error ? (
          <p role="alert" className="text-caption-12 text-error-500">
            {error}
          </p>
        ) : !showList ? (
          <ScriptSourceCards
            variant="page"
            onAddManually={() => setAddStep("manual")}
          />
        ) : groups.length === 0 ? (
          <p className="py-8 text-center text-body-16 text-secondary-300">
            {active
              ? "No scripts match your filters."
              : "All your scripts are archived. Pick Archived in Filters to see them."}
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            {groups.map((group) => (
              <section
                key={group.name}
                aria-label={group.name}
                className="flex flex-col gap-4"
              >
                <div
                  className={cn("flex items-center gap-2", flat && "lg:hidden")}
                >
                  <span
                    className={cn(
                      "flex size-10 items-center justify-center rounded-full text-[14px] leading-5 font-bold text-white",
                      group.avatarClass,
                    )}
                  >
                    {group.initials}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-title-20 text-[#101828]">
                      {group.name}
                    </span>
                    <span className="text-body-14 text-[#6a7282]">
                      ({group.scripts.length})
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {group.scripts.map((script) => (
                    <ScriptCard
                      key={script.id}
                      script={script}
                      {...shown(script)}
                      error={failures[script.id]}
                      onSetHidden={(hidden) =>
                        void changeHidden(script, hidden)
                      }
                      onSetArchived={(value) =>
                        void changeArchived(script, value)
                      }
                      onDelete={() => remove(script)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {addStep && (
        <AddScriptModal
          initialStep={addStep}
          onClose={() => setAddStep(null)}
        />
      )}
      {filterOpen && (
        <FilterModal
          members={allGroups}
          showTags={hasTags}
          initial={filters}
          onApply={(next) => {
            setFilters(next);
            setFilterOpen(false);
          }}
          onClose={() => setFilterOpen(false)}
        />
      )}
    </div>
  );
}
