import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { OtpInput } from "./otp-input";

const box = (n: number) =>
  screen.getByLabelText(`Digit ${n}`) as HTMLInputElement;
const values = () => [1, 2, 3, 4].map((n) => box(n).value).join("");

describe("OtpInput", () => {
  it("fills every box from a pasted code", () => {
    const onChange = vi.fn();
    render(<OtpInput onChange={onChange} />);
    fireEvent.paste(box(1), { clipboardData: { getData: () => "8271" } });
    expect(values()).toBe("8271");
    expect(onChange).toHaveBeenLastCalledWith("8271");
    expect(document.activeElement).toBe(box(4));
  });

  it("keeps only the digits of a pasted text", () => {
    const onChange = vi.fn();
    render(<OtpInput onChange={onChange} />);
    fireEvent.paste(box(1), {
      clipboardData: { getData: () => "Code: 12 34" },
    });
    expect(values()).toBe("1234");
  });

  it("fills from the box the code is pasted into", () => {
    const onChange = vi.fn();
    render(<OtpInput onChange={onChange} />);
    fireEvent.paste(box(3), { clipboardData: { getData: () => "5678" } });
    expect(values()).toBe("56");
    expect(onChange).toHaveBeenLastCalledWith("56");
  });

  it("spreads a code the browser autofills into one box", () => {
    const onChange = vi.fn();
    render(<OtpInput onChange={onChange} />);
    fireEvent.change(box(1), { target: { value: "4821" } });
    expect(values()).toBe("4821");
    expect(box(1)).toHaveAttribute("autocomplete", "one-time-code");
  });

  it("types one digit at a time and moves on", () => {
    const onChange = vi.fn();
    render(<OtpInput onChange={onChange} />);
    fireEvent.change(box(1), { target: { value: "7" } });
    expect(values()).toBe("7");
    expect(document.activeElement).toBe(box(2));
    fireEvent.change(box(1), { target: { value: "79" } });
    expect(box(1).value).toBe("9");
  });
});
