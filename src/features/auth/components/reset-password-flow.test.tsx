import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError } from "@/lib/api/errors";
import { HiddenScreensProvider } from "@/providers/hidden-screens";

import { ResetPasswordFlow } from "./reset-password-flow";

const api = vi.hoisted(() => ({
  requestPasswordReset: vi.fn(),
  resetPassword: vi.fn(),
}));
vi.mock("../api/auth-api", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../api/auth-api")>()),
  ...api,
}));

const CODE_ERROR = "Verification Code is invalid or it has expired";

const apiError = (status: number, message: string, field?: string) =>
  new ApiError({
    status,
    message,
    code: `http_${status}`,
    detail: field ? { error: message, field } : { error: message },
  });

function start(showHidden = false) {
  render(
    <HiddenScreensProvider value={showHidden}>
      <ResetPasswordFlow />
    </HiddenScreensProvider>,
  );
}

async function toCode(email = "ann@b.com") {
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: email },
  });
  fireEvent.click(screen.getByRole("button", { name: "Send Reset Email" }));
  await screen.findByLabelText("Digit 1");
}

function typeCode(code: string) {
  for (const [i, digit] of [...code].entries()) {
    fireEvent.change(screen.getByLabelText(`Digit ${i + 1}`), {
      target: { value: digit },
    });
  }
}

async function toPassword(code = "4821") {
  await toCode();
  typeCode(code);
  fireEvent.click(screen.getByRole("button", { name: "Reset" }));
  await waitFor(() => expect(newPassword()).toBeInTheDocument());
}

const newPassword = () => document.querySelector("#new-password");

function setPassword(value: string) {
  fireEvent.change(newPassword()!, { target: { value } });
  fireEvent.change(document.querySelector("#confirm-password")!, {
    target: { value },
  });
  fireEvent.click(screen.getByRole("button", { name: "Log in" }));
}

describe("ResetPasswordFlow", () => {
  beforeEach(() => {
    api.requestPasswordReset.mockReset().mockResolvedValue(undefined);
    api.resetPassword.mockReset().mockResolvedValue(undefined);
  });

  it("sends the reset email and moves to the code step", async () => {
    start();
    await toCode(" ann@b.com ");
    expect(api.requestPasswordReset).toHaveBeenCalledWith("ann@b.com");
  });

  it("stays on the email step when the request fails", async () => {
    api.requestPasswordReset.mockRejectedValue(
      apiError(
        502,
        "The service is not available right now. Please try again.",
      ),
    );
    start();
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "ann@b.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send Reset Email" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "The service is not available right now.",
    );
    expect(screen.queryByLabelText("Digit 1")).not.toBeInTheDocument();
  });

  it("resends the code after 30 seconds, on the phone too", async () => {
    vi.useFakeTimers();
    try {
      start();
      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "ann@b.com" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Send Reset Email" }));
      await act(async () => {});
      expect(
        screen.getByRole("button", { name: "Resend in 30s" }),
      ).toBeDisabled();
      for (let i = 0; i < 30; i += 1) {
        act(() => {
          vi.advanceTimersByTime(1000);
        });
      }
      fireEvent.click(screen.getByRole("button", { name: "Resend" }));
      await act(async () => {});
    } finally {
      vi.useRealTimers();
    }
    expect(api.requestPasswordReset).toHaveBeenCalledTimes(2);
  });

  it("goes home from the phones' Back to home, one step back on desktop", async () => {
    start();
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Back" })).toHaveAttribute(
      "href",
      "/sign-in/email",
    );
    await toCode();
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute(
      "href",
      "/",
    );
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(
      await screen.findByRole("button", { name: "Send Reset Email" }),
    ).toBeInTheDocument();
  });

  it("resets with the email, code and new password, then shows done", async () => {
    start();
    await toPassword("4821");
    setPassword("newpass7");
    expect(await screen.findByText("All set!")).toBeInTheDocument();
    expect(api.resetPassword).toHaveBeenCalledWith({
      email: "ann@b.com",
      code: "4821",
      password: "newpass7",
      passwordConfirmation: "newpass7",
    });
    expect(screen.getByRole("link", { name: "Log in" })).toHaveAttribute(
      "href",
      "/sign-in",
    );
  });

  it("goes on to the PIN step when the hidden screens are shown", async () => {
    start(true);
    await toPassword();
    setPassword("newpass7");
    expect(
      await screen.findByRole("heading", { name: "Set a PIN" }),
    ).toBeInTheDocument();
  });

  it("returns to the code step with the message for a wrong code", async () => {
    api.resetPassword.mockRejectedValueOnce(apiError(400, CODE_ERROR, "code"));
    start();
    await toPassword("0000");
    setPassword("newpass7");
    expect(await screen.findByRole("alert")).toHaveTextContent(CODE_ERROR);
    expect(screen.getByLabelText("Digit 1")).toBeInTheDocument();

    typeCode("4821");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    await waitFor(() => expect(newPassword()).toHaveValue("newpass7"));
    fireEvent.click(screen.getByRole("button", { name: "Log in" }));
    expect(await screen.findByText("All set!")).toBeInTheDocument();
    expect(api.resetPassword).toHaveBeenLastCalledWith(
      expect.objectContaining({ code: "4821", password: "newpass7" }),
    );
  });

  it("shows password errors under the password field", async () => {
    api.resetPassword.mockRejectedValue(
      apiError(400, "New password can not be one of your last 4 passwords"),
    );
    start();
    await toPassword();
    setPassword("newpass7");
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "New password can not be one of your last 4 passwords",
    );
    expect(newPassword()).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeEnabled();
  });
});
