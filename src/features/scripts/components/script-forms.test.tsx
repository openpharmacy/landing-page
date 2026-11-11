import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type {
  MedicationScript,
  ScriptDetails,
  ScriptGroup,
} from "../model/script";
import type { AslSetup } from "../model/validation";
import { AddScriptModal } from "./add-script-modal";
import { AslSetupForm } from "./asl-setup-form";
import { MyScripts } from "./my-scripts";
import { ScriptDetail } from "./script-detail";

const refresh = vi.fn();
const prefetch = vi.fn();
const router = { push: vi.fn(), refresh, prefetch };
vi.mock("next/navigation", () => ({ useRouter: () => router }));

const fetchMock = vi.fn();
const answer = (status: number, body: unknown) =>
  fetchMock.mockResolvedValueOnce(
    new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    }),
  );
const sent = () =>
  fetchMock.mock.calls.map(([url, init]) => ({
    url: String(url),
    body: JSON.parse(String((init as RequestInit).body)),
  }));

beforeEach(() => {
  refresh.mockClear();
  prefetch.mockClear();
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  vi.stubGlobal("ResizeObserver", function ResizeObserver() {
    return { observe() {}, unobserve() {}, disconnect() {} };
  });
});
afterEach(() => vi.unstubAllGlobals());

describe("the token modal", () => {
  const open = () => {
    const onClose = vi.fn();
    render(<AddScriptModal initialStep="manual" onClose={onClose} />);
    const type = (value: string) =>
      fireEvent.change(screen.getByLabelText("eScript Token"), {
        target: { value },
      });
    const submit = () =>
      fireEvent.click(screen.getByRole("button", { name: "Submit Script" }));
    return { onClose, type, submit };
  };

  it("refuses a token the API would refuse without calling it", () => {
    const { type, submit } = open();
    type("31KR320BPVFK6NXTX2");
    submit();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "A token that starts with 3 includes a hyphen",
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("adds the normalised token, then closes and reloads the list", async () => {
    answer(200, { ok: true });
    const { onClose, type, submit } = open();
    type(" 21kr32j3y51xkm1xk7 ");
    submit();
    await waitFor(() => expect(onClose).toHaveBeenCalled());
    expect(sent()).toEqual([
      { url: "/api/scripts/add", body: { token: "21KR32J3Y51XKM1XK7" } },
    ]);
    expect(refresh).toHaveBeenCalled();
  });

  it("explains where the token is, over the token step", () => {
    const { onClose } = open();
    fireEvent.click(
      screen.getByRole("button", { name: "Where do I find my token?" }),
    );
    const help = screen.getByRole("dialog", {
      name: "Where do I find my token?",
    });
    expect(help).toHaveTextContent("SMS or email");
    expect(
      within(help).getByRole("link", { name: "Read the help article" }),
    ).toHaveAttribute(
      "href",
      "/help/prescriptions-scripts/where-to-find-my-escript-token",
    );
    fireEvent.keyDown(window, { key: "Escape" });
    expect(
      screen.queryByRole("dialog", { name: "Where do I find my token?" }),
    ).toBeNull();
    expect(screen.getByRole("dialog", { name: "Add a script" })).toBeVisible();
    expect(onClose).not.toHaveBeenCalled();
  });

  it("shows the API's message under the field and lets the user retry", async () => {
    answer(404, { error: "eScript Token not found" });
    const { onClose, type, submit } = open();
    type("21KR32AAAAAAAAAAAA");
    submit();
    expect(
      await screen.findByText("eScript Token not found"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit Script" })).toBeEnabled();
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe("personal notes", () => {
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
    personalNotes: "Old note",
  };
  const edit = (text: string) => {
    render(
      <ScriptDetail
        script={script}
        details={details}
        qr={{ size: 1, path: "M0 0h1v1h-1z" }}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Edit notes" }));
    fireEvent.change(screen.getByLabelText("Personal notes"), {
      target: { value: text },
    });
  };

  it("saves by the script's opaque id and shows the saved text", async () => {
    answer(200, { ok: true });
    edit("  Take with food ");
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(
      await screen.findByText("Take with food", { selector: "p" }),
    ).toBeInTheDocument();
    expect(sent()).toEqual([
      {
        url: "/api/scripts/note",
        body: { id: "0123456789abcdef", notes: "  Take with food " },
      },
    ]);
    expect(refresh).toHaveBeenCalled();
  });

  it("keeps the editor open with the API's message when saving fails", async () => {
    answer(404, { error: "Script not Found" });
    edit("New note");
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(await screen.findByText("Script not Found")).toBeInTheDocument();
    expect(screen.getByLabelText("Personal notes")).toHaveValue("New note");
  });

  it("takes the user back to the text when Edit notes is pressed while editing", () => {
    edit("Half typed");
    screen.getByRole("button", { name: "Edit notes" }).focus();
    fireEvent.click(screen.getByRole("button", { name: "Edit notes" }));
    const field = screen.getByLabelText("Personal notes");
    expect(field).toHaveValue("Half typed");
    expect(field).toHaveFocus();
  });

  it("sends nothing on Cancel", () => {
    edit("Not saved");
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByText("Old note", { selector: "p" })).toBeInTheDocument();
  });
});

describe("the ASL setup form", () => {
  const fill = () => {
    const onContinue = vi.fn<(values: AslSetup) => Promise<string | null>>(
      async () => null,
    );
    render(<AslSetupForm onContinue={onContinue} />);
    const type = (label: string, value: string) =>
      fireEvent.change(screen.getByLabelText(label), { target: { value } });
    type("First Name", "Grace");
    type("Last Name", "Walker");
    type("Date of Birth", "28021991");
    type("Activation Code", "AB12-C3D");
    return onContinue;
  };
  const submit = () =>
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

  it("starts with the permission unticked and asks for it on Continue", async () => {
    const onContinue = fill();
    const permission = screen.getByRole("checkbox", {
      name: /I give permission/,
    });
    expect(permission).not.toBeChecked();
    submit();
    expect(
      await screen.findByText(
        "Tick the box to give permission before you continue",
      ),
    ).toBeInTheDocument();
    expect(onContinue).not.toHaveBeenCalled();

    fireEvent.click(permission);
    submit();
    await waitFor(() => expect(onContinue).toHaveBeenCalled());
    expect(onContinue.mock.calls[0][0]).toMatchObject({
      dob: "28/02/1991",
      activationCode: "AB12-C3D",
      permission: true,
    });
  });

  it("links the privacy note and explains the activation code", () => {
    fill();
    expect(
      screen.getByRole("link", {
        name: "Learn more about privacy and data usage",
      }),
    ).toHaveAttribute(
      "href",
      "/help/prescriptions-scripts/prescription-privacy-and-security",
    );
    fireEvent.click(
      screen.getByRole("button", { name: "I don't have my activation code" }),
    );
    const help = screen.getByRole("dialog", {
      name: "Don’t have an activation code?",
    });
    expect(help).toHaveTextContent("8 characters, including a hyphen");
    expect(
      within(help).getByRole("link", { name: "Read the help article" }),
    ).toHaveAttribute(
      "href",
      "/help/prescriptions-scripts/setting-up-active-script-list",
    );
    fireEvent.click(within(help).getByRole("button", { name: "Got it" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

describe("My Scripts", () => {
  const med = (id: string, name: string): MedicationScript => ({
    kind: "medication",
    id,
    token: `21KR32${id.toUpperCase().padEnd(12, "X")}`,
    status: "active",
    secure: false,
    addedOn: "2026-11-06",
    hidden: false,
    canHide: false,
    canDelete: true,
    patient: "Ann Lee",
    name,
    form: "400mg tablet",
    detail: "400mg tablet • 5 repeats left",
    tags: [],
  });
  const groups: ScriptGroup[] = [
    {
      name: "Ann Lee",
      initials: "AL",
      avatarClass: "bg-primary-500",
      scripts: [
        med("aaaaaaaaaaaaaaaa", "Norfloxacin 400mg"),
        med("bbbbbbbbbbbbbbbb", "Metformin 500mg"),
      ],
    },
  ];
  const titles = () =>
    screen.queryAllByRole("heading", { level: 3 }).map((h) => h.textContent);
  const menuOf = (name: string) =>
    fireEvent.click(
      within(
        screen
          .getByRole("heading", { name })
          .closest("[role=button]") as HTMLElement,
      ).getByRole("button", { name: "More options" }),
    );
  const filterBy = (status: string) => {
    fireEvent.click(screen.getByRole("button", { name: "Filters" }));
    const sheet = screen.getByRole("dialog", { name: "Filter By" });
    fireEvent.click(within(sheet).getByRole("button", { name: status }));
    fireEvent.click(
      within(sheet).getByRole("button", { name: "Apply Filters" }),
    );
  };

  it("loads one script's page ahead, again with each list", () => {
    const view = render(<MyScripts groups={groups} synced={false} />);
    expect(prefetch).toHaveBeenCalledTimes(1);
    expect(prefetch).toHaveBeenCalledWith(
      "/scripts/detail?id=aaaaaaaaaaaaaaaa",
    );
    view.rerender(<MyScripts groups={groups} synced={false} />);
    expect(prefetch).toHaveBeenCalledTimes(1);
    view.rerender(<MyScripts groups={[{ ...groups[0] }]} synced={false} />);
    expect(prefetch).toHaveBeenCalledTimes(2);
  });

  it("moves an archived script out of the list and under Archived", async () => {
    answer(200, { ok: true });
    render(
      <MyScripts
        groups={groups}
        synced={false}
        archived={["bbbbbbbbbbbbbbbb"]}
      />,
    );
    expect(titles()).toEqual(["Norfloxacin 400mg"]);

    menuOf("Norfloxacin 400mg");
    fireEvent.click(screen.getByRole("menuitem", { name: "Archive" }));
    expect(titles()).toEqual([]);
    expect(
      screen.getByText(
        "All your scripts are archived. Pick Archived in Filters to see them.",
      ),
    ).toBeInTheDocument();
    await waitFor(() => expect(refresh).toHaveBeenCalled());
    expect(sent()).toEqual([
      {
        url: "/api/scripts/archive",
        body: { id: "aaaaaaaaaaaaaaaa", archived: true },
      },
    ]);

    filterBy("Archived");
    expect(titles()).toEqual(["Norfloxacin 400mg", "Metformin 500mg"]);
    answer(200, { ok: true });
    menuOf("Metformin 500mg");
    fireEvent.click(screen.getByRole("menuitem", { name: "Unarchive" }));
    expect(titles()).toEqual(["Norfloxacin 400mg"]);
  });

  it("puts a script back with the reason when archiving fails", async () => {
    answer(502, { error: "The service is not available right now." });
    render(<MyScripts groups={groups} synced={false} />);
    menuOf("Metformin 500mg");
    fireEvent.click(screen.getByRole("menuitem", { name: "Archive" }));
    expect(
      await screen.findByText("The service is not available right now."),
    ).toBeInTheDocument();
    expect(titles()).toEqual(["Norfloxacin 400mg", "Metformin 500mg"]);
  });

  it("drops a deleted card with the list the server sends next", async () => {
    answer(200, { ok: true });
    const view = render(<MyScripts groups={groups} synced={false} />);
    menuOf("Metformin 500mg");
    fireEvent.click(screen.getByRole("menuitem", { name: "Delete" }));
    fireEvent.click(
      within(screen.getByRole("dialog")).getByRole("button", {
        name: "Delete",
      }),
    );
    await waitFor(() => expect(refresh).toHaveBeenCalled());
    expect(sent()).toEqual([
      { url: "/api/scripts/delete", body: { id: "bbbbbbbbbbbbbbbb" } },
    ]);
    view.rerender(
      <MyScripts
        groups={[{ ...groups[0], scripts: [groups[0].scripts[0]] }]}
        synced={false}
      />,
    );
    expect(titles()).toEqual(["Norfloxacin 400mg"]);
    expect(screen.queryByRole("dialog")).toBeNull();

    view.rerender(<MyScripts groups={[{ ...groups[0] }]} synced={false} />);
    expect(titles()).toEqual(["Norfloxacin 400mg", "Metformin 500mg"]);
  });

  it("shows an archived script that was deleted and added again", async () => {
    answer(200, { ok: true });
    const view = render(<MyScripts groups={groups} synced={false} />);
    menuOf("Metformin 500mg");
    fireEvent.click(screen.getByRole("menuitem", { name: "Archive" }));
    await waitFor(() => expect(refresh).toHaveBeenCalled());
    view.rerender(
      <MyScripts
        groups={[{ ...groups[0] }]}
        archived={["bbbbbbbbbbbbbbbb"]}
        synced={false}
      />,
    );
    expect(titles()).toEqual(["Norfloxacin 400mg"]);
    view.rerender(
      <MyScripts
        groups={[{ ...groups[0], scripts: [groups[0].scripts[0]] }]}
        synced={false}
      />,
    );
    view.rerender(<MyScripts groups={[{ ...groups[0] }]} synced={false} />);
    expect(titles()).toEqual(["Norfloxacin 400mg", "Metformin 500mg"]);
  });

  it("keeps a change on screen while the server has not caught up", async () => {
    let finish: (res: Response) => void = () => {};
    fetchMock.mockReturnValueOnce(
      new Promise((resolve) => {
        finish = resolve;
      }),
    );
    const view = render(<MyScripts groups={groups} synced={false} />);
    menuOf("Metformin 500mg");
    fireEvent.click(screen.getByRole("menuitem", { name: "Archive" }));
    view.rerender(<MyScripts groups={[{ ...groups[0] }]} synced={false} />);
    expect(titles()).toEqual(["Norfloxacin 400mg"]);
    finish(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    await waitFor(() => expect(refresh).toHaveBeenCalled());
    expect(titles()).toEqual(["Norfloxacin 400mg"]);
  });

  it("says the service is unavailable when the request cannot be sent", async () => {
    fetchMock.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    render(<MyScripts groups={groups} synced={false} />);
    menuOf("Metformin 500mg");
    fireEvent.click(screen.getByRole("menuitem", { name: "Archive" }));
    expect(
      await screen.findByText(
        "The service is not available right now. Please try again.",
      ),
    ).toBeInTheDocument();
    expect(titles()).toEqual(["Norfloxacin 400mg", "Metformin 500mg"]);
  });

  it("enables Clear All once something is picked", () => {
    render(<MyScripts groups={groups} synced={false} />);
    fireEvent.click(screen.getByRole("button", { name: "Filters" }));
    const sheet = screen.getByRole("dialog", { name: "Filter By" });
    const clear = within(sheet).getByRole("button", { name: "Clear All" });
    expect(clear).toBeDisabled();
    fireEvent.click(within(sheet).getByRole("button", { name: "Active" }));
    expect(clear).toBeEnabled();
    fireEvent.click(clear);
    expect(
      within(sheet).getByRole("button", { name: "Active" }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(clear).toBeDisabled();
  });

  it("leaves Tags out of the filters while no script has tags", () => {
    render(<MyScripts groups={groups} synced={false} />);
    fireEvent.click(screen.getByRole("button", { name: "Filters" }));
    expect(screen.queryByLabelText("Tags")).toBeNull();
    cleanup();

    const tagged = [
      {
        ...groups[0],
        scripts: [{ ...groups[0].scripts[0], tags: ["diabetes"] }],
      },
    ];
    render(<MyScripts groups={tagged} synced={false} />);
    fireEvent.click(screen.getByRole("button", { name: "Filters" }));
    expect(screen.getByLabelText("Tags")).toBeInTheDocument();
  });
});
