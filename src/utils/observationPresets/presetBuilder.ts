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
    totalIntervals: state.totalIntervals,
    intervalSeconds: state.intervalSeconds,
    onTaskList: state.onTaskList,
    offTaskList: state.offTaskList,
  }),

  counter: (state) => ({
    type: "counter",
    name: state.name,
    uuid: state.uuid,
    totalMins: state.totalMins,
    behaviorsList: state.behaviorsList,
  }),
};
