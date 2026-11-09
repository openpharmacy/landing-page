"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/features/auth/components/password-input";

import { ModalShell } from "./modal-shell";

export function PasswordModal({
  email,
  onConfirm,
  onClose,
  busy = false,
  passwordError,
  error,
  onEdit,
}: {
  email: string;
  onConfirm: (password: string) => void;
  onClose: () => void;
  busy?: boolean;
  passwordError?: string | null;
  error?: string | null;
  onEdit?: () => void;
}) {
  const [password, setPassword] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (password && !busy) onConfirm(password);
  }

  return (
    <ModalShell
      label="Confirm your password"
      onClose={onClose}
      closeDisabled={busy}
    >
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 text-center">
          <h2 className="text-title-20 text-neutral-900">
            Confirm your password
          </h2>
          <p className="text-body-16 wrap-anywhere text-secondary-500">
            Enter your password to change your email to{" "}
            <span className="font-bold">{email}</span>.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email-change-password">Password</Label>
          <div className="flex flex-col gap-1">
            <PasswordInput
              id="email-change-password"
              autoComplete="current-password"
              placeholder="Enter password"
              autoFocus
              value={password}
              invalid={Boolean(passwordError)}
              aria-invalid={Boolean(passwordError)}
              onChange={(e) => {
                setPassword(e.target.value);
                onEdit?.();
              }}
            />
            {passwordError && (
              <p role="alert" className="text-caption-12 text-error-500">
                {passwordError}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={!password || busy}
          >
            Change Email
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="w-full"
            disabled={busy}
            onClick={onClose}
          >
            Cancel
          </Button>
          {error && (
            <p role="alert" className="text-caption-12 text-error-500">
              {error}
            </p>
          )}
        </div>
      </form>
    </ModalShell>
  );
}
