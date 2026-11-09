import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { BiometricOptIn } from "./biometric-opt-in";
import { QuickLogin } from "./quick-login";

const mode = vi.hoisted(() => ({ mock: true }));
vi.mock("@/config/env", () => ({
  get isMockingEnabled() {
    return mode.mock;
  },
}));

const href = (name: string) =>
  screen.getByRole("link", { name }).getAttribute("href");

describe("QuickLogin", () => {
  beforeEach(() => {
    mode.mock = true;
  });

  it("shows the remembered account and keeps ?next= on every way in", () => {
    render(
      <QuickLogin name="John Smith" email="john@email.com" next="/scripts" />,
    );
    expect(screen.getByText("John Smith")).toBeInTheDocument();
    expect(screen.getByText("john@email.com")).toBeInTheDocument();
    expect(href("Log in with Fingerprint")).toBe(
      "/sign-in/biometric?next=%2Fscripts",
    );
    expect(href("Log in with PIN")).toBe("/sign-in/pin?next=%2Fscripts");
    expect(href("Change")).toBe("/sign-in?next=%2Fscripts");
  });

  it("sends both ways in to the email form in real mode", () => {
    mode.mock = false;
    render(
      <QuickLogin name="John Smith" email="john@email.com" next="/scripts" />,
    );
    expect(href("Log in with Fingerprint")).toBe(
      "/sign-in/email?account=last&next=%2Fscripts",
    );
    expect(href("Log in with PIN")).toBe(
      "/sign-in/email?account=last&next=%2Fscripts",
    );
  });
});

describe("BiometricOptIn", () => {
  it("continues sign-up from both choices", () => {
    render(<BiometricOptIn href="/sign-up/done" />);
    expect(href("Enable Biometric Login")).toBe("/sign-up/done");
    expect(href("Maybe Later")).toBe("/sign-up/done");
  });
});
