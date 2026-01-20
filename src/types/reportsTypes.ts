import { IntervalObservationType } from "./observations/intervalTypes";
import { ObservationPresetEnum } from "./observations/observationTypes";

export type BaseReportType = {
  uuid: string;
  name: string;
  studentUuid: string;
  startedAt: string;
  type: ObservationPresetEnum;
};

export type IntervalObservationReportType = BaseReportType & {
  type: "interval";
  totalIntervals: number;
  intervalSeconds: number;
  observations: IntervalObservationType[];
};

export type ReportType = IntervalObservationReportType;
