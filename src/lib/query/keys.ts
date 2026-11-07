/** Central query-key registry to avoid stringly-typed drift across features. */
export const queryKeys = {
  auth: {
    me: () => ["auth", "me"] as const,
  },
  products: {
    all: () => ["products"] as const,
    list: (filters: Record<string, unknown>) =>
      ["products", "list", filters] as const,
    detail: (id: string) => ["products", "detail", id] as const,
  },
  pharmacies: {
    all: () => ["pharmacies"] as const,
    list: (filters: Record<string, unknown>) =>
      ["pharmacies", "list", filters] as const,
    detail: (id: string) => ["pharmacies", "detail", id] as const,
  },
} as const;
