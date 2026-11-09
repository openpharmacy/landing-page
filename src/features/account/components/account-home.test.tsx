import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AccountHome } from "./account-home";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

describe("AccountHome", () => {
  it("links every settings row somewhere real", () => {
    render(
      <AccountHome
        user={{ firstName: "Ann", lastName: "Lee", email: "a@b.com" }}
        activeScripts={2}
      />,
    );
    const hrefs = screen
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    expect(hrefs).toEqual([
      "/account/profile",
      "/account/notifications",
      "/account/privacy",
      "/help",
      "/account/settings",
    ]);
  });
});
