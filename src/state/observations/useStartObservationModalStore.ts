import { create } from "zustand";
import { ObservationPreset } from "@/src/types/observations/observationTypes";

type State = {
  open: boolean;
  setOpen: (v: boolean) => void;
  preset: ObservationPreset | null;

  name: string;
  studentUuid: string;

  openWithPreset: (preset: ObservationPreset) => void;
  setName: (v: string) => void;
  setStudentUuid: (v: string) => void;
  clearForm: () => void;
};

export const useStartObservationModalStore = create<State>((set) => ({
  open: false,
  setOpen: (v) => set({ open: v }),
  preset: null,

  name: "",
  studentUuid: "",

  openWithPreset: (preset) =>
    set({
      open: true,
      preset,
    }),

  setName: (v) => set({ name: v }),
  setStudentUuid: (v) => set({ studentUuid: v }),

  clearForm: () =>
    set({
      open: false,
      preset: null,
      name: "",
      studentUuid: "",
    }),
}));
