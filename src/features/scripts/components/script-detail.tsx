"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { useShowHidden } from "@/providers/hidden-screens";

import {
  deleteScript,
  errorText,
  saveNotes,
  setScriptArchived,
  setScriptHidden,
} from "../api/scripts-api";
import type { QrCode } from "../model/qr";
import {
  scheduleHref,
  statusLabel,
  type MedicationScript,
  type Script,
  type ScriptDetails,
  type ScriptStatus,
  type TokenOnlyScript,
} from "../model/script";
import { NOTES_MAX } from "../model/validation";
import { BackCircle } from "./back-circle";
import { HiddenBanner } from "./hidden-banner";
import { useHideConfirm } from "./hide-script-modal";
import { ScriptActionsMenu } from "./script-actions-menu";
import { DeleteScriptModal } from "./script-dialogs";
import { NoticeLine, shareScript, type Notice } from "./script-notice";
import { SCRIPT_DETAIL_COLUMN } from "./scripts-layout";
import { SecurityShield } from "./security-shield";

const DETAIL_ICON = {
  tablet: "/icons/scripts/detail/tablet.svg",
  personalNotes: "/icons/scripts/detail/personal-notes.svg",
  doctorNotes: "/icons/scripts/detail/doctor-notes.svg",
  information: "/icons/scripts/detail/information.svg",
  edit: "/icons/scripts/detail/edit.svg",
};

type ScriptDetailProps = { archived?: boolean } & (
  | { script: MedicationScript; details: ScriptDetails; qr: QrCode }
  | { script: TokenOnlyScript; details?: undefined; qr?: undefined }
);

const STATUS_BADGE: Record<ScriptStatus, string> = {
  active: "bg-[#219A55]",
  expired: "bg-[#B93B2F]",
  dispensed: "bg-secondary-500",
  deferred: "bg-secondary-500",
  disabled: "bg-secondary-500",
  ceased: "bg-secondary-500",
  cancelled: "bg-secondary-500",
  other: "bg-secondary-500",
};

export function ScriptDetail(props: ScriptDetailProps) {
  const { script } = props;
  const router = useRouter();
  const showHidden = useShowHidden();
  const tokenOnly = props.details === undefined;
  const [hidden, setHidden] = useState(script.hidden);
  const [archived, setArchived] = useState(props.archived ?? false);
  const [deleting, setDeleting] = useState<{
    busy: boolean;
    error?: string;
  } | null>(null);
  const [notice, showNotice] = useState<Notice | null>(null);

  async function changeHidden(next: boolean) {
    showNotice(null);
    setHidden(next);
    try {
      await setScriptHidden(script.id, next);
      router.refresh();
    } catch (e) {
      setHidden(!next);
      showNotice({
        text: errorText(
          e,
          next ? "Could not hide the script" : "Could not show the script",
        ),
        error: true,
      });
    }
  }
  const visibility = useHideConfirm((next) => void changeHidden(next));

  async function changeArchived(next: boolean) {
    setArchived(next);
    showNotice({
      text: next
        ? "Archived. You’ll find it under Filters › Archived in My Scripts."
        : "Unarchived. It’s back in your list.",
    });
    try {
      await setScriptArchived(script.id, next);
      router.refresh();
    } catch (e) {
      setArchived(!next);
      showNotice({
        text: errorText(e, "Could not archive the script"),
        error: true,
      });
    }
  }

  async function share() {
    if (props.details) showNotice(await shareScript(props.script));
  }

  async function remove() {
    setDeleting({ busy: true });
    try {
      await deleteScript(script.id);
    } catch (e) {
      setDeleting({
        busy: false,
        error: errorText(e, "Could not delete the script"),
      });
      return;
    }
    router.push("/scripts");
    router.refresh();
  }

  const showSchedule = showHidden && !tokenOnly;

  return (
    <>
      <div className={SCRIPT_DETAIL_COLUMN}>
        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-9 lg:flex-row lg:items-start lg:gap-4">
            <div className="flex min-w-0 flex-1 items-start gap-4">
              <div className="py-1">
                <BackCircle href="/scripts" label="Back to My Scripts" />
              </div>
              <div className="flex min-h-14 min-w-0 flex-1 flex-col justify-center lg:min-h-16">
                <h1
                  className={cn(
                    "text-h4-24 text-secondary-900 lg:text-display-32",
                    tokenOnly && "break-all",
                  )}
                >
                  {props.details ? props.script.name : script.token}
                </h1>
                {script.secure ? (
                  <p className="flex items-center gap-2 text-body-16 text-secondary-300">
                    <SecurityShield className="size-4 text-success-500" />
                    Synced with official ASL registry
                  </p>
                ) : (
                  <p className="text-body-16 text-secondary-300">
                    Manual script
                  </p>
                )}
                {notice && <NoticeLine notice={notice} />}
              </div>
            </div>

            <div
              className={cn(
                "flex items-center gap-3",
                showSchedule ? "justify-between" : "justify-end",
              )}
            >
              {showSchedule && (
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="w-[140.5px] px-[23px] py-[15px] lg:w-auto"
                >
                  <Link href={scheduleHref(script.id)}>Schedule</Link>
                </Button>
              )}
              <ScriptActionsMenu
                dark
                tokenOnly={tokenOnly}
                hidden={hidden}
                archived={archived}
                canHide={script.canHide}
                canDelete={script.canDelete}
                scheduleHref={scheduleHref(script.id)}
                onSetHidden={visibility.request}
                onSetArchived={(next) => void changeArchived(next)}
                onShare={() => void share()}
                onDelete={() => setDeleting({ busy: false })}
                triggerClassName="flex size-14 shrink-0 items-center justify-center rounded-card border border-secondary-500 bg-white text-secondary-500 transition-colors hover:bg-secondary-500/5"
              />
            </div>
          </div>

          {props.details ? (
            <MedicationCards
              script={props.script}
              details={props.details}
              qr={props.qr}
              hidden={hidden}
            />
          ) : (
            <TokenCards script={script} hidden={hidden} />
          )}
        </div>
      </div>

      {visibility.dialog}
      {deleting && (
        <DeleteScriptModal
          busy={deleting.busy}
          error={deleting.error}
          onConfirm={() => void remove()}
          onClose={() => setDeleting(null)}
        />
      )}
    </>
  );
}

function TokenCards({ script, hidden }: { script: Script; hidden: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHead
          icon={DETAIL_ICON.information}
          title="Information"
          titleClassName="text-neutral-900"
          right={<StatusBadge script={script} />}
        />
        {script.addedOn && (
          <div className="flex gap-4">
            <InfoDate label="Date Added:" value={script.addedOn} />
          </div>
        )}
        {hidden && <HiddenBanner />}
      </Card>
    </div>
  );
}

function MedicationCards({
  script,
  details,
  qr,
  hidden,
}: {
  script: MedicationScript;
  details: ScriptDetails;
  qr: QrCode;
  hidden: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Card className="items-center">
        <div className="flex w-[183px] flex-col gap-2">
          <div className="rounded-card bg-white p-4 shadow-[0_0_0_6px_rgb(38_157_249/0.15)]">
            <svg
              role="img"
              aria-label="Digital prescription QR code"
              viewBox={`0 0 ${qr.size} ${qr.size}`}
              shapeRendering="crispEdges"
              className="h-[149px] w-[151px]"
            >
              <path d={qr.path} fill="#000" />
            </svg>
          </div>
          <div className="flex w-[171px] flex-col items-center gap-2 text-center text-secondary-500">
            <span className="h-[18px] text-[10px] leading-[17.5px] tracking-[-0.018px]">
              QR Code for Digital Prescription
            </span>
            <span className="h-[14px] text-[12px] leading-[14.4px] tracking-[0.092px] whitespace-nowrap">
              Token: {script.token}
            </span>
          </div>
        </div>
        {hidden && <HiddenBanner />}
      </Card>

      <Card>
        <CardHead
          icon={DETAIL_ICON.tablet}
          title={details.form}
          right={<StatusBadge script={script} />}
        />
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Supplies Left:" value={details.suppliesLeft} />
          <Stat label="Total Quantity:" value={details.quantity} />
          <Stat label="Strength:" value={details.strength} />
          <Stat label="Route:" value={details.route} />
        </div>
      </Card>

      <PersonalNotes
        scriptId={script.id}
        tags={script.tags}
        initial={details.personalNotes}
      />

      <Card>
        <CardHead icon={DETAIL_ICON.doctorNotes} title="Doctor’s Notes" />
        <div className="flex flex-col gap-0.5 text-body-14 whitespace-pre-wrap text-secondary-900">
          {lines(details.doctorNotes, "—").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </Card>

      <Card>
        <CardHead
          icon={DETAIL_ICON.information}
          title="Information"
          titleClassName="text-neutral-900"
        />
        <div className="flex flex-col gap-1 text-body-14">
          <span className="text-secondary-300">Prescribed By:</span>
          <div className="flex flex-col">
            <span className="text-neutral-900">{details.prescriber}</span>
            {details.clinic && (
              <span className="text-secondary-300">{details.clinic}</span>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <InfoDate label="Issue Date:" value={details.issueDate} />
          <InfoDate label="Expiry Date:" value={details.expiryDate} />
        </div>
      </Card>
    </div>
  );
}

const lines = (text: string | null, empty?: string) => {
  const list = (text ?? "").split("\n").filter((line) => line.trim());
  return list.length || !empty ? list : [empty];
};

function PersonalNotes({
  scriptId,
  tags,
  initial,
}: {
  scriptId: string;
  tags: string[];
  initial: string | null;
}) {
  const router = useRouter();
  const [notes, setNotes] = useState(initial ?? "");
  const [draft, setDraft] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);

  async function save() {
    if (draft === null) return;
    setSaving(true);
    setError(null);
    try {
      await saveNotes(scriptId, draft);
      setNotes(draft.trim());
      setDraft(null);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save the notes");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardHead
        icon={DETAIL_ICON.personalNotes}
        title="Personal Notes"
        right={
          <button
            type="button"
            aria-label="Edit notes"
            aria-expanded={draft !== null}
            onClick={() => {
              if (draft !== null) {
                textarea.current?.focus();
                return;
              }
              setDraft(notes);
              setError(null);
            }}
            className="flex size-14 items-center justify-center rounded-card transition-colors hover:bg-bg-app"
          >
            <Icon src={DETAIL_ICON.edit} size={24} />
          </button>
        }
      />
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="rounded-[15px] bg-primary-500/20 px-2 py-1 text-caption-12-bold text-primary-500"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {draft === null ? (
        lines(notes).length > 0 && (
          <div className="flex flex-col gap-4 text-body-14 text-secondary-900">
            {lines(notes).map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <textarea
              ref={textarea}
              aria-label="Personal notes"
              value={draft}
              maxLength={NOTES_MAX}
              rows={4}
              autoFocus
              aria-invalid={Boolean(error)}
              onChange={(event) => setDraft(event.target.value)}
              className="flex w-full resize-y rounded-control border border-input bg-white px-[11px] py-[15px] text-body-16-bold text-secondary-900 transition-colors outline-none placeholder:font-normal placeholder:text-[#9EB6C9] focus-visible:border-info-500 focus-visible:ring-2 focus-visible:ring-info-500/30 aria-invalid:border-error-500"
            />
            {error && (
              <p role="alert" className="text-caption-12 text-error-500">
                {error}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              disabled={saving}
              onClick={() => {
                setDraft(null);
                setError(null);
              }}
            >
              Cancel
            </Button>
            <Button type="button" disabled={saving} onClick={() => void save()}>
              Save
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

function StatusBadge({ script }: { script: Script }) {
  return (
    <span
      className={cn(
        "rounded-[5px] p-1 text-caption-12-bold text-white",
        STATUS_BADGE[script.status],
      )}
    >
      {statusLabel(script)}
    </span>
  );
}

function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[15px] rounded-card border border-[#E5E7EB] bg-white p-[23px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function CardHead({
  icon,
  title,
  titleClassName = "text-secondary-500",
  right,
}: {
  icon: string;
  title: string;
  titleClassName?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Icon src={icon} size={44} />
        <h2 className={cn("text-body-16-bold", titleClassName)}>{title}</h2>
      </div>
      {right}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-[6px] border border-neutral-300 bg-bg-app px-3 py-4 text-secondary-500">
      <span className="text-caption-12">{label}</span>
      <span className="text-body-14 font-bold">{value}</span>
    </div>
  );
}

function InfoDate({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-1 flex-col gap-1 text-body-14">
      <span className="text-secondary-300">{label}</span>
      <span className="text-neutral-900">{value}</span>
    </div>
  );
}
