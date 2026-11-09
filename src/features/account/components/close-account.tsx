"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clearLocalSession } from "@/lib/auth/mock-session";
import { cn } from "@/lib/utils";

import {
  deactivateAccount,
  deleteAccount,
  errorMessage,
  isSignedOut,
} from "../api/account-api";
import { ConfirmModal } from "./confirm-modal";
import { SettingsPage } from "./settings-page";

const BACK = "/account/settings/management";

export function DeleteAccount() {
  const [typed, setTyped] = useState("");
  const confirmed = typed.trim().toLowerCase() === "delete";

  return (
    <CloseAccount
      title="Delete Account"
      buttonLabel="Delete My Account"
      buttonDisabled={!confirmed}
      modalTitle={"Are you sure you want to \ndelete your account?"}
      confirmLabel="Yes, Delete"
      close={deleteAccount}
      path="/account/settings/delete"
    >
      <Notice
        className="max-lg:min-h-[322px]"
        lead="Deleting your account is permanent. This means:"
        points={[
          "Your profile will be removed.",
          "Your scripts, and history will be deleted.",
          "You won’t be able to recover your account.",
        ]}
        end={<p>If you’re not sure, consider deactivating instead.</p>}
      />
      <label
        htmlFor="delete-confirm"
        className="text-body-16-bold text-secondary-900 max-lg:max-w-[358px]"
      >
        To confirm deletion, type “delete” in the box below:
      </label>
      <Input
        id="delete-confirm"
        autoComplete="off"
        placeholder="Type “delete” to confirm"
        value={typed}
        onChange={(e) => setTyped(e.target.value)}
      />
    </CloseAccount>
  );
}

export function DeactivateAccount() {
  return (
    <CloseAccount
      title="Deactivate Account"
      buttonLabel="Deactivate My Account"
      modalTitle={"Are you sure you want to \ndeactivate your account?"}
      confirmLabel="Yes, Deactivate"
      close={deactivateAccount}
      path="/account/settings/deactivate"
    >
      <Notice
        className="max-lg:min-h-[410px]"
        lead="Deactivating your account will temporarily disable your access. This means:"
        points={[
          "Your profile will be locked and hidden.",
          "Your scripts and history will be safely retained and won’t be permanently deleted.",
          "You won’t be able to access your account while it’s deactivated.",
          "\tYou can reactivate your account at any time by emailing hello@openpharmacy.com.",
        ]}
        end={
          <p className="font-bold">
            If you’re sure, click the button below to deactivate your account.
          </p>
        }
      />
    </CloseAccount>
  );
}

function CloseAccount({
  title,
  buttonLabel,
  buttonDisabled = false,
  modalTitle,
  confirmLabel,
  close,
  path,
  children,
}: {
  title: string;
  buttonLabel: string;
  buttonDisabled?: boolean;
  modalTitle: string;
  confirmLabel: string;
  close: () => Promise<void>;
  path: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirm() {
    setBusy(true);
    setError(null);
    try {
      await close();
    } catch (err) {
      if (isSignedOut(err)) {
        router.push(`/sign-in?next=${path}`);
        router.refresh();
        return;
      }
      setError(errorMessage(err));
      setBusy(false);
      return;
    }
    clearLocalSession();
    router.push("/");
    router.refresh();
  }

  return (
    <SettingsPage backHref={BACK} title={title}>
      <div className="flex flex-col gap-4 lg:rounded-card-lg lg:border lg:border-[#e5e7eb] lg:bg-white lg:px-[23px] lg:pt-[23px] lg:pb-[47px]">
        {children}
        <Button
          type="button"
          variant="destructive"
          size="lg"
          className="mt-5 w-full"
          disabled={buttonDisabled}
          onClick={() => {
            setError(null);
            setOpen(true);
          }}
        >
          {buttonLabel}
        </Button>
      </div>
      {open && (
        <ConfirmModal
          title={modalTitle}
          confirmLabel={confirmLabel}
          busy={busy}
          error={error}
          onConfirm={confirm}
          onClose={() => {
            if (busy) return;
            setOpen(false);
            setError(null);
          }}
        />
      )}
    </SettingsPage>
  );
}

function Notice({
  lead,
  points,
  end,
  className,
}: {
  lead: string;
  points: string[];
  end: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 text-body-16 text-secondary-900 max-lg:max-w-[358px]",
        className,
      )}
    >
      <p className="font-bold">{lead}</p>
      <ul className="flex flex-col gap-6">
        {points.map((point) => (
          <li key={point} className="flex whitespace-pre-wrap [tab-size:1]">
            <span aria-hidden className="w-6 shrink-0 text-center">
              •
            </span>
            {point}
          </li>
        ))}
      </ul>
      {end}
    </div>
  );
}
