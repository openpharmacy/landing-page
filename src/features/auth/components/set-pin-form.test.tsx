import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { HiddenScreensProvider } from "@/providers/hidden-screens";

import { SetPinForm } from "./set-pin-form";

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

function setPin(showHidden: boolean, next?: string) {
  render(
    <HiddenScreensProvider value={showHidden}>
      <SetPinForm next={next} />
    </HiddenScreensProvider>,
  );
  for (const key of ["1", "3", "5", "8"]) {
    fireEvent.click(screen.getByRole("button", { name: key }));
  }
}

describe("SetPinForm", () => {
  beforeEach(() => push.mockClear());

  it("offers biometric login next when the hidden screens are shown", () => {
    setPin(true);
    expect(push).toHaveBeenCalledWith("/sign-up/biometrics");
  });

  it("ends sign-up otherwise", () => {
    setPin(false);
    expect(push).toHaveBeenCalledWith("/sign-up/done");
  });

  it("keeps ?next= on the way to biometric login", () => {
    setPin(true, "/scripts");
    expect(push).toHaveBeenCalledWith("/sign-up/biometrics?next=%2Fscripts");
  });

  it("keeps ?next= on the way to the end", () => {
    setPin(false, "/scripts");
    expect(push).toHaveBeenCalledWith("/sign-up/done?next=%2Fscripts");
  });
});
