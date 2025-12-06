import { create } from "zustand";

type StudentsState = {
  open: boolean;
  setOpen: (val: boolean) => void;

  firstName: string;
  setFirstName: (v: string) => void;
  prevFirstName: string;
  setPrevFirstName: (v: string) => void;

  lastName: string;
  setLastName: (v: string) => void;
  prevLastName: string;
  setPrevLastName: (v: string) => void;

  grade: string;
  setGrade: (v: string) => void;
  prevGrade: string;
  setPrevGrade: (v: string) => void;

  prevUUID: string;
  setPrevUUID: (v: string) => void;

  clearForm: () => void;
};

export const useStudentsModalStore = create<StudentsState>((set) => ({
  open: false,
  setOpen: (val) => set({ open: val }),

  firstName: "",
  setFirstName: (v) => set({ firstName: v }),
  prevFirstName: "",
  setPrevFirstName: (v) => set({ prevFirstName: v }),

  lastName: "",
  setLastName: (v) => set({ lastName: v }),
  prevLastName: "",
  setPrevLastName: (v) => set({ prevLastName: v }),

  grade: "",
  setGrade: (v) => set({ grade: v }),
  prevGrade: "",
  setPrevGrade: (v) => set({ prevGrade: v }),

  prevUUID: "",
  setPrevUUID: (v) => set({ prevUUID: v }),

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
