"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ModalShell } from "@/features/account/components/modal-shell";
import { cn } from "@/lib/utils";

export function NoticeDialog({
  icon,
  tint = "bg-info-500/10",
  title,
  children,
  action,
  onClose,
}: {
  icon: string;
  tint?: string;
  title: string;
  children: ReactNode;
  action?: ReactNode;
  onClose: () => void;
}) {
  return (
    <ModalShell label={title} onClose={onClose}>
      <div className="flex flex-col items-center gap-4 text-center">
        <span
          className={cn(
            "flex size-16 items-center justify-center rounded-full",
            tint,
          )}
        >
          <Icon src={icon} size={24} />
        </span>
        <div className="flex flex-col gap-1">
          <h2 className="text-title-20 text-neutral-900">{title}</h2>
          <p className="text-body-16 text-secondary-500">{children}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {action}
        <Button
          type="button"
          variant={action ? "secondary" : "primary"}
          className="w-full"
          onClick={onClose}
        >
          OK
        </Button>
      </div>
    </ModalShell>
  );
}
