import { authHandlers } from "./auth";
import { productHandlers } from "./products";

/** Aggregate of all MSW request handlers (one module per feature). */
export const handlers = [...authHandlers, ...productHandlers];
