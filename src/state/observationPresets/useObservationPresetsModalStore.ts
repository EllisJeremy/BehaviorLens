import { create } from "zustand";
import {
  ObservationPresetEnum,
  EducationalSettingEnum,
  ObservationPreset,
} from "@/src/types/observations/observationTypes";

const defaultOnTaskList = [
  "Engaged in Lesson",
  "Taking Notes",
  "Positive Peer Interaction",
  "Positive Teacher Interaction",
];

const defaultOffTaskList = [
  "Self Harm",
  "Sleeping",
  "Walking Around",
  "Leaving Room",
  "Physical Aggression",
];

const defaultCounterObservationsList = [
  "Engaged in Lesson",
  "Taking Notes",
  "Positive Peer Interaction",
  "Positive Teacher Interaction",
];

export type ObservationPresetState = {
  open: boolean;
  setOpen: (val: boolean) => void;

  uuid: string;
  setUuid: (v: string) => void;
  name: string;
  setName: (v: string) => void;
  type: ObservationPresetEnum;
  setType: (v: ObservationPresetEnum) => void;
  subject: string;
  setSubject: (v: string) => void;
  educationalSetting: EducationalSettingEnum;
  setEducationalSetting: (v: EducationalSettingEnum) => void;
  instructionalSetting: string;
  setInstructionalSetting: (v: string) => void;

  // interval settings
  totalIntervals: number;
  setTotalIntervals: (v: number) => void;
  intervalSeconds: number;
  setIntervalSeconds: (v: number) => void;

  onTaskList: string[];
  setOnTask: (v: string[]) => void;
  addOnTask: (label: string) => void;
  removeOnTask: (label: string) => void;

  offTaskList: string[];
  setOffTask: (v: string[]) => void;
  addOffTask: (label: string) => void;
  removeOffTask: (label: string) => void;

  // counter settings
  totalMins: number;
  setTotalMins: (v: number) => void;
  behaviorsList: string[];
  setBehaviorList: (v: string[]) => void;
  addBehavior: (v: string) => void;
  removeBehavior: (v: string) => void;

  openForm: () => void;
  editForm: (preset: ObservationPreset) => void;
  closeForm: () => void;
};

export const useObservationPresetsModalStore = create<ObservationPresetState>(
  (set) => ({
    open: false,
    setOpen: (val) => set({ open: val }),

    uuid: "",
    setUuid: (v) => set({ uuid: v }),
    name: "",
    setName: (v) => set({ name: v }),
    type: "interval",
    setType: (v) => set({ type: v }),
    subject: "",
    setSubject: (v) => set({ subject: v }),
    educationalSetting: "General Education",
    setEducationalSetting: (v) => set({ educationalSetting: v }),
    instructionalSetting: "",
    setInstructionalSetting: (v) => set({ instructionalSetting: v }),

    // interval settings
    totalIntervals: 20,
    setTotalIntervals: (v) => set({ totalIntervals: v }),
    intervalSeconds: 15,
    setIntervalSeconds: (v) => set({ intervalSeconds: v }),
    onTaskList: defaultOnTaskList,
    setOnTask: (v) => set({ onTaskList: v }),
    addOnTask: (label) =>
      set((state) => {
        const normalized = label.trim();
        if (!normalized) return state;

        if (
          state.onTaskList.some(
            (b) => b.toLowerCase() === normalized.toLowerCase(),
          )
        ) {
          return state;
        }

        return {
          onTaskList: [...state.onTaskList, normalized],
        };
      }),

    removeOnTask: (label) =>
      set((state) => ({
        onTaskList: state.onTaskList.filter((b) => b !== label),
      })),

    offTaskList: defaultOffTaskList,
    setOffTask: (v) => set({ offTaskList: v }),
    addOffTask: (label) =>
      set((state) => {
        const normalized = label.trim();
        if (!normalized) return state;

        if (
          state.offTaskList.some(
            (b) => b.toLowerCase() === normalized.toLowerCase(),
          )
        ) {
          return state;
        }

        return {
          offTaskList: [...state.offTaskList, normalized],
        };
      }),

    removeOffTask: (label) =>
      set((state) => ({
        offTaskList: state.offTaskList.filter((b) => b !== label),
      })),

    // counter settings
    totalMins: 20,
    setTotalMins: (v) => set({ totalMins: v }),
    behaviorsList: defaultCounterObservationsList,
    setBehaviorList: (v) => set({ behaviorsList: v }),
    addBehavior: (v) =>
      set((state) => {
        const normalized = v.trim();
        if (!normalized) return state;

        if (
          state.behaviorsList.some(
            (b) => b.toLowerCase() === normalized.toLowerCase(),
          )
        ) {
          return state;
        }

        return {
          behaviorsList: [...state.behaviorsList, normalized],
        };
      }),

    removeBehavior: (v) =>
      set((state) => ({
        behaviorsList: state.behaviorsList.filter((b) => b !== v),
      })),

    openForm: () =>
      set({
        open: true,
        uuid: "",
        name: "",
        type: "interval",
        subject: "",
        educationalSetting: "General Education",
        instructionalSetting: "",
        onTaskList: defaultOnTaskList,
        offTaskList: defaultOffTaskList,
        totalIntervals: 20,
        intervalSeconds: 15,

        totalMins: 20,
        behaviorsList: defaultCounterObservationsList,
      }),

    editForm: (preset) =>
      set(() => {
        if (preset.type === "interval") {
          return {
            open: true,
            uuid: preset.uuid,
            name: preset.name,
            type: "interval",
            subject: preset.subject,
            educationalSetting: preset.educationalSetting,
            instructionalSetting: preset.instructionalSetting,

            onTaskList: preset.onTaskList,
            offTaskList: preset.offTaskList,
            totalIntervals: preset.totalIntervals,
            intervalSeconds: preset.intervalSeconds,
          };
        } else if (preset.type === "counter") {
          return {
            open: true,
            uuid: preset.uuid,
            name: preset.name,
            type: "counter",
            subject: preset.subject,
            educationalSetting: preset.educationalSetting,
            instructionalSetting: preset.instructionalSetting,

            totalMins: preset.totalMins,
            behaviorsList: preset.behaviorsList,
          };
        } else {
          console.error("type not valid:");
          return {};
        }
      }),

    closeForm: () => set({ open: false }),
  }),
);
