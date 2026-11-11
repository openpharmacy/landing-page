import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  DEFAULT_PREFS,
  parsePrefs,
  readPrefs,
  savePrefs,
  subscribePrefs,
  togglePref,
} from "./notification-prefs";

beforeEach(() => window.localStorage.clear());

describe("parsePrefs", () => {
  it("starts from email and push on, SMS off for every topic", () => {
    expect(parsePrefs(null)).toEqual(DEFAULT_PREFS);
    expect(DEFAULT_PREFS.reminders).toEqual({
      email: true,
      push: true,
      sms: false,
    });
  });

  it("takes saved choices and ignores anything malformed", () => {
    const prefs = parsePrefs(
      JSON.stringify({
        tips: { sms: true, push: "yes" },
        unknown: { email: false },
      }),
    );
    expect(prefs.tips).toEqual({ email: true, push: true, sms: true });
    expect(parsePrefs("{")).toEqual(DEFAULT_PREFS);
  });
});

describe("readPrefs / savePrefs", () => {
  it("restores what was saved, per key", () => {
    savePrefs("op_notifications:a", togglePref(DEFAULT_PREFS, "tips", "sms"));
    expect(readPrefs("op_notifications:a").tips.sms).toBe(true);
    expect(readPrefs("op_notifications:b").tips.sms).toBe(false);
  });

  it("returns the same object until something changes", () => {
    const first = readPrefs("op_notifications:a");
    expect(readPrefs("op_notifications:a")).toBe(first);
    savePrefs("op_notifications:a", togglePref(first, "orders", "push"));
    expect(readPrefs("op_notifications:a")).not.toBe(first);
  });

  it("keeps a choice for this visit when the browser refuses to store it", () => {
    const setItem = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("QuotaExceededError");
      });
    savePrefs("op_notifications:c", togglePref(DEFAULT_PREFS, "tips", "sms"));
    expect(readPrefs("op_notifications:c").tips.sms).toBe(true);
    setItem.mockRestore();
  });

  it("tells subscribers about a save", () => {
    const onChange = vi.fn();
    const stop = subscribePrefs(onChange);
    savePrefs("op_notifications:a", DEFAULT_PREFS);
    expect(onChange).toHaveBeenCalledOnce();
    stop();
    savePrefs("op_notifications:a", DEFAULT_PREFS);
    expect(onChange).toHaveBeenCalledOnce();
  });
});
