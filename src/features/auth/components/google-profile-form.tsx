"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError } from "@/lib/api/errors";
import { useShowHidden } from "@/providers/hidden-screens";

import { needsSignIn } from "../api/auth-api";
import { useAuthActions } from "../hooks/use-auth-actions";
import { withNext } from "../model/next-path";
import { FormError } from "./form-error";
import { TermsLabel } from "./terms-label";

const COULD_NOT_SAVE = "Could not save your name. Please try again.";

export function GoogleProfileForm({
  firstName: initialFirst,
  lastName: initialLast,
  next = null,
}: {
  firstName: string;
  lastName: string;
  next?: string | null;
}) {
  const router = useRouter();
  const showHidden = useShowHidden();
  const { completeProfile } = useAuthActions();
  const [firstName, setFirstName] = useState(initialFirst);
  const [lastName, setLastName] = useState(initialLast);
  const [accepted, setAccepted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const initials =
    `${firstName.at(0) ?? ""}${lastName.at(0) ?? ""}`.toUpperCase();
  const canContinue =
    firstName.trim().length > 0 && lastName.trim().length > 0 && accepted;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canContinue || saving) return;
    setSubmitError(null);
    setSaving(true);
    try {
      await completeProfile({
        name: firstName.trim(),
        surname: lastName.trim(),
      });
      router.push(next ?? (showHidden ? "/sign-up/pin" : "/sign-up/done"));
      router.refresh();
    } catch (error) {
      setSaving(false);
      if (needsSignIn(error)) {
        router.push(withNext("/sign-in", next));
        return;
      }
      setSubmitError(
        error instanceof ApiError ? error.message : COULD_NOT_SAVE,
      );
    }
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
        <TermsLabel htmlFor="terms" />
      </div>

      {submitError && <FormError message={submitError} />}

      <Button
        type="submit"
        size="lg"
        disabled={!canContinue || saving}
        className="w-full max-lg:mt-[9px]"
      >
        Continue
      </Button>
    </form>
  );
}
