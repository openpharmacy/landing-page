import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it } from "vitest";

import { useVitalsStore } from "@/features/compliance/model/vitals-store";
import {
  addDays,
  toIsoDate,
} from "@/features/scheduler/components/views/calendar";
import { useScheduleStore } from "@/features/scheduler/model/store";

import { HealthVitals } from "./health-vitals";

beforeEach(() => {
  localStorage.clear();
  useVitalsStore.setState({ readings: [], seeded: false, hydrated: false });
  useScheduleStore.setState({ schedules: [], doses: [] });
});

const average = (label: string) =>
  screen.getByText(label).parentElement!.nextElementSibling!.textContent;

describe("HealthVitals", () => {
  it("says so when the period has no reading", async () => {
    const user = userEvent.setup();
    render(<HealthVitals />);
    expect(
      await screen.findByText("No readings this week."),
    ).toBeInTheDocument();
    await user.click(screen.getAllByRole("button", { name: "Year" })[0]);
    expect(screen.getByText("No readings this year.")).toBeInTheDocument();
  });

  it("averages this browser's readings, with a dash when there are none", async () => {
    const today = toIsoDate(new Date());
    useVitalsStore.setState({
      readings: [
        {
          id: "a",
          date: today,
          time: "08:00",
          type: "bloodPressure",
          systolic: 150,
          diastolic: 95,
        },
        {
          id: "b",
          date: addDays(today, -1),
          time: "08:00",
          type: "bloodPressure",
          systolic: 140,
          diastolic: 91,
        },
        { id: "c", date: today, time: "09:00", type: "heartRate", value: 66 },
      ],
    });
    render(<HealthVitals />);
    expect(await screen.findByText("145/93")).toBeInTheDocument();
    expect(average("Avg BP")).toBe("145/93High");
    expect(average("Avg HR")).toBe("66 bpmHealthy");
    expect(average("Avg BS")).toBe("—");
    expect(average("Avg Weight")).toBe("—");
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("shows the missed-dose alert only when doses were missed", async () => {
    useScheduleStore.setState({
      schedules: [
        {
          id: "ator",
          name: "Atorvastatin 20mg",
          colour: "#6366F1",
          frequency: { kind: "daily" },
          intakes: [{ time: "20:00", quantity: 1, unit: "Tablet" }],
          remindMinutesBefore: null,
          startDate: addDays(toIsoDate(new Date()), -2),
        },
      ],
      doses: [],
    });
    render(<HealthVitals />);
    expect(await screen.findByRole("status")).toHaveTextContent(
      "You've missed your last 2 evening doses of Atorvastatin 20mg.",
    );
  });

  it("leaves the body out of the server render, so it does not move later", () => {
    const html = renderToString(<HealthVitals />);
    expect(html).toContain("Health Vitals");
    expect(html).not.toContain("Avg BP");
  });
});
