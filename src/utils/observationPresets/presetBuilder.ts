import {
  ObservationPresetEnum,
  ObservationPreset,
} from "@/src/types/observations/observationTypes";
import { ObservationPresetState } from "@/src/state/observationPresets/useObservationPresetsModalStore";
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
    intervalSeconds: state.intervalSeconds,
    onTaskList: state.onTaskList,
    offTaskList: state.offTaskList,
  }),

  abc: (state) => ({
    type: "abc",
    name: state.name,
    uuid: state.uuid,
  }),
};
