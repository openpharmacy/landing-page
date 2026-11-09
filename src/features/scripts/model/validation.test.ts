import { describe, expect, it } from "vitest";

import {
  activationCodeSchema,
  aslSetupSchema,
  dobForAsl,
  isValidDob,
  scriptTokenSchema,
} from "./validation";

const token = (value: string) => scriptTokenSchema.safeParse(value);
const message = (result: { error?: { issues: { message: string }[] } }) =>
  result.error?.issues.map((i) => i.message);

describe("eScript tokens", () => {
  it("accepts the API's tokens, trimmed and upper-cased", () => {
    expect(token("21KR32J3Y51XKM1XK7").data).toBe("21KR32J3Y51XKM1XK7");
    expect(token("  1xpr357kwqxmpn88r8 ").data).toBe("1XPR357KWQXMPN88R8");
    expect(token("31KR320BPVFK6NXTX2-1").data).toBe("31KR320BPVFK6NXTX2-1");
    expect(token("2".padEnd(21, "A")).success).toBe(true);
    expect(token("2".padEnd(22, "A")).success).toBe(false);
    expect(token("2".padEnd(17, "A")).success).toBe(false);
  });

  it("refuses what the API refuses, with one message", () => {
    expect(message(token(""))).toEqual(["Enter your eScript token"]);
    expect(message(token("ABC"))).toEqual([
      "Enter a valid token: 18 to 21 letters and numbers, starting with 1, 2 or 3",
    ]);
    expect(token("41KR32J3Y51XKM1XK7").success).toBe(false);
    expect(token("21KR32J3Y51XKM1X_7").success).toBe(false);
    expect(message(token("31KR320BPVFK6NXTX2"))).toEqual([
      "A token that starts with 3 includes a hyphen",
    ]);
  });
});

describe("date of birth", () => {
  const now = new Date(2026, 10, 6);

  it("accepts real past dates typed as DD/MM/YYYY", () => {
    expect(isValidDob("28/02/1991", now)).toBe(true);
    expect(isValidDob("29/02/2024", now)).toBe(true);
    expect(isValidDob("29/02/2023", now)).toBe(false);
    expect(isValidDob("31/04/1991", now)).toBe(false);
    expect(isValidDob("01/01/2027", now)).toBe(false);
    expect(isValidDob("1/1/1991", now)).toBe(false);
  });

  it("goes to the ASL as d/m/yyyy without leading zeros", () => {
    expect(dobForAsl("28/02/1991")).toBe("28/2/1991");
    expect(dobForAsl("01/10/1980")).toBe("1/10/1980");
    expect(dobForAsl("05/05/2001")).toBe("5/5/2001");
  });
});

describe("activation code", () => {
  it("is 8 characters with the hyphen", () => {
    expect(activationCodeSchema.safeParse(" AB1-CD2E ").data).toBe("AB1-CD2E");
    expect(activationCodeSchema.safeParse("AB1CD2EF").success).toBe(false);
    expect(activationCodeSchema.safeParse("AB1-CD2").success).toBe(false);
    expect(activationCodeSchema.safeParse("ASL-1234-5678").success).toBe(false);
    expect(message(activationCodeSchema.safeParse(""))).toEqual([
      "Activation code is required",
    ]);
  });

  it("is part of the setup form with the patient's name and birth date", () => {
    expect(
      aslSetupSchema.safeParse({
        firstName: " Test ",
        lastName: "Patient",
        dob: "28/02/1991",
        activationCode: "AB1-CD2E",
      }).data,
    ).toEqual({
      firstName: "Test",
      lastName: "Patient",
      dob: "28/02/1991",
      activationCode: "AB1-CD2E",
    });
  });
});
