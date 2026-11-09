import { createJSONStorage, type StateStorage } from "zustand/middleware";

import { useAuthStore } from "@/features/auth/stores/auth-store";

import { localStore } from "./browser-storage";

type UserKey = string | null | undefined;

export function userKey(id: string): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < id.length; i++) {
    const c = id.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const hex = (n: number) => (n >>> 0).toString(16).padStart(8, "0");
  return hex(h2) + hex(h1);
}

let request: Promise<UserKey> | null = null;

let sessionKey: UserKey;
let givenKey: UserKey;

export function setSessionUserKey(key: string | null) {
  if (typeof window === "undefined" || key === givenKey) return;
  givenKey = sessionKey = key;
}

export function signedInUserKey(fresh = false): Promise<UserKey> {
  if (request && !fresh) return request;
  const current: Promise<UserKey> = fetch("/api/auth/me", {
    cache: "no-store",
  })
    .then(async (res) => {
      if (res.status === 401) return null;
      if (!res.ok) return undefined;
      const body = (await res.json()) as { user?: { id?: unknown } };
      return typeof body.user?.id === "string"
        ? userKey(body.user.id)
        : undefined;
    })
    .catch(() => undefined)
    .finally(() => {
      if (request === current) request = null;
    });
  request = current;
  return current;
}

async function knownUserKey(fresh = false): Promise<string | null> {
  for (let wait = 500; ; wait = Math.min(wait * 2, 8000)) {
    const key = await signedInUserKey(fresh);
    if (key !== undefined) return key;
    await new Promise((resolve) => setTimeout(resolve, wait));
  }
}

type ScopedStore<D> = {
  setState: (data: D) => void;
  persist: { rehydrate: () => Promise<void> | void };
};

const reloads = new Set<() => void>();

if (typeof window !== "undefined") {
  useAuthStore.subscribe((state, previous) => {
    if (
      state.status === previous.status &&
      state.user?.id === previous.user?.id
    )
      return;
    sessionKey = undefined;
    for (const reload of reloads) reload();
  });
}

export function userStorage<D>(
  name: string,
  initial: () => D,
  onLoad?: () => void,
) {
  let owner: string | null = null;
  let pending: Promise<UserKey> | null = null;
  let store: ScopedStore<D> | null = null;

  const keyed = (key: string) => `${name}:${key}`;

  function adopt(key: string) {
    const storage = localStore();
    const old = storage.getItem(name);
    if (old === null) return;
    if (storage.getItem(keyed(key)) === null) storage.setItem(keyed(key), old);
    storage.removeItem(name);
  }

  const raw: StateStorage = {
    getItem: () => {
      const wait = pending;
      if (!wait) return owner ? localStore().getItem(keyed(owner)) : null;
      return wait.then((key) => {
        if (pending !== wait) return null;
        pending = null;
        owner = key ?? null;
        if (!owner) return null;
        adopt(owner);
        return localStore().getItem(keyed(owner));
      });
    },
    setItem: (_, value) => {
      if (owner && !pending) localStore().setItem(keyed(owner), value);
    },
    removeItem: () => {
      if (owner && !pending) localStore().removeItem(keyed(owner));
    },
  };

  let loading: Promise<void> | null = null;

  function switchTo(key: Promise<UserKey>): Promise<void> {
    const api = store;
    if (!api) return Promise.resolve();
    const hadOwner = owner !== null;
    pending = key;
    const done = Promise.resolve(api.persist.rehydrate());
    if (hadOwner) api.setState(initial());
    const current: Promise<void> = done.then(() => {
      if (loading !== current) return loading ?? undefined;
      loading = null;
      onLoad?.();
    });
    loading = current;
    return current;
  }

  async function load(): Promise<void> {
    if (loading) return loading;
    if (owner === null) {
      if (sessionKey === undefined) return switchTo(knownUserKey());
      await switchTo(Promise.resolve(sessionKey));
    }
    const key = await signedInUserKey();
    if (loading) return loading;
    if (key !== undefined && key !== owner) {
      return switchTo(Promise.resolve(key));
    }
    onLoad?.();
  }

  function connect(api: ScopedStore<D>) {
    store = api;
    reloads.add(() => {
      if (owner !== null || pending) void switchTo(knownUserKey(true));
    });
    if (typeof window === "undefined") return;
    window.addEventListener("storage", (event) => {
      if (!owner || pending || event.newValue === null) return;
      if (event.key === keyed(owner)) void api.persist.rehydrate();
    });
  }

  return {
    options: { name, storage: createJSONStorage(() => raw) },
    connect,
    load,
  };
}
