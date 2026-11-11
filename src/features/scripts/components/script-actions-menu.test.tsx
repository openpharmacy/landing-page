import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HiddenScreensProvider } from "@/providers/hidden-screens";

import type {
  MedicationScript,
  ScriptDetails,
  TokenOnlyScript,
} from "../model/script";
import { ScriptCard } from "./script-card";
import { ScriptDetail } from "./script-detail";

const push = vi.fn();
const refresh = vi.fn();
const prefetch = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh, prefetch }),
}));

const script: MedicationScript = {
  kind: "medication",
  id: "0123456789abcdef",
  token: "21KR32J3Y51XKM1XK7",
  status: "active",
  secure: false,
  addedOn: "2026-11-06",
  hidden: false,
  canHide: false,
  canDelete: true,
  patient: "Ann Lee",
  name: "Norfloxacin 400mg",
  form: "400mg tablet",
  detail: "400mg tablet • 5 repeats left",
  tags: [],
};
const fromAsl: MedicationScript = {
  ...script,
  id: "fedcba9876543210",
  token: "3R34GTPXTTQ35BBBV7-1",
  secure: true,
  canHide: true,
  canDelete: false,
};
const cancelled: TokenOnlyScript = {
  kind: "token",
  id: "00112233445566aa",
  token: "21KR32PXTYXH9N3QG8",
  status: "cancelled",
  secure: false,
  addedOn: "2026-11-06",
  hidden: false,
  canHide: false,
  canDelete: true,
  patient: "Ann Lee",
};
const details: ScriptDetails = {
  form: "Tablet",
  suppliesLeft: "6 supplies",
  quantity: "14 tablets",
  strength: "400mg",
  route: "—",
  prescriber: "Darlene Crawford",
  clinic: null,
  issueDate: "2026-03-19",
  expiryDate: "2027-03-19",
  doctorNotes: null,
  personalNotes: null,
};

type CardProps = Partial<Parameters<typeof ScriptCard>[0]> & {
  hiddenScreens?: boolean;
};
function card({ hiddenScreens = false, ...props }: CardProps = {}) {
  const handlers = {
    onSetHidden: vi.fn(),
    onSetArchived: vi.fn(),
    onDelete: vi.fn(async () => {}),
  };
  render(
    <Screens on={hiddenScreens}>
      <ScriptCard
        script={script}
        hidden={false}
        archived={false}
        {...handlers}
        {...props}
      />
    </Screens>,
  );
  return { ...handlers, ...props };
}
const Screens = ({ on, children }: { on: boolean; children: ReactNode }) => (
  <HiddenScreensProvider value={on}>{children}</HiddenScreensProvider>
);

const openMenu = () =>
  fireEvent.click(screen.getByRole("button", { name: "More options" }));
const items = () =>
  screen.getAllByRole("menuitem").map((item) => item.textContent);
const item = (name: string) => screen.getByRole("menuitem", { name });
const dialog = () => screen.getByRole("dialog");

const fetchMock = vi.fn();
const answer = (status: number, body: unknown) =>
  fetchMock.mockResolvedValueOnce(
    new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    }),
  );

beforeEach(() => {
  push.mockClear();
  refresh.mockClear();
  prefetch.mockClear();
  fetchMock.mockReset();
  localStorage.clear();
  vi.stubGlobal("fetch", fetchMock);
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: false })),
  );
});
afterEach(() => {
  vi.unstubAllGlobals();
  Reflect.deleteProperty(Element.prototype, "scrollIntoView");
  Reflect.deleteProperty(navigator, "share");
  Reflect.deleteProperty(navigator, "clipboard");
});

describe("the actions menu", () => {
  it("offers Schedule only with the hidden screens, as a link to the scheduler", () => {
    card();
    openMenu();
    expect(items()).toEqual([
      "View QR-Code",
      "Hide",
      "Archive",
      "Share",
      "Delete",
    ]);
    expect(screen.queryByRole("link", { name: "Schedule" })).toBeNull();
  });

  it("links Schedule to the scheduler with the script's id", () => {
    card({ hiddenScreens: true });
    const href = "/scheduler/add?script=0123456789abcdef";
    expect(screen.getByRole("link", { name: "Schedule" })).toHaveAttribute(
      "href",
      href,
    );
    openMenu();
    expect(items()[0]).toBe("Schedule");
    expect(item("Schedule")).toHaveAttribute("href", href);
  });

  it("turns Hide into Unhide and Archive into Unarchive", () => {
    card({ script: fromAsl, hidden: true, archived: true });
    openMenu();
    expect(items()).toEqual([
      "View QR-Code",
      "Unhide",
      "Unarchive",
      "Share",
      "Delete",
    ]);
  });

  it("says why Hide and Delete are not available", () => {
    card();
    openMenu();
    expect(item("Hide")).toBeDisabled();
    expect(item("Hide").parentElement).toHaveAttribute(
      "title",
      "Only scripts from your Active Script List can be hidden.",
    );
    expect(item("Delete")).toBeEnabled();
    cleanup();

    card({ script: fromAsl });
    openMenu();
    expect(item("Hide")).toBeEnabled();
    expect(item("Delete")).toBeDisabled();
    expect(item("Delete").parentElement?.title).toMatch(/can’t be deleted/);
  });

  it("offers a script without medication data Hide, Archive and Delete", () => {
    card({ script: cancelled, hiddenScreens: true });
    openMenu();
    expect(items()).toEqual(["Hide", "Archive", "Delete"]);
    expect(screen.queryByRole("link", { name: "Schedule" })).toBeNull();
  });

  it("archives and unarchives through the caller", () => {
    const { onSetArchived } = card();
    openMenu();
    fireEvent.click(item("Archive"));
    expect(onSetArchived).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("menu")).toBeNull();
  });
});

describe("View QR-Code", () => {
  it("opens the script's detail page from the list", () => {
    card();
    openMenu();
    fireEvent.click(item("View QR-Code"));
    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith("/scripts/detail?id=0123456789abcdef");
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("closes the phone sheet on a tap of the dimmed page, without opening the card", () => {
    card();
    openMenu();
    const dimmed = screen.getByRole("menu").previousElementSibling as Element;
    fireEvent.pointerDown(dimmed);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.click(dimmed);
    expect(screen.queryByRole("menu")).toBeNull();
    expect(push).not.toHaveBeenCalled();
  });

  it("does not open the detail page for the second click of a double click", () => {
    const { onSetArchived } = card();
    openMenu();
    fireEvent.click(item("Archive"), { detail: 1 });
    fireEvent.click(screen.getByRole("heading", { level: 3 }), { detail: 2 });
    expect(onSetArchived).toHaveBeenCalledTimes(1);
    expect(push).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("heading", { level: 3 }), { detail: 1 });
    expect(push).toHaveBeenCalledTimes(1);
  });

  it("loads the detail page ahead once the card is pointed at or focused", () => {
    card();
    expect(prefetch).not.toHaveBeenCalled();
    const target = screen
      .getByRole("heading", { level: 3 })
      .closest('[role="button"]') as Element;
    fireEvent.pointerEnter(target);
    expect(prefetch).toHaveBeenCalledWith(
      "/scripts/detail?id=0123456789abcdef",
    );
    fireEvent.focus(target);
    expect(prefetch).toHaveBeenCalledTimes(2);
    expect(push).not.toHaveBeenCalled();
  });

  it("scrolls to the QR code on the detail page", () => {
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    render(
      <ScriptDetail
        script={script}
        details={details}
        qr={{ size: 1, path: "M0 0h1v1h-1z" }}
      />,
    );
    openMenu();
    fireEvent.click(item("View QR-Code"));
    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "center",
    });
    expect(scrollIntoView.mock.contexts[0]).toBe(
      screen.getByRole("img", { name: "Digital prescription QR code" }),
    );
    expect(push).not.toHaveBeenCalled();
  });
});

describe("Hide and Unhide", () => {
  it("asks first, with Don't show this again unticked", () => {
    const { onSetHidden } = card({ script: fromAsl });
    openMenu();
    fireEvent.click(item("Hide"));
    expect(dialog()).toHaveAccessibleName(
      "Hide script from healthcare providers?",
    );
    expect(screen.getByLabelText("Don’t show this again")).not.toBeChecked();
    fireEvent.click(within(dialog()).getByRole("button", { name: "Hide" }));
    expect(onSetHidden).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("dialog")).toBeNull();

    openMenu();
    fireEvent.click(item("Hide"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("skips the question once Don't show this again was ticked", () => {
    const { onSetHidden } = card({ script: fromAsl });
    openMenu();
    fireEvent.click(item("Hide"));
    fireEvent.click(screen.getByLabelText("Don’t show this again"));
    fireEvent.click(within(dialog()).getByRole("button", { name: "Hide" }));
    openMenu();
    fireEvent.click(item("Hide"));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(onSetHidden).toHaveBeenCalledTimes(2);
  });

  it("always asks before showing a script again", () => {
    localStorage.setItem("op_hide_confirm_skip", "1");
    const { onSetHidden } = card({ script: fromAsl, hidden: true });
    openMenu();
    fireEvent.click(item("Unhide"));
    expect(dialog()).toHaveAccessibleName(
      "Show script to healthcare providers?",
    );
    expect(screen.queryByLabelText("Don’t show this again")).toBeNull();
    fireEvent.click(within(dialog()).getByRole("button", { name: "Cancel" }));
    expect(onSetHidden).not.toHaveBeenCalled();
    openMenu();
    fireEvent.click(item("Unhide"));
    fireEvent.click(within(dialog()).getByRole("button", { name: "Unhide" }));
    expect(onSetHidden).toHaveBeenCalledWith(false);
  });
});

describe("Delete", () => {
  it("asks first; Cancel deletes nothing", () => {
    const { onDelete } = card();
    openMenu();
    fireEvent.click(item("Delete"));
    expect(dialog()).toHaveAccessibleName("Delete script?");
    expect(dialog()).toHaveTextContent(
      "This removes the script from your list. This can’t be undone.",
    );
    fireEvent.click(within(dialog()).getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(onDelete).not.toHaveBeenCalled();
  });

  it("stays open and busy while deleting, then shows a failure in the dialog", async () => {
    let fail: (error: Error) => void = () => {};
    const onDelete = vi.fn(
      () =>
        new Promise<void>((_, reject) => {
          fail = reject;
        }),
    );
    card({ onDelete });
    openMenu();
    fireEvent.click(item("Delete"));
    fireEvent.click(within(dialog()).getByRole("button", { name: "Delete" }));
    const busy = within(dialog()).getByRole("button", { name: "Deleting…" });
    expect(busy).toBeDisabled();
    fireEvent.keyDown(window, { key: "Escape" });
    fireEvent.click(
      within(dialog()).getAllByRole("button", { name: "Close" })[0],
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await act(async () => fail(new Error("Script not Found")));
    expect(within(dialog()).getByRole("alert")).toHaveTextContent(
      "Script not Found",
    );
    expect(
      within(dialog()).getByRole("button", { name: "Delete" }),
    ).toBeEnabled();
  });

  it("closes once the list after the delete is in", async () => {
    const { onDelete } = card();
    openMenu();
    fireEvent.click(item("Delete"));
    fireEvent.click(within(dialog()).getByRole("button", { name: "Delete" }));
    await waitFor(() => expect(refresh).toHaveBeenCalledTimes(1));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("on the detail page, deletes and goes back to My Scripts", async () => {
    answer(200, { ok: true });
    render(
      <ScriptDetail
        script={script}
        details={details}
        qr={{ size: 1, path: "M0 0h1v1h-1z" }}
      />,
    );
    openMenu();
    fireEvent.click(item("Delete"));
    fireEvent.click(within(dialog()).getByRole("button", { name: "Delete" }));
    await waitFor(() => expect(push).toHaveBeenCalledWith("/scripts"));
    expect(fetchMock.mock.calls[0][0]).toBe("/api/scripts/delete");
    expect(JSON.parse(String(fetchMock.mock.calls[0][1].body))).toEqual({
      id: script.id,
    });
    expect(refresh).toHaveBeenCalled();
  });
});

describe("Share", () => {
  it("shares the medication name and the eScript token", async () => {
    const share = vi.fn(async () => {});
    Object.defineProperty(navigator, "share", {
      value: share,
      configurable: true,
    });
    card();
    openMenu();
    fireEvent.click(item("Share"));
    await waitFor(() => expect(share).toHaveBeenCalled());
    expect(share).toHaveBeenCalledWith({
      title: "Norfloxacin 400mg",
      text: "Norfloxacin 400mg\neScript token: 21KR32J3Y51XKM1XK7",
    });
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("copies the token where the device cannot share, and says so until the next action", async () => {
    const writeText = vi.fn(async () => {});
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    try {
      card();
      openMenu();
      fireEvent.click(item("Share"));
      await act(async () => {});
      expect(screen.getByRole("status")).toHaveTextContent(
        "eScript token copied",
      );
      act(() => vi.advanceTimersByTime(10_000));
      expect(screen.getByRole("status")).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
    expect(writeText).toHaveBeenCalledWith("21KR32J3Y51XKM1XK7");
  });

  it("says so when the token cannot be copied either", async () => {
    card();
    openMenu();
    fireEvent.click(item("Share"));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Could not copy the eScript token",
    );
  });

  it("does nothing more when the user closes the share sheet", async () => {
    const share = vi.fn(async () => {
      throw new DOMException("Share canceled", "AbortError");
    });
    const writeText = vi.fn(async () => {});
    Object.defineProperty(navigator, "share", {
      value: share,
      configurable: true,
    });
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    card();
    openMenu();
    fireEvent.click(item("Share"));
    await waitFor(() => expect(share).toHaveBeenCalled());
    expect(writeText).not.toHaveBeenCalled();
  });
});

describe("Archive on the detail page", () => {
  it("archives, says where the script went, and can bring it back", async () => {
    answer(200, { ok: true });
    render(
      <ScriptDetail
        script={script}
        details={details}
        qr={{ size: 1, path: "M0 0h1v1h-1z" }}
      />,
    );
    openMenu();
    fireEvent.click(item("Archive"));
    expect(screen.getByRole("status")).toHaveTextContent(
      "Archived. You’ll find it under Filters › Archived in My Scripts.",
    );
    await waitFor(() => expect(refresh).toHaveBeenCalled());
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(JSON.parse(String(fetchMock.mock.calls[0][1].body))).toEqual({
      id: script.id,
      archived: true,
    });
    openMenu();
    expect(item("Unarchive")).toBeInTheDocument();
  });

  it("undoes the change when the request fails", async () => {
    answer(404, { error: "Script not found" });
    render(
      <ScriptDetail
        script={script}
        archived
        details={details}
        qr={{ size: 1, path: "M0 0h1v1h-1z" }}
      />,
    );
    openMenu();
    fireEvent.click(item("Unarchive"));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Script not found",
    );
    openMenu();
    expect(item("Unarchive")).toBeInTheDocument();
  });
});

describe("statuses", () => {
  it("shows a status the web does not know as a neutral badge", () => {
    card({ script: { ...script, status: "other", statusText: "On hold" } });
    expect(screen.getByText("On hold")).toHaveClass("bg-secondary-500");
  });
});
