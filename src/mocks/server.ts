import { setupServer } from "msw/node";

import { handlers } from "./handlers";

/** Used by RSC fetches in dev and by the Vitest test suite. */
export const server = setupServer(...handlers);
