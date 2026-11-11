"use client";

import { useEffect, useRef } from "react";

import type { GoogleButton } from "../api/provider-sdk";

const GOOGLE_HEIGHT = 40;
const MIN_WIDTH = 200;
const MAX_WIDTH = 400;
const SCALE = 1.5;
const DESIGN_WIDTH = 480;

export function GoogleSignInButton({ button }: { button: GoogleButton }) {
  const host = useRef<HTMLDivElement>(null);
  const drawn = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = host.current;
    const el = drawn.current;
    if (!box || !el) return;
    let width = 0;
    const draw = () => {
      const room = box.clientWidth || DESIGN_WIDTH;
      const scale = Math.min(SCALE, room / MIN_WIDTH);
      const next = Math.min(MAX_WIDTH, Math.round(room / scale));
      if (next === width) return;
      width = next;
      box.style.height = `${GOOGLE_HEIGHT * scale}px`;
      el.style.transform = `scale(${scale})`;
      el.replaceChildren();
      button.render(el, width);
    };
    draw();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(draw);
    observer.observe(box);
    return () => {
      observer.disconnect();
      el.replaceChildren();
    };
  }, [button]);

  return (
    <div ref={host} className="flex h-[60px] justify-center">
      <div ref={drawn} className="origin-top" />
    </div>
  );
}
