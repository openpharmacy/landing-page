"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initials, type SessionUser } from "@/lib/auth/mock-session";

import {
  changeEmail,
  errorMessage,
  isSignedOut,
  updateProfile,
} from "../api/account-api";
import { PROFILE_COLUMN } from "./account-layout";
import { BackLink } from "./back-link";
import { PasswordModal } from "./password-modal";

type Errors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  form?: string;
};
type DialogErrors = { password?: string; form?: string };

const PATH = "/account/profile";
const VERIFY_NEW_EMAIL = `/account/verify-email?next=${encodeURIComponent(PATH)}&sent=1`;
const emailSchema = z.string().email().max(255);
const SOON = "disabled:opacity-100";

export function EditProfileForm({ user }: { user: SessionUser }) {
  const router = useRouter();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email ?? "");
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [dialogErrors, setDialogErrors] = useState<DialogErrors>({});
  const savedName = useRef({ name: user.firstName, surname: user.lastName });

  const newEmail = email.trim();
  const emailChanged =
    newEmail.toLowerCase() !== (user.email ?? "").trim().toLowerCase();

  function signInAgain() {
    router.push(`/sign-in?next=${PATH}`);
    router.refresh();
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const name = firstName.trim();
    const surname = lastName.trim();
    const found: Errors = {
      firstName: name ? undefined : "First name is required",
      lastName: surname ? undefined : "Last name is required",
      email:
        emailChanged && !emailSchema.safeParse(newEmail).success
          ? "Enter a valid email"
          : undefined,
    };
    setErrors(found);
    if (found.firstName || found.lastName || found.email) return;
    if (emailChanged) {
      setDialogErrors({});
      setDialog(true);
      return;
    }

    setSaving(true);
    try {
      await updateProfile({ name, surname });
      router.push("/account");
      router.refresh();
    } catch (error) {
      setSaving(false);
      if (isSignedOut(error)) return signInAgain();
      setErrors({ form: errorMessage(error) });
    }
  }

  async function onChangeEmail(password: string) {
    const name = firstName.trim();
    const surname = lastName.trim();
    setDialogErrors({});
    setSaving(true);
    try {
      const saved = savedName.current;
      if (name !== saved.name || surname !== saved.surname) {
        await updateProfile({ name, surname });
        savedName.current = { name, surname };
      }
      await changeEmail({ email: newEmail, password });
      router.push(VERIFY_NEW_EMAIL);
      router.refresh();
    } catch (error) {
      setSaving(false);
      if (isSignedOut(error)) return signInAgain();
      setDialogErrors(dialogErrorFor(error));
    }
  }

  return (
    <div className={PROFILE_COLUMN}>
      <div className="flex flex-col gap-4 lg:gap-8">
        <div className="flex flex-col gap-1 lg:gap-4">
          <BackLink />
          <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
            Edit Profile
          </h1>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="flex flex-col gap-4 lg:gap-2.5 lg:rounded-card-lg lg:border lg:border-[#e5e7eb] lg:bg-white lg:px-[23px] lg:pt-[23px] lg:pb-[47px]"
        >
          <div className="flex justify-center">
            <span className="flex size-32 items-center justify-center rounded-full bg-primary-500 text-[44px] leading-[52.8px] font-bold text-white">
              {initials(user)}
            </span>
          </div>

          <div className="flex flex-col gap-[23px]">
            <div className="flex flex-col gap-[23px] lg:flex-row">
              <Field id="firstName" label="First Name" error={errors.firstName}>
                <Input
                  id="firstName"
                  placeholder="Enter first name"
                  autoComplete="given-name"
                  value={firstName}
                  aria-invalid={Boolean(errors.firstName)}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Field>
              <Field id="lastName" label="Last Name" error={errors.lastName}>
                <Input
                  id="lastName"
                  placeholder="Enter last name"
                  autoComplete="family-name"
                  value={lastName}
                  aria-invalid={Boolean(errors.lastName)}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Field>
            </div>

            <Field id="email" label="Email" error={errors.email}>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                autoComplete="email"
                value={email}
                aria-invalid={Boolean(errors.email)}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }}
              />
            </Field>

            <Field id="phone" label="Phone Number">
              <Input
                id="phone"
                type="tel"
                placeholder="Coming soon"
                disabled
                className={SOON}
              />
            </Field>

            <Field id="dob" label="Date of birth">
              <Input
                id="dob"
                placeholder="Coming soon"
                disabled
                className={SOON}
              />
            </Field>

            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="py-[15px]"
                >
                  <Link href="/account">Cancel</Link>
                </Button>
                <Button type="submit" size="lg" disabled={saving}>
                  Save Changes
                </Button>
              </div>
              {errors.form && <FieldError>{errors.form}</FieldError>}
            </div>
          </div>
        </form>
      </div>

      {dialog && (
        <PasswordModal
          email={newEmail}
          busy={saving}
          passwordError={dialogErrors.password}
          error={dialogErrors.form}
          onConfirm={onChangeEmail}
          onEdit={() => setDialogErrors({})}
          onClose={() => {
            if (saving) return;
            setDialog(false);
            setDialogErrors({});
          }}
        />
      )}
    </div>
  );
}

function dialogErrorFor(error: unknown): DialogErrors {
  const message = errorMessage(error);
  return /invalid credentials/i.test(message)
    ? { password: message }
    : { form: message };
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex flex-col gap-1">
        {children}
        {error && <FieldError>{error}</FieldError>}
      </div>
    </div>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="text-caption-12 text-error-500">
      {children}
    </p>
  );
}
