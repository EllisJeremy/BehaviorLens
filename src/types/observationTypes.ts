export type BaseObservationPreset = {
  uuid: string;
  name: string;
  type: ObservationPresetKind;
};

export type ObservationPresetKind =
  | "interval"
  | "duration"
  | "frequency"
  | "abc";

export type IntervalObservationPreset = BaseObservationPreset & {
  type: "interval";
  numberOfObservations: number;
  observationIntervalSeconds: number;
};

export type DurationObservationPreset = BaseObservationPreset & {
  type: "duration";
  maxDurationSeconds: number;
};

export type FrequencyObservationPreset = BaseObservationPreset & {
  type: "frequency";
  expectedEvents: number;
};

export type ABCObservationPreset = BaseObservationPreset & {
  type: "abc";
  antecedentRequired: boolean;
  behaviorCategories: string[];
};

export type ObservationPreset =
  | IntervalObservationPreset
  | DurationObservationPreset
  | FrequencyObservationPreset
  | ABCObservationPreset;
