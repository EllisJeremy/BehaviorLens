import { IntervalObservationType } from "./observations/intervalTypes";
import { ObservationPresetEnum } from "./observations/observationTypes";

export type BaseReportType = {
  name: string;
  studentUuid: string;
  startedAt: string;
};

export type IntervalObservationReportType = BaseReportType & {
  totalIntervals: number;
  intervalSeconds: number;
  observations: IntervalObservationType[];
};

export type ReportType = IntervalObservationReportType;
