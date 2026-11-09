"use client";

import { useRef, type FormEvent } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function SearchField({
  value,
  onChange,
  onSubmit,
  placeholder,
  label,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder: string;
  label: string;
  className?: string;
}) {
  const input = useRef<HTMLInputElement>(null);

  function submit(event: FormEvent) {
    event.preventDefault();
    onSubmit?.(value);
  }

  return (
    <form
      role="search"
      onSubmit={submit}
      className={cn(
        "flex h-[52px] items-center gap-2.5 rounded-card border border-neutral-300 bg-white px-[15px] transition-colors focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/30",
        className,
      )}
    >
      <Icon src="/icons/help/search.svg" size={24} />
      <input
        ref={input}
        type="search"
        enterKeyHint="search"
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-5 min-w-0 flex-1 bg-transparent text-body-14 font-bold text-secondary-900 outline-none placeholder:font-normal placeholder:text-secondary-300 [&::-webkit-search-cancel-button]:appearance-none"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            onChange("");
            input.current?.focus();
          }}
          className="flex"
        >
          <Icon src="/icons/help/clear.svg" size={24} />
        </button>
      )}
    </form>
  );
}
