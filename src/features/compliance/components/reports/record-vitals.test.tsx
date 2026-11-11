import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useVitalsStore } from "@/features/compliance/model/vitals-store";
import { useScheduleStore } from "@/features/scheduler/model/store";

import { RecordVitals } from "./record-vitals";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: vi.fn() }),
}));

beforeEach(() => {
  push.mockClear();
  localStorage.clear();
  useVitalsStore.setState({ readings: [], seeded: true, hydrated: true });
  useScheduleStore.setState({
    schedules: [
      {
        id: "sch-1",
        name: "Panadol 500mg",
        colour: "#6366F1",
        frequency: { kind: "daily" },
        intakes: [{ time: "08:00", quantity: 1, unit: "Tablet" }],
        remindMinutesBefore: 15,
        startDate: "2025-12-01",
      },
    ],
    doses: [],
  });
});

describe("RecordVitals", () => {
  it("records each chosen vital and returns to the dose, keeping side effects", async () => {
    const user = userEvent.setup();
    render(
      <RecordVitals
        scheduleId="sch-1"
        date="2025-12-20"
        time="08:00"
        sideEffects
      />,
    );
    expect(await screen.findByText("Panadol 500mg")).toBeInTheDocument();

    await user.click(screen.getByRole("checkbox", { name: "Heart Rate" }));
    await user.click(screen.getByRole("checkbox", { name: "Blood Pressure" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByText("Step 1 of 2")).toBeInTheDocument();
    await user.type(screen.getByLabelText("Systolic"), "120");
    await user.type(screen.getByLabelText("Diastolic"), "80");
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByText("Step 2 of 2")).toBeInTheDocument();
    await user.type(screen.getByLabelText(/Heart Rate/), "72");
    await user.click(screen.getByRole("button", { name: "Continue" }));

    const readings = useVitalsStore.getState().readings;
    expect(readings).toHaveLength(2);
    expect(readings[0]).toMatchObject({
      type: "bloodPressure",
      systolic: 120,
      diastolic: 80,
      date: "2025-12-20",
      scheduleId: "sch-1",
      medication: "Panadol 500mg",
    });
    expect(readings[1]).toMatchObject({ type: "heartRate", value: 72 });
    expect(push).toHaveBeenCalledWith(
      "/compliance/dose/taken?schedule=sch-1&date=2025-12-20&time=08%3A00&sideEffects=1&vitals=1",
    );
  });

  it("records once when the last Continue is clicked twice", async () => {
    const user = userEvent.setup();
    render(<RecordVitals scheduleId="sch-1" date="2025-12-20" time="08:00" />);
    await user.click(
      await screen.findByRole("checkbox", { name: "Heart Rate" }),
    );
    await user.click(screen.getByRole("button", { name: "Continue" }));
    await user.type(screen.getByLabelText(/Heart Rate/), "72");
    await user.dblClick(screen.getByRole("button", { name: "Continue" }));

    expect(useVitalsStore.getState().readings).toHaveLength(1);
    expect(push).toHaveBeenCalledOnce();
  });

  it("keeps the step until the value is in range", async () => {
    const user = userEvent.setup();
    render(<RecordVitals scheduleId="sch-1" date="2025-12-20" />);
    await user.click(screen.getByRole("checkbox", { name: "Heart Rate" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));
    await user.type(screen.getByLabelText(/Heart Rate/), "900");
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(
      screen.getByText("Enter a value from 30 to 220."),
    ).toBeInTheDocument();
    expect(useVitalsStore.getState().readings).toHaveLength(0);
    expect(push).not.toHaveBeenCalled();
  });

  it("cancels back to the dose without recording", async () => {
    const user = userEvent.setup();
    render(<RecordVitals scheduleId="sch-1" date="2025-12-20" />);
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(push).toHaveBeenCalledWith(
      "/compliance/dose/taken?schedule=sch-1&date=2025-12-20",
    );
  });
});
