import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Refill } from "../model/home-data";
import { RefillSection } from "./refill-section";

const refill = (n: number): Refill => ({
  id: `00000000000000${String(n).padStart(2, "0")}`,
  name: `Medicine ${n}`,
  form: "10mg tablet",
  synced: true,
  patient: "Ann Lee",
  patientInitials: "AL",
  patientClass: "bg-info-500",
});

describe("RefillSection", () => {
  it("opens each card's script and keeps three cards on desktop", () => {
    render(<RefillSection refills={[1, 2, 3, 4, 5].map(refill)} />);
    const cards = screen
      .getAllByRole("link")
      .filter((link) =>
        link.getAttribute("href")?.startsWith("/scripts/detail"),
      );
    expect(cards.map((c) => c.getAttribute("href"))).toEqual(
      [1, 2, 3, 4, 5].map((n) => `/scripts/detail?id=${refill(n).id}`),
    );
    expect(cards.map((c) => c.classList.contains("lg:hidden"))).toEqual([
      false,
      false,
      false,
      true,
      true,
    ]);
    expect(screen.getByRole("link", { name: "View all" })).toHaveAttribute(
      "href",
      "/scripts",
    );
  });
});
