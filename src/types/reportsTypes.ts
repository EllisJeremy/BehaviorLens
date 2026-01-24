import { IntervalObservationType } from "./observations/intervalTypes";
import {
  ObservationPresetEnum,
  EducationalSettingEnum,
} from "./observations/observationTypes";
import { CounterType } from "../state/observations/useCounterObservationStore";

export type BaseReportType = {
  uuid: string;
  filename: string;
  name: string;
  studentUuid: string;
  startedAt: number;
  type: ObservationPresetEnum;
  subject: string;
  educationalSetting: EducationalSettingEnum;
  instructionalSetting: string;
  totalSeconds: number;
};

export type IntervalReportType = BaseReportType & {
  type: "interval";
  totalIntervals: number;
  finalInterval: number;
  intervalSeconds: number;
  observations: IntervalObservationType[];
};

export type CounterReportType = BaseReportType & {
  type: "counter";
  counter: CounterType;
};

export type ReportType = IntervalReportType | CounterReportType;
