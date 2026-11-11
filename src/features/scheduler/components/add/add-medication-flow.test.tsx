import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { Schedule } from "@/features/scheduler/model/schedule";
import { useScheduleStore } from "@/features/scheduler/model/store";

import { AddMedicationFlow } from "./add-medication-flow";

const push = vi.fn();
const back = vi.fn();
const replace = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, back, replace }),
}));

const PANADOL: Schedule = {
  id: "p1",
  name: "Panadol 500mg",
  colour: "#EF4444",
  frequency: { kind: "daily" },
  intakes: [
    { time: "08:00", quantity: 1, unit: "Tablet" },
    { time: "20:00", quantity: 2, unit: "Tablet" },
  ],
  remindMinutesBefore: 15,
  note: "Take with food to reduce stomach upset.",
  startDate: "2025-10-01",
};
const OTHER: Schedule = { ...PANADOL, id: "o1", name: "Ventolin 100mcg" };

const SCRIPTS = [
  { id: "asl-metformin", name: "Metformin 500mg", form: "500mg tablet" },
];

const click = (name: string | RegExp) =>
  fireEvent.click(screen.getByRole("button", { name }));

describe("AddMedicationFlow", () => {
  beforeEach(() => {
    push.mockClear();
    back.mockClear();
    replace.mockClear();
    vi.stubGlobal("fetch", async () =>
      Response.json({ user: { id: "u1", email: "", name: "" } }),
    );
    useScheduleStore.setState({ schedules: [], doses: [] });
  });
  afterEach(() => vi.unstubAllGlobals());

  it("offers the scripts only when there are some", () => {
    render(<AddMedicationFlow scripts={[]} date={null} time={null} />);
    expect(
      screen.queryByRole("button", { name: /^From Existing Scripts/ }),
    ).toBeNull();
    expect(screen.getByRole("button", { name: /^Add Manually/ })).toBeVisible();
  });

  it("saves a manual schedule and opens the day it starts", () => {
    render(<AddMedicationFlow scripts={[]} date="2025-10-12" time={null} />);
    click(/^Add Manually/);
    fireEvent.change(screen.getByLabelText("Medication Name"), {
      target: { value: "Panadol" },
    });

    click("Next");
    expect(screen.getByRole("group", { name: "Add Time" })).toBeVisible();
    click("Add");
    expect(screen.getByText("1 tablet")).toBeVisible();

    click("Next");
    fireEvent.change(screen.getByLabelText("Note"), {
      target: { value: "After food" },
    });
    click("Next");
    const save = screen.getByRole("button", { name: /Submit/ });
    expect(save).toBeDisabled();
    fireEvent.click(screen.getByRole("radio", { name: "Red" }));
    fireEvent.click(save);

    expect(push).toHaveBeenCalledWith("/scheduler?view=day&date=2025-10-12");
    const [schedule] = useScheduleStore.getState().schedules;
    expect(schedule).toMatchObject({
      name: "Panadol",
      colour: "#EF4444",
      frequency: { kind: "daily" },
      intakes: [{ time: "07:00", quantity: 1, unit: "Tablet" }],
      remindMinutesBefore: 15,
      note: "After food",
      startDate: "2025-10-12",
    });
  });

  it("starts from a script and the slot it was opened from", () => {
    render(
      <AddMedicationFlow scripts={SCRIPTS} date="2025-10-12" time="09:30" />,
    );
    click(/^From Existing Scripts/);
    click(/^Metformin 500mg/);
    expect(screen.getByLabelText("Medication Name")).toHaveValue(
      "Metformin 500mg",
    );
    expect(
      screen.getByRole("button", { name: "Remove 9:30 AM" }),
    ).toBeVisible();
  });

  it("goes back only to a page of this site", () => {
    render(<AddMedicationFlow scripts={[]} date="2025-10-12" time={null} />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(push).toHaveBeenCalledWith("/scheduler?view=week&date=2025-10-12");
    expect(back).not.toHaveBeenCalled();

    Object.defineProperty(window, "navigation", {
      value: { canGoBack: true },
      configurable: true,
    });
    try {
      fireEvent.keyDown(window, { key: "Escape" });
      expect(back).toHaveBeenCalledTimes(1);
    } finally {
      Reflect.deleteProperty(window, "navigation");
    }
  });

  it("asks for a day when specific days has none", () => {
    render(<AddMedicationFlow scripts={[]} date={null} time="08:00" />);
    click(/^Add Manually/);
    fireEvent.change(screen.getByLabelText("Medication Name"), {
      target: { value: "Panadol" },
    });
    click(/^Frequency:/);
    fireEvent.click(
      screen.getByRole("option", { name: "Specific Days of the week" }),
    );
    click("Next");
    expect(screen.queryByLabelText("Note")).toBeNull();
    click("Tue");
    click("Next");
    expect(screen.getByLabelText("Note")).toBeVisible();
  });

  it("opens the form for the script it was asked for", () => {
    render(
      <AddMedicationFlow
        scripts={SCRIPTS}
        date="2025-10-12"
        time={null}
        script="asl-metformin"
      />,
    );
    expect(screen.getByLabelText("Medication Name")).toHaveValue(
      "Metformin 500mg",
    );
    click("Back");
    expect(
      screen.getByRole("button", { name: /^Metformin 500mg/ }),
    ).toBeVisible();
  });

  it("starts at the beginning for a script it does not know", () => {
    render(
      <AddMedicationFlow
        scripts={SCRIPTS}
        date={null}
        time={null}
        script="0000000000000000"
      />,
    );
    expect(
      screen.getByRole("button", { name: /^From Existing Scripts/ }),
    ).toBeVisible();
  });

  it("does not add a second dose at the same time", () => {
    const desktop = vi.fn(() => ({ matches: true }));
    vi.stubGlobal("matchMedia", desktop);
    render(<AddMedicationFlow scripts={[]} date={null} time="09:00" />);
    click(/^Add Manually/);
    click("Add time");
    expect(screen.getByRole("button", { name: "Time: 9:30 AM" })).toBeVisible();
    click("Time: 9:30 AM");
    fireEvent.click(screen.getByRole("option", { name: "9:00 AM" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "This medication already has a dose at 9:00 AM. Choose another time.",
    );
    expect(screen.getByRole("button", { name: "Add" })).toBeDisabled();

    click("Time: 9:00 AM");
    fireEvent.click(screen.getByRole("option", { name: "10:00 AM" }));
    expect(screen.queryByRole("alert")).toBeNull();
    click("Add");
    expect(
      screen.getByRole("button", { name: "Remove 9:00 AM" }),
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Remove 10:00 AM" }),
    ).toBeVisible();
  });

  it("explains the cycle pattern", () => {
    render(<AddMedicationFlow scripts={[]} date={null} time={null} />);
    click(/^Add Manually/);
    click("About cycle patterns");
    expect(screen.getByRole("tooltip")).toHaveTextContent(
      /^Take the medication for a number of weeks, then skip it/,
    );
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).toBeNull();
    expect(screen.getByLabelText("Medication Name")).toBeVisible();
    expect(push).not.toHaveBeenCalled();
  });

  it("edits a saved schedule and saves it in its place", async () => {
    useScheduleStore.setState({
      schedules: [PANADOL, OTHER],
      doses: [
        {
          scheduleId: "p1",
          date: "2025-10-12",
          time: "08:00",
          status: "taken",
        },
        {
          scheduleId: "p1",
          date: "2025-10-12",
          time: "20:00",
          status: "taken",
        },
      ],
    });
    render(
      <AddMedicationFlow
        scripts={[]}
        date="2025-10-12"
        time={null}
        edit="p1"
      />,
    );
    const name = await screen.findByLabelText("Medication Name");
    expect(name).toHaveValue("Panadol 500mg");
    expect(
      screen.getByRole("heading", { name: "Edit Medication" }),
    ).toBeVisible();
    expect(screen.queryByRole("button", { name: "Back" })).toBeNull();

    fireEvent.change(name, { target: { value: "Panadol Osteo" } });
    click("Remove 8:00 AM");
    click("Next");
    expect(
      screen.getByRole("checkbox", {
        name: "Take with food to reduce stomach upset.",
      }),
    ).toBeChecked();
    click("Next");
    expect(screen.getByRole("radio", { name: "Red" })).toBeChecked();
    click(/Submit/);

    expect(useScheduleStore.getState().schedules).toEqual([
      {
        ...PANADOL,
        name: "Panadol Osteo",
        intakes: [{ time: "20:00", quantity: 2, unit: "Tablet" }],
      },
      OTHER,
    ]);
    expect(useScheduleStore.getState().doses).toEqual([
      { scheduleId: "p1", date: "2025-10-12", time: "20:00", status: "taken" },
    ]);
    expect(replace).toHaveBeenCalledWith(
      "/scheduler/medication/p1?date=2025-10-12",
    );
  });

  it("saves once on a double click", async () => {
    render(<AddMedicationFlow scripts={[]} date="2025-10-12" time="08:00" />);
    await waitFor(() =>
      expect(useScheduleStore.persist.hasHydrated()).toBe(true),
    );
    click(/^Add Manually/);
    fireEvent.change(screen.getByLabelText("Medication Name"), {
      target: { value: "Panadol" },
    });
    click("Next");
    click("Next");
    fireEvent.click(screen.getByRole("radio", { name: "Red" }));
    const save = screen.getByRole("button", { name: /Submit/ });
    fireEvent.click(save);
    fireEvent.click(save);
    await waitFor(() => expect(push).toHaveBeenCalled());
    expect(useScheduleStore.getState().schedules).toHaveLength(1);
    expect(push).toHaveBeenCalledTimes(1);
  });

  it("goes back to where the edit was opened after saving it", async () => {
    useScheduleStore.setState({ schedules: [PANADOL], doses: [] });
    Object.defineProperty(window, "navigation", {
      value: { canGoBack: true },
      configurable: true,
    });
    try {
      render(
        <AddMedicationFlow
          scripts={[]}
          date="2025-10-12"
          time={null}
          edit="p1"
        />,
      );
      fireEvent.change(await screen.findByLabelText("Medication Name"), {
        target: { value: "Panadol Osteo" },
      });
      click("Next");
      click("Next");
      const save = screen.getByRole("button", { name: /Submit/ });
      fireEvent.click(save);
      fireEvent.click(save);
      expect(useScheduleStore.getState().schedules[0].name).toBe(
        "Panadol Osteo",
      );
      expect(back).toHaveBeenCalledTimes(1);
      expect(replace).not.toHaveBeenCalled();
    } finally {
      Reflect.deleteProperty(window, "navigation");
    }
  });

  it("says when the schedule to edit is gone", async () => {
    render(
      <AddMedicationFlow scripts={[]} date={null} time={null} edit="gone" />,
    );
    expect(
      await screen.findByText("This medication is no longer in your schedule."),
    ).toBeVisible();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(push).toHaveBeenCalledWith("/scheduler?view=day");
  });
});
