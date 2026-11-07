"use client";

import { useRouter } from "next/navigation";

import { setMockSession, takePendingSignup } from "@/lib/auth/mock-session";

import { PinPad } from "./pin-pad";

/**
 * Set-a-PIN step (Figma 42:2164). No backend yet — once a valid 4-digit PIN is
 * entered, onboarding completes and the session is finalised.
 */
export function SetPinForm() {
  const router = useRouter();

  function finish() {
    const pending = takePendingSignup();
    setMockSession(pending ?? { firstName: "there", lastName: "" });
    router.push("/");
    router.refresh();
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
