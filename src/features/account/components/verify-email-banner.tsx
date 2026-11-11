"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { getEmailStatus } from "@/features/auth/api/auth-api";
import { withNext } from "@/features/auth/model/next-path";

export function VerifyEmailBanner({ returnTo }: { returnTo: string }) {
  const [verified, setVerified] = useState(false);
  const asked = useRef(false);

  useEffect(() => {
    if (asked.current) return;
    asked.current = true;
    getEmailStatus().then((status) => {
      if (status) setVerified(true);
    });
  }, []);

  if (verified) return null;
  return (
    <div className="flex items-center gap-4 rounded-card-lg border border-[#ffd6a8] bg-[linear-gradient(98.8deg,#fffbeb_0%,#fff7ed_100%)] py-[7px] pr-[15px] pl-[7px] lg:bg-[linear-gradient(93.4deg,#fffbeb_0%,#fff7ed_100%)]">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white">
        <Icon src="/icons/scripts/warning.svg" size={20} />
      </span>
      <p className="min-w-0 flex-1 text-body-14 text-text">
        Your email address isn’t verified yet.
      </p>
      <Button asChild variant="secondary" size="sm" className="shrink-0">
        <Link href={withNext("/account/verify-email", returnTo)}>
          Verify now
        </Link>
      </Button>
    </div>
  );
}
