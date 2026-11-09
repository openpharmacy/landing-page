import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HiddenScreensProvider } from "@/providers/hidden-screens";

import { ChangePasswordFlow } from "./change-password-flow";

const push = vi.fn();
const signOut = vi.fn(() => Promise.resolve());
const fetchMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh: vi.fn() }),
}));
vi.mock("@/features/auth/hooks/use-auth-actions", () => ({
  useAuthActions: () => ({ signOut }),
}));

beforeEach(() => {
  push.mockClear();
  signOut.mockClear();
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => vi.unstubAllGlobals());

const answer = (status: number, body?: unknown) =>
  Promise.resolve(
    new Response(body === undefined ? null : JSON.stringify(body), { status }),
  );

function renderFlow(showHidden: boolean) {
  render(
    <HiddenScreensProvider value={showHidden}>
      <ChangePasswordFlow />
    </HiddenScreensProvider>,
  );
}

async function submitForm(user: ReturnType<typeof userEvent.setup>) {
  const submit = screen.getByRole("button", { name: "Change Password" });
  expect(submit).toBeDisabled();
  await user.type(screen.getByLabelText("Current Password"), "password1");
  await user.type(screen.getByLabelText("New Password"), "Zebra7x");
  await user.type(screen.getByLabelText("Confirm New Password"), "Zebra7x");
  expect(submit).toBeEnabled();
  await user.click(submit);
}

describe("ChangePasswordFlow", () => {
  it("links home, back to the settings and to forgot password", () => {
    renderFlow(false);
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute(
      "href",
      "/home",
    );
    expect(screen.getByRole("link", { name: "Back" })).toHaveAttribute(
      "href",
      "/account/settings",
    );
    expect(
      screen.getByRole("link", { name: "Forgot Password?" }),
    ).toHaveAttribute("href", "/forgot-password");
  });

  it("sends the three fields, then shows the success step", async () => {
    fetchMock.mockReturnValue(answer(204));
    const user = userEvent.setup();
    renderFlow(false);
    await submitForm(user);

    const [path, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(path).toBe("/api/account/password");
    expect(JSON.parse(String(init.body))).toEqual({
      currentPassword: "password1",
      newPassword: "Zebra7x",
      newPasswordConfirmation: "Zebra7x",
    });
    expect(
      await screen.findByRole("heading", { name: "All set!" }),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Your password has been updated successfully. Use it the next time you log in.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Log in" })).toHaveAttribute(
      "href",
      "/account",
    );
  });

  it("asks for a PIN first while the hidden screens are shown", async () => {
    fetchMock.mockReturnValue(answer(204));
    const user = userEvent.setup();
    renderFlow(true);
    await submitForm(user);

    expect(
      await screen.findByRole("heading", { name: "Set a PIN" }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute(
      "href",
      "/home",
    );
    await user.click(screen.getByRole("button", { name: "Back" }));
    expect(
      await screen.findByRole("heading", { name: "Set New Password" }),
    ).toBeVisible();
    await submitForm(user);
    await screen.findByRole("heading", { name: "Set a PIN" });
    for (const key of ["1", "3", "5", "8"]) {
      await user.click(screen.getByRole("button", { name: key }));
    }

    expect(
      await screen.findByText(
        "Your password and PIN have been updated successfully. You can now log in securely.",
      ),
    ).toBeInTheDocument();
  });

  it("shows a wrong current password under that field", async () => {
    fetchMock.mockReturnValue(answer(400, { error: "Invalid Credentials" }));
    const user = userEvent.setup();
    renderFlow(false);
    await submitForm(user);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Invalid Credentials");
    expect(alert.previousElementSibling).toContainElement(
      screen.getByLabelText("Current Password"),
    );
    expect(
      screen.getByRole("button", { name: "Change Password" }),
    ).toBeEnabled();
  });

  it("shows the API's password rules under the new password", async () => {
    fetchMock.mockReturnValue(
      answer(400, {
        error: "New password can not be one of your last 4 passwords",
      }),
    );
    const user = userEvent.setup();
    renderFlow(false);
    await submitForm(user);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(
      "New password can not be one of your last 4 passwords",
    );
    expect(alert.previousElementSibling).toContainElement(
      screen.getByLabelText("New Password"),
    );
  });

  it("sends the user to sign in when the session has ended", async () => {
    fetchMock.mockReturnValue(
      answer(401, { error: "Please sign in again.", signIn: true }),
    );
    const user = userEvent.setup();
    renderFlow(false);
    await submitForm(user);

    await vi.waitFor(() =>
      expect(push).toHaveBeenCalledWith(
        "/sign-in?next=/account/settings/password",
      ),
    );
  });

  it("shows any other 401 in place", async () => {
    fetchMock.mockReturnValue(
      answer(401, { error: "Could not validate credentials" }),
    );
    const user = userEvent.setup();
    renderFlow(false);
    await submitForm(user);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Could not validate credentials",
    );
    expect(push).not.toHaveBeenCalled();
  });

  it("signs out before going to forgot password", async () => {
    const user = userEvent.setup();
    renderFlow(false);
    await user.click(screen.getByRole("link", { name: "Forgot Password?" }));

    expect(signOut).toHaveBeenCalledOnce();
    expect(push).toHaveBeenCalledWith("/forgot-password");
  });
});
