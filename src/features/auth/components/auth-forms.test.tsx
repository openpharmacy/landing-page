import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError } from "@/lib/api/errors";

import { SignInForm } from "./sign-in-form";
import { SignUpEmailForm } from "./sign-up-email-form";

const push = vi.fn();
const refresh = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push, refresh }) }));

const actions = vi.hoisted(() => ({ signIn: vi.fn(), signUp: vi.fn() }));
vi.mock("../hooks/use-auth-actions", () => ({
  useAuthActions: () => actions,
}));

vi.stubGlobal("ResizeObserver", function ResizeObserver() {
  return { observe() {}, unobserve() {}, disconnect() {} };
});

const apiError = (status: number, message: string) =>
  new ApiError({ status, message, code: `http_${status}` });

const type = (selector: string, value: string) =>
  fireEvent.change(document.querySelector(selector)!, { target: { value } });

beforeEach(() => {
  push.mockClear();
  refresh.mockClear();
  actions.signIn.mockReset();
  actions.signUp.mockReset();
  window.history.replaceState(null, "", "/sign-in/email");
});

describe("SignUpEmailForm", () => {
  async function submit() {
    render(<SignUpEmailForm />);
    type("#email", "ann@b.com");
    type("#password", "secret12");
    type("#confirmPassword", "secret12");
    type("#firstName", "Ann");
    type("#lastName", "Lee");
    fireEvent.click(screen.getByRole("checkbox"));
    const next = screen.getByRole("button", { name: "Next" });
    await waitFor(() => expect(next).toBeEnabled());
    fireEvent.click(next);
  }

  it("signs up with both passwords and the names, then verifies", async () => {
    actions.signUp.mockResolvedValue({ id: "u-1", email: "ann@b.com" });
    await submit();
    await waitFor(() => expect(push).toHaveBeenCalledWith("/sign-up/verify"));
    expect(refresh).toHaveBeenCalled();
    expect(actions.signUp).toHaveBeenCalledWith({
      email: "ann@b.com",
      password: "secret12",
      passwordConfirmation: "secret12",
      name: "Ann",
      surname: "Lee",
    });
  });

  it("links the terms and the privacy policy", () => {
    render(<SignUpEmailForm />);
    expect(screen.getByRole("link", { name: "Terms of Use" })).toHaveAttribute(
      "href",
      "/terms",
    );
    expect(
      screen.getByRole("link", { name: "Privacy Policy" }),
    ).toHaveAttribute("href", "/privacy");
  });

  it("shows an email in use under Email", async () => {
    actions.signUp.mockRejectedValue(
      apiError(409, "An account with this email already exists"),
    );
    await submit();
    expect(
      await screen.findByText("An account with this email already exists"),
    ).toHaveClass("text-caption-12");
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });

  it("shows other failures as the form error", async () => {
    actions.signUp.mockRejectedValue(
      apiError(
        502,
        "The service is not available right now. Please try again.",
      ),
    );
    await submit();
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "The service is not available right now.",
    );
  });
});

describe("SignInForm", () => {
  function submit(password = "secret12") {
    render(<SignInForm />);
    type("#email", "ann@b.com");
    type("#password", password);
    fireEvent.click(screen.getByRole("button", { name: "Log In" }));
  }

  it("goes to ?next= after signing in", async () => {
    window.history.replaceState(null, "", "/sign-in/email?next=%2Faccount");
    actions.signIn.mockResolvedValue({ id: "u-1", email: "ann@b.com" });
    submit();
    await waitFor(() => expect(push).toHaveBeenCalledWith("/account"));
  });

  it("ignores a ?next= that leaves the site", async () => {
    window.history.replaceState(null, "", "/sign-in/email?next=%2F%2Fevil.com");
    actions.signIn.mockResolvedValue({ id: "u-1", email: "ann@b.com" });
    submit();
    await waitFor(() => expect(push).toHaveBeenCalledWith("/home"));
  });

  it("goes to Home without ?next=", async () => {
    actions.signIn.mockResolvedValue({ id: "u-1", email: "ann@b.com" });
    submit();
    await waitFor(() => expect(push).toHaveBeenCalledWith("/home"));
  });

  it("fills in the email it is given", () => {
    render(<SignInForm defaultEmail="ann@b.com" />);
    expect(screen.getByLabelText("Email")).toHaveValue("ann@b.com");
  });

  describe("Remember me", () => {
    function desktop(matches: boolean) {
      window.matchMedia = ((media: string) => ({
        matches,
        media,
      })) as unknown as typeof window.matchMedia;
    }
    afterEach(() => {
      Reflect.deleteProperty(window, "matchMedia");
    });

    it("starts unticked and sends the choice on desktop", async () => {
      desktop(true);
      actions.signIn.mockResolvedValue({ id: "u-1", email: "ann@b.com" });
      render(<SignInForm />);
      const box = screen.getByRole("checkbox", { name: "Remember me" });
      expect(box).not.toBeChecked();
      type("#email", "ann@b.com");
      type("#password", "secret12");
      fireEvent.click(screen.getByRole("button", { name: "Log In" }));
      await waitFor(() =>
        expect(actions.signIn).toHaveBeenLastCalledWith(
          expect.objectContaining({ remember: false }),
        ),
      );

      fireEvent.click(box);
      expect(box).toBeChecked();
      fireEvent.click(screen.getByRole("button", { name: "Log In" }));
      await waitFor(() =>
        expect(actions.signIn).toHaveBeenLastCalledWith(
          expect.objectContaining({ remember: true }),
        ),
      );
    });

    it("keeps a phone signed in: its layout has no box", async () => {
      desktop(false);
      actions.signIn.mockResolvedValue({ id: "u-1", email: "ann@b.com" });
      submit();
      await waitFor(() =>
        expect(actions.signIn).toHaveBeenCalledWith(
          expect.objectContaining({ remember: true }),
        ),
      );
    });
  });

  it("shows the drawn wrong-password state for refused credentials", async () => {
    actions.signIn.mockRejectedValue(
      apiError(401, "Invalid Credentials. Please try again."),
    );
    submit("wrongpass1");
    expect(
      await screen.findByText(
        "Incorrect password. Try again or reset your password.",
      ),
    ).toBeInTheDocument();
  });

  it("shows any other refusal with the API's own message", async () => {
    actions.signIn.mockRejectedValue(
      apiError(400, "Please verify your details and try again."),
    );
    submit();
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Please verify your details and try again.",
    );
    expect(
      screen.queryByText(
        "Incorrect password. Try again or reset your password.",
      ),
    ).not.toBeInTheDocument();
  });

  it("says the service is unavailable when the request never arrives", async () => {
    actions.signIn.mockRejectedValue(new TypeError("Failed to fetch"));
    submit();
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "The service is not available right now. Please try again.",
    );
  });

  it("shows the API's message for a disabled account", async () => {
    const disabled =
      "Account disabled. Email hello@openpharmacy.com to enable your account.";
    actions.signIn.mockRejectedValue(apiError(403, disabled));
    submit();
    expect(await screen.findByText(disabled)).toHaveClass("text-caption-12");
    expect(screen.getAllByRole("alert")).toEqual([screen.getByText(disabled)]);
  });
});
