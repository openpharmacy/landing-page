import type { SeverityTrend } from "@/features/compliance/model/report";
import type { Symptom } from "@/features/compliance/model/side-effects";
import { cn } from "@/lib/utils";

const LEVELS = ["0", "Mild", "Moderate", "Severe"];

export const SYMPTOM_COLOURS: Record<Symptom, { line: string; phone: string }> =
  {
    Nausea: { line: "#EC4899", phone: "#FF67B2" },
    Headache: { line: "#8B5CF6", phone: "#9569FA" },
    Dizziness: { line: "#60B257", phone: "#49C13C" },
    Fatigue: { line: "#F59E0B", phone: "#F59E0B" },
    "Stomach Pain": { line: "#06B6D4", phone: "#06B6D4" },
    "Skin Rash": { line: "#EF4444", phone: "#EF4444" },
    "Dry Mouth": { line: "#84CC16", phone: "#84CC16" },
    Insomnia: { line: "#6366F1", phone: "#6366F1" },
    Drowsiness: { line: "#F97316", phone: "#F97316" },
    Anxiety: { line: "#10B981", phone: "#10B981" },
  };

type Layout = {
  width: number;
  lastX: number;
  gridRight: number;
  grid: string;
  text: string;
  phone: boolean;
};

const DESKTOP: Layout = {
  width: 822,
  lastX: 758,
  gridRight: 814.4,
  grid: "#929292",
  text: "#2F5069",
  phone: false,
};
const PHONE: Layout = {
  width: 345,
  lastX: 326.5,
  gridRight: 339.4,
  grid: "#D1D7DE",
  text: "#18222B",
  phone: true,
};

const AXIS_X = 57.4;
const FIRST_X = 57.5;
const levelY = (level: number) => 176 - 40 * level;

function monotonePath(points: [number, number][]) {
  const n = points.length;
  if (n === 0) return "";
  const [x0, y0] = points[0];
  if (n === 1) return `M${x0},${y0}`;
  if (n === 2) return `M${x0},${y0}L${points[1][0]},${points[1][1]}`;

  const sign = (v: number) => (v < 0 ? -1 : 1);
  const slopes = points
    .slice(1)
    .map(([x, y], i) => (y - points[i][1]) / (x - points[i][0]));
  const tangents = points.map((_, i) => {
    if (i === 0 || i === n - 1) return 0;
    const h0 = points[i][0] - points[i - 1][0];
    const h1 = points[i + 1][0] - points[i][0];
    const s0 = slopes[i - 1];
    const s1 = slopes[i];
    const p = (s0 * h1 + s1 * h0) / (h0 + h1);
    return (
      (sign(s0) + sign(s1)) *
        Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0
    );
  });
  tangents[0] = (3 * slopes[0] - tangents[1]) / 2;
  tangents[n - 1] = (3 * slopes[n - 2] - tangents[n - 2]) / 2;

  let d = `M${x0},${y0}`;
  for (let i = 0; i < n - 1; i++) {
    const [xa, ya] = points[i];
    const [xb, yb] = points[i + 1];
    const dx = Math.min(16, (xb - xa) / 3);
    d += `C${xa + dx},${ya + dx * tangents[i]},${xb - dx},${yb - dx * tangents[i + 1]},${xb},${yb}`;
  }
  return d;
}

function Chart({ trend, layout }: { trend: SeverityTrend; layout: Layout }) {
  const count = trend.labels.length;
  const step = count > 1 ? (layout.lastX - FIRST_X) / (count - 1) : 0;
  const xs = trend.labels.map((_, i) => FIRST_X + step * i);

  return (
    <svg
      viewBox={`0 0.5 ${layout.width} 259`}
      className={cn(
        "block",
        layout.phone ? "w-full lg:hidden" : "max-lg:hidden",
      )}
      width={layout.phone ? undefined : layout.width}
      role="img"
      aria-label="Side-effect severity over time"
    >
      <g stroke={layout.grid} strokeWidth={1}>
        {[0, 1, 2, 3, 4].map((level) => (
          <line
            key={level}
            x1={AXIS_X}
            x2={layout.gridRight}
            y1={levelY(level)}
            y2={levelY(level)}
            strokeDasharray="3 3"
            strokeDashoffset={1.5}
          />
        ))}
        {xs.slice(1).map((x) => (
          <line
            key={x}
            x1={x}
            x2={x}
            y1={16.5}
            y2={176.5}
            strokeDasharray="3 3"
            strokeDashoffset={1.5}
          />
        ))}
        <line x1={AXIS_X} x2={layout.gridRight} y1={176.5} y2={176.5} />
        {xs.slice(1).map((x) => (
          <line key={x} x1={x} x2={x} y1={176.5} y2={182.5} />
        ))}
        <line x1={AXIS_X} x2={AXIS_X} y1={16} y2={182.2} />
        {[0, 1, 2, 3, 4].map((level) => (
          <line
            key={level}
            x1={51}
            x2={AXIS_X}
            y1={levelY(level)}
            y2={levelY(level)}
          />
        ))}
      </g>

      {trend.series.map((series) => (
        <path
          key={series.symptom}
          d={monotonePath(
            series.levels.map((level, i) => [xs[i], levelY(level)]),
          )}
          fill="none"
          stroke={
            layout.phone
              ? SYMPTOM_COLOURS[series.symptom].phone
              : SYMPTOM_COLOURS[series.symptom].line
          }
          strokeWidth={2.5}
        />
      ))}

      <g fill={layout.text} className="font-brand">
        {LEVELS.map((label, level) => (
          <text
            key={label}
            x={44.7}
            y={levelY(level) + (level === 0 ? 3.35 : 0.6)}
            fontSize={level === 0 ? 11 : 8}
            textAnchor="end"
          >
            {label}
          </text>
        ))}
        {trend.labels.map((label, i) => (
          <text
            key={label}
            x={xs[i]}
            y={194.3}
            fontSize={9}
            textAnchor="middle"
          >
            {label}
          </text>
        ))}
      </g>
    </svg>
  );
}

export function SeverityChart({ trend }: { trend: SeverityTrend }) {
  return (
    <div className="-mx-2 h-[259px] lg:mx-0">
      <div className="relative">
        <Chart trend={trend} layout={PHONE} />
        <Chart trend={trend} layout={DESKTOP} />
        <ul className="absolute top-[226.4px] right-0 left-4 flex flex-wrap justify-center gap-x-4 gap-y-1 px-[34px] lg:right-auto lg:w-[329px]">
          {trend.series.map(({ symptom }) => (
            <li
              key={symptom}
              className="flex items-center gap-2 font-brand text-[12px] leading-4 whitespace-nowrap text-secondary-900 lg:text-secondary-500"
            >
              <span
                className="h-0.5 w-4"
                style={{ backgroundColor: SYMPTOM_COLOURS[symptom].line }}
              />
              {symptom}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
