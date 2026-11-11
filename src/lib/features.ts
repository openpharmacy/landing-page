import { cookies } from "next/headers";

export const HIDDEN_SCREENS_COOKIE = "op_hidden_screens";

export async function showHiddenScreens(): Promise<boolean> {
  const preview = (await cookies()).get(HIDDEN_SCREENS_COOKIE)?.value === "1";
  return preview || process.env.HIDDEN_SCREENS === "enabled";
}
