import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  dayOfMonth,
  monthYear,
  stripDays,
  weekday,
  WEEKDAYS,
  weekDays,
} from "./calendar";
import { schedulerHref } from "./links";

const NUMBER = "text-[16px]/[27px] font-medium";
const NAME = "text-[10px]/[12px]";
const SELECTED_TEXT = "font-bold text-info-500";
const SELECTED_NUMBER = "font-extrabold text-info-500";

const STRIP =
  "border border-transparent [background:linear-gradient(90deg,#F5F7FA_0%,rgb(237.4_241.4_247.2)_20%,rgb(237.4_241.4_247.2)_75%,#F5F7FA_100%)_padding-box,linear-gradient(90deg,#F5F7FA_17.87%,#269DF9_43.92%,#269DF9_64.25%,#F5F7FA_88.28%)_border-box]";

function MonthYear({ date, className }: { date: string; className?: string }) {
  const [month, year] = monthYear(date);
  return (
    <span
      className={cn(
        "flex h-12 w-[42.9px] shrink-0 flex-col items-center justify-center text-secondary-900 opacity-50 lg:hidden",
        className,
      )}
    >
      <span className={NUMBER}>{month}</span>
      <span className={NAME}>{year}</span>
    </span>
  );
}

export function DayStrip({ date }: { date: string }) {
  return (
    <div className="mt-6 mb-[34px] flex items-start gap-[8.1px] lg:mb-6">
      <MonthYear date={date} className="-mt-px" />
      <div className={cn("flex h-12 flex-1 rounded-[20px]", STRIP)}>
        <div className="-m-px grid h-12 flex-1 grid-cols-3 gap-1">
          {stripDays(date).map((day) => {
            const selected = day === date;
            const className = cn(
              "flex h-12 min-w-0 flex-col items-center justify-center text-secondary-900",
              selected
                ? "rounded-control border border-primary-500 bg-primary-500/10"
                : "opacity-50 transition-opacity hover:opacity-80",
            );
            const label = (
              <>
                <span className={cn(NUMBER, selected && SELECTED_NUMBER)}>
                  {dayOfMonth(day)}
                </span>
                <span className={cn(NAME, selected && SELECTED_TEXT)}>
                  {WEEKDAYS[weekday(day)]}
                </span>
              </>
            );
            return selected ? (
              <span key={day} aria-current="date" className={className}>
                {label}
              </span>
            ) : (
              <Link
                key={day}
                href={schedulerHref("day", day)}
                className={className}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const FADE = [
  "opacity-30",
  "opacity-50",
  "",
  "",
  "",
  "opacity-50",
  "opacity-30",
];

export function WeekHeader({ date }: { date: string }) {
  return (
    <div className="mt-[15px] mb-[27px] flex items-start gap-[8.1px] lg:my-6 lg:pl-[27px]">
      <MonthYear date={date} className="mt-2" />
      <div className="flex h-16 items-center gap-1 lg:grid lg:flex-1 lg:grid-cols-7">
        {weekDays(date).map((day, i) => {
          const selected = day === date;
          return (
            <Link
              key={day}
              href={schedulerHref("day", day)}
              aria-current={selected ? "date" : undefined}
              className={cn(
                "flex h-12 w-[42.9px] shrink-0 flex-col items-center justify-center text-secondary-900 transition-opacity lg:w-auto lg:opacity-100",
                selected
                  ? "h-14 rounded-[10px] border border-info-500 bg-primary-500/10"
                  : cn(FADE[i], "hover:opacity-80"),
              )}
            >
              <span className={cn(NUMBER, selected && SELECTED_NUMBER)}>
                {dayOfMonth(day)}
              </span>
              <span className={cn(NAME, selected && SELECTED_TEXT)}>
                {WEEKDAYS[weekday(day)]}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function MonthHeader({ date }: { date: string }) {
  const selected = weekday(date);
  return (
    <div className="mt-[15px] mr-[2px] mb-6 ml-[3px] grid h-16 grid-cols-7 items-center gap-1 lg:mx-0 lg:mt-6">
      {WEEKDAYS.map((name, i) => (
        <span
          key={name}
          className={cn(
            "flex h-12 min-w-0 items-center justify-center text-secondary-900",
            NAME,
            i === selected &&
              cn(
                "h-14 rounded-[10px] border border-info-500 bg-primary-500/10",
                SELECTED_TEXT,
              ),
          )}
        >
          {name}
        </span>
      ))}
    </div>
  );
}
