"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { STATUS_LABEL } from "../model/script";

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

type Member = { name: string; initials: string; avatarClass: string };
const STATUSES = [...Object.values(STATUS_LABEL), "Archived", "Hidden"];

export function FilterModal({
  members,
  showTags,
  initial,
  onApply,
  onClose,
}: {
  members: Member[];
  showTags: boolean;
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

  function toggle(key: "members" | "statuses", value: string) {
    setDraft((d) => ({
      ...d,
      [key]: d[key].includes(value)
        ? d[key].filter((v) => v !== value)
        : [...d[key], value],
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
        className="absolute inset-0 cursor-default bg-black/60"
        onClick={onClose}
      />

      <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-white sm:h-auto sm:max-h-full sm:max-w-[448px] sm:rounded-card">
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-neutral-300 p-6">
          <h2 className="text-h4-24 text-[#101828]">Filter By</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="transition-opacity hover:opacity-70"
          >
            <Icon src="/icons/scripts/close.svg" size={24} />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
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

          <Divider />

          <div className="flex flex-col gap-4">
            <span className="text-body-14 text-secondary-900">Members</span>
            {members.map((member) => {
              const selected = draft.members.includes(member.name);
              return (
                <button
                  key={member.name}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggle("members", member.name)}
                  className="flex items-center gap-2 text-left"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full text-caption-12-bold text-white",
                      member.avatarClass,
                    )}
                  >
                    {member.initials}
                  </span>
                  <span className="text-body-16-bold text-secondary-700">
                    {member.name}
                  </span>
                  {selected && (
                    <Icon
                      src="/icons/check.svg"
                      size={20}
                      className="ml-auto"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <Divider />

          <div className="flex flex-col gap-4">
            <span className="text-body-14 text-secondary-900">Status</span>
            <div className="grid auto-rows-[44px] grid-cols-2 grid-rows-[44px_44px_44px_45px] gap-x-2 gap-y-[9px]">
              {STATUSES.map((status) => {
                const selected = draft.statuses.includes(status);
                return (
                  <button
                    key={status}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggle("statuses", status)}
                    className={cn(
                      "self-start rounded-[10px] text-left font-bold transition-colors",
                      selected
                        ? "h-[45px] bg-info-500 px-4 py-3 text-[14px] leading-[21px] text-white"
                        : "h-11 border border-secondary-500 bg-white px-[15px] py-[11px] text-body-14 text-secondary-500 hover:bg-secondary-500/5",
                    )}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>

          {showTags && (
            <>
              <Divider />
              <div className="flex flex-col gap-2">
                <Label htmlFor="filter-tags">Tags</Label>
                <SearchField
                  id="filter-tags"
                  placeholder="Search tags..."
                  value={draft.tags}
                  onChange={(value) => setDraft((d) => ({ ...d, tags: value }))}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex shrink-0 gap-3 border-t border-neutral-300 px-6 pt-[23px] pb-6">
          <Button
            type="button"
            variant="secondary"
            className="flex-1 px-[23px] py-[15px]"
            disabled={!hasActiveFilters(draft)}
            onClick={() => setDraft(EMPTY_FILTERS)}
          >
            Clear All
          </Button>
          <Button
            type="button"
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

function Divider() {
  return <div className="-mt-px h-px shrink-0 bg-neutral-300" />;
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
    <div className="flex items-center gap-2 rounded-control border border-neutral-300 bg-white px-[11px] py-[15px] transition-colors focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/30">
      <Icon src="/icons/scripts/search.svg" size={20} />
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full bg-transparent text-body-16 text-secondary-900 outline-none placeholder:text-[#9eb6c9]"
      />
    </div>
  );
}
