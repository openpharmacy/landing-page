"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";

const RECHECK_MS = 10 * 60_000;

async function isOutdated(): Promise<boolean> {
  try {
    const res = await fetch("/api/app/version", { cache: "no-store" });
    if (!res.ok) return false;
    const data = (await res.json()) as { outdated?: unknown };
    return data.outdated === true;
  } catch {
    return false;
  }
}

export function UpdateRequired() {
  const [outdated, setOutdated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let checkedAt = 0;
    async function check() {
      checkedAt = Date.now();
      if ((await isOutdated()) && !cancelled) setOutdated(true);
    }
    function onVisible() {
      if (
        document.visibilityState === "visible" &&
        Date.now() - checkedAt >= RECHECK_MS
      ) {
        void check();
      }
    }
    function onLoad() {
      void check();
    }

    if (document.readyState === "complete") void check();
    else window.addEventListener("load", onLoad, { once: true });
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return outdated ? <UpdateScreen /> : null;
}

function UpdateScreen() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const others = Array.from(document.body.children).filter(
      (el) => el !== ref.current && !el.hasAttribute("inert"),
    );
    for (const el of others) el.setAttribute("inert", "");
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      for (const el of others) el.removeAttribute("inert");
      root.style.overflow = overflow;
    };
  }, []);

  return createPortal(
    <div
      ref={ref}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="update-required-title"
      aria-describedby="update-required-text"
      className="fixed inset-0 z-[100] flex overflow-y-auto bg-bg-app px-4 py-8"
    >
      <div className="m-auto flex w-full max-w-[480px] flex-col items-center gap-8 text-center">
        <InfoCircle />
        <div className="flex flex-col gap-2">
          <h2
            id="update-required-title"
            className="text-display-32 text-secondary-900"
          >
            Update required
          </h2>
          <p
            id="update-required-text"
            className="text-body-16 text-secondary-500"
          >
            This version of OpenPharmacy is no longer supported. Refresh to load
            the latest version.
          </p>
        </div>
        <Button
          type="button"
          size="lg"
          className="w-full"
          autoFocus
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      </div>
    </div>,
    document.body,
  );
}

function InfoCircle() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="currentColor"
      className="shrink-0 text-primary-500"
      aria-hidden
    >
      <circle cx="60" cy="60" r="50" opacity="0.4" />
      <rect x="56.25" y="36.25" width="7.5" height="32.5" rx="3.75" />
      <circle cx="60" cy="80" r="5" />
    </svg>
  );
}
