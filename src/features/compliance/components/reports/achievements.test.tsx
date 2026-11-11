import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import {
  addDays,
  toIsoDate,
} from "@/features/scheduler/components/views/calendar";
import { useScheduleStore } from "@/features/scheduler/model/store";

import { AchievementsList } from "./achievements";

beforeEach(() => {
  localStorage.clear();
  useScheduleStore.setState({ schedules: [], doses: [] });
});

const sections = () =>
  screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);

describe("AchievementsList", () => {
  it("lists every achievement as not earned yet for a new user", async () => {
    render(<AchievementsList />);
    expect(await screen.findByText("Perfect Week")).toBeInTheDocument();
    expect(screen.getByText("Consistency Champion")).toBeInTheDocument();
    expect(sections()).toEqual(["Not earned yet"]);
  });

  it("moves an earned one to the top", async () => {
    const today = toIsoDate(new Date());
    const days = Array.from({ length: 7 }, (_, n) => addDays(today, -n));
    useScheduleStore.setState({
      schedules: [
        {
          id: "ator",
          name: "Atorvastatin 20mg",
          colour: "#6366F1",
          frequency: { kind: "daily" },
          intakes: [{ time: "08:00", quantity: 1, unit: "Tablet" }],
          remindMinutesBefore: null,
          startDate: days[6],
        },
      ],
      doses: days.map((date) => ({
        scheduleId: "ator",
        date,
        time: "08:00",
        status: "taken",
      })),
    });
    render(<AchievementsList />);
    expect(await screen.findByText("Earned")).toBeInTheDocument();
    expect(sections()).toEqual(["Earned"]);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
