import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Schedule } from "@/features/scheduler/model/schedule";
import { useScheduleStore } from "@/features/scheduler/model/store";

import { DoseReminder } from "./dose-reminder";
import { DoseTaken } from "./dose-taken";

const push = vi.fn();
const replace = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push, replace }) }));

const PANADOL: Schedule = {
  id: "panadol",
  name: "Panadol 500mg",
  colour: "#EF4444",
  frequency: { kind: "daily" },
  intakes: [
    { time: "08:00", quantity: 2, unit: "Tablet" },
    { time: "14:00", quantity: 1, unit: "Tablet" },
  ],
  remindMinutesBefore: 15,
  startDate: "2025-10-01",
};

beforeEach(() => {
  push.mockClear();
  replace.mockClear();
  vi.stubGlobal("fetch", async () =>
    Response.json({ user: { id: "u1", email: "", name: "" } }),
  );
  localStorage.setItem(
    "op_schedules",
    JSON.stringify({ state: { schedules: [PANADOL], doses: [] }, version: 0 }),
  );
});

const DOSE = { schedule: "panadol", date: "2025-10-12", time: "14:00" };

describe("DoseReminder", () => {
  it("shows the dose due at that time and logs Take", async () => {
    const user = userEvent.setup();
    render(<DoseReminder dose={DOSE} />);
    expect(
      await screen.findByRole("dialog", { name: "Time for your medication!" }),
    ).toBeInTheDocument();
    expect(screen.getByText("2:00 PM")).toBeInTheDocument();
    expect(screen.getByText("1 Tablet")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Take" }));
    expect(useScheduleStore.getState().doses).toContainEqual({
      scheduleId: "panadol",
      date: "2025-10-12",
      time: "14:00",
      status: "taken",
    });
    expect(replace).toHaveBeenCalledWith(
      "/compliance/dose/taken?schedule=panadol&date=2025-10-12&time=14%3A00",
    );
  });

  it("logs Skip and returns to the day in the scheduler", async () => {
    const user = userEvent.setup();
    render(<DoseReminder dose={DOSE} />);
    await user.click(await screen.findByRole("button", { name: "Skip" }));
    expect(useScheduleStore.getState().doses).toContainEqual({
      scheduleId: "panadol",
      date: "2025-10-12",
      time: "14:00",
      status: "skipped",
    });
    expect(replace).toHaveBeenCalledWith("/scheduler?view=day&date=2025-10-12");
  });

  it("reschedules in the schedule's editor", async () => {
    render(<DoseReminder dose={DOSE} />);
    expect(
      await screen.findByRole("link", { name: "Reschedule" }),
    ).toHaveAttribute("href", "/scheduler/add?edit=panadol");
  });

  it("leaves when the schedule is not in this browser", async () => {
    render(<DoseReminder dose={{ ...DOSE, schedule: "gone" }} />);
    await vi.waitFor(() =>
      expect(replace).toHaveBeenCalledWith(
        "/scheduler?view=day&date=2025-10-12",
      ),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("DoseTaken", () => {
  it("offers both follow-ups after a dose", async () => {
    render(<DoseTaken dose={DOSE} />);
    expect(
      await screen.findByRole("heading", { name: "Great job!" }),
    ).toBeVisible();
    expect(
      screen.getByText("Panadol 500mg marked as taken"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Report Side Effects/ }),
    ).toHaveAttribute(
      "href",
      "/compliance/side-effects/new?schedule=panadol&date=2025-10-12&time=14%3A00",
    );
    expect(screen.getByRole("link", { name: /Record Vitals/ })).toHaveAttribute(
      "href",
      "/compliance/vitals/new?schedule=panadol&date=2025-10-12&time=14%3A00",
    );
    expect(
      screen.getByRole("button", { name: "No, I’m Done" }),
    ).toBeInTheDocument();
  });

  it("marks the finished follow-ups and keeps them on the other link", async () => {
    render(<DoseTaken dose={{ ...DOSE, sideEffects: true }} />);
    expect(
      await screen.findByRole("heading", { name: "Side Effects Reported!" }),
    ).toBeVisible();
    expect(
      screen.queryByRole("link", { name: /Report Side Effects/ }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Record Vitals/ })).toHaveAttribute(
      "href",
      "/compliance/vitals/new?schedule=panadol&date=2025-10-12&time=14%3A00&sideEffects=1",
    );
  });

  it("says Done once both are finished", async () => {
    const user = userEvent.setup();
    render(<DoseTaken dose={{ ...DOSE, sideEffects: true, vitals: true }} />);
    await user.click(await screen.findByRole("button", { name: "Done" }));
    expect(screen.getAllByText("Already Completed")).toHaveLength(2);
    expect(push).toHaveBeenCalledWith("/scheduler?view=day&date=2025-10-12");
  });
});
