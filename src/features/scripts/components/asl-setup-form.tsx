"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** Mask free input into a DD/MM/YYYY string as the user types (digits only). */
function formatDob(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

/** A real, not-in-the-future calendar date in DD/MM/YYYY form. */
function isValidDob(value: string): boolean {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return false;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const now = new Date();
  if (month < 1 || month > 12) return false;
  if (year < 1900 || year > now.getFullYear()) return false;
  const date = new Date(year, month - 1, day);
  return (
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year &&
    date <= now
  );
}

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .refine(isValidDob, "Enter a valid date (DD/MM/YYYY)"),
  activationCode: z.string().trim().min(1, "Activation code is required"),
  permission: z
    .boolean()
    .refine((value) => value, "You must give permission to continue"),
});
type AslSetupInput = z.infer<typeof schema>;

/**
 * ASL setup form (Figma `161:2741`). All fields are required; the Date of Birth
 * is masked to DD/MM/YYYY and validated as a real date. On a valid submit it
 * advances the wizard via `onContinue` (no ASL backend yet — docs/api-gaps.md).
 */
export function AslSetupForm({ onContinue }: { onContinue: () => void }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AslSetupInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      activationCode: "",
      permission: true,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onContinue)}
      noValidate
      className="flex flex-col gap-[23px]"
    >
      <div className="flex flex-col gap-[23px] sm:flex-row">
        <Field id="asl-first-name" label="First Name" error={errors.firstName}>
          <Input
            id="asl-first-name"
            placeholder="Enter first name"
            autoComplete="given-name"
            aria-invalid={Boolean(errors.firstName)}
            {...register("firstName")}
          />
        </Field>
        <Field id="asl-last-name" label="Last Name" error={errors.lastName}>
          <Input
            id="asl-last-name"
            placeholder="Enter last name"
            autoComplete="family-name"
            aria-invalid={Boolean(errors.lastName)}
            {...register("lastName")}
          />
        </Field>
      </div>

      <Field id="asl-dob" label="Date of Birth" error={errors.dob}>
        <Controller
          control={control}
          name="dob"
          render={({ field }) => (
            <Input
              id="asl-dob"
              inputMode="numeric"
              placeholder="DD/MM/YYYY"
              aria-invalid={Boolean(errors.dob)}
              value={field.value}
              onBlur={field.onBlur}
              onChange={(event) =>
                field.onChange(formatDob(event.target.value))
              }
            />
          )}
        />
      </Field>

      <Field
        id="asl-activation-code"
        label="Activation Code"
        error={errors.activationCode}
      >
        <Input
          id="asl-activation-code"
          placeholder="e.g., ASL-1234-5678"
          aria-invalid={Boolean(errors.activationCode)}
          {...register("activationCode")}
        />
      </Field>

      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <Controller
            control={control}
            name="permission"
            render={({ field }) => (
              <Checkbox
                id="asl-permission"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                className="mt-1"
              />
            )}
          />
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="asl-permission"
              className="text-body-14 text-secondary-900"
            >
              I give permission for OpenPharmacy to access my Active Script List
            </Label>
            <a
              href="#"
              className="inline-flex items-center gap-1 text-body-14 text-info-500"
            >
              Learn more about privacy and data usage
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
        {errors.permission && (
          <p className="text-body-14 text-error-500">
            {errors.permission.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full">
        Continue
      </Button>
      <button
        type="button"
        className="flex h-14 w-full items-center justify-center gap-1 rounded-card text-body-16-bold text-secondary-700 transition-colors hover:bg-secondary-500/5"
      >
        <Icon src="/icons/scripts/message-question.svg" size={24} />I don&apos;t
        have my activation code
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: { message?: string };
  children: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error?.message && (
        <p className="text-body-14 text-error-500">{error.message}</p>
      )}
    </div>
  );
}
