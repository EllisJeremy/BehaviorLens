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

  editStudent: StudentType;
  setEditStudent: (v: StudentType) => void;

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

  editStudent: { uuid: "", firstName: "", lastName: "", grade: "" },
  setEditStudent: (v) => set({ editStudent: v }),

  clearForm: () =>
    set({
      open: false,
      firstName: "",
      lastName: "",
      grade: "",
      editStudent: { uuid: "", firstName: "", lastName: "", grade: "" },
    }),
}));
