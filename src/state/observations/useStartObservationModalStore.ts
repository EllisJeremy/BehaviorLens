import { create } from "zustand";
import { ObservationPresetEnum } from "@/src/types/observationTypes";

export type StartObservationModalStore = {
  open: boolean;
  setOpen: (val: boolean) => void;

  name: string;
  setName: (v: string) => void;
  studentUuid: string;
  setStudentUuid: (v: string) => void;
  type: ObservationPresetEnum;
  setType: (v: ObservationPresetEnum) => void;

  clearForm: () => void;
};

export const useStartObservationModalStore = create<StartObservationModalStore>(
  (set) => ({
    open: false,
    setOpen: (val) => set({ open: val }),

    name: "",
    setName: (v) => set({ name: v }),
    studentUuid: "",
    setStudentUuid: (v) => set({ studentUuid: v }),
    type: "interval",
    setType: (v) => set({ type: v }),

    clearForm: () =>
      set({
        open: false,
        name: "",
        studentUuid: "",
        type: "interval",
      }),
  })
);
