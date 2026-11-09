import { act, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { Schedule } from "@/features/scheduler/model/schedule";

const user = { firstName: "Ann", lastName: "Lee" };
const home = { added: 1, expiringSoon: 0, refills: [] };

const schedule: Schedule = {
  id: "ator",
  name: "Atorvastatin 20mg",
  colour: "#6366F1",
  frequency: { kind: "daily" },
  intakes: [{ time: "08:00", quantity: 1, unit: "Tablet" }],
  remindMinutesBefore: null,
  startDate: "2026-11-03",
};

let Provider: (props: { value: boolean; children: ReactNode }) => ReactNode;

async function load(mock: boolean) {
  vi.resetModules();
  vi.doMock("@/config/env", () => ({ isMockingEnabled: mock }));
  const [{ LoggedInHome }, { useScheduleStore }, hidden] = await Promise.all([
    import("@/features/home/components/logged-in-home"),
    import("@/features/scheduler/model/store"),
    import("@/providers/hidden-screens"),
  ]);
  Provider = hidden.HiddenScreensProvider;
  return { LoggedInHome, useScheduleStore };
}

async function show(ui: ReactNode) {
  render(<Provider value>{ui}</Provider>);
  await act(() => vi.advanceTimersByTimeAsync(400));
}

const subtitle = () =>
  screen.getByText("Compliance").nextElementSibling?.textContent;

beforeEach(() => {
  localStorage.clear();
  vi.useFakeTimers({ toFake: ["Date", "setTimeout", "setInterval"] });
  vi.setSystemTime(new Date(2026, 10, 6, 17, 30));
});
afterEach(() => {
  vi.useRealTimers();
  vi.doUnmock("@/config/env");
});

describe("Home's Compliance card", () => {
  it("says No data yet until a dose counts", async () => {
    const { LoggedInHome, useScheduleStore } = await load(false);
    useScheduleStore.setState({
      schedules: [{ ...schedule, startDate: "2026-11-06" }],
      doses: [],
    });
    await show(<LoggedInHome user={user} home={home} />);
    expect(subtitle()).toBe("No data yet");
  });

  it("gives the rate of the last 7 days", async () => {
    const { LoggedInHome, useScheduleStore } = await load(false);
    useScheduleStore.setState({
      schedules: [schedule],
      doses: [
        {
          scheduleId: "ator",
          date: "2026-11-04",
          time: "08:00",
          status: "taken",
        },
        {
          scheduleId: "ator",
          date: "2026-11-06",
          time: "08:00",
          status: "taken",
        },
      ],
    });
    await show(<LoggedInHome user={user} home={home} />);
    expect(subtitle()).toBe("50% in the last 7 days");
  });

  it("keeps the drawn subtitle in mock mode", async () => {
    const { LoggedInHome } = await load(true);
    await show(<LoggedInHome user={user} home={home} />);
    expect(subtitle()).toBe("1/4 doses taken today");
  });
});
