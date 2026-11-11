export type SyncStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

let memory: SyncStorage | null = null;

function memoryStorage(): SyncStorage {
  const items = new Map<string, string>();
  return {
    getItem: (name) => items.get(name) ?? null,
    setItem: (name, value) => {
      items.set(name, value);
    },
    removeItem: (name) => {
      items.delete(name);
    },
  };
}

export function localStore(): SyncStorage {
  try {
    return window.localStorage;
  } catch {
    memory ??= memoryStorage();
    return memory;
  }
}
