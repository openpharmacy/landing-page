"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { AI_SUGGESTIONS } from "./draft";

const ROWS = [
  "h-10 pr-[15px] leading-6",
  "h-10 pr-[7px] leading-6",
  "h-8 pr-[7px] leading-4",
  "h-11 pr-[7px] leading-[14.4px]",
];

export function NoteStep({
  note,
  suggestions,
  onNote,
  onSuggestions,
  onNext,
}: {
  note: string;
  suggestions: string[];
  onNote: (note: string) => void;
  onSuggestions: (suggestions: string[]) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col px-4 pb-6 lg:px-6 lg:pt-6 lg:pb-9">
      <textarea
        aria-label="Note"
        value={note}
        onChange={(event) => onNote(event.target.value)}
        placeholder="e.g. Take with food..."
        maxLength={500}
        className="h-[181px] w-full resize-none rounded-[7px] border border-neutral-300 bg-white px-[7px] pt-[7px] pb-[11px] text-[14px] leading-6 text-secondary-900 outline-none placeholder:text-[#b8c0c9] focus-visible:border-info-500"
      />
      <div className="mt-12 flex flex-col gap-2 lg:mt-[23px]">
        <h3 className="text-[14px] leading-6 font-bold text-secondary-900">
          Ai suggestions
        </h3>
        <ul className="flex flex-col gap-2">
          {AI_SUGGESTIONS.map((text, index) => {
            const on = suggestions.includes(text);
            return (
              <li key={text}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={on}
                  onClick={() =>
                    onSuggestions(
                      on
                        ? suggestions.filter((s) => s !== text)
                        : [...suggestions, text],
                    )
                  }
                  className={cn(
                    "flex w-full items-center gap-3 rounded-[7px] border border-neutral-300 bg-white pl-[15px] text-left text-[12px] text-secondary-900",
                    ROWS[index],
                  )}
                >
                  <span
                    className={cn(
                      "size-3.5 shrink-0 rounded-[2px] border-2 border-primary-500",
                      on && "bg-primary-500",
                    )}
                  />
                  <span className="min-w-0 flex-1">{text}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        type="button"
        onClick={onNext}
        className="mt-6 w-full lg:mt-[23px]"
      >
        Next
      </Button>
    </div>
  );
}
