import { create } from "zustand";
import { ObservationPresetEnum } from "@/src/types/observationTypes";

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

    clearForm: () =>
      set({
        open: false,
        uuid: "",
        name: "",
        type: "interval",

        numberOfObservations: 20,
        observationIntervalSeconds: 15,
      }),
  })
);
