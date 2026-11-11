import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { HiddenScreensProvider } from "@/providers/hidden-screens";

import { Footer } from "./footer";

let pathname = "/help";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

beforeEach(() => {
  pathname = "/help";
});

const footer = (hidden: boolean) => (
  <HiddenScreensProvider value={hidden}>
    <Footer />
  </HiddenScreensProvider>
);

function show(hidden: boolean) {
  return render(footer(hidden));
}

const href = (name: string) =>
  screen.getByRole("link", { name }).getAttribute("href");

describe("Footer", () => {
  it("has no empty links", () => {
    show(false);
    for (const link of screen.getAllByRole("link")) {
      expect(link.getAttribute("href")).toMatch(/^(\/[a-z]|mailto:)/);
    }
    expect(href("Prescriptions")).toBe("/scripts");
    expect(href("Help Center")).toBe("/help");
    expect(href("Shipping Policy")).toBe("/shipping");
    expect(href("Contact Us")).toBe("mailto:hello@openpharmacy.com");
    expect(href("Privacy")).toBe("/privacy");
    expect(href("Terms")).toBe("/terms");
  });

  it("explains the entries the web does not have yet", async () => {
    const user = userEvent.setup();
    show(false);
    await user.click(screen.getByRole("button", { name: "Pharmacy Store" }));
    expect(
      screen.getByRole("dialog", {
        name: "The pharmacy store isn’t available yet",
      }),
    ).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();

    await user.click(
      screen.getByRole("button", { name: "Compliance Tracking" }),
    );
    expect(
      screen.getByRole("dialog", {
        name: "Compliance tracking isn’t available yet",
      }),
    ).toBeInTheDocument();
  });

  it("closes a notice when the page changes under it", async () => {
    const user = userEvent.setup();
    const { rerender } = show(false);
    await user.click(screen.getByRole("button", { name: "Pharmacy Store" }));
    pathname = "/home";
    rerender(footer(false));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("links Compliance Tracking while the hidden screens are shown", () => {
    show(true);
    expect(href("Compliance Tracking")).toBe("/compliance");
  });
});
