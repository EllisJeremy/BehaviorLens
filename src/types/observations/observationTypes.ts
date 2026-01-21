export type BaseObservationPreset = {
  uuid: string;
  name: string;
  type: ObservationPresetEnum;
};

export type ObservationPresetEnum = "interval" | "counter";

export type IntervalObservationPreset = BaseObservationPreset & {
  type: "interval";
  totalIntervals: number;
  intervalSeconds: number;
  onTaskList: string[];
  offTaskList: string[];
};

export type CounterObservationPreset = BaseObservationPreset & {
  type: "counter";
  totalSeconds: number;
  behaviorsList: string[];
};

export type ObservationPreset =
  | IntervalObservationPreset
  | CounterObservationPreset;
