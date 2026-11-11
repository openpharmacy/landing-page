import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { MOCK_DOSES, MOCK_SCHEDULES } from "./mock-schedules";
import type { Schedule } from "./schedule";

const MINE: Schedule = {
  id: "5f0c2d1e-0000-4000-8000-000000000001",
  name: "Panadol 500mg",
  colour: "#EF4444",
  frequency: { kind: "daily" },
  intakes: [{ time: "08:00", quantity: 1, unit: "Tablet" }],
  remindMinutesBefore: 15,
  startDate: "2026-11-06",
};
const MY_DOSE = {
  scheduleId: MINE.id,
  date: "2026-11-06",
  time: "08:00",
  status: "taken" as const,
};
const THEIRS: Schedule = { ...MINE, id: "theirs", name: "Ventolin 100mcg" };

function signedInAs(id: string | null) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () =>
      id === null
        ? Response.json({ error: "Not authenticated" }, { status: 401 })
        : Response.json({ user: { id, email: `${id}@example.com`, name: id } }),
    ),
  );
}

async function loadModules(mock: boolean) {
  vi.resetModules();
  vi.doMock("@/config/env", () => ({ isMockingEnabled: mock }));
  const store = await import("./store");
  const storage = await import("@/lib/user-storage");
  const auth = await import("@/features/auth/stores/auth-store");
  return { ...store, ...storage, ...auth };
}

const load = (modules: Awaited<ReturnType<typeof loadModules>>) =>
  modules.loadSchedules();

const saved = (key: string) => {
  const raw = localStorage.getItem(key);
  return raw === null ? null : JSON.parse(raw).state;
};

beforeEach(() => {
  localStorage.clear();
  signedInAs("ann");
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.doUnmock("@/config/env");
});

describe("the schedule store", () => {
  it("starts from the sample schedules in mock mode only", async () => {
    const mock = await loadModules(true);
    expect(mock.useScheduleStore.getState()).toMatchObject({
      schedules: MOCK_SCHEDULES,
      doses: MOCK_DOSES,
    });
    await load(mock);
    expect(mock.useScheduleStore.getState().schedules).toEqual(MOCK_SCHEDULES);

    const real = await loadModules(false);
    expect(real.useScheduleStore.getState()).toMatchObject({
      schedules: [],
      doses: [],
    });
  });

  it("saves under an opaque key of the signed-in user", async () => {
    const modules = await loadModules(false);
    await load(modules);
    modules.useScheduleStore.getState().addSchedule(MINE);

    const key = `op_schedules:${modules.userKey("ann")}`;
    expect(saved(key).schedules).toEqual([MINE]);
    expect(localStorage.getItem("op_schedules")).toBeNull();
    expect(Object.keys(localStorage).join()).not.toContain("ann");
    expect(modules.userKey("ann")).toMatch(/^[0-9a-f]{16}$/);
    expect(modules.userKey("ann")).not.toBe(modules.userKey("ben"));
  });

  it("shows each account only its own schedules", async () => {
    const modules = await loadModules(false);
    const { useScheduleStore, useAuthStore } = modules;
    await load(modules);
    useScheduleStore.getState().addSchedule(MINE);

    signedInAs("ben");
    useAuthStore.getState().setUser({ id: "ben", email: "ben@example.com" });
    expect(useScheduleStore.getState().schedules).toEqual([]);
    expect(useScheduleStore.persist.hasHydrated()).toBe(false);
    await load(modules);
    expect(useScheduleStore.getState().schedules).toEqual([]);
    useScheduleStore.getState().addSchedule(THEIRS);

    signedInAs("ann");
    await load(modules);
    expect(useScheduleStore.getState().schedules).toEqual([MINE]);
    expect(saved(`op_schedules:${modules.userKey("ben")}`).schedules).toEqual([
      THEIRS,
    ]);
  });

  it("holds and saves nothing while signed out", async () => {
    const modules = await loadModules(false);
    await load(modules);
    modules.useScheduleStore.getState().addSchedule(MINE);

    signedInAs(null);
    modules.useAuthStore.getState().clear();
    await load(modules);
    expect(modules.useScheduleStore.getState().schedules).toEqual([]);
    modules.useScheduleStore.getState().addSchedule(THEIRS);
    expect(Object.keys(localStorage)).toEqual([
      `op_schedules:${modules.userKey("ann")}`,
    ]);
  });

  it("keeps the data when the session cannot be checked", async () => {
    const modules = await loadModules(false);
    await load(modules);
    modules.useScheduleStore.getState().addSchedule(MINE);
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("Failed to fetch");
      }),
    );
    await load(modules);
    expect(modules.useScheduleStore.getState().schedules).toEqual([MINE]);
  });

  it("waits while the session cannot be told, then loads the user's", async () => {
    vi.useFakeTimers();
    try {
      const modules = await loadModules(false);
      localStorage.setItem(
        `op_schedules:${modules.userKey("ann")}`,
        JSON.stringify({ state: { schedules: [MINE], doses: [] }, version: 1 }),
      );
      const answers = [
        () => Promise.reject(new TypeError("Failed to fetch")),
        () => Response.json({ error: "Unavailable" }, { status: 503 }),
        () => Response.json({ user: { id: "ann", email: "", name: "Ann" } }),
      ];
      vi.stubGlobal(
        "fetch",
        vi.fn(async () => answers.shift()!()),
      );
      const loaded = load(modules);
      await vi.advanceTimersByTimeAsync(600);
      expect(modules.useScheduleStore.persist.hasHydrated()).toBe(false);
      await vi.advanceTimersByTimeAsync(1000);
      await loaded;
      expect(modules.useScheduleStore.persist.hasHydrated()).toBe(true);
      expect(modules.useScheduleStore.getState().schedules).toEqual([MINE]);
    } finally {
      vi.useRealTimers();
    }
  });

  it("gives what an earlier version saved to the first user, once", async () => {
    localStorage.setItem(
      "op_schedules",
      JSON.stringify({
        state: {
          schedules: [...MOCK_SCHEDULES, MINE],
          doses: [...MOCK_DOSES, MY_DOSE],
        },
        version: 0,
      }),
    );
    const modules = await loadModules(false);
    await load(modules);
    expect(modules.useScheduleStore.getState().schedules).toEqual([MINE]);
    expect(modules.useScheduleStore.getState().doses).toEqual([MY_DOSE]);
    expect(localStorage.getItem("op_schedules")).toBeNull();
    expect(saved(`op_schedules:${modules.userKey("ann")}`).schedules).toEqual([
      MINE,
    ]);

    signedInAs("ben");
    modules.useAuthStore.getState().setUser({ id: "ben", email: "b@x.com" });
    await load(modules);
    expect(modules.useScheduleStore.getState().schedules).toEqual([]);
  });

  it("keeps saved sample data in mock mode", async () => {
    localStorage.setItem(
      "op_schedules",
      JSON.stringify({
        state: { schedules: [...MOCK_SCHEDULES, MINE], doses: MOCK_DOSES },
        version: 0,
      }),
    );
    const mock = await loadModules(true);
    await load(mock);
    expect(mock.useScheduleStore.getState().schedules).toHaveLength(
      MOCK_SCHEDULES.length + 1,
    );
  });

  it("follows the changes another tab saves", async () => {
    const modules = await loadModules(false);
    const { useScheduleStore, userKey } = modules;
    await load(modules);
    useScheduleStore.getState().addSchedule(MINE);

    const key = `op_schedules:${userKey("ann")}`;
    const other = JSON.stringify({
      state: { schedules: [MINE, THEIRS], doses: [MY_DOSE] },
      version: 1,
    });
    localStorage.setItem(key, other);
    window.dispatchEvent(new StorageEvent("storage", { key, newValue: other }));
    expect(useScheduleStore.getState().schedules).toEqual([MINE, THEIRS]);

    useScheduleStore.getState().logDose({ ...MY_DOSE, status: "skipped" });
    expect(saved(key)).toEqual({
      schedules: [MINE, THEIRS],
      doses: [{ ...MY_DOSE, status: "skipped" }],
    });

    const ben = `op_schedules:${userKey("ben")}`;
    window.dispatchEvent(
      new StorageEvent("storage", { key: ben, newValue: other }),
    );
    expect(useScheduleStore.getState().doses).toHaveLength(1);
  });

  it("replaces an edited schedule in its place", async () => {
    const modules = await loadModules(false);
    await load(modules);
    const store = modules.useScheduleStore;
    const twice: Schedule = {
      ...MINE,
      intakes: [
        { time: "08:00", quantity: 1, unit: "Tablet" },
        { time: "20:00", quantity: 1, unit: "Tablet" },
      ],
    };
    store.getState().addSchedule(twice);
    store.getState().addSchedule(THEIRS);
    store.getState().logDose(MY_DOSE);
    store.getState().logDose({ ...MY_DOSE, time: "20:00" });
    store.getState().logDose({ ...MY_DOSE, scheduleId: THEIRS.id });

    const edited: Schedule = {
      ...twice,
      name: "Panadol 1g",
      intakes: [{ time: "20:00", quantity: 2, unit: "Tablet" }],
    };
    store.getState().replaceSchedule(edited);
    expect(store.getState().schedules).toEqual([edited, THEIRS]);
    expect(store.getState().doses).toEqual([
      { ...MY_DOSE, time: "20:00" },
      { ...MY_DOSE, scheduleId: THEIRS.id },
    ]);
  });

  it("works for the visit when the browser refuses storage", async () => {
    const blocked = vi
      .spyOn(window, "localStorage", "get")
      .mockImplementation(() => {
        throw new DOMException("blocked", "SecurityError");
      });
    try {
      const modules = await loadModules(false);
      await load(modules);
      modules.useScheduleStore.getState().addSchedule(MINE);
      expect(modules.useScheduleStore.getState().schedules).toEqual([MINE]);
    } finally {
      blocked.mockRestore();
    }
  });

  it("treats a changed sample as the user's own", async () => {
    const { withoutSampleSchedules } = await loadModules(false);
    const edited = { ...MOCK_SCHEDULES[0], note: "Mine now" };
    expect(
      withoutSampleSchedules({ schedules: [MOCK_SCHEDULES[0], edited] }),
    ).toEqual({ schedules: [edited] });
  });
});
