import { create } from "zustand";
import { StudentType } from "./useStudentsStore";

type StudentsState = {
  open: boolean;
  setOpen: (val: boolean) => void;
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  grade: string;
  setGrade: (v: string) => void;
  uuid: string;
  setUuid: (v: string) => void;

  clearForm: () => void;
};

export const useStudentsModalStore = create<StudentsState>((set) => ({
  open: false,
  setOpen: (val) => set({ open: val }),
  firstName: "",
  setFirstName: (v) => set({ firstName: v }),
  lastName: "",
  setLastName: (v) => set({ lastName: v }),
  grade: "",
  setGrade: (v) => set({ grade: v }),
  uuid: "",
  setUuid: (v) => set({ uuid: v }),

  clearForm: () =>
    set({
      open: false,
      uuid: "",
      firstName: "",
      lastName: "",
      grade: "",
    }),
}));
