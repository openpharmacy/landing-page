import { render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  addDays,
  toIsoDate,
} from "@/features/scheduler/components/views/calendar";
import type { Schedule } from "@/features/scheduler/model/schedule";

const SAMPLE_NAMES = /Metformin|Amlodipine|Panadol|Nurofen|Vitamin D3/;

const today = () => toIsoDate(new Date());

const ATORVASTATIN: Schedule = {
  id: "ator",
  name: "Atorvastatin 20mg",
  colour: "#6366F1",
  frequency: { kind: "daily" },
  intakes: [{ time: "08:00", quantity: 1, unit: "Tablet" }],
  remindMinutesBefore: null,
  startDate: "2026-01-01",
};

async function load(mock: boolean) {
  vi.resetModules();
  vi.doMock("@/config/env", () => ({ isMockingEnabled: mock }));
  const [{ ReportBody }, schedules, sideEffects, vitals] = await Promise.all([
    import("./report-body"),
    import("@/features/scheduler/model/store"),
    import("@/features/compliance/model/side-effect-store"),
    import("@/features/compliance/model/vitals-store"),
  ]);
  return {
    ReportBody,
    useScheduleStore: schedules.useScheduleStore,
    useSideEffectStore: sideEffects.useSideEffectStore,
    useVitalsStore: vitals.useVitalsStore,
  };
}

beforeEach(() => localStorage.clear());
afterEach(() => vi.doUnmock("@/config/env"));

const section = (title: string) =>
  screen.getByRole("heading", { name: title }).closest("section")!;

describe("the Compliance report in real mode", () => {
  it("shows empty states and no sample data for a new user", async () => {
    const { ReportBody } = await load(false);
    const { container, rerender } = render(
      <ReportBody range="7d" tab="overview" refills={[]} refillsError={null} />,
    );
    expect(await screen.findByText("Compliance Rate")).toBeInTheDocument();
    expect(screen.getByText("—")).toBeInTheDocument();
    expect(
      within(section("Weekly Progress")).getByText(
        "No doses were due in the last 7 days.",
      ),
    ).toBeInTheDocument();
    for (const text of [
      "No refills yet",
      "No side effects yet",
      "No vitals yet",
      "No achievements yet",
    ]) {
      expect(screen.getByText(text)).toBeInTheDocument();
    }
    expect(screen.queryByRole("status")).toBeNull();
    expect(
      screen
        .getAllByRole("link", { name: "View all" })
        .map((link) => link.getAttribute("href")),
    ).toEqual([
      "/scripts",
      "/compliance/side-effects",
      "/compliance/vitals",
      "/compliance/achievements",
    ]);
    expect(container.textContent).not.toMatch(SAMPLE_NAMES);

    for (const tab of ["detailed", "trends", "insights"] as const) {
      for (const range of ["7d", "30d", "90d"] as const) {
        rerender(
          <ReportBody
            range={range}
            tab={tab}
            refills={[]}
            refillsError={null}
          />,
        );
        expect(container.textContent).not.toMatch(SAMPLE_NAMES);
        expect(container.textContent).toContain(
          `No doses were due in the last ${range.replace("d", " days")}.`,
        );
      }
    }
    expect(screen.queryByText("Recommendation")).toBeNull();
  });

  it("reports the doses, side effects, vitals and scripts of this browser", async () => {
    const { ReportBody, useScheduleStore, useSideEffectStore, useVitalsStore } =
      await load(false);
    const day = today();
    useScheduleStore.setState({
      schedules: [{ ...ATORVASTATIN, startDate: addDays(day, -3) }],
      doses: [],
    });
    useSideEffectStore.setState({
      entries: [
        {
          id: "e1",
          medication: "Atorvastatin 20mg",
          date: addDays(day, -1),
          symptoms: [{ symptom: "Nausea", severity: "Moderate" }],
          note: "After breakfast",
        },
      ],
    });
    useVitalsStore.setState({
      readings: [
        {
          id: "v1",
          date: day,
          time: "08:10",
          type: "heartRate",
          value: 68,
          medication: "Atorvastatin 20mg",
        },
      ],
    });

    const { container } = render(
      <ReportBody
        range="7d"
        tab="overview"
        refills={[
          {
            id: "0123456789abcdef",
            name: "Rosuvastatin 10mg",
            form: "10mg tablet",
            expiry: { left: "5 months left", date: "Expires Apr 2, 2027" },
          },
        ]}
        refillsError={null}
      />,
    );

    await waitFor(() =>
      expect(screen.queryByRole("status", { name: "Loading" })).toBeNull(),
    );
    const alert = screen.getByRole("status");
    expect(alert).toHaveTextContent(
      "You've missed your last 3 morning doses of Atorvastatin 20mg. Want to shift your schedule?",
    );
    expect(
      within(alert).getByRole("link", { name: "Adjust Schedule" }),
    ).toHaveAttribute("href", "/scheduler/add?edit=ator");

    const stat = (label: string) =>
      screen.getByText(label).previousElementSibling?.textContent;
    expect(stat("Compliance Rate")).toBe("0%");
    expect(stat("Day Streak")).toBe("0");
    expect(stat("Doses Taken")).toBe("0");
    expect(stat("Missed Doses")).toBe("3");

    expect(screen.getByText("Medications: Atorvastatin 20mg")).toBeVisible();
    expect(screen.getByText("Nausea")).toBeInTheDocument();
    expect(screen.getByText("68 bpm • Healthy")).toBeInTheDocument();
    expect(screen.getByText("After Atorvastatin 20mg")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Rosuvastatin 10mg/ }),
    ).toHaveAttribute("href", "/scripts/detail?id=0123456789abcdef");
    expect(container.textContent).not.toMatch(SAMPLE_NAMES);
  });

  it("says when the scripts could not be loaded", async () => {
    const { ReportBody } = await load(false);
    render(
      <ReportBody
        range="7d"
        tab="overview"
        refills={[]}
        refillsError="The service is not available right now. Please try again."
      />,
    );
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "The service is not available right now.",
    );
  });
});

describe("the Compliance report in mock mode", () => {
  it("keeps the drawn samples whatever this browser holds", async () => {
    const { ReportBody, useScheduleStore } = await load(true);
    useScheduleStore.setState({ schedules: [ATORVASTATIN], doses: [] });
    render(
      <ReportBody range="7d" tab="overview" refills={[]} refillsError={null} />,
    );
    expect(screen.getByText("90%")).toBeInTheDocument();
    expect(screen.getAllByText("Metformin 500mg").length).toBeGreaterThan(0);
    expect(screen.getByText("Perfect Week")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Adjust Schedule" }),
    ).toHaveAttribute("href", "/scheduler/add?edit=panadol");
    expect(screen.queryByText(/Atorvastatin/)).toBeNull();
    const achievements = screen
      .getAllByRole("link", { name: "View all" })
      .map((link) => link.getAttribute("href"));
    expect(achievements).toContain("/compliance/achievements");
    expect(achievements).not.toContain("#");
  });
});
