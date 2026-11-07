import { z } from "zod";

/**
 * Client-safe environment variables (NEXT_PUBLIC_*). These are inlined at build
 * time, so they must be referenced statically (not via a dynamic key).
 * Server-only values (e.g. BACKEND_ORIGIN) are read directly where needed.
 */
const schema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().min(1).default("/api/backend"),
  NEXT_PUBLIC_API_MOCKING: z.enum(["enabled", "disabled"]).default("disabled"),
});

const parsed = schema.safeParse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING,
});

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.issues);
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
export const isMockingEnabled = env.NEXT_PUBLIC_API_MOCKING === "enabled";
