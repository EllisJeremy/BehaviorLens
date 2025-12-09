export type BaseObservationPreset = {
  uuid: string;
  name: string;
  type: ObservationPresetEnum;
};

export type ObservationPresetEnum = "interval" | "abc";

export type IntervalObservationPreset = BaseObservationPreset & {
  type: "interval";
  numberOfObservations: number;
  observationIntervalSeconds: number;
};

export type ABCObservationPreset = BaseObservationPreset & {
  type: "abc";
  antecedentRequired: boolean;
  behaviorCategories: string[];
};

export type ObservationPreset =
  | IntervalObservationPreset
  | ABCObservationPreset;
