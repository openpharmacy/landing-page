import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ModalShell } from "./modal-shell";

function renderShell() {
  const onClose = vi.fn();
  render(
    <ModalShell label="Dialog" onClose={onClose}>
      <p>Body</p>
    </ModalShell>,
  );
  const [backdrop, closeButton] = screen.getAllByRole("button", {
    name: "Close",
  });
  return { onClose, backdrop, closeButton };
}

describe("ModalShell", () => {
  it("closes on a click on the backdrop, the X or Escape", async () => {
    const user = userEvent.setup();
    const { onClose, backdrop, closeButton } = renderShell();
    await user.click(backdrop);
    await user.click(closeButton);
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it("stays open for the second click of a double click", () => {
    const { onClose, backdrop } = renderShell();
    fireEvent.click(backdrop, { detail: 2 });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("cannot be closed while closeDisabled", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <ModalShell label="Dialog" onClose={onClose} closeDisabled>
        <p>Body</p>
      </ModalShell>,
    );
    for (const close of screen.getAllByRole("button", { name: "Close" })) {
      expect(close).toBeDisabled();
    }
    await user.keyboard("{Escape}");
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-busy", "true");
  });
});
