export type BaseObservationPreset = {
  uuid: string;
  name: string;
  type: ObservationPresetEnum;
  subject: string;
  educationalSetting: EducationalSettingEnum;
  instructionalSetting: string;
};

export type ObservationPresetEnum = "interval" | "counter";
export type EducationalSettingEnum = "General Education" | "Special Education";

export type IntervalObservationPreset = BaseObservationPreset & {
  type: "interval";
  totalIntervals: number;
  intervalSeconds: number;
  onTaskList: string[];
  offTaskList: string[];
};

export type CounterObservationPreset = BaseObservationPreset & {
  type: "counter";
  totalMins: number;
  behaviorsList: string[];
};

export type ObservationPreset =
  | IntervalObservationPreset
  | CounterObservationPreset;
