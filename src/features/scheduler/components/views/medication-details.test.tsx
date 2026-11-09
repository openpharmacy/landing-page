import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { Schedule } from "../../model/schedule";
import { useScheduleStore } from "../../model/store";
import { MedicationDetails } from "./medication-details";
import { MonthView } from "./month-view";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: vi.fn() }),
}));

const PANADOL: Schedule = {
  id: "p1",
  name: "Panadol 500mg",
  colour: "#EF4444",
  frequency: { kind: "daily" },
  intakes: [
    { time: "08:00", quantity: 1, unit: "Tablet" },
    { time: "20:00", quantity: 1, unit: "Tablet" },
  ],
  remindMinutesBefore: 15,
  startDate: "2025-10-01",
};

beforeEach(() => {
  push.mockClear();
  vi.stubGlobal("fetch", async () =>
    Response.json({ user: { id: "u1", email: "", name: "" } }),
  );
  useScheduleStore.setState({ schedules: [PANADOL], doses: [] });
});
afterEach(() => vi.unstubAllGlobals());

const details = () =>
  render(<MedicationDetails scheduleId="p1" date="2025-10-12" time="20:00" />);

describe("Medication Details", () => {
  it("reschedules through the add flow, from the phone button and the desktop menu", () => {
    details();
    const edit = "/scheduler/add?edit=p1&date=2025-10-12";
    expect(screen.getByRole("link", { name: "Reschedule" })).toHaveAttribute(
      "href",
      edit,
    );

    fireEvent.click(screen.getByRole("button", { name: "More actions" }));
    const menu = screen.getByRole("menu", { name: "More actions" });
    expect(
      within(menu).getByRole("menuitem", { name: "Reschedule" }),
    ).toHaveAttribute("href", edit);
    expect(
      within(menu).getByRole("menuitem", { name: "Delete from Schedule" }),
    ).toBeVisible();
  });

  it("asks before deleting from the desktop menu", async () => {
    details();
    await waitFor(() =>
      expect(useScheduleStore.persist.hasHydrated()).toBe(true),
    );
    fireEvent.click(screen.getByRole("button", { name: "More actions" }));
    fireEvent.click(
      screen.getByRole("menuitem", { name: "Delete from Schedule" }),
    );
    const dialog = screen.getByRole("dialog", {
      name: "Are you sure you want to delete this medication?",
    });
    fireEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(useScheduleStore.getState().schedules).toEqual([PANADOL]);

    fireEvent.click(screen.getByRole("button", { name: "More actions" }));
    fireEvent.click(
      screen.getByRole("menuitem", { name: "Delete from Schedule" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Yes, Delete" }));
    expect(useScheduleStore.getState().schedules).toEqual([]);
    expect(push).toHaveBeenCalledWith("/scheduler?view=day&date=2025-10-12");
    expect(
      screen.queryByText("This medication is no longer in your schedule."),
    ).toBeNull();
  });

  it("asks before deleting from the phone button too", () => {
    details();
    fireEvent.click(
      screen.getByRole("button", { name: "Delete from Schedule" }),
    );
    expect(screen.getByRole("dialog")).toBeVisible();
    expect(useScheduleStore.getState().schedules).toEqual([PANADOL]);
  });
});

describe("the month view", () => {
  it("shows Taken and Skipped like the day and week", () => {
    const ventolin: Schedule = {
      ...PANADOL,
      id: "v1",
      name: "Ventolin 100mcg",
      colour: "#6366F1",
      intakes: [{ time: "09:00", quantity: 2, unit: "Spray" }],
    };
    const log = (
      scheduleId: string,
      time: string,
      status: "taken" | "skipped",
    ) => ({ scheduleId, date: "2025-10-11", time, status });
    render(
      <MonthView
        date="2025-10-11"
        schedules={[PANADOL, ventolin]}
        doses={[
          log("p1", "08:00", "taken"),
          log("p1", "20:00", "taken"),
          log("v1", "09:00", "skipped"),
        ]}
      />,
    );
    expect(
      screen.getByRole("link", {
        name: "Panadol 500mg, 1 tablet, 8:00 AM, taken",
      }),
    ).toHaveTextContent("Taken");
    expect(
      screen.getByRole("link", {
        name: "Ventolin 100mcg, 2 sprays, 9:00 AM, skipped",
      }),
    ).toHaveTextContent("Skipped");
    expect(
      screen.getByRole("button", {
        name: "11 October, 2 medications, 1 taken",
      }),
    ).toBeVisible();
  });

  it("opens the chosen day in the day view on desktop", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    render(<MonthView date="2025-10-11" schedules={[PANADOL]} doses={[]} />);
    fireEvent.click(screen.getByRole("button", { name: /^12 October/ }));
    expect(push).not.toHaveBeenCalled();
    expect(window.location.search).toBe("?view=month&date=2025-10-12");
    fireEvent.click(screen.getByRole("button", { name: /^11 October/ }));
    expect(push).toHaveBeenCalledWith("/scheduler?view=day&date=2025-10-11");
  });
});
