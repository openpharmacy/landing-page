"use client";

import { cn } from "@/lib/utils";

import type { MedicationScript } from "../model/script";

export type Notice = { text: string; error?: boolean };

export function NoticeLine({ notice }: { notice: Notice }) {
  return (
    <p
      role={notice.error ? "alert" : "status"}
      className={cn(
        "text-caption-12",
        notice.error ? "text-error-500" : "text-[#219a55]",
      )}
    >
      {notice.text}
    </p>
  );
}

export async function shareScript(
  script: Pick<MedicationScript, "name" | "token">,
): Promise<Notice | null> {
  const data = {
    title: script.name,
    text: `${script.name}\neScript token: ${script.token}`,
  };
  if (typeof navigator.share === "function") {
    try {
      await navigator.share(data);
      return null;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return null;
      }
    }
  }
  try {
    await navigator.clipboard.writeText(script.token);
    return { text: "eScript token copied" };
  } catch {
    return { text: "Could not copy the eScript token", error: true };
  }
}
