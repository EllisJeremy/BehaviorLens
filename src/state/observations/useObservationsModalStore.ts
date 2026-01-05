import { create } from "zustand";
import {
  ObservationPresetEnum,
  ObservationPreset,
} from "@/src/types/observationTypes";

export type ObservationPresetState = {
  open: boolean;
  setOpen: (val: boolean) => void;

  name: string;
  setName: (v: string) => void;
  type: ObservationPresetEnum;
  setType: (v: ObservationPresetEnum) => void;

  editPreset: ObservationPreset;
  setEditPreset: (p: ObservationPreset) => void;

  // interval settings
  numberOfObservations: number;
  setNumberOfObservations: (v: number) => void;
  observationIntervalSeconds: number;
  setObservationIntervalSeconds: (v: number) => void;

  clearForm: () => void;
};

export const useObservationModalStore = create<ObservationPresetState>(
  (set) => ({
    open: false,
    setOpen: (val) => set({ open: val }),

    name: "",
    setName: (v) => set({ name: v }),
    type: "interval",
    setType: (v) => set({ type: v }),

    editPreset: {
      type: "interval",
      uuid: "…",
      name: "",
      numberOfObservations: 20,
      observationIntervalSeconds: 15,
    },
    setEditPreset: (v) => set({ editPreset: v }),

    // interval settings
    numberOfObservations: 20,
    setNumberOfObservations: (v) => set({ numberOfObservations: v }),
    observationIntervalSeconds: 15,
    setObservationIntervalSeconds: (v) =>
      set({ observationIntervalSeconds: v }),

    clearForm: () =>
      set({
        open: false,
      }),
  })
);
