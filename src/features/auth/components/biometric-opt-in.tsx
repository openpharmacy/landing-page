import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function BiometricOptIn({ href }: { href: string }) {
  return (
    <div className="max-lg:mr-[6px] max-lg:pt-[120px] lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center">
      <div className="flex w-full flex-col gap-7 lg:max-w-[480px] lg:gap-8">
        <div className="flex flex-col items-center gap-6 text-center lg:gap-8">
          <Icon src="/icons/auth/biometric-frame.svg" size={100} />
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
              Want quicker access next time?
            </h1>
            <p className="w-[262px] text-body-14 text-secondary-300">
              Use Face ID or fingerprint to sign in instantly, without
              re-entering your credentials.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Button asChild size="lg" className="w-full">
            <Link href={href}>Enable Biometric Login</Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="w-full">
            <Link href={href}>Maybe Later</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
