"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

const HEIGHT = 213;
const GAP = 4;
const THUMB = 125;
const INSET = 15;

export function ListMenu<T extends string | number | null>({
  anchor,
  width,
  label,
  options,
  value,
  onPick,
  onClose,
}: {
  anchor: RefObject<HTMLElement | null>;
  width?: number;
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onPick: (value: T) => void;
  onClose: () => void;
}) {
  const menu = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [thumbTop, setThumbTop] = useState(INSET);

  useLayoutEffect(() => {
    place(anchor.current, menu.current, width);
    const selected = list.current?.querySelector<HTMLElement>(
      "[aria-selected=true]",
    );
    const view = list.current;
    if (
      selected &&
      view &&
      selected.offsetTop + selected.offsetHeight > view.clientHeight
    ) {
      view.scrollTop = selected.offsetTop - INSET;
    }
    selected?.focus({ preventScroll: true });
  }, [anchor, width]);

  useEffect(() => {
    const trigger = anchor.current;
    return () => {
      const active = document.activeElement;
      if (active && active !== document.body) return;
      const button = trigger?.matches("button")
        ? trigger
        : trigger?.querySelector("button");
      button?.focus({ preventScroll: true });
    };
  }, [anchor]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (menu.current?.contains(target)) return;
      if (anchor.current?.contains(target)) return;
      onClose();
    }
    function follow(event: Event) {
      if (event.target instanceof Node && menu.current?.contains(event.target))
        return;
      place(anchor.current, menu.current, width);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      onClose();
    }
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", follow, true);
    window.addEventListener("resize", follow);
    window.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", follow, true);
      window.removeEventListener("resize", follow);
      window.removeEventListener("keydown", onKey, true);
    };
  }, [anchor, width, onClose]);

  function onListScroll() {
    const el = list.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const travel = el.clientHeight - THUMB - 2 * INSET;
    setThumbTop(INSET + (max > 0 ? (el.scrollTop / max) * travel : 0));
  }

  function move(event: React.KeyboardEvent, index: number) {
    const items = list.current?.querySelectorAll<HTMLElement>("button");
    if (!items) return;
    const next =
      event.key === "ArrowDown"
        ? index + 1
        : event.key === "ArrowUp"
          ? index - 1
          : null;
    if (next === null || next < 0 || next >= items.length) return;
    event.preventDefault();
    items[next]?.focus();
  }

  return (
    <div
      ref={menu}
      className="fixed z-[60] h-[213px] overflow-hidden rounded-[4px] border border-neutral-300 bg-white"
      style={{ visibility: "hidden" }}
    >
      <ul
        ref={list}
        role="listbox"
        aria-label={label}
        onScroll={onListScroll}
        className="h-full [scrollbar-width:none] overflow-y-auto px-[15px] pt-[15px] pb-[23px] [&::-webkit-scrollbar]:hidden"
      >
        {options.map((option, index) => (
          <li key={String(option.value)} role="none">
            <button
              type="button"
              role="option"
              aria-selected={option.value === value}
              onClick={() => onPick(option.value)}
              onKeyDown={(event) => move(event, index)}
              className="flex h-12 w-full items-center rounded-[10px] text-left text-body-16-bold text-secondary-900 outline-none focus-visible:bg-bg-section"
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
      <span
        aria-hidden
        className="pointer-events-none absolute right-[19px] h-[125px] w-1.5 rounded-full bg-neutral-300"
        style={{ top: thumbTop }}
      />
    </div>
  );
}

function place(
  anchor: HTMLElement | null,
  el: HTMLElement | null,
  width: number | undefined,
) {
  const rect = anchor?.getBoundingClientRect();
  if (!rect || !el) return;
  const below = rect.bottom + GAP + HEIGHT <= window.innerHeight;
  const above = rect.top - GAP - HEIGHT >= 0;
  el.style.top = `${below || !above ? rect.bottom + GAP : rect.top - GAP - HEIGHT}px`;
  el.style.left = `${rect.left}px`;
  el.style.width = `${width ?? rect.width}px`;
  el.style.visibility = "visible";
}
