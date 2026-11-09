"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError } from "@/lib/api/errors";

import { useAuthActions } from "../hooks/use-auth-actions";
import { safeNextPath } from "../model/next-path";
import { signInSchema, type SignInInput } from "../model/schema";
import { FormError } from "./form-error";
import { PasswordInput } from "./password-input";

const WRONG_PASSWORD = "Incorrect password. Try again or reset your password.";
const UNAVAILABLE = "The service is not available right now. Please try again.";

const rememberShown = () =>
  window.matchMedia?.("(min-width: 1024px)").matches ?? true;

export function SignInForm({ defaultEmail = "" }: { defaultEmail?: string }) {
  const router = useRouter();
  const { signIn } = useAuthActions();
  const [remember, setRemember] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: defaultEmail, password: "" },
  });

  async function onSubmit(values: SignInInput) {
    setSubmitError(null);
    try {
      await signIn({ ...values, remember: rememberShown() ? remember : true });
      const next = new URLSearchParams(window.location.search).get("next");
      router.push(safeNextPath(next) ?? "/home");
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setError("password", { message: WRONG_PASSWORD });
      } else if (error instanceof ApiError && error.status === 403) {
        setError("password", { message: error.message });
      } else {
        setSubmitError(error instanceof ApiError ? error.message : UNAVAILABLE);
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[23px]"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Enter email"
          defaultValue={defaultEmail}
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email && (
          <p role="alert" className="text-caption-12 text-error-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <div className="flex flex-col gap-1">
          <PasswordInput
            id="password"
            autoComplete="current-password"
            placeholder="Enter password"
            registration={register("password")}
            invalid={Boolean(errors.password)}
          />
          {errors.password && (
            <p role="alert" className="text-caption-12 text-error-500">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <Link
        href="/forgot-password"
        className="w-fit text-body-14 font-bold text-primary-500 hover:underline lg:hidden"
      >
        Forgot Password?
      </Link>

      <div className="hidden items-center justify-between lg:flex">
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={remember}
            onCheckedChange={(checked) => setRemember(checked === true)}
          />
          <Label
            htmlFor="remember"
            className="text-legal-14 text-secondary-900"
          >
            Remember me
          </Label>
        </div>
        <Link
          href="/forgot-password"
          className="text-body-14 font-semibold text-info-500 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {submitError && <FormError message={submitError} />}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        Log In
      </Button>

      <p className="text-center text-body-14 text-secondary-500">
        Don’t have an account yet?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-info-500 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
