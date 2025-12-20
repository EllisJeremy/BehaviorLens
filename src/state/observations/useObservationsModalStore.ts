import { create } from "zustand";

type StudentsState = {
  open: boolean;
  setOpen: (val: boolean) => void;

  name: string;
  setName: (v: string) => void;

  clearForm: () => void;
};

export const useObservationModalStore = create<StudentsState>((set) => ({
  open: false,
  setOpen: (val) => set({ open: val }),

  name: "",
  setName: (v) => set({ name: v }),

  clearForm: () =>
    set({
      firstName: "",
      lastName: "",
      grade: "",
      prevUUID: "",
      open: false,
      prevFirstName: "",
      prevLastName: "",
      prevGrade: "",
    }),
}));
