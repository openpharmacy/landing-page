import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type Notes = { notes: string[] };

async function loadModules() {
  vi.resetModules();
  const storage = await import("./user-storage");
  const { useAuthStore } = await import("@/features/auth/stores/auth-store");
  const { create } = await import("zustand");
  const { persist } = await import("zustand/middleware");

  function notesStore(name: string) {
    const scoped = storage.userStorage<Notes>(name, () => ({ notes: [] }));
    const useNotes = create<Notes & { add: (note: string) => void }>()(
      persist(
        (set) => ({
          notes: [],
          add: (note) => set((state) => ({ notes: [...state.notes, note] })),
        }),
        { ...scoped.options, skipHydration: true },
      ),
    );
    scoped.connect(useNotes);
    return { useNotes, load: scoped.load };
  }

  return { ...storage, useAuthStore, notesStore };
}

type Modules = Awaited<ReturnType<typeof loadModules>>;

const save = (m: Modules, name: string, id: string, notes: string[]) =>
  localStorage.setItem(
    `${name}:${m.userKey(id)}`,
    JSON.stringify({ state: { notes }, version: 0 }),
  );

const answer = (id: string | null) =>
  id === null
    ? Response.json({ error: "Not authenticated" }, { status: 401 })
    : Response.json({ user: { id, email: `${id}@example.com`, name: id } });

function session(id: string | null | "never") {
  const me = vi.fn(() =>
    id === "never"
      ? new Promise<Response>(() => {})
      : Promise.resolve(answer(id)),
  );
  vi.stubGlobal("fetch", me);
  return me;
}

const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

beforeEach(() => {
  localStorage.clear();
});
afterEach(() => {
  vi.unstubAllGlobals();
});

describe("the user key the server rendered the page for", () => {
  it("loads that user's data without waiting for the session", async () => {
    session("never");
    const m = await loadModules();
    const { useNotes, load } = m.notesStore("op_notes");
    save(m, "op_notes", "ann", ["Ann's"]);
    m.setSessionUserKey(m.userKey("ann"));

    void load();
    await settle();
    expect(useNotes.persist.hasHydrated()).toBe(true);
    expect(useNotes.getState().notes).toEqual(["Ann's"]);
    useNotes.getState().add("new");
    const key = `op_notes:${m.userKey("ann")}`;
    expect(JSON.parse(localStorage.getItem(key)!).state.notes).toEqual([
      "Ann's",
      "new",
    ]);
  });

  it("still checks the session, and follows another tab's sign-in", async () => {
    const me = session("ben");
    const m = await loadModules();
    const { useNotes, load } = m.notesStore("op_notes");
    save(m, "op_notes", "ann", ["Ann's"]);
    save(m, "op_notes", "ben", ["Ben's"]);
    m.setSessionUserKey(m.userKey("ann"));

    await load();
    expect(me).toHaveBeenCalledTimes(1);
    expect(useNotes.getState().notes).toEqual(["Ben's"]);
  });

  it("asks the session first when no key was given", async () => {
    const me = session("never");
    const m = await loadModules();
    const { useNotes, load } = m.notesStore("op_notes");
    save(m, "op_notes", "ann", ["Ann's"]);

    void load();
    await settle();
    expect(me).toHaveBeenCalledWith("/api/auth/me", { cache: "no-store" });
    expect(useNotes.persist.hasHydrated()).toBe(false);
  });

  it("holds and saves nothing for a page rendered signed out", async () => {
    session(null);
    const m = await loadModules();
    const { useNotes, load } = m.notesStore("op_notes");
    m.setSessionUserKey(null);

    await load();
    expect(useNotes.persist.hasHydrated()).toBe(true);
    useNotes.getState().add("draft");
    expect(Object.keys(localStorage)).toEqual([]);
  });

  it("is out of date once this tab signs in, until a new one is given", async () => {
    let reply: (res: Response) => void = () => {};
    const me = vi.fn(
      () => new Promise<Response>((resolve) => (reply = resolve)),
    );
    vi.stubGlobal("fetch", me);
    const m = await loadModules();
    const notes = m.notesStore("op_notes");
    const drafts = m.notesStore("op_drafts");
    save(m, "op_notes", "ben", ["Ben's"]);
    save(m, "op_drafts", "ben", ["Ben's draft"]);
    m.setSessionUserKey(null);

    m.useAuthStore.getState().setUser({ id: "ben", email: "ben@example.com" });
    m.setSessionUserKey(null);
    void notes.load();
    await settle();
    expect(me).toHaveBeenCalledTimes(1);
    expect(notes.useNotes.persist.hasHydrated()).toBe(false);
    reply(answer("ben"));
    await settle();
    expect(notes.useNotes.getState().notes).toEqual(["Ben's"]);

    m.setSessionUserKey(m.userKey("ben"));
    void drafts.load();
    await settle();
    expect(drafts.useNotes.getState().notes).toEqual(["Ben's draft"]);
  });
});
