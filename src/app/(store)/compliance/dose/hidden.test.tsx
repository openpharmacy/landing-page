import { describe, expect, it, vi } from "vitest";

import DoseReminderPage from "./page";
import DoseTakenPage from "./taken/page";
import EditSideEffectPage from "../side-effects/[id]/edit/page";
import RecordSideEffectsPage from "../side-effects/new/page";

const flags = vi.hoisted(() => ({ hidden: false, signedIn: false }));

vi.mock("@/lib/features", () => ({
  showHiddenScreens: async () => flags.hidden,
}));
vi.mock("@/lib/auth/get-session", () => ({
  getServerSession: async () =>
    flags.signedIn ? { firstName: "John", lastName: "Smith" } : null,
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

const query = { schedule: "panadol", date: "2025-10-12", time: "14:00" };
const pages = [
  () => DoseReminderPage({ searchParams: Promise.resolve(query) }),
  () => DoseTakenPage({ searchParams: Promise.resolve(query) }),
  () => RecordSideEffectsPage({ searchParams: Promise.resolve(query) }),
  () => EditSideEffectPage({ params: Promise.resolve({ id: "se-1" }) }),
];

describe("dose logging routes", () => {
  it("answer 404 while the hidden screens are off", async () => {
    flags.hidden = false;
    flags.signedIn = true;
    for (const page of pages) await expect(page()).rejects.toThrow("NOT_FOUND");
  });

  it("send guests to sign in, then back to the same dose", async () => {
    flags.hidden = true;
    flags.signedIn = false;
    await expect(pages[0]()).rejects.toThrow(
      "REDIRECT /sign-in?next=%2Fcompliance%2Fdose%3Fschedule%3Dpanadol%26date%3D2025-10-12%26time%3D14%253A00",
    );
    await expect(pages[3]()).rejects.toThrow(
      "REDIRECT /sign-in?next=%2Fcompliance%2Fside-effects%2Fse-1%2Fedit",
    );
  });
});
