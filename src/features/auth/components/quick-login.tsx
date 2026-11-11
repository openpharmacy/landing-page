import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isMockingEnabled } from "@/config/env";

import { LAST_USER_SIGN_IN, withNext } from "../model/next-path";

export function QuickLogin({
  name,
  email,
  next,
}: {
  name: string;
  email: string;
  next: string | null;
}) {
  return (
    <div className="flex flex-col gap-20 max-lg:px-2 max-lg:pt-[54px]">
      <div className="flex flex-col gap-12 text-center">
        <div className="flex flex-col items-center gap-[13px]">
          <Image
            src="/images/auth/logo-quick-login.webp"
            alt=""
            width={70}
            height={65}
            unoptimized
          />
          <h1 className="text-h4-24 text-secondary-500 lg:text-display-32">
            Log in to OpenPharmacy
          </h1>
        </div>
        <div className="flex flex-col items-center gap-[11px]">
          <div>
            <p className="text-subtitle-18-bold text-secondary-900">{name}</p>
            <p className="text-body-16 text-secondary-900">{email}</p>
          </div>
          <Link
            href={withNext("/sign-in", next)}
            className="text-subtitle-18-bold text-info-500 hover:underline"
          >
            Change
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <Button asChild size="lg" className="w-full">
          <Link href={withNext(device("/sign-in/biometric"), next)}>
            Log in with Fingerprint
          </Link>
        </Button>
        <Button asChild size="lg" variant="secondary" className="w-full">
          <Link href={withNext(device("/sign-in/pin"), next)}>
            Log in with PIN
          </Link>
        </Button>
      </div>
    </div>
  );
}

const device = (path: string) => (isMockingEnabled ? path : LAST_USER_SIGN_IN);
