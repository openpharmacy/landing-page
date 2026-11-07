import { z } from "zod";

// Mirrors backend `UserOut` (backend/app/api/auth.py).
export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().nullable().optional(),
  pharmacy_id: z.string().nullable().optional(),
});
export type User = z.infer<typeof userSchema>;

// Mirrors backend `AuthSession`.
export const authSessionSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  token_type: z.string().default("bearer"),
  user: userSchema,
});
export type AuthSession = z.infer<typeof authSessionSchema>;

// ─── Form inputs ─────────────────────────────────────────────────────────

export const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
export type SignInInput = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  name: z.string().trim().optional(),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
  acceptTerms: z.boolean().refine((v) => v, "You must accept the terms"),
});
export type SignUpInput = z.infer<typeof signUpSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// ─── Email sign-up (Figma 42:2354) — live password rules ─────────────────

/** True if `value` has 3+ identical chars in a row or a 3+ run/sequence. */
function hasRepeatOrSequence(value: string): boolean {
  if (/(.)\1\1/.test(value)) return true;
  for (let i = 0; i + 2 < value.length; i += 1) {
    const a = value.charCodeAt(i);
    const b = value.charCodeAt(i + 1);
    const c = value.charCodeAt(i + 2);
    if (b - a === 1 && c - b === 1) return true; // ascending run (abc, 123)
    if (a - b === 1 && b - c === 1) return true; // descending run (cba, 321)
  }
  return false;
}

/** The password checklist shown live under the field (Figma exact labels). */
export const passwordRules = [
  { id: "length", label: "7+ characters", test: (v: string) => v.length >= 7 },
  { id: "letter", label: "A letter", test: (v: string) => /[a-zA-Z]/.test(v) },
  { id: "number", label: "A number", test: (v: string) => /[0-9]/.test(v) },
  {
    id: "noRepeats",
    label: "No repeats/sequences",
    test: (v: string) => v.length > 0 && !hasRepeatOrSequence(v),
  },
] as const;

export const signUpEmailSchema = z
  .object({
    email: z.string().email("Enter a valid email"),
    password: z
      .string()
      .refine(
        (v) => passwordRules.every((rule) => rule.test(v)),
        "Password does not meet the requirements",
      ),
    confirmPassword: z.string().min(1, "Confirm your password"),
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    acceptTerms: z.boolean().refine((v) => v, "You must accept the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type SignUpEmailInput = z.infer<typeof signUpEmailSchema>;
