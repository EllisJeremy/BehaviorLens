import { create } from "zustand";
import { ObservationPresetEnum } from "@/src/types/observationTypes";

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
  numberOfObservations: number;
  setNumberOfObservations: (v: number) => void;
  observationIntervalSeconds: number;
  setObservationIntervalSeconds: (v: number) => void;

  onTaskList: string[];
  addOnTask: (label: string) => void;
  removeOnTask: (label: string) => void;

  offTaskList: string[];
  addOffTask: (label: string) => void;
  removeOffTask: (label: string) => void;

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
    numberOfObservations: 20,
    setNumberOfObservations: (v) => set({ numberOfObservations: v }),
    observationIntervalSeconds: 15,
    setObservationIntervalSeconds: (v) =>
      set({ observationIntervalSeconds: v }),
    onTaskList: defaultOnTaskList,
    addOnTask: (label) =>
      set((state) => {
        const normalized = label.trim();
        if (!normalized) return state;

        if (
          state.onTaskList.some(
            (b) => b.toLowerCase() === normalized.toLowerCase()
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
    addOffTask: (label) =>
      set((state) => {
        const normalized = label.trim();
        if (!normalized) return state;

        if (
          state.offTaskList.some(
            (b) => b.toLowerCase() === normalized.toLowerCase()
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

    clearForm: () =>
      set({
        open: false,
        uuid: "",
        name: "",
        type: "interval",
        onTaskList: defaultOnTaskList,
        offTaskList: defaultOffTaskList,

        numberOfObservations: 20,
        observationIntervalSeconds: 15,
      }),
  })
);
