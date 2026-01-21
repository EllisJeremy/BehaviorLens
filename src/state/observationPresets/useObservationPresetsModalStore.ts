import { create } from "zustand";
import { ObservationPresetEnum } from "@/src/types/observations/observationTypes";

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
  totalSeconds: number;
  setTotalSeconds: (v: number) => void;
  behaviorsList: string[];
  setBehavoirsList: (v: string[]) => void;
  addBehavior: (v: string) => void;
  removeBehavior: (v: string) => void;

  clearForm: () => void;
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
    totalSeconds: 1200,
    setTotalSeconds: (v) => set({ totalSeconds: v }),
    behaviorsList: defaultCounterObservationsList,
    setBehavoirsList: (v) => set({ behaviorsList: v }),
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

    clearForm: () =>
      set({
        open: false,
        uuid: "",
        name: "",
        type: "interval",
        onTaskList: defaultOnTaskList,
        offTaskList: defaultOffTaskList,
        totalIntervals: 20,
        intervalSeconds: 15,

        totalSeconds: 0,
        behaviorsList: defaultCounterObservationsList,
      }),
  }),
);
