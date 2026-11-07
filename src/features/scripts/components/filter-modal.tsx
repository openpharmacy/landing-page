"use client";

import { Check, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type ScriptFilters = {
  medication: string;
  members: string[];
  statuses: string[];
  tags: string;
};

export const EMPTY_FILTERS: ScriptFilters = {
  medication: "",
  members: [],
  statuses: [],
  tags: "",
};

export function hasActiveFilters(filters: ScriptFilters): boolean {
  return (
    filters.medication.trim() !== "" ||
    filters.members.length > 0 ||
    filters.statuses.length > 0 ||
    filters.tags.trim() !== ""
  );
}

// Filter options (Figma `161:3705`). Avatar colours per the design.
const MEMBERS = [
  { name: "John Smith", initials: "JS", color: "#5CB4F8" },
  { name: "Mary Smith", initials: "MS", color: "#E67E22" },
  { name: "David Smith", initials: "DS", color: "#9B59B6" },
];
const STATUSES = [
  "Active",
  "Dispensed",
  "Deferred",
  "Expired",
  "Disabled",
  "Ceased",
  "Archived",
  "Hidden",
];

/**
 * "Filter By" panel (Figma `161:3705`). Edits a local draft; "Apply Filters"
 * commits it via `onApply`, "Clear All" resets the draft. UI-only (mock data).
 */
export function FilterModal({
  initial,
  onApply,
  onClose,
}: {
  initial: ScriptFilters;
  onApply: (filters: ScriptFilters) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<ScriptFilters>(initial);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function toggleMember(name: string) {
    setDraft((d) => ({
      ...d,
      members: d.members.includes(name)
        ? d.members.filter((m) => m !== name)
        : [...d.members, name],
    }));
  }
  function toggleStatus(status: string) {
    setDraft((d) => ({
      ...d,
      statuses: d.statuses.includes(status)
        ? d.statuses.filter((s) => s !== status)
        : [...d.statuses, status],
    }));
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Filter By"
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-default bg-black/40"
        onClick={onClose}
      />

      {/* Full-screen sheet on mobile (Figma `321:4481`); centred card on desktop. */}
      <div className="relative flex h-dvh w-full flex-col overflow-hidden rounded-none bg-white shadow-card sm:h-auto sm:max-h-[90dvh] sm:max-w-[448px] sm:rounded-card">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-neutral-300 p-6">
          <h2 className="text-h4-24 text-[#101828]">Filter By</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-secondary-900 transition-colors hover:text-secondary-500"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="filter-medication">Medication Name</Label>
              <SearchField
                id="filter-medication"
                placeholder="Search medication name"
                value={draft.medication}
                onChange={(value) =>
                  setDraft((d) => ({ ...d, medication: value }))
                }
              />
            </div>

            <div className="h-px bg-neutral-300" />

            <div className="flex flex-col gap-4">
              <span className="text-body-14 text-secondary-900">Members</span>
              <div className="flex flex-col gap-4">
                {MEMBERS.map((member) => {
                  const selected = draft.members.includes(member.name);
                  return (
                    <button
                      key={member.name}
                      type="button"
                      onClick={() => toggleMember(member.name)}
                      className="flex items-center gap-2 text-left"
                    >
                      <span
                        className="flex size-8 items-center justify-center rounded-full text-body-14 font-bold text-white"
                        style={{ backgroundColor: member.color }}
                      >
                        {member.initials}
                      </span>
                      <span className="text-body-16-bold text-secondary-700">
                        {member.name}
                      </span>
                      {selected && (
                        <Check className="ml-auto size-5 text-info-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-neutral-300" />

            <div className="flex flex-col gap-4">
              <span className="text-body-14 text-secondary-900">Status</span>
              <div className="grid grid-cols-2 gap-3">
                {STATUSES.map((status) => {
                  const selected = draft.statuses.includes(status);
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => toggleStatus(status)}
                      className={cn(
                        "rounded-[10px] px-4 py-3 text-body-14 font-bold transition-colors",
                        selected
                          ? "bg-info-500 text-white"
                          : "border border-secondary-500 bg-white text-secondary-500 hover:bg-secondary-500/5",
                      )}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-neutral-300" />

            <div className="flex flex-col gap-2">
              <Label htmlFor="filter-tags">Tags</Label>
              <SearchField
                id="filter-tags"
                placeholder="Search tags..."
                value={draft.tags}
                onChange={(value) => setDraft((d) => ({ ...d, tags: value }))}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 gap-3 border-t border-neutral-300 p-6">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={() => setDraft(EMPTY_FILTERS)}
          >
            Clear All
          </Button>
          <Button
            type="button"
            size="lg"
            className="flex-1"
            onClick={() => onApply(draft)}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}

function SearchField({
  id,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-control border border-neutral-300 bg-white px-3 py-4 transition-colors focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/30">
      <Search className="size-5 shrink-0 text-[#9EB6C9]" />
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full bg-transparent text-body-16 text-secondary-900 outline-none placeholder:text-[#9EB6C9]"
      />
    </div>
  );
}
