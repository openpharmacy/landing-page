export const ASL_CONNECTED_COOKIE = "op_asl_connected";
export const SCRIPTS_ADDED_COOKIE = "op_scripts_added";

export type SessionUser = {
  firstName: string;
  lastName: string;
  email?: string;
};

export function initials(user: SessionUser): string {
  return `${user.firstName.at(0) ?? ""}${user.lastName.at(0) ?? ""}`.toUpperCase();
}

export function clearLocalSession() {
  if (typeof document === "undefined") return;
  for (const name of [ASL_CONNECTED_COOKIE, SCRIPTS_ADDED_COOKIE]) {
    document.cookie = `${name}=; path=/; max-age=0`;
  }
}
