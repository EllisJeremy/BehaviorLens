export type IntervalObservationType = {
  id: string;
  isOnTask: boolean | null;
  value: string | null;
  timestamp: string | null;
};

export type IntervalObservationReportType = {
  name: string;
  studentUuid: string;
  startedAt: string;
  totalIntervals: number;
  intervalSeconds: number;
  observations: IntervalObservationType[];
};
