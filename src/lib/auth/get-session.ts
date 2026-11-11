import type { SessionUser } from "./mock-session";
import { getSession } from "./session";

export async function getServerSession(): Promise<SessionUser | null> {
  const session = await getSession();
  if (!session) return null;
  const { name, surname, email } = session.profile;
  return { firstName: name, lastName: surname, email };
}
