import { describe, expect, it } from "vitest";

import { signInSchema, signUpEmailSchema } from "./schema";

describe("signInSchema", () => {
  it("trims a pasted email", () => {
    const { email } = signInSchema.parse({
      email: " ann@b.com  ",
      password: "secret12",
    });
    expect(email).toBe("ann@b.com");
  });

  it("still refuses an invalid email", () => {
    const result = signInSchema.safeParse({ email: " ann ", password: "x" });
    expect(result.error?.issues[0]?.message).toBe("Enter a valid email");
  });
});

describe("signUpEmailSchema", () => {
  const input = {
    email: " ann@b.com  ",
    password: "secret12",
    confirmPassword: "secret12",
    firstName: "Ann",
    lastName: "Lee",
    acceptTerms: true,
  };

  it("trims a pasted email", () => {
    expect(signUpEmailSchema.parse(input).email).toBe("ann@b.com");
  });

  it("still refuses an invalid email", () => {
    const result = signUpEmailSchema.safeParse({ ...input, email: "ann@" });
    expect(result.error?.issues[0]?.message).toBe("Enter a valid email");
  });
});
