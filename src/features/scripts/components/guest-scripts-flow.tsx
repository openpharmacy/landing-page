"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { Controller, useForm, type Control } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setScriptsAdded } from "@/lib/auth/mock-session";

import { PlusIcon } from "./script-source-cards";
import { UnlockPrescriptionCard } from "./unlock-prescription-card";

type Person = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};
type SessionScript = { medication: string; token: string; addedAt: string };

// Mock medications a token resolves to (no backend — see docs/api-gaps.md).
const MEDS = [
  "Omeprazole",
  "Atorvastatin 20mg",
  "Metformin 500mg",
  "Amoxicillin 500mg",
  "Sertraline 50mg",
];

function formatNow(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

/**
 * Logged-out (guest) scripts flow: unlock (enter token) → upload form (personal
 * details + token) → session list. UI-only; the "session" lives in component
 * state for the visit (no backend — docs/api-gaps.md).
 */
export function GuestScriptsFlow() {
  const [step, setStep] = useState<"unlock" | "upload" | "session">("unlock");
  const [pendingToken, setPendingToken] = useState("");
  const [person, setPerson] = useState<Person | null>(null);
  const [scripts, setScripts] = useState<SessionScript[]>([]);

  function addScript(token: string) {
    setScripts((list) => [
      ...list,
      {
        medication: MEDS[list.length % MEDS.length]!,
        token,
        addedAt: formatNow(),
      },
    ]);
    // Let the Shop reflect that a script was uploaded (green "Script Active").
    setScriptsAdded();
  }

  function onUpload(token: string) {
    if (person) {
      // Already in a session — add straight away.
      addScript(token);
      setStep("session");
    } else {
      setPendingToken(token);
      setStep("upload");
    }
  }

  function onConfirm(data: Person) {
    setPerson(data);
    addScript(pendingToken);
    setStep("session");
  }

  if (step === "upload") {
    return (
      <UploadStep
        token={pendingToken}
        onBack={() => setStep("unlock")}
        onConfirm={onConfirm}
      />
    );
  }

  if (step === "session" && person) {
    return (
      <SessionStep
        person={person}
        scripts={scripts}
        onAddAnother={() => setStep("unlock")}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-[870px] animate-page-fade px-4 py-6">
      <UnlockPrescriptionCard onUpload={onUpload} />
    </div>
  );
}

// ─── Step 2: Upload Your Script (Figma 161:5016) ─────────────────────────────

const uploadSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().trim().min(6, "Enter a valid phone number"),
  createAccount: z.boolean(),
  agreeTerms: z.boolean().refine((v) => v, "You must accept the terms"),
});
type UploadInput = z.infer<typeof uploadSchema>;

function UploadStep({
  token,
  onBack,
  onConfirm,
}: {
  token: string;
  onBack: () => void;
  onConfirm: (data: Person) => void;
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UploadInput>({
    resolver: zodResolver(uploadSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      createAccount: false,
      agreeTerms: false,
    },
  });

  function submit(data: UploadInput) {
    onConfirm({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    });
  }

  return (
    <div className="mx-auto w-full max-w-[570px] animate-page-fade px-4 py-8">
      <div className="flex flex-col gap-8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex w-fit items-center gap-2 text-body-16 text-text-muted transition-colors hover:text-info-500"
        >
          <ArrowLeft className="size-5" />
          Back
        </button>

        <div className="flex flex-col">
          <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
            Upload Your Script
          </h1>
          <p className="text-body-16 text-secondary-500">
            Enter your details and eScript token to browse prescription
            medications
          </p>
        </div>

        <div className="flex flex-col gap-6 rounded-card-lg border border-[#E5E7EB] bg-white px-6 pt-6 pb-12">
          {/* Read-only token from step 1 */}
          <div className="flex flex-col gap-2">
            <Label>eScript Token</Label>
            <div className="flex items-center gap-2 rounded-control border border-neutral-300 bg-bg-app px-3 py-4">
              <Icon
                src="/icons/scan-barcode.svg"
                size={20}
                className="shrink-0"
              />
              <span className="text-body-16 text-neutral-700">{token}</span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(submit)}
            noValidate
            className="flex flex-col gap-[23px]"
          >
            <h2 className="text-h4-24 text-[#1C232A]">Personal Information</h2>

            <div className="flex gap-[23px]">
              <Field label="First Name" error={errors.firstName?.message}>
                <Input
                  placeholder="Enter first name"
                  autoComplete="given-name"
                  aria-invalid={Boolean(errors.firstName)}
                  {...register("firstName")}
                />
              </Field>
              <Field label="Last Name" error={errors.lastName?.message}>
                <Input
                  placeholder="Enter last name"
                  autoComplete="family-name"
                  aria-invalid={Boolean(errors.lastName)}
                  {...register("lastName")}
                />
              </Field>
            </div>

            <Field label="Email" error={errors.email?.message}>
              <Input
                type="email"
                placeholder="Enter email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />
            </Field>

            <Field label="Phone Number" error={errors.phone?.message}>
              <div className="flex items-center gap-2 rounded-control border border-neutral-300 bg-white px-3 py-4 transition-colors focus-within:border-info-500 focus-within:ring-2 focus-within:ring-info-500/30">
                <input
                  type="tel"
                  inputMode="tel"
                  placeholder="Enter phone number"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                  className="w-full bg-transparent text-body-16-bold text-secondary-900 outline-none placeholder:font-normal placeholder:text-[#9EB6C9]"
                  {...register("phone")}
                />
                <Eye className="size-5 shrink-0 text-neutral-700" />
              </div>
            </Field>

            <CheckRow
              control={control}
              name="createAccount"
              label="Create an account to save your information and track your prescriptions"
            />
            <div className="flex flex-col gap-1">
              <CheckRow
                control={control}
                name="agreeTerms"
                label={
                  <>
                    I agree with{" "}
                    <Link href="#" className="font-bold text-info-500">
                      Terms of Use
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="font-bold text-info-500">
                      Privacy Policy
                    </Link>
                  </>
                }
              />
              {errors.agreeTerms && (
                <p className="text-body-14 text-error-500">
                  {errors.agreeTerms.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={!isValid}
              className="w-full"
            >
              Confirm
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-body-14 text-error-500">{error}</p>}
    </div>
  );
}

function CheckRow({
  control,
  name,
  label,
}: {
  control: Control<UploadInput>;
  name: "createAccount" | "agreeTerms";
  label: ReactNode;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex items-start gap-2">
          <Checkbox
            checked={field.value}
            onCheckedChange={(c) => field.onChange(c === true)}
            className="mt-0.5"
          />
          <Label className="text-legal-14 text-secondary-900">{label}</Label>
        </div>
      )}
    />
  );
}

// ─── Step 3: Your Session Scripts (Figma 161:5076) ───────────────────────────

function SessionStep({
  person,
  scripts,
  onAddAnother,
}: {
  person: Person;
  scripts: SessionScript[];
  onAddAnother: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-[870px] animate-page-fade px-4 py-8">
      <div className="flex flex-col gap-9">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <h1 className="text-h4-24 text-secondary-900 lg:text-display-32">
              Your Session Scripts
            </h1>
            <p className="text-body-16 text-secondary-300">
              Browsing as {person.firstName} {person.lastName}
            </p>
          </div>
          <button
            type="button"
            onClick={onAddAnother}
            aria-label="Add another script"
            className="flex size-14 shrink-0 items-center justify-center rounded-card bg-gradient-primary text-white shadow-float transition-opacity hover:opacity-95"
          >
            <PlusIcon className="size-6" />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {scripts.map((script, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-card border border-[#E5E7EB] bg-white p-6"
              >
                <span className="absolute top-0 right-0 rounded-bl-[8px] bg-[#219A55] px-1.5 py-1.5 text-caption-12-bold text-white">
                  Active
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-title-20 text-secondary-900">
                    {script.medication}
                  </h3>
                  <div className="flex flex-col gap-1">
                    <span className="text-body-14 text-text-muted">
                      Token: {script.token}
                    </span>
                    <span className="text-caption-12 text-[#9CA3AF]">
                      Added: {script.addedAt}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              size="lg"
              className="flex-1 px-3 sm:px-8"
              onClick={onAddAnother}
            >
              Add Another Script
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="flex-1 px-3 sm:px-8"
            >
              <Link href="/shop">Browse Medications</Link>
            </Button>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-card-lg border-2 border-[#DBEAFE] bg-gradient-to-b from-[#EFF6FF] to-white p-8 text-center">
            <div className="flex flex-col gap-1">
              <h2 className="text-title-20 text-[#101828]">
                Want to save your prescriptions?
              </h2>
              <p className="text-body-14 text-[#7C8793]">
                Create an account to track refills, set reminders, and manage
                your medications
              </p>
            </div>
            <Button asChild variant="secondary" size="lg">
              <Link href="/sign-up">Create Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
