import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it } from "vitest";

import { MOCK_SIDE_EFFECTS } from "@/features/compliance/model/mock-side-effects";
import { monthDay } from "@/features/compliance/model/report";
import { useSideEffectStore } from "@/features/compliance/model/side-effect-store";
import {
  addDays,
  toIsoDate,
} from "@/features/scheduler/components/views/calendar";

import { SideEffectDiary } from "./side-effect-diary";

beforeEach(() => {
  localStorage.clear();
  useSideEffectStore.setState({ entries: MOCK_SIDE_EFFECTS });
});

const loaded = () => screen.findByRole("heading", { name: "Recent Entries" });

const entries = () =>
  within(
    screen.getByRole("heading", { name: "Recent Entries" }).closest("section")!,
  ).getAllByRole("listitem");

describe("SideEffectDiary", () => {
  it("lists the saved entries with their edit links", async () => {
    render(<SideEffectDiary />);
    await loaded();
    expect(entries()).toHaveLength(3);
    expect(
      screen.getByRole("link", { name: "Edit Panadol 500mg, Sun, Sep 8" }),
    ).toHaveAttribute("href", "/compliance/side-effects/se-panadol-0908/edit");
  });

  it("deletes an entry", async () => {
    const user = userEvent.setup();
    render(<SideEffectDiary />);
    await loaded();
    await user.click(
      screen.getByRole("button", { name: "Delete Amlodipine, Fri, Sep 6" }),
    );
    expect(entries()).toHaveLength(2);
    expect(
      useSideEffectStore.getState().entries.map((e) => e.id),
    ).not.toContain("se-amlodipine-0906");
  });

  it("says so when there is no entry", async () => {
    useSideEffectStore.setState({ entries: [MOCK_SIDE_EFFECTS[0]] });
    const user = userEvent.setup();
    render(<SideEffectDiary />);
    await loaded();
    expect(screen.queryByText("No side effects recorded yet.")).toBeNull();
    await user.click(screen.getByRole("button", { name: /^Delete / }));
    expect(
      await screen.findByText("No side effects recorded yet."),
    ).toBeInTheDocument();
  });

  it("charts the chosen medication from its entries", async () => {
    const today = toIsoDate(new Date());
    useSideEffectStore.setState({
      entries: [
        {
          id: "a",
          medication: "Atorvastatin 20mg",
          date: addDays(today, -1),
          symptoms: [{ symptom: "Headache", severity: "Moderate" }],
        },
        {
          id: "b",
          medication: "Lisinopril 10mg",
          date: addDays(today, -10),
          symptoms: [{ symptom: "Dizziness", severity: "Mild" }],
        },
      ],
    });
    const user = userEvent.setup();
    render(<SideEffectDiary />);
    const select = await screen.findByRole("combobox", { name: "Medication" });
    expect(
      within(select)
        .getAllByRole("option")
        .map((o) => o.textContent),
    ).toEqual(["Atorvastatin 20mg", "Lisinopril 10mg"]);
    expect(
      await screen.findAllByRole("img", {
        name: "Side-effect severity over time",
      }),
    ).toHaveLength(2);
    expect(screen.getAllByText("Headache")).toHaveLength(2);
    expect(screen.getAllByText(monthDay(today)).length).toBeGreaterThan(0);

    await user.selectOptions(select, "Lisinopril 10mg");
    expect(
      await screen.findByText(
        "No side effects recorded for Lisinopril 10mg in the last 7 days.",
      ),
    ).toBeInTheDocument();
    const chip = screen.getByRole("button", { name: "14d" });
    await user.click(chip);
    expect(chip).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByText("Dizziness").length).toBeGreaterThan(0);
  });

  it("has no chart before the first entry", async () => {
    useSideEffectStore.setState({ entries: [] });
    render(<SideEffectDiary />);
    await loaded();
    expect(screen.queryByRole("combobox")).toBeNull();
    expect(
      screen.getByText(
        "Record a side effect after a dose to see its trend here.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("No side effects recorded yet."),
    ).toBeInTheDocument();
  });

  it("leaves the body out of the server render, so it does not move later", () => {
    const html = renderToString(<SideEffectDiary />);
    expect(html).toContain("Side-Effect Diary");
    expect(html).not.toContain("Side-Effect Severity Trend");
    expect(html).not.toContain("Recent Entries");
  });
});
