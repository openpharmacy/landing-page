import { act, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { HomeData } from "@/features/home/model/home-data";
import type { Schedule } from "@/features/scheduler/model/schedule";

const user = { firstName: "Ann", lastName: "Lee" };
const withScripts: HomeData = { added: 2, expiringSoon: 0, refills: [] };
const newUser: HomeData = { added: 0, expiringSoon: 0, refills: [] };

const panadol: Schedule = {
  id: "p",
  name: "Panadol 500mg",
  colour: "#EF4444",
  frequency: { kind: "daily" },
  intakes: [
    { time: "08:00", quantity: 1, unit: "Tablet" },
    { time: "20:00", quantity: 1, unit: "Tablet" },
  ],
  remindMinutesBefore: 15,
  startDate: "2026-11-01",
};

let Provider: (props: { value: boolean; children: ReactNode }) => ReactNode;

let mockMode = false;
vi.mock("@/config/env", () => ({
  get isMockingEnabled() {
    return mockMode;
  },
}));

async function load(mock: boolean) {
  mockMode = mock;
  vi.resetModules();
  const { LoggedInHome } = await import("./logged-in-home");
  const { useScheduleStore } = await import("@/features/scheduler/model/store");
  const hidden = await import("@/providers/hidden-screens");
  Provider = hidden.HiddenScreensProvider;
  return { LoggedInHome, useScheduleStore };
}

async function show(ui: ReactNode) {
  render(<Provider value>{ui}</Provider>);
  await act(() => vi.advanceTimersByTimeAsync(0));
}

const subtitle = () =>
  screen.getByText("Medication Schedule").nextElementSibling?.textContent;

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal("fetch", async () =>
    Response.json({ user: { id: "ann", email: "", name: "Ann Lee" } }),
  );
  vi.useFakeTimers({ toFake: ["Date", "setTimeout", "setInterval"] });
  vi.setSystemTime(new Date(2026, 10, 6, 17, 30));
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("Home's schedule in real mode", () => {
  it("shows the new-user state when nothing is scheduled", async () => {
    const { LoggedInHome } = await load(false);
    await show(<LoggedInHome user={user} home={withScripts} />);
    expect(subtitle()).toBe("No schedule yet");
    expect(screen.getByText("No upcoming doses")).toBeInTheDocument();
    expect(screen.queryByText("Metformin 500mg")).toBeNull();
  });

  it("counts today's doses and lists the next two", async () => {
    const { LoggedInHome, useScheduleStore } = await load(false);
    useScheduleStore.setState({
      schedules: [panadol],
      doses: [
        { scheduleId: "p", date: "2026-11-06", time: "08:00", status: "taken" },
      ],
    });
    await show(<LoggedInHome user={user} home={null} />);
    expect(subtitle()).toBe("1/2 doses taken today");
    expect(screen.getAllByText("Panadol 500mg")).toHaveLength(2);
    expect(screen.getByText("8:00 PM").closest("a")).toHaveAttribute(
      "href",
      "/scheduler/medication/p?date=2026-11-06&time=20%3A00",
    );
    expect(screen.getByText("8:00 PM")).toBeInTheDocument();
    expect(screen.getByText("2h 30m")).toBeInTheDocument();
    expect(screen.getByText("Tomorrow, 8:00 AM")).toBeInTheDocument();
    expect(screen.getByText("14h 30m")).toBeInTheDocument();
  });

  it("says when nothing is due today", async () => {
    const { LoggedInHome, useScheduleStore } = await load(false);
    useScheduleStore.setState({
      schedules: [{ ...panadol, startDate: "2026-11-09" }],
      doses: [],
    });
    await show(<LoggedInHome user={user} home={withScripts} />);
    expect(subtitle()).toBe("No doses scheduled today");
    expect(screen.getByText("9 November, 8:00 AM")).toBeInTheDocument();
  });

  it("replaces the list with one line when no dose is coming", async () => {
    const { LoggedInHome, useScheduleStore } = await load(false);
    useScheduleStore.setState({
      schedules: [{ ...panadol, startDate: "2027-06-01" }],
      doses: [],
    });
    await show(<LoggedInHome user={user} home={withScripts} />);
    expect(subtitle()).toBe("No doses scheduled today");
    expect(screen.getByText("No upcoming doses.")).toBeInTheDocument();
  });
});

describe("Home's scripts", () => {
  it("shows no empty-state copy when the scripts could not be loaded", async () => {
    const { LoggedInHome } = await load(false);
    await show(
      <LoggedInHome user={user} home={null} error="Something went wrong." />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Something went wrong.",
    );
    expect(screen.queryByText("No scripts added")).toBeNull();
    expect(screen.queryByText("No refills yet")).toBeNull();
    expect(screen.queryByText(/once you add prescriptions/)).toBeNull();
  });

  it("does not ask a user with inactive scripts to add some", async () => {
    const { LoggedInHome } = await load(false);
    await show(<LoggedInHome user={user} home={withScripts} />);
    expect(screen.getByText("No refills yet")).toBeInTheDocument();
    expect(
      screen.getByText("Active prescriptions you can refill will appear here."),
    ).toBeInTheDocument();
    expect(screen.queryByText(/once you add prescriptions/)).toBeNull();
  });

  it("keeps the drawn empty state for a new user", async () => {
    const { LoggedInHome } = await load(false);
    await show(<LoggedInHome user={user} home={newUser} />);
    expect(screen.getByText("No scripts added")).toBeInTheDocument();
    expect(
      screen.getByText(
        "once you add prescriptions, refill options will appear hear.",
      ),
    ).toBeInTheDocument();
  });

  it("shows the page at once when the hidden screens are off", async () => {
    mockMode = false;
    vi.resetModules();
    const { LoggedInHome } = await import("./logged-in-home");
    render(<LoggedInHome user={user} home={withScripts} />);
    expect(screen.queryByRole("status", { name: "Loading" })).toBeNull();
    expect(screen.getByText("Hello Ann")).toBeInTheDocument();
    expect(screen.queryByText("Medication Schedule")).toBeNull();
  });
});

describe("Home's schedule in mock mode", () => {
  it("waits for the store like real mode", async () => {
    const { LoggedInHome } = await load(true);
    render(
      <Provider value>
        <LoggedInHome user={user} home={withScripts} />
      </Provider>,
    );
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
    await act(() => vi.advanceTimersByTimeAsync(0));
    expect(screen.queryByRole("status", { name: "Loading" })).toBeNull();
    expect(subtitle()).toBe("1/4 doses taken today");
  });

  it("keeps the drawn values whatever the store holds", async () => {
    const { LoggedInHome, useScheduleStore } = await load(true);
    useScheduleStore.setState({ schedules: [panadol], doses: [] });
    await show(<LoggedInHome user={user} home={withScripts} />);
    expect(subtitle()).toBe("1/4 doses taken today");
    expect(screen.getByText("Metformin 500mg")).toBeInTheDocument();
    expect(screen.getByText("Vitamin D3")).toBeInTheDocument();
    expect(screen.queryByText("Panadol 500mg")).toBeNull();
  });

  it("shows the drawn empty state without scripts", async () => {
    const { LoggedInHome } = await load(true);
    await show(<LoggedInHome user={user} home={null} />);
    expect(subtitle()).toBe("No schedule yet");
    expect(screen.getByText("No upcoming doses")).toBeInTheDocument();
  });
});
