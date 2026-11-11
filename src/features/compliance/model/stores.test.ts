import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { MOCK_SIDE_EFFECTS } from "./mock-side-effects";
import type { SideEffectEntry } from "./side-effects";
import type { VitalReading } from "./vitals";
import { isSampleReading, sampleReadings } from "./vitals-samples";

const MY_ENTRY: SideEffectEntry = {
  id: "se-mine",
  medication: "Panadol 500mg",
  date: "2026-11-06",
  symptoms: [{ symptom: "Nausea", severity: "Mild" }],
};
const MY_READING: VitalReading = {
  id: "vital-mine",
  date: "2026-11-06",
  time: "09:00",
  type: "heartRate",
  value: 64,
};

async function load(mock: boolean) {
  vi.resetModules();
  vi.doMock("@/config/env", () => ({ isMockingEnabled: mock }));
  return {
    ...(await import("./side-effect-store")),
    ...(await import("./vitals-store")),
    ...(await import("@/lib/user-storage")),
    ...(await import("@/features/auth/stores/auth-store")),
  };
}

function signedInAs(id: string) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => Response.json({ user: { id, email: "", name: id } })),
  );
}

type Modules = Awaited<ReturnType<typeof load>>;

async function open(modules: Modules) {
  const { unmount } = renderHook(() => {
    modules.useRehydrateSideEffects();
    modules.useRehydrateVitals();
  });
  await waitFor(() => {
    expect(modules.useSideEffectStore.persist.hasHydrated()).toBe(true);
    expect(modules.useVitalsStore.getState().hydrated).toBe(true);
  });
  unmount();
}

const save = (name: string, state: unknown) =>
  localStorage.setItem(name, JSON.stringify({ state, version: 0 }));

beforeEach(() => {
  localStorage.clear();
  signedInAs("ann");
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.doUnmock("@/config/env");
});

describe("the side-effect diary", () => {
  it("starts from the sample entries in mock mode only", async () => {
    const mock = await load(true);
    expect(mock.useSideEffectStore.getState().entries).toEqual(
      MOCK_SIDE_EFFECTS,
    );
    const real = await load(false);
    expect(real.useSideEffectStore.getState().entries).toEqual([]);
  });

  it("drops sample entries an earlier version saved, in real mode only", async () => {
    save("op_side_effects", { entries: [MY_ENTRY, ...MOCK_SIDE_EFFECTS] });
    const real = await load(false);
    await open(real);
    expect(real.useSideEffectStore.getState().entries).toEqual([MY_ENTRY]);

    localStorage.clear();
    save("op_side_effects", { entries: [MY_ENTRY, ...MOCK_SIDE_EFFECTS] });
    const mock = await load(true);
    await open(mock);
    expect(mock.useSideEffectStore.getState().entries).toHaveLength(
      MOCK_SIDE_EFFECTS.length + 1,
    );
  });

  it("keeps what this version saved", async () => {
    const first = await load(false);
    await open(first);
    first.useSideEffectStore.setState({ entries: MOCK_SIDE_EFFECTS });
    const again = await load(false);
    await open(again);
    expect(again.useSideEffectStore.getState().entries).toEqual(
      MOCK_SIDE_EFFECTS,
    );
  });
});

describe("one browser, two accounts", () => {
  it("keeps each user's diary and vitals apart", async () => {
    const modules = await load(false);
    await open(modules);
    modules.useSideEffectStore.getState().addEntry(MY_ENTRY);
    modules.useVitalsStore.getState().addReadings([MY_READING]);
    expect(
      localStorage.getItem(`op_side_effects:${modules.userKey("ann")}`),
    ).toContain(MY_ENTRY.id);

    signedInAs("ben");
    modules.useAuthStore.getState().setUser({ id: "ben", email: "b@x.com" });
    expect(modules.useSideEffectStore.getState().entries).toEqual([]);
    expect(modules.useVitalsStore.getState()).toMatchObject({
      readings: [],
      hydrated: false,
    });
    await open(modules);
    expect(modules.useSideEffectStore.getState().entries).toEqual([]);
    expect(modules.useVitalsStore.getState().readings).toEqual([]);

    signedInAs("ann");
    modules.useAuthStore.getState().setUser({ id: "ann", email: "a@x.com" });
    await open(modules);
    expect(modules.useSideEffectStore.getState().entries).toEqual([MY_ENTRY]);
    expect(modules.useVitalsStore.getState().readings).toEqual([MY_READING]);
  });
});

describe("the vitals", () => {
  const today = new Date(2026, 10, 6, 9, 30);

  it("adds the sample readings on the first visit in mock mode only", async () => {
    const { afterLoad } = await load(false);
    const first = { seeded: false, readings: [MY_READING] };
    expect(afterLoad(first, true, today)).toEqual({
      readings: [MY_READING, ...sampleReadings(today)],
      seeded: true,
      hydrated: true,
    });
    expect(afterLoad({ ...first, seeded: true }, true, today)).toEqual({
      hydrated: true,
    });
    expect(afterLoad(first, false, today)).toEqual({ hydrated: true });
  });

  it("drops sample readings an earlier version saved, in real mode", async () => {
    save("op_vitals", {
      readings: [MY_READING, ...sampleReadings(new Date(2025, 9, 12))],
      seeded: true,
    });
    const modules = await load(false);
    await open(modules);
    expect(modules.useVitalsStore.getState().readings).toEqual([MY_READING]);
  });

  it("knows a sample from an edited one", () => {
    const [bp] = sampleReadings(today);
    expect(isSampleReading(bp)).toBe(true);
    expect(isSampleReading({ ...bp, time: "08:45" })).toBe(false);
    expect(isSampleReading(MY_READING)).toBe(false);
  });
});
