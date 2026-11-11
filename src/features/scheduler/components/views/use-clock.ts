"use client";

import { useSyncExternalStore } from "react";

import { useScheduleStore } from "../../model/store";
import { parseView, type View } from "./calendar";

const nowInSeconds = () => Math.floor(Date.now() / 1000);
let seconds: number | null = null;

function subscribeToClock(onChange: () => void) {
  const tick = () => {
    seconds = nowInSeconds();
    onChange();
  };
  tick();
  const id = setInterval(tick, 15_000);
  return () => clearInterval(id);
}

function readClock() {
  seconds ??= nowInSeconds();
  return seconds;
}

export function useNow(): Date | null {
  const value = useSyncExternalStore(subscribeToClock, readClock, () => null);
  return value === null ? null : new Date(value * 1000);
}

const VIEW_KEY = "op_scheduler_view";

function readView(): View | null {
  try {
    return parseView(localStorage.getItem(VIEW_KEY) ?? undefined);
  } catch {
    return null;
  }
}

function subscribeToStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function useRememberedView(): View | null {
  return useSyncExternalStore(subscribeToStorage, readView, () => null);
}

export function rememberView(view: View) {
  try {
    localStorage.setItem(VIEW_KEY, view);
  } catch {}
}

const subscribeToHydration = (onChange: () => void) =>
  useScheduleStore.persist.onFinishHydration(onChange);

export function useSchedulesHydrated() {
  return useSyncExternalStore(
    subscribeToHydration,
    () => useScheduleStore.persist.hasHydrated(),
    () => false,
  );
}
