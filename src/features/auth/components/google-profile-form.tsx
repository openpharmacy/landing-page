"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setPendingSignup } from "@/lib/auth/mock-session";

/**
 * Post-Google profile completion (Figma 171:6652). Name is pre-filled from the
 * chosen Google account; there is no backend yet, so Continue advances to the
 * Set-a-PIN step (the Google email is treated as already verified).
 */
export function GoogleProfileForm({
  firstName: initialFirst,
  lastName: initialLast,
}: {
  firstName: string;
  lastName: string;
}) {
  const router = useRouter();
  const [firstName, setFirstName] = useState(initialFirst);
  const [lastName, setLastName] = useState(initialLast);
  const [accepted, setAccepted] = useState(true);

  const initials =
    `${firstName.at(0) ?? ""}${lastName.at(0) ?? ""}`.toUpperCase();
  const canContinue =
    firstName.trim().length > 0 && lastName.trim().length > 0 && accepted;

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canContinue) return;
    setPendingSignup({ firstName, lastName });
    router.push("/sign-up/pin");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[23px]">
      <div className="flex justify-center">
        <span className="flex size-32 items-center justify-center rounded-full bg-primary-500 text-[44px] leading-none font-bold text-white">
          {initials}
        </span>
      </div>

      <div className="flex flex-col gap-[23px]">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            autoComplete="given-name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            autoComplete="family-name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="terms"
          checked={accepted}
          onCheckedChange={(checked) => setAccepted(checked === true)}
        />
        <Label htmlFor="terms" className="text-legal-14 text-secondary-900">
          I agree with{" "}
          <Link href="#" className="font-bold text-info-500">
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link href="#" className="font-bold text-info-500">
            Privacy Policy
          </Link>
        </Label>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={!canContinue}
        className="w-full"
      >
        Continue
      </Button>
    </form>
  );
}
