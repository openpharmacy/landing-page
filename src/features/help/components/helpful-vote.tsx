"use client";

import { useState, useSyncExternalStore } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "yes", label: "Yes", icon: "like" },
  { value: "no", label: "No", icon: "dislike" },
] as const;

type Vote = (typeof OPTIONS)[number]["value"];

const VOTES_KEY = "op_help_votes";
const VOTED_EVENT = "op-help-vote";

function readVotes(): Record<string, unknown> {
  try {
    const votes: unknown = JSON.parse(localStorage.getItem(VOTES_KEY) ?? "{}");
    return votes && typeof votes === "object"
      ? (votes as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

function storedVote(slug: string): Vote | null {
  const vote = readVotes()[slug];
  return vote === "yes" || vote === "no" ? vote : null;
}

function saveVote(slug: string, vote: Vote) {
  try {
    localStorage.setItem(
      VOTES_KEY,
      JSON.stringify({ ...readVotes(), [slug]: vote }),
    );
  } catch {}
  window.dispatchEvent(new Event(VOTED_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(VOTED_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(VOTED_EVENT, onChange);
  };
}

export function HelpfulVote({ slug }: { slug: string }) {
  const stored = useSyncExternalStore(
    subscribe,
    () => storedVote(slug),
    () => null,
  );
  const [chosen, setChosen] = useState<Vote | null>(null);
  const vote = chosen ?? stored;

  return (
    <section className="flex h-[130px] flex-col items-center gap-4 rounded-card-lg border border-[#e5e7eb] bg-white px-6 pt-6">
      <h2 aria-live="polite" className="text-body-18 font-bold text-[#101828]">
        {vote ? "Thanks for your feedback!" : "Was this article helpful?"}
      </h2>
      <div className="flex gap-4">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={vote === option.value}
            onClick={() => {
              setChosen(option.value);
              saveVote(slug, option.value);
            }}
            className={cn(
              "flex h-9 items-center gap-2 rounded-card bg-border-subtle px-3 text-label-14 text-[#101828] transition-colors",
              vote === option.value && "bg-info-500/10",
            )}
          >
            <Icon src={`/icons/help/${option.icon}.svg`} size={16} />
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
