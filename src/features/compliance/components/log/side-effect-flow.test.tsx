import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { SideEffectFlow } from "./side-effect-flow";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({
    matches: query.includes("min-width"),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
});

const level = (name: string) =>
  screen.getByRole("button", { name: new RegExp(`^${name}`) });

function renderFlow(props: Partial<Parameters<typeof SideEffectFlow>[0]>) {
  const onSave = vi.fn();
  const onExit = vi.fn();
  render(
    <SideEffectFlow
      mode="record"
      medication="Panadol 500mg"
      date="2025-10-12"
      onExit={onExit}
      onSave={onSave}
      {...props}
    />,
  );
  return { onSave, onExit };
}

describe("SideEffectFlow", () => {
  it("rates each picked side effect in grid order, then saves the note", async () => {
    const user = userEvent.setup();
    const { onSave } = renderFlow({});
    expect(screen.getByText("Panadol 500mg")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Fatigue" }));
    await user.click(screen.getByRole("button", { name: "Nausea" }));
    expect(screen.getByRole("button", { name: "Nausea" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByText("Step 1 of 2")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Nausea" })).toBeVisible();
    await user.click(level("Mild"));
    expect(screen.getByText("Step 2 of 2")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Fatigue" })).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByText("Step 1 of 2")).toBeInTheDocument();
    expect(level("Mild")).toHaveAttribute("aria-pressed", "true");
    await user.click(level("Moderate"));
    await user.click(level("Severe"));

    expect(
      screen.getByRole("heading", { name: "Additional Notes" }),
    ).toBeVisible();
    await user.type(screen.getByLabelText("Add Note"), "  Felt tired  ");
    expect(screen.getByText("14/200")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Complete" }));

    expect(onSave).toHaveBeenCalledWith({
      symptoms: [
        { symptom: "Nausea", severity: "Moderate" },
        { symptom: "Fatigue", severity: "Severe" },
      ],
      note: "Felt tired",
    });
  });

  it("goes straight to the note when nothing is picked", async () => {
    const user = userEvent.setup();
    const { onExit } = renderFlow({});
    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(
      screen.getByRole("heading", { name: "Additional Notes" }),
    ).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Back" }));
    await user.click(screen.getByRole("button", { name: "Back" }));
    expect(onExit).toHaveBeenCalledOnce();
  });

  it("keeps the note within 200 characters", async () => {
    const user = userEvent.setup();
    renderFlow({});
    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByLabelText("Add Note")).toHaveAttribute(
      "maxLength",
      "200",
    );
  });

  it("edits an entry with its side effects and severities picked", async () => {
    const user = userEvent.setup();
    const { onSave } = renderFlow({
      mode: "edit",
      date: "2025-09-08",
      initial: {
        symptoms: [
          { symptom: "Nausea", severity: "Mild" },
          { symptom: "Headache", severity: "Moderate" },
        ],
        note: "Felt worse in the morning",
      },
    });
    expect(
      screen.getByRole("heading", { name: "Edit Side Effect" }),
    ).toBeVisible();
    expect(screen.getByText("Monday, Sep 8, 2025")).toBeInTheDocument();
    expect(screen.getByText("Medication:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Headache" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await user.click(screen.getByRole("button", { name: "Nausea" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByText("Step 1 of 1")).toBeInTheDocument();
    expect(level("Moderate")).toHaveAttribute("aria-pressed", "true");
    await user.click(level("Severe"));
    expect(screen.getByLabelText("Add Note")).toHaveValue(
      "Felt worse in the morning",
    );
    await user.click(screen.getByRole("button", { name: "Complete" }));

    expect(onSave).toHaveBeenCalledWith({
      symptoms: [{ symptom: "Headache", severity: "Severe" }],
      note: "Felt worse in the morning",
    });
  });

  it("does not save an edited entry with no side effect and no note", async () => {
    const user = userEvent.setup();
    const { onSave } = renderFlow({
      mode: "edit",
      date: "2025-09-08",
      initial: {
        symptoms: [{ symptom: "Nausea", severity: "Mild" }],
        note: "Felt worse",
      },
    });
    await user.click(screen.getByRole("button", { name: "Nausea" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));
    await user.clear(screen.getByLabelText("Add Note"));
    await user.click(screen.getByRole("button", { name: "Complete" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Select a side effect or add a note to save this entry.",
    );
    expect(onSave).not.toHaveBeenCalled();

    await user.type(screen.getByLabelText("Add Note"), "Better today");
    expect(screen.queryByRole("alert")).toBeNull();
    await user.click(screen.getByRole("button", { name: "Complete" }));
    expect(onSave).toHaveBeenCalledWith({
      symptoms: [],
      note: "Better today",
    });
  });

  it("drops the hint once a side effect is picked again", async () => {
    const user = userEvent.setup();
    const { onSave } = renderFlow({
      mode: "edit",
      date: "2025-09-08",
      initial: { symptoms: [{ symptom: "Nausea", severity: "Mild" }] },
    });
    await user.click(screen.getByRole("button", { name: "Nausea" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));
    await user.click(screen.getByRole("button", { name: "Complete" }));
    expect(screen.getByRole("alert")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Back" }));
    await user.click(screen.getByRole("button", { name: "Fatigue" }));
    await user.click(screen.getByRole("button", { name: "Continue" }));
    await user.click(level("Moderate"));
    expect(screen.queryByRole("alert")).toBeNull();
    await user.click(screen.getByRole("button", { name: "Complete" }));
    expect(onSave).toHaveBeenCalledWith({
      symptoms: [{ symptom: "Fatigue", severity: "Moderate" }],
      note: undefined,
    });
  });

  it("saves once when Complete is clicked twice", async () => {
    const user = userEvent.setup();
    const { onSave } = renderFlow({});
    await user.click(screen.getByRole("button", { name: "Continue" }));
    await user.type(screen.getByLabelText("Add Note"), "Slept badly");
    await user.dblClick(screen.getByRole("button", { name: "Complete" }));
    expect(onSave).toHaveBeenCalledOnce();
  });
});
