"use client";

import { useEffect, useRef } from "react";

import type { GoogleButton } from "../api/provider-sdk";

const MAX_WIDTH = 400;

export function GoogleSignInButton({ button }: { button: GoogleButton }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let width = 0;
    const draw = () => {
      const next = Math.min(MAX_WIDTH, el.clientWidth || MAX_WIDTH);
      if (next === width) return;
      width = next;
      el.replaceChildren();
      button.render(el, width);
    };
    draw();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(draw);
    observer.observe(el);
    return () => {
      observer.disconnect();
      el.replaceChildren();
    };
  }, [button]);

  return <div ref={host} className="flex min-h-11 justify-center" />;
}
