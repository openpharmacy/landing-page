import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ContactSupport } from "./contact-support";

describe("ContactSupport", () => {
  it("links Email and Phone", () => {
    render(<ContactSupport />);
    expect(screen.getByRole("link", { name: /^Email/ })).toHaveAttribute(
      "href",
      "mailto:hello@openpharmacy.com",
    );
    expect(screen.getByRole("link", { name: /^Phone/ })).toHaveAttribute(
      "href",
      "tel:1800742762",
    );
  });

  it("says Live Chat is not available yet, with the email address", async () => {
    const user = userEvent.setup();
    render(<ContactSupport />);
    await user.click(screen.getByRole("button", { name: /^Live Chat/ }));
    const dialog = screen.getByRole("dialog", {
      name: "Live chat isn’t available yet",
    });
    expect(dialog).toHaveTextContent("hello@openpharmacy.com");
    expect(screen.getByRole("link", { name: "Email Us" })).toHaveAttribute(
      "href",
      "mailto:hello@openpharmacy.com",
    );

    await user.click(screen.getByRole("button", { name: "OK" }));
    expect(screen.queryByRole("dialog")).toBeNull();

    await user.click(screen.getByRole("button", { name: /^Live Chat/ }));
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
