"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function FlowShell({
  label,
  step,
  onClose,
  tone = "white",
  children,
}: {
  label: string;
  step: string;
  onClose: () => void;
  tone?: "white" | "app";
  children: ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panel.current;
    if (el && !el.contains(document.activeElement)) {
      el.focus({ preventScroll: true });
    }
  }, [step]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && !event.defaultPrevented) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-50 max-lg:overflow-y-auto lg:flex lg:items-center lg:justify-center lg:p-4"
    >
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/60 max-lg:hidden"
      />
      <div
        ref={panel}
        tabIndex={-1}
        className={cn(
          "relative flex min-h-full flex-col outline-none lg:max-h-[max(calc(100dvh-291px),min(100%,560px))] lg:min-h-0 lg:w-[448px] lg:overflow-hidden lg:rounded-card lg:bg-white",
          tone === "app" ? "max-lg:bg-bg-app" : "max-lg:bg-white",
        )}
      >
        {children}
      </div>
    </div>
  );
}

const WASH =
  "bg-[linear-gradient(135deg,rgb(190_225_252)_0%,rgb(194_221_242)_12.5%,rgb(199_219_234)_25%,rgb(206_219_230)_37.5%,rgb(213_222_229)_50%,rgb(222_227_231)_62.5%,rgb(232_234_236)_75%,rgb(243_243_244)_87.5%,rgb(255_255_255)_100%)]";

export function StepHeader({
  title,
  variant = "form",
  onBack,
  onClose,
}: {
  title: ReactNode;
  variant?: "choose" | "pick" | "form" | "loose";
  onBack?: () => void;
  onClose: () => void;
}) {
  const choose = variant === "choose";
  return (
    <div
      className={cn(
        "flex shrink-0 border-b border-neutral-300 py-6 lg:items-center lg:px-6",
        choose ? "gap-[21px] lg:gap-4" : "gap-4",
        variant === "pick" ? "items-start" : "items-center",
        variant === "loose" && "max-lg:border-b-0",
        "max-lg:pr-[25px] max-lg:pl-[23px]",
      )}
    >
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className={cn(
            "my-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-[#8BBDE5] bg-origin-border transition-opacity hover:opacity-80",
            WASH,
          )}
        >
          <Icon src="/icons/scheduler/add/back.svg" size={24} />
        </button>
      )}
      <h2
        className={cn(
          "min-w-0 flex-1 font-bold lg:flex-none",
          choose
            ? "text-[20px] leading-[30px] text-secondary-900 lg:w-[360px] lg:text-h4-24 lg:text-[#101828]"
            : "text-[20px] lg:w-[305px]",
          variant === "pick" &&
            "leading-[28px] text-[#101828] lg:text-secondary-900",
          variant === "form" && "leading-[28px] text-secondary-900",
          variant === "loose" &&
            "leading-[24px] text-secondary-900 max-lg:-translate-y-0.5",
        )}
      >
        {title}
      </h2>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="flex shrink-0 transition-opacity hover:opacity-70"
      >
        <Icon src="/icons/scheduler/add/close.svg" size={24} />
      </button>
    </div>
  );
}
