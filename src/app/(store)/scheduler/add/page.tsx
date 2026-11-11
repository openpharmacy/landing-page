import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { AddMedicationFlow } from "@/features/scheduler/components/add/add-medication-flow";
import {
  parseDate,
  parseScheduleId,
  parseScriptId,
  parseTime,
} from "@/features/scheduler/components/add/draft";
import { pickableScripts } from "@/features/scheduler/components/add/existing-scripts";
import { SchedulerScreen } from "@/features/scheduler/components/views/scheduler-screen";
import { scriptsForPage } from "@/features/scripts/model/load";
import { getServerSession } from "@/lib/auth/get-session";
import { showHiddenScreens } from "@/lib/features";

export const metadata: Metadata = { title: "Add Medication · Open Pharmacy" };

export default async function AddMedicationPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!(await showHiddenScreens())) notFound();
  const params = await searchParams;
  const date = parseDate(first(params.date));
  const time = parseTime(first(params.time));
  const script = parseScriptId(first(params.script));
  const edit = parseScheduleId(first(params.edit));

  const query = new URLSearchParams();
  if (date) query.set("date", date);
  if (time) query.set("time", time);
  if (script) query.set("script", script);
  if (edit) query.set("edit", edit);
  const path = `/scheduler/add${query.size ? `?${query}` : ""}`;

  if (!(await getServerSession())) {
    redirect(`/sign-in?next=${encodeURIComponent(path)}`);
  }
  const { scripts } = edit ? { scripts: null } : await scriptsForPage(path);
  return (
    <>
      <div className="max-lg:hidden" inert>
        <SchedulerScreen view="week" />
      </div>
      <AddMedicationFlow
        scripts={pickableScripts(scripts?.scripts ?? [])}
        date={date}
        time={time}
        script={script}
        edit={edit}
      />
    </>
  );
}

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
