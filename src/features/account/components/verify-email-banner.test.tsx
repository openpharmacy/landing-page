import { render, screen, waitFor } from "@testing-library/react";
import { StrictMode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { VerifyEmailBanner } from "./verify-email-banner";

const api = vi.hoisted(() => ({ getEmailStatus: vi.fn() }));
vi.mock("@/features/auth/api/auth-api", () => api);

beforeEach(() => api.getEmailStatus.mockReset());

describe("VerifyEmailBanner", () => {
  it("links to the verify page and back to the page it is on", async () => {
    api.getEmailStatus.mockResolvedValue(false);
    render(<VerifyEmailBanner returnTo="/home" />);
    expect(
      screen.getByText("Your email address isn’t verified yet."),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Verify now" })).toHaveAttribute(
      "href",
      "/account/verify-email?next=%2Fhome",
    );
    await waitFor(() => expect(api.getEmailStatus).toHaveBeenCalled());
    expect(screen.getByRole("link", { name: "Verify now" })).toBeVisible();
  });

  it("asks the API once and goes when the email is verified", async () => {
    api.getEmailStatus.mockResolvedValue(true);
    render(
      <StrictMode>
        <VerifyEmailBanner returnTo="/account" />
      </StrictMode>,
    );
    await waitFor(() =>
      expect(screen.queryByRole("link", { name: "Verify now" })).toBeNull(),
    );
    expect(api.getEmailStatus).toHaveBeenCalledTimes(1);
  });

  it("stays when the status is unknown", async () => {
    api.getEmailStatus.mockResolvedValue(null);
    render(<VerifyEmailBanner returnTo="/account" />);
    await waitFor(() => expect(api.getEmailStatus).toHaveBeenCalled());
    expect(screen.getByRole("link", { name: "Verify now" })).toBeVisible();
  });
});
