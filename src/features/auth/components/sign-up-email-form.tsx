"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError } from "@/lib/api/errors";

import { useAuthActions } from "../hooks/use-auth-actions";
import { withNext } from "../model/next-path";
import { signUpEmailSchema, type SignUpEmailInput } from "../model/schema";
import { FormError } from "./form-error";
import { PasswordInput } from "./password-input";
import { PasswordRules } from "./password-rules";
import { TermsLabel } from "./terms-label";

export function SignUpEmailForm({ next = null }: { next?: string | null }) {
  const router = useRouter();
  const { signUp } = useAuthActions();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
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

  async function onSubmit(values: SignUpEmailInput) {
    setSubmitError(null);
    try {
      await signUp({
        email: values.email,
        password: values.password,
        passwordConfirmation: values.confirmPassword,
        name: values.firstName,
        surname: values.lastName,
      });
      router.push(withNext("/sign-up/verify", next));
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        setError("email", { message: error.message });
      } else {
        setSubmitError(
          error instanceof Error ? error.message : "Could not create account",
        );
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[23px]"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <div className="flex flex-col gap-1">
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
        {password.length > 0 && <PasswordRules value={password} />}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="flex flex-col gap-1">
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
        <TermsLabel htmlFor="terms" />
      </div>

      {submitError && <FormError message={submitError} />}

      <Button
        type="submit"
        size="lg"
        disabled={!isValid || isSubmitting}
        className="w-full"
      >
        Next
      </Button>

      <p className="text-center text-body-14 text-secondary-500">
        Already have an account?{" "}
        <Link
          href={withNext("/sign-in", next)}
          className="font-semibold text-info-500 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}

function FieldError({ children }: { children: ReactNode }) {
  return <p className="text-caption-12 text-error-500">{children}</p>;
}
