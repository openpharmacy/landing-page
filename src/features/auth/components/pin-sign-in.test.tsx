import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PinSignIn } from "./pin-sign-in";

const push = vi.fn();
const refresh = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push, refresh }) }));

const signInWithDevice = vi.fn();
vi.mock("../hooks/use-auth-actions", () => ({
  useAuthActions: () => ({ signInWithDevice }),
}));

const mode = vi.hoisted(() => ({ mock: true }));
vi.mock("@/config/env", () => ({
  get isMockingEnabled() {
    return mode.mock;
  },
}));

function enter(pin: string) {
  for (const key of pin) {
    fireEvent.click(screen.getByRole("button", { name: key }));
  }
}

const filledDots = () =>
  document.querySelectorAll("span.bg-info-500, span.bg-error-500").length;

describe("PinSignIn", () => {
  beforeEach(() => {
    mode.mock = true;
    push.mockClear();
    signInWithDevice.mockReset();
  });

  it("signs in with a valid PIN and goes to the target", async () => {
    signInWithDevice.mockResolvedValue({ id: "demo", email: "j@e.com" });
    render(<PinSignIn email="j@e.com" next="/scripts" />);
    enter("1358");
    await waitFor(() => expect(push).toHaveBeenCalledWith("/scripts"));
    expect(signInWithDevice).toHaveBeenCalledWith("j@e.com");
  });

  it("clears the pad when the sign-in fails", async () => {
    signInWithDevice.mockRejectedValue(new Error("Request failed"));
    render(<PinSignIn email="j@e.com" next={null} />);
    enter("1358");
    await waitFor(() => expect(filledDots()).toBe(0));
    expect(push).not.toHaveBeenCalled();
  });

  it("sends the user to the email form in real mode, keeping ?next=", async () => {
    mode.mock = false;
    render(<PinSignIn email="j@e.com" next="/scripts" />);
    enter("1358");
    await waitFor(() =>
      expect(push).toHaveBeenCalledWith(
        "/sign-in/email?account=last&next=%2Fscripts",
      ),
    );
    expect(signInWithDevice).not.toHaveBeenCalled();
  });
});
