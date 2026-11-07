"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setPendingSignup } from "@/lib/auth/mock-session";

import {
  passwordRules,
  signUpEmailSchema,
  type SignUpEmailInput,
} from "../model/schema";
import { PasswordInput } from "./password-input";

export function SignUpEmailForm() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpEmailInput>({
    resolver: zodResolver(signUpEmailSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      acceptTerms: false,
    },
  });

  const password = useWatch({ control, name: "password" }) ?? "";

  function onSubmit(values: SignUpEmailInput) {
    // No sign-up API yet — stash the details and advance to verification.
    setPendingSignup({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    });
    router.push(`/sign-up/verify?email=${encodeURIComponent(values.email)}`);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[23px]"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Enter email"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email && <FieldError>{errors.email.message}</FieldError>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          autoComplete="new-password"
          placeholder="Enter password"
          registration={register("password")}
          invalid={Boolean(errors.password)}
        />
        {password.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {passwordRules.map((rule) => {
              const ok = rule.test(password);
              return (
                <span
                  key={rule.id}
                  className="flex items-center gap-1 text-body-14 text-secondary-500"
                >
                  {ok ? (
                    <Check
                      className="size-[18px] shrink-0 text-success-500"
                      strokeWidth={2.5}
                    />
                  ) : (
                    <X
                      className="size-[18px] shrink-0 text-error-500"
                      strokeWidth={2.5}
                    />
                  )}
                  {rule.label}
                </span>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <PasswordInput
          id="confirmPassword"
          autoComplete="new-password"
          placeholder="Enter password"
          registration={register("confirmPassword")}
          invalid={Boolean(errors.confirmPassword)}
        />
        {errors.confirmPassword && (
          <FieldError>{errors.confirmPassword.message}</FieldError>
        )}
      </div>

      <div className="flex gap-[23px]">
        <div className="flex flex-1 flex-col gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            autoComplete="given-name"
            placeholder="Enter first name"
            aria-invalid={Boolean(errors.firstName)}
            {...register("firstName")}
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            autoComplete="family-name"
            placeholder="Enter last name"
            aria-invalid={Boolean(errors.lastName)}
            {...register("lastName")}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Controller
          control={control}
          name="acceptTerms"
          render={({ field }) => (
            <Checkbox
              id="terms"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
            />
          )}
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

      <Button type="submit" size="lg" disabled={!isValid} className="w-full">
        Next
      </Button>

      <p className="text-center text-body-14 text-secondary-500">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-info-500 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}

function FieldError({ children }: { children: ReactNode }) {
  return <p className="text-body-14 text-error-500">{children}</p>;
}
