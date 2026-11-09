"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

let running: Promise<void> | null = null;

async function requestSync(): Promise<boolean> {
  try {
    const res = await fetch("/api/scripts/sync", { method: "POST" });
    if (res.status === 401) return true;
    if (!res.ok) return false;
    const data = (await res.json()) as { updated?: unknown };
    return data.updated === true;
  } catch {
    return false;
  }
}

function syncScripts(refresh: () => void): Promise<void> {
  running ??= requestSync()
    .then((changed) => {
      if (changed) refresh();
    })
    .finally(() => {
      running = null;
    });
  return running;
}

export function ScriptsSync() {
  const router = useRouter();
  useEffect(() => {
    void syncScripts(() => router.refresh());
  }, [router]);
  return null;
}
