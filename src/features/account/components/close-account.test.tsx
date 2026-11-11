import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { DeactivateAccount, DeleteAccount } from "./close-account";

const push = vi.fn();
const clearLocalSession = vi.fn();
const fetchMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh: vi.fn() }),
}));
vi.mock("@/lib/auth/mock-session", () => ({
  clearLocalSession: () => clearLocalSession(),
}));

beforeEach(() => {
  push.mockClear();
  clearLocalSession.mockClear();
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => vi.unstubAllGlobals());

const answer = (status: number, body?: unknown) =>
  Promise.resolve(
    new Response(body === undefined ? null : JSON.stringify(body), { status }),
  );

async function confirmDelete(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/To confirm deletion/), "delete");
  await user.click(screen.getByRole("button", { name: "Delete My Account" }));
  expect(
    screen.getByRole("dialog", {
      name: "Are you sure you want to delete your account?",
    }),
  ).toBeVisible();
  await user.click(screen.getByRole("button", { name: "Yes, Delete" }));
}

describe("DeleteAccount", () => {
  it("enables the button once “delete” is typed", async () => {
    const user = userEvent.setup();
    render(<DeleteAccount />);
    const button = screen.getByRole("button", { name: "Delete My Account" });
    expect(button).toBeDisabled();

    await user.type(screen.getByLabelText(/To confirm deletion/), "delet");
    expect(button).toBeDisabled();
    await user.type(screen.getByLabelText(/To confirm deletion/), "e");
    expect(button).toBeEnabled();
  });

  it("deletes the account, then returns to the landing page", async () => {
    fetchMock.mockReturnValue(answer(204));
    const user = userEvent.setup();
    render(<DeleteAccount />);
    await confirmDelete(user);

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/account/delete",
      expect.objectContaining({ method: "POST" }),
    );
    await vi.waitFor(() => expect(push).toHaveBeenCalledWith("/"));
    expect(clearLocalSession).toHaveBeenCalledOnce();
  });

  it("cannot be closed while the request runs", async () => {
    let finish: (res: Response) => void = () => {};
    fetchMock.mockReturnValue(
      new Promise<Response>((resolve) => {
        finish = resolve;
      }),
    );
    const user = userEvent.setup();
    render(<DeleteAccount />);
    await confirmDelete(user);

    const dialog = screen.getByRole("dialog");
    expect(screen.getByRole("button", { name: "Yes, Delete" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
    for (const close of screen.getAllByRole("button", { name: "Close" })) {
      expect(close).toBeDisabled();
    }
    await user.keyboard("{Escape}");
    expect(dialog).toBeInTheDocument();

    finish(new Response(null, { status: 204 }));
    await vi.waitFor(() => expect(push).toHaveBeenCalledWith("/"));
  });

  it("opens again without the last error", async () => {
    fetchMock.mockReturnValue(answer(502, { error: "Not available" }));
    const user = userEvent.setup();
    render(<DeleteAccount />);
    await confirmDelete(user);
    expect(await screen.findByRole("alert")).toHaveTextContent("Not available");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Delete My Account" }));
    expect(screen.getByRole("dialog")).toBeVisible();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("keeps the dialog open with the API's message when it fails", async () => {
    fetchMock.mockReturnValue(
      answer(502, {
        error: "The service is not available right now. Please try again.",
      }),
    );
    const user = userEvent.setup();
    render(<DeleteAccount />);
    await confirmDelete(user);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "The service is not available right now. Please try again.",
    );
    expect(screen.getByRole("button", { name: "Yes, Delete" })).toBeEnabled();
    expect(push).not.toHaveBeenCalled();
    expect(clearLocalSession).not.toHaveBeenCalled();
  });

  it("sends the user to sign in when the session has ended", async () => {
    fetchMock.mockReturnValue(
      answer(401, { error: "Please sign in again.", signIn: true }),
    );
    const user = userEvent.setup();
    render(<DeleteAccount />);
    await confirmDelete(user);

    await vi.waitFor(() =>
      expect(push).toHaveBeenCalledWith(
        "/sign-in?next=/account/settings/delete",
      ),
    );
  });
});

describe("DeactivateAccount", () => {
  it("closes the dialog on Cancel without calling the API", async () => {
    const user = userEvent.setup();
    render(<DeactivateAccount />);
    await user.click(
      screen.getByRole("button", { name: "Deactivate My Account" }),
    );
    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(clearLocalSession).not.toHaveBeenCalled();
  });

  it("deactivates the account, then returns to the landing page", async () => {
    fetchMock.mockReturnValue(answer(204));
    const user = userEvent.setup();
    render(<DeactivateAccount />);
    await user.click(
      screen.getByRole("button", { name: "Deactivate My Account" }),
    );
    await user.click(screen.getByRole("button", { name: "Yes, Deactivate" }));

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/account/deactivate",
      expect.objectContaining({ method: "POST" }),
    );
    await vi.waitFor(() => expect(push).toHaveBeenCalledWith("/"));
  });
});
