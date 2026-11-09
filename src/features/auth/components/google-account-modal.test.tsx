import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { GoogleAccountModal } from "./google-account-modal";

describe("GoogleAccountModal", () => {
  it("links the privacy policy and the terms", () => {
    render(<GoogleAccountModal open onClose={vi.fn()} onSelect={vi.fn()} />);
    expect(
      screen.getByRole("link", { name: "privacy policy" }),
    ).toHaveAttribute("href", "/privacy");
    expect(
      screen.getByRole("link", { name: "terms of service" }),
    ).toHaveAttribute("href", "/terms");
  });
});
