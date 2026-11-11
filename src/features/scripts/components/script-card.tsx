"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition, type MouseEvent } from "react";

import { cn } from "@/lib/utils";
import { useShowHidden } from "@/providers/hidden-screens";

import { errorText } from "../api/scripts-api";
import {
  formatAddedDate,
  isTokenOnly,
  scheduleHref,
  statusLabel,
  type Script,
  type ScriptStatus,
} from "../model/script";
import { HiddenBanner } from "./hidden-banner";
import { useHideConfirm } from "./hide-script-modal";
import { ScriptActionsMenu } from "./script-actions-menu";
import { DeleteScriptModal } from "./script-dialogs";
import { NoticeLine, shareScript, type Notice } from "./script-notice";
import { SecurityShield } from "./security-shield";

const STATUS_BADGE: Record<ScriptStatus, string> = {
  active: "-right-px bg-[#219a55] lg:right-0",
  expired: "right-0 bg-[#b93b2f] lg:right-px",
  dispensed: "right-0 bg-secondary-500",
  deferred: "right-0 bg-secondary-500",
  disabled: "right-0 bg-secondary-500",
  ceased: "right-0 bg-secondary-500",
  cancelled: "right-0 bg-secondary-500",
  other: "right-0 bg-secondary-500",
};

export function ScriptCard({
  script,
  hidden,
  archived,
  error,
  onSetHidden,
  onSetArchived,
  onDelete,
}: {
  script: Script;
  hidden: boolean;
  archived: boolean;
  error?: string;
  onSetHidden: (hidden: boolean) => void;
  onSetArchived: (archived: boolean) => void;
  onDelete: () => Promise<void>;
}) {
  const router = useRouter();
  const showHidden = useShowHidden();
  const tokenOnly = isTokenOnly(script);
  const visibility = useHideConfirm(onSetHidden);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [deleting, setDeleting] = useState<{
    busy: boolean;
    error?: string;
  } | null>(null);
  const [, startRefresh] = useTransition();

  const detailHref = `/scripts/detail?id=${script.id}`;
  function openDetail() {
    router.push(detailHref);
  }
  const prefetchDetail = () => router.prefetch(detailHref);

  const stop = (event: MouseEvent) => event.stopPropagation();

  async function share() {
    if (!isTokenOnly(script)) setNotice(await shareScript(script));
  }

  async function confirmDelete() {
    setDeleting({ busy: true });
    try {
      await onDelete();
    } catch (e) {
      setDeleting({ busy: false, error: errorText(e, "Could not delete it") });
      return;
    }
    startRefresh(() => {
      setDeleting(null);
      router.refresh();
    });
  }

  return (
    <>
      <div
        onClick={(event) => {
          if (event.detail <= 1) openDetail();
        }}
        onPointerEnter={prefetchDetail}
        onFocus={prefetchDetail}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" && event.target === event.currentTarget) {
            openDetail();
          }
        }}
        className="relative cursor-pointer rounded-card border border-[#e5e7eb] bg-white p-[23px] transition-shadow hover:shadow-card"
      >
        <span
          className={cn(
            "absolute top-0 rounded-tr-card rounded-bl-control p-1.5 text-caption-12-bold text-white",
            STATUS_BADGE[script.status],
          )}
        >
          {statusLabel(script)}
        </span>

        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center gap-2">
            <h3
              className={cn(
                "min-w-[164px] text-title-20 text-[#101828]",
                tokenOnly && "break-all",
              )}
            >
              {tokenOnly ? script.token : script.name}
            </h3>
            {script.secure && (
              <SecurityShield className="size-4 shrink-0 text-success-500" />
            )}
          </div>

          {isTokenOnly(script) ? (
            script.addedOn && (
              <p className="text-body-16 text-text-muted">
                Added {formatAddedDate(script.addedOn)}
              </p>
            )
          ) : (
            <>
              <p className="text-body-16 text-text-muted">{script.detail}</p>

              {script.expiry && (
                <div className="flex items-center gap-2 lg:hidden">
                  <span
                    className={cn(
                      "rounded-[5px] p-1 text-caption-12-bold",
                      script.expiry.soon
                        ? "bg-[#f83536]/10 text-[#f93236]"
                        : "bg-info-500/10 text-info-500",
                    )}
                  >
                    {script.expiry.left}
                  </span>
                  <span className="text-[10px] leading-3 text-secondary-300">
                    {script.expiry.date}
                  </span>
                </div>
              )}

              {script.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {script.tags.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="rounded-control bg-[#eff6ff] px-3 py-1.5 text-body-14 font-semibold text-info-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}

          {hidden && <HiddenBanner />}
          {error && (
            <p role="alert" className="text-caption-12 text-error-500">
              {error}
            </p>
          )}
          {notice && <NoticeLine notice={notice} />}

          <div className="flex items-center justify-between gap-4">
            {showHidden && !tokenOnly && (
              <Link
                href={scheduleHref(script.id)}
                prefetch={false}
                onClick={stop}
                className="rounded-control border border-secondary-500 bg-white px-[15px] py-[7px] text-body-14 font-bold text-secondary-500 transition-colors hover:bg-secondary-500/5"
              >
                Schedule
              </Link>
            )}
            <div onClick={stop} className="ml-auto">
              <ScriptActionsMenu
                tokenOnly={tokenOnly}
                hidden={hidden}
                archived={archived}
                canHide={script.canHide}
                canDelete={script.canDelete}
                scheduleHref={scheduleHref(script.id)}
                onViewQr={openDetail}
                onSetHidden={visibility.request}
                onSetArchived={onSetArchived}
                onShare={() => void share()}
                onDelete={() => setDeleting({ busy: false })}
                triggerClassName="flex size-9 items-center justify-center rounded-control transition-colors hover:bg-bg-app"
              />
            </div>
          </div>
        </div>
      </div>

      {visibility.dialog}
      {deleting && (
        <DeleteScriptModal
          busy={deleting.busy}
          error={deleting.error}
          onConfirm={() => void confirmDelete()}
          onClose={() => setDeleting(null)}
        />
      )}
    </>
  );
}
