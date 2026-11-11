import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().nullable().optional(),
});
export type User = z.infer<typeof userSchema>;

export const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
export type SignInInput = z.infer<typeof signInSchema>;

function hasRepeatOrSequence(value: string): boolean {
  if (/(.)\1\1\1/.test(value)) return true;
  for (let i = 0; i + 3 < value.length; i += 1) {
    const steps = [1, 2, 3].map(
      (k) => value.charCodeAt(i + k) - value.charCodeAt(i + k - 1),
    );
    if (steps.every((d) => d === 1) || steps.every((d) => d === -1)) {
      return true;
    }
  }
  return false;
}

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
    email: z.string().trim().email("Enter a valid email"),
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
