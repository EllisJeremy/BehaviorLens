export type BaseObservationPreset = {
  uuid: string;
  name: string;
  type: ObservationPresetEnum;
};

export type ObservationPresetEnum = "interval" | "abc";

export type IntervalObservationPreset = BaseObservationPreset & {
  type: "interval";
  totalIntervals: number;
  intervalSeconds: number;
  onTaskList: string[];
  offTaskList: string[];
};

export type ABCObservationPreset = BaseObservationPreset & {
  type: "abc";
};

export type ObservationPreset =
  | IntervalObservationPreset
  | ABCObservationPreset;
