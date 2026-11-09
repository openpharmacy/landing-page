import { AddMedicationSkeleton } from "@/features/scheduler/components/add/flow-skeleton";
import { SchedulerScreen } from "@/features/scheduler/components/views/scheduler-screen";

export default function Loading() {
  return (
    <>
      <div className="max-lg:hidden" inert>
        <SchedulerScreen view="week" />
      </div>
      <AddMedicationSkeleton />
    </>
  );
}
