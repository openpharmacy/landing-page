import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { BiometricPrompt } from "./biometric-prompt";

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

describe("BiometricPrompt", () => {
  beforeEach(() => {
    mode.mock = true;
    push.mockClear();
    signInWithDevice.mockReset();
  });

  it("signs in on a scan and goes to the target", async () => {
    signInWithDevice.mockResolvedValue({ id: "demo", email: "j@e.com" });
    render(<BiometricPrompt email="j@e.com" next="/scripts" />);
    fireEvent.click(
      screen.getByRole("button", { name: "Scan your fingerprint" }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await waitFor(() => expect(push).toHaveBeenCalledWith("/scripts"));
    expect(signInWithDevice).toHaveBeenCalledWith("j@e.com");
  });

  it("shows the sheet again when the sign-in fails", async () => {
    signInWithDevice.mockRejectedValue(new Error("Request failed"));
    render(<BiometricPrompt email="j@e.com" next={null} />);
    fireEvent.click(
      screen.getByRole("button", { name: "Scan your fingerprint" }),
    );
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });

  it("cancels back to the quick login", () => {
    render(<BiometricPrompt email="j@e.com" next={null} />);
    expect(screen.getByRole("link", { name: "Cancel" })).toHaveAttribute(
      "href",
      "/sign-in/quick",
    );
  });

  it("sends the user to the email form in real mode, keeping ?next=", () => {
    mode.mock = false;
    render(<BiometricPrompt email="j@e.com" next="/scripts" />);
    fireEvent.click(
      screen.getByRole("button", { name: "Scan your fingerprint" }),
    );
    expect(push).toHaveBeenCalledWith(
      "/sign-in/email?account=last&next=%2Fscripts",
    );
    expect(signInWithDevice).not.toHaveBeenCalled();
  });
});
