import { beforeEach, describe, expect, it, vi } from "vitest";

import AchievementsPage from "./achievements/page";
import ComplianceLayout from "./layout";
import SideEffectDiaryPage from "./side-effects/page";
import EditVitalPage from "./vitals/[id]/edit/page";
import RecordVitalsPage from "./vitals/new/page";
import HealthVitalsPage from "./vitals/page";
import CompliancePage from "./(overview)/page";

const flags = vi.hoisted(() => ({ hidden: false, signedIn: false }));

vi.mock("@/lib/features", () => ({
  showHiddenScreens: async () => flags.hidden,
}));
vi.mock("@/lib/auth/get-session", () => ({
  getServerSession: async () =>
    flags.signedIn
      ? { firstName: "John", lastName: "Smith", email: "john@email.com" }
      : null,
}));
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NOT_FOUND");
  },
  redirect: (url: string) => {
    throw new Error(`REDIRECT ${url}`);
  },
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

const pages = [
  [
    "/compliance?range=7d&tab=overview",
    () => CompliancePage({ searchParams: Promise.resolve({}) }),
  ],
  ["/compliance/side-effects", () => SideEffectDiaryPage()],
  ["/compliance/achievements", () => AchievementsPage()],
  ["/compliance/vitals", () => HealthVitalsPage()],
  [
    "/compliance/vitals/new",
    () => RecordVitalsPage({ searchParams: Promise.resolve({}) }),
  ],
  [
    "/compliance/vitals/v1/edit",
    () => EditVitalPage({ params: Promise.resolve({ id: "v1" }) }),
  ],
  [
    "/compliance/vitals/a%2Fb/edit",
    () => EditVitalPage({ params: Promise.resolve({ id: "a/b" }) }),
  ],
] as const;

beforeEach(() => {
  flags.hidden = false;
  flags.signedIn = false;
});

describe("compliance report routes", () => {
  it.each(pages)(
    "%s is not found while the screens are hidden",
    async (_, page) => {
      flags.signedIn = true;
      await expect(page()).rejects.toThrow("NOT_FOUND");
    },
  );

  it("is not found from the layout too, above the pages' loading states", async () => {
    flags.signedIn = true;
    await expect(ComplianceLayout({ children: null })).rejects.toThrow(
      "NOT_FOUND",
    );
    flags.hidden = true;
    await expect(ComplianceLayout({ children: null })).resolves.toBeNull();
  });

  it.each(pages)("%s sends guests to sign in", async (path, page) => {
    flags.hidden = true;
    await expect(page()).rejects.toThrow(
      `REDIRECT /sign-in?next=${encodeURIComponent(path)}`,
    );
  });

  it("keeps the chosen range and tab in the sign-in return path", async () => {
    flags.hidden = true;
    await expect(
      CompliancePage({
        searchParams: Promise.resolve({ range: "30d", tab: "trends" }),
      }),
    ).rejects.toThrow(
      `REDIRECT /sign-in?next=${encodeURIComponent("/compliance?range=30d&tab=trends")}`,
    );
  });
});
