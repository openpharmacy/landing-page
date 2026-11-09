import "server-only";

import { isMockingEnabled } from "./env";

export function apiConfig() {
  const origin = process.env.OP_API_ORIGIN;
  const username = process.env.OP_APP_USERNAME;
  const password = process.env.OP_APP_PASSWORD;
  if (!origin || !username || !password) {
    throw new Error(
      "OP_API_ORIGIN, OP_APP_USERNAME and OP_APP_PASSWORD must be set when API mocking is off",
    );
  }
  return {
    origin: origin.replace(/\/$/, ""),
    username,
    password,
    conformanceId:
      process.env.OP_CONFORMANCE_ID ?? "OpenpharmacyApplication|1.0",
  };
}

export { isMockingEnabled };
