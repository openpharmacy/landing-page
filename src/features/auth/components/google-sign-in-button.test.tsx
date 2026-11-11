import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { GoogleSignInButton } from "./google-sign-in-button";

const width = (el: HTMLElement, value: number) =>
  Object.defineProperty(el, "clientWidth", { configurable: true, value });

describe("GoogleSignInButton", () => {
  it("draws Google's button at 2/3 of the column and enlarges it evenly to 60px", () => {
    const draw = vi.fn();
    const { container } = render(
      <GoogleSignInButton button={{ render: draw }} />,
    );
    const host = container.firstElementChild as HTMLElement;
    const drawn = host.firstElementChild as HTMLElement;

    expect(draw).toHaveBeenCalledWith(drawn, 320);
    expect(drawn.style.transform).toBe("scale(1.5)");
    expect(host.style.height).toBe("60px");
  });

  it("keeps a narrow phone's button inside the column", () => {
    const draw = vi.fn();
    const proto = HTMLDivElement.prototype;
    const original = Object.getOwnPropertyDescriptor(
      Element.prototype,
      "clientWidth",
    );
    width(proto, 280);
    try {
      const { container } = render(
        <GoogleSignInButton button={{ render: draw }} />,
      );
      const host = container.firstElementChild as HTMLElement;
      expect(draw).toHaveBeenCalledWith(host.firstElementChild, 200);
      expect((host.firstElementChild as HTMLElement).style.transform).toBe(
        "scale(1.4)",
      );
      expect(host.style.height).toBe("56px");
    } finally {
      delete (proto as { clientWidth?: number }).clientWidth;
      if (original)
        Object.defineProperty(Element.prototype, "clientWidth", original);
    }
  });
});
