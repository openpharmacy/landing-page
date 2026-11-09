import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_API_MOCKING: z.enum(["enabled", "disabled"]).default("disabled"),
});

const parsed = schema.safeParse({
  NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING,
});

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.issues);
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
export const isMockingEnabled = env.NEXT_PUBLIC_API_MOCKING === "enabled";
