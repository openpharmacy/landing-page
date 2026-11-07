import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Landing } from "@/features/home/components/landing";

describe("Landing", () => {
  it("renders the hero heading", () => {
    render(<Landing />);
    expect(
      screen.getByRole("heading", { name: /smarter prescriptions/i }),
    ).toBeInTheDocument();
  });
});
