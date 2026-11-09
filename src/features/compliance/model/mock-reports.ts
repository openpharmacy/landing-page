import type {
  Achievement,
  ComplianceReport,
  InsightsData,
  Range,
  SeverityTrend,
  SideEffectSummary,
  TrendInsight,
  TrendRange,
  VitalSummary,
} from "./report";

const doses = (metformin: [number, number], amlodipine: [number, number]) => [
  { medication: "Metformin", taken: metformin[0], total: metformin[1] },
  { medication: "Amlodipine", taken: amlodipine[0], total: amlodipine[1] },
];

type DrawnReport = Omit<
  ComplianceReport,
  "missedDose" | "trendInsights" | "insights" | "achievements" | "emptyText"
> & { missedDoseAlert: boolean };

const DRAWN: Record<Range, DrawnReport> = {
  "7d": {
    missedDoseAlert: true,
    streakDays: 1,
    dosesTaken: 19,
    dosesMissed: 2,
    progress: [
      { label: "Sun", percent: 100 },
      { label: "Sat", percent: 67 },
      { label: "Fri", percent: 100 },
      { label: "Thu", percent: 100 },
      { label: "Wed", percent: 67 },
      { label: "Tue", percent: 100 },
      { label: "Mon", percent: 100 },
    ],
    breakdownTitle: "Daily Breakdown",
    breakdown: [
      { title: "Sun, Sep 8", percent: 100, medications: doses([2, 2], [1, 1]) },
      { title: "Sat, Sep 7", percent: 67, medications: doses([1, 2], [1, 1]) },
      { title: "Thu, Sep 5", percent: 100, medications: doses([2, 2], [1, 1]) },
      { title: "Wed, Sep 4", percent: 100, medications: doses([2, 2], [1, 1]) },
      { title: "Tue, Sep 3", percent: 67, medications: doses([1, 2], [1, 1]) },
    ],
    trend: [
      { label: "Mon", percent: 100 },
      { label: "Tue", percent: 76 },
      { label: "Wed", percent: 30 },
      { label: "Thu", percent: 73 },
      { label: "Fri", percent: 50 },
      { label: "Sat", percent: 100 },
      { label: "Sun", percent: 100 },
    ],
  },
  "30d": {
    missedDoseAlert: false,
    streakDays: 6,
    dosesTaken: 84,
    dosesMissed: 13,
    progress: [
      { label: "Week 5", dates: "Sep 29-30", percent: 100 },
      { label: "Week 4", dates: "Sep 22-28", percent: 100 },
      { label: "Week 3", dates: "Sep15-21", percent: 67 },
      { label: "Week 2", dates: "Sep 8-14", percent: 100 },
      { label: "Week 1", dates: "Sep 1-7", percent: 100 },
    ],
    breakdownTitle: "Weekly Breakdown",
    breakdown: [
      {
        title: "Week 5",
        dates: "Sep 29-30",
        percent: 94,
        medications: doses([7, 8], [6, 6]),
      },
      {
        title: "Week 4",
        dates: "Sep 22-28",
        percent: 73,
        medications: doses([8, 12], [6, 7]),
      },
      {
        title: "Week 3",
        dates: "Sep 15-21",
        percent: 94,
        medications: doses([7, 8], [6, 6]),
      },
      {
        title: "Week 2",
        dates: "Sep 8-14",
        percent: 94,
        medications: doses([7, 8], [6, 6]),
      },
      {
        title: "Week 1",
        dates: "Sep 1-7",
        percent: 94,
        medications: doses([7, 8], [6, 6]),
      },
    ],
    trend: [
      { label: "Week 1", dates: "Sep 1-7", percent: 100 },
      { label: "Week 2", dates: "Sep 8-14", percent: 76 },
      { label: "Week 3", dates: "Sep15-21", percent: 30 },
      { label: "Week 4", dates: "Sep 22-28", percent: 73 },
      { label: "Week 5", dates: "Sep 29-30", percent: 100 },
    ],
  },
  "90d": {
    missedDoseAlert: false,
    streakDays: 12,
    dosesTaken: 234,
    dosesMissed: 51,
    progress: [
      { label: "Sep", dates: "Sep 1 - Sep 30", percent: 100 },
      { label: "Aug", dates: "Aug 1 - Aug 31", percent: 100 },
      { label: "Jul", dates: "Jul 1 - Jul 31", percent: 78 },
    ],
    breakdownTitle: "Monthly Breakdown",
    breakdown: [
      {
        title: "September 2026",
        dates: "Sep 1 -Sep 30",
        percent: 82,
        medications: doses([26, 30], [28, 30]),
      },
      {
        title: "August 2026",
        dates: "Aug 1 - Aug 31",
        percent: 82,
        medications: doses([26, 30], [28, 30]),
      },
      {
        title: "July 2026",
        dates: "Jul 1 -Jul 30",
        percent: 82,
        medications: doses([26, 30], [28, 30]),
      },
    ],
    trend: [
      { label: "Jul", dates: "Jul 1- Jul 31", percent: 100 },
      { label: "Aug", dates: "Aug 1 -Aug 31", percent: 76 },
      { label: "Sep", dates: "Sep 1 - Sep 30", percent: 30 },
    ],
  },
};

export type RefillCardData = {
  name: string;
  runsOut: string;
  pillsLeft: number;
  perDay: number;
  supply: number;
  timeLeft: string;
  expiringSoon: boolean;
  expires: string;
};

export const MOCK_REFILLS: RefillCardData[] = [
  {
    name: "Metformin 500mg",
    runsOut: "Estimated to run out in 6 days",
    pillsLeft: 12,
    perDay: 2,
    supply: 90 / 207,
    timeLeft: "7 days left",
    expiringSoon: true,
    expires: "Expires Oct 20",
  },
  {
    name: "Panadol 500mg",
    runsOut: "Estimated to run out in 6 days",
    pillsLeft: 12,
    perDay: 2,
    supply: 90 / 207,
    timeLeft: "6 months left",
    expiringSoon: false,
    expires: "Expires Oct 20",
  },
  {
    name: "Panadol 500mg",
    runsOut: "Estimated to run out in 6 days",
    pillsLeft: 12,
    perDay: 2,
    supply: 90 / 207,
    timeLeft: "6 months left",
    expiringSoon: false,
    expires: "Expires Oct 20",
  },
];

export const MOCK_SIDE_EFFECT_SUMMARY: SideEffectSummary[] = [
  {
    date: "Sun, Sep 8",
    medication: "Metformin",
    symptoms: [
      { symptom: "Nausea", tone: "moderate" },
      { symptom: "Headache", tone: "moderate" },
    ],
    note: "Felt worse in the morning",
  },
  {
    date: "Fri, Sep 6",
    medication: "Amlodipine",
    symptoms: [{ symptom: "Dizziness", tone: "mild" }],
    note: "Felt worse in the morning",
  },
  {
    date: "Fri, Sep 6",
    medication: "Amlodipine",
    symptoms: [{ symptom: "Dizziness", tone: "mild" }],
    note: "Felt worse in the morning",
  },
];

export const MOCK_VITAL_SUMMARY: VitalSummary[] = [
  {
    kind: "bloodPressure",
    when: "Today",
    title: "Blood Pressure",
    reading: "128/82 mmHg • Normal",
    normal: true,
    after: "After Amlodipine 5mg",
  },
  {
    kind: "heartRate",
    when: "Today",
    title: "Heart Rate",
    reading: "72 bpm • Healthy",
    normal: true,
    after: "After Metformin 500mg",
  },
  {
    kind: "heartRate",
    when: "Today",
    title: "Heart Rate",
    reading: "72 bpm • Healthy",
    normal: true,
    after: "After Metformin 500mg",
  },
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    kind: "perfectWeek",
    title: "Perfect Week",
    text: "100% compliance for 7 days",
    earned: true,
  },
  {
    kind: "consistency",
    title: "Consistency Champion",
    text: "Never missed more than 1 dose in a week",
    earned: true,
  },
];

export const MOCK_TREND_INSIGHTS: TrendInsight[] = [
  {
    kind: "improving",
    title: "Improving Trend",
    text: "Your compliance has improved by 12% over the last 7 days.",
  },
  {
    kind: "bestTime",
    title: "Best Time",
    text: "You're most consistent with morning doses (95% compliance).",
  },
  {
    kind: "opportunity",
    title: "Opportunity",
    text: "Evening doses are missed more often. Consider setting a reminder.",
  },
];

export const MOCK_INSIGHTS: InsightsData = {
  highRiskTimes: ["Evening (6-9 PM)", "Late Night (9-12 PM)"],
  highRiskText: "You're more likely to miss doses during these times",
  mostMissed: [
    { medication: "Metformin", text: "8 missed in last 30 days", share: 0.83 },
    { medication: "Amlodipine", text: "3 missed in last 30 days", share: 0.28 },
  ],
  byTimeOfDay: [
    { label: "6AM", missed: 2 },
    { label: "9AM", missed: 1 },
    { label: "12AM", missed: 0 },
    { label: "3PM", missed: 1 },
    { label: "6PM", missed: 5 },
    { label: "9PM", missed: 7 },
    { label: "12AM", missed: 3 },
  ],
  recommendation:
    "You tend to miss your evening dose on weekends. Consider shifting your schedule to 7 PM instead of 8 PM, which aligns better with your routine.",
  emptyText: "",
};

const MOCK_MISSED_DOSE = {
  text: "You've missed your last 2 evening doses. Want to shift your schedule?",
  href: "/scheduler/add?edit=panadol",
};

export const MOCK_REPORTS: Record<Range, ComplianceReport> = Object.fromEntries(
  Object.entries(DRAWN).map(([range, { missedDoseAlert, ...drawn }]) => [
    range,
    {
      ...drawn,
      missedDose: missedDoseAlert ? MOCK_MISSED_DOSE : null,
      trendInsights: MOCK_TREND_INSIGHTS,
      insights: MOCK_INSIGHTS,
      achievements: MOCK_ACHIEVEMENTS,
      emptyText: "",
    },
  ]),
) as Record<Range, ComplianceReport>;

const NUROFEN_7D: SeverityTrend = {
  labels: ["Nov 25", "Nov 28", "Dec 1", "Dec 4", "Dec 7", "Dec 10"],
  series: [
    { symptom: "Nausea", levels: [2, 1, 3, 3, 1, 2] },
    { symptom: "Headache", levels: [0, 2, 1, 2, 2, 0] },
    { symptom: "Dizziness", levels: [1, 3, 0, 1, 1, 0] },
  ],
};

export const MOCK_SEVERITY_TRENDS: Record<
  string,
  Record<TrendRange, SeverityTrend>
> = {
  "Nurofen 500mg": {
    "7d": NUROFEN_7D,
    "14d": {
      labels: ["Nov 15", "Nov 18", "Nov 21", "Nov 24", "Nov 27", "Nov 30"],
      series: [
        { symptom: "Nausea", levels: [1, 2, 2, 3, 2, 1] },
        { symptom: "Headache", levels: [1, 1, 0, 2, 1, 1] },
        { symptom: "Dizziness", levels: [0, 1, 2, 1, 0, 0] },
      ],
    },
    "30d": {
      labels: ["Nov 1", "Nov 7", "Nov 13", "Nov 19", "Nov 25", "Dec 1"],
      series: [
        { symptom: "Nausea", levels: [2, 2, 1, 2, 2, 1] },
        { symptom: "Headache", levels: [1, 0, 1, 1, 0, 2] },
        { symptom: "Dizziness", levels: [0, 1, 1, 0, 1, 3] },
      ],
    },
  },
  "Panadol 500mg": {
    "7d": {
      labels: ["Sep 2", "Sep 3", "Sep 4", "Sep 5", "Sep 6", "Sep 8"],
      series: [
        { symptom: "Nausea", levels: [0, 1, 1, 2, 1, 2] },
        { symptom: "Headache", levels: [1, 1, 2, 2, 1, 2] },
      ],
    },
    "14d": {
      labels: ["Aug 26", "Aug 29", "Sep 1", "Sep 3", "Sep 6", "Sep 8"],
      series: [
        { symptom: "Nausea", levels: [1, 0, 1, 1, 1, 2] },
        { symptom: "Headache", levels: [2, 1, 1, 2, 1, 2] },
      ],
    },
    "30d": {
      labels: ["Aug 10", "Aug 16", "Aug 22", "Aug 28", "Sep 3", "Sep 8"],
      series: [
        { symptom: "Nausea", levels: [1, 1, 0, 1, 1, 2] },
        { symptom: "Headache", levels: [1, 2, 1, 1, 2, 2] },
      ],
    },
  },
  Amlodipine: {
    "7d": {
      labels: ["Sep 1", "Sep 2", "Sep 3", "Sep 4", "Sep 5", "Sep 6"],
      series: [{ symptom: "Dizziness", levels: [1, 1, 0, 1, 2, 1] }],
    },
    "14d": {
      labels: ["Aug 24", "Aug 27", "Aug 30", "Sep 1", "Sep 4", "Sep 6"],
      series: [{ symptom: "Dizziness", levels: [0, 1, 1, 1, 1, 1] }],
    },
    "30d": {
      labels: ["Aug 8", "Aug 14", "Aug 20", "Aug 26", "Sep 1", "Sep 6"],
      series: [{ symptom: "Dizziness", levels: [2, 1, 1, 0, 1, 1] }],
    },
  },
  Metformin: {
    "7d": {
      labels: ["Sep 3", "Sep 4", "Sep 5", "Sep 6", "Sep 7", "Sep 8"],
      series: [
        { symptom: "Nausea", levels: [1, 2, 1, 1, 2, 2] },
        { symptom: "Fatigue", levels: [0, 1, 1, 2, 2, 2] },
      ],
    },
    "14d": {
      labels: ["Aug 27", "Aug 30", "Sep 1", "Sep 4", "Sep 6", "Sep 8"],
      series: [
        { symptom: "Nausea", levels: [2, 1, 1, 2, 1, 2] },
        { symptom: "Fatigue", levels: [1, 1, 0, 1, 2, 2] },
      ],
    },
    "30d": {
      labels: ["Aug 11", "Aug 17", "Aug 23", "Aug 29", "Sep 4", "Sep 8"],
      series: [
        { symptom: "Nausea", levels: [1, 1, 2, 1, 2, 2] },
        { symptom: "Fatigue", levels: [0, 1, 1, 1, 1, 2] },
      ],
    },
  },
};
