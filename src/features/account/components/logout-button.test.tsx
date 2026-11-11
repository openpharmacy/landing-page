import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { LogoutButton } from "./logout-button";

const push = vi.fn();
const refresh = vi.fn();
const signOut = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push, refresh }) }));
vi.mock("@/features/auth/hooks/use-auth-actions", () => ({
  useAuthActions: () => ({ signOut }),
}));

beforeEach(() => {
  push.mockClear();
  refresh.mockClear();
  signOut.mockReset();
});

const button = () => screen.getByRole("button", { name: /Log Out/ });

describe("LogoutButton", () => {
  it("is busy until the site answers, then goes to the landing page", async () => {
    let answer: (result: string) => void = () => {};
    signOut.mockReturnValue(
      new Promise<string>((resolve) => {
        answer = resolve;
      }),
    );
    const user = userEvent.setup();
    render(<LogoutButton />);
    await user.click(button());
    expect(button()).toBeDisabled();
    expect(button()).toHaveAttribute("aria-busy", "true");
    expect(button()).toHaveTextContent("Signing out…");

    answer("done");
    await vi.waitFor(() => expect(push).toHaveBeenCalledWith("/"));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("says so, and stays, when the site cannot be reached", async () => {
    signOut.mockResolvedValue("unreachable");
    const user = userEvent.setup();
    render(<LogoutButton />);
    await user.click(button());

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Could not reach OpenPharmacy, so you are still signed in.",
    );
    expect(button()).toBeEnabled();
    expect(push).not.toHaveBeenCalled();
  });

  it("clears the session through the expired route when sign-out fails", async () => {
    const assign = vi.fn();
    vi.stubGlobal("location", { ...window.location, assign });
    signOut.mockResolvedValue("failed");
    const user = userEvent.setup();
    render(<LogoutButton />);
    await user.click(button());

    await vi.waitFor(() =>
      expect(assign).toHaveBeenCalledWith("/api/auth/expired?next=/"),
    );
    expect(push).not.toHaveBeenCalled();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    vi.unstubAllGlobals();
  });
});
