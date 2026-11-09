import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { UpdateRequired } from "./update-required";

const fetchMock = vi.fn();
const answer = (status: number, body: unknown) =>
  fetchMock.mockResolvedValueOnce(
    new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    }),
  );

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("UpdateRequired", () => {
  it("covers the page when the version is no longer supported", async () => {
    answer(200, { version: "1.0.0", outdated: true });
    render(
      <>
        <a href="/scripts">Scripts</a>
        <UpdateRequired />
      </>,
    );
    const dialog = await screen.findByRole("alertdialog", {
      name: "Update required",
    });
    expect(dialog).toHaveTextContent(
      "This version of OpenPharmacy is no longer supported. Refresh to load the latest version.",
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0][0])).toBe("/api/app/version");

    const refresh = screen.getByRole("button", { name: "Refresh" });
    await waitFor(() => {
      expect(refresh).toHaveFocus();
      expect(document.querySelector("[inert]")).toContainElement(
        screen.getByText("Scripts"),
      );
      expect(document.documentElement.style.overflow).toBe("hidden");
    });
  });

  it("reloads the page from the button", async () => {
    const reload = vi.fn();
    vi.stubGlobal("location", { ...window.location, reload });
    answer(200, { version: "1.0.0", outdated: true });
    render(<UpdateRequired />);
    fireEvent.click(await screen.findByRole("button", { name: "Refresh" }));
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("shows nothing while the version is supported", async () => {
    answer(200, { version: "1.1.0", outdated: false });
    const { container } = render(<UpdateRequired />);
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.queryByRole("alertdialog")).toBeNull();
    expect(container).toBeEmptyDOMElement();
  });

  it("shows nothing when the check fails", async () => {
    fetchMock.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    render(<UpdateRequired />);
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("waits for the page to load before asking", async () => {
    vi.spyOn(document, "readyState", "get").mockReturnValue("interactive");
    answer(200, { outdated: true });
    render(<UpdateRequired />);
    expect(fetchMock).not.toHaveBeenCalled();
    window.dispatchEvent(new Event("load"));
    expect(
      await screen.findByRole("alertdialog", { name: "Update required" }),
    ).toBeInTheDocument();
  });
});
