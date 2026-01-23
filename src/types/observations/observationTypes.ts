export type BaseObservationPreset = {
  uuid: string;
  name: string;
  type: ObservationPresetEnum;
  subject: string;
  educationalSetting: EducationalSettingEnum;
  instructionalSetting: string;
};

export type ObservationPresetEnum = "Interval" | "Counter";
export type EducationalSettingEnum = "General Education" | "Special Education";

export type IntervalObservationPreset = BaseObservationPreset & {
  type: "Interval";
  totalIntervals: number;
  intervalSeconds: number;
  onTaskList: string[];
  offTaskList: string[];
};

export type CounterObservationPreset = BaseObservationPreset & {
  type: "Counter";
  totalMins: number;
  behaviorsList: string[];
};

export type ObservationPreset =
  | IntervalObservationPreset
  | CounterObservationPreset;
