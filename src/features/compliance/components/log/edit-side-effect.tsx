"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  useRehydrateSideEffects,
  useSideEffectStore,
} from "@/features/compliance/model/side-effect-store";

import { SideEffectFlow } from "./side-effect-flow";
import { useHydrated } from "./use-client-state";

const DIARY = "/compliance/side-effects";

export function EditSideEffect({ id }: { id: string }) {
  const router = useRouter();
  useRehydrateSideEffects();
  const hydrated = useHydrated(useSideEffectStore);
  const entry = useSideEffectStore((s) => s.entries.find((e) => e.id === id));
  const updateEntry = useSideEffectStore((s) => s.updateEntry);

  const missing = hydrated && !entry;
  useEffect(() => {
    if (missing) router.replace(DIARY);
  }, [missing, router]);

  if (!hydrated || !entry) return <div className="min-h-[905px] lg:hidden" />;

  return (
    <SideEffectFlow
      mode="edit"
      medication={entry.medication}
      date={entry.date}
      initial={entry}
      onExit={() => router.push(DIARY)}
      onSave={({ symptoms, note }) => {
        updateEntry({ ...entry, symptoms, note });
        router.push(DIARY);
      }}
    />
  );
}
