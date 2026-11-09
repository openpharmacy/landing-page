import { render, waitFor } from "@testing-library/react";
import { StrictMode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const router = vi.hoisted(() => ({ refresh: vi.fn() }));
const { refresh } = router;
vi.mock("next/navigation", () => ({ useRouter: () => router }));

const fetchMock = vi.fn();
const reply = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

async function load() {
  vi.resetModules();
  return (await import("./scripts-sync")).ScriptsSync;
}
const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

beforeEach(() => {
  refresh.mockClear();
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => vi.unstubAllGlobals());

describe("ScriptsSync", () => {
  it("asks for a sync once and renders the page again when it changed", async () => {
    fetchMock.mockResolvedValueOnce(reply(200, { updated: true }));
    const ScriptsSync = await load();
    const { container } = render(
      <StrictMode>
        <ScriptsSync />
      </StrictMode>,
    );
    expect(container).toBeEmptyDOMElement();
    await waitFor(() => expect(refresh).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("/api/scripts/sync", {
      method: "POST",
    });
  });

  it("leaves the page alone when nothing changed", async () => {
    fetchMock.mockResolvedValueOnce(reply(200, { updated: false }));
    const ScriptsSync = await load();
    render(<ScriptsSync />);
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await settle();
    expect(refresh).not.toHaveBeenCalled();
  });

  it("shares a running sync with a page mounted meanwhile", async () => {
    let answer: (res: Response) => void = () => {};
    fetchMock.mockReturnValueOnce(
      new Promise((resolve) => {
        answer = resolve;
      }),
    );
    const ScriptsSync = await load();
    const home = render(<ScriptsSync />);
    home.unmount();
    render(<ScriptsSync />);
    answer(reply(200, { updated: true }));
    await waitFor(() => expect(refresh).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("renders the page shown again when the change came after its page was left", async () => {
    let answer: (res: Response) => void = () => {};
    fetchMock
      .mockReturnValueOnce(
        new Promise((resolve) => {
          answer = resolve;
        }),
      )
      .mockResolvedValue(reply(200, { updated: false }));
    const ScriptsSync = await load();
    render(<ScriptsSync />).unmount();
    answer(reply(200, { updated: true }));
    await waitFor(() => expect(refresh).toHaveBeenCalledTimes(1));

    render(<ScriptsSync />);
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    await settle();
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it("asks the server again on a later visit (the server throttles)", async () => {
    fetchMock.mockResolvedValue(reply(200, { updated: false }));
    const ScriptsSync = await load();
    render(<ScriptsSync />).unmount();
    await settle();
    render(<ScriptsSync />);
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
  });

  it.each([
    ["a server error", () => reply(502, { error: "x" })],
    ["a refused request", () => reply(400, { error: "x" })],
  ])("shows nothing on %s", async (_, response) => {
    fetchMock.mockResolvedValueOnce(response());
    const ScriptsSync = await load();
    const { container } = render(<ScriptsSync />);
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await settle();
    expect(refresh).not.toHaveBeenCalled();
    expect(container).toBeEmptyDOMElement();
  });

  it("shows nothing when the network fails", async () => {
    fetchMock.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    const ScriptsSync = await load();
    render(<ScriptsSync />);
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await settle();
    expect(refresh).not.toHaveBeenCalled();
  });

  it("renders the page again when the session has ended, to send the user to sign in", async () => {
    fetchMock.mockResolvedValueOnce(
      reply(401, { error: "Please sign in again.", signIn: true }),
    );
    const ScriptsSync = await load();
    render(<ScriptsSync />);
    await waitFor(() => expect(refresh).toHaveBeenCalledTimes(1));
  });
});
