import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError } from "@/lib/api/errors";
import { HiddenScreensProvider } from "@/providers/hidden-screens";

import { GoogleProfileForm } from "./google-profile-form";

const push = vi.fn();
const refresh = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push, refresh }) }));

const actions = vi.hoisted(() => ({ completeProfile: vi.fn() }));
vi.mock("../hooks/use-auth-actions", () => ({
  useAuthActions: () => actions,
}));

vi.stubGlobal("ResizeObserver", function ResizeObserver() {
  return { observe() {}, unobserve() {}, disconnect() {} };
});

function renderForm(showHidden = false, next: string | null = null) {
  render(
    <HiddenScreensProvider value={showHidden}>
      <GoogleProfileForm firstName="Gail" lastName="" next={next} />
    </HiddenScreensProvider>,
  );
  fireEvent.change(screen.getByLabelText("Last Name"), {
    target: { value: " Ng " },
  });
}

function submit(showHidden = false, next: string | null = null) {
  renderForm(showHidden, next);
  fireEvent.click(screen.getByRole("checkbox"));
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
}

describe("GoogleProfileForm", () => {
  beforeEach(() => {
    push.mockClear();
    refresh.mockClear();
    actions.completeProfile.mockReset().mockResolvedValue({ id: "u-1" });
  });

  it("starts with the terms unticked, as the email sign-up does", () => {
    renderForm();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
  });

  it("links the terms and the privacy policy", () => {
    renderForm();
    expect(screen.getByRole("link", { name: "Terms of Use" })).toHaveAttribute(
      "href",
      "/terms",
    );
    expect(
      screen.getByRole("link", { name: "Privacy Policy" }),
    ).toHaveAttribute("href", "/privacy");
  });

  it("saves the name and ends sign-up while the PIN is hidden", async () => {
    submit();
    await waitFor(() => expect(push).toHaveBeenCalledWith("/sign-up/done"));
    expect(refresh).toHaveBeenCalled();
    expect(actions.completeProfile).toHaveBeenCalledWith({
      name: "Gail",
      surname: "Ng",
    });
  });

  it("goes to the PIN step when the hidden screens are shown", async () => {
    submit(true);
    await waitFor(() => expect(push).toHaveBeenCalledWith("/sign-up/pin"));
  });

  it("goes to ?next= once the name is saved", async () => {
    submit(true, "/scripts");
    await waitFor(() => expect(push).toHaveBeenCalledWith("/scripts"));
  });

  it("sends the user to sign in when the session has ended", async () => {
    actions.completeProfile.mockRejectedValue(
      new ApiError({
        status: 401,
        message: "ended",
        code: "http_401",
        detail: { signIn: true },
      }),
    );
    submit(false, "/scripts");
    await waitFor(() =>
      expect(push).toHaveBeenCalledWith("/sign-in?next=%2Fscripts"),
    );
  });

  it("shows other failures and lets the user try again", async () => {
    actions.completeProfile.mockRejectedValue(
      new ApiError({ status: 401, message: "Bad app token", code: "http_401" }),
    );
    submit();
    expect(await screen.findByRole("alert")).toHaveTextContent("Bad app token");
    expect(screen.getByRole("button", { name: "Continue" })).toBeEnabled();
    expect(push).not.toHaveBeenCalled();
  });

  it("says the name could not be saved when the request never arrives", async () => {
    actions.completeProfile.mockRejectedValue(new TypeError("Failed to fetch"));
    submit();
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Could not save your name. Please try again.",
    );
  });
});
