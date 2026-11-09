import { render, screen, waitFor } from "@testing-library/react";
import { StrictMode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError } from "@/lib/api/errors";

import { VerifyCode } from "./verify-code";

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

beforeEach(() => {
  push.mockClear();
  refresh.mockClear();
  api.verifyEmail.mockReset().mockResolvedValue(undefined);
  api.resendVerificationEmail.mockReset().mockResolvedValue(undefined);
});

describe("VerifyCode: sending a code when the page opens", () => {
  it("sends one code, also under Strict Mode and on re-render", async () => {
    const { rerender } = render(
      <StrictMode>
        <VerifyCode sendOnOpen returnTo="/x" onVerified={() => {}} />
      </StrictMode>,
    );
    rerender(
      <StrictMode>
        <VerifyCode sendOnOpen returnTo="/x" onVerified={() => {}} />
      </StrictMode>,
    );
    await waitFor(() =>
      expect(api.resendVerificationEmail).toHaveBeenCalledTimes(1),
    );
  });

  it("sends nothing unless asked", () => {
    render(<VerifyCode returnTo="/x" onVerified={() => {}} />);
    expect(api.resendVerificationEmail).not.toHaveBeenCalled();
  });

  it("shows why the first code could not be sent", async () => {
    api.resendVerificationEmail.mockRejectedValue(
      new ApiError({
        status: 502,
        message: "The service is not available right now. Please try again.",
        code: "http_502",
      }),
    );
    render(<VerifyCode sendOnOpen returnTo="/x" onVerified={() => {}} />);
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "The service is not available right now.",
    );
  });

  it("says the service is unavailable when the request never arrives", async () => {
    api.resendVerificationEmail.mockRejectedValue(
      new TypeError("Failed to fetch"),
    );
    render(<VerifyCode sendOnOpen returnTo="/x" onVerified={() => {}} />);
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "The service is not available right now. Please try again.",
    );
  });

  it("sends an ended session to sign in, then back", async () => {
    api.resendVerificationEmail.mockRejectedValue(
      new ApiError({
        status: 401,
        message: "Not authenticated",
        code: "x",
        detail: { error: "Not authenticated", signIn: true },
      }),
    );
    render(
      <VerifyCode
        sendOnOpen
        returnTo="/account/verify-email?next=%2Fhome"
        onVerified={() => {}}
      />,
    );
    await waitFor(() =>
      expect(push).toHaveBeenCalledWith(
        "/sign-in?next=%2Faccount%2Fverify-email%3Fnext%3D%252Fhome",
      ),
    );
    expect(refresh).toHaveBeenCalled();
  });

  it("shows a 401 that does not end the session in place", async () => {
    api.resendVerificationEmail.mockRejectedValue(
      new ApiError({
        status: 401,
        message: "Could not validate credentials",
        code: "http_401",
        detail: { error: "Could not validate credentials" },
      }),
    );
    render(<VerifyCode sendOnOpen returnTo="/x" onVerified={() => {}} />);
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Could not validate credentials",
    );
    expect(push).not.toHaveBeenCalled();
  });
});
