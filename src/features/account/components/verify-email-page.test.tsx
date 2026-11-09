import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { VerifyEmailPage } from "./verify-email-page";

const push = vi.fn();
const refresh = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push, refresh }) }));

const api = vi.hoisted(() => ({
  verifyEmail: vi.fn(),
  resendVerificationEmail: vi.fn(),
}));
vi.mock("@/features/auth/api/auth-api", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/features/auth/api/auth-api")>()),
  ...api,
}));

function enter(code: string) {
  for (const [i, digit] of [...code].entries()) {
    fireEvent.change(screen.getByLabelText(`Digit ${i + 1}`), {
      target: { value: digit },
    });
  }
}

beforeEach(() => {
  push.mockClear();
  refresh.mockClear();
  api.verifyEmail.mockReset().mockResolvedValue(undefined);
  api.resendVerificationEmail.mockReset().mockResolvedValue(undefined);
});

describe("VerifyEmailPage", () => {
  it("names the address, links Back to where the user came from", () => {
    render(<VerifyEmailPage email="a@b.com" next="/home" sendOnOpen />);
    expect(
      screen.getByRole("heading", { name: "Verify your email" }),
    ).toBeVisible();
    expect(
      screen.getByText(/We've sent a 4-digit verification code to/),
    ).toHaveTextContent(
      "We've sent a 4-digit verification code to a@b.com.Enter it below to continue.",
    );
    expect(screen.getByRole("link", { name: "Back" })).toHaveAttribute(
      "href",
      "/home",
    );
  });

  it("sends a code when it opens, unless one was just sent", () => {
    const { unmount } = render(
      <VerifyEmailPage email="a@b.com" next="/account" sendOnOpen />,
    );
    expect(api.resendVerificationEmail).toHaveBeenCalledTimes(1);
    unmount();
    render(
      <VerifyEmailPage email="a@b.com" next="/account" sendOnOpen={false} />,
    );
    expect(api.resendVerificationEmail).toHaveBeenCalledTimes(1);
  });

  it("returns to `next` once verified", async () => {
    render(
      <VerifyEmailPage
        email="a@b.com"
        next="/account/profile"
        sendOnOpen={false}
      />,
    );
    enter("4821");
    fireEvent.click(screen.getByRole("button", { name: "Verify Email" }));
    await waitFor(() => expect(push).toHaveBeenCalledWith("/account/profile"));
    expect(api.verifyEmail).toHaveBeenCalledWith("4821");
    expect(refresh).toHaveBeenCalled();
  });

  it("resends a code", async () => {
    render(
      <VerifyEmailPage email="a@b.com" next="/account" sendOnOpen={false} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Resend" }));
    await waitFor(() =>
      expect(api.resendVerificationEmail).toHaveBeenCalledTimes(1),
    );
  });
});
