"use client";

import { useEffect, useRef } from "react";

import type { GoogleButton } from "../api/provider-sdk";

const MAX_WIDTH = 400;

export function GoogleOverlay({ button }: { button: GoogleButton | null }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    const box = el?.parentElement;
    if (!button || !el || !box) return;

    const fit = () => {
      const { offsetWidth: width, offsetHeight: height } = el;
      if (!width || !height) return;
      el.style.transform = `scale(${box.clientWidth / width}, ${box.clientHeight / height})`;
    };
    button.render(el, Math.min(MAX_WIDTH, box.clientWidth || MAX_WIDTH));
    fit();

    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    observer.observe(box);
    return () => {
      observer.disconnect();
      el.replaceChildren();
    };
  }, [button]);

  if (!button) return null;
  return (
    <div className="absolute inset-0 overflow-hidden rounded-control opacity-0">
      <div ref={host} className="inline-block origin-top-left" />
    </div>
  );
}
