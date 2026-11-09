"use client";

import { useRouter } from "next/navigation";

import { useShowHidden } from "@/providers/hidden-screens";

import { PinPad } from "./pin-pad";

export function SetPinForm() {
  const router = useRouter();
  const showHidden = useShowHidden();

  function finish() {
    router.push(showHidden ? "/sign-up/biometrics" : "/sign-up/done");
  }

  return (
    <div className="flex w-full flex-col items-center gap-8 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
          Set a PIN
        </h1>
        <p className="text-body-16 text-secondary-500">
          Enter a 4-digit PIN to keep your account secure
        </p>
      </div>

      <PinPad onComplete={finish} />
    </div>
  );
}
