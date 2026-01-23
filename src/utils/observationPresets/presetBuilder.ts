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
    subject: state.subject,
    educationalSetting: state.educationalSetting,
    instructionalSetting: state.instructionalSetting,
    totalIntervals: state.totalIntervals,
    intervalSeconds: state.intervalSeconds,
    onTaskList: state.onTaskList,
    offTaskList: state.offTaskList,
  }),

  counter: (state) => ({
    type: "counter",
    name: state.name,
    uuid: state.uuid,
    subject: state.subject,
    educationalSetting: state.educationalSetting,
    instructionalSetting: state.instructionalSetting,
    totalMins: state.totalMins,
    behaviorsList: state.behaviorsList,
  }),
};
