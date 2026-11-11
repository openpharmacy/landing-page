import { beforeEach, describe, expect, it, vi } from "vitest";

import SchedulerLayout from "./layout";

const flags = vi.hoisted(() => ({ hidden: false }));

vi.mock("@/lib/features", () => ({
  showHiddenScreens: async () => flags.hidden,
}));
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NOT_FOUND");
  },
}));

beforeEach(() => {
  flags.hidden = false;
});

describe("the scheduler layout", () => {
  it("is not found while the screens are hidden, above the pages' loading states", async () => {
    await expect(SchedulerLayout({ children: null })).rejects.toThrow(
      "NOT_FOUND",
    );
  });

  it("shows its page otherwise", async () => {
    flags.hidden = true;
    await expect(SchedulerLayout({ children: "page" })).resolves.toBe("page");
  });
});
