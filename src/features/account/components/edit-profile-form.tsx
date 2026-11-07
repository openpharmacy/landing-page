"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  initials,
  setMockSession,
  type SessionUser,
} from "@/lib/auth/mock-session";

/** Edit Profile (Figma `173:2642`). Mock — saving updates the session name. */
export function EditProfileForm({ user }: { user: SessionUser }) {
  const router = useRouter();
  const [firstName, setFirstName] = useState(user.firstName ?? "");
  const [lastName, setLastName] = useState(user.lastName ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setMockSession({
      firstName: firstName.trim() || user.firstName,
      lastName: lastName.trim(),
      email: email.trim() || user.email,
    });
    router.push("/account");
    router.refresh();
  }

  const preview: SessionUser = { firstName, lastName };

  return (
    <div className="mx-auto w-full max-w-[670px] px-4 pt-8 pb-20">
      <div className="flex flex-col gap-6">
        <Link
          href="/account"
          className="inline-flex w-fit items-center gap-2 text-body-16 text-text-muted transition-colors hover:text-info-500"
        >
          <ArrowLeft className="size-5" />
          Back
        </Link>
        <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
          Edit Profile
        </h1>

        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-6 rounded-card-lg border border-[#E5E7EB] bg-white p-6 lg:p-8"
        >
          <div className="flex justify-center">
            <span className="flex size-28 items-center justify-center rounded-full bg-primary-500 text-display-32 font-bold text-white">
              {initials(preview) || "JS"}
            </span>
          </div>

          <div className="flex flex-col gap-[23px] sm:flex-row">
            <Field id="firstName" label="First Name">
              <Input
                id="firstName"
                placeholder="Enter first name"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Field>
            <Field id="lastName" label="Last Name">
              <Input
                id="lastName"
                placeholder="Enter last name"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Field>
          </div>

          <Field id="email" label="Email">
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>

          <Field id="phone" label="Phone Number">
            <Input
              id="phone"
              type="tel"
              inputMode="tel"
              placeholder="Enter phone number"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Field>

          <Field id="dob" label="Date of birth">
            <Input
              id="dob"
              inputMode="numeric"
              placeholder="DD/MM/YYYY"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </Field>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              type="button"
              variant="secondary"
              size="lg"
              className="flex-1"
            >
              <Link href="/account">Cancel</Link>
            </Button>
            <Button type="submit" size="lg" className="flex-1">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}
