"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  useRehydrateSchedules,
  useScheduleStore,
} from "@/features/scheduler/model/store";
import { cn } from "@/lib/utils";

import { CloseBar } from "./dialog-header";
import {
  dayHref,
  sideEffectsHref,
  today,
  vitalsHref,
  type DoseRef,
} from "./format";
import { LogDialog } from "./log-dialog";
import { LogDialogSkeleton } from "./log-skeleton";
import { useHydrated } from "./use-client-state";

const ICONS = "/icons/compliance/log";

function heading(dose: DoseRef, name: string) {
  if (dose.sideEffects)
    return {
      title: "Side Effects Reported!",
      text: "Your information has been recorded",
    };
  if (dose.vitals)
    return {
      title: "Vitals Reported!",
      text: "Your information has been recorded",
    };
  return { title: "Great job!", text: `${name} marked as taken` };
}

export function DoseTaken({ dose }: { dose: DoseRef }) {
  const router = useRouter();
  useRehydrateSchedules();
  const hydrated = useHydrated(useScheduleStore);
  const schedule = useScheduleStore((s) =>
    s.schedules.find((item) => item.id === dose.schedule),
  );

  const date = dose.date || today();
  const missing = hydrated && !schedule;
  useEffect(() => {
    if (missing) router.replace(dayHref(date));
  }, [missing, router, date]);

  if (!hydrated) return <LogDialogSkeleton step="taken" />;
  if (!schedule) return null;

  const ref = { ...dose, date };
  const { title, text } = heading(dose, schedule.name);
  const close = () => router.push(dayHref(date));

  return (
    <LogDialog label={title} onClose={close}>
      <CloseBar onClose={close} />
      <div className="flex flex-col gap-12 px-6 pt-6 pb-9">
        <div className="flex flex-col items-center gap-2 text-center">
          <Icon src={`${ICONS}/tick-circle.svg`} size={100} />
          <h2 className="text-h4-24 text-secondary-900">{title}</h2>
          <p className="text-body-16 text-secondary-900">{text}</p>
        </div>

        <div className="flex flex-col gap-4 rounded-[20px] bg-bg-app p-4">
          <p className="text-center text-body-16-bold text-secondary-900">
            Would you like to add any additional information?
          </p>
          <div className="flex flex-col gap-2">
            <FollowUp
              done={dose.sideEffects}
              href={sideEffectsHref(ref)}
              icon="info.svg"
              tint="bg-primary-500/20"
              title="Report Side Effects"
              text="Track any reactions"
              doneTitle="Side Effects Reported"
            />
            <FollowUp
              done={dose.vitals}
              href={vitalsHref(ref)}
              icon="heart.svg"
              tint="bg-[#D04C41]/20"
              title="Record Vitals"
              text="Log your measurements"
              doneTitle="Vitals Reported"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={close}
          >
            {dose.sideEffects && dose.vitals ? "Done" : "No, I’m Done"}
          </Button>
          <p className="max-w-[267px] text-center text-caption-12 text-neutral-700">
            You can always add this information later from the medication
            details.
          </p>
        </div>
      </div>
    </LogDialog>
  );
}

function FollowUp({
  done,
  href,
  icon,
  tint,
  title,
  text,
  doneTitle,
}: {
  done?: boolean;
  href: string;
  icon: string;
  tint: string;
  title: string;
  text: string;
  doneTitle: string;
}) {
  const content = (
    <>
      <span className="flex py-1">
        <span
          className={cn(
            "flex size-11 items-center justify-center rounded-control",
            done ? "bg-success-500/20" : tint,
          )}
        >
          {done ? (
            <Icon src={`${ICONS}/check.svg`} size={22} />
          ) : (
            <Icon src={`${ICONS}/${icon}`} size={24} />
          )}
        </span>
      </span>
      <span
        className={cn(
          "flex min-w-0 flex-1 flex-col",
          done ? "text-success-500" : "text-secondary-900",
        )}
      >
        <span className="text-body-16-bold">{done ? doneTitle : title}</span>
        <span className={cn("text-body-14", !done && "text-secondary-300")}>
          {done ? "Already Completed" : text}
        </span>
      </span>
      {!done && (
        <Icon
          src={`${ICONS}/chevron-right.svg`}
          size={24}
          className="self-center"
        />
      )}
    </>
  );

  const box = "flex gap-2 rounded-card border bg-white p-[15px]";
  if (done) {
    return <div className={cn(box, "border-success-500")}>{content}</div>;
  }
  return (
    <Link
      href={href}
      className={cn(
        box,
        "border-neutral-300 transition-colors hover:bg-bg-section",
      )}
    >
      {content}
    </Link>
  );
}
