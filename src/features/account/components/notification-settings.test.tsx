import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { NotificationSettings } from "./notification-settings";

const KEY = "op_notifications:0123456789abcdef";

const switches = (name: string) =>
  screen.getAllByRole("switch", { name, hidden: true });

beforeEach(() => window.localStorage.clear());

describe("NotificationSettings", () => {
  it("shows one set of choices in the desktop and the phone layout", async () => {
    const user = userEvent.setup();
    render(<NotificationSettings storageKey={KEY} />);
    const [desktop, phone] = switches("Health Tips SMS");
    expect(desktop).toHaveAttribute("aria-checked", "false");
    expect(phone).toHaveAttribute("aria-checked", "false");

    await user.click(desktop!);
    expect(desktop).toHaveAttribute("aria-checked", "true");
    expect(phone).toHaveAttribute("aria-checked", "true");
  });

  it("lists Order Updates on the phone only", () => {
    render(<NotificationSettings storageKey={KEY} />);
    expect(switches("Order Updates Email")).toHaveLength(1);
    expect(switches("Account Security Email")).toHaveLength(2);
  });

  it("keeps the choices for the next visit, per user", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<NotificationSettings storageKey={KEY} />);
    await user.click(switches("Promotions & Offers Push")[1]!);
    unmount();

    render(<NotificationSettings storageKey={KEY} />);
    for (const toggle of switches("Promotions & Offers Push")) {
      expect(toggle).toHaveAttribute("aria-checked", "false");
    }
    expect(JSON.parse(window.localStorage.getItem(KEY) ?? "{}")).toMatchObject({
      promotions: { email: true, push: false, sms: false },
    });
  });

  it("starts from the defaults for another user", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<NotificationSettings storageKey={KEY} />);
    await user.click(switches("Health Tips Email")[0]!);
    unmount();

    render(<NotificationSettings storageKey="op_notifications:other" />);
    for (const toggle of switches("Health Tips Email")) {
      expect(toggle).toHaveAttribute("aria-checked", "true");
    }
  });
});
