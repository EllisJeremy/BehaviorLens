import { IntervalObservationType } from "./observations/intervalTypes";
import {
  ObservationPresetEnum,
  EducationalSettingEnum,
} from "./observations/observationTypes";

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
};

export type IntervalReportType = BaseReportType & {
  type: "interval";
  totalIntervals: number;
  finalInterval: number;
  intervalSeconds: number;
  observations: IntervalObservationType[];
};

export type ReportType = IntervalReportType;
