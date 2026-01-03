import {
  ObservationPresetEnum,
  ObservationPreset,
} from "@/src/types/observationTypes";
import { ObservationPresetState } from "@/src/state/observations/useObservationsModalStore";
type BuilderContext = ObservationPresetState & { uuid: string };

export const presetBuilder: Record<
  ObservationPresetEnum,
  (state: BuilderContext) => ObservationPreset
> = {
  interval: (state) => ({
    type: "interval",
    uuid: state.uuid,
    name: state.name,
    numberOfObservations: state.numberOfObservations,
    observationIntervalSeconds: state.observationIntervalSeconds,
  }),

  abc: (state) => ({
    type: "abc",
    name: state.name,
    uuid: state.uuid,
  }),
};
