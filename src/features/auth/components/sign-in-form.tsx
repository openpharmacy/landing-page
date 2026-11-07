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
import { setMockSession } from "@/lib/auth/mock-session";

import { signInSchema, type SignInInput } from "../model/schema";
import { PasswordInput } from "./password-input";

export function SignInForm() {
  const router = useRouter();
  const [remember, setRemember] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: SignInInput) {
    // No backend yet — mock a successful sign-in from the email address.
    const local = values.email.split("@")[0] ?? "";
    const first = local.split(/[._-]/)[0] || "there";
    setMockSession({
      firstName: first.charAt(0).toUpperCase() + first.slice(1),
      lastName: "",
      email: values.email,
    });
    // Return to where the user came from (e.g. Add to Cart), else home.
    const next = new URLSearchParams(window.location.search).get("next");
    router.push(next && next.startsWith("/") ? next : "/");
    router.refresh();
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
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-body-14 text-error-500">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          autoComplete="current-password"
          placeholder="Enter password"
          registration={register("password")}
          invalid={Boolean(errors.password)}
        />
        {errors.password && (
          <p className="text-body-14 text-error-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
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

      <Button type="submit" size="lg" className="w-full">
        Log In
      </Button>

      <p className="text-center text-body-14 text-secondary-500">
        Don&apos;t have an account yet?{" "}
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
