import { IntervalObservationType } from "./observations/intervalTypes";
import { ObservationPresetEnum } from "./observations/observationTypes";

export type BaseReportType = {
  uuid: string;
  name: string;
  studentUuid: string;
  startedAt: number;
  type: ObservationPresetEnum;
};

export type IntervalReportType = BaseReportType & {
  type: "interval";
  totalIntervals: number;
  intervalSeconds: number;
  observations: IntervalObservationType[];
};

export type ReportType = IntervalReportType;
