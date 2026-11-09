import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/config/env", () => ({ isMockingEnabled: false }));

const home = { added: 1, expiringSoon: 0, refills: [] };

async function renderHome({ withKey }: { withKey: boolean }) {
  vi.resetModules();
  const { LoggedInHome } =
    await import("@/features/home/components/logged-in-home");
  const { HiddenScreensProvider } = await import("./hidden-screens");
  const { UserKeyProvider } = await import("./user-key");
  const { userKey } = await import("@/lib/user-storage");
  localStorage.setItem(
    `op_schedules:${userKey("ann")}`,
    JSON.stringify({ state: { schedules: [], doses: [] }, version: 1 }),
  );
  const page = (
    <LoggedInHome user={{ firstName: "Ann", lastName: "Lee" }} home={home} />
  );
  render(
    <HiddenScreensProvider value>
      {withKey ? (
        <UserKeyProvider value={userKey("ann")}>{page}</UserKeyProvider>
      ) : (
        page
      )}
    </HiddenScreensProvider>,
  );
}

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal(
    "fetch",
    vi.fn(() => new Promise<Response>(() => {})),
  );
});

describe("UserKeyProvider", () => {
  it("lets Home show the user's schedule without asking who is signed in", async () => {
    await renderHome({ withKey: true });
    expect(await screen.findByText("No schedule yet")).toBeInTheDocument();
    expect(screen.queryByRole("status", { name: "Loading" })).toBeNull();
  });

  it("leaves Home loading until the session answers when no key is given", async () => {
    await renderHome({ withKey: false });
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
    expect(screen.queryByText("Hello Ann")).toBeNull();
  });
});
