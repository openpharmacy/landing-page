"use client";

import { ArrowUpDown, ListFilter, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { AddScriptModal } from "./add-script-modal";
import {
  EMPTY_FILTERS,
  FilterModal,
  hasActiveFilters,
  type ScriptFilters,
} from "./filter-modal";
import { ScriptCard, type Script } from "./script-card";
import { SecurityShield } from "./security-shield";
import { PlusIcon, ScriptSourceCards } from "./script-source-cards";

const TAGS = ["diabetes", "twice-daily", "with-food"];

// Manually-added scripts — the user's own, not ASL (no shield → Paper detail).
const MANUAL_SCRIPTS: Script[] = [
  {
    name: "Atorvastatin 20mg",
    detail: "20mg tablet • 3 repeats left",
    tags: ["cholesterol", "once-daily"],
    status: "active",
  },
  {
    name: "Sertraline 50mg",
    detail: "50mg tablet • 0 repeats left",
    tags: ["mental-health", "morning"],
    status: "expired",
  },
];

// ASL-synced scripts, grouped by patient (Figma 161:2869). All shield-secured.
const ASL_GROUPS: {
  name: string;
  initials: string;
  avatarClass: string;
  scripts: Script[];
}[] = [
  {
    name: "John Smith",
    initials: "JS",
    avatarClass: "bg-primary-500",
    scripts: [
      {
        name: "Metformin 500mg",
        detail: "500mg tablet • 2 repeats left",
        tags: TAGS,
        status: "active",
        secure: true,
      },
      {
        name: "Amlodipine 5mg",
        detail: "5mg tablet • 0 repeats left",
        tags: TAGS,
        status: "expired",
        secure: true,
      },
    ],
  },
  {
    name: "Mary Smith",
    initials: "MS",
    avatarClass: "bg-[#E67E22]",
    scripts: [
      {
        name: "Amlodipine 5mg",
        detail: "5mg tablet • 0 repeats left",
        tags: ["twice-daily", "with-food"],
        status: "active",
        secure: true,
      },
    ],
  },
];

/** Whether a script passes the active filters (medication / status / tags). */
function matchesScript(script: Script, f: ScriptFilters): boolean {
  const medication = f.medication.trim().toLowerCase();
  if (medication && !script.name.toLowerCase().includes(medication)) {
    return false;
  }
  if (f.statuses.length > 0) {
    const label = script.status === "active" ? "Active" : "Expired";
    if (!f.statuses.includes(label)) return false;
  }
  const tag = f.tags.trim().toLowerCase();
  if (tag && !script.tags.some((t) => t.toLowerCase().includes(tag))) {
    return false;
  }
  return true;
}

export function MyScripts({
  connected,
  added,
}: {
  connected: boolean;
  added: boolean;
}) {
  const [addOpen, setAddOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<ScriptFilters>(EMPTY_FILTERS);

  const active = hasActiveFilters(filters);
  const showList = connected || added;

  const visibleGroups = ASL_GROUPS.filter(
    (g) => filters.members.length === 0 || filters.members.includes(g.name),
  )
    .map((g) => ({
      ...g,
      scripts: g.scripts.filter((s) => matchesScript(s, filters)),
    }))
    .filter((g) => g.scripts.length > 0);

  const visibleManual = MANUAL_SCRIPTS.filter((s) => matchesScript(s, filters));

  // In the synced view, also show manually-added scripts as a group (hidden
  // when filtering by a specific ASL member).
  const manualGroup =
    filters.members.length === 0 && visibleManual.length > 0
      ? {
          name: "Emma Wilson",
          initials: "EW",
          avatarClass: "bg-[#9B59B6]",
          scripts: visibleManual,
        }
      : null;
  const displayGroups = [
    ...visibleGroups,
    ...(manualGroup ? [manualGroup] : []),
  ];

  // Active-filter chips (status, then members, then the free-text fields).
  const chips: { key: string; label: string; remove: () => void }[] = [
    ...filters.statuses.map((s) => ({
      key: `status-${s}`,
      label: s,
      remove: () =>
        setFilters((f) => ({
          ...f,
          statuses: f.statuses.filter((x) => x !== s),
        })),
    })),
    ...filters.members.map((m) => ({
      key: `member-${m}`,
      label: m,
      remove: () =>
        setFilters((f) => ({
          ...f,
          members: f.members.filter((x) => x !== m),
        })),
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

  const listEmpty = connected
    ? displayGroups.length === 0
    : visibleManual.length === 0;

  return (
    <div className="mx-auto w-full max-w-[870px] px-4 pt-8 pb-20">
      <div className="flex flex-col gap-9">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col">
            <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
              My Scripts
            </h1>
            {connected ? (
              <p className="flex items-center gap-1.5 text-body-16 text-secondary-300">
                <SecurityShield className="size-4 text-success-500" />
                Synced with official ASL registry
              </p>
            ) : (
              !added && (
                <p className="text-body-16 text-secondary-300">
                  Choose how you&apos;d like to add your prescription
                </p>
              )
            )}
          </div>
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            aria-label="Add a script"
            className="flex size-14 shrink-0 items-center justify-center rounded-card bg-gradient-primary text-white shadow-float transition-opacity hover:opacity-95"
          >
            <PlusIcon className="size-6" />
          </button>
        </div>

        {showList && (
          <div className="flex flex-col gap-4">
            {active && (
              <div className="flex flex-wrap items-center gap-2">
                {chips.map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    onClick={chip.remove}
                    className="inline-flex items-center gap-1 rounded-full border border-info-500/40 bg-info-500/10 py-1 pr-1.5 pl-2.5 text-caption-12 text-info-500 transition-colors hover:bg-info-500/20"
                  >
                    {chip.label}
                    <X className="size-3.5" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setFilters(EMPTY_FILTERS)}
                  className="ml-1 text-caption-12-bold text-info-500 hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}

            <div className="flex gap-4">
              <div className="relative flex-1 lg:flex-none">
                <Button
                  variant="secondary"
                  className="w-full gap-1 lg:w-auto"
                  onClick={() => setFilterOpen(true)}
                >
                  <ListFilter className="size-6" />
                  Filters
                </Button>
                {active && (
                  <span className="absolute -top-1 -right-1 size-3 rounded-full border-2 border-bg-app bg-info-500" />
                )}
              </div>
              <Button variant="secondary" className="flex-1 gap-1 lg:flex-none">
                <ArrowUpDown className="size-6" />
                Sort
              </Button>
            </div>
          </div>
        )}

        {connected ? (
          listEmpty ? (
            <EmptyFilterState />
          ) : (
            <div className="flex flex-col gap-8">
              {displayGroups.map((group) => (
                <div key={group.name} className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex size-10 items-center justify-center rounded-full text-body-14 font-bold text-white",
                        group.avatarClass,
                      )}
                    >
                      {group.initials}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-title-20 text-[#101828]">
                        {group.name}
                      </span>
                      <span className="text-body-14 text-[#6A7282]">
                        ({group.scripts.length})
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    {group.scripts.map((script, index) => (
                      <ScriptCard key={index} script={script} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : added ? (
          listEmpty ? (
            <EmptyFilterState />
          ) : (
            <div className="flex flex-col gap-4">
              {visibleManual.map((script, index) => (
                <ScriptCard key={index} script={script} />
              ))}
            </div>
          )
        ) : (
          <ScriptSourceCards addManuallyHref="/scripts/add" />
        )}
      </div>

      {addOpen && <AddScriptModal onClose={() => setAddOpen(false)} />}
      {filterOpen && (
        <FilterModal
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

function EmptyFilterState() {
  return (
    <p className="py-8 text-center text-body-16 text-secondary-300">
      No scripts match your filters.
    </p>
  );
}
