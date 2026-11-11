"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { isMockingEnabled } from "@/config/env";

import { useAuthActions } from "../hooks/use-auth-actions";
import { LAST_USER_SIGN_IN, withNext } from "../model/next-path";
import { PinPad } from "./pin-pad";

export function PinSignIn({
  email,
  next,
}: {
  email: string;
  next: string | null;
}) {
  const router = useRouter();
  const { signInWithDevice } = useAuthActions();
  const [attempt, setAttempt] = useState(0);

  const onComplete = useCallback(async () => {
    if (!isMockingEnabled) {
      router.push(withNext(LAST_USER_SIGN_IN, next));
      return;
    }
    try {
      await signInWithDevice(email);
    } catch {
      setAttempt((n) => n + 1);
      return;
    }
    router.push(next ?? "/home");
    router.refresh();
  }, [email, next, router, signInWithDevice]);

  return (
    <div className="flex flex-col items-center gap-8 text-center max-lg:mr-[3px] max-lg:pt-[63px]">
      <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
        Enter your PIN
      </h1>
      <PinPad
        key={attempt}
        onComplete={onComplete}
        bottomKeys={["back", "0", "fingerprint"]}
        onFingerprint={() => router.push(withNext("/sign-in/biometric", next))}
        showRules={false}
        footer={
          <Link
            href="/forgot-password"
            className="self-center text-subtitle-18-bold text-info-500 hover:underline"
          >
            Forgot PIN
          </Link>
        }
      />
    </div>
  );
}
