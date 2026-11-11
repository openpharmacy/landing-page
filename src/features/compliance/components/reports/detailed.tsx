import type { ComplianceReport } from "@/features/compliance/model/report";
import { cn } from "@/lib/utils";

import { MissedDoseAlert } from "./missed-dose-alert";
import { percentColour } from "./overview";
import { CARD, Meter, SectionHeader } from "./ui";

const doseColour = (share: number) => (share >= 0.8 ? "#2ECC71" : "#F39C12");

export function Detailed({ report }: { report: ComplianceReport }) {
  return (
    <div className="flex flex-col gap-6">
      {report.missedDose && (
        <MissedDoseAlert alert={report.missedDose} className="max-lg:hidden" />
      )}
      <section className="flex flex-col gap-4">
        <SectionHeader title={report.breakdownTitle} />
        {report.breakdown.length === 0 && (
          <p className="text-body-14 text-secondary-300">{report.emptyText}</p>
        )}
        <ul className="flex flex-col gap-3 empty:hidden">
          {report.breakdown.map((period) => {
            const taken = period.medications.reduce((n, m) => n + m.taken, 0);
            const total = period.medications.reduce((n, m) => n + m.total, 0);
            return (
              <li
                key={period.title}
                className={cn(CARD, "flex flex-col gap-4 p-[15px]")}
              >
                <div className="flex items-center justify-between gap-1">
                  <div className="flex flex-col">
                    <div className="flex h-6 items-center gap-2">
                      <h3 className="text-body-16-bold text-secondary-900">
                        {period.title}
                      </h3>
                      {period.dates && (
                        <>
                          <span className="size-1 rounded-full bg-secondary-300" />
                          <span className="text-caption-12-bold text-secondary-300">
                            {period.dates}
                          </span>
                        </>
                      )}
                    </div>
                    <span className="text-caption-12-bold text-secondary-300">
                      {taken} of {total} doses taken
                    </span>
                  </div>
                  <span
                    className="text-body-14"
                    style={{ color: percentColour(period.percent) }}
                  >
                    {period.percent}%
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {period.medications.map((dose) => {
                    const share = dose.total ? dose.taken / dose.total : 0;
                    return (
                      <div
                        key={dose.medication}
                        className="flex items-center gap-2"
                      >
                        <div className="flex min-w-0 flex-1 flex-col">
                          <span className="text-body-14 font-bold text-secondary-900">
                            {dose.medication}
                          </span>
                          <span className="text-caption-12 text-secondary-300">
                            {dose.taken}/{dose.total} doses
                          </span>
                        </div>
                        <Meter
                          share={share}
                          color={doseColour(share)}
                          className="w-[100px] lg:w-[200px]"
                        />
                      </div>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
