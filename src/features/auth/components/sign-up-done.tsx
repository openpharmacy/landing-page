import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function SignUpDone({
  withPin,
  href,
}: {
  withPin: boolean;
  href: string;
}) {
  return (
    <div className="max-lg:-mr-[3px] max-lg:pt-[120px] lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center">
      <div className="flex w-full flex-col items-center gap-9 text-center lg:max-w-[480px] lg:gap-8">
        <Icon src="/icons/auth/tick-circle-blue.svg" size={120} />
        <div className="flex flex-col gap-2">
          <h1 className="text-h4-24 text-neutral-900 lg:text-display-32">
            All set!
          </h1>
          <p className="text-body-16 text-secondary-300">
            {withPin
              ? "Your password and PIN have been updated successfully. You can now log in securely."
              : "Your account has been created successfully. You’re ready to go."}
          </p>
        </div>
        <Button asChild size="lg" className="w-full">
          <Link href={href}>Log In</Link>
        </Button>
      </div>
    </div>
  );
}
