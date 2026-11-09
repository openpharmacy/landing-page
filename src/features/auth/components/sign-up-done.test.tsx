import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SignUpDone } from "./sign-up-done";

describe("SignUpDone", () => {
  it("mentions the PIN only when the PIN step is shown", () => {
    const { rerender } = render(<SignUpDone withPin href="/home" />);
    expect(screen.getByText(/password and PIN have been/)).toBeInTheDocument();

    rerender(<SignUpDone withPin={false} href="/home" />);
    expect(
      screen.getByText(
        "Your account has been created successfully. You’re ready to go.",
      ),
    ).toBeInTheDocument();
  });

  it("sends Log In to the given target", () => {
    render(<SignUpDone withPin={false} href="/home" />);
    expect(screen.getByRole("link", { name: "Log In" })).toHaveAttribute(
      "href",
      "/home",
    );
  });
});
