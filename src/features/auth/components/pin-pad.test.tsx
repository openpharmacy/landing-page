import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PinPad } from "./pin-pad";

const press = (key: string) =>
  fireEvent.click(screen.getByRole("button", { name: key }));
const checks = () =>
  screen
    .getAllByText(/^Max /)
    .map((rule) => rule.querySelector("img") !== null);

describe("PinPad rule checks", () => {
  it("checks the consecutive rule from the third digit", () => {
    render(<PinPad onComplete={vi.fn()} />);
    press("1");
    press("3");
    expect(checks()).toEqual([false, false]);
    press("5");
    expect(checks()).toEqual([true, false]);
  });

  it("checks both rules and completes on a valid fourth digit", () => {
    const onComplete = vi.fn();
    render(<PinPad onComplete={onComplete} />);
    for (const key of ["1", "3", "5", "8"]) press(key);
    expect(checks()).toEqual([true, true]);
    expect(onComplete).toHaveBeenCalledWith("1358");
  });

  it("shows no check on a broken rule", () => {
    render(<PinPad onComplete={vi.fn()} />);
    for (const key of ["1", "2", "3", "4"]) press(key);
    expect(checks()).toEqual([false, true]);
  });
});

describe("PinPad Delete", () => {
  it("is inactive with nothing to delete, then removes the last digit", () => {
    render(<PinPad onComplete={vi.fn()} />);
    const remove = screen.getByRole("button", { name: "Delete" });
    expect(remove).toBeDisabled();
    press("1");
    expect(remove).toBeEnabled();
    press("Delete");
    expect(remove).toBeDisabled();
  });
});

describe("PinPad options", () => {
  it("draws the sign-in row and hides the rules", () => {
    const onFingerprint = vi.fn();
    render(
      <PinPad
        onComplete={vi.fn()}
        bottomKeys={["back", "0", "fingerprint"]}
        onFingerprint={onFingerprint}
        showRules={false}
        footer={<a href="/forgot-password">Forgot PIN</a>}
      />,
    );
    expect(screen.queryByText(/^Max /)).not.toBeInTheDocument();
    expect(screen.getByText("Forgot PIN")).toBeInTheDocument();
    press("Log in with fingerprint");
    expect(onFingerprint).toHaveBeenCalledTimes(1);
  });

  it("still deletes and completes with the moved backspace", () => {
    const onComplete = vi.fn();
    render(
      <PinPad
        onComplete={onComplete}
        bottomKeys={["back", "0", "fingerprint"]}
        showRules={false}
      />,
    );
    for (const key of ["1", "9", "Delete", "3", "5", "8"]) press(key);
    expect(onComplete).toHaveBeenCalledWith("1358");
  });
});
