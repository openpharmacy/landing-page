/**
 * Realtime (WebSocket / socket.io) seam — NOT implemented yet.
 *
 * When the backend exposes a realtime gateway (e.g. notifications, live stock),
 * implement the client here. Keep it lazy and client-only (never import from a
 * Server Component). Features should depend on this module rather than a socket
 * library directly, so the transport can be swapped without touching them.
 */
export function createRealtimeClient(): never {
  throw new Error(
    "Realtime client is not implemented yet (see docs/api-gaps.md).",
  );
}
