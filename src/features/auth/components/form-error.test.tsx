import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FormError } from "./form-error";

describe("FormError", () => {
  it("renders the API message inside an alert role", () => {
    render(<FormError message="Invalid credentials" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid credentials");
  });
});
