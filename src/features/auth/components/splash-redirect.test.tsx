import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SplashRedirect } from "./splash-redirect";

const replace = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ replace }) }));

describe("SplashRedirect", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    replace.mockClear();
  });
  afterEach(() => vi.useRealTimers());

  it("moves on after a short moment", () => {
    render(<SplashRedirect href="/welcome" />);
    expect(replace).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1500));
    expect(replace).toHaveBeenCalledWith("/welcome");
  });

  it("does not move on once the splash is gone", () => {
    const { unmount } = render(<SplashRedirect href="/welcome" />);
    unmount();
    act(() => vi.advanceTimersByTime(1500));
    expect(replace).not.toHaveBeenCalled();
  });
});
