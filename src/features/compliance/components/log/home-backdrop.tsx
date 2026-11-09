import { Suspense } from "react";

import { HomeSkeleton } from "@/features/home/components/home-skeleton";
import { LoggedInHome } from "@/features/home/components/logged-in-home";
import { homeForPage } from "@/features/home/model/home-data";
import type { SessionUser } from "@/lib/auth/mock-session";

export function HomeBackdrop({ user }: { user: SessionUser }) {
  return (
    <>
      <div className="max-lg:hidden" inert>
        <Suspense fallback={<HomeSkeleton />}>
          <Home user={user} />
        </Suspense>
      </div>
      <div aria-hidden className="fixed inset-0 z-50 bg-white lg:hidden" />
    </>
  );
}

async function Home({ user }: { user: SessionUser }) {
  const { home, error } = await homeForPage("/home");
  return <LoggedInHome user={user} home={home} error={error} />;
}
