import { z } from "zod";

export const scriptIdSchema = z
  .string()
  .regex(/^[0-9a-f]{16}$/, "Unknown script");

export function normaliseToken(value: string): string {
  return value.trim().toUpperCase();
}

const TOKEN_PATTERN = /^[123][A-Z0-9-]{17,20}$/;

export const scriptTokenSchema = z
  .string()
  .transform(normaliseToken)
  .refine((token) => token.length > 0, "Enter your eScript token")
  .refine(
    (token) => token.length === 0 || TOKEN_PATTERN.test(token),
    "Enter a valid token: 18 to 21 letters and numbers, starting with 1, 2 or 3",
  )
  .refine(
    (token) =>
      !TOKEN_PATTERN.test(token) || token[0] !== "3" || token.includes("-"),
    "A token that starts with 3 includes a hyphen",
  );

export function isValidDob(value: string, now = new Date()): boolean {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return false;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  if (month < 1 || month > 12) return false;
  if (year < 1900 || year > now.getFullYear()) return false;
  const date = new Date(year, month - 1, day);
  return (
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year &&
    date <= now
  );
}

export function dobForAsl(value: string): string {
  const [day, month, year] = value.split("/");
  return `${Number(day)}/${Number(month)}/${year}`;
}

export const activationCodeSchema = z
  .string()
  .trim()
  .min(1, "Activation code is required")
  .refine(
    (code) => code.length === 0 || (code.length === 8 && code.includes("-")),
    "Enter the 8-character activation code, including the hyphen",
  );

export const aslSetupSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine((value) => isValidDob(value), "Enter a valid date (DD/MM/YYYY)"),
  activationCode: activationCodeSchema,
});

export type AslSetup = z.infer<typeof aslSetupSchema>;

export const NOTES_MAX = 500;
