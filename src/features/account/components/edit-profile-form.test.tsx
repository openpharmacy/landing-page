import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { EditProfileForm } from "./edit-profile-form";

const push = vi.fn();
const fetchMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh: vi.fn() }),
}));

beforeEach(() => {
  push.mockClear();
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => vi.unstubAllGlobals());

const answer = (status: number, body?: unknown) =>
  Promise.resolve(
    new Response(body === undefined ? null : JSON.stringify(body), { status }),
  );

const USER = { firstName: "Ann", lastName: "Lee", email: "a@b.com" };

async function rename(
  user: ReturnType<typeof userEvent.setup>,
  first: string,
  last: string,
) {
  await user.clear(screen.getByLabelText("First Name"));
  if (first) await user.type(screen.getByLabelText("First Name"), first);
  await user.clear(screen.getByLabelText("Last Name"));
  if (last) await user.type(screen.getByLabelText("Last Name"), last);
  await user.click(screen.getByRole("button", { name: "Save Changes" }));
}

describe("EditProfileForm", () => {
  it("prefills the names and the email", () => {
    render(<EditProfileForm user={USER} />);
    expect(screen.getByLabelText("First Name")).toHaveValue("Ann");
    expect(screen.getByLabelText("Last Name")).toHaveValue("Lee");
    expect(screen.getByLabelText("Email")).toHaveValue("a@b.com");
    expect(screen.getByLabelText("Email")).not.toHaveAttribute("readonly");
  });

  it("saves the trimmed names only, then returns to the account", async () => {
    fetchMock.mockReturnValue(answer(204));
    const user = userEvent.setup();
    render(<EditProfileForm user={USER} />);
    await rename(user, " Eve ", "Stone");

    const [path, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(path).toBe("/api/account/profile");
    expect(JSON.parse(String(init.body))).toEqual({
      name: "Eve",
      surname: "Stone",
    });
    await vi.waitFor(() => expect(push).toHaveBeenCalledWith("/account"));
  });

  it("draws phone and date of birth disabled until they can be saved", () => {
    render(<EditProfileForm user={USER} />);
    for (const label of ["Phone Number", "Date of birth"]) {
      const field = screen.getByLabelText(label);
      expect(field).toBeDisabled();
      expect(field).toHaveAttribute("placeholder", "Coming soon");
    }
  });

  it("asks for both names before sending", async () => {
    const user = userEvent.setup();
    render(<EditProfileForm user={USER} />);
    await rename(user, "", "");

    expect(screen.getByText("First name is required")).toBeVisible();
    expect(screen.getByText("Last name is required")).toBeVisible();
    expect(screen.getByLabelText("First Name")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows the API's message and stays on the page when saving fails", async () => {
    fetchMock.mockReturnValue(
      answer(422, { error: "String should have at most 255 characters" }),
    );
    const user = userEvent.setup();
    render(<EditProfileForm user={USER} />);
    await rename(user, "Eve", "Stone");

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "String should have at most 255 characters",
    );
    expect(push).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Save Changes" })).toBeEnabled();
  });

  it("sends the user to sign in when the session has ended", async () => {
    fetchMock.mockReturnValue(
      answer(401, { error: "Please sign in again.", signIn: true }),
    );
    const user = userEvent.setup();
    render(<EditProfileForm user={USER} />);
    await rename(user, "Eve", "Stone");

    await vi.waitFor(() =>
      expect(push).toHaveBeenCalledWith("/sign-in?next=/account/profile"),
    );
  });

  it("shows a 401 that does not end the session in place", async () => {
    fetchMock.mockReturnValue(
      answer(401, { error: "Could not validate credentials" }),
    );
    const user = userEvent.setup();
    render(<EditProfileForm user={USER} />);
    await rename(user, "Eve", "Stone");

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Could not validate credentials",
    );
    expect(push).not.toHaveBeenCalled();
  });
});

describe("EditProfileForm: a new email", () => {
  const VERIFY = "/account/verify-email?next=%2Faccount%2Fprofile&sent=1";

  async function changeEmailTo(
    user: ReturnType<typeof userEvent.setup>,
    email: string,
  ) {
    await user.clear(screen.getByLabelText("Email"));
    await user.type(screen.getByLabelText("Email"), email);
    await user.click(screen.getByRole("button", { name: "Save Changes" }));
  }

  async function confirmPassword(
    user: ReturnType<typeof userEvent.setup>,
    password = "secret12",
  ) {
    await user.type(screen.getByLabelText("Password"), password);
    await user.click(screen.getByRole("button", { name: "Change Email" }));
  }

  const calls = () =>
    fetchMock.mock.calls.map(([path, init]) => [
      path,
      JSON.parse(String((init as RequestInit).body)),
    ]);

  it("asks for the password first and sends nothing yet", async () => {
    const user = userEvent.setup();
    render(<EditProfileForm user={USER} />);
    await changeEmailTo(user, " new@b.com ");

    const dialog = screen.getByRole("dialog", {
      name: "Confirm your password",
    });
    expect(dialog).toHaveTextContent(
      "Enter your password to change your email to new@b.com.",
    );
    expect(screen.getByLabelText("Password")).toHaveFocus();
    expect(screen.getByRole("button", { name: "Change Email" })).toBeDisabled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("closes on Cancel without saving anything", async () => {
    const user = userEvent.setup();
    render(<EditProfileForm user={USER} />);
    await changeEmailTo(user, "new@b.com");
    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("changes the email, then verifies the new address", async () => {
    fetchMock.mockReturnValue(answer(200, { user: {} }));
    const user = userEvent.setup();
    render(<EditProfileForm user={USER} />);
    await changeEmailTo(user, "new@b.com");
    await confirmPassword(user);

    await vi.waitFor(() => expect(push).toHaveBeenCalledWith(VERIFY));
    expect(calls()).toEqual([
      ["/api/account/email", { email: "new@b.com", password: "secret12" }],
    ]);
  });

  it("saves a changed name before the email", async () => {
    fetchMock.mockReturnValue(answer(200, { user: {} }));
    const user = userEvent.setup();
    render(<EditProfileForm user={USER} />);
    await user.clear(screen.getByLabelText("First Name"));
    await user.type(screen.getByLabelText("First Name"), "Eve");
    await changeEmailTo(user, "new@b.com");
    await confirmPassword(user);

    await vi.waitFor(() => expect(push).toHaveBeenCalledWith(VERIFY));
    expect(calls()).toEqual([
      ["/api/account/profile", { name: "Eve", surname: "Lee" }],
      ["/api/account/email", { email: "new@b.com", password: "secret12" }],
    ]);
  });

  it("shows a wrong password under the field and saves the name only once", async () => {
    fetchMock
      .mockReturnValueOnce(answer(200, { user: {} }))
      .mockReturnValueOnce(
        answer(400, { error: "Invalid Credentials. Please try again." }),
      )
      .mockReturnValueOnce(answer(200, { user: {} }));
    const user = userEvent.setup();
    render(<EditProfileForm user={USER} />);
    await user.clear(screen.getByLabelText("Last Name"));
    await user.type(screen.getByLabelText("Last Name"), "Stone");
    await changeEmailTo(user, "new@b.com");
    await confirmPassword(user, "wrong-pass1");

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Invalid Credentials. Please try again.",
    );
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(push).not.toHaveBeenCalled();

    await user.clear(screen.getByLabelText("Password"));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    await confirmPassword(user);
    await vi.waitFor(() => expect(push).toHaveBeenCalledWith(VERIFY));
    expect(calls().map(([path]) => path)).toEqual([
      "/api/account/profile",
      "/api/account/email",
      "/api/account/email",
    ]);
  });

  it("shows an email in use as the dialog's error", async () => {
    const taken =
      "Could not change the email. Please try again or contact hello@openpharmacy.com.";
    fetchMock.mockReturnValue(answer(400, { error: taken }));
    const user = userEvent.setup();
    render(<EditProfileForm user={USER} />);
    await changeEmailTo(user, "taken@b.com");
    await confirmPassword(user);

    expect(await screen.findByRole("alert")).toHaveTextContent(taken);
    expect(screen.getByLabelText("Password")).not.toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("checks the address before asking for the password", async () => {
    const user = userEvent.setup();
    render(<EditProfileForm user={USER} />);
    await changeEmailTo(user, "not-an-email");

    expect(screen.getByText("Enter a valid email")).toBeVisible();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("treats a change of case as the same email", async () => {
    fetchMock.mockReturnValue(answer(200, { user: {} }));
    const user = userEvent.setup();
    render(<EditProfileForm user={USER} />);
    await changeEmailTo(user, "A@B.com");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await vi.waitFor(() => expect(push).toHaveBeenCalledWith("/account"));
    expect(calls()).toEqual([
      ["/api/account/profile", { name: "Ann", surname: "Lee" }],
    ]);
  });

  it("sends the user to sign in when the session has ended", async () => {
    fetchMock.mockReturnValue(
      answer(401, { error: "Please sign in again.", signIn: true }),
    );
    const user = userEvent.setup();
    render(<EditProfileForm user={USER} />);
    await changeEmailTo(user, "new@b.com");
    await confirmPassword(user);

    await vi.waitFor(() =>
      expect(push).toHaveBeenCalledWith("/sign-in?next=/account/profile"),
    );
  });
});
