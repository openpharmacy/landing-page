import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError } from "@/lib/api/errors";
import { HiddenScreensProvider } from "@/providers/hidden-screens";

import { VerifyEmailForm } from "./verify-email-form";

const push = vi.fn();
const refresh = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push, refresh }) }));

const api = vi.hoisted(() => ({
  verifyEmail: vi.fn(),
  resendVerificationEmail: vi.fn(),
}));
vi.mock("../api/auth-api", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../api/auth-api")>()),
  ...api,
}));

const apiError = (status: number, message: string) =>
  new ApiError({ status, message, code: `http_${status}` });

function verify(showHidden: boolean, code = "1234") {
  render(
    <HiddenScreensProvider value={showHidden}>
      <VerifyEmailForm email="john@email.com" />
    </HiddenScreensProvider>,
  );
  for (const [i, digit] of [...code].entries()) {
    fireEvent.change(screen.getByLabelText(`Digit ${i + 1}`), {
      target: { value: digit },
    });
  }
  fireEvent.click(screen.getByRole("button", { name: "Verify Email" }));
}

describe("VerifyEmailForm", () => {
  beforeEach(() => {
    push.mockClear();
    refresh.mockClear();
    api.verifyEmail.mockReset().mockResolvedValue(undefined);
    api.resendVerificationEmail.mockReset().mockResolvedValue(undefined);
  });

  it("sends the code and ends sign-up on the done screen while the PIN is hidden", async () => {
    verify(false, "4821");
    await waitFor(() => expect(push).toHaveBeenCalledWith("/sign-up/done"));
    expect(refresh).toHaveBeenCalled();
    expect(api.verifyEmail).toHaveBeenCalledWith("4821");
  });

  it("goes to the PIN step when the hidden screens are shown", async () => {
    verify(true);
    await waitFor(() => expect(push).toHaveBeenCalledWith("/sign-up/pin"));
  });

  it("shows the API's message for a wrong code and stays", async () => {
    api.verifyEmail.mockRejectedValue(
      apiError(400, "Verification Code is invalid or it has expired"),
    );
    verify(false);
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Verification Code is invalid or it has expired",
    );
    expect(push).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Verify Email" })).toBeEnabled();

    fireEvent.change(screen.getByLabelText("Digit 4"), {
      target: { value: "5" },
    });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("sends the user to sign in when the session has ended", async () => {
    api.verifyEmail.mockRejectedValue(
      new ApiError({
        status: 401,
        message: "Not authenticated",
        code: "http_401",
        detail: { error: "Not authenticated", signIn: true },
      }),
    );
    verify(false);
    await waitFor(() =>
      expect(push).toHaveBeenCalledWith("/sign-in?next=%2Fsign-up%2Fverify"),
    );
    expect(refresh).toHaveBeenCalled();
  });

  it("resends the code", async () => {
    render(<VerifyEmailForm email="john@email.com" />);
    fireEvent.click(screen.getByRole("button", { name: "Resend" }));
    await waitFor(() =>
      expect(api.resendVerificationEmail).toHaveBeenCalledTimes(1),
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("shows why a resend failed", async () => {
    api.resendVerificationEmail.mockRejectedValue(
      apiError(
        502,
        "The service is not available right now. Please try again.",
      ),
    );
    render(<VerifyEmailForm email="john@email.com" />);
    fireEvent.click(screen.getByRole("button", { name: "Resend" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "The service is not available right now.",
    );
  });
});
