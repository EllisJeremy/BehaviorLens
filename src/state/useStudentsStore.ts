import { create } from "zustand";
import { loadObject, saveObject } from "../utils/storage";
import { v4 as uuidv4 } from "uuid";

export type StudentType = {
  uuid: string;
  firstName: string;
  lastName: string;
  grade: string;
};

type StudentsState = {
  students: StudentType[];
  open: boolean;

  loadStudents: () => Promise<void>;
  addStudent: (student: StudentType) => void;

  setOpen: (val: boolean) => void;
};

export const useStudentsStore = create<StudentsState>((set, get) => ({
  students: [],
  open: false,

  setOpen: (val) => set({ open: val }),

  loadStudents: async () => {
    const data = await loadObject("students");
    if (data) set({ students: data });
  },

  addStudent: (student) => {
    const newList = [...get().students, student];
    set({ students: newList });
    saveObject("students", newList);
  },
}));
