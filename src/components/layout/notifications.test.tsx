import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { NotificationsButton } from "./notifications";

let pathname = "/home";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

const bell = () => screen.getByRole("button", { name: "Notifications" });
const panel = () => screen.queryByRole("dialog", { name: "Notifications" });

beforeEach(() => {
  pathname = "/home";
});

describe("NotificationsButton", () => {
  it("opens the empty panel and closes it again from the bell", async () => {
    const user = userEvent.setup();
    render(<NotificationsButton />);
    expect(panel()).toBeNull();
    expect(bell()).toHaveAttribute("aria-expanded", "false");

    await user.click(bell());
    expect(panel()).toBeInTheDocument();
    expect(bell()).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("No notifications yet")).toBeInTheDocument();

    await user.click(bell());
    expect(panel()).toBeNull();
  });

  it("closes on Escape and gives the focus back to the bell", async () => {
    const user = userEvent.setup();
    render(<NotificationsButton />);
    await user.click(bell());
    await user.keyboard("{Escape}");
    expect(panel()).toBeNull();
    expect(bell()).toHaveFocus();
  });

  it("closes on a press outside, not inside", async () => {
    const user = userEvent.setup();
    render(
      <>
        <NotificationsButton />
        <p>Elsewhere</p>
      </>,
    );
    await user.click(bell());
    await user.click(screen.getByText("No notifications yet"));
    expect(panel()).toBeInTheDocument();
    await user.click(screen.getByText("Elsewhere"));
    expect(panel()).toBeNull();
  });

  it("closes from its close button", async () => {
    const user = userEvent.setup();
    render(<NotificationsButton />);
    await user.click(bell());
    await user.click(
      screen.getByRole("button", { name: "Close notifications" }),
    );
    expect(panel()).toBeNull();
  });

  it("closes when the page changes", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<NotificationsButton />);
    await user.click(bell());
    pathname = "/scripts";
    rerender(<NotificationsButton />);
    expect(panel()).toBeNull();

    pathname = "/home";
    rerender(<NotificationsButton />);
    expect(panel()).toBeNull();
    expect(bell()).toHaveAttribute("aria-expanded", "false");
  });
});
